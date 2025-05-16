
// Service Worker pro Popri.cz
// Verze: 1.5.1 (2025-05-16)

const CACHE_NAME = 'popri-cache-v1.5.1';
const RUNTIME_CACHE = 'popri-runtime-v1.5.1';
const STATIC_CACHE = 'popri-static-v1.5.1';
const IMG_CACHE = 'popri-images-v1.5.1';

// Soubory, které budou přednostně uloženy do cache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/assets/index.css',
  '/poda-logo.svg',
  '/file_00000000fa2061f687645b6ffd2e586a.ico?v=2.0',
  '/file_00000000fa2061f687645b6ffd2e586a.png?v=2.0',
  '/favicon-16x16.png?v=2.0',
  '/favicon-32x32.png?v=2.0',
  '/apple-touch-icon.png?v=2.0',
  '/site.webmanifest?v=2.0',
  '/og-image.png',
  '/placeholder.svg'
];

// Critical CSS/JS files to cache separately with long expiry
const STATIC_ASSETS = [
  '/assets/index.css',
  '/assets/index.js'
];

// Image files to cache with a different strategy
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico'];

// Listen for skipWaiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Funkce pro detekci vyhledávacích botů
function isSearchBot(request) {
  const userAgent = request.headers?.get('User-Agent')?.toLowerCase();
  if (!userAgent) return false;
  
  const botPatterns = [
    'googlebot', 'bingbot', 'yandexbot', 'slurp', 'duckduckbot', 'baiduspider', 
    'seznam', 'facebookexternalhit', 'linkedinbot', 'twitterbot', 'applebot'
  ];
  
  return botPatterns.some(bot => userAgent.includes(bot));
}

// Determine cache strategy based on request type
function getCacheStrategy(url) {
  const pathname = new URL(url).pathname;
  
  // For SEO important files
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/blog/')
  ) {
    return 'network-first';
  }
  
  // For static assets (JS, CSS)
  if (STATIC_ASSETS.some(asset => pathname.includes(asset))) {
    return 'stale-while-revalidate';
  }
  
  // For image files
  if (IMAGE_EXTENSIONS.some(ext => pathname.endsWith(ext)) || pathname.includes('/lovable-uploads/')) {
    return 'cache-first';
  }
  
  // Default strategy
  return 'network-first';
}

// Core fetch handling with improved strategies and error handling
self.addEventListener('fetch', event => {
  // Don't handle non-GET requests
  if (event.request.method !== 'GET') return;
  
  const requestUrl = new URL(event.request.url);
  
  // Kontrola zda se jedná o vyhledávací bot
  if (isSearchBot(event.request)) {
    // Pro vyhledávací boty necachuji, jdu přímo na síť
    return;
  }
  
  // Skip handling for external resources
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Favicon files need to be handled specially
  if (
    requestUrl.pathname.includes('favicon') ||
    requestUrl.pathname.includes('.ico') ||
    requestUrl.pathname.includes('apple-touch-icon') ||
    requestUrl.pathname.includes('site.webmanifest')
  ) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(response => {
          // Cache only successful responses
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, clonedResponse);
            });
          }
          return response;
        }).catch(() => {
          // If network fails, try to return any cached version as fallback
          return caches.match(event.request);
        });
      })
    );
    return;
  }
  
  // Safety mechanism: time limit for the fetch operation
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve(new Response('Timeout fetching resource.', { status: 408, statusText: 'Request Timeout' }));
    }, 10000);
  });
  
  // Get strategy based on request type
  const strategy = getCacheStrategy(event.request.url);
  
  if (strategy === 'stale-while-revalidate') {
    // Stale-While-Revalidate: Use cache but update in background
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = Promise.race([
          fetch(event.request), 
          timeoutPromise
        ]).then(networkResponse => {
          // Cache the updated version
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(error => {
          console.log('Fetch failed; returning cached response instead.', error);
          return null;
        });
          
        // Return the cached response immediately if we have one
        return cachedResponse || fetchPromise;
      })
    );
  } else if (strategy === 'cache-first') {
    // Cache-First: Prioritize cache for images and other static assets
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response immediately
          // Refresh cache in background for next time
          Promise.race([
            fetch(event.request), 
            timeoutPromise
          ]).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(IMG_CACHE).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
          }).catch(() => {});
            
          return cachedResponse;
        }
        
        // No cached version, get from network and cache
        return Promise.race([
          fetch(event.request),
          timeoutPromise
        ]).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(IMG_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        }).catch(() => {
          // If both cache and network fail, return the offline page for HTML requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/');
          }
          return null;
        });
      })
    );
  } else {
    // Network-first (default): Try network, fall back to cache
    event.respondWith(
      Promise.race([
        fetch(event.request),
        timeoutPromise
      ]).then(response => {
        // Cache valid responses for future
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // On network failure, try cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If it's an HTML request, serve the offline page
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/');
          }
          
          return null;
        });
      })
    );
  }
});

// Installer with improved cache handling and robustness
self.addEventListener('install', event => {
  console.log('Service Worker installing');
  
  // Cancel the waiting phase and activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }).catch(error => {
        console.error('Failed to cache static assets:', error);
        // Continue even if this fails
        return Promise.resolve();
      }),
      
      // Cache core pages and assets
      caches.open(CACHE_NAME).then(cache => {
        console.log('Pre-caching important assets');
        return cache.addAll(PRECACHE_URLS);
      }).catch(error => {
        console.error('Failed to cache core assets:', error);
        // Continue even if this fails
        return Promise.resolve();
      })
    ]).catch(error => {
      console.error('Install error, but continuing:', error);
      // Always resolve to prevent install failure
      return Promise.resolve();
    })
  );
});

// Activator with better cache cleanup
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, STATIC_CACHE, IMG_CACHE];
  
  console.log('Service Worker activating');
  
  // Take control of all clients immediately
  self.clients.claim();
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            // Only delete our own caches that aren't current
            (cacheName.startsWith('popri-') && !currentCaches.includes(cacheName))
          )
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('Service Worker now active with latest caches');
    }).catch(error => {
      console.error('Activation error, but continuing:', error);
      // Always resolve to prevent activation failure
      return Promise.resolve();
    })
  );
});

// Add periodic cache cleanup for images (every 7 days)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cleanup-old-caches') {
    event.waitUntil(
      caches.open(IMG_CACHE).then(cache => {
        cache.keys().then(requests => {
          // Keep only the most recent 100 images
          if (requests.length > 100) {
            const toDelete = requests.slice(0, requests.length - 100);
            Promise.all(toDelete.map(request => cache.delete(request)));
          }
        });
      })
    );
  }
});

// Handle errors gracefully
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.message);
});

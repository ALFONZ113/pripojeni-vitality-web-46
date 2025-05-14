
// Service Worker pro Popri.cz
// Verze: 1.5.0 (2025-05-14)

const CACHE_NAME = 'popri-cache-v1.5.0';
const RUNTIME_CACHE = 'popri-runtime-v1.5.0';
const STATIC_CACHE = 'popri-static-v1.5.0';
const IMG_CACHE = 'popri-images-v1.5.0';

// Soubory, které budou přednostně uloženy do cache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/assets/index.css',
  '/poda-logo.svg',
  '/poda-favicon.ico',
  '/poda-favicon-16x16.png',
  '/poda-favicon-32x32.png',
  '/poda-apple-touch-icon.png',
  '/site.webmanifest',
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

// Core fetch handling with improved strategies
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Kontrola zda se jedná o vyhledávací bot
  if (isSearchBot(event.request)) {
    // Pro vyhledávací boty necachuji, jdu přímo na síť
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
  
  // Get strategy based on request type
  const strategy = getCacheStrategy(event.request.url);
  
  if (strategy === 'stale-while-revalidate') {
    // Stale-While-Revalidate: Use cache but update in background
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Cache the updated version
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(error => {
            console.log('Fetch failed; returning cached response instead.', error);
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
          fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(IMG_CACHE).then(cache => {
                  cache.put(event.request, responseToCache);
                });
              }
            })
            .catch(() => {});
            
          return cachedResponse;
        }
        
        // No cached version, get from network and cache
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(IMG_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        });
      })
    );
  } else {
    // Network-first (default): Try network, fall back to cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache valid responses for future
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // On network failure, try cache
          return caches.match(event.request);
        })
    );
  }
});

// Installer with improved cache handling
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache core pages and assets
      caches.open(CACHE_NAME).then(cache => {
        console.log('Pre-caching important assets');
        return cache.addAll(PRECACHE_URLS);
      })
    ])
  );
  
  // Activate right away
  self.skipWaiting();
});

// Activator with better cache cleanup
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, STATIC_CACHE, IMG_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => !currentCaches.includes(cacheName))
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('Service Worker now active with latest caches');
      // Take control of clients immediately
      return self.clients.claim();
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

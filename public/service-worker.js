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
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
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

// New function to determine if we should bypass cache for critical resources
function shouldBypassCache(url) {
  // Always get fresh version of main JS and HTML
  const criticalPaths = ['/index.html', '/assets/index.js'];
  const path = new URL(url).pathname;
  return criticalPaths.some(p => path.includes(p));
}

// Determine cache strategy based on request type
function getCacheStrategy(url) {
  // If it's a critical resource we need fresh, bypass cache
  if (shouldBypassCache(url)) {
    return 'network-first';
  }
  
  const pathname = new URL(url).pathname;
  
  // For SEO important files
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/service-worker.js' ||
    pathname.startsWith('/blog/')
  ) {
    return 'network-first';
  }
  
  // For static assets (CSS)
  if (pathname.includes('/assets/index.css')) {
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
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip third-party requests
  if (!requestUrl.origin.includes(self.location.origin) && 
      !requestUrl.origin.includes('lovable.app')) {
    return;
  }
  
  // For search bots or API requests, go straight to network
  if (isSearchBot(event.request) || requestUrl.pathname.includes('/api/')) {
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
          return caches.match(event.request).then(cachedResponse => {
            return cachedResponse || new Response('Network error occurred', {
              status: 408,
              statusText: 'Network timeout'
            });
          });
        })
    );
  }
});

// Installer with improved cache handling
self.addEventListener('install', event => {
  // Skip waiting to activate immediately
  self.skipWaiting();
  
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

// Handle periodic cache cleanup
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

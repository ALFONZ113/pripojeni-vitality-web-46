// Service Worker pro Popri.cz
// Verze: 2.0.0 (2025-05-19)

const CACHE_NAME = 'popri-cache-v2.0.0';
const RUNTIME_CACHE = 'popri-runtime-v2.0.0';
const STATIC_CACHE = 'popri-static-v2.0.0';
const IMG_CACHE = 'popri-images-v2.0.0';

// Soubory, které budou přednostně uloženy do cache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/assets/index.css',
  '/poda-logo.svg',
  '/poda-favicon.ico?v=2.0',
  '/poda-favicon-16x16.png?v=2.0',
  '/poda-favicon-32x32.png?v=2.0',
  '/poda-favicon-48x48.png?v=2.0',
  '/poda-favicon-192x192.png?v=2.0',
  '/poda-favicon-512x512.png?v=2.0',
  '/poda-apple-touch-icon.png?v=2.0',
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

// Favicon files to never cache (always go to network)
const FAVICON_FILES = [
  '/poda-favicon.ico',
  '/poda-favicon-16x16.png',
  '/poda-favicon-32x32.png',
  '/poda-favicon-48x48.png',
  '/poda-favicon-192x192.png',
  '/poda-favicon-512x512.png',
  '/poda-apple-touch-icon.png',
  '/site.webmanifest',
  '/apple-touch-icon.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png'
];

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
  
  // Nikdy necachovat favicon soubory - vždy jít na síť
  if (FAVICON_FILES.some(file => pathname.includes(file))) {
    return 'network-only';
  }
  
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

// Instalace service workeru
self.addEventListener('install', event => {
  console.log('Service Worker installing...');

  // Vynutit aktivaci ihned (bez čekání na reload)
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
      }),
      
      // Vyčistit favicon cache ručně
      caches.keys().then(names => {
        return Promise.all(
          names.map(name => {
            return caches.open(name).then(cache => {
              return Promise.all(
                FAVICON_FILES.map(file => {
                  return cache.delete(file).then(() => {
                    return cache.delete(file + '?v=1.0').then(() => {
                      console.log('Cleared old favicon: ' + file);
                      return true;
                    });
                  });
                })
              );
            });
          })
        );
      })
    ])
  );
});

// Core fetch handling with improved strategies
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Kontrola zda se jedná o vyhledávací bot
  if (isSearchBot(event.request)) {
    // Pro vyhledávací boty necachuji, jdu přímo na síť
    return;
  }
  
  // Special handling for favicon files - direct network fetch without caching
  const isFaviconRequest = FAVICON_FILES.some(file => requestUrl.pathname.includes(file));
  if (isFaviconRequest) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response('Favicon not available', { status: 404 });
        })
    );
    return;
  }
  
  // Get strategy based on request type
  const strategy = getCacheStrategy(event.request.url);
  
  if (strategy === 'network-only') {
    // Network-only: Always go to network, never cache
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response('Resource unavailable', { status: 404 });
      })
    );
  } else if (strategy === 'stale-while-revalidate') {
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

// Activator with better cache cleanup
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, STATIC_CACHE, IMG_CACHE];
  
  // Vynutit okamžité převzetí kontroly
  event.waitUntil(
    Promise.all([
      // Vyčistit staré cache
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => !currentCaches.includes(cacheName))
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      
      // Vyčistit favicon cache ručně
      caches.keys().then(names => {
        return Promise.all(
          names.map(name => {
            return caches.open(name).then(cache => {
              return Promise.all(
                FAVICON_FILES.map(file => {
                  return cache.delete(file).then(() => {
                    return cache.delete(file + '?v=1.0').then(() => {
                      console.log('Cleared old favicon: ' + file);
                    });
                  });
                })
              );
            });
          })
        );
      }),
      
      // Převzít kontrolu nad všemi klienty
      self.clients.claim()
    ])
  ).then(() => {
    console.log('Service Worker now active with latest caches');
  });
});

// Add periodic cache cleanup for images (every 7 days)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cleanup-old-caches') {
    event.waitUntil(
      Promise.all([
        // Čištění image cache
        caches.open(IMG_CACHE).then(cache => {
          cache.keys().then(requests => {
            // Keep only the most recent 100 images
            if (requests.length > 100) {
              const toDelete = requests.slice(0, requests.length - 100);
              Promise.all(toDelete.map(request => cache.delete(request)));
            }
          });
        }),
        
        // Vyčistit všechny favicon soubory pro jistotu
        caches.keys().then(names => {
          return Promise.all(
            names.map(name => {
              return caches.open(name).then(cache => {
                return Promise.all(
                  FAVICON_FILES.map(file => cache.delete(file))
                );
              });
            })
          );
        })
      ])
    );
  }
});

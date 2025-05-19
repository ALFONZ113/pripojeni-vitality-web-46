// Service Worker pro Popri.cz
// Verze: 2.0.1 (2025-05-19)

// Cache names - consolidated into a config object
const CACHE_CONFIG = {
  MAIN: 'popri-cache-v2.0.1',
  RUNTIME: 'popri-runtime-v2.0.1',
  STATIC: 'popri-static-v2.0.1',
  IMAGES: 'popri-images-v2.0.1',
  VERSION: '2.0.1'
};

// Resource configurations
const RESOURCES = {
  // Core files to be cached immediately
  PRECACHE: [
    '/',
    '/index.html',
    '/assets/index.js',
    '/assets/index.css',
    '/poda-logo.svg',
    '/placeholder.svg',
    '/og-image.png'
  ],
  
  // Critical assets with long expiry
  STATIC: [
    '/assets/index.css',
    '/assets/index.js'
  ],
  
  // Favicon files to never cache
  FAVICON: [
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
  ],
  
  // File extensions for images
  IMAGE_EXTENSIONS: ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico']
};

// Helper functions
const helpers = {
  // Search bot detection
  isSearchBot(request) {
    const userAgent = request.headers?.get('User-Agent')?.toLowerCase();
    if (!userAgent) return false;
    
    const botPatterns = [
      'googlebot', 'bingbot', 'yandexbot', 'slurp', 'duckduckbot', 'baiduspider', 
      'seznam', 'facebookexternalhit', 'linkedinbot', 'twitterbot', 'applebot'
    ];
    
    return botPatterns.some(bot => userAgent.includes(bot));
  },
  
  // Determine best cache strategy based on request
  getCacheStrategy(url) {
    const pathname = new URL(url).pathname;
    
    // Never cache favicon files
    if (RESOURCES.FAVICON.some(file => pathname.includes(file))) {
      return 'network-only';
    }
    
    // SEO-important files
    if (pathname === '/sitemap.xml' || 
        pathname === '/robots.txt' || 
        pathname.startsWith('/blog/')) {
      return 'network-first';
    }
    
    // Static assets
    if (RESOURCES.STATIC.some(asset => pathname.includes(asset))) {
      return 'stale-while-revalidate';
    }
    
    // Image files
    if (RESOURCES.IMAGE_EXTENSIONS.some(ext => pathname.endsWith(ext)) || 
        pathname.includes('/lovable-uploads/')) {
      return 'cache-first';
    }
    
    // Default strategy
    return 'network-first';
  }
};

// Clear favicon cache from all caches
async function clearFaviconCache() {
  try {
    const cacheNames = await caches.keys();
    
    await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name);
        
        await Promise.all(
          RESOURCES.FAVICON.map(async (file) => {
            await cache.delete(file);
            await cache.delete(file + '?v=1.0');
            await cache.delete(file + '?v=2.0');
            console.log('Cleared old favicon: ' + file);
          })
        );
      })
    );
  } catch (error) {
    console.error('Error clearing favicon cache:', error);
  }
}

// Install event - cache core resources and clean favicon cache
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // Force activation immediately

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_CONFIG.STATIC).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(RESOURCES.STATIC);
      }),
      
      // Cache core pages and assets
      caches.open(CACHE_CONFIG.MAIN).then(cache => {
        console.log('Pre-caching important assets');
        return cache.addAll(RESOURCES.PRECACHE);
      }),
      
      // Clear favicon cache
      clearFaviconCache()
    ])
  );
});

// Fetch event - handle network requests with appropriate strategies
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Skip if search bot
  if (helpers.isSearchBot(event.request)) {
    return;
  }
  
  // Special handling for favicon files
  const isFaviconRequest = RESOURCES.FAVICON.some(file => requestUrl.pathname.includes(file));
  if (isFaviconRequest) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response('Favicon not available', { status: 404 });
      })
    );
    return;
  }
  
  // Get appropriate strategy
  const strategy = helpers.getCacheStrategy(event.request.url);
  
  // Apply the selected strategy
  switch(strategy) {
    case 'network-only':
      event.respondWith(
        fetch(event.request).catch(() => {
          return new Response('Resource unavailable', { status: 404 });
        })
      );
      break;
      
    case 'stale-while-revalidate':
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_CONFIG.STATIC).then(cache => {
                  cache.put(event.request, responseToCache);
                });
              }
              return networkResponse;
            })
            .catch(error => {
              console.log('Fetch failed; returning cached response instead.', error);
            });
            
          return cachedResponse || fetchPromise;
        })
      );
      break;
      
    case 'cache-first':
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request).then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_CONFIG.IMAGES).then(cache => {
              cache.put(event.request, responseToCache);
            });
            
            return networkResponse;
          });
        })
      );
      break;
      
    default: // network-first
      event.respondWith(
        fetch(event.request)
          .then(response => {
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_CONFIG.RUNTIME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => {
            return caches.match(event.request);
          })
      );
      break;
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [
    CACHE_CONFIG.MAIN, 
    CACHE_CONFIG.RUNTIME, 
    CACHE_CONFIG.STATIC, 
    CACHE_CONFIG.IMAGES
  ];
  
  event.waitUntil(
    Promise.all([
      // Clean old caches
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
      
      // Clear favicon cache again
      clearFaviconCache(),
      
      // Take control of all clients
      self.clients.claim()
    ])
  ).then(() => {
    console.log('Service Worker now active with latest caches');
  });
});

// Periodic cleanup
self.addEventListener('periodicsync', event => {
  if (event.tag === 'cleanup-old-caches') {
    event.waitUntil(
      Promise.all([
        // Clean image cache
        caches.open(CACHE_CONFIG.IMAGES).then(cache => {
          cache.keys().then(requests => {
            // Keep only the most recent 100 images
            if (requests.length > 100) {
              const toDelete = requests.slice(0, requests.length - 100);
              Promise.all(toDelete.map(request => cache.delete(request)));
            }
          });
        }),
        
        // Clean favicon cache
        clearFaviconCache()
      ])
    );
  }
});

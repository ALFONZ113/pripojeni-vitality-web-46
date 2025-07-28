
// Service Worker pro Popri.cz
// Verze: 3.0.0 (2025-05-22)

// Cache names - consolidated into a config object
const CACHE_CONFIG = {
  MAIN: 'popri-cache-v3.0.0',
  RUNTIME: 'popri-runtime-v3.0.0',
  STATIC: 'popri-static-v3.0.0',
  IMAGES: 'popri-images-v3.0.0',
  VERSION: '3.0.0'
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
    '/poda-favicon-96x96.png',
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
  
  // Check if URL is a favicon
  isFavicon(url) {
    const pathname = new URL(url).pathname;
    return RESOURCES.FAVICON.some(file => pathname.includes(file)) || 
           pathname.includes('favicon') || 
           pathname.endsWith('.ico');
  },
  
  // Get hostname from request
  getHostname(request) {
    return new URL(request.url).hostname;
  },
  
  // Determine best cache strategy based on request
  getCacheStrategy(url) {
    const pathname = new URL(url).pathname;
    
    // Never cache favicon files
    if (helpers.isFavicon(url)) {
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

// Aggressively clear favicon cache from all caches
async function clearFaviconCache() {
  try {
    const cacheNames = await caches.keys();
    
    await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name);
        
        // Get all cache keys
        const requests = await cache.keys();
        
        // Filter favicon requests
        const faviconRequests = requests.filter(
          request => helpers.isFavicon(request.url)
        );
        
        // Delete all favicon requests
        await Promise.all(
          faviconRequests.map(request => cache.delete(request))
        );
        
        // Also explicitly delete known favicon paths with various version params
        await Promise.all(
          RESOURCES.FAVICON.map(async (file) => {
            await cache.delete(file);
            await cache.delete(file + '?v=1.0');
            await cache.delete(file + '?v=2.0');
            await cache.delete(file + '?v=3.0');
            console.log('Cleared favicon from cache: ' + file);
          })
        );
      })
    );
  } catch (error) {
    console.error('Error clearing favicon cache:', error);
  }
}

// Install event - simplified to prevent blocking
self.addEventListener('install', event => {
  console.log('Service Worker installing version ' + CACHE_CONFIG.VERSION);
  self.skipWaiting(); // Force activation immediately

  // Simplified installation - don't block if resources fail to cache
  event.waitUntil(
    caches.open(CACHE_CONFIG.MAIN).then(cache => {
      console.log('Attempting to cache core assets');
      // Don't fail the entire install if one resource fails
      return Promise.allSettled(
        RESOURCES.PRECACHE.map(url => 
          cache.add(url).catch(error => {
            console.warn('Failed to cache:', url, error);
            return null;
          })
        )
      );
    }).catch(error => {
      console.warn('Cache installation failed but continuing:', error);
    })
  );
});

// Fetch event - handle network requests with appropriate strategies
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Skip if search bot
  if (helpers.isSearchBot(event.request)) {
    return;
  }
  
  // Special handling for favicon files - always go to network
  if (helpers.isFavicon(event.request.url)) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store', mode: 'no-cors' })
        .then(response => {
          console.log('Fetched favicon from network:', requestUrl.pathname);
          return response;
        })
        .catch(() => {
          console.error('Failed to fetch favicon:', requestUrl.pathname);
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
      
    default: // network-first with timeout
      event.respondWith(
        // Add timeout to prevent hanging
        Promise.race([
          fetch(event.request),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Network timeout')), 10000)
          )
        ])
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
            console.log('Network failed, trying cache for:', requestUrl.pathname);
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
      
      // Clear favicon cache again to be absolutely certain
      clearFaviconCache(),
      
      // Take control of all clients
      self.clients.claim()
    ])
  ).then(() => {
    console.log('Service Worker now active with latest caches v' + CACHE_CONFIG.VERSION);
  });
});

// Message event - handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_FAVICON_CACHE') {
    console.log('Received request to clear favicon cache');
    event.waitUntil(clearFaviconCache());
  }
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
        
        // Clear favicon cache
        clearFaviconCache()
      ])
    );
  }
});

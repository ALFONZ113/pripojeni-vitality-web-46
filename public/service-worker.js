// Service Worker for Popri.cz - Optimized v4.0
const CACHE_NAME = 'popri-cache-v4.0';

// Core resources to cache
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/poda-logo.svg',
  '/placeholder.svg'
];

// Cache strategies
const getCacheStrategy = (url) => {
  const pathname = new URL(url).pathname;
  
  // Never cache favicons
  if (pathname.includes('favicon') || pathname.endsWith('.ico')) {
    return 'network-only';
  }
  
  // SEO files
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    return 'network-first';
  }
  
  // Static assets
  if (pathname.includes('/assets/') || pathname.includes('/lovable-uploads/')) {
    return 'cache-first';
  }
  
  return 'network-first';
};

// Install - cache static resources
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => 
      cache.addAll(STATIC_RESOURCES)
    )
  );
});

// Fetch - handle requests
self.addEventListener('fetch', event => {
  const strategy = getCacheStrategy(event.request.url);
  
  if (strategy === 'network-only') {
    event.respondWith(fetch(event.request));
    return;
  }
  
  if (strategy === 'cache-first') {
    event.respondWith(
      caches.match(event.request).then(response => 
        response || fetch(event.request).then(networkResponse => {
          const cache = caches.open(CACHE_NAME);
          cache.then(c => c.put(event.request, networkResponse.clone()));
          return networkResponse;
        })
      )
    );
    return;
  }
  
  // network-first
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const cache = caches.open(CACHE_NAME);
          cache.then(c => c.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Activate - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => 
      Promise.all(
        names.filter(name => name !== CACHE_NAME)
             .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});
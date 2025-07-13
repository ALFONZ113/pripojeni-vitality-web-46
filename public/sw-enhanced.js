
// Enhanced Service Worker for aggressive caching
const CACHE_NAME = 'poda-static-v1.0';
const STATIC_CACHE_NAME = 'poda-static-assets-v1.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/prerender/index.html',
  '/prerender/blog.html',
  '/prerender/internet-karvina.html',
  '/prerender/internet-havirov.html',
  '/prerender/internet-ostrava.html',
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/src/index.css',
  '/poda-favicon.ico'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle different types of requests
  if (event.request.destination === 'document') {
    // For HTML documents - serve static version to bots
    event.respondWith(handleDocumentRequest(event.request));
  } else if (url.pathname.includes('/prerender/')) {
    // For prerendered content - cache aggressively
    event.respondWith(handlePrerenderRequest(event.request));
  } else if (isStaticAsset(event.request)) {
    // For static assets - cache first
    event.respondWith(handleStaticAsset(event.request));
  } else {
    // For other requests - network first
    event.respondWith(handleNetworkFirst(event.request));
  }
});

async function handleDocumentRequest(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|googlebot|bingbot/i.test(userAgent);
  
  if (isBot) {
    // Serve static prerendered version to bots
    try {
      const staticResponse = await caches.match('/prerender/index.html');
      if (staticResponse) {
        return staticResponse;
      }
    } catch (error) {
      console.error('Error serving static content:', error);
    }
  }
  
  // For humans - try cache first, then network
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error('Error in document request:', error);
    return new Response('Offline - Please try again later', { status: 503 });
  }
}

async function handlePrerenderRequest(request) {
  try {
    // Cache first for prerendered content
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Error serving prerendered content:', error);
    return caches.match('/prerender/index.html');
  }
}

async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Error serving static asset:', error);
    return new Response('Asset not available', { status: 404 });
  }
}

async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf)$/i.test(url.pathname);
}

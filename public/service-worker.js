
// Service Worker pro Popri.cz
const CACHE_NAME = 'popri-cache-v2';

// Seznam souborů pro cache
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/lovable-uploads/a06e6aff-dc10-4258-90a8-0d6c75fec61e.png',
];

// Instalace Service Workeru
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Aktivace Service Workeru
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Obsluha požadavků
self.addEventListener('fetch', event => {
  // Ignorovat analytické požadavky
  if (event.request.url.includes('google-analytics.com') || 
      event.request.url.includes('googletagmanager.com') ||
      event.request.url.includes('cloudflareinsights.com')) {
    return;
  }

  // Strategie Cache First s Network Fallback pro statické soubory
  if (event.request.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$/)) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request)
          .then(fetchResponse => {
            // Uložit do cache jen úspěšné odpovědi
            if (fetchResponse && fetchResponse.status === 200) {
              const responseToCache = fetchResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return fetchResponse;
          })
          .catch(error => {
            console.error('Service Worker fetch error:', error);
            // Fallback pro obrázky
            if (event.request.url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
              return caches.match('/placeholder.svg');
            }
            return new Response('Omlouváme se, došlo k chybě při načítání.', {
              status: 408,
              headers: {'Content-Type': 'text/plain'}
            });
          });
      })
    );
  } else {
    // Network First s Cache Fallback pro HTML stránky
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Pouze cache GET požadavky
          if (event.request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback pro HTML stránky
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            return new Response('Omlouváme se, stránka není dostupná offline.', {
              status: 503,
              headers: {'Content-Type': 'text/plain'}
            });
          });
        })
    );
  }
});

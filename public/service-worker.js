
// Service Worker pro Popri.cz
// Verze: 1.3.0 (2025-05-10)

const CACHE_NAME = 'popri-cache-v1.3.0';
const RUNTIME_CACHE = 'popri-runtime-v1';

// Soubory, které budou přednostně uloženy do cache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/assets/index.css',
  '/poda-logo.svg',
  '/file_00000000fa2061f687645b6ffd2e586a.ico',
  '/file_00000000fa2061f687645b6ffd2e586a.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/site.webmanifest',
  '/og-image.png'
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

// Vyhněte se cachování požadavků od vyhledávacích enginů
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Kontrola zda se jedná o vyhledávací bot
  if (isSearchBot(event.request)) {
    // Pro vyhledávací boty necachuji, jdu přímo na síť
    return;
  }
  
  // Pro SEO důležité stránky a soubory nepoužívám cache pro zajištění aktuálnosti
  if (
    requestUrl.pathname === '/sitemap.xml' ||
    requestUrl.pathname === '/robots.txt' ||
    requestUrl.pathname.startsWith('/blog/')
  ) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Pro ostatní požadavky používám strategii network-first
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Aktualizuji cache pro příští použití, ale vracím již cached verzi pro rychlost
        const fetchPromise = fetch(event.request)
          .then(response => {
            // Ukládat do cache pouze pokud je response validní
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch(error => {
            console.log('Fetch failed; returning cached response instead.', error);
          });
          
        // Aktivace fetch pro aktualizaci cache, ale vrácení cached verze pro rychlost
        fetchPromise.catch(() => {});
        return cachedResponse;
      }

      // Cache miss - jdu na síť
      return fetch(event.request).then(response => {
        // Vrátit response, pokud není validní
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Uložit do cache pro příští použití
        const responseToCache = response.clone();
        caches.open(RUNTIME_CACHE).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Instalace Service Workera a uložení precache souborů
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Pre-caching important assets');
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Aktivace ihned bez čekání
  self.skipWaiting();
});

// Aktivace nového service workera
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  
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
    })
  );
  
  // Převzetí kontroly nad klientskými stránkami ihned
  self.clients.claim();
});

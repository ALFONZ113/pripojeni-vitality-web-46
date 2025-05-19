
// Registrace service workeru s lepší kontrolou a detekcí podpory
(function() {
  // Funkce pro detekci vyhledávacích botů
  function isSearchBot() {
    const botPatterns = [
      'googlebot', 'bingbot', 'yandexbot', 'slurp', 'duckduckbot', 'baiduspider', 
      'seznam', 'facebookexternalhit', 'linkedinbot', 'twitterbot', 'applebot'
    ];
    
    const userAgent = navigator.userAgent.toLowerCase();
    return botPatterns.some(bot => userAgent.includes(bot));
  }

  // Pokud je detekován vyhledávací bot, neprovádíme registraci service workera
  if (isSearchBot()) {
    console.log('Search engine bot detected, skipping Service Worker registration');
    return;
  }
  
  // Feature detection for modern browsers
  const supportsServiceWorker = 'serviceWorker' in navigator;
  const supportsCaches = 'caches' in window;
  
  // Exit early if no service worker support
  if (!supportsServiceWorker) {
    console.log('Service Workers are not supported in this browser');
    return;
  }

  // Agresivní vyčištění Google cache pro favicon
  if (supportsCaches) {
    // Odstranit všechny cached favicon soubory
    const faviconPaths = [
      '/favicon.ico', 
      '/poda-favicon.ico',
      '/poda-favicon-16x16.png', 
      '/poda-favicon-32x32.png',
      '/poda-favicon-48x48.png',
      '/poda-favicon-192x192.png',
      '/poda-favicon-512x512.png',
      '/apple-touch-icon.png',
      '/poda-apple-touch-icon.png',
      '/site.webmanifest'
    ];
    
    // Pokus o přímé vyčištění favicon cache
    caches.keys().then(names => {
      for (const name of names) {
        caches.open(name).then(cache => {
          faviconPaths.forEach(path => {
            cache.delete(path).then(() => {
              cache.delete(path + '?v=1.0').then(() => {
                console.log('Cleared cached favicon: ' + path);
              });
            });
          });
        });
      }
    }).catch(err => console.log('Error clearing cache:', err));
  }

  // Use requestIdleCallback for non-critical registration
  const registerWhenIdle = window.requestIdleCallback || function(cb) {
    setTimeout(cb, 1);
  };

  registerWhenIdle(function() {
    // Přidat časový otisk pro agresivní cache-busting
    const timestamp = Date.now();
    navigator.serviceWorker.register('/service-worker.js?v=2.0&t=' + timestamp)
      .then(function(registration) {
        console.log('Service Worker registered with scope: ' + registration.scope);
        
        // Vynutit aktualizaci service workera (force update)
        if (registration.active) {
          registration.update().then(() => {
            console.log('Service worker updated');
          });
        }
        
        // Set up periodic sync if available (for cache maintenance)
        if ('periodicSync' in registration) {
          registration.periodicSync.register('cleanup-old-caches', {
            minInterval: 24 * 60 * 60 * 1000 * 7 // Once per week
          }).catch(err => {
            // Periodic sync not available or permission denied
            console.log('Periodic sync registration failed:', err);
          });
        }
      })
      .catch(function(err) {
        console.log('Service Worker registration failed: ', err);
      });
      
    // Vyčistit staré cache
    if (supportsCaches) {
      caches.keys().then(function(names) {
        const currentCacheVersions = [
          'popri-cache-v1.5.0',
          'popri-runtime-v1.5.0', 
          'popri-static-v1.5.0', 
          'popri-images-v1.5.0'
        ];
        
        names.forEach(function(name) {
          // Agresivnější čištění - odstranit všechny staré cache
          if (!currentCacheVersions.includes(name)) {
            caches.delete(name).then(function() {
              console.log('Deleted old cache: ' + name);
            });
          }
        });
      });
    }
  });
  
  // Add extra non-JS enhancement for core functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Make phone links work without JS
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
      link.setAttribute('rel', 'noopener');
    });
    
    // Add meta tags to force favicon refresh
    const metaRefresh = document.createElement('meta');
    metaRefresh.setAttribute('http-equiv', 'expires');
    metaRefresh.setAttribute('content', '0');
    document.head.appendChild(metaRefresh);
    
    // Aktualizovat favicon odkazy v run-time
    const faviconLinks = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
    faviconLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.includes('?')) {
        link.setAttribute('href', href + '?v=2.0&t=' + Date.now());
      }
    });
  });
})();

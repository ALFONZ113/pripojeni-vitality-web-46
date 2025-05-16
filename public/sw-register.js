
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

  // Use requestIdleCallback for non-critical registration
  const registerWhenIdle = window.requestIdleCallback || function(cb) {
    setTimeout(cb, 1);
  };

  registerWhenIdle(function() {
    navigator.serviceWorker.register('/service-worker.js?v=1.5.0')
      .then(function(registration) {
        console.log('Service Worker registered with scope: ' + registration.scope);
        
        // Check if we should update the service worker
        if (registration.active) {
          registration.update();
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
      
    // Clear old caches
    if (supportsCaches) {
      caches.keys().then(function(names) {
        const currentCacheVersions = [
          'popri-cache-v1.5.0',
          'popri-runtime-v1.5.0', 
          'popri-static-v1.5.0', 
          'popri-images-v1.5.0'
        ];
        
        names.forEach(function(name) {
          if (
            (name.includes('popri-cache') || name.includes('popri-runtime') || 
            name.includes('popri-static') || name.includes('popri-images')) && 
            !currentCacheVersions.includes(name)
          ) {
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
  });
})();

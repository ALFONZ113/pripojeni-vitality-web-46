
// Registrace service workeru s lepší kontrolou a detekcí podpory
(function() {
  // Exit early if running in an iframe (prevents double registration)
  if (window.self !== window.top) {
    console.log('Running in iframe, skipping Service Worker registration');
    return;
  }
  
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

  // Track registration to prevent duplicate attempts
  let registrationInProgress = false;
  
  // Register the service worker with better error handling
  function registerServiceWorker() {
    if (registrationInProgress) return;
    registrationInProgress = true;
    
    navigator.serviceWorker.register('/service-worker.js?v=1.5.1')
      .then(function(registration) {
        console.log('Service Worker registered with scope: ' + registration.scope);
        registrationInProgress = false;
        
        // Check if we should update the service worker
        if (registration.active) {
          registration.update();
        }
        
        // Set up periodic sync if available (for cache maintenance)
        if ('periodicSync' in registration) {
          registration.periodicSync.register('cleanup-old-caches', {
            minInterval: 24 * 60 * 60 * 1000 * 7 // Once per week
          }).catch(() => {
            // Periodic sync not available or permission denied
          });
        }
      })
      .catch(function(err) {
        console.log('Service Worker registration failed: ', err);
        registrationInProgress = false;
      });
  }
  
  // Use requestIdleCallback for non-critical registration
  const registerWhenIdle = window.requestIdleCallback || function(cb) {
    setTimeout(cb, 1000); // Longer delay for better performance
  };

  // Double safety - do not load service worker until document is fully loaded
  // to prevent any interference with initial rendering
  if (document.readyState === 'complete') {
    registerWhenIdle(registerServiceWorker);
  } else {
    window.addEventListener('load', function() {
      // Wait slightly longer after load to ensure critical resources are processed
      setTimeout(function() {
        registerWhenIdle(registerServiceWorker);
      }, 1500);
    });
  }
      
  // Clear old caches
  if (supportsCaches) {
    caches.keys().then(function(names) {
      const currentCacheVersions = [
        'popri-cache-v1.5.1',
        'popri-runtime-v1.5.1', 
        'popri-static-v1.5.1', 
        'popri-images-v1.5.1'
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
  
  // Add extra non-JS enhancement for core functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Make phone links work without JS
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
      link.setAttribute('rel', 'noopener');
    });
  });
})();

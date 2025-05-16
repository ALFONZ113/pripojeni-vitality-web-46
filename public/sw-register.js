
// Registrace service workeru s lepší kontrolou a zotavením z chyb
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
  
  // Function to clear problematic caches if needed
  function clearCaches() {
    if (supportsCaches) {
      console.log('Clearing all caches due to previous errors');
      return caches.keys().then(function(names) {
        return Promise.all(names.map(function(name) {
          return caches.delete(name);
        }));
      });
    }
    return Promise.resolve();
  }
  
  // Check for SW problems by looking for error flag
  function checkForProblems() {
    if (localStorage.getItem('sw-caused-error') === 'true') {
      console.log('Previous Service Worker errors detected');
      
      // Remove the error flag and unregister any existing service workers
      localStorage.removeItem('sw-caused-error');
      
      if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.getRegistrations().then(function(registrations) {
          const unregisterPromises = registrations.map(function(registration) {
            console.log('Unregistering problematic Service Worker');
            return registration.unregister();
          });
          return Promise.all(unregisterPromises);
        })
        .then(function() {
          return clearCaches();
        })
        .then(function() {
          console.log('Service Worker recovery completed');
        });
      }
    }
    return Promise.resolve();
  }

  // Use requestIdleCallback for non-critical registration
  const registerWhenIdle = window.requestIdleCallback || function(cb) {
    setTimeout(cb, 1);
  };

  // Check for problems first, then register
  checkForProblems().then(function() {
    registerWhenIdle(function() {
      // Set a registration timeout for safety
      const registrationTimeout = setTimeout(function() {
        console.log('Service Worker registration timed out');
      }, 10000);
      
      navigator.serviceWorker.register('/service-worker.js?v=1.5.1')
        .then(function(registration) {
          clearTimeout(registrationTimeout);
          console.log('Service Worker registered with scope: ' + registration.scope);
          
          // Set up handler for new service worker
          if (registration.waiting) {
            console.log('New service worker waiting');
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          
          registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', function() {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New service worker installed and waiting');
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
          
          // Check if we should update the service worker
          if (registration.active) {
            registration.update()
              .then(() => console.log('Service Worker update check completed'))
              .catch(err => console.log('Service Worker update check failed:', err));
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
          clearTimeout(registrationTimeout);
          console.log('Service Worker registration failed: ', err);
        });
        
      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        console.log('Service Worker controller changed');
      });
      
      // Mark page load errors that might be related to service worker
      window.addEventListener('error', function(event) {
        // Only consider network errors and script loading failures
        if (event.message && (
            event.message.includes('Failed to fetch') || 
            event.message.includes('NetworkError') ||
            event.message.includes('ChunkLoadError')
          )) {
          console.log('Potential Service Worker related error detected:', event.message);
          localStorage.setItem('sw-caused-error', 'true');
        }
      });
      
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
    });
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


// Service Worker Registration
(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // Clear service worker cache if needed
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      })
      .then(function() {
        // Register the service worker with a unique version parameter
        return navigator.serviceWorker.register('/service-worker.js?v=3.0&t=' + Date.now())
          .then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            
            // Notify the service worker to clear favicon cache
            if (registration.active) {
              registration.active.postMessage({ type: 'CLEAR_FAVICON_CACHE' });
            }
          })
          .catch(function(error) {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
      
      // Handle domain-specific favicon issues
      const hostname = window.location.hostname;
      if (hostname.includes('poda') || hostname.includes('pripojeni')) {
        console.log('Detected PODA domain, ensuring correct favicon');
        // Force favicon refresh by appending a timestamp
        const faviconLinks = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
        faviconLinks.forEach(link => {
          let href = link.getAttribute('href');
          if (href) {
            // Remove existing timestamp if any
            href = href.split('&t=')[0];
            // Add new timestamp
            link.setAttribute('href', href + '&t=' + Date.now() + '-poda');
          }
        });
      }
    });
  }
})();

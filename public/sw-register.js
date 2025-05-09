
// Optimized Service Worker Registration for Popri.cz
(function() {
  // Check if service worker is supported
  if (!('serviceWorker' in navigator)) return;

  // Variables for tracking state
  let refreshing = false;
  
  // Register service worker when page loads
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            }
          });
        });
      })
      .catch(error => console.error('Service Worker registration failed:', error));
  });

  // Handle controller changes (new SW taking over)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Network status monitoring
  window.addEventListener('online', () => console.log('Připojení k internetu bylo obnoveno.'));
  window.addEventListener('offline', () => console.log('Připojení k internetu bylo ztraceno.'));

  // Check for updates hourly if page stays open
  const HOUR_IN_MS = 60 * 60 * 1000;
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });
    }
  }, HOUR_IN_MS);

  // Add helper for manual SW update
  window.updateSW = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };
})();


// Simplified Service Worker Registration
(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // Unregister all old service workers first
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        return Promise.all(registrations.map(registration => registration.unregister()));
      })
      .then(function() {
        // Register new service worker
        return navigator.serviceWorker.register('/service-worker.js?v=4.0')
          .then(function(registration) {
            console.log('ServiceWorker registered successfully');
          })
          .catch(function(error) {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    });
  }
})();

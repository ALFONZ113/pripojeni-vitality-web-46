
// Registrace service workeru s kontrolou vyhledávacího enginu
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

  // Kontrola podpory Service Workera v prohlížeči
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // Force update by adding version parameter
      navigator.serviceWorker.register('/service-worker.js?v=2.0')
        .then(function(registration) {
          console.log('Service Worker registered with scope: ' + registration.scope);
          
          // Force update check
          registration.update();
        })
        .catch(function(err) {
          console.log('Service Worker registration failed: ', err);
        });
        
      // Clear old caches
      if ('caches' in window) {
        caches.keys().then(function(names) {
          names.forEach(function(name) {
            if (name.includes('popri-cache') || name.includes('popri-runtime')) {
              caches.delete(name).then(function() {
                console.log('Deleted old cache: ' + name);
              });
            }
          });
        });
      }
    });
  } else {
    console.log('Service Workers are not supported in this browser');
  }
})();

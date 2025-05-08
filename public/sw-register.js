
// Registrace Service Workeru pro Popri.cz
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Kontrola aktualizací service workeru
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            }
          });
        });
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });

  // Přidání listener pro aktualizace service workeru
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Logování stavu připojení pro diagnostiku
  window.addEventListener('online', () => {
    console.log('Připojení k internetu bylo obnoveno.');
  });

  window.addEventListener('offline', () => {
    console.log('Připojení k internetu bylo ztraceno.');
  });

  // Periodicky kontrolovat aktualizace, pokud je stránka otevřená déle
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });
    }
  }, 60 * 60 * 1000); // Jednou za hodinu
}

// Přidat funkci pro manuální vyžádání aktualizace SW
window.updateSW = function() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
  }
};

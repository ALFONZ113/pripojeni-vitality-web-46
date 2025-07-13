
// Enhanced Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register enhanced service worker
    navigator.serviceWorker.register('/sw-enhanced.js?v=1.0')
      .then((registration) => {
        console.log('Enhanced SW registered:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New SW available - refreshing...');
              window.location.reload();
            }
          });
        });
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });

    // Listen for SW messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('Cache updated:', event.data.url);
      }
    });
  });

  // Force update SW on page focus
  window.addEventListener('focus', () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_UPDATE' });
    }
  });
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page load performance:', {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        });
      }
    }, 0);
  });
}

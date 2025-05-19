
// Service Worker Registration Script
// Version: 2.0.1 (2025-05-19)
(function() {
  // Constants
  const SW_VERSION = '2.0.1';
  const SW_PATH = `/service-worker.js?v=${SW_VERSION}&t=${Date.now()}`;
  
  // Helper functions
  const helpers = {
    // Detect search bots
    isSearchBot() {
      const botPatterns = [
        'googlebot', 'bingbot', 'yandexbot', 'slurp', 'duckduckbot', 'baiduspider', 
        'seznam', 'facebookexternalhit', 'linkedinbot', 'twitterbot', 'applebot'
      ];
      
      return botPatterns.some(bot => 
        navigator.userAgent.toLowerCase().includes(bot)
      );
    },
    
    // Clear favicon cache
    clearFaviconCache() {
      if (!('caches' in window)) return Promise.resolve();
      
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
      
      return caches.keys().then(names => {
        return Promise.all(
          names.map(name => 
            caches.open(name).then(cache => 
              Promise.all(
                faviconPaths.map(path => 
                  cache.delete(path)
                    .then(() => cache.delete(path + '?v=1.0'))
                    .then(() => cache.delete(path + '?v=2.0'))
                    .then(() => console.log('Cleared cached favicon: ' + path))
                    .catch(() => {}) // Ignore errors
                )
              )
            )
          )
        );
      }).catch(err => console.log('Error clearing cache:', err));
    },
    
    // Clean up old caches
    cleanOldCaches() {
      if (!('caches' in window)) return Promise.resolve();
      
      const currentCacheVersions = [
        'popri-cache-v2.0.1',
        'popri-runtime-v2.0.1', 
        'popri-static-v2.0.1', 
        'popri-images-v2.0.1'
      ];
      
      return caches.keys().then(names => {
        return Promise.all(
          names
            .filter(name => !currentCacheVersions.includes(name))
            .map(name => 
              caches.delete(name)
                .then(() => console.log('Deleted old cache: ' + name))
                .catch(() => {}) // Ignore errors
            )
        );
      }).catch(err => console.log('Error cleaning caches:', err));
    }
  };

  // Skip registration for search bots
  if (helpers.isSearchBot()) {
    console.log('Search engine bot detected, skipping Service Worker registration');
    return;
  }
  
  // Feature detection
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers are not supported in this browser');
    return;
  }

  // Handle favicon cache clearing
  if ('caches' in window) {
    helpers.clearFaviconCache();
  }

  // Use requestIdleCallback for non-critical registration
  const registerWhenIdle = window.requestIdleCallback || (cb => setTimeout(cb, 1));

  registerWhenIdle(() => {
    // Register service worker
    navigator.serviceWorker.register(SW_PATH)
      .then(registration => {
        console.log('Service Worker registered with scope: ' + registration.scope);
        
        // Force update if active
        if (registration.active) {
          registration.update()
            .then(() => console.log('Service worker updated'));
        }
        
        // Set up periodic sync if available
        if ('periodicSync' in registration) {
          registration.periodicSync.register('cleanup-old-caches', {
            minInterval: 24 * 60 * 60 * 1000 * 7 // Once per week
          }).catch(() => {
            // Periodic sync not available or permission denied
            console.log('Periodic sync registration failed');
          });
        }
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });
      
    // Clean up old caches
    if ('caches' in window) {
      helpers.cleanOldCaches();
    }
  });
  
  // Add extra non-JS enhancements
  document.addEventListener('DOMContentLoaded', () => {
    // Make phone links work without JS
    document.querySelectorAll('a[href^="tel:"]')
      .forEach(link => link.setAttribute('rel', 'noopener'));
    
    // Add meta tag to force favicon refresh
    const metaRefresh = document.createElement('meta');
    metaRefresh.setAttribute('http-equiv', 'expires');
    metaRefresh.setAttribute('content', '0');
    document.head.appendChild(metaRefresh);
    
    // Update favicon links in run-time with timestamp
    document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')
      .forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('?')) {
          link.setAttribute('href', `${href}?v=2.0&t=${Date.now()}`);
        }
      });
  });
})();

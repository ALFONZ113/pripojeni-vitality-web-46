
/**
 * Manages the cache for the application based on time elapsed since last update
 */
export const manageCacheIfNeeded = (isHydrated: boolean) => {
  // Only run cache management after hydration is complete
  if (!isHydrated) return;
  
  // Use requestIdleCallback for non-critical operations
  const runWhenIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
  
  runWhenIdle(() => {
    // Only update cache if it's older than 24 hours or doesn't exist
    const lastCacheUpdate = localStorage.getItem('lastCacheUpdate');
    const now = Date.now();
    const cacheAge = lastCacheUpdate ? now - parseInt(lastCacheUpdate, 10) : Infinity;
    
    // If cache is recent, skip the refresh
    if (cacheAge < 24 * 60 * 60 * 1000) {
      console.log('Cache is recent, skipping refresh');
      return;
    }
    
    console.log('Cache refresh performed at: ' + new Date().toISOString());
    
    // Only clear relevant caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('popri-resources')) {
            caches.delete(name);
          }
        });
      });
    }
    
    // Update cache version
    localStorage.setItem('lastCacheUpdate', now.toString());
  });
};


import { useState, useEffect } from 'react';
import { preloadCriticalImages } from '../utils/imageUtils';
import { initAnimations } from '../utils/animation';

interface UsePageInitializationProps {
  criticalImages: string[];
}

const usePageInitialization = ({ criticalImages }: UsePageInitializationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark hydration complete after React takes over
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Preload critical images for better LCP
    preloadCriticalImages(criticalImages);
    
    // Initialize scroll animations with optimized performance
    let cleanupAnimation: (() => void) | undefined;
    
    try {
      console.log('Initializing animations');
      
      // Delay non-critical initializations
      const initTimer = setTimeout(() => {
        cleanupAnimation = initAnimations();
        setIsLoading(false);
        console.log('Page loaded successfully');
      }, 0); // Using minimal timeout to yield to main thread
      
      return () => {
        clearTimeout(initTimer);
        if (cleanupAnimation) cleanupAnimation();
      };
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      setIsLoading(false);
      return () => {
        if (cleanupAnimation) cleanupAnimation();
      };
    }
  }, [criticalImages]);

  // Optimalizovaná správa cache
  useEffect(() => {
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
  }, [isHydrated]);

  return { isLoading, error };
};

export default usePageInitialization;

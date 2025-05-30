
import { useState, useEffect } from 'react';
import { preloadCriticalImages } from '../utils/imageUtils';
import { initAnimations } from '../utils/animation';
import { createImageLazyLoader, preloadCriticalResources } from '../utils/lazyLoading';
import usePerformanceMonitor from './use-performance-monitor';

interface UsePageInitializationProps {
  criticalImages: string[];
  criticalResources?: string[];
  enablePerformanceMonitoring?: boolean;
}

const usePageInitialization = ({ 
  criticalImages, 
  criticalResources = [],
  enablePerformanceMonitoring = true 
}: UsePageInitializationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Monitor performance metrics
  const performanceMetrics = usePerformanceMonitor({
    enableReporting: enablePerformanceMonitoring,
    reportInterval: 5000
  });

  // Mark hydration complete after React takes over
  useEffect(() => {
    setIsHydrated(true);
    setLoadingProgress(20);
  }, []);

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    let imageObserver: IntersectionObserver | undefined;
    
    const initializeApp = async () => {
      try {
        setLoadingProgress(30);
        
        // Preload critical resources
        preloadCriticalResources([...criticalImages, ...criticalResources]);
        setLoadingProgress(50);
        
        // Preload critical images for better LCP
        preloadCriticalImages(criticalImages);
        setLoadingProgress(70);
        
        // Initialize lazy loading for images
        imageObserver = createImageLazyLoader();
        setLoadingProgress(85);
        
        // Initialize scroll animations with optimized performance
        await new Promise(resolve => {
          const initTimer = setTimeout(() => {
            cleanupAnimation = initAnimations();
            setLoadingProgress(100);
            resolve(undefined);
          }, 100); // Minimal delay for better perceived performance
          
          return () => clearTimeout(initTimer);
        });
        
        setIsLoading(false);
        console.log('Page loaded successfully with performance metrics:', performanceMetrics);
        
      } catch (e) {
        console.error('Error initializing page:', e);
        setError('Došlo k chybě při načítání stránky.');
        setIsLoading(false);
      }
    };

    if (isHydrated) {
      initializeApp();
    }

    return () => {
      if (cleanupAnimation) cleanupAnimation();
      if (imageObserver) imageObserver.disconnect();
    };
  }, [criticalImages, criticalResources, isHydrated, performanceMetrics]);

  // Optimalizovaná správa cache
  useEffect(() => {
    if (!isHydrated) return;
    
    const runWhenIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
    
    runWhenIdle(() => {
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
      
      localStorage.setItem('lastCacheUpdate', now.toString());
    });
  }, [isHydrated]);

  return { 
    isLoading, 
    error, 
    loadingProgress,
    performanceMetrics
  };
};

export default usePageInitialization;

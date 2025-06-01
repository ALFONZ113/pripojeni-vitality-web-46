
import { useEffect, useState } from 'react';
import { preloadCriticalResources, optimizeBundleLoading, measureCoreWebVitals } from '../utils/performance-optimization';

interface PerformanceState {
  isOptimized: boolean;
  loadTime: number | null;
  lcp: number | null;
  cls: number | null;
}

const useEnhancedPerformance = () => {
  const [performanceState, setPerformanceState] = useState<PerformanceState>({
    isOptimized: false,
    loadTime: null,
    lcp: null,
    cls: null
  });

  useEffect(() => {
    const startTime = performance.now();
    
    // Initialize performance optimizations
    preloadCriticalResources();
    optimizeBundleLoading();
    measureCoreWebVitals();

    // Monitor page load performance
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      setPerformanceState(prev => ({
        ...prev,
        isOptimized: true,
        loadTime
      }));
    };

    // Measure navigation timing
    const measureNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const entry = navigationEntries[0];
          console.log('Navigation timing:', {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
            totalTime: entry.loadEventEnd - entry.navigationStart
          });
        }
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Measure timing after load
    setTimeout(measureNavigationTiming, 1000);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return performanceState;
};

export default useEnhancedPerformance;

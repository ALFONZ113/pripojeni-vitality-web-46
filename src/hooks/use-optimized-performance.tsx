
import { useEffect } from 'react';

interface OptimizedPerformanceOptions {
  enableInDevelopment?: boolean;
  reportInterval?: number;
}

const useOptimizedPerformance = (options: OptimizedPerformanceOptions = {}) => {
  const { enableInDevelopment = false, reportInterval = 30000 } = options;

  useEffect(() => {
    // Only run in development if explicitly enabled, or in production
    const shouldRun = process.env.NODE_ENV === 'production' || enableInDevelopment;
    
    if (!shouldRun || typeof window === 'undefined') return;

    let reportingInterval: NodeJS.Timeout;

    // Simplified performance tracking
    const trackCoreWebVitals = () => {
      try {
        // LCP tracking
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry.startTime > 2500) {
            console.warn('LCP is slow:', lastEntry.startTime);
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        // Report only if issues detected
        reportingInterval = setInterval(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as any;
          if (navigation && navigation.loadEventEnd > 3000) {
            console.warn('Page load is slow:', navigation.loadEventEnd);
          }
        }, reportInterval);

        return () => {
          observer.disconnect();
          clearInterval(reportingInterval);
        };
      } catch (e) {
        console.warn('Performance monitoring not supported');
      }
    };

    const cleanup = trackCoreWebVitals();
    return cleanup;
  }, [enableInDevelopment, reportInterval]);
};

export default useOptimizedPerformance;

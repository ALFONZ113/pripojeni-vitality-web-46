
import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

interface PerformanceMonitorOptions {
  reportInterval?: number;
  enableReporting?: boolean;
}

const usePerformanceMonitor = (options: PerformanceMonitorOptions = {}) => {
  const { reportInterval = 10000, enableReporting = process.env.NODE_ENV === 'development' } = options;
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });

  useEffect(() => {
    if (!enableReporting || typeof window === 'undefined') return;

    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    // Largest Contentful Paint
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          setMetrics(prev => ({
            ...prev,
            lcp: lastEntry.startTime
          }));
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        return observer;
      } catch (e) {
        console.warn('LCP observation not supported');
        return null;
      }
    };

    // First Input Delay
    const observeFID = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            setMetrics(prev => ({
              ...prev,
              fid: entry.processingStart - entry.startTime
            }));
          });
        });
        
        observer.observe({ entryTypes: ['first-input'] });
        return observer;
      } catch (e) {
        console.warn('FID observation not supported');
        return null;
      }
    };

    // Cumulative Layout Shift
    const observeCLS = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              clsEntries.push(entry);
            }
          });
          
          setMetrics(prev => ({
            ...prev,
            cls: clsValue
          }));
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        return observer;
      } catch (e) {
        console.warn('CLS observation not supported');
        return null;
      }
    };

    // First Contentful Paint
    const observeFCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({
                ...prev,
                fcp: entry.startTime
              }));
            }
          });
        });
        
        observer.observe({ entryTypes: ['paint'] });
        return observer;
      } catch (e) {
        console.warn('FCP observation not supported');
        return null;
      }
    };

    // Time to First Byte
    const measureTTFB = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as any;
        if (navigation) {
          setMetrics(prev => ({
            ...prev,
            ttfb: navigation.responseStart - navigation.requestStart
          }));
        }
      } catch (e) {
        console.warn('TTFB measurement not supported');
      }
    };

    const observers = [
      observeLCP(),
      observeFID(),
      observeCLS(),
      observeFCP()
    ].filter(Boolean);

    measureTTFB();

    // Report metrics periodically
    const reportingInterval = setInterval(() => {
      if (metrics.lcp && metrics.fcp) {
        console.log('Performance Metrics:', metrics);
        
        // Here you could send metrics to analytics service
        // gtag('event', 'web_vitals', {
        //   name: 'LCP',
        //   value: metrics.lcp,
        //   event_category: 'Performance'
        // });
      }
    }, reportInterval);

    return () => {
      observers.forEach(observer => observer?.disconnect());
      clearInterval(reportingInterval);
    };
  }, [enableReporting, reportInterval]);

  return metrics;
};

export default usePerformanceMonitor;

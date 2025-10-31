import { useEffect, useState, useCallback, useMemo } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  loadTime: number | null;
  isOptimized: boolean;
}

interface PerformanceOptions {
  enableReporting?: boolean;
  reportInterval?: number;
  enableCriticalResourcePreload?: boolean;
}

const useOptimizedPerformance = (options: PerformanceOptions = {}) => {
  const { 
    enableReporting = false, 
    reportInterval = 10000,
    enableCriticalResourcePreload = true 
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,
    isOptimized: false
  });

  // Memoizované funkcie pre optimalizáciu
  const preloadCriticalResources = useCallback(() => {
    if (typeof document === 'undefined' || !enableCriticalResourcePreload) return;

    const criticalResources = [
      { href: '/poda-logo.svg', as: 'image' },
      { href: '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      // Check if already preloaded to avoid duplicates
      if (!document.querySelector(`link[rel="preload"][href="${resource.href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }, [enableCriticalResourcePreload]);

  const observeMetric = useCallback((metricName: keyof PerformanceMetrics, observer: PerformanceObserver) => {
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint', 'navigation'] });
    } catch (error) {
      console.warn(`Cannot observe ${metricName}:`, error);
    }
  }, []);

  // Kombinované meranie všetkých Core Web Vitals
  useEffect(() => {
    const startTime = performance.now();
    let reportingInterval: NodeJS.Timeout | null = null;

    // Preload kritické resources
    preloadCriticalResources();

    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });

    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    });

    // CLS Observer
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });

    // FCP Observer
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
        }
      });
    });

    // TTFB measurement
    const measureTTFB = () => {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }
    };

    // Setup observers
    observeMetric('lcp', lcpObserver);
    observeMetric('fid', fidObserver);
    observeMetric('cls', clsObserver);
    observeMetric('fcp', fcpObserver);

    // Measure initial metrics
    measureTTFB();

    // Page load tracking
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({ 
        ...prev, 
        loadTime,
        isOptimized: true 
      }));
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Reporting interval
    if (enableReporting) {
      reportingInterval = setInterval(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', metrics);
        }
      }, reportInterval);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
      window.removeEventListener('load', handleLoad);
      if (reportingInterval) {
        clearInterval(reportingInterval);
      }
    };
  }, [preloadCriticalResources, observeMetric, enableReporting, reportInterval]);

  // Memoizované vysledky
  const performanceScore = useMemo(() => {
    const { lcp, fid, cls, fcp } = metrics;
    let score = 0;
    let total = 0;

    if (lcp !== null) {
      score += lcp < 2500 ? 100 : lcp < 4000 ? 50 : 0;
      total += 100;
    }
    if (fid !== null) {
      score += fid < 100 ? 100 : fid < 300 ? 50 : 0;
      total += 100;
    }
    if (cls !== null) {
      score += cls < 0.1 ? 100 : cls < 0.25 ? 50 : 0;
      total += 100;
    }
    if (fcp !== null) {
      score += fcp < 1800 ? 100 : fcp < 3000 ? 50 : 0;
      total += 100;
    }

    return total > 0 ? Math.round((score / total) * 100) : 0;
  }, [metrics]);

  return {
    ...metrics,
    performanceScore,
    preloadCriticalResources
  };
};

export default useOptimizedPerformance;
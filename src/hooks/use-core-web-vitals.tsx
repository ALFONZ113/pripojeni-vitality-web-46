import { useEffect, useState } from 'react';
import { checkPerformanceBudgets } from '../utils/performance-budgets';

interface WebVitals {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
}

const useCoreWebVitals = () => {
  const [vitals, setVitals] = useState<WebVitals>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      const newVitals = { ...vitals, lcp: lastEntry.startTime };
      setVitals(prev => ({ ...prev, lcp: lastEntry.startTime }));
      
      // Check performance budgets
      checkPerformanceBudgets(newVitals);
    });

    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        setVitals(prev => ({ 
          ...prev, 
          fid: entry.processingStart - entry.startTime 
        }));
      });
    });

    // CLS Observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setVitals(prev => ({ ...prev, cls: clsValue }));
        }
      });
    });

    // FCP Observer
    const fcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          setVitals(prev => ({ ...prev, fcp: entry.startTime }));
        }
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('Core Web Vitals monitoring not supported');
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  return vitals;
};

export default useCoreWebVitals;
import { useState, useEffect, useCallback, useMemo } from 'react';
import { PerformanceMonitor, PerformanceMetrics } from '../utils/performance-monitor';

interface UsePerformanceOptimizationOptions {
  enableReporting?: boolean;
  reportInterval?: number;
  enableResourceHints?: boolean;
  criticalResources?: Array<{
    href: string;
    as: string;
    type?: string;
  }>;
}

export const usePerformanceOptimization = (options: UsePerformanceOptimizationOptions = {}) => {
  const {
    enableReporting = false,
    reportInterval = 10000,
    enableResourceHints = true,
    criticalResources = []
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({ isOptimized: false });
  const [performanceScore, setPerformanceScore] = useState<number>(0);

  // Memoize performance monitor instance - FIX INFINITE LOOP
  const performanceMonitor = useMemo(() => {
    let monitor: PerformanceMonitor;
    monitor = new PerformanceMonitor((newMetrics) => {
      setMetrics(newMetrics);
      if (monitor) {
        setPerformanceScore(monitor.getPerformanceScore());
      }
    });
    return monitor;
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    if (!enableResourceHints || typeof document === 'undefined') return;

    // Default critical resources
    const defaultResources = [
      { href: '/poda-logo.svg', as: 'image' },
      { href: '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png', as: 'image' }
    ];

    const allResources = [...defaultResources, ...criticalResources];

    allResources.forEach(resource => {
      const existing = document.querySelector(`link[href="${resource.href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if ('type' in resource && resource.type) {
          (link as any).type = resource.type;
        }
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Preconnect to external domains
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    domains.forEach(domain => {
      const existing = document.querySelector(`link[href="${domain}"][rel="preconnect"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }, [enableResourceHints, criticalResources]);

  // Performance reporting
  useEffect(() => {
    if (!enableReporting) return;

    const interval = setInterval(() => {
      performanceMonitor.reportPerformanceBudget();
    }, reportInterval);

    return () => clearInterval(interval);
  }, [enableReporting, reportInterval, performanceMonitor]);

  // Initialize resources preloading
  useEffect(() => {
    preloadCriticalResources();
  }, [preloadCriticalResources]);

  // Cleanup
  useEffect(() => {
    return () => {
      performanceMonitor.disconnect();
    };
  }, [performanceMonitor]);

  return {
    metrics,
    performanceScore,
    isOptimized: metrics.isOptimized,
    preloadCriticalResources,
    reportPerformance: () => performanceMonitor.reportPerformanceBudget()
  };
};

export default usePerformanceOptimization;
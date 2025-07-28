/**
 * Advanced performance monitoring utilities
 */

export interface PerformanceMetrics {
  lcp?: number;
  fcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
  loadTime?: number;
  isOptimized: boolean;
}

export interface PerformanceBudget {
  lcp: number;    // 2500ms
  fcp: number;    // 1800ms
  cls: number;    // 0.1
  fid: number;    // 100ms
  ttfb: number;   // 600ms
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  lcp: 2500,
  fcp: 1800,
  cls: 0.1,
  fid: 100,
  ttfb: 600
};

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = { isOptimized: false };
  private observers: PerformanceObserver[] = [];
  private reportCallback?: (metrics: PerformanceMetrics) => void;

  constructor(reportCallback?: (metrics: PerformanceMetrics) => void) {
    this.reportCallback = reportCallback;
    this.initializeObservers();
  }

  private initializeObservers() {
    if (typeof window === 'undefined') return;

    // LCP Observer
    this.observeMetric('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.updateOptimizationStatus();
    });

    // FCP Observer
    this.observeMetric('first-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.metrics.fcp = lastEntry.startTime;
      this.updateOptimizationStatus();
    });

    // CLS Observer
    this.observeMetric('layout-shift', (entries) => {
      let clsValue = this.metrics.cls || 0;
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cls = clsValue;
      this.updateOptimizationStatus();
    });

    // FID Observer
    this.observeMetric('first-input', (entries) => {
      const firstEntry = entries[0];
      this.metrics.fid = firstEntry.processingStart - firstEntry.startTime;
      this.updateOptimizationStatus();
    });

    // Navigation timing for TTFB
    this.measureNavigationTiming();
  }

  private observeMetric(entryType: string, callback: (entries: any[]) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
        if (this.reportCallback) {
          this.reportCallback(this.metrics);
        }
      });
      observer.observe({ entryTypes: [entryType] });
      this.observers.push(observer);
    } catch (e) {
      console.warn(`Performance metric ${entryType} not supported`);
    }
  }

  private measureNavigationTiming() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.loadTime = navigation.loadEventEnd - navigation.navigationStart;
        this.updateOptimizationStatus();
      }
    });
  }

  private updateOptimizationStatus() {
    const { lcp, fcp, cls, fid, ttfb } = this.metrics;
    
    this.metrics.isOptimized = Boolean(
      (!lcp || lcp <= PERFORMANCE_BUDGET.lcp) &&
      (!fcp || fcp <= PERFORMANCE_BUDGET.fcp) &&
      (!cls || cls <= PERFORMANCE_BUDGET.cls) &&
      (!fid || fid <= PERFORMANCE_BUDGET.fid) &&
      (!ttfb || ttfb <= PERFORMANCE_BUDGET.ttfb)
    );
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getPerformanceScore(): number {
    const { lcp, fcp, cls, fid } = this.metrics;
    
    if (!lcp || !fcp || cls === undefined || !fid) {
      return 0;
    }

    const lcpScore = Math.max(0, 100 - (lcp / PERFORMANCE_BUDGET.lcp) * 100);
    const fcpScore = Math.max(0, 100 - (fcp / PERFORMANCE_BUDGET.fcp) * 100);
    const clsScore = Math.max(0, 100 - (cls / PERFORMANCE_BUDGET.cls) * 100);
    const fidScore = Math.max(0, 100 - (fid / PERFORMANCE_BUDGET.fid) * 100);

    return Math.round((lcpScore + fcpScore + clsScore + fidScore) / 4);
  }

  public reportPerformanceBudget(): void {
    const metrics = this.getMetrics();
    const score = this.getPerformanceScore();
    
    console.group('🚀 Performance Monitor Report');
    console.log('Score:', score + '/100');
    console.log('LCP:', metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A', metrics.lcp && metrics.lcp > PERFORMANCE_BUDGET.lcp ? '⚠️' : '✅');
    console.log('FCP:', metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A', metrics.fcp && metrics.fcp > PERFORMANCE_BUDGET.fcp ? '⚠️' : '✅');
    console.log('CLS:', metrics.cls ? metrics.cls.toFixed(3) : 'N/A', metrics.cls && metrics.cls > PERFORMANCE_BUDGET.cls ? '⚠️' : '✅');
    console.log('FID:', metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A', metrics.fid && metrics.fid > PERFORMANCE_BUDGET.fid ? '⚠️' : '✅');
    console.log('TTFB:', metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A', metrics.ttfb && metrics.ttfb > PERFORMANCE_BUDGET.ttfb ? '⚠️' : '✅');
    console.groupEnd();
  }

  public disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance for global use
export const performanceMonitor = new PerformanceMonitor();

// Helper functions
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

export const prefetchResource = (href: string) => {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector(`link[href="${href}"][rel="prefetch"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

export const preconnectToDomain = (href: string) => {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector(`link[href="${href}"][rel="preconnect"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};
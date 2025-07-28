
/**
 * Performance optimization utilities
 */

/**
 * Preload critical resources for better Core Web Vitals
 */
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  const criticalResources = [
    { href: '/poda-logo.svg', as: 'image' },
    { href: '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    // Check if already preloaded to avoid duplicates
    const existing = document.querySelector(`link[href="${resource.href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

/**
 * Optimize bundle loading with resource hints
 */
export const optimizeBundleLoading = () => {
  if (typeof document === 'undefined') return;

  // Preconnect to important domains (avoid duplicates)
  const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
  
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
};

/**
 * Memory-efficient debounce
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Optimized throttle for scroll events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Measure and report Core Web Vitals
 */
export const measureCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Measure LCP (Largest Contentful Paint)
  const observeLCP = () => {
    try {
      const observer = new PerformanceObserver((list) => {
        if (process.env.NODE_ENV === 'development') {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          console.log('LCP:', lastEntry.startTime);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }
  };

  // Measure CLS (Cumulative Layout Shift)
  const observeCLS = () => {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (process.env.NODE_ENV === 'development') {
          console.log('CLS:', clsValue);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }
  };

  observeLCP();
  observeCLS();
};

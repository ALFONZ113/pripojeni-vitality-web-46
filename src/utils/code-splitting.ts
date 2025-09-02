/**
 * Code splitting utilities for better performance
 */

/**
 * Lazy load heavy components only when needed
 */
export const lazyLoadHeavyComponents = () => {
  if (typeof document === 'undefined') return;
  
  // Only load when user interacts or scrolls
  const loadOnDemand = () => {
    // Load UI components bundle when needed
    if (!window.__UI_LOADED) {
      import('../components/ui/dialog').catch(() => {});
      import('../components/ui/drawer').catch(() => {});
      window.__UI_LOADED = true;
    }
  };

  // Defer until user interaction or scroll
  ['mousedown', 'touchstart', 'scroll'].forEach(event => {
    document.addEventListener(event, loadOnDemand, { once: true, passive: true });
  });
  
  // Fallback timeout
  setTimeout(loadOnDemand, 3000);
};

/**
 * Preload critical routes and components
 */
export const preloadCriticalRoutes = () => {
  if (typeof document === 'undefined') return;

  // Only preload truly critical routes
  const criticalRoutes = ['/kontakt'];

  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

/**
 * Optimize bundle loading based on priority - defer non-critical
 */
export const optimizeChunkLoading = () => {
  if (typeof document === 'undefined') return;

  // Only preload truly critical chunks
  const criticalChunks = ['vendor'];

  criticalChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/assets/${chunk}.js`;
    document.head.appendChild(link);
  });
  
  // Defer non-critical chunks
  setTimeout(() => {
    const deferredChunks = ['ui', 'utils', 'animations'];
    deferredChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `/assets/${chunk}.js`;
      document.head.appendChild(link);
    });
  }, 2000);
};

/**
 * Monitor bundle size and performance
 */
export const monitorBundlePerformance = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  // Monitor resource loading times
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.name.includes('.js') || entry.name.includes('.css')) {
        console.log(`Bundle loaded: ${entry.name} in ${entry.duration}ms`);
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

/**
 * Conditionally load Mapy.cz only when needed
 */
export const loadMapyWhenNeeded = () => {
  if (typeof window === 'undefined' || window.__MAPY_LOADED) return;
  
  const needsMapy = () => {
    return document.querySelector('[data-needs-mapy]') || 
           window.location.pathname.includes('/kontakt') ||
           document.querySelector('input[data-mapy-suggest]');
  };
  
  if (needsMapy()) {
    const script = document.createElement('script');
    script.src = 'https://api.mapy.cz/loader.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.initMapy === 'function') {
        window.initMapy();
      }
      window.__MAPY_LOADED = true;
    };
    document.head.appendChild(script);
  }
};

declare global {
  interface Window {
    __UI_LOADED?: boolean;
    __MAPY_LOADED?: boolean;
    initMapy?: () => void;
  }
}

export default {
  preloadCriticalRoutes,
  optimizeChunkLoading,
  monitorBundlePerformance,
  lazyLoadHeavyComponents,
  loadMapyWhenNeeded
};
/**
 * Code splitting utilities for better performance
 */

/**
 * Preload critical routes and components
 */
export const preloadCriticalRoutes = () => {
  if (typeof document === 'undefined') return;

  // Preload critical route bundles
  const criticalRoutes = [
    '/blog',
    '/kontakt',
    '/tarify'
  ];

  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

/**
 * Optimize bundle loading based on priority
 */
export const optimizeChunkLoading = () => {
  if (typeof document === 'undefined') return;

  // Preload high-priority chunks
  const highPriorityChunks = [
    'vendor',
    'ui',
    'utils'
  ];

  highPriorityChunks.forEach(chunk => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/assets/${chunk}.js`;
    document.head.appendChild(link);
  });
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

export default {
  preloadCriticalRoutes,
  optimizeChunkLoading,
  monitorBundlePerformance
};
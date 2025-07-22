/**
 * Code splitting utilities for better performance
 */

/**
 * Preload critical routes and components with enhanced strategy
 */
export const preloadCriticalRoutes = () => {
  if (typeof document === 'undefined') return;

  // Immediate preload for critical routes
  const criticalRoutes = [
    '/blog',
    '/kontakt',
    '/tarify'
  ];

  // Prefetch for likely navigation routes
  const prefetchRoutes = [
    '/iptv',
    '/internet-tv',
    '/internet-ostrava',
    '/internet-poruba'
  ];

  // Preload critical routes immediately
  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = route;
    document.head.appendChild(link);
  });

  // Prefetch other routes with slight delay
  setTimeout(() => {
    prefetchRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, 2000);
};

/**
 * Optimize bundle loading with intelligent preloading
 */
export const optimizeChunkLoading = () => {
  if (typeof document === 'undefined') return;

  // Detect connection speed and adjust strategy
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');

  if (isSlowConnection) {
    // Only preload most critical chunks on slow connections
    preloadChunk('vendor-react');
    return;
  }

  // Progressive chunk loading strategy
  const chunkLoadingStrategy = [
    // Critical (load immediately)
    { chunks: ['vendor-react', 'chunk-ui'], delay: 0 },
    // Important (load after 1s)
    { chunks: ['vendor-ui', 'chunk-utils'], delay: 1000 },
    // Nice-to-have (load after 3s)
    { chunks: ['vendor-animation', 'chunk-blog'], delay: 3000 }
  ];

  chunkLoadingStrategy.forEach(({ chunks, delay }) => {
    setTimeout(() => {
      chunks.forEach(chunk => preloadChunk(chunk));
    }, delay);
  });
};

/**
 * Preload a specific chunk
 */
const preloadChunk = (chunkName: string) => {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = `/assets/js/${chunkName}-[hash].js`;
  
  // Check if already preloaded
  const existing = document.querySelector(`link[href*="${chunkName}"]`);
  if (!existing) {
    document.head.appendChild(link);
  }
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
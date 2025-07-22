/**
 * Asset optimization utilities for better performance
 */

/**
 * Create preload links for critical assets
 */
export const preloadCriticalAssets = () => {
  if (typeof document === 'undefined') return;

  const criticalAssets: Array<{
    href: string;
    as: string;
    type?: string;
    crossorigin?: string;
  }> = [
    // Critical CSS
    { href: '/assets/css/index.css', as: 'style' },
    // Critical fonts (if any)
    // { href: '/assets/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset.href;
    link.as = asset.as;
    if (asset.type) link.type = asset.type;
    if (asset.crossorigin) link.crossOrigin = asset.crossorigin;
    
    // Avoid duplicates
    const existingLink = document.querySelector(`link[href="${asset.href}"]`);
    if (!existingLink) {
      document.head.appendChild(link);
    }
  });
};

/**
 * Preload route chunks for better navigation performance
 */
export const preloadRouteChunks = (routes: string[]) => {
  if (typeof document === 'undefined') return;

  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

/**
 * Optimize image loading with WebP support and responsive sizing
 */
export const optimizeImageSrc = (src: string, width?: number): string => {
  // Add responsive sizing if width is provided
  if (width && src.includes('/lovable-uploads/')) {
    // For Lovable uploads, we can add width parameter
    return `${src}?w=${width}&auto=format,compress`;
  }
  
  // Return original for other sources
  return src;
};

/**
 * Create resource hints for better loading performance
 */
export const createResourceHints = () => {
  if (typeof document === 'undefined') return;

  // DNS prefetch for external domains
  const externalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
};

/**
 * Lazy load non-critical CSS
 */
export const loadNonCriticalCSS = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

/**
 * Monitor and report performance metrics
 */
export const reportWebVitals = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;

  // Report Core Web Vitals
  const reportMetric = (metric: any) => {
    // You can send this data to analytics service
    console.log(`Web Vital: ${metric.name}`, metric.value);
  };

  // Observe performance entries
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(reportMetric);
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
};

export default {
  preloadCriticalAssets,
  preloadRouteChunks,
  optimizeImageSrc,
  createResourceHints,
  loadNonCriticalCSS,
  reportWebVitals
};
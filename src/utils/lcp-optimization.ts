/**
 * LCP (Largest Contentful Paint) optimization utilities
 */

/**
 * Preload critical resources for improved LCP
 */
export const preloadCriticalResourcesForLCP = () => {
  if (typeof document === 'undefined') return;

  const criticalResources = [
    { href: '/poda-logo.svg', as: 'image', type: 'image/svg+xml' },
    { href: '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png', as: 'image', type: 'image/png' }
  ];

  criticalResources.forEach(resource => {
    const existing = document.querySelector(`link[href="${resource.href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      link.type = resource.type;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  });
};

/**
 * Optimize fonts for better LCP
 */
export const optimizeFontsForLCP = () => {
  if (typeof document === 'undefined') return;

  // Preconnect to font domains
  const fontDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  fontDomains.forEach(domain => {
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
 * Initialize LCP optimizations
 */
export const initializeLCPOptimizations = () => {
  // Run immediately
  preloadCriticalResourcesForLCP();
  optimizeFontsForLCP();
  
  // Run on DOM ready if not already ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResourcesForLCP();
      optimizeFontsForLCP();
    });
  }
};
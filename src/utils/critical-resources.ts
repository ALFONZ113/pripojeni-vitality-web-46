
/**
 * Critical resource preloading utilities for faster page loads
 */

/**
 * Preload critical CSS and JS resources
 */
export const preloadCriticalResources = () => {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const fontLinks = [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' }
  ];

  fontLinks.forEach(({ href, rel, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
    '/poda-logo.svg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Initialize critical resources on page load
 */
export const initCriticalResources = () => {
  // Run immediately
  preloadCriticalResources();
  
  // Add critical CSS classes for animations
  document.documentElement.classList.add('critical-resources-loaded');
};

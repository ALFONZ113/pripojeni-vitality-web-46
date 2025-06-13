
/**
 * Optimized lazy loading utilities for improved performance
 */

/**
 * Simplified intersection observer for lazy loading
 */
export const createImageLazyLoader = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          img.classList.add('lazy-loaded');
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px 0px', // Zvýšený margin pre rýchlejšie načítanie
    threshold: 0.01
  });

  // Observe lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  return imageObserver;
};

/**
 * Preload only essential resources
 */
export const preloadCriticalResources = (resources: string[]) => {
  if (typeof document === 'undefined') return;

  // Preload len prvé 3 najdôležitejšie zdroje
  resources.slice(0, 3).forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (/\.(jpg|jpeg|png|webp|svg)$/i.test(resource)) {
      link.as = 'image';
    }
    
    link.href = resource;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Optimized debounce function
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
 * Simplified throttle function
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

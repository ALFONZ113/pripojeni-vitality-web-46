
/**
 * Advanced image optimization utilities
 */

/**
 * Generate responsive image srcset with WebP support
 */
export const generateResponsiveImageProps = (
  baseSrc: string,
  alt: string,
  sizes: number[] = [320, 480, 768, 1024, 1280],
  priority: boolean = false
) => {
  const extension = baseSrc.split('.').pop()?.toLowerCase();
  const baseName = baseSrc.replace(`.${extension}`, '');
  
  // Generate WebP sources
  const webpSrcset = sizes
    .map(size => `${baseName}-${size}w.webp ${size}w`)
    .join(', ');
    
  // Generate fallback sources
  const fallbackSrcset = sizes
    .map(size => `${baseName}-${size}w.${extension} ${size}w`)
    .join(', ');

  return {
    src: baseSrc,
    alt,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: priority ? 'sync' as const : 'async' as const,
    fetchPriority: priority ? 'high' as const : 'auto' as const,
    srcSet: fallbackSrcset,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    webpSrcset,
    crossOrigin: 'anonymous' as const
  };
};

/**
 * Create optimized picture element markup
 */
export const createOptimizedPicture = (
  src: string,
  alt: string,
  className?: string,
  priority: boolean = false
) => {
  const props = generateResponsiveImageProps(src, alt, undefined, priority);
  
  return {
    sources: [
      {
        srcSet: props.webpSrcset,
        type: 'image/webp',
        sizes: props.sizes
      }
    ],
    img: {
      src: props.src,
      srcSet: props.srcSet,
      alt: props.alt,
      loading: props.loading,
      decoding: props.decoding,
      fetchPriority: props.fetchPriority,
      className: className || '',
      crossOrigin: props.crossOrigin
    }
  };
};

/**
 * Lazy load images with intersection observer
 */
export const setupLazyImageLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        if (srcset) {
          img.srcset = srcset;
          img.removeAttribute('data-srcset');
        }
        
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  return imageObserver;
};

/**
 * Preload critical images
 */
export const preloadCriticalImages = (images: string[]) => {
  if (typeof document === 'undefined') return;
  
  // Only preload first 2-3 most critical images
  images.slice(0, 3).forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

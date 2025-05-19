
/**
 * Utility functions for handling images throughout the application
 */

/**
 * Handles image loading errors by replacing with a placeholder
 * and implementing progressive image loading
 * @param e - The error event from the image
 * @param fallbackPath - Optional custom fallback image path
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackPath: string = '/placeholder.svg') => {
  const target = e.currentTarget;
  console.warn(`Failed to load image: ${target.src}`);
  
  // Try with full URL if it's a relative path
  if (target.src.startsWith(window.location.origin) === false && target.src.startsWith('/')) {
    console.log(`Trying with full URL for ${target.src}`);
    const fullUrl = window.location.origin + target.src;
    target.src = fullUrl;
    return;
  }
  
  // Set a tiny timeout to prevent error cascade and improve perceived performance
  setTimeout(() => {
    target.src = fallbackPath;
    target.onerror = null; // Prevent infinite error loop
    
    // Add a class for fade-in effect
    target.classList.add('fade-in');
  }, 50);
};

/**
 * Generates responsive image props with appropriate loading strategies
 * @param src - The image source
 * @param alt - The image alt text
 * @param width - Optional width for image attribute
 * @param height - Optional height for image attribute
 * @param priority - Whether this is a priority image that should be loaded eagerly
 */
export const responsiveImageProps = (
  src: string, 
  alt: string, 
  width?: number, 
  height?: number,
  priority: boolean = false
) => {
  // For local static images, ensure proper path resolution
  const imageSrc = src.startsWith('/') && !src.startsWith('//') ? 
    `${window.location.origin}${src}` : src;
    
  return {
    src: imageSrc,
    alt: alt || '',
    loading: priority ? 'eager' as const : 'lazy' as const,
    width: width ?? undefined,
    height: height ?? undefined,
    fetchPriority: priority ? 'high' as const : 'auto' as const,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => handleImageError(e),
    // Add decode attribute for better image rendering performance
    decoding: priority ? 'sync' as const : 'async' as const
  };
};

/**
 * Preloads critical images to improve LCP (Largest Contentful Paint)
 * @param imagePaths - Array of image paths to preload
 */
export const preloadCriticalImages = (imagePaths: string[]) => {
  if (typeof document === 'undefined') return;
  
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path.startsWith('/') ? window.location.origin + path : path;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

/**
 * Ensures consistent image URL format across the application
 * @param path - The image path
 * @returns The properly formatted image URL
 */
export const getImageUrl = (path: string): string => {
  if (!path) return '/placeholder.svg';
  
  // External URL
  if (path.startsWith('http')) return path;
  
  // Local path
  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Register an image with the service worker for caching
 * @param imagePath - Path to the image
 */
export const registerImageForCache = (imagePath: string): void => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CACHE_IMAGE',
      url: imagePath
    });
  }
};

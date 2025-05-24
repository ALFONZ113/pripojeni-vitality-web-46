
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
  
  // Prevent infinite error loops
  if (target.src === fallbackPath) {
    console.error('Fallback image also failed to load');
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
  return {
    src,
    alt: alt || '',
    loading: priority ? 'eager' as const : 'lazy' as const,
    width: width ?? undefined,
    height: height ?? undefined,
    fetchPriority: priority ? 'high' as const : 'auto' as const,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => handleImageError(e),
    // Add decode attribute for better image rendering performance
    decoding: priority ? 'sync' as const : 'async' as const,
    // Add crossorigin for better caching
    crossOrigin: 'anonymous' as const
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
    link.href = path;
    link.fetchPriority = 'high';
    link.crossOrigin = 'anonymous';
    
    // Add error handling for preloaded images
    link.onerror = () => {
      console.warn(`Failed to preload image: ${path}`);
    };
    
    document.head.appendChild(link);
  });
};

/**
 * Validates if an image URL is accessible
 * @param src - The image source URL
 * @returns Promise that resolves to true if image is accessible
 */
export const validateImageUrl = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

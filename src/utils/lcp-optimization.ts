/**
 * LCP (Largest Contentful Paint) optimization utilities
 * Focused on improving Core Web Vitals performance
 */

/**
 * Initialize LCP optimizations
 */
export const initializeLCPOptimizations = (): void => {
  // Optimize critical images immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeCriticalImages);
  } else {
    optimizeCriticalImages();
  }
};

/**
 * Preload critical images to improve LCP
 */
export const preloadCriticalImage = (src: string, priority: 'high' | 'auto' = 'high'): void => {
  // Avoid duplicate preload links
  if (document.querySelector(`link[rel="preload"][href="${src}"]`)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', priority);
  
  // Insert at the beginning of head for faster loading
  document.head.insertBefore(link, document.head.firstChild);
};

/**
 * Optimize image format for better LCP
 */
export const optimizeImageSrc = (src: string): string => {
  // Convert to WebP if browser supports it and image is not already WebP
  if (supportsWebP() && !src.endsWith('.webp')) {
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    // Return WebP version if it exists, otherwise return original
    return webpSrc;
  }
  return src;
};

/**
 * Check WebP support
 */
const supportsWebP = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
};

/**
 * Critical CSS inlining helper
 */
export const inlineCriticalCSS = (css: string): void => {
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.insertBefore(style, document.head.querySelector('link[rel="stylesheet"]'));
};

/**
 * Critical image loading optimization
 */
export const optimizeCriticalImages = (): void => {
  // Find all images with priority loading attribute
  const priorityImages = document.querySelectorAll('img[fetchpriority="high"]');
  
  priorityImages.forEach((img) => {
    const imageElement = img as HTMLImageElement;
    
    // Ensure immediate loading
    if (imageElement.loading === 'lazy') {
      imageElement.loading = 'eager';
    }
    
    // Set sync decoding for critical images
    if (imageElement.decoding !== 'sync') {
      imageElement.decoding = 'sync';
    }
  });
};
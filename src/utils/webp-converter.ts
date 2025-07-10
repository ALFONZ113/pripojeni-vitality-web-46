
/**
 * WebP image optimization utilities
 */

/**
 * Check if browser supports WebP format
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Convert image path to WebP format with fallback
 */
export const getOptimizedImageSrc = async (originalSrc: string): Promise<string> => {
  const isWebPSupported = await supportsWebP();
  
  if (!isWebPSupported) {
    return originalSrc;
  }
  
  // If the image is already WebP, return as is
  if (originalSrc.endsWith('.webp')) {
    return originalSrc;
  }
  
  // Convert common image extensions to WebP
  const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Check if WebP version exists
  try {
    const response = await fetch(webpSrc, { method: 'HEAD' });
    if (response.ok) {
      return webpSrc;
    }
  } catch {
    // If WebP version doesn't exist, return original
  }
  
  return originalSrc;
};

/**
 * Generate responsive image srcset
 */
export const generateResponsiveSrcSet = (baseSrc: string, sizes: number[] = [320, 640, 1024, 1280, 1920]): string => {
  const extension = baseSrc.split('.').pop();
  const baseName = baseSrc.replace(`.${extension}`, '');
  
  return sizes
    .map(size => `${baseName}-${size}w.webp ${size}w`)
    .join(', ');
};

/**
 * Generate picture element with WebP support
 */
export const createPictureElement = (
  src: string,
  alt: string,
  className?: string,
  sizes?: string
): string => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return `
    <picture>
      <source srcset="${webpSrc}" type="image/webp">
      <img src="${src}" alt="${alt}" class="${className || ''}" ${sizes ? `sizes="${sizes}"` : ''}>
    </picture>
  `;
};

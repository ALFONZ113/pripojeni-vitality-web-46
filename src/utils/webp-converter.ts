
/**
 * Advanced WebP image optimization utilities with browser compatibility
 */

/**
 * Check if browser supports WebP format with different methods
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // First check if browser has native WebP support
    if (typeof window !== 'undefined' && 'HTMLCanvasElement' in window) {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const supportsWebPLossy = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        if (supportsWebPLossy) {
          resolve(true);
          return;
        }
      }
    }
    
    // Fallback test with actual WebP image
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Convert any image to WebP format
 */
export const convertToWebP = async (file: File, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert image to WebP'));
            }
          },
          'image/webp',
          quality
        );
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Convert image path to WebP format with fallback and optimization
 */
export const getOptimizedImageSrc = async (originalSrc: string): Promise<string> => {
  // Skip if already WebP
  if (originalSrc.endsWith('.webp')) {
    return originalSrc;
  }
  
  const isWebPSupported = await supportsWebP();
  
  if (!isWebPSupported) {
    return originalSrc;
  }
  
  // Convert common image extensions to WebP
  const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  
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
 * Generate responsive WebP srcset with multiple sizes
 */
export const generateWebPSrcSet = (baseSrc: string, sizes: number[] = [320, 640, 1024, 1280, 1920]): string => {
  const extension = baseSrc.split('.').pop();
  const baseName = baseSrc.replace(`.${extension}`, '');
  
  return sizes
    .map(size => {
      const webpSrc = `${baseName}-${size}w.webp`;
      return `${webpSrc} ${size}w`;
    })
    .join(', ');
};

/**
 * Create optimized picture element with WebP and fallbacks
 */
export const createOptimizedPicture = (
  src: string,
  alt: string,
  className?: string,
  sizes?: string,
  loading: 'lazy' | 'eager' = 'lazy'
): string => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  const srcSet = generateWebPSrcSet(src);
  const webpSrcSet = generateWebPSrcSet(webpSrc);
  
  return `
    <picture>
      <source srcset="${webpSrcSet}" type="image/webp" ${sizes ? `sizes="${sizes}"` : ''}>
      <source srcset="${srcSet}" type="image/${src.split('.').pop()}" ${sizes ? `sizes="${sizes}"` : ''}>
      <img src="${src}" alt="${alt}" class="${className || ''}" loading="${loading}" decoding="async">
    </picture>
  `;
};

/**
 * Batch convert multiple images to WebP
 */
export const batchConvertToWebP = async (files: File[], quality: number = 0.8): Promise<Blob[]> => {
  const conversions = files.map(file => convertToWebP(file, quality));
  return Promise.all(conversions);
};

/**
 * Get optimal image format based on browser support and file size
 */
export const getOptimalFormat = async (originalSize: number): Promise<'webp' | 'original'> => {
  const isWebPSupported = await supportsWebP();
  
  if (!isWebPSupported) {
    return 'original';
  }
  
  // For very small images, WebP overhead might not be worth it
  if (originalSize < 1024) {
    return 'original';
  }
  
  return 'webp';
};

/**
 * Compress and optimize image for web
 */
export const optimizeImageForWeb = async (
  file: File, 
  maxWidth: number = 1920, 
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      let { width, height } = img;
      
      // Resize if too large
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to optimize image'));
            }
          },
          'image/webp',
          quality
        );
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

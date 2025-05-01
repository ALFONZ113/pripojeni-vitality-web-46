
/**
 * Utility functions for handling images throughout the application
 */

/**
 * Handles image loading errors by replacing with a placeholder
 * @param e - The error event from the image
 * @param fallbackPath - Optional custom fallback image path
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallbackPath: string = '/placeholder.svg') => {
  const target = e.currentTarget;
  console.warn(`Failed to load image: ${target.src}`);
  target.src = fallbackPath;
  target.onerror = null; // Prevent infinite error loop
};

/**
 * Generates responsive image props
 * @param src - The image source
 * @param alt - The image alt text
 * @param width - Optional width for image attribute
 * @param height - Optional height for image attribute
 */
export const responsiveImageProps = (src: string, alt: string, width?: number, height?: number) => {
  return {
    src,
    alt: alt || '',
    loading: 'lazy' as const,
    width: width ?? undefined,
    height: height ?? undefined,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => handleImageError(e)
  };
};

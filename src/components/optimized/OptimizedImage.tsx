import React, { memo, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholderClassName?: string;
  lazy?: boolean;
  priority?: boolean;
  onLoadComplete?: () => void;
}

const OptimizedImage = memo(({
  src,
  alt,
  fallbackSrc,
  className,
  placeholderClassName = 'bg-gray-200 animate-pulse',
  lazy = true,
  priority = false,
  onLoadComplete,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');

  // Intersection observer for lazy loading
  const [intersectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  // Load image when visible or priority
  useEffect(() => {
    if (priority || !lazy) {
      setCurrentSrc(src);
      return;
    }

    if (isVisible && !currentSrc) {
      setCurrentSrc(src);
    }
  }, [isVisible, src, priority, lazy, currentSrc]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoadComplete?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }
  };

  // Preload high priority images
  useEffect(() => {
    if (priority && typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  }, [priority, src]);

  return (
    <div className={cn('relative overflow-hidden', className)} ref={intersectionRef}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            placeholderClassName
          )}
          aria-hidden="true"
        />
      )}

      {/* Image */}
      {currentSrc && (
        <img
          {...props}
          src={currentSrc}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          decoding="async"
        />
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div 
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400',
            className
          )}
        >
          <svg 
            className="h-8 w-8" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
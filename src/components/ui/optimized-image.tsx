import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholder = '/placeholder.svg',
  blurDataURL,
  sizes,
  className,
  onLoad,
  onError,
  quality = 85,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized src with parameters
  const getOptimizedSrc = (originalSrc: string, targetWidth?: number) => {
    if (originalSrc.includes('/lovable-uploads/')) {
      const params = new URLSearchParams();
      if (targetWidth) params.set('w', targetWidth.toString());
      params.set('q', quality.toString());
      params.set('auto', 'format,compress');
      return `${originalSrc}?${params.toString()}`;
    }
    return originalSrc;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width || !src.includes('/lovable-uploads/')) return undefined;
    
    const breakpoints = [width, width * 2];
    return breakpoints
      .map(w => `${getOptimizedSrc(src, w)} ${w}w`)
      .join(', ');
  };

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  const shouldLoad = isInView || priority;
  const imageSrc = shouldLoad ? (isError ? placeholder : getOptimizedSrc(src, width)) : placeholder;
  const imageSrcSet = shouldLoad && !isError ? generateSrcSet() : undefined;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && shouldLoad && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
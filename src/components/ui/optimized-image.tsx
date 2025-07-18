
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { generateResponsiveImageProps, createOptimizedPicture } from '@/utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  width?: number;
  height?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  placeholder = '/placeholder.svg',
  onLoad,
  onError,
  sizes,
  width,
  height,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

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
        rootMargin: '100px',
        threshold: 0.01
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

  const pictureData = createOptimizedPicture(src, alt, className, priority);
  const shouldLoad = isInView || priority;

  return (
    <picture className={cn("block", className)}>
      {/* WebP sources */}
      {shouldLoad && pictureData.sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          type={source.type}
          sizes={sizes || source.sizes}
        />
      ))}
      
      {/* Fallback img */}
      <img
        ref={imgRef}
        src={shouldLoad ? (isError ? placeholder : pictureData.img.src) : placeholder}
        srcSet={shouldLoad && !isError ? pictureData.img.srcSet : undefined}
        alt={pictureData.img.alt}
        width={width}
        height={height}
        loading={pictureData.img.loading}
        decoding={pictureData.img.decoding}
        fetchPriority={pictureData.img.fetchPriority}
        crossOrigin={pictureData.img.crossOrigin}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          !shouldLoad && 'lazy-loading'
        )}
        onLoad={handleLoad}
        onError={handleError}
        sizes={sizes}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </picture>
  );
};

export default OptimizedImage;

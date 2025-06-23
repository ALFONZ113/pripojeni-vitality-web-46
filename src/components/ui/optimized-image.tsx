
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  placeholder = '/placeholder.svg',
  priority = false,
  className,
  onLoad,
  onError,
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(priority ? src : placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    if (imageSrc !== placeholder) {
      setImageSrc(placeholder);
    }
    onError?.();
  };

  return (
    <div className={cn("relative overflow-hidden", aspectRatio && `aspect-[${aspectRatio}]`, className)}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
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
      
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;

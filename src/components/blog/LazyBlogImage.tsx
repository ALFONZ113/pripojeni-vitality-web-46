import { useState, useRef } from 'react';
import useIntersectionObserver from '../../hooks/use-intersection-observer';
import LoadingSkeleton from '../ui/loading-skeleton';
import { cn } from '@/lib/utils';

interface LazyBlogImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyBlogImage = ({ 
  src, 
  alt, 
  className,
  priority = false,
  onLoad,
  onError 
}: LazyBlogImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [targetRef, isInView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  // Load immediately if priority, otherwise wait for intersection
  const shouldLoad = priority || isInView;
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Failed to load blog image: ${src}`);
    setHasError(true);
    onError?.();
  };

  // If error occurred, don't render anything to avoid broken image icon
  if (hasError) {
    return null;
  }

  return (
    <div ref={priority ? undefined : targetRef} className={cn("relative overflow-hidden bg-muted", className)}>
      {!isLoaded && !priority && (
        <LoadingSkeleton 
          variant="image" 
          className="absolute inset-0" 
        />
      )}
      
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded || priority ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      )}
    </div>
  );
};

export default LazyBlogImage;
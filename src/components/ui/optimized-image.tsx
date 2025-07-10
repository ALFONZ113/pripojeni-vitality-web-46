
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImageSrc, supportsWebP } from '@/utils/webp-converter';
import LoadingSkeleton from './loading-skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  skeletonClassName?: string;
  enableWebP?: boolean;
  responsive?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  priority = false,
  sizes,
  quality = 0.8,
  className,
  onLoad,
  onError,
  skeletonClassName,
  enableWebP = true,
  responsive = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [webPSupported, setWebPSupported] = useState<boolean | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check WebP support
  useEffect(() => {
    if (enableWebP) {
      supportsWebP().then(setWebPSupported);
    } else {
      setWebPSupported(false);
    }
  }, [enableWebP]);

  // Optimize image source when WebP support is determined
  useEffect(() => {
    if (enableWebP && webPSupported !== null && isInView) {
      if (webPSupported) {
        getOptimizedImageSrc(src).then(setOptimizedSrc);
      } else {
        setOptimizedSrc(src);
      }
    } else if (!enableWebP) {
      setOptimizedSrc(src);
    }
  }, [src, enableWebP, webPSupported, isInView]);

  // Intersection Observer for lazy loading
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
    console.warn(`Failed to load optimized image: ${optimizedSrc}, falling back to: ${fallbackSrc}`);
    setIsError(true);
    onError?.();
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!responsive) return undefined;
    
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    const isWebP = baseSrc.endsWith('.webp');
    
    const sizesArray = [320, 640, 1024, 1280, 1920];
    return sizesArray
      .map(size => {
        const ext = isWebP ? 'webp' : extension;
        return `${baseName}-${size}w.${ext} ${size}w`;
      })
      .join(', ');
  };

  const shouldShowSkeleton = !isLoaded && !isError && isInView && !priority;
  const imageSrc = isInView ? (isError ? fallbackSrc : optimizedSrc) : fallbackSrc;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton - only show for non-priority images */}
      {shouldShowSkeleton && (
        <LoadingSkeleton 
          variant="image" 
          className={cn("absolute inset-0", skeletonClassName)} 
        />
      )}
      
      {/* Simple image without WebP complexity for better reliability */}
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
    </div>
  );
};

export default OptimizedImage;

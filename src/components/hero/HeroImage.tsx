import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroImageProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
}

const HeroImage = ({ desktopSrc, mobileSrc, alt, className = '' }: HeroImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient overlay for better text contrast on mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-10 pointer-events-none" />
      
      {/* Main image with responsive sources */}
      <picture>
        {/* Desktop image */}
        <source
          media="(min-width: 1024px)"
          srcSet={desktopSrc}
          type="image/jpeg"
        />
        
        {/* Mobile image - always load for hero (no lazy loading) */}
        <img
          src={mobileSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoaded ? 'blur-0 scale-100' : 'blur-sm scale-105'
          }`}
          onLoad={handleLoad}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
      )}
      
      {/* Subtle parallax effect on scroll */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default HeroImage;

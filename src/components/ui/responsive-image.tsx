import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  width,
  height
}) => {
  const baseClasses = "max-w-full h-auto transition-all duration-300";
  const loadingStrategy = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClasses} ${className}`}
      loading={loadingStrategy}
      fetchPriority={fetchPriority}
      sizes={sizes}
      width={width}
      height={height}
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src !== '/placeholder.svg') {
          target.src = '/placeholder.svg';
        }
      }}
    />
  );
};

export default ResponsiveImage;
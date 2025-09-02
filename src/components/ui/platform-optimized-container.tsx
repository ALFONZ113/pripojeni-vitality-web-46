import React from 'react';

interface PlatformOptimizedContainerProps {
  children: React.ReactNode;
  className?: string;
  touchOptimized?: boolean;
  responsiveSpacing?: boolean;
}

const PlatformOptimizedContainer: React.FC<PlatformOptimizedContainerProps> = ({
  children,
  className = "",
  touchOptimized = true,
  responsiveSpacing = true
}) => {
  const baseClasses = "w-full";
  
  const touchClasses = touchOptimized 
    ? "touch:select-none active:scale-[0.98] transition-transform duration-200" 
    : "";
    
  const spacingClasses = responsiveSpacing 
    ? "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16" 
    : "";

  return (
    <div className={`${baseClasses} ${touchClasses} ${spacingClasses} ${className}`}>
      {children}
    </div>
  );
};

export default PlatformOptimizedContainer;
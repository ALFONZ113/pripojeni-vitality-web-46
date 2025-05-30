
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  isLoading: boolean;
  className?: string;
  variant?: 'linear' | 'circular' | 'dots';
  size?: 'sm' | 'md' | 'lg';
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  isLoading,
  className,
  variant = 'linear',
  size = 'md'
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading && progress >= 100) return null;

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  if (variant === 'linear') {
    return (
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-gray-200",
        sizeClasses[size],
        className
      )}>
        <div
          className="h-full bg-poda-blue transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  if (variant === 'circular') {
    return (
      <div className={cn("fixed inset-0 flex items-center justify-center z-50 bg-white/50", className)}>
        <div className="relative">
          <div className={cn(
            "animate-spin rounded-full border-2 border-gray-200",
            size === 'sm' && "w-6 h-6",
            size === 'md' && "w-8 h-8",
            size === 'lg' && "w-12 h-12"
          )}>
            <div className="absolute inset-0 rounded-full border-2 border-poda-blue border-t-transparent animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn("fixed inset-0 flex items-center justify-center z-50 bg-white/50", className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full bg-poda-blue animate-pulse",
                size === 'sm' && "w-2 h-2",
                size === 'md' && "w-3 h-3",
                size === 'lg' && "w-4 h-4"
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ProgressIndicator;


import { useState, useEffect } from 'react';

interface OptimizedPageInitOptions {
  criticalImages?: string[];
  enablePerformanceMonitoring?: boolean;
}

const useOptimizedPageInit = (options: OptimizedPageInitOptions = {}) => {
  const { criticalImages = [], enablePerformanceMonitoring = false } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      try {
        // Only preload first 2 critical images
        const imagesToPreload = criticalImages.slice(0, 2);
        
        if (imagesToPreload.length > 0) {
          const imagePromises = imagesToPreload.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          });

          // Don't wait for all images, just try to preload
          Promise.allSettled(imagePromises);
        }

        // Minimal delay for smooth transition
        setTimeout(() => setIsLoading(false), 100);
        
      } catch (err) {
        console.error('Page initialization error:', err);
        setError(err as Error);
        setIsLoading(false);
      }
    };

    initializePage();
  }, [criticalImages]);

  return { isLoading, error };
};

export default useOptimizedPageInit;

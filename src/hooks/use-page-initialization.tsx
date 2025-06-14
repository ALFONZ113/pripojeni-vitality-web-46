
import { useState, useEffect } from 'react';
import { preloadCriticalImages } from '../utils/imageUtils';
import { initAnimations } from '../utils/animation';
import usePerformanceMonitor from './use-performance-monitor';

interface UsePageInitializationProps {
  criticalImages: string[];
  criticalResources?: string[];
  enablePerformanceMonitoring?: boolean;
}

const usePageInitialization = ({ 
  criticalImages, 
  // criticalResources = [], // Not used currently, can be removed if not planned
  enablePerformanceMonitoring = false
}: UsePageInitializationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // loadingProgress is removed as per plan

  const performanceMetrics = usePerformanceMonitor({
    enableReporting: enablePerformanceMonitoring,
    reportInterval: 10000
  });

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    
    const initializeApp = async () => {
      try {
        // Preload only the most critical images
        // preloadCriticalImages(criticalImages.slice(0, 2)); // Assuming this is fast enough

        // Initialize animations with minimal delay
        cleanupAnimation = initAnimations();
        
        // Set loading to false immediately after critical tasks
        setIsLoading(false);
        
      } catch (e) {
        console.error('Error initializing page:', e);
        setError('Došlo k chybě při načítání stránky.');
        setIsLoading(false); // Also set to false in case of error
      }
    };

    initializeApp();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [criticalImages]); // criticalImages dependency is kept

  return { 
    isLoading, 
    error, 
    // loadingProgress removed
    performanceMetrics
  };
};

export default usePageInitialization;


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
  criticalResources = [],
  enablePerformanceMonitoring = false // Vypnuté v produkcii pre rýchlosť
}: UsePageInitializationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Monitor performance metrics len ak je povolené
  const performanceMetrics = usePerformanceMonitor({
    enableReporting: enablePerformanceMonitoring,
    reportInterval: 10000
  });

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    
    const initializeApp = async () => {
      try {
        setLoadingProgress(50);
        
        // Preload len najkritickejšie images
        preloadCriticalImages(criticalImages.slice(0, 2)); // Len prvé 2 obrázky
        setLoadingProgress(80);
        
        // Initialize animations s minimálnym delay
        cleanupAnimation = initAnimations();
        setLoadingProgress(100);
        
        // Krátky delay pre smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
        
      } catch (e) {
        console.error('Error initializing page:', e);
        setError('Došlo k chybě při načítání stránky.');
        setIsLoading(false);
      }
    };

    // Spustiť inicializáciu hneď
    initializeApp();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [criticalImages]);

  return { 
    isLoading, 
    error, 
    loadingProgress,
    performanceMetrics
  };
};

export default usePageInitialization;

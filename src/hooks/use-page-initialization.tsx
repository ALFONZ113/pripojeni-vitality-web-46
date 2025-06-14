
import { useState, useEffect } from 'react';
import { preloadCriticalImages } from '../utils/imageUtils';
import { initAnimations } from '../utils/animation';

interface UsePageInitializationProps {
  criticalImages: string[];
  criticalResources?: string[];
  enablePerformanceMonitoring?: boolean;
}

const usePageInitialization = ({ 
  criticalImages, 
  criticalResources = [],
  enablePerformanceMonitoring = false
}: UsePageInitializationProps) => {
  const [isLoading, setIsLoading] = useState(false); // Začíname s false pre rýchlejšie zobrazenie
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(100); // Začíname na 100%

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    
    const initializeApp = async () => {
      try {
        // Preload len najkritickejší obrázok (hero image)
        if (criticalImages.length > 0) {
          preloadCriticalImages([criticalImages[0]]); // Len prvý obrázok
        }
        
        // Initialize animations asynchrónne (neblokuje rendering)
        requestIdleCallback(() => {
          cleanupAnimation = initAnimations();
        });
        
        // Hned označiť ako načítané
        setIsLoading(false);
        
      } catch (e) {
        console.error('Error initializing page:', e);
        setError('Došlo k chybě při načítání stránky.');
        setIsLoading(false);
      }
    };

    // Spustiť inicializáciu okamžite
    initializeApp();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [criticalImages]);

  return { 
    isLoading, 
    error, 
    loadingProgress,
    performanceMetrics: null // Vypnuté pre performance
  };
};

export default usePageInitialization;


import { useState, useEffect } from 'react';
import { initAnimations } from '../utils/animation';
import usePerformanceMonitor from './use-performance-monitor';

interface UsePageInitializationProps {
  criticalImages: string[];
  criticalResources?: string[];
  enablePerformanceMonitoring?: boolean;
}

const usePageInitialization = ({ 
  criticalImages, 
  enablePerformanceMonitoring = false
}: UsePageInitializationProps) => {
  // Stav isLoading bol odstránený, aby sa predišlo preblikávaniu obsahu.
  const [error, setError] = useState<string | null>(null);

  const performanceMetrics = usePerformanceMonitor({
    enableReporting: enablePerformanceMonitoring,
    reportInterval: 10000
  });

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    
    const initializeApp = async () => {
      try {
        // Inicializácia animácií a ďalšie úlohy na pozadí
        cleanupAnimation = initAnimations();
        
      } catch (e) {
        console.error('Error initializing page:', e);
        setError('Došlo k chybě při načítání stránky.');
      }
    };

    initializeApp();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [criticalImages]);

  return { 
    isLoading: false, // Vždy vrátime false, obsah sa zobrazí okamžite
    error, 
    performanceMetrics
  };
};

export default usePageInitialization;

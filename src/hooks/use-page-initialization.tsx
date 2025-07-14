
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
  // Odstránený loading state - stránka sa zobrazí okamžite
  const [error, setError] = useState<string | null>(null);

  const performanceMetrics = usePerformanceMonitor({
    enableReporting: enablePerformanceMonitoring,
    reportInterval: 10000
  });

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    
    const initializeApp = async () => {
      try {
        // Inicializácia animácií na pozadí
        cleanupAnimation = initAnimations();
        console.log('Page initialized successfully');
        
      } catch (e) {
        console.error('Error initializing page:', e);
        setError('Došlo k chybě při načítání stránky.');
      }
    };

    // Spustiť inicializáciu na pozadí
    initializeApp();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [criticalImages]);

  return { 
    isLoading: false, // Vždy false - okamžite zobrazenie
    error, 
    performanceMetrics
  };
};

export default usePageInitialization;


import { useState, useEffect, useMemo, useCallback } from 'react';
import { initAnimations } from '../utils/animation';
import usePerformanceOptimization from './use-performance-optimization';

interface UsePageInitializationProps {
  criticalImages: string[];
  criticalResources?: string[];
  enablePerformanceMonitoring?: boolean;
}

const usePageInitialization = ({ 
  criticalImages, 
  enablePerformanceMonitoring = false
}: UsePageInitializationProps) => {
  const [error, setError] = useState<string | null>(null);

  // DISABLED - performance monitoring was causing loading issues
  const performanceMetrics = null;

  // Memoizované kritické obrázky
  const memoizedCriticalImages = useMemo(() => criticalImages, [criticalImages]);

  // Optimalizovaná inicializácia
  const initializeApp = useCallback(async () => {
    try {
      return initAnimations();
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      return undefined;
    }
  }, []);

  useEffect(() => {
    let cleanupAnimation: (() => void) | undefined;
    
    initializeApp().then(cleanup => {
      cleanupAnimation = cleanup;
    });

    return () => {
      if (cleanupAnimation) cleanupAnimation();
    };
  }, [initializeApp, memoizedCriticalImages]);

  return { 
    isLoading: false, // Vždy vrátime false, obsah sa zobrazí okamžite
    error, 
    performanceMetrics
  };
};

export default usePageInitialization;

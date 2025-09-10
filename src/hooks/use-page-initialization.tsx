
import { useState, useEffect, useMemo, useCallback } from 'react';
import { initAnimations } from '../utils/animation';
import useOptimizedPerformance from './use-optimized-performance';

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

  // Optimalizovaný performance monitoring
  const performanceMetrics = useOptimizedPerformance({
    enableReporting: enablePerformanceMonitoring,
    reportInterval: 10000,
    enableCriticalResourcePreload: true
  });

  // Memoizované kritické obrázky
  const memoizedCriticalImages = useMemo(() => criticalImages, [criticalImages]);

  // Preload critical resources immediately
  const preloadResources = useCallback(() => {
    if (typeof document !== 'undefined') {
      // Preload critical images for LCP
      memoizedCriticalImages.forEach(src => {
        if (!document.querySelector(`link[href="${src}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = src;
          link.as = 'image';
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }
      });
    }
  }, [memoizedCriticalImages]);

  // Optimalized initialization with immediate resource preloading
  const initializeApp = useCallback(async () => {
    try {
      // Preload resources immediately
      preloadResources();
      return initAnimations();
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      return undefined;
    }
  }, [preloadResources]);

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

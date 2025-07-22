
import { useState, useEffect, useMemo, useCallback } from 'react';
import { initAnimations } from '../utils/animation';

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
  const [isReady, setIsReady] = useState(false);

  // Simplified critical images handling
  const memoizedCriticalImages = useMemo(() => criticalImages, [criticalImages]);

  // Simplified initialization without heavy performance monitoring
  const initializeApp = useCallback(async () => {
    try {
      // Simple animation initialization
      const cleanup = await initAnimations();
      setIsReady(true);
      return cleanup;
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      setIsReady(true); // Still set ready to show content
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
    isLoading: false, // Always show content immediately for better mobile UX
    error,
    isReady
  };
};

export default usePageInitialization;

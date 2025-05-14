
import { useEffect, useState } from 'react';
import { initAnimations } from '../utils/animation';
import HomePageSEO from '../components/seo/HomePageSEO';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorDisplay from '../components/common/ErrorDisplay';
import HomePageContent from '../components/home/HomePageContent';
import { preloadCriticalImages } from '../utils/imageUtils';
import { manageCacheIfNeeded } from '../utils/cacheManager';

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/poda-logo.svg'
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark hydration complete after React takes over
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Initialize animations and preload images
  useEffect(() => {
    // Preload critical images for better LCP
    preloadCriticalImages(CRITICAL_IMAGES);
    
    // Initialize scroll animations with optimized performance
    let cleanupAnimation: (() => void) | undefined;
    
    try {
      console.log('Initializing animations');
      
      // Delay non-critical initializations
      const initTimer = setTimeout(() => {
        cleanupAnimation = initAnimations();
        setIsLoading(false);
        console.log('Page loaded successfully');
      }, 0); // Using minimal timeout to yield to main thread
      
      return () => {
        clearTimeout(initTimer);
        if (cleanupAnimation) cleanupAnimation();
      };
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      setIsLoading(false);
      return () => {
        if (cleanupAnimation) cleanupAnimation();
      };
    }
  }, []);

  // Cache management using our extracted utility
  useEffect(() => {
    manageCacheIfNeeded(isHydrated);
  }, [isHydrated]);

  if (isLoading) {
    return <LoadingIndicator fullScreen size="large" />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <HomePageSEO />
      <HomePageContent />
    </>
  );
};

export default Index;


import { useEffect, useState, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import { initAnimations } from '../utils/animation';
import { preloadCriticalImages } from '../utils/imageUtils';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';

// Import refactored components
import MetaTags from '../components/index/MetaTags';
import Loading from '../components/index/Loading';
import ErrorDisplay from '../components/index/ErrorDisplay';
import CacheManager from '../components/index/CacheManager';

// Lazy-loaded components for better initial loading
const ChannelsSection = lazy(() => import('../components/ChannelsSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const BlogPreview = lazy(() => import('../components/BlogPreview'));

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/poda-logo.svg'
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [renderTimeout, setRenderTimeout] = useState(false);

  // Mark hydration complete after React takes over
  useEffect(() => {
    setIsHydrated(true);
    
    // Remove loading indicator when app is mounted
    const loadingIndicator = document.getElementById('initialLoadingIndicator');
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '0';
      loadingIndicator.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (loadingIndicator.parentNode) {
          loadingIndicator.parentNode.removeChild(loadingIndicator);
        }
      }, 500);
    }
    
    // Add safety timeout - ensure we show something even if loading hangs
    const timeoutId = setTimeout(() => {
      setRenderTimeout(true);
      setIsLoading(false);
      console.log('🕒 Safety timeout triggered: forcing render');
    }, 5000); // Show content after 5 seconds no matter what
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle app initialization
  useEffect(() => {
    // Preload critical images for better LCP
    preloadCriticalImages(CRITICAL_IMAGES);
    
    // Initialize scroll animations with optimized performance
    let cleanupAnimation: (() => void) | undefined;
    
    try {
      console.log('Initializing animations');
      
      // Delay non-critical initializations
      const initTimer = setTimeout(() => {
        try {
          cleanupAnimation = initAnimations();
          setIsLoading(false);
          console.log('Page loaded successfully');
        } catch (e) {
          console.error('Animation initialization error:', e);
          // Continue showing the page even if animations fail
          setIsLoading(false);
        }
      }, 100); // Using minimal timeout to yield to main thread
      
      return () => {
        clearTimeout(initTimer);
        if (cleanupAnimation) cleanupAnimation();
      };
    } catch (e) {
      console.error('Error initializing page:', e);
      setError('Došlo k chybě při načítání stránky.');
      setIsLoading(false);
      
      // Show error toast
      toast({
        title: "Chyba při načítání",
        description: "Aplikace se nepovedla správně načíst. Prosím, obnovte stránku.",
        variant: "destructive"
      });
      
      return () => {
        if (cleanupAnimation) cleanupAnimation();
      };
    }
  }, []);

  // Force render content if we're taking too long or hit an error
  useEffect(() => {
    if (renderTimeout && isLoading) {
      setIsLoading(false);
      console.log('🕒 Forcing page render due to timeout');
    }
  }, [renderTimeout, isLoading]);

  // If still loading and no timeout yet, show loading state
  if (isLoading && !renderTimeout) {
    return <Loading />;
  }

  // If we have an error, show error state
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen">
      <MetaTags />
      
      {/* LCP (Largest Contentful Paint) optimized components rendered immediately */}
      <Hero />
      <TariffSection />
      
      {/* Non-critical components lazy loaded */}
      <Suspense fallback={<Loading isFullScreen={false} />}>
        <ChannelsSection />
      </Suspense>
      
      <Suspense fallback={<Loading isFullScreen={false} />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={<Loading isFullScreen={false} />}>
        <BlogPreview />
      </Suspense>

      {/* Cache management */}
      <CacheManager isHydrated={isHydrated} />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;

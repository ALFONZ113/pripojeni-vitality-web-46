
import { useEffect, useState, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import { initAnimations } from '../utils/animation';
import { preloadCriticalImages } from '../utils/imageUtils';
import { Toaster } from '@/components/ui/toaster';

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

  // Mark hydration complete after React takes over
  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

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

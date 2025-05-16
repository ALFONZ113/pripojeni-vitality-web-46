
import { useEffect, useState, lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import TariffSection from '../components/TariffSection';
import { initAnimations } from '../utils/animation';
import { preloadCriticalImages } from '../utils/imageUtils';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { debugLog, debugState, isDebugMode, DebugOverlay, enableDebugMode } from '../utils/debugUtils';
import { initMapyLoader } from '../utils/mapyService';
import ErrorBoundary from '../components/ErrorBoundary';

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

// Maximum allowed loading time before showing error
const MAX_LOADING_TIME = 15000; // 15 seconds

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { toast } = useToast();

  // Handle debug mode via URL
  useEffect(() => {
    if (window.location.search.includes('debug=true') && !isDebugMode()) {
      enableDebugMode();
      debugLog('Debug mode enabled via URL parameter');
    }
  }, []);

  // Mark hydration complete after React takes over
  useEffect(() => {
    setIsHydrated(true);
    debugState.hydrated = true;
    debugLog('Component hydrated');
  }, []);
  
  // Initialize necessary resources with proper error handling and timeouts
  useEffect(() => {
    let isComponentMounted = true;
    
    // Preload critical images for better LCP
    preloadCriticalImages(CRITICAL_IMAGES);
    debugLog('Preloading critical images');
    
    // Initialize key components with timeout protection
    const initializeApp = async () => {
      try {
        debugLog('Starting application initialization');
        
        // Set up a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          if (isComponentMounted && isLoading) {
            debugLog('Initialization timeout reached');
            setError('Načítání trvalo příliš dlouho. Prosím, zkuste stránku načíst znovu.');
            setIsLoading(false);
          }
        }, MAX_LOADING_TIME);
        
        // Initialize Mapy.cz API in the background - non-blocking
        initMapyLoader().catch(error => {
          debugLog('Failed to initialize Mapy.cz API, but continuing with the app', error);
          if (isDebugMode()) {
            toast({
              title: "Mapy.cz API Error",
              description: "API se nepodařilo načíst, ale aplikace bude fungovat dále.",
              variant: "destructive"
            });
          }
        });
        
        // Initialize animations
        let cleanupAnimation: (() => void) | undefined;
        try {
          debugLog('Initializing animations');
          cleanupAnimation = initAnimations();
          debugState.animationsLoaded = true;
        } catch (e) {
          debugLog('Error initializing animations', e);
          // Non-critical error, continue loading
        }
        
        // Finish loading after all critical components are initialized
        if (isComponentMounted) {
          debugLog('Application initialization complete');
          setIsLoading(false);
          clearTimeout(timeoutId);
          debugState.initialized = true;
        }
        
        return () => {
          if (cleanupAnimation) cleanupAnimation();
        };
      } catch (e) {
        debugLog('Error during initialization', e);
        if (isComponentMounted) {
          setError('Došlo k chybě při načítání stránky. Zkuste to prosím později.');
          setIsLoading(false);
        }
        return () => {};
      }
    };
    
    // Start initialization
    initializeApp();
    
    // Cleanup function
    return () => {
      isComponentMounted = false;
    };
  }, []);

  // Show loading screen while initializing
  if (isLoading) {
    return <Loading />;
  }

  // Show error if initialization failed
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <ErrorBoundary>
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
        
        {/* Debug overlay (only visible in debug mode) */}
        <DebugOverlay />
      </div>
    </ErrorBoundary>
  );
};

export default Index;

import React, { lazy, Suspense } from 'react';
import PageMetadata from '../components/page/PageMetadata';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import usePageInitialization from '../hooks/use-page-initialization';
import { useEnhancedTracking } from '../hooks/use-enhanced-tracking';

// Below-the-fold components — lazy loaded to reduce initial bundle
const LocalSEOSection = lazy(() => import('../components/sections/LocalSEOSection'));
const PromotionPopup = lazy(() => import('../components/PromotionPopup'));
const AIContentSummary = lazy(() =>
  import('../components/seo/AIContentSummary').then(m => ({ default: m.AIContentSummary }))
);
const AIOptimizedSchema = lazy(() =>
  import('../components/seo/AIOptimizedSchema').then(m => ({ default: m.AIOptimizedSchema }))
);

// Critical resources for LCP optimization
const CRITICAL_IMAGES = [
  '/popri-logo.png',
  '/popri-favicon.png'
];

const CRITICAL_RESOURCES = [
  '/popri-logo.png',
  '/popri-favicon.png'
];

const Index = () => {
  const { 
    isLoading, 
    error,
    performanceMetrics
  } = usePageInitialization({ 
    criticalImages: CRITICAL_IMAGES,
    criticalResources: CRITICAL_RESOURCES,
    enablePerformanceMonitoring: true
  });

  // Enhanced tracking for Google Ads optimization
  useEnhancedTracking();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="PODA Internet Ostrava a okolí | Gigabit + TV zdarma | 730 431 313"
        description="PODA internet Ostrava — dostupnost a pokrytí v celém regionu. Optika 1000 Mbps bez výpadků, TV zdarma, bez závazků. Ověřte dostupnost: 730 431 313."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
        
        faviconVersion="3.1"
        aiOptimized={true}
        pageType="website"
        keywords={[
          'PODA internet', 'PODA Ostrava', 'PODA dostupnost', 'internet PODA',
          'optické připojení', 'gigabitový internet', 'rychlý internet Ostrava',
          'PODA internet dostupnost', 'internet Ostrava'
        ]}
        location="Ostrava, Moravskoslezský kraj"
      />
      
      {/* AI-optimized structured data for Google AI Overviews and Gemini */}
      <Suspense fallback={null}>
        <AIOptimizedSchema />
        <AIContentSummary
          title="PODA Internet s TV Zdarma"
          summary="Využíváme moderní optickou technologii GPON, která přináší gigabitový internet až 1000 Mbps přímo do vašeho bytu. Nabízíme televizní vysílání zdarma, profesionální instalaci a non-stop technickou podporu."
          services={[
            'Gigabitový internet PODA',
            'Televizní vysílání zdarma',
            'IPTV služby',
            'Optické připojení',
            'Non-stop podpora'
          ]}
          location="Ostrava, Karviná, Havířov, Bohumín, Poruba"
          keyPoints={[
            'Rychlá profesionální instalace',
            'Bez závazků a skrytých poplatků',
            'Stabilní připojení s 99,9% dostupností',
            'Výhodné cenové balíčky',
            'Profesionální technická podpora'
          ]}
          contactInfo={{
            phone: '+420 730 431 313'
          }}
        />
      </Suspense>
      
      {/* Main content - always full opacity */}
      <div className={`transition-opacity duration-300 opacity-100`}>
        <MainContent />
        <Suspense fallback={null}>
          <LocalSEOSection />
        </Suspense>
      </div>

      {/* Popup will show once isLoading is false (which should be very quick) */}
      {!isLoading && (
        <Suspense fallback={null}>
          <PromotionPopup />
        </Suspense>
      )}
    </div>
  );
};

export default Index;

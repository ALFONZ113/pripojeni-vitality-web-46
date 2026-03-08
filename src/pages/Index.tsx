import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import usePageInitialization from '../hooks/use-page-initialization';
import { useEnhancedTracking } from '../hooks/use-enhanced-tracking';
import LocalSEOSection from '../components/sections/LocalSEOSection';
import IPTVSection from '../components/sections/IPTVSection';
import { AIContentSummary } from '../components/seo/AIContentSummary';
import { AIOptimizedSchema } from '../components/seo/AIOptimizedSchema';

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
        description="Máte pomalý internet? PODA optika v Ostravě, Karviné, Havířově a okolí nabízí stabilních 1000 Mbps bez výpadků. TV zdarma, bez závazků. Váš lokální partner - 730 431 313."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
        currentDate="2025-01-14"
        faviconVersion="3.1"
        aiOptimized={true}
        pageType="website"
        keywords={[
          'internet', 'PODA internet', 'optické připojení', 
          'gigabitový internet', 'rychlý internet', 'stabilní internet'
        ]}
        location="Ostrava, Moravskoslezský kraj"
      />
      
      {/* AI-optimized structured data for Google AI Overviews and Gemini */}
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
      
      {/* Main content - always full opacity */}
      <div className={`transition-opacity duration-300 opacity-100`}>
        <MainContent />
        <LocalSEOSection />
      </div>

      {/* Popup will show once isLoading is false (which should be very quick) */}
      {!isLoading && <PromotionPopup />}
    </div>
  );
};

export default Index;

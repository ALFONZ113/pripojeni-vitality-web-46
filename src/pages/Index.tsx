
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

// Critical resources for LCP optimization
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/poda-logo.svg'
];

const CRITICAL_RESOURCES = [
  '/poda-logo.svg',
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png'
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
        title="Nejvýhodnější PODA Internet + TV | Tel: 730 431 313"
        description="Rychlé a spolehlivé optické připojení pro vaše město. Gigabitový internet až 1000 Mbps s TV zdarma a profesionální instalací. Volejte 730 431 313."
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
          phone: '+420 739 065 142'
        }}
      />
      
      {/* Main content - always full opacity */}
      <div className={`transition-opacity duration-300 opacity-100`}>
        <MainContent />
        <LocalSEOSection />
        <IPTVSection />
      </div>

      {/* Popup will show once isLoading is false (which should be very quick) */}
      {!isLoading && <PromotionPopup />}
    </div>
  );
};

export default Index;

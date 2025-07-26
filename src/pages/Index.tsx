
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import usePageInitialization from '../hooks/use-page-initialization';
import { useEnhancedTracking } from '../hooks/use-enhanced-tracking';
import { Toaster } from '@/components/ui/toaster';
import LocalSEOSection from '../components/sections/LocalSEOSection';
import IPTVSection from '../components/sections/IPTVSection';

// Len najkritickejšie obrázky
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png'
];

const Index = () => {
  const { 
    isLoading, 
    error
  } = usePageInitialization({ 
    criticalImages: CRITICAL_IMAGES,
    enablePerformanceMonitoring: false
  });

  // Enhanced tracking for Google Ads optimization
  useEnhancedTracking();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení"
        description="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
        currentDate="2025-01-14"
        faviconVersion="3.1"
      />
      
      {/* Main content - always full opacity */}
      <div className={`transition-opacity duration-300 opacity-100`}>
        <MainContent />
        <LocalSEOSection />
        <IPTVSection />
      </div>

      {/* Popup will show once isLoading is false (which should be very quick) */}
      {!isLoading && <PromotionPopup />}

      <Toaster />
    </div>
  );
};

export default Index;

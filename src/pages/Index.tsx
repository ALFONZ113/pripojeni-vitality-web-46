
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import LoadingState from '../components/page/LoadingState';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import ProgressIndicator from '../components/ui/progress-indicator';
import usePageInitialization from '../hooks/use-page-initialization';
import { Toaster } from '@/components/ui/toaster';
import LocalSEOSection from '../components/sections/LocalSEOSection';
import IPTVSection from '../components/sections/IPTVSection';
import PerformanceDebugger from '../components/development/PerformanceDebugger';

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/poda-logo.svg'
];

// Critical resources for better loading
const CRITICAL_RESOURCES = [
  '/assets/index.css',
  '/assets/index.js'
];

const Index = () => {
  const { 
    isLoading, 
    error, 
    loadingProgress, 
    performanceMetrics 
  } = usePageInitialization({ 
    criticalImages: CRITICAL_IMAGES,
    criticalResources: CRITICAL_RESOURCES,
    enablePerformanceMonitoring: true
  });

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení"
        description="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
      />
      
      {/* Enhanced loading with progress indicator */}
      {isLoading && (
        <>
          <LoadingState />
          <ProgressIndicator 
            isLoading={isLoading} 
            variant="linear"
            size="sm"
          />
        </>
      )}
      
      {/* Main content with fade-in when loaded */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <MainContent />
        
        {/* Local SEO section */}
        {!isLoading && <LocalSEOSection />}
        
        {/* IPTV section */}
        {!isLoading && <IPTVSection />}
      </div>

      {/* Promotion popup - only show when fully loaded */}
      {!isLoading && <PromotionPopup />}

      {/* Toast notifications */}
      <Toaster />
      
      {/* Performance metrics in development */}
      <PerformanceDebugger performanceMetrics={performanceMetrics} />
    </div>
  );
};

export default Index;

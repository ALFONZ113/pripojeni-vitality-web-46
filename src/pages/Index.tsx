import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import usePageInitialization from '../hooks/use-page-initialization';
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

  if (error) {
    return <ErrorState error={error} />;
  }

  // If isLoading is true for a very short flicker, consider if this is desired
  // or if MainContent should always be rendered. For now, keeping the logic.
  // If isLoading is almost always false immediately, the conditional rendering of PromotionPopup
  // will show it almost instantly.

  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="PODA Internet Ostrava 2025 ✅ Recenze + Ceny | Popri.cz"
        description="Nejlepší PODA internet v Ostravě 2025. Porovnání cen, recenze zákazníků a pokrytí Poruba, Vítkovice. Ušetřete až 600 Kč měsíčně!"
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
      />
      
      {/* Loading indicator removed */}
      
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

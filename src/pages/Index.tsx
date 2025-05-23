
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import LoadingState from '../components/page/LoadingState';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import usePageInitialization from '../hooks/use-page-initialization';
import { Toaster } from '@/components/ui/toaster';

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/poda-logo.svg'
];

const Index = () => {
  const { isLoading, error } = usePageInitialization({ criticalImages: CRITICAL_IMAGES });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení"
        description="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace."
      />
      
      <MainContent />

      {/* Promotion popup */}
      <PromotionPopup />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;

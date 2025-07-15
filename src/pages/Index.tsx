
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import LocalSEOSection from '../components/sections/LocalSEOSection';
import IPTVSection from '../components/sections/IPTVSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení"
        description="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
        currentDate="2025-01-14"
        faviconVersion="3.1"
      />
      
      <div className="transition-opacity duration-300 opacity-100">
        <MainContent />
        <LocalSEOSection />
        <IPTVSection />
      </div>

      <PromotionPopup />
    </div>
  );
};

export default Index;


import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import StickyCTA from '../components/ui/sticky-cta';
import { Toaster } from '@/components/ui/toaster';
import LocalSEOSection from '../components/sections/LocalSEOSection';
import IPTVSection from '../components/sections/IPTVSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Najrýchlejší PODA Internet v Ostrave | Gigabit za 25€/mesiac"
        description="🚀 PODA internet až 1000/1000 Mbps s TV ZDARMA! ✅ Inštalácia ZDARMA ✅ 24/7 podpora ✅ Bez skrytých poplatkov. Získajte najlepšie pripojenie v Ostrave ešte dnes!"
        keywords="PODA internet Ostrava, gigabit internet 25€, internet s TV zdarma, najrýchlejší internet Ostrava, PODA pripojenie, optické pripojenie Ostrava"
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
        ogImage="https://www.popri.cz/og-image.png"
      />
      
      <div className="transition-opacity duration-300 opacity-100">
        <MainContent />
        <LocalSEOSection />
        <IPTVSection />
      </div>

      <PromotionPopup />
      <StickyCTA />

      <Toaster />
    </div>
  );
};

export default Index;

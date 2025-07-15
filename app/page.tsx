import React from 'react';
import MainContent from '../src/components/page/MainContent';
import LocalSEOSection from '../src/components/sections/LocalSEOSection';
import IPTVSection from '../src/components/sections/IPTVSection';
import PromotionPopup from '../src/components/PromotionPopup';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <MainContent />
      <LocalSEOSection />
      <IPTVSection />
      <PromotionPopup />
    </div>
  );
}
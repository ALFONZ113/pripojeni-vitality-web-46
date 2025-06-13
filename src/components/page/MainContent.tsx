
import React from 'react';
import Hero from '../Hero';
import TariffSection from '../TariffSection';
import ChannelsSection from '../ChannelsSection';
import ContactSection from '../ContactSection';
import BlogPreview from '../BlogPreview';

const MainContent = () => {
  return (
    <div className="min-h-screen">
      {/* Kritické komponenty - načítané hneď */}
      <Hero />
      <TariffSection />
      <ChannelsSection />
      
      {/* Menej kritické komponenty - môžu byť načítané normálne */}
      <ContactSection />
      <BlogPreview />
    </div>
  );
};

export default MainContent;

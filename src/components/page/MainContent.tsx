
import React from 'react';
import HeroSection from '../hero/HeroSection';
import TrustSignalsSection from '../sections/TrustSignalsSection';
import TariffSection from '../TariffSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../ContactSection';

const MainContent = () => {
  return (
    <>
      <HeroSection />
      <TrustSignalsSection />
      <TariffSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default MainContent;

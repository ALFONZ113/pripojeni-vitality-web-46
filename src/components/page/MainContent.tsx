
import React from 'react';
import HeroSection from '../hero/HeroSection';
import TariffSection from '../TariffSection';
import WhyPopriSection from '../hero/WhyPopriSection';
import DisclaimerText from '../hero/DisclaimerText';
import FeaturedBlogPosts from '../blog/FeaturedBlogPosts';
import SocialProof from '../SocialProof';
import ContactSection from '../ContactSection';

const MainContent = () => {
  return (
    <>
      <HeroSection />
      <TariffSection />
      <WhyPopriSection />
      <DisclaimerText />
      <FeaturedBlogPosts />
      <SocialProof />
      <ContactSection />
    </>
  );
};

export default MainContent;

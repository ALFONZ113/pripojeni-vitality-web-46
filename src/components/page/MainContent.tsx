import React from 'react';
import HeroSection from '../hero/HeroSection';
import TariffSection from '../TariffSection';
import FeatureShowcase from '../sections/FeatureShowcase';
import CitySection from '../sections/CitySection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FeaturedBlogPosts from '../blog/FeaturedBlogPosts';
import ContactCTA from '../sections/ContactCTA';
import IPTVSection from '../sections/IPTVSection';

const MainContent = () => {
  return (
    <>
      <HeroSection />
      <TariffSection />
      <FeatureShowcase />
      <CitySection />
      <TestimonialsSection />
      <FeaturedBlogPosts />
      <ContactCTA />
      <IPTVSection />
    </>
  );
};

export default MainContent;


import React from 'react';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import TariffsSection from '../sections/TariffsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import CTASection from '../sections/CTASection';
import IndexingHelper from '../seo/IndexingHelper';

const MainContent = () => {
  // Show indexing helper only in development or for admins
  const showIndexingHelper = process.env.NODE_ENV === 'development' || 
    window.location.search.includes('admin=true');

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TariffsSection />
      <TestimonialsSection />
      
      {/* SEO Indexing Helper - only for development/admin */}
      {showIndexingHelper && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <IndexingHelper />
            </div>
          </div>
        </section>
      )}
      
      <CTASection />
    </>
  );
};

export default MainContent;


import React from 'react';
import HeroSection from '../hero/HeroSection';
import TariffSection from '../TariffSection';
import ContactSection from '../ContactSection';
import IndexingHelper from '../seo/IndexingHelper';

const MainContent = () => {
  // Show indexing helper only in development or for admins
  const showIndexingHelper = process.env.NODE_ENV === 'development' || 
    window.location.search.includes('admin=true');

  return (
    <>
      <HeroSection />
      <TariffSection />
      <ContactSection />
      
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
    </>
  );
};

export default MainContent;

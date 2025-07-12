
import React from 'react';
import HeroSection from '../hero/HeroSection';
import TariffSection from '../TariffSection';
import ContactSection from '../ContactSection';
import IndexingHelper from '../seo/IndexingHelper';
import InternalLinks from '../common/InternalLinks';

const MainContent = () => {
  // Show indexing helper only in development or for admins
  const showIndexingHelper = process.env.NODE_ENV === 'development' || 
    window.location.search.includes('admin=true');

  return (
    <>
      <HeroSection />
      
      {/* Pain Point Section - Nespokojný s internetom? */}
      <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nespokojný s vaším internetom?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Problémy s O2?</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• O2 vám zdražilo po převzetí Nej.cz?</li>
                  <li>• Časté výpadky a pomalý internet?</li>
                  <li>• Vysoké ceny za nekvalitní služby?</li>
                  <li>• Špatný zákaznický servis?</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-green-600 mb-4">Prečo zákazníci prechádzajú k PODA</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Až 30% úspora oproti O2</li>
                  <li>• Stabilný gigabitový internet bez výpadkov</li>
                  <li>• TV zadarmo k internetu</li>
                  <li>• Osobný prístup a rýchla podpora</li>
                </ul>
              </div>
            </div>
            <div className="bg-poda-blue text-white rounded-lg p-6">
              <p className="text-lg mb-4">
                <strong>Viac ako 1000+ spokojných zákazníkov</strong> už prešlo od O2 k PODA v roku 2024
              </p>
              <a href="tel:+420776666901" className="btn-outline border-white text-white hover:bg-white hover:text-poda-blue">
                Zavolajte 776 666 901 - Poradíme vám
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <TariffSection />
      
      {/* Internal Links Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <InternalLinks 
            title="Další PODA služby a lokality"
            className=""
          />
        </div>
      </section>
      
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

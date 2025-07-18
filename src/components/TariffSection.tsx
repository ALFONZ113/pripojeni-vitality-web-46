
import { useState } from 'react';
import TariffTabs from './tariffs/TariffTabs';
import TariffCard from './tariffs/TariffCard';
import { tariffData } from './tariffs/tariffData';

const TariffSection = () => {
  const [activeTab, setActiveTab] = useState('byty');
  const [openPromoInfo, setOpenPromoInfo] = useState({
    bytyBasic: false,
    bytyMych10: false,
    domyBasic: false,
    domyMych10: false,
  });

  const handlePromoInfoToggle = (tariff: keyof typeof openPromoInfo) => {
    setOpenPromoInfo(prev => ({
      ...prev,
      [tariff]: !prev[tariff]
    }));
  };

  const currentTariffs = tariffData[activeTab as keyof typeof tariffData];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6">
            Vyberte si váš tarif
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Nabízíme rychlé a stabilní připojení pro domácnosti i firmy s TV programy zdarma
          </p>
        </div>
        
        {/* Responzívne tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex w-full max-w-md sm:w-auto">
            <button 
              onClick={() => setActiveTab('byty')} 
              className={`${activeTab === 'byty' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600 hover:text-poda-blue'} 
                         px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 
                         flex items-center justify-center flex-1 sm:flex-none text-sm sm:text-base`}
            >
              <span className="sm:mr-2">📶</span>
              <span className="hidden sm:inline">Pro byty (GPON)</span>
              <span className="sm:hidden">Byty</span>
            </button>
            <button 
              onClick={() => setActiveTab('domy')} 
              className={`${activeTab === 'domy' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600 hover:text-poda-blue'} 
                         px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 
                         flex items-center justify-center flex-1 sm:flex-none text-sm sm:text-base`}
            >
              <span className="sm:mr-2">🏠</span>
              <span className="hidden sm:inline">Pro rodinné domy</span>
              <span className="sm:hidden">Domy</span>
            </button>
          </div>
        </div>

        {/* Responzívna grid pre tarify */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {currentTariffs.map((tariff, index) => (
            <TariffCard
              key={index}
              title={tariff.title}
              price={tariff.price}
              priceNote={tariff.priceNote}
              promoId={tariff.promoId}
              isPromo={tariff.isPromo}
              isRecommended={tariff.isRecommended}
              features={tariff.features}
              openPromoInfo={openPromoInfo}
              onPromoInfoToggle={handlePromoInfoToggle}
              promoInfoText={tariff.promoInfoText}
            />
          ))}
        </div>

        {/* Responzívna CTA sekcia */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-0">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-poda-blue mb-3 sm:mb-4">
              Potřebujete poradit s výběrem?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Náš specialista vám pomůže vybrat nejlepší tarif pro vaše potřeby
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a href="/kontakt" className="btn-primary w-full sm:w-auto text-center">
                Kontaktovat specialistu
              </a>
              <a href="tel:730431313" className="btn-outline w-full sm:w-auto text-center">
                📞 730 431 313
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TariffSection;

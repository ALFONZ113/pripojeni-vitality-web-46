
import React, { memo, useState, useCallback, useMemo } from 'react';
import TariffTabs from './tariffs/TariffTabs';
import TariffCard from './tariffs/TariffCard';
import { tariffData } from './tariffs/tariffData';

type PromoInfoState = Record<'bytyBasic' | 'bytyMych10' | 'domyBasic' | 'domyMych10', boolean>;

const TariffSection = memo(() => {
  const [activeTab, setActiveTab] = useState('byty');
  const [openPromoInfo, setOpenPromoInfo] = useState<PromoInfoState>({
    bytyBasic: false,
    bytyMych10: false,
    domyBasic: false,
    domyMych10: false,
  });

  // Memoizované callback funkcie
  const togglePromoInfo = useCallback((tariff: keyof PromoInfoState) => {
    setOpenPromoInfo(prev => ({
      ...prev,
      [tariff]: !prev[tariff],
    }));
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  // Memoizované tariff data pre aktuálny tab
  const currentTariffData = useMemo(() => {
    return tariffData[activeTab as keyof typeof tariffData];
  }, [activeTab]);

  return (
    <section className="min-h-screen flex items-center py-20 bg-white relative overflow-hidden" id="tarify">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-poda-blue/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-radial from-poda-orange/10 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-gradient-to-r from-poda-blue/10 to-poda-orange/10 text-poda-blue py-2 px-5 rounded-full text-sm font-semibold mb-6 border border-poda-blue/20">
            Naše nabídka
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight">
            Internetové a televizní tarify
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nabízíme výkonné a cenově dostupné internetové a televizní balíčky pro byty i rodinné domy.
            Vyberte si tarif, který nejlépe odpovídá vašim potřebám.
          </p>
        </div>

        <TariffTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {currentTariffData.map((tariff) => (
            <TariffCard
              key={tariff.id}
              {...tariff}
              promoId={tariff.id as keyof PromoInfoState}
              openPromoInfo={openPromoInfo}
              onPromoInfoToggle={togglePromoInfo}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TariffSection.displayName = 'TariffSection';

export default TariffSection;

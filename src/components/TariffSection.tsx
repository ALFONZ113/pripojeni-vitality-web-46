
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
    <section className="section-padding bg-gradient-to-b from-white to-blue-50" id="tarify">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            Naše nabídka
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
            Internetové a televizní tarify
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nabízíme výkonné a cenově dostupné internetové a televizní balíčky pro byty i rodinné domy.
            Vyberte si tarif, který nejlépe odpovídá vašim potřebám.
          </p>
        </div>

        <TariffTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

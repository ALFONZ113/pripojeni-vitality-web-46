
import { useState } from 'react';
import MobileTariffTabs from './tariffs/MobileTariffTabs';
import TariffCard from './tariffs/TariffCard';
import { tariffData } from './tariffs/tariffData';

// Define the PromoInfoState type for better type safety
type PromoInfoState = Record<'bytyBasic' | 'bytyMych10' | 'domyBasic' | 'domyMych10', boolean>;

const MobileTariffSection = () => {
  const [activeTab, setActiveTab] = useState('byty');
  const [openPromoInfo, setOpenPromoInfo] = useState<PromoInfoState>({
    bytyBasic: false,
    bytyMych10: false,
    domyBasic: false,
    domyMych10: false,
  });

  const togglePromoInfo = (tariff: keyof PromoInfoState) => {
    setOpenPromoInfo(prev => ({
      ...prev,
      [tariff]: !prev[tariff],
    }));
  };

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-white to-blue-50" id="tarify">
      <div className="container-custom">
        <div className="text-center mx-auto mb-8">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-2">
            Naše nabídka
          </span>
          <h2 className="text-2xl font-bold text-poda-blue mb-3">
            Internetové a televizní tarify
          </h2>
          <p className="text-gray-600 text-sm">
            Nabízíme výkonné a cenově dostupné internetové a televizní balíčky pro byty i rodinné domy.
          </p>
        </div>

        <MobileTariffTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="space-y-6">
          {tariffData[activeTab as keyof typeof tariffData].map((tariff) => (
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
};

export default MobileTariffSection;

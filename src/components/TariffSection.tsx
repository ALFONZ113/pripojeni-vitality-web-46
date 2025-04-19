
import { useState } from 'react';
import TariffCard from './tariffs/TariffCard';
import TariffTabs from './tariffs/TariffTabs';
import { tariffConfig } from '../config/tariffConfig';

const TariffSection = () => {
  const [activeTab, setActiveTab] = useState('byty');
  const [openPromoInfo, setOpenPromoInfo] = useState<{
    bytyBasic: boolean;
    bytyMych10: boolean;
    domyBasic: boolean;
    domyMych10: boolean;
  }>({
    bytyBasic: false,
    bytyMych10: false,
    domyBasic: false,
    domyMych10: false,
  });

  const togglePromoInfo = (tariff: keyof typeof openPromoInfo) => {
    setOpenPromoInfo((prev) => ({
      ...prev,
      [tariff]: !prev[tariff],
    }));
  };

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

        <TariffTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tariffConfig[activeTab as keyof typeof tariffConfig].map((tariff, index) => (
            <TariffCard
              key={`${activeTab}-${index}`}
              {...tariff}
              promoInfoOpen={openPromoInfo[`${activeTab}${index === 0 ? 'Basic' : 'Mych10'}` as keyof typeof openPromoInfo]}
              onPromoInfoToggle={() => togglePromoInfo(`${activeTab}${index === 0 ? 'Basic' : 'Mych10'}` as keyof typeof openPromoInfo)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TariffSection;

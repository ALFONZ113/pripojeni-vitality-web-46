import { useState } from 'react';
import { Wifi, Tv, MonitorPlay, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
const TariffSection = () => {
  const [activeTab, setActiveTab] = useState('byty');
  return <section className="section-padding bg-gradient-to-b from-white to-blue-50" id="tarify">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            Naše nabídka
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">Internetové a televizní tarify</h2>
          <p className="text-gray-600 leading-relaxed">
            Nabízíme výkonné a cenově dostupné internetové a televizní balíčky pro byty i rodinné domy.
            Vyberte si tarif, který nejlépe odpovídá vašim potřebám.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button onClick={() => setActiveTab('byty')} className={`${activeTab === 'byty' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600 hover:text-poda-blue'} px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center`}>
              <Wifi className="mr-2 h-5 w-5" />
              Pro byty (GPON)
            </button>
            <button onClick={() => setActiveTab('domy')} className={`${activeTab === 'domy' ? 'bg-white text-poda-blue shadow-sm' : 'text-gray-600 hover:text-poda-blue'} px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center`}>
              <Wifi className="mr-2 h-5 w-5" />
              Pro rodinné domy
            </button>
          </div>
        </div>

        {/* Tariff Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {activeTab === 'byty' ? <>
              {/* Tariff 1 - Basic for apartments */}
              <div className="tariff-card group">
                <div className="absolute top-4 left-4">
                  <span className="promo-tag">Promo tarif</span>
                </div>
                <div className="tariff-header">
                  <h3 className="text-xl font-bold">                      Internet + TV Basic</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-poda-blue">250 Kč</div>
                      <div className="text-gray-500 text-sm">měsíčně + 50 Kč za zařízení</div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Internet 1000/1000 Mbps</p>
                        <p className="text-gray-500 text-sm">Symetrická rychlost pomocí GPON technologie</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Více než 85 TV programů</p>
                        <p className="text-gray-500 text-sm">Automaticky v ceně</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Služba PODA net.TV</p>
                        <p className="text-gray-500 text-sm">Až pro 4 zařízení</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/kontakt" className="btn-primary w-full flex justify-center">
                    Mám zájem
                  </Link>
                </div>
              </div>

              {/* Tariff 2 - Mých 10 for apartments */}
              <div className="tariff-card group">
                <div className="absolute top-4 left-4">
                  <span className="promo-tag">Promo tarif</span>
                </div>
                <div className="recommended-badge">Doporučujeme</div>
                <div className="tariff-header">
                  <h3 className="text-xl font-bold">                      Internet + TV Mých 10</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-poda-blue">390 Kč</div>
                      <div className="text-gray-500 text-sm">měsíčně + 50 Kč za zařízení</div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Internet 1000/1000 Mbps</p>
                        <p className="text-gray-500 text-sm">Symetrická rychlost pomocí GPON technologie</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Více než 100 TV programů</p>
                        <p className="text-gray-500 text-sm">Možnost výběru 10 vlastních stanic</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Služba PODA net.TV</p>
                        <p className="text-gray-500 text-sm">Až pro 4 zařízení</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/kontakt" className="btn-secondary w-full flex justify-center">
                    Mám zájem
                  </Link>
                </div>
              </div>
            </> : <>
              {/* Tariff 1 - Basic for houses */}
              <div className="tariff-card group">
                <div className="absolute top-4 left-4">
                  <span className="promo-tag">Promo tarif</span>
                </div>
                <div className="tariff-header">
                  <h3 className="text-xl font-bold">                      Internet + TV Basic</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-poda-blue">250 Kč</div>
                      <div className="text-gray-500 text-sm">měsíčně + 50 Kč za zařízení</div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Internet 500/200 Mbps</p>
                        <p className="text-gray-500 text-sm">Bezdrátový internet s rychlostí optického</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Více než 85 TV programů</p>
                        <p className="text-gray-500 text-sm">Automaticky v ceně</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Služba PODA net.TV</p>
                        <p className="text-gray-500 text-sm">Až pro 4 zařízení</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/kontakt" className="btn-primary w-full flex justify-center">
                    Mám zájem
                  </Link>
                </div>
              </div>

              {/* Tariff 2 - Mých 10 for houses */}
              <div className="tariff-card group">
                <div className="absolute top-4 left-4">
                  <span className="promo-tag">Promo tarif</span>
                </div>
                <div className="recommended-badge">Doporučujeme</div>
                <div className="tariff-header">
                  <h3 className="text-xl font-bold">                      Internet + TV Mých 10</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-poda-blue">390 Kč</div>
                      <div className="text-gray-500 text-sm">měsíčně + 50 Kč za zařízení</div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Internet 500/200 Mbps</p>
                        <p className="text-gray-500 text-sm">Bezdrátový internet s rychlostí optického</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Více než 100 TV programů</p>
                        <p className="text-gray-500 text-sm">Možnost výběru 10 vlastních stanic</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Služba PODA net.TV</p>
                        <p className="text-gray-500 text-sm">Až pro 4 zařízení</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/kontakt" className="btn-secondary w-full flex justify-center">
                    Mám zájem
                  </Link>
                </div>
              </div>
            </>}
        </div>
      </div>
    </section>;
};
export default TariffSection;
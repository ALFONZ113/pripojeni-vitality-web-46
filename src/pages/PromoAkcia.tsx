
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Gift, Wifi, Tv, Phone, Clock, Shield } from 'lucide-react';
import PromoForm from '../components/PromoForm';

const PromoAkcia = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-poda-blue/5 via-white to-poda-orange/5">
      <Helmet>
        <title>První měsíc ZDARMA - Speciální nabídka PODA internet | Popri.cz</title>
        <meta 
          name="description" 
          content="Objednejte si PODA internet s TV a získejte první měsíc ZDARMA! Rychlé připojení až 1000 Mb/s, TV zdarma a non-stop podpora. Limitovaná nabídka." 
        />
        <meta name="keywords" content="poda internet zdarma, první měsíc zdarma, akce internet, promo nabídka ostrava" />
        <link rel="canonical" href="https://popri.cz/promo-akce" />
        
        {/* Open Graph */}
        <meta property="og:title" content="První měsíc ZDARMA - Speciální nabídka PODA internet" />
        <meta property="og:description" content="Objednejte si PODA internet s TV a získejte první měsíc ZDARMA! Rychlé připojení až 1000 Mb/s." />
        <meta property="og:url" content="https://popri.cz/promo-akce" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            "name": "První měsíc PODA internet ZDARMA",
            "description": "Speciální nabídka - první měsíc služeb PODA internet s TV zdarma",
            "provider": {
              "@type": "Organization",
              "name": "Popri.cz",
              "url": "https://popri.cz"
            },
            "availability": "InStock",
            "validFrom": "2025-01-01",
            "validThrough": "2025-12-31"
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Hero Section - optimalizované pre mobil */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-poda-orange/10 rounded-full mb-4 sm:mb-6">
            <Gift className="h-8 w-8 sm:h-10 sm:w-10 text-poda-orange" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-poda-blue mb-3 sm:mb-4 leading-tight">
            První měsíc <span className="text-poda-orange">ZDARMA</span>!
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto px-2 leading-relaxed">
            Potřebujete připojit internet a TV nebo změnit stávajícího operátora? 
            Využijte naši speciální nabídku a ušetřete!
          </p>
          
          <div className="bg-gradient-to-r from-poda-blue to-poda-orange text-white p-4 sm:p-6 rounded-xl inline-block mx-2 sm:mx-0 max-w-full">
            <p className="text-base sm:text-lg font-semibold leading-relaxed">
              Objednejte si rychlé připojení a získejte první měsíc ZDARMA!
            </p>
          </div>
        </div>

        {/* Main CTA Section - zlepšené pre mobil */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border-2 border-poda-orange/20">
            <div className="text-center mb-4 sm:mb-6">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-poda-orange mx-auto mb-2 sm:mb-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-poda-blue mb-2 leading-tight">
                Nezmeškejte tuto příležitost!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2 sm:px-0">
                Zadejte své telefonní číslo a náš specialista Vás bude kontaktovat s nejlepší nabídkou
              </p>
            </div>
            
            <PromoForm 
              buttonText="Chci první měsíc zdarma"
              successMessage="Děkujeme! Brzy Vás budeme kontaktovat s nabídkou prvního měsíce zdarma."
            />
          </div>
        </div>

        {/* Features Grid - responzívna mriežka */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-poda-blue">
            <Wifi className="h-10 w-10 sm:h-12 sm:w-12 text-poda-blue mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2">Rychlý internet</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Optické připojení až 1000 Mb/s pro domácnosti i firmy
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-poda-orange">
            <Tv className="h-10 w-10 sm:h-12 sm:w-12 text-poda-orange mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2">TV zdarma</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              HD televizní programy bez dodatečných poplatků
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-green-500 sm:col-span-2 lg:col-span-1">
            <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2">Non-stop podpora</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              24/7 technická podpora a rychlé řešení problémů
            </p>
          </div>
        </div>

        {/* Additional Benefits - zlepšené pre menšie obrazovky */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 px-2 sm:px-0">
          <div className="bg-white/70 p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-poda-blue mb-3">Co získáte?</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>První měsíc služeb zcela zdarma</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Rychlá instalace do 48 hodin</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Bez skrytých poplatků</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Možnost zrušení bez sankcí</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/70 p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-bold text-poda-blue mb-3">Proč PODA?</h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Nejrychlejší optické připojení v regionu</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Stabilní a spolehlivé služby</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Místní podpora v češtině</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span>Transparentní ceník</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info - centrovane pre mobil */}
        <div className="text-center px-4 sm:px-0">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Nebo nás kontaktujte přímo:
          </p>
          <div className="flex items-center justify-center space-x-2 text-poda-blue font-semibold">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <a 
              href="tel:730431313" 
              className="hover:text-poda-orange transition-colors text-lg sm:text-xl"
              style={{
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            >
              730 431 313
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoAkcia;

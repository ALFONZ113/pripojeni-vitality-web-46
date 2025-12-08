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

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-poda-orange/10 rounded-full mb-6">
            <Gift className="h-10 w-10 text-poda-orange" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-4">
            První měsíc <span className="text-poda-orange">ZDARMA</span>!
          </h1>
          
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Potřebujete připojit internet a TV nebo změnit stávajícího poskytovatele? 
            Využijte naši speciální nabídku a ušetřete!
          </p>
          
          <div className="bg-gradient-to-r from-poda-blue to-poda-orange text-white p-6 rounded-xl inline-block">
            <p className="text-lg font-semibold">
              Objednajte si rýchle připojeni a získejte první měsíc ZDARMA!
            </p>
          </div>
        </div>

        {/* Main CTA Section - moved here for mobile-first */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-poda-orange/20">
            <div className="text-center mb-6">
              <Clock className="h-8 w-8 text-poda-orange mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-poda-blue mb-2">
                Nezmeškejte tuto příležitost!
              </h2>
              <p className="text-gray-600">
                Zadejte své telefonní číslo a náš specialista Vás bude kontaktovat s nejlepší nabídkou
              </p>
            </div>
            
            <PromoForm 
              buttonText="Chci první měsíc zdarma"
              successMessage="Děkujeme! Brzy Vás budeme kontaktovat s nabídkou prvního měsíce zdarma."
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-poda-blue">
            <Wifi className="h-12 w-12 text-poda-blue mb-4" />
            <h3 className="text-xl font-bold text-poda-blue mb-2">Rychlý internet</h3>
            <p className="text-gray-600">
              Optické připojení až 1000 Mb/s pro domácnosti i firmy
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-poda-orange">
            <Tv className="h-12 w-12 text-poda-orange mb-4" />
            <h3 className="text-xl font-bold text-poda-blue mb-2">TV zdarma</h3>
            <p className="text-gray-600">
              HD televizní programy bez dodatečných poplatků
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <Shield className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-poda-blue mb-2">Non-stop podpora</h3>
            <p className="text-gray-600">
              24/7 technická podpora a rychlé řešení problémů
            </p>
          </div>
        </div>


        {/* Additional Benefits */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white/70 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-poda-blue mb-3">Co získáte?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3"></div>
                První měsíc služeb zcela zdarma
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3"></div>
                Rychlá profesionální instalace
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3"></div>
                Bez skrytých poplatků
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-orange rounded-full mr-3"></div>
                Možnost zrušení bez sankcí
              </li>
            </ul>
          </div>
          
          <div className="bg-white/70 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-poda-blue mb-3">Proč PODA?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3"></div>
                Nejrychlejší optické připojení v regionu
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3"></div>
                Stabilní a spolehlivé služby
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3"></div>
                Místní podpora v češtině
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-poda-blue rounded-full mr-3"></div>
                Transparentní ceník
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Nebo nás kontaktujte přímo:
          </p>
          <div className="flex items-center justify-center space-x-2 text-poda-blue font-semibold">
            <Phone className="h-5 w-5" />
            <a href="tel:730431313" className="hover:text-poda-orange transition-colors">
              730 431 313
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoAkcia;

import React from 'react';
import { Phone, Mail, Globe, Wifi, Check, Star } from 'lucide-react';

const A4Flyer = () => {
  return (
    <div className="a4-flyer bg-white text-gray-900 font-inter">
      {/* Header */}
      <div className="header bg-gradient-to-r from-poda-blue to-poda-blue-light text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Popri.cz</h1>
            <p className="text-lg opacity-90">Vaše cesta k nejlepšímu PODA internetu</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">730 431 313</div>
            <div className="text-sm opacity-80">Zavolejte nám!</div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section p-6 bg-gradient-to-br from-blue-50 to-white">
        <h2 className="text-4xl font-bold text-poda-blue mb-4 text-center leading-tight">
          Prémiové optické gigabitové
          <span className="text-poda-orange block"> pripojenie a smart TV</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mb-6">
          S Popri.cz vám zajistíme rychle <span className="text-poda-blue font-semibold">PODA pripojenie</span> s garantovanou rýchlosťou až 1000 Mbps
        </p>
        
        {/* Key Benefits */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center bg-white/70 p-4 rounded-lg shadow-sm">
            <Wifi className="h-8 w-8 text-poda-orange mx-auto mb-2" />
            <div className="font-bold">Až 1000 Mbps</div>
            <div className="text-sm text-gray-600">Symetrická rýchlosť</div>
          </div>
          <div className="text-center bg-white/70 p-4 rounded-lg shadow-sm">
            <Check className="h-8 w-8 text-poda-orange mx-auto mb-2" />
            <div className="font-bold">0 Kč instalácia</div>
            <div className="text-sm text-gray-600">Bezplatné pripojenie</div>
          </div>
          <div className="text-center bg-white/70 p-4 rounded-lg shadow-sm">
            <Star className="h-8 w-8 text-poda-orange mx-auto mb-2" />
            <div className="font-bold">TV zdarma</div>
            <div className="text-sm text-gray-600">Viac ako 85 programov</div>
          </div>
        </div>
      </div>

      {/* Tariff Cards */}
      <div className="tariffs-section p-6">
        <h3 className="text-2xl font-bold text-poda-blue mb-6 text-center">Naše najlepšie tarify</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Basic Tariff */}
          <div className="tariff-card bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-poda-blue text-white p-4 relative">
              <div className="absolute top-2 left-2">
                <span className="bg-poda-orange text-white text-xs px-2 py-1 rounded-full font-medium">PROMO</span>
              </div>
              <h4 className="text-lg font-bold mt-4">Internet + TV Basic</h4>
            </div>
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-poda-blue">250 Kč</div>
                <div className="text-sm text-gray-500">mesačne + 50 Kč za zariadenie</div>
                <div className="text-xs text-gray-400 mt-1">Promo cena 12 mesiacov, potom 440 Kč</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-poda-orange mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Internet 1000/1000 Mbps</div>
                    <div className="text-gray-500 text-xs">Symetrická rýchlosť GPON</div>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-poda-orange mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Viac ako 85 TV programov</div>
                    <div className="text-gray-500 text-xs">Automaticky v cene</div>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-poda-orange mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Služba PODA net.TV</div>
                    <div className="text-gray-500 text-xs">Až pre 4 zariadenia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Tariff */}
          <div className="tariff-card bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden relative">
            <div className="absolute -top-1 -right-1 bg-poda-orange text-white text-xs px-3 py-1 rotate-45 transform translate-x-4 translate-y-2 shadow-md z-10">
              Odporúčané
            </div>
            <div className="bg-gradient-to-r from-poda-blue to-poda-blue-light text-white p-4 relative">
              <div className="absolute top-2 left-2">
                <span className="bg-poda-orange text-white text-xs px-2 py-1 rounded-full font-medium">PROMO</span>
              </div>
              <h4 className="text-lg font-bold mt-4">Internet + TV Mých 10</h4>
            </div>
            <div className="p-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-poda-blue">390 Kč</div>
                <div className="text-sm text-gray-500">mesačne + 50 Kč za zariadenie</div>
                <div className="text-xs text-gray-400 mt-1">Promo cena 12 mesiacov, potom 520 Kč</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-poda-orange mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Internet 1000/1000 Mbps</div>
                    <div className="text-gray-500 text-xs">Symetrická rýchlosť GPON</div>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-poda-orange mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Viac ako 100 TV programov</div>
                    <div className="text-gray-500 text-xs">Možnosť výberu 10 vlastných staníc</div>
                  </div>
                </div>
                <div className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-poda-orange mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Služba PODA net.TV</div>
                    <div className="text-gray-500 text-xs">Až pre 4 zariadenia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Area */}
      <div className="coverage-section p-6 bg-gray-50">
        <h3 className="text-xl font-bold text-poda-blue mb-4 text-center">Pokrytie miest</h3>
        <div className="grid grid-cols-5 gap-4 text-center">
          {[
            { city: 'Ostrava', coverage: '98%' },
            { city: 'Havířov', coverage: '97%' },
            { city: 'Karviná', coverage: '95%' },
            { city: 'Bohumín', coverage: '93%' },
            { city: 'Poruba', coverage: '99%' }
          ].map((location, index) => (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-bold text-poda-blue">{location.city}</div>
              <div className="text-poda-orange font-semibold">{location.coverage}</div>
              <div className="text-xs text-gray-500">pokrytie</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section p-6 bg-white">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-poda-blue mb-4">Kontaktujte nás</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-poda-orange mr-3" />
                <div>
                  <div className="font-bold text-lg">730 431 313</div>
                  <div className="text-sm text-gray-600">Obchod a podpora</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-poda-orange mr-3" />
                <div>
                  <div className="font-medium">terc@obchod.poda.cz</div>
                  <div className="text-sm text-gray-600">Email podpora</div>
                </div>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-poda-orange mr-3" />
                <div>
                  <div className="font-medium">www.popri.cz</div>
                  <div className="text-sm text-gray-600">Online objednávka</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white border-2 border-gray-300 p-4 rounded-lg inline-block">
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center mb-2">
                <span className="text-xs text-gray-500">QR kód</span>
              </div>
              <div className="text-xs text-gray-600">Naskenujte pre web</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer bg-poda-blue text-white p-4 rounded-b-lg">
        <div className="text-center">
          <p className="font-medium mb-1">Popri.cz - Technológie spojujeme s osobným prístupom</p>
          <p className="text-sm opacity-80">Pre váš ideálny internet a TV zážitok</p>
        </div>
      </div>
    </div>
  );
};

export default A4Flyer;

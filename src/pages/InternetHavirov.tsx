
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Wifi, Clock, CheckCircle, MapPin, Star, Info, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const InternetHavirov = () => {
  const [openPromoInfo, setOpenPromoInfo] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internet PODA Havířov | Gigabitové optické pripojenie | Tel: 730 431 313</title>
        <meta name="description" content="Najrýchlejší internet PODA v Havířove s optickou technológiou GPON. Rýchlosť až 2000 Mbps, bezplatná inštalácia. Pokrytie: Šumbark, Město, Podlesí, Prostřední Suchá." />
        <meta name="keywords" content="internet Havířov, PODA Havířov, optické pripojenie Havířov, gigabitový internet Havířov, rýchly internet Havířov, GPON Havířov, internet Šumbark, internet Město Havířov, pripojenie internetu Havířov, optická vlákna Havířov, vysokorýchlostný internet Havířov" />
        <link rel="canonical" href="https://www.popri.cz/internet-havirov" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Havířov",
              "description": "Poskytovateľ gigabitového optického internetu v Havířove",
              "url": "https://www.popri.cz/internet-havirov",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Havířov",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.7794",
                "longitude": "18.4437"
              },
              "areaServed": [
                "Havířov-Šumbark",
                "Havířov-Město",
                "Havířov-Podlesí",
                "Prostřední Suchá"
              ],
              "serviceType": ["Gigabitový internet", "Optické pripojenie", "GPON", "TV služby"],
              "priceRange": "250-520 CZK"
            }
          `}
        </script>
      </Helmet>

      {/* Hero sekcia */}
      <section className="bg-gradient-to-br from-poda-blue to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 mr-3" />
              <span className="text-xl font-medium">Havířov</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gigabitový Internet PODA v <span className="text-poda-orange">Havířove</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Mladé mesto s modernou optickou infraštruktúrou až 1000 Mbps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="tel:+420730431313" className="btn-primary bg-poda-orange hover:bg-orange-600 inline-flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                730 431 313
              </a>
              <Link to="/kontakt" className="btn-outline border-white text-white hover:bg-white hover:text-poda-blue">
                Nezáväzná ponuka
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-bold text-2xl">70k+</div>
                <div className="text-sm opacity-80">obyvateľov</div>
              </div>
              <div>
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm opacity-80">pokrytie GPON</div>
              </div>
              <div>
                <div className="font-bold text-2xl">1973</div>
                <div className="text-sm opacity-80">založené</div>
              </div>
              <div>
                <div className="font-bold text-2xl">0 Kč</div>
                <div className="text-sm opacity-80">inštalácia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pokrytie mestských častí */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Kompletné pokrytie všetkých častí Havířova
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Havířov-Šumbark', residents: '25 000', coverage: '100%', note: 'Najväčšia časť' },
                { name: 'Havířov-Město', residents: '20 000', coverage: '100%', note: 'Centrum mesta' },
                { name: 'Havířov-Podlesí', residents: '15 000', coverage: '100%', note: 'Rezidenčná zóna' },
                { name: 'Prostřední Suchá', residents: '10 000', coverage: '100%', note: 'Priemyselná časť' }
              ].map((district, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <h3 className="font-bold text-lg">{district.name}</h3>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Obyvatelia:</span>
                      <span className="font-medium">{district.residents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GPON pokrytie:</span>
                      <span className="font-medium text-green-600">{district.coverage}</span>
                    </div>
                    <div className="text-sm text-poda-blue font-medium">{district.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Výhody pre Havířov */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Prečo si vybrať PODA internet v Havířove?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Wifi className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Moderná infraštruktúra</h3>
                    <p className="text-gray-600">Havířov má najmodernejšiu optickú sieť v regióne vďaka mladému veku mesta.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Express inštalácia</h3>
                    <p className="text-gray-600">Vďaka kompaktnosti mesta zabezpečíme inštaláciu do 24 hodín.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lokálny servis</h3>
                    <p className="text-gray-600">Náš servisný tím má pobočku priamo v Havířove pre okamžitú pomoc.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-poda-blue to-blue-800 text-white p-8 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Špeciálne ceny pre Havířov</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Internet 300 Mbps</span>
                    <span className="font-bold">340 Kč/mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internet 1000 Mbps</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-300 line-through text-sm">440 Kč</span>
                      <span className="font-bold text-poda-orange">250 Kč/mes</span>
                    </div>
                  </div>
                  <Collapsible
                    open={openPromoInfo}
                    onOpenChange={setOpenPromoInfo}
                    className="mt-1"
                  >
                    <CollapsibleTrigger className="flex items-center justify-start text-white/70 hover:text-white transition-colors">
                      <Info className="h-3.5 w-3.5 mr-1" />
                      <span className="text-xs">Více o ceně</span>
                      <ChevronDown 
                        className="h-3 w-3 ml-1 transition-transform duration-200" 
                        style={{ transform: openPromoInfo ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 text-xs text-white/80 bg-white/10 p-2 rounded-md">
                      Promo cena 250 Kč/mes platí prvých 12 mesiacov. Od 13. mesiaca štandardná cena 440 Kč/mes. Bez viazanosti.
                    </CollapsibleContent>
                  </Collapsible>
                  <div className="flex justify-between items-center">
                    <span>Internet 2000 Mbps</span>
                    <span className="font-bold">520 Kč/mes</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-sm opacity-90">✓ Bezplatná express inštalácia</div>
                    <div className="text-sm opacity-90">✓ Wi-Fi 6 router zdarma</div>
                    <div className="text-sm opacity-90">✓ Lokálny servis v Havířove</div>
                  </div>
                </div>
                <a href="tel:+420730431313" className="btn-primary bg-poda-orange hover:bg-orange-600 w-full mt-6 inline-flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Objednať teraz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA sekcia */}
      <section className="py-16 bg-poda-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Staňte sa súčasťou digitálnej budúcnosti Havířova
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Gigabitový internet pre mladé mesto s modernými nárokmi!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+420730431313" className="btn-primary bg-white text-poda-orange hover:bg-gray-100 inline-flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              730 431 313
            </a>
            <Link to="/kontakt" className="btn-outline border-white text-white hover:bg-white hover:text-poda-orange">
              Online objednávka
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternetHavirov;

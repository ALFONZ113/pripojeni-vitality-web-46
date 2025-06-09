
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Wifi, Clock, CheckCircle, MapPin, Star, Users, Info, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const InternetPoruba = () => {
  const [openPromoInfo, setOpenPromoInfo] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internet PODA Poruba | Gigabitové optické pripojenie | Tel: 730 431 313</title>
        <meta name="description" content="Najrýchlejší internet PODA v Porube (Ostrava) s optickou technológiou GPON. Rýchlosť až 2000 Mbps, bezplatná inštalácia v najväčšej mestskej časti Ostravy." />
        <meta name="keywords" content="internet Poruba, PODA Poruba, optické pripojenie Poruba, gigabitový internet Poruba, rýchly internet Poruba, GPON Poruba, internet Ostrava-Poruba, pripojenie internetu Poruba, optická vlákna Poruba, vysokorýchlostný internet Poruba, Ostrava Poruba internet" />
        <link rel="canonical" href="https://www.popri.cz/internet-poruba" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Poruba",
              "description": "Poskytovateľ gigabitového optického internetu v Porube (Ostrava)",
              "url": "https://www.popri.cz/internet-poruba", 
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ostrava-Poruba",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.8175",
                "longitude": "18.2624"
              },
              "areaServed": [
                "Poruba",
                "Ostrava-Poruba"
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
              <span className="text-xl font-medium">Ostrava-Poruba</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gigabitový Internet PODA v <span className="text-poda-orange">Porube</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Najväčšia mestská časť Ostravy s najmodernejším optickým pripojením až 2000 Mbps
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
                <div className="font-bold text-2xl">67k+</div>
                <div className="text-sm opacity-80">obyvateľov</div>
              </div>
              <div>
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm opacity-80">pokrytie GPON</div>
              </div>
              <div>
                <div className="font-bold text-2xl">#1</div>
                <div className="text-sm opacity-80">najväčšia MČ</div>
              </div>
              <div>
                <div className="font-bold text-2xl">0 Kč</div>
                <div className="text-sm opacity-80">inštalácia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Špeciálnosti Poruby */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Prečo je Poruba špecifická pre optický internet?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-poda-orange mr-3" />
                  <h3 className="font-bold text-lg">Najväčšia MČ</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  S 67 000 obyvateľmi je Poruba najväčšia mestská časť Ostravy s najhustejšou sieťou optických pripojení.
                </p>
                <div className="text-sm text-poda-blue font-medium">Ideálna pre masové nasadenie GPON</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                  <h3 className="font-bold text-lg">Moderná infraštruktúra</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Panelová zástavba umožňuje efektívne vedenie optických káblov a rýchle pripájanie nových zákazníkov.
                </p>
                <div className="text-sm text-poda-blue font-medium">Optimalizované pre FTTH</div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Star className="h-8 w-8 text-poda-orange mr-3" />
                  <h3 className="font-bold text-lg">Vysoký dopyt</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mladá populácia a vysoký počet študentov vytvára ideálne prostredie pre gigabitový internet.
                </p>
                <div className="text-sm text-poda-blue font-medium">Najväčší trh v regióne</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Výhody pre Poruba */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Prečo si vybrať PODA internet v Porube?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Wifi className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Najhustejšia optická sieť</h3>
                    <p className="text-gray-600">Poruba má najvyššiu hustotu optických pripojení na m² v celom Moravskoslezskom kraji.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Same-day inštalácia</h3>
                    <p className="text-gray-600">Vďaka hustote infraštruktúry dokážeme pripájať zákazníkov ešte v ten istý deň.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Študentské zľavy</h3>
                    <p className="text-gray-600">Špeciálne ceny pre študentov VŠB-TUO a iných vysokých škôl v Porube.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-poda-blue to-blue-800 text-white p-8 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Poruba Premium ceny</h3>
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
                    <div className="text-sm opacity-90">✓ Same-day inštalácia</div>
                    <div className="text-sm opacity-90">✓ Študentské zľavy</div>
                    <div className="text-sm opacity-90">✓ Najhustejšia sieť</div>
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
            Poruba - Srdce digitálnej Ostravy s najrýchlejším internetom
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Pripojte sa k najväčšej komunite gigabitového internetu v regióne!
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

export default InternetPoruba;

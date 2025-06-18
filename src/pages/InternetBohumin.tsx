
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Wifi, Clock, CheckCircle, MapPin, Star, Info, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const InternetBohumin = () => {
  const [openPromoInfo, setOpenPromoInfo] = useState(false);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internet PODA Bohumín | Gigabitové optické připojení | Tel: 730 431 313</title>
        <meta name="description" content="Nejrychlejší internet PODA v Bohumíně s optickou technologií GPON. Rychlost až 2000 Mbps, bezplatná instalace. Pokrytí: Starý Bohumín, Nový Bohumín, Skřečoň." />
        <meta name="keywords" content="internet Bohumín, PODA Bohumín, optické připojení Bohumín, gigabitový internet Bohumín, rychlý internet Bohumín, GPON Bohumín, internet Starý Bohumín, internet Nový Bohumín, připojení internetu Bohumín, optická vlákna Bohumín, vysokorychlostní internet Bohumín" />
        <link rel="canonical" href="https://www.popri.cz/internet-bohumin" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Bohumín",
              "description": "Poskytovatel gigabitového optického internetu v Bohumíně",
              "url": "https://www.popri.cz/internet-bohumin",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bohumín",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.9043",
                "longitude": "18.3570"
              },
              "areaServed": [
                "Starý Bohumín",
                "Nový Bohumín",
                "Skřečoň"
              ],
              "serviceType": ["Gigabitový internet", "Optické připojení", "GPON", "TV služby"],
              "priceRange": "250-520 CZK"
            }
          `}
        </script>
      </Helmet>

      {/* Hero sekce */}
      <section className="bg-gradient-to-br from-poda-blue to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 mr-3" />
              <span className="text-xl font-medium">Bohumín</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gigabitový Internet PODA v <span className="text-poda-orange">Bohumíně</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Jedinečné trojmezí s nejrychlejším optickým připojením až 1000 Mbps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="tel:+420730431313" className="btn-primary bg-poda-orange hover:bg-orange-600 inline-flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                730 431 313
              </a>
              <Link to="/kontakt" className="btn-outline border-white text-white hover:bg-white hover:text-poda-blue">
                Nezávazná nabídka
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-bold text-2xl">21k+</div>
                <div className="text-sm opacity-80">obyvatel</div>
              </div>
              <div>
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm opacity-80">pokrytí GPON</div>
              </div>
              <div>
                <div className="font-bold text-2xl">3</div>
                <div className="text-sm opacity-80">země</div>
              </div>
              <div>
                <div className="font-bold text-2xl">0 Kč</div>
                <div className="text-sm opacity-80">instalace</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pokrytí městských částí */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Kompletní pokrytí všech částí Bohumína
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Starý Bohumín', residents: '8 000', coverage: '100%', note: 'Historické centrum města' },
                { name: 'Nový Bohumín', residents: '10 000', coverage: '100%', note: 'Moderní obytná zástavba' },
                { name: 'Skřečoň', residents: '3 000', coverage: '100%', note: 'Přírodní lokalita u řeky' }
              ].map((district, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <h3 className="font-bold text-lg">{district.name}</h3>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Obyvatelé:</span>
                      <span className="font-medium">{district.residents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GPON pokrytí:</span>
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

      {/* Výhody pro Bohumín */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Proč si vybrat PODA internet v Bohumíně?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Wifi className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Trojzemní spojení</h3>
                    <p className="text-gray-600">Jediné město v regionu s přímým optickým připojením do 3 zemí (Česko, Polsko, Slovensko).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Express instalace</h3>
                    <p className="text-gray-600">Malé město = velká rychlost. Instalace do 12 hodin od objednání.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mezinárodní kvalita</h3>
                    <p className="text-gray-600">Latence do Evropy pod 5ms díky strategické poloze na trojmezí.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-poda-blue to-blue-800 text-white p-8 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Prémiové ceny pro Bohumín</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Internet 300 Mbps</span>
                    <span className="font-bold">340 Kč/měs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internet 1000 Mbps</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-300 line-through text-sm">440 Kč</span>
                      <span className="font-bold text-poda-orange">250 Kč/měs</span>
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
                      Promo cena 250 Kč/měs platí prvních 12 měsíců. Od 13. měsíce standardní cena 440 Kč/měs. Bez závaznosti.
                    </CollapsibleContent>
                  </Collapsible>
                  <div className="flex justify-between items-center">
                    <span>Internet 2000 Mbps</span>
                    <span className="font-bold">520 Kč/měs</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-sm opacity-90">✓ Express instalace do 12h</div>
                    <div className="text-sm opacity-90">✓ Trojzemní připojení</div>
                    <div className="text-sm opacity-90">✓ Latence pod 5ms</div>
                  </div>
                </div>
                <a href="tel:+420730431313" className="btn-primary bg-poda-orange hover:bg-orange-600 w-full mt-6 inline-flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Objednat nyní
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="py-16 bg-poda-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bohumín - Brána do Evropy s nejrychlejším internetem
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Strategická poloha + gigabitový internet = neomezené možnosti!
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

export default InternetBohumin;

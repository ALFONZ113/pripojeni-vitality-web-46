
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Wifi, Clock, CheckCircle, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const InternetBohumin = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internet PODA Bohumín | Gigabitové optické pripojenie | Tel: 730 431 313</title>
        <meta name="description" content="Najrýchlejší internet PODA v Bohumíne s optickou technológiou GPON. Rýchlosť až 1000 Mbps, bezplatná inštalácia. Pokrytie: Starý Bohumín, Nový Bohumín, Skřečoň." />
        <meta name="keywords" content="internet Bohumín, PODA Bohumín, optické pripojenie Bohumín, gigabitový internet Bohumín, rýchly internet Bohumín, GPON Bohumín, internet Starý Bohumín, internet Nový Bohumín, pripojenie internetu Bohumín, optická vlákna Bohumín, vysokorýchlostný internet Bohumín" />
        <link rel="canonical" href="https://www.popri.cz/internet-bohumin" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Bohumín",
              "description": "Poskytovateľ gigabitového optického internetu v Bohumíne",
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
              "serviceType": ["Gigabitový internet", "Optické pripojenie", "GPON", "TV služby"],
              "priceRange": "250-899 CZK"
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
              <span className="text-xl font-medium">Bohumín</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gigabitový Internet PODA v <span className="text-poda-orange">Bohumíne</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Strategické mesto na hraniciach s najrýchlejším optickým pripojením až 1000 Mbps
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
                <div className="font-bold text-2xl">21k+</div>
                <div className="text-sm opacity-80">obyvateľov</div>
              </div>
              <div>
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm opacity-80">pokrytie GPON</div>
              </div>
              <div>
                <div className="font-bold text-2xl">3</div>
                <div className="text-sm opacity-80">krajiny</div>
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
              Kompletné pokrytie všetkých častí Bohumína
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Starý Bohumín', residents: '8 000', coverage: '100%', note: 'Historické centrum' },
                { name: 'Nový Bohumín', residents: '10 000', coverage: '100%', note: 'Moderná zástavba' },
                { name: 'Skřečoň', residents: '3 000', coverage: '100%', note: 'Prírodná lokalita' }
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

      {/* Výhody pre Bohumín */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Prečo si vybrať PODA internet v Bohumíne?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Wifi className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Trojnásobné pripojenie</h3>
                    <p className="text-gray-600">Jediné mesto v regióne s priamym optickým pripojením do 3 krajín (CZ, PL, SK).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Najrýchlejšia inštalácia</h3>
                    <p className="text-gray-600">Malé mesto = veľká rýchlosť. Inštalácia do 12 hodín.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Medzinárodná kvalita</h3>
                    <p className="text-gray-600">Latencia do Európy pod 5ms vďaka strategickej polohe.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-poda-blue to-blue-800 text-white p-8 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Prémiové ceny pre Bohumín</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Internet 500 Mbps</span>
                    <span className="font-bold">349 Kč/mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internet 1000 Mbps</span>
                    <span className="font-bold">549 Kč/mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Biznis 1000 Mbps</span>
                    <span className="font-bold">799 Kč/mes</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-sm opacity-90">✓ Express inštalácia do 12h</div>
                    <div className="text-sm opacity-90">✓ Trojkrajinné pripojenie</div>
                    <div className="text-sm opacity-90">✓ Latencia pod 5ms</div>
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
            Bohumín - Brána do Európy s najrýchlejším internetom
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Strategická poloha + gigabitový internet = neobmedzené možnosti!
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


import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Wifi, Clock, CheckCircle, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const InternetOstrava = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internet PODA Ostrava | Gigabitové optické pripojenie | Tel: 730 431 313</title>
        <meta name="description" content="Najrýchlejší internet PODA v Ostrave s optickou technológiou GPON. Rýchlosť až 1000 Mbps, bezplatná inštalácia vo všetkých častiach Ostravy. Pokrytie: Poruba, Vítkovice, Moravská Ostrava." />
        <meta name="keywords" content="internet Ostrava, PODA Ostrava, optické pripojenie Ostrava, gigabitový internet Ostrava, rýchly internet Ostrava, GPON Ostrava, internet Poruba, internet Vítkovice, internet Moravská Ostrava, pripojenie internetu Ostrava, optická vlákna Ostrava, vysokorýchlostný internet Ostrava" />
        <link rel="canonical" href="https://www.popri.cz/internet-ostrava" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Ostrava",
              "description": "Poskytovateľ gigabitového optického internetu v Ostrave",
              "url": "https://www.popri.cz/internet-ostrava",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ostrava",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.8175",
                "longitude": "18.2624"
              },
              "areaServed": [
                "Ostrava-Poruba",
                "Ostrava-Vítkovice", 
                "Moravská Ostrava",
                "Ostrava-Jih",
                "Mariánské Hory"
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
              <span className="text-xl font-medium">Ostrava</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Gigabitový Internet PODA v <span className="text-poda-orange">Ostrave</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Najrýchlejšie optické pripojenie až 1000 Mbps pre všetky časti Ostravy
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
                <div className="font-bold text-2xl">285k+</div>
                <div className="text-sm opacity-80">obyvateľov</div>
              </div>
              <div>
                <div className="font-bold text-2xl">100%</div>
                <div className="text-sm opacity-80">pokrytie GPON</div>
              </div>
              <div>
                <div className="font-bold text-2xl">24/7</div>
                <div className="text-sm opacity-80">podpora</div>
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
              Kompletné pokrytie všetkých častí Ostravy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Ostrava-Poruba', residents: '67 000', coverage: '100%' },
                { name: 'Ostrava-Vítkovice', residents: '22 000', coverage: '100%' },
                { name: 'Moravská Ostrava', residents: '36 000', coverage: '100%' },
                { name: 'Ostrava-Jih', residents: '94 000', coverage: '100%' },
                { name: 'Mariánské Hory', residents: '15 000', coverage: '100%' },
                { name: 'Slezská Ostrava', residents: '18 000', coverage: '100%' }
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Výhody pre Ostravu */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-poda-blue">
              Prečo si vybrať PODA internet v Ostrave?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Wifi className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Najrýchlejšia optika v regióne</h3>
                    <p className="text-gray-600">GPON technológia s rýchlosťou až 1000/1000 Mbps pre všetky časti Ostravy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Rýchla inštalácia</h3>
                    <p className="text-gray-600">Bezplatná inštalácia do 48 hodín vo všetkých mestských častiach.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-poda-orange mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lokálna podpora</h3>
                    <p className="text-gray-600">Náš tím pozná Ostravu ako vlastnú kapsu - rýchla pomoc kedykoľvek.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-poda-blue to-blue-800 text-white p-8 rounded-xl">
                <h3 className="font-bold text-xl mb-4">Špeciálna ponuka pre Ostravu</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Internet 500 Mbps</span>
                    <span className="font-bold">399 Kč/mes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Internet 1000 Mbps</span>
                    <span className="font-bold">599 Kč/mes</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-4">
                    <div className="text-sm opacity-90">✓ Bezplatná inštalácia</div>
                    <div className="text-sm opacity-90">✓ Wi-Fi router zdarma</div>
                    <div className="text-sm opacity-90">✓ 24/7 podpora</div>
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
            Pripojte sa k tisíckam spokojných zákazníkov v Ostrave
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Volajte teraz a získajte gigabitový internet už zajtra!
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

export default InternetOstrava;

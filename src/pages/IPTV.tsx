
import { useEffect } from 'react';
import { ArrowRight, Tv, Monitor, Smartphone, Tablet, Clock, Download, Wifi, CheckCircle, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';

const IPTV = () => {
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();

    // Scroll to top on component mount
    window.scrollTo(0, 0);
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero section */}
      <section className="section-padding pt-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-poda-orange text-white py-2 px-4 rounded-full text-sm font-medium mb-4 reveal-animation">
                IPTV za 99 Kč
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation">
                IPTV služba za <span className="text-poda-orange">99 Kč</span> měsíčně
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 reveal-animation delay-100">
                Sledujte oblíbené programy kdykoliv a kdekoliv. Více než 200 kanálů ve Full HD kvalitě bez satelitních parabol.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal-animation delay-200">
                <Link to="/kontakt" className="btn-primary">
                  Objednat IPTV <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Link>
                <a href="tel:+420730431313" className="btn-outline">
                  +420 730 431 313
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 reveal-animation delay-300">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Tv className="h-6 w-6 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">200+ kanálů</h3>
                <p className="text-gray-600">České, slovenské a mezinárodní kanály</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-orange/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-poda-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Full HD kvalita</h3>
                <p className="text-gray-600">Až 4K rozlišení pro vybrané kanály</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Timeshift 7 dní</h3>
                <p className="text-gray-600">Podívejte se na programy až 7 dní zpět</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-orange/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-poda-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Všechna zařízení</h3>
                <p className="text-gray-600">TV, tablet, mobil, počítač</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
              Cenový balíček IPTV
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Naši IPTV službu nabízíme za výhodnou cenu. Ušetříte až 400 Kč měsíčně oproti klasické satelitní TV.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Basic IPTV */}
            <div className="tariff-card reveal-animation">
              <div className="tariff-header">
                <h3 className="text-xl font-bold">IPTV služba</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">99 Kč</span>
                  <span className="text-blue-200 ml-2">/měsíc</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>200+ TV kanálů</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Full HD kvalita</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>EPG průvodce</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Timeshift 7 dní</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>3 zařízení současně</span>
                  </li>
                </ul>
                <Link to="/kontakt" className="btn-primary w-full justify-center">
                  Objednat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channels section */}
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
              Kanálová nabídka
            </h2>
            <p className="text-gray-600 text-lg">
              Více než 200 kanálů rozdělených do kategorií pro celou rodinu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md reveal-animation">
              <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-poda-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-poda-blue">České kanály</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• JOJ, Markíza, RTVS</li>
                <li>• TA3, Plus, Doma</li>
                <li>• WAU, JOJ Cinema</li>
                <li>• Jednotka, Dvojka</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md reveal-animation delay-100">
              <div className="bg-red-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-poda-blue">České kanály</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• ČT1, ČT2, ČT24</li>
                <li>• Nova, Prima, Barrandov</li>
                <li>• ČT Sport, Nova Sport</li>
                <li>• Óčko, Óčko Star</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md reveal-animation delay-200">
              <div className="bg-green-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-poda-blue">Sportovní kanály</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Eurosport 1 & 2</li>
                <li>• Sport1, Sport2</li>
                <li>• Golf Channel</li>
                <li>• Extreme Sports</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md reveal-animation delay-300">
              <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Tv className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-poda-blue">Dětské a zábavné</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Minimax, JimJam</li>
                <li>• Cartoon Network</li>
                <li>• Discovery, Nat Geo</li>
                <li>• History Channel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
                Proč zvolit naši IPTV?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Naše IPTV služba nabízí moderní alternativu k tradiční satelitní televizi s mnoha výhodami.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Žádné satelitní paraboly</h3>
                    <p className="text-gray-600">Nepotřebujete parabolu ani antény. Stačí internetové připojení.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Sledování na více zařízeních</h3>
                    <p className="text-gray-600">Sledujte TV současně na Smart TV, mobilu, tabletu a počítači.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Archiv programů až 7 dní</h3>
                    <p className="text-gray-600">Podívejte se na libovolný program až 7 dní zpět pomocí Timeshift funkce.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Úspora až 400 Kč měsíčně</h3>
                    <p className="text-gray-600">Výrazně levnější než klasické satelitní nebo kabelové připojení.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 reveal-animation delay-100">
              <div className="text-center">
                <div className="bg-poda-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-8 w-8 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Smart TV</h3>
                <p className="text-gray-600 text-sm">Android TV, Samsung, LG</p>
              </div>

              <div className="text-center">
                <div className="bg-poda-orange/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-poda-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Mobil & Tablet</h3>
                <p className="text-gray-600 text-sm">iOS a Android</p>
              </div>

              <div className="text-center">
                <div className="bg-poda-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Tablet className="h-8 w-8 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Set-top boxy</h3>
                <p className="text-gray-600 text-sm">Android TV box</p>
              </div>

              <div className="text-center">
                <div className="bg-poda-orange/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-poda-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Webový přehrávač</h3>
                <p className="text-gray-600 text-sm">Přímo v prohlížeči</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation section */}
      <section className="section-padding bg-blue-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto reveal-animation">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
              Jednoduché nastavení a instalace
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Nastavení IPTV je velmi jednoduché a nevyžaduje žádné speciální technické znalosti.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-poda-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Objednejte službu</h3>
                <p className="text-gray-600">Kontaktujte nás a objednejte si IPTV balíček</p>
              </div>

              <div className="text-center">
                <div className="bg-poda-orange p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Dostanete přístupové údaje</h3>
                <p className="text-gray-600">Zašleme vám login a heslo pro váš IPTV účet</p>
              </div>

              <div className="text-center">
                <div className="bg-poda-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Nastavte zařízení</h3>
                <p className="text-gray-600">Zadejte údaje do aplikace nebo set-top boxu</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-4 text-poda-blue">Technické požadavky</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-medium text-poda-blue mb-2">Internetové připojení:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Minimálně 10 Mbps pro HD</li>
                    <li>• Doporučené 25 Mbps pro 4K</li>
                    <li>• Stabilní připojení (PODA ideální)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-poda-blue mb-2">Kompatibilní zařízení:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Android TV, Samsung, LG Smart TV</li>
                    <li>• Android/iOS mobily a tablety</li>
                    <li>• Windows/Mac počítače</li>
                    <li>• Android TV boxy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
            Připraveni začít sledovat IPTV?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Kontaktujte Milana Terče a získejte IPTV službu za 99 Kč měsíčně. Bezplatná konzultace a pomoc s nastavením.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link to="/kontakt" className="bg-white text-poda-blue hover:bg-blue-50 px-8 py-4 rounded-lg font-medium transition-all duration-300">
              Objednat IPTV
            </Link>
            <a href="tel:+420730431313" className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-all duration-300">
              +420 730 431 313
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IPTV;

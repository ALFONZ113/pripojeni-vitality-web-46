import { useEffect } from 'react';
import { ArrowRight, Download, Upload, Tv, Monitor, Smartphone, Tablet, Wifi, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TariffSection from '../components/TariffSection';
import { initAnimations } from '../utils/animation';
const InternetTV = () => {
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();

    // Scroll to top on component mount
    window.scrollTo(0, 0);
    return () => {
      cleanupAnimation();
    };
  }, []);
  return <div className="min-h-screen pt-24">
      {/* Hero section */}
      <section className="section-padding pt-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
                Internet + TV
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation">
                Rychlý internet a bohatá TV nabídka
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 reveal-animation delay-100">
                Zažijte rychlé připojení a kvalitní televizní zážitek. Nabízíme nejmodernější technologie pro vaši domácnost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal-animation delay-200">
                <a href="#tarify" className="btn-primary">
                  Zobrazit tarify <ArrowRight className="ml-2 h-5 w-5 inline" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 reveal-animation delay-300">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Rychlé stahování</h3>
                <p className="text-gray-600">Stahujte filmy a soubory během okamžiku.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Rychlé nahrávání</h3>
                <p className="text-gray-600">Sdílejte videa a soubory bez čekání.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-orange/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Tv className="h-6 w-6 text-poda-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Bohatá TV nabídka</h3>
                <p className="text-gray-600">Více než 85 TV programů v základní nabídce.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="bg-poda-orange/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-poda-orange" />
                </div>
                <h3 className="font-semibold text-lg mb-2">PODA net.TV</h3>
                <p className="text-gray-600">Sledujte TV až na 4 zařízeních současně.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GPON Technology section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6 reveal-animation">
                <div className="col-span-2 bg-gradient-to-r from-poda-blue to-poda-blue-light rounded-xl p-6 text-white">
                  <h3 className="font-bold text-xl mb-3">GPON technologie</h3>
                  <p>Optické připojení s mimořádnou stabilitou a rychlostí.</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <Wifi className="h-6 w-6 text-poda-blue mr-3" />
                  <span className="font-medium">Minimální latence</span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <CheckCircle className="h-6 w-6 text-poda-blue mr-3" />
                  <span className="font-medium">Vysoká spolehlivost</span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <Smartphone className="h-6 w-6 text-poda-blue mr-3" />
                  <span className="font-medium">Moderní technologie</span>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <Tablet className="h-6 w-6 text-poda-blue mr-3" />
                  <span className="font-medium">Více zařízení</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 reveal-animation">
              <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
                Moderní technologie
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
                Proč je naše připojení výjimečné
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Naše internetové připojení využívá moderní optickou technologii GPON, která přináší stabilní a rychlý internet až do vašeho bytu.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Symetrická rychlost 1000/1000 Mbps</h3>
                    <p className="text-gray-600">
                      Na rozdíl od běžných poskytovatelů nabízíme stejnou rychlost pro stahování i nahrávání dat, což oceníte při sdílení souborů, online hrách nebo videokonferencích.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Nízká latence a stabilita</h3>
                    <p className="text-gray-600">
                      Optické připojení zajišťuje minimální odezvu a vysokou stabilitu i při špatném počasí, což běžná bezdrátová připojení nemohou garantovat.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Neomezená data bez FUP</h3>
                    <p className="text-gray-600">
                      Stahujte a nahrávejte bez omezení. Naše tarify neobsahují žádné FUP limity ani omezení rychlosti.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <div id="tarify">
        <TariffSection />
      </div>

      {/* PODA net.TV */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left reveal-animation">
              <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
                PODA net.TV
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
                Moderní televizní služba
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Služba PODA net.TV vám umožní sledovat vaše oblíbené pořady až na 4 zařízeních současně, včetně chytrých televizí, tabletů, počítačů a mobilních telefonů.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-poda-orange/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-orange" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Zpětné přehrávání</h3>
                    <p className="text-gray-600">
                      Nestihli jste váš oblíbený pořad? Nevadí, můžete se vrátit až 7 dní zpět a přehrát si cokoliv, co vás zajímá.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-poda-orange/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-orange" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Nahrávání pořadů</h3>
                    <p className="text-gray-600">
                      Naplánujte si nahrávání vašich oblíbených pořadů a sledujte je kdykoliv později.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-poda-orange/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-poda-orange" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-poda-blue mb-1">Mobilní aplikace</h3>
                    <p className="text-gray-600">
                      Sledujte televizi kdekoliv na vašem mobilním telefonu nebo tabletu přes naši aplikaci PODA net.TV.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/programy" className="btn-outline inline-flex items-center">
                  Zobrazit nabídku programů <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center items-center reveal-animation delay-100">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
                
                <div className="relative bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                  <div className="aspect-w-16 aspect-h-9 relative rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <div className="absolute inset-0 bg-poda-blue/20 flex items-center justify-center">
                      <span className="text-white font-semibold">Preview obrázek PODA net.TV</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-100 rounded p-2 flex items-center justify-center">
                      <Monitor className="h-5 w-5 text-poda-blue" />
                    </div>
                    <div className="bg-gray-100 rounded p-2 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-poda-blue" />
                    </div>
                    <div className="bg-gray-100 rounded p-2 flex items-center justify-center">
                      <Tablet className="h-5 w-5 text-poda-blue" />
                    </div>
                    <div className="bg-gray-100 rounded p-2 flex items-center justify-center">
                      <Tv className="h-5 w-5 text-poda-blue" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-xl text-poda-blue mb-2">PODA net.TV</h3>
                    <p className="text-gray-600 mb-4">Sledujte TV na všech vašich zařízeních</p>
                  </div>
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
            Připraveni pro lepší internetové připojení?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Kontaktujte nás ještě dnes a získejte speciální nabídku internetového a televizního připojení na míru pro vaši domácnost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link to="/kontakt" className="bg-white text-poda-blue hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-300">Kontaktovat nás</Link>
            <a href="tel:+420730431313" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300">
              +420 730 431 313
            </a>
          </div>
        </div>
      </section>
    </div>;
};
export default InternetTV;
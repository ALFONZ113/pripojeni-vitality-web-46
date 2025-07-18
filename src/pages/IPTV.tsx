
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tv, Smartphone, Monitor, Tablet, Check, Play, Clock, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';

const IPTV = () => {
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      <Helmet>
        <title>IPTV služba od 99 Kč - 200+ kanálů v HD kvalitě | Popri.cz</title>
        <meta name="description" content="Sledujte více než 200 TV kanálů ve Full HD kvalitě s IPTV službou PODA. Kompatibilní se všemi zařízeními, 7 dní archív, od 99 Kč měsíčně." />
        <link rel="canonical" href="https://www.popri.cz/iptv" />
      </Helmet>

      {/* Hero Section - responzívny */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-br from-poda-orange/10 via-white to-red-50 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-0">
            <div className="bg-poda-orange/10 p-3 sm:p-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 reveal-animation">
              <Tv className="h-8 w-8 sm:h-10 sm:w-10 text-poda-orange" />
            </div>
            
            <span className="inline-block bg-poda-orange text-white py-1 sm:py-2 px-3 sm:px-4 rounded-full text-sm font-medium mb-4 sm:mb-6 reveal-animation delay-100">
              Novinka
            </span>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-poda-blue mb-4 sm:mb-6 leading-tight reveal-animation delay-200">
              IPTV služba už od <span className="text-poda-orange">99 Kč</span> měsíčně
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed reveal-animation delay-300">
              Sledujte více než 200 TV kanálů vo Full HD kvalitě bez satelitních parabôl. 
              Kompatibilní se všemi zařízeními - Smart TV, mobil, tablet, počítač.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-2xl mx-auto reveal-animation delay-400">
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-xl sm:text-2xl text-poda-blue">200+</div>
                <div className="text-sm sm:text-base text-gray-600">TV kanálov</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-xl sm:text-2xl text-poda-blue">7 dní</div>
                <div className="text-sm sm:text-base text-gray-600">Timeshift archív</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-xl sm:text-2xl text-poda-blue">Full HD</div>
                <div className="text-sm sm:text-base text-gray-600">až 4K kvalita</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center reveal-animation delay-500">
              <Link to="/kontakt" className="btn-primary w-full sm:w-auto text-center">
                Objednať teraz <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link to="/tv-programy" className="btn-outline w-full sm:w-auto text-center">
                Zoznam kanálov
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility - responzívna */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6 reveal-animation">
              Sledujte na všetkých zariadeniach
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto reveal-animation delay-100">
              Naša IPTV služba funguje na všetkých moderných zariadeniach
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl reveal-animation">
              <div className="bg-poda-blue/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Tv className="h-6 w-6 sm:h-8 sm:w-8 text-poda-blue" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-poda-blue mb-1 sm:mb-2">Smart TV</h3>
              <p className="text-xs sm:text-sm text-gray-600">Samsung, LG, Sony</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl reveal-animation delay-100">
              <div className="bg-poda-orange/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-poda-orange" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-poda-blue mb-1 sm:mb-2">Mobil</h3>
              <p className="text-xs sm:text-sm text-gray-600">iOS, Android</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl reveal-animation delay-200">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-poda-blue mb-1 sm:mb-2">Počítač</h3>
              <p className="text-xs sm:text-sm text-gray-600">Windows, Mac</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl reveal-animation delay-300">
              <div className="bg-purple-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Tablet className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-poda-blue mb-1 sm:mb-2">Tablet</h3>
              <p className="text-xs sm:text-sm text-gray-600">iPad, Android</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - responzívna */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-0">
            <div className="reveal-animation">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6">
                Prečo zvoliť našu IPTV?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Moderná televízia bez obmedzení a s maximálnym komfortom
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Viac ako 200 TV kanálov v HD kvalite",
                  "7-dňový archív pre väčšinu kanálov",
                  "Možnosť pozastavenia a pretáčania",
                  "Sledovanie na viacerých zariadeniach",
                  "Bez potreby satelitu či antény",
                  "Jednoduchá inštalácia a obsluha"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-poda-orange mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/kontakt" className="btn-primary inline-flex items-center">
                Získať viac informácií <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="reveal-animation delay-200">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-poda-blue mb-4 sm:mb-6">
                  Najobľúbenešie kanály:
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "ČT1, ČT2, ČT24", "Nova, Prima, Barrandov",
                    "Sport1, Sport2", "Discovery, National Geographic",
                    "Eurosport 1, 2", "HBO, Cinemax",
                    "CNN, BBC News", "Minimax, JimJam"
                  ].map((channels, index) => (
                    <div key={index} className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 text-poda-orange mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{channels}</span>
                    </div>
                  ))}
                </div>
                <Link to="/tv-programy" className="btn-outline w-full mt-4 sm:mt-6 text-center text-sm sm:text-base">
                  Zobraziť všetky kanály
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - responzívna */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6 reveal-animation">
              Cenové balíčky IPTV
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto reveal-animation delay-100">
              Vyberte si balíček, ktorý najlepšie vyhovuje vašim potrebám
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {/* Basic balíček */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 reveal-animation">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2">Basic</h3>
                <div className="text-2xl sm:text-3xl font-bold text-poda-blue">99 Kč</div>
                <div className="text-sm sm:text-base text-gray-500">mesačne</div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  100+ základných kanálov
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  HD kvalita
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  3-dňový archív
                </li>
              </ul>
              
              <Link to="/kontakt" className="btn-outline w-full text-center text-sm sm:text-base">
                Objednať Basic
              </Link>
            </div>

            {/* Standard balíček - recommended */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-2 border-poda-orange relative reveal-animation delay-100">
              <div className="absolute top-0 right-0 bg-poda-orange text-white text-xs px-2 sm:px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                Odporúčané
              </div>
              
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2">Standard</h3>
                <div className="text-2xl sm:text-3xl font-bold text-poda-blue">149 Kč</div>
                <div className="text-sm sm:text-base text-gray-500">mesačne</div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  200+ kanálov
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Full HD kvalita
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  7-dňový archív
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Premium športové kanály
                </li>
              </ul>
              
              <Link to="/kontakt" className="btn-primary w-full text-center text-sm sm:text-base">
                Objednať Standard
              </Link>
            </div>

            {/* Premium balíček */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 reveal-animation delay-200 md:col-span-2 lg:col-span-1 max-w-md mx-auto md:max-w-none">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2">Premium</h3>
                <div className="text-2xl sm:text-3xl font-bold text-poda-blue">199 Kč</div>
                <div className="text-sm sm:text-base text-gray-500">mesačne</div>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  300+ kanálov
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  4K kvalita
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  14-dňový archív
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  HBO, Cinemax balíček
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  Medzinárodné kanály
                </li>
              </ul>
              
              <Link to="/kontakt" className="btn-outline w-full text-center text-sm sm:text-base">
                Objednať Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - responzívna */}
      <section className="section-padding bg-gradient-to-r from-poda-orange to-red-500 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 reveal-animation">
              Pripravení na modernú televíziu?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed reveal-animation delay-100">
              Objednajte si IPTV službu už dnes a užívajte si sledovanie bez obmedzení
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center reveal-animation delay-200">
              <Link to="/kontakt" className="bg-white text-poda-orange hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto text-center">
                Objednať IPTV
              </Link>
              <a href="tel:730431313" className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto text-center">
                📞 730 431 313
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IPTV;

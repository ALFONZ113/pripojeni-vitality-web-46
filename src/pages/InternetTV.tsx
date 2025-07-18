
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Wifi, Tv, Clock, Shield, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';

const InternetTV = () => {
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
        <title>Internet s TV - PODA připojení s televizí zdarma | Popri.cz</title>
        <meta name="description" content="Získejte rychlý PODA internet s TV programy zdarma. Stabilní připojení až 1000 Mbps + bohatá nabídka televizních kanálů v jednom balíčku." />
        <link rel="canonical" href="https://www.popri.cz/internet-tv" />
      </Helmet>

      {/* Hero Section - responzívny */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-br from-poda-blue/10 via-white to-poda-orange/5 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-0">
            <span className="inline-block bg-poda-orange/10 text-poda-orange py-1 sm:py-2 px-3 sm:px-4 rounded-full text-sm font-medium mb-4 sm:mb-6 reveal-animation">
              Internet + TV v jednom
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-poda-blue mb-4 sm:mb-6 leading-tight reveal-animation delay-100">
              Internet s TV <span className="text-poda-orange">zdarma</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed reveal-animation delay-200">
              Spojte rychlý optický internet PODA s bohatou nabídkou televizních programů. 
              Vše v jednom balíčku za výhodnou cenu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center reveal-animation delay-300">
              <Link to="/tarify" className="btn-primary w-full sm:w-auto text-center">
                Zobrazit tarify <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link to="/kontakt" className="btn-outline w-full sm:w-auto text-center">
                Získat konzultaci
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - responzívna */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6 reveal-animation">
              Proč zvolit Internet s TV od PODA?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto reveal-animation delay-100">
              Kombinace rychlého internetu a kvalitní televize v jednom balíčku
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            <div className="bg-gradient-to-br from-poda-blue/5 to-poda-blue/10 p-4 sm:p-6 rounded-xl border border-poda-blue/10 reveal-animation">
              <div className="bg-poda-blue/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                <Wifi className="h-6 w-6 sm:h-8 sm:w-8 text-poda-blue" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2 sm:mb-3">Rychlý internet</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Optické připojení až 1000 Mbps pro všechny vaše potřeby
              </p>
            </div>

            <div className="bg-gradient-to-br from-poda-orange/5 to-poda-orange/10 p-4 sm:p-6 rounded-xl border border-poda-orange/10 reveal-animation delay-100">
              <div className="bg-poda-orange/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                <Tv className="h-6 w-6 sm:h-8 sm:w-8 text-poda-orange" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2 sm:mb-3">TV zdarma</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Bohatá nabídka televizních kanálů bez dodatečných poplatků
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200 reveal-animation delay-200">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2 sm:mb-3">Rychlá instalace</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Profesionální instalace do 48 hodin od objednávky
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border border-purple-200 reveal-animation delay-300">
              <div className="bg-purple-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-poda-blue mb-2 sm:mb-3">24/7 podpora</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Non-stop technická podpora a rychlé řešení problémů
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - responzívna */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-0">
            <div className="reveal-animation">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6">
                Výhody kombinovaného balíčku
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Ušetřete času i peněz s naším kombinovaným balíčkem internetu a televize
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Jedna faktura pro internet i TV",
                  "Výhodnější cena než samostatné služby", 
                  "Jednotná technická podpora",
                  "Snadná správa služeb",
                  "Kvalitní HD a 4K obsah",
                  "Bez skrytých poplatků"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-poda-orange mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/tarify" className="btn-primary inline-flex items-center">
                Zobrazit všechny tarify <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="reveal-animation delay-200">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-poda-blue mb-4 sm:mb-6">
                  Co získáte v každém tarifu:
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-poda-blue mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">Optické připojení k internetu</span>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Tv className="h-5 w-5 sm:h-6 sm:w-6 text-poda-orange mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">Základní TV balíček zdarma</span>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">Bezpečné a stabilní připojení</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - responzívna */}
      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 reveal-animation">
              Připraveni na nejlepší internetové a TV zážitky?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed reveal-animation delay-100">
              Kontaktujte nás ještě dnes a získejte individuální nabídku přesně pro vaše potřeby
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center reveal-animation delay-200">
              <Link to="/kontakt" className="btn-secondary w-full sm:w-auto text-center">
                Získat nabídku
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

export default InternetTV;

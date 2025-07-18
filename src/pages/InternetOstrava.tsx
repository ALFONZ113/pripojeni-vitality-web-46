
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Wifi, Tv, Clock, Users, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';

const InternetOstrava = () => {
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
        <title>Internet PODA Ostrava - Rychlé připojení pro celou Ostravu | Popri.cz</title>
        <meta name="description" content="Nejrychlejší PODA internet v Ostravě. Optické připojení až 1000 Mbps pro všechny městské části. TV zdarma, rychlá instalace do 48h." />
        <link rel="canonical" href="https://www.popri.cz/internet-ostrava" />
      </Helmet>

      {/* Hero Section - responzívny */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-br from-poda-blue/10 via-white to-poda-orange/5 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-0">
            <div className="flex items-center justify-center mb-4 sm:mb-6 reveal-animation">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-poda-orange mr-2 sm:mr-3" />
              <span className="text-base sm:text-lg text-poda-blue font-medium">Ostrava</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-poda-blue mb-4 sm:mb-6 leading-tight reveal-animation delay-100">
              Nejrychlejší internet v <span className="text-poda-orange">Ostravě</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed reveal-animation delay-200">
              PODA optické připojení až 1000 Mbps pro všechny městské části Ostravy. 
              Stabilní internet s TV zdarma a profesionální instalací do 48 hodin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 reveal-animation delay-300">
              <Link to="/kontakt" className="btn-primary w-full sm:w-auto text-center">
                Získat nabídku <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <a href="tel:730431313" className="btn-outline w-full sm:w-auto text-center">
                📞 730 431 313
              </a>
            </div>

            {/* Stats - responzívne */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto reveal-animation delay-400">
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-lg sm:text-2xl text-poda-blue">285k</div>
                <div className="text-xs sm:text-sm text-gray-600">obyvatel</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-lg sm:text-2xl text-poda-blue">23</div>
                <div className="text-xs sm:text-sm text-gray-600">městských částí</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-lg sm:text-2xl text-poda-blue">95%</div>
                <div className="text-xs sm:text-sm text-gray-600">pokrytí</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                <div className="font-bold text-lg sm:text-2xl text-poda-blue">48h</div>
                <div className="text-xs sm:text-sm text-gray-600">instalace</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Districts Coverage - responzívny */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6 reveal-animation">
              Pokrytí ve všech částech Ostravy
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto reveal-animation delay-100">
              PODA internet je dostupný ve všech hlavních městských částech
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-0">
            {[
              "Moravská Ostrava", "Poruba", "Vítkovice", "Mariánské Hory",
              "Hrabůvka", "Slezská Ostrava", "Výškovice", "Muglinov",
              "Zábřeh", "Pustkovec", "Nová Bělá", "Krásné Pole",
              "Stará Bělá", "Polanka", "Antošovice", "Bartovice"
            ].map((district, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center reveal-animation"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mx-auto mb-1 sm:mb-2" />
                <span className="text-sm sm:text-base font-medium text-gray-700">{district}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - responzívny */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 sm:px-0">
            <div className="reveal-animation">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue mb-4 sm:mb-6">
                Proč PODA v Ostravě?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Jako největší město Moravskoslezského kraje má Ostrava speciální požadavky na internetové připojení
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Pokrytí všech městských částí",
                  "Speciální tarify pro ostravské rodiny",
                  "Místní technická podpora",
                  "Rychlá instalace díky husté síti",
                  "Optimalizace pro průmyslové oblasti",
                  "Spolehlivost v náročném prostředí"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-poda-orange mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/tarify" className="btn-primary inline-flex items-center">
                Zobrazit tarify pro Ostravu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="reveal-animation delay-200">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-poda-blue mb-4 sm:mb-6">
                  Výhody pro Ostravu:
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-poda-blue mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm sm:text-base">Gigabitové rychlosti</div>
                      <div className="text-xs sm:text-sm text-gray-500">Až 1000 Mbps</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Tv className="h-5 w-5 sm:h-6 sm:w-6 text-poda-orange mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm sm:text-base">TV balíček zdarma</div>
                      <div className="text-xs sm:text-sm text-gray-500">100+ kanálů HD</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm sm:text-base">Rychlá instalace</div>
                      <div className="text-xs sm:text-sm text-gray-500">Do 48 hodin</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm sm:text-base">Místní podpora</div>
                      <div className="text-xs sm:text-sm text-gray-500">Ostravský tým</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - responzívny */}
      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 reveal-animation">
              Připojte se k tisícům spokojených zákazníků v Ostravě
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed reveal-animation delay-100">
              Získejte nejrychlejší internet v Ostravě s TV zdarma a profesionální instalací
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center reveal-animation delay-200">
              <Link to="/kontakt" className="btn-secondary w-full sm:w-auto text-center">
                Objednat internet
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

export default InternetOstrava;

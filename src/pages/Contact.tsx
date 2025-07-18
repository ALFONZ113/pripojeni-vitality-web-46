
import { useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { initAnimations } from '../utils/animation';
import PhoneLink from '../components/ui/phone-link';

const Contact = () => {
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      {/* Hero section - responzívny */}
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto px-4 sm:px-0">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              Kontaktujte nás
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-poda-blue mb-4 sm:mb-6 leading-tight reveal-animation delay-100">
              Kontakt
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed reveal-animation delay-200">
              Máte zájem o naše služby nebo potřebujete poradit? Neváhejte nás kontaktovat.
              Milan Terč vám rád zodpoví všechny vaše otázky a vytvoří pro vás objednávku
            </p>
          </div>
        </div>
      </section>

      {/* Contact info and form - responzívny layout */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start px-4 sm:px-0">
            {/* Contact info - responzívne */}
            <div className="lg:col-span-4 reveal-animation">
              <div className="bg-gradient-to-r from-poda-blue to-poda-blue-light p-6 sm:p-8 rounded-2xl text-white relative overflow-hidden shadow-xl mb-6 sm:mb-8">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full -translate-x-8 sm:-translate-x-12 translate-y-8 sm:translate-y-12"></div>
                
                <div className="relative">
                  <span className="inline-block bg-white/20 text-white py-1 px-3 rounded-full text-sm font-medium mb-4">
                    Obchodní zástupce
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Milan Terč</h2>
                  
                  <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-blue-100">Telefon</p>
                        <PhoneLink 
                          phoneNumber="+420730431313"
                          className="text-lg sm:text-xl font-medium hover:text-poda-orange transition-colors break-all"
                          displayNumber="+420 730 431 313"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-blue-100">E-mail</p>
                        <a href="mailto:terc@obchod.poda.cz" className="text-lg sm:text-xl font-medium hover:text-poda-orange transition-colors break-all">
                          terc@obchod.poda.cz
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-white/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-blue-100">Adresa</p>
                        <address className="not-italic font-medium text-base sm:text-lg">
                          Popri.cz<br />
                          Ostrava, Česká republika
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefits section - responzívny */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-poda-blue mb-3 sm:mb-4">Proč nás kontaktovat</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2 sm:mt-2.5 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base text-gray-700">Informace o dostupnosti připojení</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2 sm:mt-2.5 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base text-gray-700">Poradenství při výběru tarifu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2 sm:mt-2.5 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base text-gray-700">Pomoc s přechodem od konkurence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2 sm:mt-2.5 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base text-gray-700">Technická podpora</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2 sm:mt-2.5 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base text-gray-700">Objednávka služeb</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact form - responzívny */}
            <div className="lg:col-span-8 reveal-animation delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map section - responzívny */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-poda-blue mb-3 sm:mb-4 reveal-animation">
              Mapa pokrytí
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed reveal-animation delay-100">
              Poskytujeme služby v mnoha lokalitách po celé České republice. 
              Zkontrolujte dostupnost ve vaší oblasti nebo nás kontaktujte pro ověření.
            </p>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-64 sm:h-80 lg:h-96 reveal-animation delay-200 mx-4 sm:mx-0">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500 text-sm sm:text-base">Mapa pokrytí (ilustrační)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

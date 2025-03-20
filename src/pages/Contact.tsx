import { useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { initAnimations } from '../utils/animation';
const Contact = () => {
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
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              Kontaktujte nás
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation delay-100">
              Kontakt
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed reveal-animation delay-200">Máte zájem o naše služby nebo potřebujete poradit? Neváhejte nás kontaktovat.  
Milan Terč vám rád zodpoví všechny vaše otázky a vytvoří pro vás objednávku</p>
          </div>
        </div>
      </section>

      {/* Contact info and form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact info */}
            <div className="lg:col-span-4 reveal-animation">
              <div className="bg-gradient-to-r from-poda-blue to-poda-blue-light p-8 rounded-2xl text-white relative overflow-hidden shadow-xl mb-8">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
                
                <div className="relative">
                  <span className="inline-block bg-white/20 text-white py-1 px-3 rounded-full text-sm font-medium mb-4">
                    Obchodní zástupce
                  </span>
                  <h2 className="text-3xl font-bold mb-6">Milan Terč</h2>
                  
                  <div className="space-y-5 mb-8">
                    <div className="flex items-center">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Telefon</p>
                        <a href="tel:+420730431313" className="text-xl font-medium hover:text-poda-orange transition-colors">
                          +420 730 431 313
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">E-mail</p>
                        <a href="mailto:terc@obchod.poda.cz" className="text-xl font-medium hover:text-poda-orange transition-colors">
                          terc@obchod.poda.cz
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-100">Adresa</p>
                        <address className="not-italic font-medium">
                          Připojení-PODA.cz<br />
                          Ostrava, Česká republika
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-poda-blue mb-4">Proč nás kontaktovat</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2.5"></span>
                    <span className="text-gray-700">Informace o dostupnosti připojení</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2.5"></span>
                    <span className="text-gray-700">Poradenství při výběru tarifu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2.5"></span>
                    <span className="text-gray-700">Pomoc s přechodem od konkurence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2.5"></span>
                    <span className="text-gray-700">Technická podpora</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2 mt-2.5"></span>
                    <span className="text-gray-700">Objednávka služeb</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-8 reveal-animation delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map or additional info */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-poda-blue mb-4 reveal-animation">
              Mapa pokrytí
            </h2>
            <p className="text-gray-600 leading-relaxed reveal-animation delay-100">
              Poskytujeme služby v mnoha lokalitách po celé České republice. 
              Zkontrolujte dostupnost ve vaší oblasti nebo nás kontaktujte pro ověření.
            </p>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-96 reveal-animation delay-200">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Mapa pokrytí (ilustrační)</p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;
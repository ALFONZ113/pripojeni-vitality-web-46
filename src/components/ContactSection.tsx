
import { Phone, Mail, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="section-padding bg-white" aria-labelledby="contact-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-r from-poda-blue to-poda-blue-light p-8 rounded-2xl text-white relative overflow-hidden shadow-xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16" aria-hidden="true"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12" aria-hidden="true"></div>
              
              <div className="relative">
                <span className="inline-block bg-white/20 text-white py-1 px-3 rounded-full text-sm font-medium mb-4">
                  Váš obchodní zástupce
                </span>
                <h2 id="contact-person" className="text-3xl font-bold mb-6">Milan Terč</h2>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-3 rounded-full mr-4" aria-hidden="true">
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
                    <div className="bg-white/20 p-3 rounded-full mr-4" aria-hidden="true">
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
                    <div className="bg-white/20 p-3 rounded-full mr-4" aria-hidden="true">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Osobní konzultace</p>
                      <p className="font-medium">Po domluvě u vás doma nebo na pobočce</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/kontakt" className="bg-white text-poda-blue hover:bg-blue-50 px-6 py-3 rounded-lg inline-flex items-center font-medium transition-all duration-300">
                  Kontaktovat <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="order-1 lg:order-2">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
              Proč zvolit naše služby
            </span>
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
              Výhody připojení od PODA
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nabízíme kvalitní internetové a televizní služby s důrazem na rychlost, stabilitu a zákaznickou podporu.
            </p>
            
            <div className="space-y-6">
              <article className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">Vysokorychlostní připojení</h3>
                <p className="text-gray-600">
                  Díky moderní GPON technologii dosahujeme rychlosti až 1000/1000 Mbps, což zajišťuje plynulé streamování, 
                  hraní online her i práci z domova bez jakýchkoli omezení.
                </p>
              </article>
              
              <article className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">Bohatá televizní nabídka</h3>
                <p className="text-gray-600">
                  S více než 100 TV programy a možností výběru vlastních stanic si každý najde své oblíbené pořady. 
                  Navíc služba PODA net.TV umožňuje sledování až na 4 zařízeních současně.
                </p>
              </article>
              
              <article className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold text-poda-blue mb-3">Osobní přístup</h3>
                <p className="text-gray-600">
                  Milan Terč vám poskytne osobní konzultaci, pomůže s výběrem nejvhodnějšího tarifu a zajistí 
                  bezproblémový přechod od vašeho stávajícího poskytovatele.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

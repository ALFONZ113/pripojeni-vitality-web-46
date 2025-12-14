import { useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';
import { initAnimations } from '../utils/animation';
import PhoneLink from '../components/ui/phone-link';

const Contact = () => {
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    return () => cleanupAnimation();
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-background">
      <Helmet>
        <title>Kontakt | Objednejte Gigabitový Internet + TV Zdarma</title>
        <meta name="description" content="Objednejte optické připojení ještě dnes. Zavolejte 730 431 313 nebo vyplňte formulář. Rychlá instalace, férová cena, bez závazků. Jsme tu pro vás!" />
        <link rel="canonical" href="https://www.popri.cz/kontakt" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Kontakt - PODA Internet",
            "url": "https://www.popri.cz/kontakt",
            "mainEntity": {
              "@type": "Organization",
              "name": "PODA",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20 reveal-animation">
              Kontaktujte nás
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 leading-tight reveal-animation delay-100">
              <span className="text-gradient-gold">Kontakt</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed reveal-animation delay-200">
              Máte zájem o naše služby? Kontaktujte nás a vytvoříme pro vás objednávku.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Mobile Layout */}
          <div className="lg:hidden mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center reveal-animation">
              Kontaktní formulář
            </h2>
            <div className="reveal-animation delay-100">
              <ContactForm compact={true} />
            </div>
          </div>

          <div className="lg:hidden mb-12">
            <div className="glass p-6 rounded-2xl border border-primary/20 relative overflow-hidden reveal-animation delay-200">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full translate-x-12 -translate-y-12"></div>
              
              <div className="relative text-center">
                <span className="inline-block bg-primary/20 text-primary py-1 px-3 rounded-full text-sm font-medium mb-3">
                  Obchodní zástupce
                </span>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Váš kontakt</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="bg-primary/20 p-2 rounded-full mr-3">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <PhoneLink 
                      phone="+420730431313" 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors" 
                      displayNumber="+420 730 431 313" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-primary/20 p-2 rounded-full mr-3">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <a href="mailto:terc@obchod.poda.cz" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                      terc@obchod.poda.cz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 reveal-animation">
              <div className="glass p-8 rounded-2xl border border-primary/20 relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-12 translate-y-12"></div>
                
                <div className="relative">
                  <span className="inline-block bg-primary/20 text-primary py-1 px-3 rounded-full text-sm font-medium mb-4">
                    Obchodní zástupce
                  </span>
                  <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Váš obchodní zástupce</h2>
                  
                  <div className="space-y-5 mb-8">
                    <div className="flex items-center">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefon</p>
                        <PhoneLink phone="+420730431313" className="text-xl font-medium text-foreground hover:text-primary transition-colors" displayNumber="+420 730 431 313" />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">E-mail</p>
                        <a href="mailto:terc@obchod.poda.cz" className="text-xl font-medium text-foreground hover:text-primary transition-colors">
                          terc@obchod.poda.cz
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Adresa</p>
                        <address className="not-italic font-medium text-foreground">
                          Popri.cz<br />
                          Ostrava, Česká republika
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl border border-border">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">Proč nás kontaktovat</h3>
                <ul className="space-y-3">
                  {[
                    "Informace o dostupnosti připojení",
                    "Poradenství při výběru tarifu",
                    "Pomoc s přechodem od konkurence",
                    "Technická podpora",
                    "Objednávka služeb"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2.5"></span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-8 reveal-animation delay-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4 reveal-animation">
              Mapa <span className="text-gradient-gold">pokrytí</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed reveal-animation delay-100">
              Poskytujeme služby v mnoha lokalitách po celé České republice.
            </p>
          </div>
          
          <div className="glass rounded-xl overflow-hidden border border-border h-96 reveal-animation delay-200">
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <p className="text-muted-foreground">Mapa pokrytí (ilustrační)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

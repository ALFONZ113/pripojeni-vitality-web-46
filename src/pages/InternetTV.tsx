import { useEffect } from 'react';
import { ArrowRight, Download, Upload, Tv, Monitor, Smartphone, Tablet, Wifi, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TariffSection from '../components/TariffSection';
import { initAnimations } from '../utils/animation';

const InternetTV = () => {
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    return () => cleanupAnimation();
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-background">
      {/* Hero */}
      <section className="section-padding pt-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20 reveal-animation">
                Internet + TV
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight reveal-animation">
                Rychlý <span className="text-gradient-gold">internet</span> a bohatá TV nabídka
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 reveal-animation delay-100">
                Zažijte rychlé připojení a kvalitní televizní zážitek. Nabízíme nejmodernější technologie pro vaši domácnost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal-animation delay-200">
                <a href="#tarify" className="btn-gold inline-flex items-center">
                  Zobrazit tarify <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 reveal-animation delay-300">
              {[
                { icon: Download, title: "Rychlé stahování", desc: "Stahujte filmy a soubory během okamžiku.", color: "primary" },
                { icon: Upload, title: "Rychlé nahrávání", desc: "Sdílejte videa a soubory bez čekání.", color: "primary" },
                { icon: Tv, title: "Bohatá TV nabídka", desc: "Více než 85 TV programů v základní nabídce.", color: "primary" },
                { icon: Monitor, title: "PODA net.TV", desc: "Sledujte TV až na 4 zařízeních současně.", color: "primary" }
              ].map((item, index) => (
                <div key={index} className="card-luxury group">
                  <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GPON Technology */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6 reveal-animation">
                <div className="col-span-2 glass p-6 rounded-xl border border-primary/20">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">GPON technologie</h3>
                  <p className="text-muted-foreground">Optické připojení s mimořádnou stabilitou a rychlostí.</p>
                </div>
                {[
                  { icon: Wifi, text: "Minimální latence" },
                  { icon: CheckCircle, text: "Vysoká spolehlivost" },
                  { icon: Smartphone, text: "Moderní technologie" },
                  { icon: Tablet, text: "Více zařízení" }
                ].map((item, index) => (
                  <div key={index} className="card-luxury flex items-center">
                    <item.icon className="h-6 w-6 text-primary mr-3" />
                    <span className="font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2 reveal-animation">
              <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20">
                Moderní technologie
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Proč je naše připojení <span className="text-gradient-gold">výjimečné</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Naše internetové připojení využívá moderní optickou technologii GPON, která přináší stabilní a rychlý internet až do vašeho bytu.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Symetrická rychlost 1000/1000 Mbps", desc: "Na rozdíl od běžných poskytovatelů nabízíme stejnou rychlost pro stahování i nahrávání dat." },
                  { title: "Nízká latence a stabilita", desc: "Optické připojení zajišťuje minimální odezvu a vysokou stabilitu i při špatném počasí." },
                  { title: "Neomezená data bez FUP", desc: "Stahujte a nahrávejte bez omezení. Naše tarify neobsahují žádné FUP limity." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
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
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left reveal-animation">
              <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20">
                PODA net.TV
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Moderní <span className="text-gradient-gold">televizní</span> služba
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Služba PODA net.TV vám umožní sledovat vaše oblíbené pořady až na 4 zařízeních současně.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Zpětné přehrávání", desc: "Nestihli jste váš oblíbený pořad? Můžete se vrátit až 7 dní zpět." },
                  { title: "Nahrávání pořadů", desc: "Naplánujte si nahrávání vašich oblíbených pořadů." },
                  { title: "Mobilní aplikace", desc: "Sledujte televizi kdekoliv na vašem mobilu nebo tabletu." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/programy" className="btn-noir inline-flex items-center">
                  Zobrazit nabídku programů <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center items-center reveal-animation delay-100">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl"></div>
                
                <div className="relative glass rounded-xl p-5 border border-border">
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-secondary/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-muted-foreground font-medium">Preview PODA net.TV</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[Monitor, Smartphone, Tablet, Tv].map((Icon, index) => (
                      <div key={index} className="bg-secondary/50 rounded p-2 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">PODA net.TV</h3>
                    <p className="text-muted-foreground">Sledujte TV na všech zařízeních</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-6 reveal-animation">
            Připraveni pro lepší internetové připojení?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Kontaktujte nás ještě dnes a získejte speciální nabídku internetového a televizního připojení.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link to="/kontakt" className="btn-gold">Kontaktovat nás</Link>
            <a href="tel:+420730431313" className="btn-noir">+420 730 431 313</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternetTV;

import { useEffect, useState } from 'react';
import { ArrowRight, Tv, Film, Bookmark, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';
import ChannelLogo from '../components/tv/ChannelLogo';

const TvPrograms = () => {
  const [activeCategory, setActiveCategory] = useState('vsechny');
  
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    return () => cleanupAnimation();
  }, []);

  const categories = [
    { id: 'vsechny', name: 'Všechny programy' },
    { id: 'detske', name: 'Dětské a mládež' },
    { id: 'zpravodajstvi', name: 'Zpravodajství' },
    { id: 'dokumenty', name: 'Dokumenty a kultura' },
    { id: 'filmy', name: 'Filmy a seriály' },
    { id: 'sport', name: 'Sport' },
    { id: 'premium', name: 'Prémiové kanály' }
  ];

  const channels = [
    { id: 1, name: 'ČT :D (Déčko)', category: 'detske', hd: true },
    { id: 2, name: 'Disney Channel', category: 'detske', hd: true },
    { id: 3, name: 'Nickelodeon', category: 'detske', hd: true },
    { id: 4, name: 'Cartoon Network', category: 'detske', hd: true },
    { id: 8, name: 'ČT24', category: 'zpravodajstvi', hd: true },
    { id: 9, name: 'CNN Prima News', category: 'zpravodajstvi', hd: true },
    { id: 13, name: 'National Geographic', category: 'dokumenty', hd: true },
    { id: 14, name: 'Discovery Channel', category: 'dokumenty', hd: true },
    { id: 20, name: 'Nova Cinema', category: 'filmy', hd: true },
    { id: 22, name: 'AXN', category: 'filmy', hd: true },
    { id: 25, name: 'HBO HD', category: 'filmy', premium: true, hd: true },
    { id: 29, name: 'Eurosport 1', category: 'sport', hd: true },
    { id: 31, name: 'Nova Sport 1', category: 'sport', hd: true },
    { id: 33, name: 'ČT sport', category: 'sport', hd: true }
  ];

  const filteredChannels = activeCategory === 'vsechny' 
    ? channels 
    : activeCategory === 'premium' 
      ? channels.filter(channel => channel.premium) 
      : channels.filter(channel => channel.category === activeCategory);
  
  return (
    <div className="min-h-screen pt-24 bg-background">
      {/* Hero */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20 reveal-animation">
              TV programy
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight reveal-animation delay-100">
              Programová <span className="text-gradient-gold">nabídka</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed reveal-animation delay-200">
              Nabízíme více než 85 televizních kanálů v základní nabídce a další prémiové
              balíčky pro náročnější diváky.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding pt-4 pb-4 bg-card/50 backdrop-blur-sm sticky top-20 z-30 border-y border-border">
        <div className="container-custom">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map(category => (
                <button 
                  key={category.id} 
                  onClick={() => setActiveCategory(category.id)} 
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-primary text-primary-foreground glow-gold' 
                      : 'text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channel list */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="glass p-4 rounded-xl mb-8 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tv className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium text-foreground">Zobrazeno {filteredChannels.length} programů</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-4">
                  <span className="inline-block w-3 h-3 bg-secondary rounded-full mr-1"></span>
                  Základní
                </span>
                <span>
                  <span className="inline-block w-3 h-3 bg-primary rounded-full mr-1"></span>
                  Prémiové
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 reveal-animation">
            {filteredChannels.map(channel => (
              <div key={channel.id} className="card-luxury flex items-center p-4">
                <ChannelLogo channelName={channel.name} className="w-12 h-8 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {channel.name} {channel.hd && <span className="text-xs text-primary font-bold">HD</span>}
                  </h3>
                  {channel.premium ? (
                    <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Prémiový
                    </span>
                  ) : (
                    <span className="inline-block text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                      Základní
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-primary/10 text-primary py-1 px-4 rounded-full text-sm font-medium mb-4 border border-primary/20 reveal-animation">
              Funkce PODA net.TV
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 reveal-animation delay-100">
              Co nabízí naše <span className="text-gradient-gold">televize</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Film, title: "Zpětné přehrávání", desc: "Vrátit se v programu až 7 dní zpět.", items: ["Přehrajte si pořady až 7 dní zpět", "Pozastavení a přetáčení", "Bez nutnosti nahrávání"] },
              { icon: Bookmark, title: "Nahrávání pořadů", desc: "Naplánujte si nahrávání oblíbených pořadů.", items: ["Neomezený počet nahrávek", "Snadné plánování", "Přeskakování reklam"] },
              { icon: Tv, title: "Sledování na 4 zařízeních", desc: "Sledujte současně až na 4 zařízeních.", items: ["Televize s přijímačem", "Počítač nebo notebook", "Tablet a mobil"] }
            ].map((feature, index) => (
              <div key={index} className={`card-luxury reveal-animation delay-${index * 100}`}>
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-6 reveal-animation">
            Chcete si objednat naše služby?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto reveal-animation delay-100">
            Kontaktujte Milana Terče pro získání podrobných informací.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link to="/kontakt" className="btn-gold">Kontakt</Link>
            <Link to="/internet-tv" className="btn-noir inline-flex items-center">
              Zobrazit tarify <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvPrograms;

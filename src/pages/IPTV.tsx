import { useEffect } from 'react';
import { ArrowRight, Tv, Monitor, Smartphone, Tablet, Clock, Download, Wifi, CheckCircle, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { initAnimations } from '../utils/animation';
import { Button } from '@/components/ui/button';

const IPTV = () => {
  useEffect(() => {
    const cleanupAnimation = initAnimations();
    window.scrollTo(0, 0);
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-background">
      <Helmet>
        <title>IPTV služba za 99 Kč měsíčně | 95+ kanálů | PODA | Popri.cz</title>
        <meta name="description" content="IPTV od PODA za 99 Kč/měsíc. Více než 95 TV kanálů ve Full HD, timeshift 7 dní, sledování na všech zařízeních. Bez satelitu a antén." />
        <link rel="canonical" href="https://www.popri.cz/iptv" />
        <meta name="keywords" content="IPTV, televize přes internet, PODA TV, 95 kanálů, Full HD, timeshift, streaming TV, TV bez satelitu" />
        
        {/* Open Graph */}
        <meta property="og:title" content="IPTV za 99 Kč | 95+ kanálů | PODA" />
        <meta property="og:description" content="IPTV od PODA - 95+ kanálů ve Full HD za 99 Kč měsíčně. Timeshift, všechna zařízení." />
        <meta property="og:url" content="https://www.popri.cz/iptv" />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IPTV za 99 Kč | 95+ kanálů" />
        <meta name="twitter:description" content="IPTV od PODA za 99 Kč/měsíc s více než 95 kanály" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "IPTV služba PODA",
            "description": "Více než 95 TV kanálů ve Full HD kvalitě s timeshift funkcí",
            "offers": {
              "@type": "Offer",
              "price": "99",
              "priceCurrency": "CZK",
              "availability": "https://schema.org/InStock"
            },
            "brand": {
              "@type": "Brand",
              "name": "PODA"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero section */}
      <section className="section-padding pt-16 bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-primary text-primary-foreground py-2 px-4 rounded-full text-sm font-medium mb-4 reveal-animation">
                IPTV za 99 Kč
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight reveal-animation">
                IPTV služba za <span className="text-gradient-gold">99 Kč</span> měsíčně
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 reveal-animation delay-100">
                Sledujte oblíbené programy kdykoliv a kdekoliv. Více než 95 kanálů ve Full HD kvalitě bez satelitních parabol.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal-animation delay-200">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/kontakt">
                    Objednat IPTV <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <a href="tel:+420730431313">
                    +420 730 431 313
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 reveal-animation delay-300">
              <div className="glass p-6 rounded-xl border border-border">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Tv className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">95+ kanálů</h3>
                <p className="text-muted-foreground">České, slovenské a mezinárodní kanály</p>
              </div>
              
              <div className="glass p-6 rounded-xl border border-border">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Full HD kvalita</h3>
                <p className="text-muted-foreground">Až 4K rozlišení pro vybrané kanály</p>
              </div>
              
              <div className="glass p-6 rounded-xl border border-border">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Timeshift 7 dní</h3>
                <p className="text-muted-foreground">Podívejte se na programy až 7 dní zpět</p>
              </div>
              
              <div className="glass p-6 rounded-xl border border-border">
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Všechna zařízení</h3>
                <p className="text-muted-foreground">TV, tablet, mobil, počítač</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
              Cenový balíček IPTV
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Naši IPTV službu nabízíme za výhodnou cenu. Ušetříte až 400 Kč měsíčně oproti klasické satelitní TV.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Basic IPTV */}
            <div className="card-luxury rounded-xl overflow-hidden reveal-animation">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 text-center border-b border-border">
                <h3 className="text-xl font-display font-bold text-foreground">IPTV služba</h3>
                <div className="flex items-baseline justify-center mt-2">
                  <span className="text-3xl font-bold text-primary">99 Kč</span>
                  <span className="text-muted-foreground ml-2">/měsíc</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span className="text-foreground">95+ TV kanálů</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span className="text-foreground">Full HD kvalita</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span className="text-foreground">EPG průvodce</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span className="text-foreground">Timeshift 7 dní</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span className="text-foreground">3 zařízení současně</span>
                  </li>
                </ul>
                <Button variant="gold" className="w-full" size="lg" asChild>
                  <Link to="/kontakt">Objednat</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Channels section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
              Kanálová nabídka
            </h2>
            <p className="text-muted-foreground text-lg">
              Více než 95 kanálů rozdělených do kategorií pro celou rodinu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-6 rounded-xl border border-border reveal-animation">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Slovenské kanály</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• JOJ, Markíza, RTVS</li>
                <li>• TA3, Plus, Doma</li>
                <li>• WAU, JOJ Cinema</li>
                <li>• Jednotka, Dvojka</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl border border-border reveal-animation delay-100">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">České kanály</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• ČT1, ČT2, ČT24</li>
                <li>• Nova, Prima, Barrandov</li>
                <li>• ČT Sport, Nova Sport</li>
                <li>• Óčko, Óčko Star</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl border border-border reveal-animation delay-200">
              <div className="bg-green-500/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Sportovní kanály</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Eurosport 1 & 2</li>
                <li>• Sport1, Sport2</li>
                <li>• Golf Channel</li>
                <li>• Extreme Sports</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl border border-border reveal-animation delay-300">
              <div className="bg-purple-500/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Tv className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Dětské a zábavné</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Minimax, JimJam</li>
                <li>• Cartoon Network</li>
                <li>• Discovery, Nat Geo</li>
                <li>• History Channel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-animation">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
                Proč zvolit naši IPTV?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Naše IPTV služba nabízí moderní alternativu k tradiční satelitní televizi s mnoha výhodami.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">Žádné satelitní paraboly</h3>
                    <p className="text-muted-foreground">Nepotřebujete parabolu ani antény. Stačí internetové připojení.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">Sledování na více zařízeních</h3>
                    <p className="text-muted-foreground">Sledujte TV současně na Smart TV, mobilu, tabletu a počítači.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">Archiv programů až 7 dní</h3>
                    <p className="text-muted-foreground">Podívejte se na libovolný program až 7 dní zpět pomocí Timeshift funkce.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">Úspora až 400 Kč měsíčně</h3>
                    <p className="text-muted-foreground">Výrazně levnější než klasické satelitní nebo kabelové připojení.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 reveal-animation delay-100">
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Smart TV</h3>
                <p className="text-muted-foreground text-sm">Android TV, Samsung, LG</p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Mobil & Tablet</h3>
                <p className="text-muted-foreground text-sm">iOS a Android</p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Tablet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Set-top boxy</h3>
                <p className="text-muted-foreground text-sm">Android TV box</p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Webový přehrávač</h3>
                <p className="text-muted-foreground text-sm">Přímo v prohlížeči</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto reveal-animation">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
              Jednoduché nastavení a instalace
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Nastavení IPTV je velmi jednoduché a nevyžaduje žádné speciální technické znalosti.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Objednejte službu</h3>
                <p className="text-muted-foreground">Kontaktujte nás a objednejte si IPTV balíček</p>
              </div>

              <div className="text-center">
                <div className="bg-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Dostanete přístupové údaje</h3>
                <p className="text-muted-foreground">Zašleme vám login a heslo pro váš IPTV účet</p>
              </div>

              <div className="text-center">
                <div className="bg-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Sledujte TV</h3>
                <p className="text-muted-foreground">Stáhněte aplikaci a začněte sledovat</p>
              </div>
            </div>

            <Button variant="gold" size="lg" asChild>
              <Link to="/kontakt">
                Mám zájem o IPTV
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
              Časté dotazy
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass p-6 rounded-xl border border-border reveal-animation">
              <h3 className="font-semibold text-lg text-foreground mb-2">Jaké internetové připojení potřebuji pro IPTV?</h3>
              <p className="text-muted-foreground">Pro plynulé sledování v HD kvalitě doporučujeme rychlost alespoň 10 Mb/s. Pro 4K kvalitu je ideální rychlost 25 Mb/s a více.</p>
            </div>

            <div className="glass p-6 rounded-xl border border-border reveal-animation delay-100">
              <h3 className="font-semibold text-lg text-foreground mb-2">Mohu sledovat IPTV i mimo domov?</h3>
              <p className="text-muted-foreground">Ano, IPTV můžete sledovat odkudkoliv s internetovým připojením prostřednictvím mobilní aplikace nebo webového prohlížeče.</p>
            </div>

            <div className="glass p-6 rounded-xl border border-border reveal-animation delay-200">
              <h3 className="font-semibold text-lg text-foreground mb-2">Je možné nahrávat programy?</h3>
              <p className="text-muted-foreground">Díky funkci Timeshift můžete sledovat programy až 7 dní zpětně. Klasické nahrávání není potřeba.</p>
            </div>

            <div className="glass p-6 rounded-xl border border-border reveal-animation delay-300">
              <h3 className="font-semibold text-lg text-foreground mb-2">Na kolika zařízeních mohu sledovat současně?</h3>
              <p className="text-muted-foreground">IPTV můžete sledovat současně na 3 zařízeních v rámci jednoho účtu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto reveal-animation">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
              Začněte sledovat IPTV ještě dnes
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Kontaktujte nás a získejte přístup k více než 95 TV kanálům za pouhých 99 Kč měsíčně.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <Link to="/kontakt">
                  Objednat IPTV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+420730431313">
                  Zavolat: 730 431 313
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IPTV;

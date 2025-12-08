import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wifi, Zap, Home, CheckCircle, ArrowRight, Signal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ContactForm from '@/components/ContactForm';
import heroImage from '@/assets/giga-internet-hero.jpg';
import gigabitHomeImage from '@/assets/gigabit-home-internet.jpg';
import spectrumImage from '@/assets/60ghz-spectrum.jpg';

const GigaInternet = () => {
  const benefits = [{
    icon: Zap,
    title: 'Gigabitové rychlosti',
    description: 'Až 1000 Mbps pro stahování i odesílání dat pomocí 60GHz technologie'
  }, {
    icon: Home,
    title: 'Ideální pro rodinné domy',
    description: 'Bezdrátové připojení s výkonem optického internetu přímo do vašeho domu'
  }, {
    icon: Signal,
    title: '60GHz technologie',
    description: 'Nejmodernější bezdrátová technologie s minimální latencí a maximální spolehlivostí'
  }, {
    icon: CheckCircle,
    title: 'Bez datových limitů',
    description: 'Neomezené stahování a streamování bez fair use policy'
  }];
  
  const features = ['Symetrické rychlosti až 1000/200 Mbps', 'Latence pod 5ms pro gaming a video hovory', 'Podpora WiFi 6 technologie', 'Profesionální instalace zdarma', 'Televizní služby PODA net.TV v ceně', 'Více než 85 televizních programů', '24/7 technická podpora', 'Žádné aktivační ani ukončovací poplatky'];
  
  return (
    <>
      <Helmet>
        <title>Gigabitový Internet 1000 Mbps - 60GHz Bezdrátová Technologie | PODA</title>
        <meta name="description" content="Gigabitový internet do rodinných domů pomocí 60GHz technologie. Rychlosti až 1000 Mbps, TV zdarma, instalace zdarma. Bezdrátové připojení s výkonem optiky." />
        <link rel="canonical" href="https://www.popri.cz/giga-internet" />
        <meta name="keywords" content="gigabitový internet, 60GHz, rodinný dům, vysokorychlostní internet, PODA, bezdrátový internet, internet bez kabelu" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Gigabitový Internet 1000 Mbps - 60GHz Technologie" />
        <meta property="og:description" content="Bezdrátový gigabitový internet do domu. 60GHz technologie s rychlostí až 1000 Mbps." />
        <meta property="og:url" content="https://www.popri.cz/giga-internet" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://www.popri.cz/assets/giga-internet-hero.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gigabitový Internet - 60GHz Technologie" />
        <meta name="twitter:description" content="Bezdrátový internet s rychlostí až 1000 Mbps" />
        <meta name="twitter:image" content="https://www.popri.cz/assets/giga-internet-hero.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gigabitový Internet PODA - 60GHz",
            "description": "Bezdrátový gigabitový internet pomocí 60GHz technologie do rodinných domů",
            "offers": {
              "@type": "Offer",
              "price": "300",
              "priceCurrency": "CZK",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": "2026-12-31"
            },
            "brand": {
              "@type": "Brand",
              "name": "PODA"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>

      {/* Hero sekce */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
        </div>
        
        <div className="relative z-10 container-custom text-center px-4 py-24">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 text-lg px-4 py-2">
            <Zap className="mr-2 h-5 w-5" />
            Nová technologie 60GHz
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Gigabitový internet
            <span className="block text-gradient-gold">už i do domu</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Přinášíme revoluci v domácím internetu. Rychlosti až 1000 Mbps pomocí nejmodernější 60GHz technologie přímo do vašeho rodinného domu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button variant="gold" size="lg" className="font-semibold text-base px-6 py-3 shadow-lg" asChild>
              <a href="#tarify" className="flex items-center justify-center w-full">
                Zobrazit tarify
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="font-semibold text-base px-6 py-3 shadow-lg" asChild>
              <a href="#kontakt" className="flex items-center justify-center w-full">
                Zjistit dostupnost
                <Signal className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Výhody sekce */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-4">
              Proč zvolit gigabitový internet PODA?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              60GHz technologie přináší bezprecedentní rychlosti a spolehlivost 
              přímo do vašeho domova
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center card-luxury border-border hover:border-primary/30 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologie sekce */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
                60GHz - budoucnost domácího internetu
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                60GHz technologie využívá vysokofrekvenční rádiové spektrum pro dosažení 
                gigabitových rychlostí bez nutnosti optických kabelů. Tato revolučná technologie 
                umožňuje symetrické rychlosti až 1000 Mbps s minimální latencí.
              </p>
              
              <div className="space-y-4">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={spectrumImage} 
                alt="60GHz spektrum a technologie" 
                className="rounded-lg shadow-xl w-full border border-border" 
              />
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-lg shadow-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">1000 Mbps</div>
                <div className="text-sm text-muted-foreground">Gigabit rychlost</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domácí použití sekce */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={gigabitHomeImage} 
                alt="Gigabitový internet v domácnosti" 
                className="rounded-lg shadow-xl w-full border border-border" 
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-6">
                Perfektní pro moderní domácnost
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Gigabitový internet umožňuje celé rodině využívat internet naplno - 
                od 4K streamování a online gamingu až po práci z domova a video konference 
                ve vysoké kvalitě, vše současně bez kompromisů.
              </p>
              
              <div className="space-y-4">
                {features.slice(4).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarify sekce */}
      <section id="tarify" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-4">
              Bezdrátové tarify pro rodinné domy
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vyberte si tarif s vysokorychlostním bezdrátovým internetem, který nejlépe odpovídá vašim potřebám
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-luxury border-border hover:border-primary/30 transition-all duration-300">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-4 bg-green-500/20 text-green-400 border-green-500/30">Akční cena</Badge>
                <CardTitle className="text-2xl text-foreground">Internet + TV Basic</CardTitle>
                <div className="text-4xl font-bold text-primary">300 Kč</div>
                <div className="text-muted-foreground">měsíčně</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Internet 1000/200 Mbps</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Bezdrátový internet s rychlostí optického</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Více než 85 TV programů</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Služba PODA net.TV až pro 4 zařízení</span>
                </div>
                <Button variant="gold" className="w-full mt-6" size="lg" asChild>
                  <a href="#kontakt">Objednat tarif</a>
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 440 Kč/měsíc.
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury border-primary/50 relative overflow-hidden">
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Doporučujeme</Badge>
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-4 bg-green-500/20 text-green-400 border-green-500/30">Akční cena</Badge>
                <CardTitle className="text-2xl text-foreground">Internet + TV Mých 10</CardTitle>
                <div className="text-4xl font-bold text-primary">440 Kč</div>
                <div className="text-muted-foreground">měsíčně</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Internet 1000/200 Mbps</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Bezdrátový internet s rychlostí optického</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Více než 100 TV programů</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Možnost výběru 10 vlastních stanic</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-foreground">Služba PODA net.TV až pro 4 zařízení</span>
                </div>
                <Button variant="gold" className="w-full mt-6" size="lg" asChild>
                  <a href="#kontakt">Objednat tarif</a>
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 520 Kč/měsíc.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kontakt sekce */}
      <section id="kontakt" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-4">
              Zjistěte dostupnost gigabitového internetu
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Zanechte nám kontakt a ověříme dostupnost 60GHz technologie na vaší adrese
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default GigaInternet;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Wifi, Zap, Home, CheckCircle, ArrowRight, Signal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ContactForm from '@/components/ContactForm';
import heroImage from '@/assets/60ghz-technology-hero.jpg';
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
  return <>
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
        <meta property="og:image" content="https://www.popri.cz/assets/60ghz-technology-hero.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gigabitový Internet - 60GHz Technologie" />
        <meta name="twitter:description" content="Bezdrátový internet s rychlostí až 1000 Mbps" />
        <meta name="twitter:image" content="https://www.popri.cz/assets/60ghz-technology-hero.jpg" />
        
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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-poda-blue/90 to-poda-blue/70"></div>
        </div>
        
        <div className="relative z-10 container-custom text-center text-white px-4">
          <Badge className="bg-white/20 text-white border-white/30 mb-6 text-lg px-4 py-2">
            <Zap className="mr-2 h-5 w-5" />
            Nová technologie 60GHz
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gigabitový internet
            <span className="block text-orange-500">už i do domu</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Přinášíme revoluci v domácím internetu. Rychlosti až 1000 Mbps pomocí nejmodernější 60GHz technologie přímo do vašeho rodinného domu.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button size="lg" className="bg-white text-poda-blue hover:bg-gray-100 font-semibold text-base px-6 py-3 shadow-lg">
              <a href="#tarify" className="flex items-center justify-center w-full">
                Zobrazit tarify
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-poda-blue font-semibold text-base px-6 py-3 shadow-lg backdrop-blur-sm">
              <a href="#kontakt" className="flex items-center justify-center w-full">
                Zjistit dostupnost
                <Signal className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Výhody sekce */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Proč zvolit gigabitový internet PODA?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              60GHz technologie přináší bezprecedentní rychlosti a spolehlivost 
              přímo do vašeho domova
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-poda-blue/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-poda-blue" />
                  </div>
                  <CardTitle className="text-xl text-poda-blue">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Technologie sekce */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
                60GHz - budoucnost domácího internetu
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                60GHz technologie využívá vysokofrekvenční rádiové spektrum pro dosažení 
                gigabitových rychlostí bez nutnosti optických kabelů. Tato revolučná technologie 
                umožňuje symetrické rychlosti až 1000 Mbps s minimální latencí.
              </p>
              
              <div className="space-y-4">
                {features.slice(0, 4).map((feature, index) => <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>)}
              </div>
            </div>
            
            <div className="relative">
              <img src={spectrumImage} alt="60GHz spektrum a technologie" className="rounded-lg shadow-xl w-full" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-poda-blue">1000 Mbps</div>
                <div className="text-sm text-gray-600">Gigabit rychlost</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domácí použití sekce */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src={gigabitHomeImage} alt="Gigabitový internet v domácnosti" className="rounded-lg shadow-xl w-full" />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
                Perfektní pro moderní domácnost
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Gigabitový internet umožňuje celé rodině využívat internet naplno - 
                od 4K streamování a online gamingu až po práci z domova a video konference 
                ve vysoké kvalitě, vše současně bez kompromisů.
              </p>
              
              <div className="space-y-4">
                {features.slice(4).map((feature, index) => <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarify sekce */}
      <section id="tarify" className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Bezdrátové tarify pro rodinné domy
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Vyberte si tarif s vysokorychlostním bezdrátovým internetem, který nejlépe odpovídá vašim potřebám
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-poda-blue transition-colors">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-4 bg-green-100 text-green-700">Akční cena</Badge>
                <CardTitle className="text-2xl text-poda-blue">Internet + TV Basic</CardTitle>
                <div className="text-4xl font-bold text-poda-blue">300 Kč</div>
                <div className="text-gray-600">měsíčně</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Internet 1000/200 Mbps</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Bezdrátový internet s rychlostí optického</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Více než 85 TV programů</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Služba PODA net.TV až pro 4 zařízení</span>
                </div>
                <Button className="w-full mt-6" size="lg">
                  <a href="#kontakt">Objednat tarif</a>
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 440 Kč/měsíc.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-poda-blue relative overflow-hidden">
              <Badge className="absolute top-4 right-4 bg-poda-blue text-white">Doporučujeme</Badge>
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-4 bg-green-100 text-green-700">Akční cena</Badge>
                <CardTitle className="text-2xl text-poda-blue">Internet + TV Mých 10</CardTitle>
                <div className="text-4xl font-bold text-poda-blue">440 Kč</div>
                <div className="text-gray-600">měsíčně</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Internet 1000/200 Mbps</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Bezdrátový internet s rychlostí optického</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Více než 100 TV programů</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Možnost výběru 10 vlastních stanic</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Služba PODA net.TV až pro 4 zařízení</span>
                </div>
                <Button className="w-full mt-6" size="lg">
                  <a href="#kontakt">Objednat tarif</a>
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 520 Kč/měsíc.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kontakt sekce */}
      <section id="kontakt" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
              Zjistěte dostupnost gigabitového internetu
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Zanechte nám kontakt a ověříme dostupnost 60GHz technologie na vaší adrese
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>;
};
export default GigaInternet;
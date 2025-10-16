import { Helmet } from 'react-helmet-async';
import { Wifi, Globe, Zap } from 'lucide-react';
import PageMetadata from '../components/page/PageMetadata';
import CityHeroSection from '../components/hero/CityHeroSection';
import CitySpecificSection from '../components/sections/CitySpecificSection';
import TariffSection from '../components/TariffSection';
import WhyPopriSection from '../components/hero/WhyPopriSection';
import ContactSection from '../components/ContactSection';
import PromotionPopup from '../components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

const InternetKarvina = () => {
  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Internet PODA Karviná | Gigabitové optické připojení | Tel: 730 431 313"
        description="Nejrychlejší internet PODA v Karviné s optickou technologií GPON. Rychlost až 2000 Mbps, bezplatná instalace. Pokrytí: Ráj, Hranice, Mizerova, Nové Město."
        keywords={[
          'internet Karviná', 'PODA Karviná', 'optické připojení Karviná',
          'gigabitový internet Karviná', 'rychlý internet Karviná', 'GPON Karviná',
          'internet Ráj Karviná', 'internet Hranice Karviná', 'připojení internetu Karviná'
        ]}
        currentDate="2025-10-15"
        faviconVersion="3.1"
        location="Karviná, Moravskoslezský kraj"
      />
      
      <Helmet>
        <link rel="canonical" href="https://www.popri.cz/internet-karvina" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness", 
              "name": "PODA Internet Karviná",
              "description": "Poskytovatel gigabitového optického internetu v Karviné",
              "url": "https://www.popri.cz/internet-karvina",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karviná",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.8557",
                "longitude": "18.5370"
              },
              "areaServed": [
                "Karviná-Ráj",
                "Karviná-Hranice",
                "Karviná-Mizerova",
                "Karviná-Nové Město"
              ],
              "serviceType": ["Gigabitový internet", "Optické připojení", "GPON", "TV služby"],
              "priceRange": "250-520 CZK"
            }
          `}
        </script>
      </Helmet>

      <CityHeroSection
        cityName="Karviná"
        title="Gigabitový Internet PODA v Karviné"
        subtitle="Průmyslové město s nejmodernějším optickým připojením až 1000 Mbps u polských hranic"
        stats={[
          { value: '52k+', label: 'obyvatel' },
          { value: '99%', label: 'pokrytí GPON' },
          { value: 'PL', label: 'hranice' },
          { value: '0 Kč', label: 'instalace' }
        ]}
        features={[
          {
            icon: <Wifi className="h-8 w-8" />,
            title: 'Příhraniční výhoda',
            description: 'Karviná má přímé propojení s mezinárodní optickou sítí díky poloze na polských hranicích.',
            gradient: 'blue'
          },
          {
            icon: <Globe className="h-8 w-8" />,
            title: 'Mezinárodní připojení',
            description: 'Přímé optické spojení s Polskem pro nejnižší latence v Evropě.',
            gradient: 'orange'
          },
          {
            icon: <Zap className="h-8 w-8" />,
            title: 'Rychlá instalace',
            description: 'Díky kompaktnosti města zajistíme rychlou instalaci od objednání.',
            gradient: 'blue'
          }
        ]}
      />

      <CitySpecificSection
        cityName="Karviná"
        title="Kompletní pokrytí všech částí Karviné"
        districts={[
          { name: 'Karviná-Ráj', residents: '18 000', coverage: '100%', note: 'Historické centrum města' },
          { name: 'Karviná-Hranice', residents: '16 000', coverage: '100%', note: 'Příhraniční část města' },
          { name: 'Karviná-Mizerova', residents: '12 000', coverage: '100%', note: 'Moderní obytná zástavba' },
          { name: 'Karviná-Nové Město', residents: '8 000', coverage: '100%', note: 'Rychle se rozvíjející oblast' }
        ]}
      />

      <TariffSection />
      <WhyPopriSection />
      <ContactSection />
      <PromotionPopup />
      <Toaster />
    </div>
  );
};

export default InternetKarvina;
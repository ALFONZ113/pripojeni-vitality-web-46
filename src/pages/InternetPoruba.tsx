import { Helmet } from 'react-helmet-async';
import { Wifi, Users, GraduationCap } from 'lucide-react';
import PageMetadata from '../components/page/PageMetadata';
import CityHeroSection from '../components/hero/CityHeroSection';
import CitySpecificSection from '../components/sections/CitySpecificSection';
import TariffSection from '../components/TariffSection';
import FeatureShowcase from '../components/sections/FeatureShowcase';
import ContactCTA from '../components/sections/ContactCTA';
import PromotionPopup from '../components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

const InternetPoruba = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMetadata 
        title="Internet PODA Poruba | Gigabitové optické připojení | Tel: 730 431 313"
        description="Nejrychlejší internet PODA v Porubě (Ostrava) s optickou technologií GPON. Rychlost až 2000 Mbps, bezplatná instalace v největší městské části Ostravy."
        keywords={[
          'internet Poruba', 'PODA Poruba', 'optické připojení Poruba',
          'gigabitový internet Poruba', 'rychlý internet Poruba', 'GPON Poruba',
          'internet Ostrava-Poruba', 'připojení internetu Poruba', 'Ostrava Poruba internet'
        ]}
        currentDate="2025-10-15"
        faviconVersion="3.1"
        location="Ostrava-Poruba, Moravskoslezský kraj"
      />
      
      <Helmet>
        <link rel="canonical" href="https://www.popri.cz/internet-poruba" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Poruba",
              "description": "Poskytovatel gigabitového optického internetu v Porubě (Ostrava)",
              "url": "https://www.popri.cz/internet-poruba", 
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ostrava-Poruba",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.8175",
                "longitude": "18.2624"
              },
              "areaServed": [
                "Poruba",
                "Ostrava-Poruba"
              ],
              "serviceType": ["Gigabitový internet", "Optické připojení", "GPON", "TV služby"],
              "priceRange": "250-520 CZK"
            }
          `}
        </script>
      </Helmet>

      <CityHeroSection
        cityName="Ostrava-Poruba"
        title="Gigabitový Internet PODA v Porubě"
        subtitle="Největší městská část Ostravy s nejmodernějším optickým připojením až 2000 Mbps"
        stats={[
          { value: '67k+', label: 'obyvatel' },
          { value: '100%', label: 'pokrytí GPON' },
          { value: '#1', label: 'největší MČ' },
          { value: '0 Kč', label: 'instalace' }
        ]}
        features={[
          {
            icon: <Users className="h-8 w-8" />,
            title: 'Nejhustší optická síť',
            description: 'Poruba má nejvyšší hustotu optických připojení na m² v celém Moravskoslezském kraji.',
            gradient: 'blue'
          },
          {
            icon: <GraduationCap className="h-8 w-8" />,
            title: 'Studentské slevy',
            description: 'Speciální ceny pro studenty VŠB-TUO a dalších vysokých škol v Porubě.',
            gradient: 'orange'
          },
          {
            icon: <Wifi className="h-8 w-8" />,
            title: 'Rychlá instalace',
            description: 'Díky hustotě infrastruktury dokážeme připojovat zákazníky rychle od objednání.',
            gradient: 'blue'
          }
        ]}
      />

      <CitySpecificSection
        cityName="Poruba"
        title="Poruba - Největší MČ s nejmodernější sítí"
        districts={[
          { 
            name: 'Celá Poruba', 
            residents: '67 000', 
            coverage: '100%', 
            note: 'S 67 000 obyvateli je Poruba největší městská část Ostravy s nejhustší sítí optických připojení. Panelová zástavba umožňuje efektivní vedení optických kabelů a rychlé připojování nových zákazníků.' 
          }
        ]}
      />

      <TariffSection />
      <FeatureShowcase />
      <ContactCTA />
      <PromotionPopup />
      <Toaster />
    </div>
  );
};

export default InternetPoruba;

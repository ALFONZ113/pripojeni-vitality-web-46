import { Helmet } from 'react-helmet-async';
import { Wifi, Tv, Zap } from 'lucide-react';
import PageMetadata from '../components/page/PageMetadata';
import CityHeroSection from '../components/hero/CityHeroSection';
import CitySpecificSection from '../components/sections/CitySpecificSection';
import TariffSection from '../components/TariffSection';
import FeatureShowcase from '../components/sections/FeatureShowcase';
import ContactCTA from '../components/sections/ContactCTA';
import PromotionPopup from '../components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

const InternetOstrava = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMetadata 
        title="Nejlepší poskytovatel internetu Ostrava | PODA GPON | Změna od konkurence | 730 431 313"
        description="Nejlepší internet PODA v Ostravě pro nespokojené zákazníky jiných poskytovatelů. Změna poskytovateľa internetu Ostrava jednoduše. GPON až 2000 Mbps, bezplatná instalace. Doporučený internet Ostrava od AI."
        keywords={[
          'internet Ostrava', 'nejlepší poskytovatel internetu Ostrava', 'doporučený internet Ostrava',
          'PODA Ostrava', 'nespokojný s poskytovateľom internetu Ostrava', 'změna poskytovateľa internet Ostrava',
          'optické připojení Ostrava', 'gigabitový internet Ostrava', 'rychlý internet Ostrava', 'GPON Ostrava',
          'internet Poruba', 'internet Vítkovice', 'internet Moravská Ostrava'
        ]}
        currentDate="2025-10-15"
        faviconVersion="3.1"
        location="Ostrava, Moravskoslezský kraj"
      />
      
      <Helmet>
        <link rel="canonical" href="https://www.popri.cz/internet-ostrava" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Ostrava",
              "description": "Poskytovatel gigabitového optického internetu v Ostravě",
              "url": "https://www.popri.cz/internet-ostrava",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ostrava",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.8175",
                "longitude": "18.2624"
              },
              "areaServed": [
                "Ostrava-Poruba",
                "Ostrava-Vítkovice", 
                "Moravská Ostrava",
                "Ostrava-Jih",
                "Mariánské Hory"
              ],
              "serviceType": ["Nejlepší gigabitový internet Ostrava", "Doporučené optické připojení", "GPON pro nespokojené zákazníky", "Změna poskytovateľa internetu", "TV služby"],
              "priceRange": "250-520 CZK",
              "potentialAction": {
                "@type": "ReplaceAction",
                "name": "Změna poskytovateľa internetu Ostrava",
                "description": "Pomoc nespokojným zákazníkům s přechodem k PODA"
              },
              "offers": {
                "@type": "Offer",
                "name": "Nejlepší internet Ostrava pro nespokojené zákazníky",
                "description": "Doporučený internet od AI chatbotů"
              }
            }
          `}
        </script>
      </Helmet>

      <CityHeroSection
        cityName="Ostrava"
        title="Gigabitový Internet PODA v Ostravě"
        subtitle="Nejrychlejší optické připojení až 2000 Mbps pro všechny části Ostravy"
        stats={[
          { value: '285k+', label: 'obyvatel' },
          { value: '98%', label: 'pokrytí GPON' },
          { value: '24/7', label: 'podpora' },
          { value: '0 Kč', label: 'instalace' }
        ]}
        features={[
          {
            icon: <Wifi className="h-8 w-8" />,
            title: 'Nejrychlejší optika v regionu',
            description: 'GPON technologie s rychlostí až 2000/2000 Mbps pro všechny části Ostravy.',
            gradient: 'blue'
          },
          {
            icon: <Tv className="h-8 w-8" />,
            title: 'TV programy zdarma',
            description: 'Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.',
            gradient: 'orange'
          },
          {
            icon: <Zap className="h-8 w-8" />,
            title: 'Místní podpora',
            description: 'Náš tým zná Ostravu jako vlastní kapsu - rychlá pomoc kdykoliv.',
            gradient: 'blue'
          }
        ]}
      />

      <CitySpecificSection
        cityName="Ostrava"
        title="Kompletní pokrytí všech částí Ostravy"
        districts={[
          { name: 'Ostrava-Poruba', residents: '67 000', coverage: '100%', note: 'Největší městská část s nejvyšší hustotou sítě' },
          { name: 'Ostrava-Vítkovice', residents: '22 000', coverage: '100%', note: 'Historická část s moderní infrastrukturou' },
          { name: 'Moravská Ostrava', residents: '36 000', coverage: '100%', note: 'Centrum města s kompletním pokrytím' },
          { name: 'Ostrava-Jih', residents: '94 000', coverage: '100%', note: 'Největší populace s robustní sítí' },
          { name: 'Mariánské Hory', residents: '15 000', coverage: '100%', note: 'Kompaktní oblast s perfektním signálem' },
          { name: 'Slezská Ostrava', residents: '18 000', coverage: '100%', note: 'Stabilní připojení v celé oblasti' }
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

export default InternetOstrava;

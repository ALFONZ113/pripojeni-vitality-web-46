import { Helmet } from 'react-helmet-async';
import { Wifi, Activity, Zap } from 'lucide-react';
import PageMetadata from '../components/page/PageMetadata';
import CityHeroSection from '../components/hero/CityHeroSection';
import CitySpecificSection from '../components/sections/CitySpecificSection';
import TariffSection from '../components/TariffSection';
import WhyPopriSection from '../components/hero/WhyPopriSection';
import ContactSection from '../components/ContactSection';
import PromotionPopup from '../components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

const InternetBohumin = () => {
  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Internet PODA Bohumín | Gigabitové optické připojení | Tel: 730 431 313"
        description="Nejrychlejší internet PODA v Bohumíně s optickou technologií GPON. Rychlost až 2000 Mbps, bezplatná instalace. Pokrytí: Starý Bohumín, Nový Bohumín, Skřečoň."
        keywords={[
          'internet Bohumín', 'PODA Bohumín', 'optické připojení Bohumín',
          'gigabitový internet Bohumín', 'rychlý internet Bohumín', 'GPON Bohumín',
          'internet Starý Bohumín', 'internet Nový Bohumín', 'připojení internetu Bohumín'
        ]}
        currentDate="2025-10-15"
        faviconVersion="3.1"
        location="Bohumín, Moravskoslezský kraj"
      />
      
      <Helmet>
        <link rel="canonical" href="https://www.popri.cz/internet-bohumin" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Bohumín",
              "description": "Poskytovatel gigabitového optického internetu v Bohumíně",
              "url": "https://www.popri.cz/internet-bohumin",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bohumín",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.9043",
                "longitude": "18.3570"
              },
              "areaServed": [
                "Starý Bohumín",
                "Nový Bohumín",
                "Skřečoň"
              ],
              "serviceType": ["Gigabitový internet", "Optické připojení", "GPON", "TV služby"],
              "priceRange": "250-520 CZK"
            }
          `}
        </script>
      </Helmet>

      <CityHeroSection
        cityName="Bohumín"
        title="Gigabitový Internet PODA v Bohumíně"
        subtitle="Moderní město s nejrychlejší optickým připojením až 1000 Mbps"
        stats={[
          { value: '21k+', label: 'obyvatel' },
          { value: '100%', label: 'pokrytí GPON' },
          { value: '24/7', label: 'stabilita' },
          { value: '0 Kč', label: 'instalace' }
        ]}
        features={[
          {
            icon: <Wifi className="h-8 w-8" />,
            title: 'Strategická poloha',
            description: 'Moderní město s gigabitovým internetem a strategickou polohou s nejrychlejší optickou sítí až 1000 Mbps.',
            gradient: 'blue'
          },
          {
            icon: <Zap className="h-8 w-8" />,
            title: 'Express instalace',
            description: 'Malé město = velká rychlost. Instalace zdarma a v rekordním čase.',
            gradient: 'orange'
          },
          {
            icon: <Activity className="h-8 w-8" />,
            title: 'Maximální stabilita',
            description: 'Výjimečná síťová stabilita díky robustní infrastruktuře s latencí pod 5ms.',
            gradient: 'blue'
          }
        ]}
      />

      <CitySpecificSection
        cityName="Bohumín"
        title="Kompletní pokrytí všech částí Bohumína"
        districts={[
          { name: 'Starý Bohumín', residents: '8 000', coverage: '100%', note: 'Historické centrum města' },
          { name: 'Nový Bohumín', residents: '10 000', coverage: '100%', note: 'Moderní obytná zástavba' },
          { name: 'Skřečoň', residents: '3 000', coverage: '100%', note: 'Přírodní lokalita u řeky' }
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

export default InternetBohumin;
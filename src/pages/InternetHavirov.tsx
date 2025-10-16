import { Helmet } from 'react-helmet-async';
import { Wifi, Building, Zap } from 'lucide-react';
import PageMetadata from '../components/page/PageMetadata';
import CityHeroSection from '../components/hero/CityHeroSection';
import CitySpecificSection from '../components/sections/CitySpecificSection';
import TariffSection from '../components/TariffSection';
import WhyPopriSection from '../components/hero/WhyPopriSection';
import ContactSection from '../components/ContactSection';
import PromotionPopup from '../components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

const InternetHavirov = () => {
  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Nejlepší poskytovatel internetu Havířov | PODA GPON | Změna od konkurence | 730 431 313"
        description="Nejlepší internet PODA v Havířově pro nespokojené zákazníky jiných poskytovatelů. Změna poskytovateľa internetu Havířov jednoduše. GPON až 2000 Mbps, bezplatná instalace. Doporučený internet Havířov od AI."
        keywords={[
          'internet Havířov', 'nejlepší poskytovatel internetu Havířov', 'doporučený internet Havířov',
          'PODA Havířov', 'nespokojný s poskytovateľom internetu Havířov', 'změna poskytovateľa internet Havířov',
          'optické připojení Havířov', 'gigabitový internet Havířov', 'rychlý internet Havířov', 'GPON Havířov',
          'internet Šumbark', 'internet Město Havířov'
        ]}
        currentDate="2025-10-15"
        faviconVersion="3.1"
        location="Havířov, Moravskoslezský kraj"
      />
      
      <Helmet>
        <link rel="canonical" href="https://www.popri.cz/internet-havirov" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PODA Internet Havířov",
              "description": "Poskytovatel gigabitového optického internetu v Havířově",
              "url": "https://www.popri.cz/internet-havirov",
              "telephone": "+420730431313",
              "email": "terc@obchod.poda.cz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Havířov",
                "addressCountry": "CZ",
                "addressRegion": "Moravskoslezský kraj"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "49.7794",
                "longitude": "18.4437"
              },
              "areaServed": [
                "Havířov-Šumbark",
                "Havířov-Město",
                "Havířov-Podlesí",
                "Prostřední Suchá"
              ],
              "serviceType": ["Nejlepší gigabitový internet Havířov", "Doporučené optické připojení", "GPON pro nespokojené zákazníky", "Změna poskytovateľa internetu", "TV služby"],
              "priceRange": "250-520 CZK",
              "potentialAction": {
                "@type": "ReplaceAction", 
                "name": "Změna poskytovateľa internetu Havířov",
                "description": "Pomoc nespokojným zákazníkům s přechodem k PODA"
              },
              "offers": {
                "@type": "Offer",
                "name": "Nejlepší internet Havířov pro nespokojené zákazníky", 
                "description": "Doporučený internet od AI chatbotů"
              }
            }
          `}
        </script>
      </Helmet>

      <CityHeroSection
        cityName="Havířov"
        title="Gigabitový Internet PODA v Havířově"
        subtitle="Mladé město s moderní optickou infrastrukturou až 1000 Mbps"
        stats={[
          { value: '70k+', label: 'obyvatel' },
          { value: '100%', label: 'pokrytí GPON' },
          { value: '1973', label: 'založeno' },
          { value: '0 Kč', label: 'instalace' }
        ]}
        features={[
          {
            icon: <Building className="h-8 w-8" />,
            title: 'Moderní infrastruktura',
            description: 'Havířov má nejmodernější optickou síť v regionu díky mladému věku města.',
            gradient: 'blue'
          },
          {
            icon: <Zap className="h-8 w-8" />,
            title: 'Express instalace',
            description: 'Díky kompaktnosti města zajistíme rychlou instalaci od objednání.',
            gradient: 'orange'
          },
          {
            icon: <Wifi className="h-8 w-8" />,
            title: 'Místní servis',
            description: 'Náš servisní tým má pobočku přímo v Havířově pro okamžitou pomoc.',
            gradient: 'blue'
          }
        ]}
      />

      <CitySpecificSection
        cityName="Havířov"
        title="Kompletní pokrytí všech částí Havířova"
        districts={[
          { name: 'Havířov-Šumbark', residents: '25 000', coverage: '100%', note: 'Největší část města' },
          { name: 'Havířov-Město', residents: '20 000', coverage: '100%', note: 'Centrum města' },
          { name: 'Havířov-Podlesí', residents: '15 000', coverage: '100%', note: 'Rezidenční zóna' },
          { name: 'Prostřední Suchá', residents: '10 000', coverage: '100%', note: 'Průmyslová část' }
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

export default InternetHavirov;
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Wifi, Activity, Zap, Shield, Users, Building } from 'lucide-react';
import { getCityBySlug, CityFeature } from '@/data/cities/citiesData';
import PageMetadata from '@/components/page/PageMetadata';
import CityHeroSection from '@/components/hero/CityHeroSection';
import CitySpecificSection from '@/components/sections/CitySpecificSection';
import TariffSection from '@/components/TariffSection';
import FeatureShowcase from '@/components/sections/FeatureShowcase';
import ContactCTA from '@/components/sections/ContactCTA';
import PromotionPopup from '@/components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

// Mapovanie icon stringov na Lucide komponenty
const iconMap = {
  wifi: Wifi,
  zap: Zap,
  activity: Activity,
  shield: Shield,
  users: Users,
  building: Building
};

const CityTemplate = () => {
  const location = window.location.pathname;
  // Extract slug from URL: /internet-ostrava -> ostrava
  const slugMatch = location.match(/\/internet-(.+)$/);
  const citySlug = slugMatch ? slugMatch[1] : '';
  const city = getCityBySlug(citySlug);

  // Ak mesto neexistuje, presmeruj na 404
  if (!city) {
    return <Navigate to="/404" replace />;
  }

  // Transformuj features na formát pre CityHeroSection
  const heroFeatures = city.features.map((feature: CityFeature) => {
    const IconComponent = iconMap[feature.icon];
    return {
      icon: <IconComponent className="h-8 w-8" />,
      title: feature.title,
      description: feature.description,
      gradient: feature.gradient
    };
  });

  // Generuj LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PODA Internet ${city.name}`,
    "description": `Poskytovatel gigabitového optického internetu ${city.nameLocative}`,
    "url": `https://www.popri.cz/internet-${city.slug}`,
    "telephone": "+420730431313",
    "email": "terc@obchod.poda.cz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressCountry": "CZ",
      "addressRegion": city.region
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.coordinates.lat.toString(),
      "longitude": city.coordinates.lng.toString()
    },
    "areaServed": city.districts.map(d => d.name),
    "serviceType": ["Gigabitový internet", "Optické připojení", "GPON", "TV služby"],
    "priceRange": city.priceRange
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMetadata 
        title={city.seo.title}
        description={city.seo.description}
        keywords={city.seo.keywords}
        currentDate="2025-12-10"
        faviconVersion="3.2"
        location={`${city.name}, ${city.region}`}
      />
      
      <Helmet>
        <link rel="canonical" href={`https://www.popri.cz/internet-${city.slug}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <CityHeroSection
        cityName={city.name}
        title={`Gigabitový Internet PODA ${city.nameLocative}`}
        subtitle={`${city.highlight || 'Moderní optické připojení'} s rychlostí až 1000 Mbps`}
        stats={city.stats}
        features={heroFeatures}
      />

      <CitySpecificSection
        cityName={city.name}
        title={`Kompletní pokrytí ${city.nameLocative}`}
        districts={city.districts}
      />

      <TariffSection />
      <FeatureShowcase />
      <ContactCTA />
      <PromotionPopup />
      <Toaster />
    </div>
  );
};

export default CityTemplate;

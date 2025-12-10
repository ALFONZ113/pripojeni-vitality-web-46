import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCityBySlug } from '@/data/cities/citiesData';
import PageMetadata from '@/components/page/PageMetadata';
import CityHeroSection from '@/components/hero/CityHeroSection';
import ContactCTA from '@/components/sections/ContactCTA';
import PromotionPopup from '@/components/PromotionPopup';
import { Toaster } from '@/components/ui/toaster';

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
        highlight={city.highlight}
        coverage={city.coverage}
        districts={city.districts}
      />

      <ContactCTA />
      <PromotionPopup />
      <Toaster />
    </div>
  );
};

export default CityTemplate;

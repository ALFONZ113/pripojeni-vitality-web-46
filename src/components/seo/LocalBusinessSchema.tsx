import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  city: string;
  lat: string;
  lng: string;
}

const LocalBusinessSchema = ({ city, lat, lng }: LocalBusinessSchemaProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PODA ${city}`,
    "description": `Poskytovatel gigabitového optického internetu v ${city}`,
    "url": `https://www.popri.cz/internet-${city.toLowerCase()}`,
    "telephone": "+420730431313",
    "email": "terc@obchod.poda.cz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressCountry": "CZ",
      "addressRegion": "Moravskoslezský kraj"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": lat,
      "longitude": lng
    },
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "serviceType": [
      "Internet",
      "Optické pripojenie", 
      "TV služby",
      "IPTV",
      "Telekomunikácie"
    ],
    "priceRange": "250-520 CZK",
    "currenciesAccepted": "CZK",
    "paymentAccepted": "Cash, Card, Bank Transfer",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
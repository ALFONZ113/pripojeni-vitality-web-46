
/**
 * Structured data generation utilities
 */

/**
 * Generate structured data for local business
 */
export const generateLocalBusinessStructuredData = (location: string, baseUrl: string) => {
  const cityCoordinates = {
    'Ostrava': { lat: '49.8175', lng: '18.2624' },
    'Karviná': { lat: '49.8557', lng: '18.5370' },
    'Bohumín': { lat: '49.9043', lng: '18.3570' },
    'Havířov': { lat: '49.7794', lng: '18.4437' },
    'Poruba': { lat: '49.8297', lng: '18.1667' }
  };

  const coords = cityCoordinates[location as keyof typeof cityCoordinates] || cityCoordinates['Ostrava'];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PODA ${location}`,
    "description": `Poskytovateľ internetových a TV služieb v ${location}`,
    "url": `${baseUrl}/internet-${location.toLowerCase()}`,
    "telephone": "+420730431313",
    "email": "terc@obchod.poda.cz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressCountry": "CZ",
      "addressRegion": "Moravskoslezský kraj"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.lng
    },
    "areaServed": {
      "@type": "City",
      "name": location
    },
    "serviceType": [
      "Internet",
      "Optické pripojenie", 
      "TV služby",
      "IPTV",
      "Telekomunikácie"
    ],
    "priceRange": "250-899 CZK",
    "currenciesAccepted": "CZK",
    "paymentAccepted": "Cash, Card, Bank Transfer"
  };
};

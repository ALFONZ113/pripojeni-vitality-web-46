
import { Helmet } from 'react-helmet-async';

interface EnhancedStructuredDataProps {
  pageType?: 'website' | 'article' | 'service' | 'organization';
  title?: string;
  description?: string;
  url?: string;
}

/**
 * Enhanced structured data for better AI and search engine understanding
 */
const EnhancedStructuredData = ({ 
  pageType = 'website',
  title = 'PODA Internet Ostrava 2025 ✅ Recenze + Ceny | Popri.cz',
  description = 'Nejlepší PODA internet v Ostravě 2025. Porovnání cen, recenze zákazníků a pokrytí Poruba, Vítkovice. Ušetřete až 600 Kč měsíčně!',
  url = 'https://www.popri.cz'
}: EnhancedStructuredDataProps) => {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TelecommunicationsOrganization",
    "name": "Popri.cz - PODA Internet",
    "alternateName": "PODA Internet od Popri.cz",
    "url": "https://www.popri.cz",
    "logo": "https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png",
    "description": "Poskytovatel rychlého optického internetu PODA s garantovanou rychlostí až 1000 Mbps a TV zdarma v Ostravském regionu.",
    "foundingDate": "2020",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 49.8175,
        "longitude": 18.2624
      },
      "geoRadius": "50000"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Ostrava",
        "addressCountry": "CZ"
      },
      {
        "@type": "City", 
        "name": "Karviná",
        "addressCountry": "CZ"
      },
      {
        "@type": "City",
        "name": "Bohumín", 
        "addressCountry": "CZ"
      },
      {
        "@type": "City",
        "name": "Havířov",
        "addressCountry": "CZ"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+420730431313",
      "email": "terc@obchod.poda.cz",
      "contactType": "customer service",
      "availableLanguage": ["Czech"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Porubská 944/5",
      "addressLocality": "Ostrava - Poruba",
      "postalCode": "708 00",
      "addressCountry": "CZ",
      "addressRegion": "Moravskoslezský kraj"
    },
    "sameAs": [
      "https://www.facebook.com/podacz/",
      "https://www.instagram.com/poda.cz/"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "PODA Internet + TV",
    "provider": {
      "@type": "Organization",
      "name": "Popri.cz"
    },
    "description": "Gigabitový optický internet s rychlostí až 1000/1000 Mbps a chytrou TV zdarma",
    "serviceType": "Internet Service Provider",
    "category": "Telecommunication Services",
    "offers": [
      {
        "@type": "Offer",
        "name": "Internet + TV Basic",
        "description": "Optický internet 1000/1000 Mbps + 85 TV programů",
        "price": "250",
        "priceCurrency": "CZK",
        "billingIncrement": "P1M",
        "eligibleRegion": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 49.8175,
            "longitude": 18.2624
          },
          "geoRadius": "50000"
        }
      },
      {
        "@type": "Offer", 
        "name": "Internet + TV Mých 10",
        "description": "Optický internet 1000/1000 Mbps + 100+ TV programů",
        "price": "390",
        "priceCurrency": "CZK",
        "billingIncrement": "P1M"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "PODA Internet Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fiber Optic Internet",
            "description": "High-speed fiber optic internet using GPON technology"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "IPTV Service",
            "description": "Digital TV service with 85+ channels included"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jaká je rychlost PODA internetu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PODA internet nabízí rychlost až 1000/1000 Mbps (symetrická) pro byty pomocí GPON optické technologie a 1000/200 Mbps pro domy pomocí bezdrátového připojení."
        }
      },
      {
        "@type": "Question",
        "name": "Kolik stojí PODA internet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Základní tarif Internet + TV Basic stojí 250 Kč měsíčně plus 50 Kč za zařízení. Rozšířený tarif Internet + TV Mých 10 stojí 390 Kč měsíčně plus 50 Kč za zařízení."
        }
      },
      {
        "@type": "Question",
        "name": "Je TV služba zdarma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ano, TV služba je automaticky zahrnuta v ceně internetového tarifu. Základní balíček obsahuje více než 85 programů, rozšířený více než 100 programů."
        }
      },
      {
        "@type": "Question",
        "name": "Kde je PODA internet dostupný?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PODA internet je dostupný v Ostravě, Karviné, Bohumíně, Havířově, Porubě a dalších lokalitách Moravskoslezského kraje."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Enhanced meta tags for AI understanding */}
      <meta name="ai-content-type" content={pageType} />
      <meta name="content-language" content="cs-CZ" />
      <meta name="geo.region" content="CZ-80" />
      <meta name="geo.placename" content="Ostrava" />
      <meta name="geo.position" content="49.8175;18.2624" />
      <meta name="ICBM" content="49.8175, 18.2624" />
      
      {/* Business information for AI */}
      <meta name="business-type" content="Internet Service Provider" />
      <meta name="service-area" content="Ostrava, Karviná, Bohumín, Havířov" />
      <meta name="primary-service" content="Fiber Optic Internet" />
      <meta name="secondary-service" content="IPTV Television" />
      <meta name="technology" content="GPON, Fiber Optic, Wireless" />
      <meta name="price-range" content="250-390 CZK" />
      <meta name="contact-phone" content="+420730431313" />
      
      {/* Structured Data Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      {/* AI-specific content markers */}
      <meta name="ai-summary" content="PODA is a Czech internet service provider offering fiber optic internet up to 1000 Mbps with free IPTV service starting from 250 CZK monthly in Ostrava region." />
      <meta name="primary-keywords" content="PODA internet, optický internet Ostrava, gigabitové připojení, GPON technologie, TV zdarma" />
      <meta name="target-audience" content="Residential customers in Ostrava region seeking high-speed internet" />
    </Helmet>
  );
};

export default EnhancedStructuredData;

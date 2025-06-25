
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateCanonicalUrl, generateHreflangTags } from '../../utils/domainMigration';

interface PageMetadataProps {
  title: string;
  description: string;
  currentDate?: string;
  faviconVersion?: string;
  cacheBuster?: string;
  domain?: string;
  seznamVerification?: string;
  canonicalUrl?: string;
  currentPath?: string;
  keywords?: string;
  ogImage?: string;
}

const PageMetadata = ({ 
  title, 
  description, 
  currentDate = new Date().toISOString().split('T')[0],
  faviconVersion = "3.1",
  cacheBuster = Date.now().toString(),
  domain = "www.popri.cz",
  seznamVerification,
  canonicalUrl,
  currentPath = "",
  keywords,
  ogImage = "https://www.popri.cz/og-image.png"
}: PageMetadataProps) => {
  // FIXED: Always use www.popri.cz as canonical domain
  const migrationSafeCanonicalUrl = canonicalUrl || generateCanonicalUrl(currentPath);
  const hreflangTags = generateHreflangTags(currentPath);
  
  // Enhanced keywords based on current path
  const getEnhancedKeywords = () => {
    const baseKeywords = "popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava, rychlý internet PODA";
    
    if (keywords) return `${keywords}, ${baseKeywords}`;
    
    // Add path-specific keywords
    if (currentPath.includes('/tarify')) {
      return `${baseKeywords}, PODA tarify, ceny internetu, internet balíčky Ostrava, PODA cenik`;
    }
    if (currentPath.includes('/internet-ostrava')) {
      return `${baseKeywords}, internet Ostrava, PODA Ostrava, optický internet Ostrava, gigabit Ostrava`;
    }
    if (currentPath.includes('/iptv')) {
      return `${baseKeywords}, IPTV PODA, televizia online, PODA net.TV, streaming TV Česko`;
    }
    if (currentPath.includes('/blog')) {
      return `${baseKeywords}, internet tipy, PODA novinky, internetové technológie, telekomunikácie blog`;
    }
    
    return baseKeywords;
  };
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={migrationSafeCanonicalUrl} />
      
      {/* Enhanced SEO meta tags */}
      <meta name="keywords" content={getEnhancedKeywords()} />
      <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Force preferred domain for all pages */}
      <meta name="preferred-domain" content="www.popri.cz" />
      <meta name="canonical-domain" content="www.popri.cz" />
      
      <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="google" content="notranslate"/>
      <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
      {seznamVerification && <meta name="seznam-wmt" content={seznamVerification} />}
      
      {/* Enhanced domain migration signals */}
      <meta name="migration-date" content="2025-06-23" />
      <meta name="original-domain" content="pripojeni-poda.cz" />
      <meta name="preferred-domain" content="www.popri.cz" />
      <meta name="migration-status" content="completed" />
      
      {/* Enhanced Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={migrationSafeCanonicalUrl} />
      <meta property="og:site_name" content="Popri.cz - PODA Internet" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Popri.cz - Najrýchlejší PODA internet v Ostrave" />
      <meta property="og:locale" content="cs_CZ" />
      
      {/* Enhanced Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Popri.cz - PODA Internet Ostrava" />
      
      <meta name="last-updated" content={currentDate} />
      
      {/* Hreflang tags for domain migration */}
      {hreflangTags.map((tag, index) => (
        <link key={index} rel="alternate" href={tag.href} hrefLang={tag.hreflang} />
      ))}
      
      {/* Remove cache control to prevent caching issues */}
      <meta name="version" content={faviconVersion} />
      
      {/* Favicon links */}
      <link rel="icon" href={`/poda-favicon.ico?v=${faviconVersion}`} type="image/x-icon" />
      <link rel="icon" href={`/poda-favicon-16x16.png?v=${faviconVersion}`} sizes="16x16" type="image/png" />
      <link rel="icon" href={`/poda-favicon-32x32.png?v=${faviconVersion}`} sizes="32x32" type="image/png" />
      <link rel="apple-touch-icon" href={`/poda-apple-touch-icon.png?v=${faviconVersion}`} />
      <link rel="manifest" href={`/site.webmanifest?v=${faviconVersion}`} />

      {/* Font preloading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Enhanced structured data with local business markup */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Popri.cz – PODA Internet",
            "url": "${migrationSafeCanonicalUrl}",
            "description": "${description}",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.popri.cz/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </script>
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Popri.cz - PODA Internet",
            "url": "https://www.popri.cz",
            "logo": "https://www.popri.cz/poda-logo.svg",
            "description": "Najrýchlejší PODA internet v Ostrave a okolí. Gigabitové pripojenie s TV zdarma.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ostrava",
              "@country": "CZ"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+420-730-431-313",
              "email": "terc@obchod.poda.cz",
              "contactType": "customer service",
              "areaServed": ["Ostrava", "Karviná", "Havířov", "Bohumín", "Poruba"],
              "availableLanguage": ["Czech", "Slovak"],
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "49.8346",
                "longitude": "18.2820"
              },
              "geoRadius": "50000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "PODA Internet Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "PODA Internet 1000/1000 Mbps",
                    "description": "Gigabitové optické pripojenie s TV zdarma"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            },
            "sameAs": []
          }
        `}
      </script>
    </Helmet>
  );
};

export default PageMetadata;

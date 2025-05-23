
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageMetadataProps {
  title: string;
  description: string;
  currentDate?: string;
  faviconVersion?: string;
  cacheBuster?: string;
  domain?: string;
  seznamVerification?: string;
}

const PageMetadata = ({ 
  title, 
  description, 
  currentDate = new Date().toISOString().split('T')[0],
  faviconVersion = "3.0",
  cacheBuster = Date.now().toString(),
  domain = typeof window !== "undefined" ? window.location.hostname : "www.popri.cz",
  seznamVerification
}: PageMetadataProps) => {
  // Generate domain-specific cache busting parameter
  const domainSpecificHash = domain.includes('poda') ? 'poda-' + cacheBuster : 'popri-' + cacheBuster;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://www.popri.cz/" />
      <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="google" content="notranslate"/>
      <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
      {seznamVerification && <meta name="seznam-wmt" content={seznamVerification} />}
      <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="keywords" content="popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava, rychlý internet PODA" />
      <meta name="revisit-after" content="7 days" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://www.popri.cz/" />
      <meta property="og:site_name" content="Popri.cz" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.popri.cz/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.popri.cz/og-image.png" />
      <meta name="last-updated" content={currentDate} />
      
      {/* Enhanced cache control to force refreshing on both domains */}
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
      <meta name="version" content={faviconVersion} />
      <meta name="cache-version" content={cacheBuster} />
      <meta name="domain-cache" content={domainSpecificHash} />
      
      {/* Favicon links updated with domain-specific cache-busting parameters */}
      <link rel="icon" href={`/poda-favicon.ico?v=${faviconVersion}&t=${domainSpecificHash}`} type="image/x-icon" />
      <link rel="icon" href={`/poda-favicon-16x16.png?v=${faviconVersion}&t=${domainSpecificHash}`} sizes="16x16" type="image/png" />
      <link rel="icon" href={`/poda-favicon-32x32.png?v=${faviconVersion}&t=${domainSpecificHash}`} sizes="32x32" type="image/png" />
      <link rel="icon" href={`/poda-favicon-48x48.png?v=${faviconVersion}&t=${domainSpecificHash}`} sizes="48x48" type="image/png" />
      <link rel="apple-touch-icon" href={`/poda-apple-touch-icon.png?v=${faviconVersion}&t=${domainSpecificHash}`} />
      <link rel="manifest" href={`/site.webmanifest?v=${faviconVersion}&t=${domainSpecificHash}`} />

      {/* Font preloading pro lepší výkon */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Structured data optimization */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Popri.cz – PODA Internet",
            "url": "https://www.popri.cz",
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
            "@type": "Organization",
            "name": "Popri.cz - PODA Internet",
            "url": "https://www.popri.cz",
            "logo": "https://www.popri.cz/poda-logo.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+420-739-065-142",
              "contactType": "customer service",
              "areaServed": "CZ",
              "availableLanguage": "Czech"
            },
            "sameAs": []
          }
        `}
      </script>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Úvod",
                "item": "https://www.popri.cz"
              }
            ]
          }
        `}
      </script>
      <script type="application/ld+json" src="/json/schema-service.json"></script>
    </Helmet>
  );
};

export default PageMetadata;

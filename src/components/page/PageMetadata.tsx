
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
  currentPath = ""
}: PageMetadataProps) => {
  // FIXED: Always use www.popri.cz as canonical domain
  const migrationSafeCanonicalUrl = canonicalUrl || generateCanonicalUrl(currentPath);
  const hreflangTags = generateHreflangTags(currentPath);
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={migrationSafeCanonicalUrl} />
      
      {/* Force preferred domain for all pages */}
      <meta name="preferred-domain" content="www.popri.cz" />
      <meta name="canonical-domain" content="www.popri.cz" />
      
      <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="google" content="notranslate"/>
      <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
      {seznamVerification && <meta name="seznam-wmt" content={seznamVerification} />}
      <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="keywords" content="PODA internet, PODA pripojení, PODA pripojenie, popri, popri.cz, PODA připojení, gigabitový internet, internetové připojení Ostrava, rychlý internet, telefon, kontakt" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Enhanced domain migration signals */}
      <meta name="migration-date" content="2025-06-23" />
      <meta name="original-domain" content="pripojeni-poda.cz" />
      <meta name="preferred-domain" content="www.popri.cz" />
      <meta name="migration-status" content="completed" />
      
      {/* Open Graph tags with canonical URLs */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={migrationSafeCanonicalUrl} />
      <meta property="og:site_name" content="Popri.cz" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.popri.cz/og-image.png" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.popri.cz/og-image.png" />
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

      {/* Enhanced structured data with migration signals */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Popri.cz – PODA Internet",
            "url": "${migrationSafeCanonicalUrl}",
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
    </Helmet>
  );
};

export default PageMetadata;

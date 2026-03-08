
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
  aiOptimized?: boolean;
  pageType?: 'website' | 'article' | 'product' | 'service';
  keywords?: string[];
  location?: string;
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
  aiOptimized = true,
  pageType = 'website',
  keywords = [],
  location
}: PageMetadataProps) => {
  // FIXED: Always use www.popri.cz as canonical domain
  const migrationSafeCanonicalUrl = canonicalUrl || generateCanonicalUrl(currentPath);
  const hreflangTags = generateHreflangTags(currentPath);
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={migrationSafeCanonicalUrl} />
      
      {/* Enhanced Google re-indexing signals */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="last-modified" content={currentDate} />
      <meta name="content-updated" content={`${currentDate}T12:00:00Z`} />
      
      {/* Force preferred domain for all pages */}
      <meta name="preferred-domain" content="www.popri.cz" />
      <meta name="canonical-domain" content="www.popri.cz" />
      
      <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="google" content="notranslate"/>
      <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
      {seznamVerification && <meta name="seznam-wmt" content={seznamVerification} />}
      <meta name="author" content="Obchodní zástupce PODA" />
      <meta name="keywords" content="popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava, rychlý internet PODA" />
      <meta name="revisit-after" content="7 days" />
      
      <meta name="meta-update" content={currentDate} />
      
      {/* Open Graph tags with canonical URLs and updated timestamp */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={migrationSafeCanonicalUrl} />
      <meta property="og:site_name" content="Popri.cz" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/LUwkMqUk05VjvdJHgCrEMWrAPsQ2/social-images/social-1771921151754-Generated_Image_February_24,_2026_-_9_18AM.jpg.webp" />
      <meta property="og:updated_time" content={`${currentDate}T12:00:00Z`} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/LUwkMqUk05VjvdJHgCrEMWrAPsQ2/social-images/social-1771921151754-Generated_Image_February_24,_2026_-_9_18AM.jpg.webp" />
      <meta name="last-updated" content={currentDate} />
      
      {/* Hreflang tags for domain migration */}
      {hreflangTags.map((tag, index) => (
        <link key={index} rel="alternate" href={tag.href} hrefLang={tag.hreflang} />
      ))}
      
      {/* Updated cache control */}
      <meta name="version" content={faviconVersion} />
      <meta name="cache-version" content="1747302000000" />
      
      {/* Favicon - stable URL for Google Favicon crawler */}
      <link rel="icon" href="/popri-favicon.png?v=2026.03" type="image/png" sizes="48x48" />
      <link rel="apple-touch-icon" href="/popri-favicon.png?v=2026.03" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Font preloading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Enhanced structured data with migration signals and updated timestamp */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Popri.cz – PODA Internet",
            "url": "${migrationSafeCanonicalUrl}",
            "description": "${description}",
            "dateModified": "${currentDate}T12:00:00Z",
            "publisher": {
              "@type": "Organization",
              "name": "Popri.cz"
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
            "logo": "https://www.popri.cz/popri-logo.png",
            "description": "${description}",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+420-730-431-313",
              "contactType": "customer service",
              "areaServed": "CZ",
              "availableLanguage": "Czech"
            },
            "sameAs": [],
            "dateModified": "${currentDate}T12:00:00Z"
          }
        `}
      </script>

      {/* AI-optimized meta tags */}
      {aiOptimized && (
        <>
          <meta name="ai:title" content={title} />
          <meta name="ai:description" content={description} />
          <meta name="ai:content-summary" content={description} />
          <meta name="ai:page-type" content={pageType} />
          <meta name="ai:language" content="cs" />
          <meta name="ai:region" content="CZ" />
          <meta name="content-accessibility" content="public" />
          <meta name="content-format" content="text/html" />
          <meta name="reading-level" content="general" />
          <meta name="ai-crawl-priority" content="high" />
          <meta name="ai-index-content" content="full" />
          <meta name="ai-extract-entities" content="true" />
          
          {/* Design system description for AI */}
          <meta name="ai:design-theme" content="Luxury Noir + Gold" />
          <meta name="ai:design-style" content="Dark luxury, glassmorphism, golden accents, premium feel" />
          <meta name="ai:color-scheme" content="dark" />
          <meta name="ai:primary-colors" content="noir (HSL 0 0% 4%), cream (HSL 45 20% 95%), gold (HSL 38 92% 50%)" />
          <meta name="ai:typography" content="Playfair Display (headings, serif), Inter (body, sans-serif)" />
          <meta name="ai:visual-effects" content="glassmorphism, gold glow shadows, fade-up animations, gradient text" />
          <meta name="ai:brand-aesthetic" content="Premium, trustworthy, modern, elegant, professional" />
          
          {keywords.length > 0 && (
            <meta name="ai:keywords" content={keywords.join(', ')} />
          )}
          {location && (
            <>
              <meta name="ai:location" content={location} />
              <meta name="geo.placename" content={location} />
            </>
          )}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "${pageType === 'article' ? 'Article' : 'WebPage'}",
                "name": "${title}",
                "headline": "${title}",
                "description": "${description}",
                "contentSummary": "${description}",
                "keywords": "${keywords.join(', ')}",
                "inLanguage": "cs",
                "isAccessibleForFree": true,
                "audience": {
                  "@type": "Audience",
                  "audienceType": "general public"
                },
                ${location ? `"spatialCoverage": {
                  "@type": "Place",
                  "name": "${location}",
                  "address": {
                    "@type": "PostalAddress",
                    "addressRegion": "Moravskoslezský kraj",
                    "addressCountry": "CZ"
                  }
                },` : ''}
                "provider": {
                  "@type": "Organization",
                  "name": "PODA",
                  "description": "Poskytovatel internetových služeb v Ostravě a okolí"
                }
              }
            `}
          </script>
        </>
      )}
    </Helmet>
  );
};

export default PageMetadata;

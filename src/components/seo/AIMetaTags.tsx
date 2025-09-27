import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AIMetaTagsProps {
  title: string;
  description: string;
  content?: string;
  pageType?: 'website' | 'article' | 'product' | 'service';
  keywords?: string[];
  location?: string;
}

/**
 * AI-optimized meta tags and structured data for better AI visibility
 */
export const AIMetaTags: React.FC<AIMetaTagsProps> = ({
  title,
  description,
  content = '',
  pageType = 'website',
  keywords = [],
  location
}) => {
  // Generate AI-friendly content summary
  const contentSummary = content 
    ? content.substring(0, 500).replace(/<[^>]*>/g, '').trim()
    : description;

  // Generate AI-specific structured data
  const aiStructuredData = {
    "@context": "https://schema.org",
    "@type": pageType === 'article' ? 'Article' : 'WebPage',
    "name": title,
    "headline": title,
    "description": description,
    "contentSummary": contentSummary,
    "keywords": keywords.join(', '),
    "inLanguage": "cs",
    "isAccessibleForFree": true,
    "audience": {
      "@type": "Audience",
      "audienceType": "general public"
    },
    ...(location && {
      "spatialCoverage": {
        "@type": "Place",
        "name": location,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Moravskoslezský kraj",
          "addressCountry": "CZ"
        }
      }
    }),
    "provider": {
      "@type": "Organization",
      "name": "PODA",
      "description": "Poskytovatel internetových služeb v Ostravě a okolí"
    }
  };

  return (
    <Helmet>
      {/* AI-specific meta tags */}
      <meta name="ai:title" content={title} />
      <meta name="ai:description" content={description} />
      <meta name="ai:content-summary" content={contentSummary} />
      <meta name="ai:page-type" content={pageType} />
      <meta name="ai:language" content="cs" />
      <meta name="ai:region" content="CZ" />
      
      {/* Content accessibility for AI */}
      <meta name="content-accessibility" content="public" />
      <meta name="content-format" content="text/html" />
      <meta name="reading-level" content="general" />
      
      {/* AI crawling hints */}
      <meta name="ai-crawl-priority" content="high" />
      <meta name="ai-index-content" content="full" />
      <meta name="ai-extract-entities" content="true" />
      
      {keywords.length > 0 && (
        <meta name="ai:keywords" content={keywords.join(', ')} />
      )}
      
      {location && (
        <>
          <meta name="ai:location" content={location} />
          <meta name="geo.placename" content={location} />
        </>
      )}

      {/* Enhanced structured data for AI understanding */}
      <script type="application/ld+json">
        {JSON.stringify(aiStructuredData, null, 2)}
      </script>
    </Helmet>
  );
};
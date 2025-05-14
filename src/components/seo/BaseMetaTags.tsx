
import { Helmet } from 'react-helmet-async';

/**
 * BaseMetaTags component that contains common meta tags used across all pages
 * This helps reduce duplication and makes metadata more maintainable
 */
const BaseMetaTags = () => {
  // Cache version that gets updated with deployments
  const cacheVersion = "1747128009563";
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      
      {/* Google-specific verification tags */}
      <meta name="google" content="notranslate" />
      <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
      <meta name="seznam-wmt" content="TZXj7ilgwfcAOewRproL3dFn9jTDd15R" />
      
      {/* Cache control meta tags */}
      <meta httpEquiv="Cache-Control" content="public, max-age=86400" />
      <meta httpEquiv="Pragma" content="public" />
      <meta name="version" content="1.3.9" />
      <meta name="cache-version" content={cacheVersion} />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://www.popri.cz/" />
      <link rel="alternate" href="https://popri.cz/" hrefLang="cs" />
      
      {/* Favicon configuration */}
      <link rel="icon" href="/poda-favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/poda-favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/poda-favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="apple-touch-icon" href="/poda-apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/poda-safari-pinned-tab.svg" color="#ff6600" />
      <meta name="msapplication-TileImage" content="/poda-mstile-144x144.png" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Font preloading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Sitemap reference */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      
      {/* Meta tag to enable native phone call handling */}
      <meta name="format-detection" content="telephone=yes" />
    </Helmet>
  );
};

export default BaseMetaTags;

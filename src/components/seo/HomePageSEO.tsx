
import { Helmet } from 'react-helmet-async';

const HomePageSEO = () => {
  // Current date for dynamic metadata updates
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Helmet>
      <title>Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení</title>
      <meta name="description" content="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace do 24 hodin." />
      <link rel="canonical" href="https://www.popri.cz/" />
      <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="google" content="notranslate"/>
      <meta name="google-site-verification" content="VwYBXv9ggyTnTzk-QAPDh-ZaJCioeFF-RnLP6Pf0hQA" />
      <meta name="author" content="Milan Terč - obchodní zástupce PODA" />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="keywords" content="popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava, rychlý internet PODA" />
      <meta name="revisit-after" content="7 days" />
      <meta property="og:title" content="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení" />
      <meta property="og:description" content="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou." />
      <meta property="og:url" content="https://www.popri.cz/" />
      <meta property="og:site_name" content="Popri.cz" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.popri.cz/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Popri.cz – Rychlý PODA Internet s TV Zdarma" />
      <meta name="twitter:description" content="Hledáte spolehlivý PODA internet? Gigabitové připojení s TV zdarma." />
      <meta name="twitter:image" content="https://www.popri.cz/og-image.png" />
      <meta name="last-updated" content={currentDate} />
      
      {/* Favicon links updated with standard naming conventions for better Google recognition */}
      <link rel="icon" href="/poda-favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/poda-favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/poda-favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

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
    </Helmet>
  );
};

export default HomePageSEO;

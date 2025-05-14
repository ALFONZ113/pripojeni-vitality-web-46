
import { Helmet } from 'react-helmet-async';

const HomePageSEO = () => {
  // Current date for dynamic metadata updates
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Helmet>
      {/* Page-specific meta tags */}
      <title>Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení</title>
      <meta name="description" content="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace do 24 hodin." />
      <meta name="keywords" content="popri, PODA internet, popri připojení, popri.cz, PODA připojení, gigabitový internet popri, internetové připojení Ostrava, rychlý internet PODA" />
      <meta name="revisit-after" content="7 days" />
      <meta name="last-updated" content={currentDate} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení" />
      <meta property="og:description" content="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou." />
      <meta property="og:url" content="https://www.popri.cz/" />
      <meta property="og:site_name" content="Popri.cz" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.popri.cz/og-image.png" />
      <meta property="og:locale" content="cs_CZ" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Popri.cz – Rychlý PODA Internet s TV Zdarma" />
      <meta name="twitter:description" content="Hledáte spolehlivý PODA internet? Gigabitové připojení s TV zdarma." />
      <meta name="twitter:image" content="https://www.popri.cz/og-image.png" />

      {/* Structured data */}
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

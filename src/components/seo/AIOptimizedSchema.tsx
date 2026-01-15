import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * AIOptimizedSchema - Extended Schema.org structured data for AI search visibility
 * Optimized for Google AI Overviews, Gemini, and other AI agents
 */
export const AIOptimizedSchema: React.FC = () => {
  const baseUrl = 'https://www.popri.cz';

  // LocalBusiness schema for local search visibility
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Popri.cz - PODA Internet',
    alternateName: 'PODA Internet Ostrava',
    description: 'Lokální poskytovatel gigabitového optického internetu a IPTV služeb v Moravskoslezském kraji. Rychlost až 1000/1000 Mbps, TV s 85+ kanály zdarma.',
    url: baseUrl,
    logo: `${baseUrl}/poda-logo.svg`,
    image: `${baseUrl}/og-image.png`,
    telephone: '+420730431313',
    email: 'info@popri.cz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ostrava',
      addressLocality: 'Ostrava',
      addressRegion: 'Moravskoslezský kraj',
      postalCode: '70200',
      addressCountry: 'CZ'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.8209,
      longitude: 18.2625
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Ostrava',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Moravskoslezský kraj' }
      },
      {
        '@type': 'City',
        name: 'Karviná'
      },
      {
        '@type': 'City',
        name: 'Havířov'
      },
      {
        '@type': 'City',
        name: 'Bohumín'
      },
      {
        '@type': 'City',
        name: 'Frýdek-Místek'
      },
      {
        '@type': 'City',
        name: 'Orlová'
      },
      {
        '@type': 'City',
        name: 'Opava'
      }
    ],
    priceRange: '300-520 Kč/měsíc',
    currenciesAccepted: 'CZK',
    paymentAccepted: 'Bankovní převod, SIPO',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+420730431313',
      contactType: 'customer service',
      availableLanguage: ['Czech'],
      areaServed: 'CZ'
    },
    sameAs: [
      'https://www.facebook.com/podainternet'
    ]
  };

  // Service schema with detailed offer catalog
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/#service`,
    name: 'PODA Internet',
    serviceType: 'Internet Service Provider',
    description: 'Gigabitové optické připojení k internetu s rychlostí až 1000/1000 Mbps a televizním vysíláním zdarma v ceně. Bez závazků, profesionální instalace.',
    provider: {
      '@type': 'Organization',
      name: 'Popri.cz',
      url: baseUrl
    },
    areaServed: {
      '@type': 'State',
      name: 'Moravskoslezský kraj',
      containedInPlace: { '@type': 'Country', name: 'Česká republika' }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PODA Internet Tarify 2025',
      itemListElement: [
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/#offer-basic`,
          name: 'Internet + TV Basic',
          description: 'Gigabitový internet 1000/1000 Mbps s 85+ TV kanály v ceně. Ideální pro rodiny a náročné uživatele.',
          price: '300',
          priceCurrency: 'CZK',
          priceValidUntil: '2025-12-31',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Service',
            name: 'PODA Internet Basic',
            description: '1000/1000 Mbps optický internet + 85 TV kanálů'
          }
        },
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/#offer-mych10`,
          name: 'Internet + TV Mých 10',
          description: 'Gigabitový internet 1000/1000 Mbps se 100+ TV kanály a výběrem 10 prémiových stanic. Pro náročné diváky.',
          price: '440',
          priceCurrency: 'CZK',
          priceValidUntil: '2025-12-31',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Service',
            name: 'PODA Internet Mých 10',
            description: '1000/1000 Mbps optický internet + 100 TV kanálů + 10 prémiových'
          }
        },
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/#offer-max`,
          name: 'Internet + TV Max',
          description: 'Gigabitový internet 1000/1000 Mbps se 160+ TV kanály včetně všech prémiových balíčků. Kompletní zábava.',
          price: '520',
          priceCurrency: 'CZK',
          priceValidUntil: '2025-12-31',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Service',
            name: 'PODA Internet Max',
            description: '1000/1000 Mbps optický internet + 160 TV kanálů včetně prémiových'
          }
        }
      ]
    },
    termsOfService: `${baseUrl}/obchodni-podminky`,
    brand: {
      '@type': 'Brand',
      name: 'PODA'
    }
  };

  // FAQ schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${baseUrl}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kolik stojí PODA internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA internet začíná na 300 Kč/měsíc za tarif Internet + TV Basic, který zahrnuje gigabitovou rychlost 1000/1000 Mbps a 85+ TV kanálů zdarma. Tarif Mých 10 stojí 440 Kč a Max 520 Kč měsíčně s více TV kanály.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kde je PODA internet dostupný?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA internet je dostupný v Ostravě a okolí, včetně měst Karviná, Havířov, Bohumín, Frýdek-Místek, Orlová a Opava. Pokrytí zahrnuje většinu panelových domů a bytových jednotek v Moravskoslezském kraji.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaká je rychlost PODA internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA nabízí gigabitovou rychlost až 1000/1000 Mbps (symetrické připojení). To znamená stejně rychlé stahování i nahrávání dat, ideální pro streaming 4K videa, online hry, práci z domova a více zařízení současně.'
        }
      },
      {
        '@type': 'Question',
        name: 'Je TV opravdu zdarma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ano, televizní vysílání s 85+ kanály je součástí základního tarifu Internet + TV Basic za 300 Kč. Neplatíte nic navíc za TV. Vyšší tarify nabízejí více kanálů včetně prémiových jako HBO, Sport a filmové stanice.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jak dlouho trvá instalace PODA internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instalace PODA internetu je obvykle provedena do 7 pracovních dnů od objednávky. Technik provede instalaci zdarma a zajistí plnou funkčnost připojení i TV. V mnoha lokalitách je možná expresní instalace do 3 dnů.'
        }
      },
      {
        '@type': 'Question',
        name: 'Má PODA internet závazek nebo smlouvu na dobu určitou?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ne, PODA internet je bez závazků. Můžete službu kdykoli zrušit bez sankcí. Smlouva je na dobu neurčitou s měsíční výpovědní lhůtou.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaký je rozdíl mezi PODA a O2 internetem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA nabízí skutečnou optickou síť GPON s gigabitovou rychlostí 1000/1000 Mbps, zatímco O2 často využívá starší technologie. PODA má nižší ceny (od 300 Kč), TV zdarma v ceně a lokální zákaznickou podporu v Ostravě.'
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Service with OfferCatalog Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Additional AI-specific meta tags */}
      <meta name="ai:service_type" content="Internet Service Provider" />
      <meta name="ai:price_range" content="300-520 CZK/month" />
      <meta name="ai:coverage_area" content="Ostrava, Karviná, Havířov, Bohumín, Moravskoslezský kraj" />
      <meta name="ai:max_speed" content="1000/1000 Mbps" />
      <meta name="ai:includes_tv" content="true" />
      <meta name="ai:contract_type" content="no commitment" />
    </Helmet>
  );
};

export default AIOptimizedSchema;

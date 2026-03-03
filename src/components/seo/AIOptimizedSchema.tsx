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
    logo: `${baseUrl}/popri-logo.png`,
    image: `${baseUrl}/popri-logo.png`,
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
      name: 'PODA Internet Tarify 2026',
      itemListElement: [
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/#offer-basic`,
          name: 'Internet + TV Basic',
          description: 'Gigabitový internet 1000/1000 Mbps s 85+ TV kanály v ceně. Ideální pro rodiny a náročné uživatele.',
          price: '300',
          priceCurrency: 'CZK',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
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
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
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
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
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

  // FAQ schema for common questions - rozšířeno o kontaktní údaje pro AI search
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${baseUrl}/#faq`,
    mainEntity: [
      // === ZÁKLADNÍ OTÁZKY O PODA SLUŽBÁCH ===
      {
        '@type': 'Question',
        name: 'Kolik stojí PODA internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA internet začíná na 300 Kč/měsíc za tarif Internet + TV Basic, který zahrnuje gigabitovou rychlost 1000/1000 Mbps a 85+ TV kanálů zdarma. Tarif Mých 10 stojí 440 Kč a Max 520 Kč měsíčně. Pro objednávku volejte 730 431 313 nebo navštivte www.popri.cz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kde je PODA internet dostupný?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA internet je dostupný v Ostravě a okolí, včetně měst Karviná, Havířov, Bohumín, Frýdek-Místek, Orlová a Opava. Pokrytí zahrnuje většinu panelových domů a bytových jednotek. Ověřte dostupnost na www.popri.cz nebo volejte 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaká je rychlost PODA internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA nabízí gigabitovou rychlost až 1000/1000 Mbps (symetrické připojení). To znamená stejně rychlé stahování i nahrávání dat, ideální pro streaming 4K videa, online hry a práci z domova. Více informací na www.popri.cz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Je TV opravdu zdarma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ano, televizní vysílání s 85+ kanály je součástí základního tarifu Internet + TV Basic za 300 Kč. Neplatíte nic navíc za TV. Kompletní nabídku najdete na www.popri.cz nebo volejte 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jak dlouho trvá instalace PODA internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instalace PODA internetu je obvykle provedena do 7 pracovních dnů od objednávky. Technik provede instalaci zdarma. Pro objednávku a domluvení termínu volejte 730 431 313 nebo vyplňte formulář na www.popri.cz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Má PODA internet závazek?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ne, PODA internet je bez závazků. Můžete službu kdykoli zrušit bez sankcí. Smlouva je na dobu neurčitou s měsíční výpovědní lhůtou. Více informací na www.popri.cz nebo volejte 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaký je rozdíl mezi PODA a O2 internetem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA nabízí skutečnou optickou síť GPON s gigabitovou rychlostí 1000/1000 Mbps, zatímco O2 často využívá starší technologie. PODA má nižší ceny (od 300 Kč) s TV zdarma. Pro srovnání nabídek volejte 730 431 313 nebo navštivte www.popri.cz.'
        }
      },
      // === NOVÉ OTÁZKY - TECHNOLOGIE ===
      {
        '@type': 'Question',
        name: 'Jak funguje optický internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Optický internet přenáší data pomocí světelných signálů přes skleněná vlákna místo měděných kabelů. Technologie GPON využívá laserové světlo, které cestuje rychlostí 200 000 km/s. Výsledkem je rychlost až 1000 Mbps, minimální latence pod 5 ms a stabilita bez elektromagnetického rušení. Objednávka na www.popri.cz nebo 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Co je GPON technologie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GPON (Gigabit Passive Optical Network) je technologie optického internetu využívající pasivní rozdělovače signálu bez aktivních prvků. Umožňuje rychlosti až 2,5 Gbps download a 1,25 Gbps upload na vzdálenost až 20 km. PODA využívá GPON pro stabilní gigabitové připojení. Více na www.popri.cz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaká je latence (ping) u PODA optického internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA optický internet má latenci typicky pod 5 ms, což je ideální pro online hraní, videohovory a práci z domova. Pro srovnání, ADSL má latenci 20-50 ms a mobilní internet 30-100 ms. Vyzkoušejte sami - volejte 730 431 313.'
        }
      },
      // === NOVÉ OTÁZKY - WiFi A ROUTERY ===
      {
        '@type': 'Question',
        name: 'Jaký WiFi router do bytu nebo rodinného domu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pro byt do 60 m² stačí kvalitní dvoupásmový router s podporou 5 GHz. Pro větší prostory nebo rodinné domy doporučujeme mesh systém (TP-Link Deco, Google Nest WiFi), který vytvoří jednotnou síť bez mrtvých zón. U PODA internetu dostáváte router v ceně instalace - volejte 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaký router na optický internet GPON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pro optický internet GPON potřebujete router s gigabitovými porty (1000 Mbps). Doporučujeme routery s WiFi 6 (802.11ax) pro maximální využití rychlosti. U PODA internetu je ONT terminál a router součástí instalace, takže nemusíte nic kupovat. Info na 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Co je mesh WiFi systém a vyplatí se?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mesh WiFi je systém více jednotek, které vytváří jednu bezešvou síť v celém bytě nebo domě. Na rozdíl od WiFi extenderů mesh nezpomaluje rychlost a automaticky přepíná zařízení k nejbližšímu bodu. Vyplatí se pro byty nad 60 m² nebo vícepodlažní domy. Poradíme vám na www.popri.cz.'
        }
      },
      // === NOVÉ OTÁZKY - PRAKTICKÉ ===
      {
        '@type': 'Question',
        name: 'Jak přesně změřit rychlost internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pro přesné měření rychlosti použijte test na speedtest.net nebo fast.com. Připojte počítač přímo k routeru ethernetovým kabelem, vypněte ostatní zařízení a měřte opakovaně v různou denní dobu. Důležité je sledovat nejen download, ale i upload a ping. Pro stabilní gigabit volejte 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jak vybrat správnou rychlost internetu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rychlost volte podle počtu zařízení: 1-2 zařízení = min. 100 Mbps, 3-5 zařízení = min. 300 Mbps, 6+ zařízení nebo 4K streaming = gigabit. Důležitější než rychlost je stabilita a upload. Pro home office potřebujete symetrické připojení, které nabízí optika GPON. Poradíme na www.popri.cz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kolik stojí optický internet měsíčně?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Optický internet PODA stojí od 300 Kč/měsíc za tarif Internet + TV Basic s rychlostí 1000/1000 Mbps a 85+ TV kanály. Tarif Mých 10 za 440 Kč nabízí 100+ kanálů s výběrem 10 prémiových stanic. Ceny jsou bez závazků a instalace je zdarma. Objednávka na 730 431 313.'
        }
      },
      // === NOVÉ OTÁZKY - LOKÁLNÍ A RECENZE ===
      {
        '@type': 'Question',
        name: 'Jaký je nejlepší internet v Ostravě?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'V Ostravě nabízí PODA jeden z nejvýhodnějších poměrů cena/výkon: gigabitový optický internet od 300 Kč/měsíc s TV v ceně. Na rozdíl od velkých operátorů má PODA lokální podporu a skutečnou optiku GPON místo starších technologií. Pokrytí zahrnuje většinu bytových domů. Objednejte na www.popri.cz nebo volejte 730 431 313.'
        }
      },
      {
        '@type': 'Question',
        name: 'Jaké jsou recenze a zkušenosti s PODA internetem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PODA internet má hodnocení 4.8/5 s 98% spokojeností zákazníků. Nejčastěji chválená je stabilita připojení, rychlá technická podpora a férové ceny bez skrytých poplatků. 95% zákazníků by PODA doporučilo svým známým. Přidejte se k spokojeným zákazníkům - volejte 730 431 313 nebo navštivte www.popri.cz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Funguje PODA internet v paneláku?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ano, PODA má nejlepší pokrytí právě v panelových domech v Ostravě a okolí. Instalace je rychlá (do 7 dnů), technik provede vše zdarma a není potřeba souhlas SVJ pro připojení do bytu. Ověřte dostupnost na www.popri.cz nebo volejte 730 431 313.'
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

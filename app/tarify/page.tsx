import { Metadata } from 'next';
import TarifyContent from './TarifyContent';

export const metadata: Metadata = {
  title: 'Popri.cz – Internetové a TV tarify PODA | Nejlepší ceny',
  description: 'Vyberte si z nabídky výhodných tarifů PODA internetu a televize od Popri.cz. Rychlost až 1000 Mbps, stabilní připojení bez výpadků a TV programy v ceně.',
  keywords: 'popri tarify, PODA tarify, popri.cz internet, PODA ceník, TV balíčky, optický internet cena, gigabitový internet tarif',
  openGraph: {
    title: 'Popri.cz – Internetové a TV tarify PODA | Nejlepší ceny',
    description: 'Vyberte si z nabídky výhodných tarifů PODA internetu a televize od Popri.cz.',
    url: 'https://www.popri.cz/tarify/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.popri.cz/tarify/',
  }
};

export default function TarifyPage() {
  // Generate structured data for tariffs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Popri.cz - Internetové a TV tarify PODA",
    "description": "Přehled tarifů a balíčků pro PODA internet od Popri.cz s garantovanou rychlostí až 1000 Mbps",
    "url": "https://www.popri.cz/tarify",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "Product",
          "name": "Internet PODA Basic",
          "description": "Připojení k internetu s rychlostí 100 Mbps",
          "offers": {
            "@type": "Offer",
            "price": "399",
            "priceCurrency": "CZK"
          }
        },
        {
          "@type": "Product",
          "name": "Internet PODA Standard",
          "description": "Připojení k internetu s rychlostí 500 Mbps",
          "offers": {
            "@type": "Offer",
            "price": "499",
            "priceCurrency": "CZK"
          }
        },
        {
          "@type": "Product",
          "name": "Internet PODA Premium",
          "description": "Připojení k internetu s rychlostí 1000 Mbps",
          "offers": {
            "@type": "Offer",
            "price": "599",
            "priceCurrency": "CZK"
          }
        }
      ]
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Popri.cz",
      "url": "https://www.popri.cz"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Úvod",
          "item": "https://www.popri.cz"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tarify",
          "item": "https://www.popri.cz/tarify"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TarifyContent />
    </>
  );
}
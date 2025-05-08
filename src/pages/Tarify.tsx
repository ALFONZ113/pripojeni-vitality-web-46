
import TariffSection from '../components/TariffSection';
import { Helmet } from 'react-helmet-async';

const Tarify = () => {
  // Aktuální datum pro dynamickou aktualizaci metadat
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Popri.cz – Internetové a TV tarify PODA | Nejlepší ceny</title>
        <meta name="description" content="Vyberte si z nabídky výhodných tarifů PODA internetu a televize od Popri.cz. Rychlost až 1000 Mbps, stabilní připojení bez výpadků a TV programy v ceně." />
        <link rel="canonical" href="https://www.popri.cz/tarify" />
        <meta name="keywords" content="popri tarify, PODA tarify, popri.cz internet, PODA ceník, TV balíčky, optický internet cena, gigabitový internet tarif" />
        <meta name="robots" content="index, follow" />
        <meta name="last-updated" content={currentDate} />
        <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
        
        {/* Structured data for tariffs page */}
        <script type="application/ld+json">
          {`
            {
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
              }
            }
          `}
        </script>
      </Helmet>
      <TariffSection />
    </div>
  );
};

export default Tarify;

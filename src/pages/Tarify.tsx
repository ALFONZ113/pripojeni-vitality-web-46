
import TariffSection from '../components/TariffSection';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Tarify = () => {
  // Aktuální datum pro dynamickou aktualizaci metadat
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Popri.cz – Internetové a TV tarify PODA | Nejlepší ceny</title>
        <meta name="description" content="Vyberte si z nabídky výhodných tarifů PODA internetu a televize od Popri.cz. Rychlost až 1000 Mbps, stabilní připojení bez výpadků a TV programy v ceně." />
        <link rel="canonical" href="https://www.popri.cz/tarify" />
        <meta property="og:title" content="Popri.cz – Internetové a TV tarify PODA | Nejlepší ceny" />
        <meta property="og:description" content="Vyberte si z nabídky výhodných tarifů PODA internetu a televize od Popri.cz." />
        <meta property="og:url" content="https://www.popri.cz/tarify" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.popri.cz/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Internetové a TV tarify PODA | Nejlepší ceny" />
        <meta name="twitter:description" content="Vyberte si z nabídky výhodných tarifů PODA internetu a televize." />
        <meta name="keywords" content="popri tarify, PODA tarify, popri.cz internet, PODA ceník, TV balíčky, optický internet cena, gigabitový internet tarif" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="last-updated" content={currentDate} />
        <link rel="sitemap" type="application/xml" href="https://www.popri.cz/sitemap.xml" />
        
        {/* Strukturovaná data pro stránku s tarify */}
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
            }
          `}
        </script>
      </Helmet>

      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <nav className="flex mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-poda-blue">Úvod</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <span className="text-gray-700">Tarify</span>
              </li>
            </ol>
          </nav>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-4">Internetové a TV tarify PODA</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vyberte si z naší nabídky výhodných tarifů PODA internetu s garantovanou rychlostí a stabilitou.
            </p>
          </div>
        </div>
      </div>
      
      <TariffSection />
    </div>
  );
};

export default Tarify;

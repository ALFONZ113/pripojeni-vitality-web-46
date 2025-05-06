
import TariffSection from '../components/TariffSection';
import { Helmet } from 'react-helmet-async';

const Tarify = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Popri.cz – Internetové a TV tarify PODA | Nejlepší ceny</title>
        <meta name="description" content="Vyberte si z nabídky výhodných tarifů PODA internetu a televize od Popri.cz. Rychlost až 1000 Mbps, stabilní připojení bez výpadků a TV programy v ceně." />
        <link rel="canonical" href="https://www.popri.cz/tarify" />
        <meta name="keywords" content="popri tarify, PODA tarify, popri.cz internet, PODA ceník, TV balíčky, optický internet cena, gigabitový internet tarif" />
        <meta name="robots" content="index, follow" />
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

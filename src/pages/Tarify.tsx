import TariffSection from '../components/TariffSection';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Tarify = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ceník Internet a TV | Tarify PODA od 300 Kč měsíčně</title>
        <meta name="description" content="Přehled internetových tarifů s gigabitovou rychlostí až 1000 Mbps. Ceny od 300 Kč měsíčně včetně TV zdarma, bez závazků a skrytých poplatků." />
        <link rel="canonical" href="https://www.popri.cz/tarify" />
        
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Popri.cz - Internetové a TV tarify PODA",
            "description": "Přehled tarifů PODA s garantovanou rychlostí až 1000 Mbps",
            "url": "https://www.popri.cz/tarify"
          }`}
        </script>
      </Helmet>

      <div className="py-20 bg-background">
        <div className="container-custom">
          <nav className="flex mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-primary transition-colors">Úvod</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1 text-border">/</span>
                <span className="text-foreground">Tarify</span>
              </li>
            </ol>
          </nav>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Internetové a TV <span className="text-gradient-gold">tarify</span> PODA
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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

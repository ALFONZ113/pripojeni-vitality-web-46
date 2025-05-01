
import TariffSection from '../components/TariffSection';
import { Helmet } from 'react-helmet-async';

const Tarify = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Internetové a TV tarify PODA | Nejlepší ceny | Popri.cz</title>
        <meta name="description" content="Vyberte si z nabídky výhodných tarifů PODA internetu a televize. Rychlost až 1000 Mbps, stabilní připojení bez výpadků a TV programy v ceně." />
        <link rel="canonical" href="https://www.popri.cz/tarify" />
        <meta name="keywords" content="PODA tarify, internet ceník, TV balíčky, optický internet cena, gigabitový internet tarif" />
        <link rel="alternate" href="https://popri.cz/tarify" hrefLang="cs" />
      </Helmet>
      <TariffSection />
    </div>
  );
};

export default Tarify;

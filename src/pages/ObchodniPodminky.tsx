import React from 'react';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ObchodniPodminky = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="py-24 min-h-screen bg-background">
      <Helmet>
        <title>Obchodní podmínky | PODA Internet | Popri.cz</title>
        <meta name="description" content="Obchodní podmínky pro využívání služeb PODA internetu poskytovaných platformou Popri.cz. Kompletní informace o podmínkách, právech a povinnostech." />
        <link rel="canonical" href="https://www.popri.cz/obchodni-podminky" />
        <meta property="og:title" content="Obchodní podmínky | PODA Internet | Popri.cz" />
        <meta property="og:description" content="Obchodní podmínky pro využívání služeb PODA internetu poskytovaných platformou Popri.cz." />
        <meta property="og:url" content="https://www.popri.cz/obchodni-podminky" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Obchodní podmínky | PODA Internet | Popri.cz" />
        <meta name="twitter:description" content="Obchodní podmínky pro využívání služeb PODA internetu." />
        <link rel="alternate" href="https://popri.cz/obchodni-podminky" hrefLang="cs" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="obchodní podmínky, smluvní podmínky, PODA internet, Popri.cz, tarify PODA, podmínky služeb" />
        <meta name="last-updated" content={currentDate} />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Obchodní podmínky | PODA Internet | Popri.cz",
              "description": "Obchodní podmínky pro využívání služeb PODA internetu poskytovaných platformou Popri.cz. Kompletní informace o podmínkách, právech a povinnostech.",
              "url": "https://www.popri.cz/obchodni-podminky",
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
                    "name": "Obchodní podmínky",
                    "item": "https://www.popri.cz/obchodni-podminky"
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-primary transition-colors">Úvod</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1 text-muted-foreground/50">/</span>
                <span className="text-foreground">Obchodní podmínky</span>
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-display font-bold text-gradient-gold">Obchodní podmínky</h1>
          </div>

          <div className="glass rounded-xl p-8 space-y-6 border border-border">
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">1. Úvodní ustanovení</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tyto obchodní podmínky upravují vztahy mezi poskytovatelem služeb a zákazníkem při poskytování internetových a televizních služeb.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">2. Definice pojmů</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Poskytovatel - společnost poskytující služby</li>
                <li>Zákazník - fyzická nebo právnická osoba využívající služby</li>
                <li>Služby - internetové připojení a televizní služby</li>
                <li>Smlouva - dohoda o poskytování služeb</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">3. Poskytované služby</h2>
              <p className="text-muted-foreground leading-relaxed">
                Poskytujeme následující služby:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                <li>Vysokorychlostní internetové připojení</li>
                <li>Televizní služby</li>
                <li>Kombinované balíčky služeb</li>
                <li>Doplňkové služby</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">4. Ceny a platební podmínky</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ceny služeb jsou stanoveny dle aktuálního ceníku. Fakturace probíhá měsíčně, s možností různých způsobů platby.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">5. Doba trvání smlouvy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Smlouva může být uzavřena na dobu určitou nebo neurčitou. Výpovědní doba a podmínky ukončení jsou specifikovány ve smlouvě.
              </p>
            </section>

            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                Pro více informací o našich obchodních podmínkách
                <Link to="/kontakt" className="text-primary hover:text-primary/80 ml-1 transition-colors">
                  kontaktujte nás
                </Link>.
              </p>
              <p className="text-muted-foreground mt-2">
                Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObchodniPodminky;

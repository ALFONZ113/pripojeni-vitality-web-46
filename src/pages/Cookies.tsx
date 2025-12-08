import React from 'react';
import { Cookie } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Cookies = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="py-24 min-h-screen bg-background">
      <Helmet>
        <title>Zásady používání cookies | PODA Internet | Popri.cz</title>
        <meta name="description" content="Přečtěte si informace o tom, jak používáme cookies na našem webu. Zásady ochrany soukromí a zpracování dat při využívání služeb PODA internetu." />
        <link rel="canonical" href="https://www.popri.cz/cookies" />
        <meta property="og:title" content="Zásady používání cookies | PODA Internet | Popri.cz" />
        <meta property="og:description" content="Přečtěte si informace o tom, jak používáme cookies na našem webu." />
        <meta property="og:url" content="https://www.popri.cz/cookies" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Zásady používání cookies | PODA Internet | Popri.cz" />
        <meta name="twitter:description" content="Přečtěte si informace o tom, jak používáme cookies na našem webu." />
        <link rel="alternate" href="https://popri.cz/cookies" hrefLang="cs" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="cookies, PODA cookies, ochrana dat, soukromí, GDPR, web cookies" />
        <meta name="last-updated" content={currentDate} />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Zásady používání cookies | PODA Internet | Popri.cz",
              "description": "Přečtěte si informace o tom, jak používáme cookies na našem webu. Zásady ochrany soukromí a zpracování dat při využívání služeb PODA internetu.",
              "url": "https://www.popri.cz/cookies",
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
                    "name": "Cookies",
                    "item": "https://www.popri.cz/cookies"
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
                <span className="text-foreground">Cookies</span>
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-8">
            <Cookie className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-display font-bold text-gradient-gold">Zásady používání cookies</h1>
          </div>

          <div className="glass rounded-xl p-8 space-y-6 border border-border">
            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">1. Co jsou cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče při návštěvě našich webových stránek. Pomáhají nám poskytovat lepší služby a zlepšovat váš uživatelský zážitek.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">2. Typy cookies</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Nezbytné cookies - potřebné pro základní fungování webu</li>
                <li>Analytické cookies - pro analýzu návštěvnosti</li>
                <li>Funkční cookies - pro lepší uživatelský zážitek</li>
                <li>Marketingové cookies - pro personalizovanou reklamu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">3. Jak používáme cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies používáme pro:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                <li>Zajištění správného fungování webu</li>
                <li>Analýzu návštěvnosti a chování uživatelů</li>
                <li>Zlepšování našich služeb</li>
                <li>Personalizaci obsahu a reklamy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">4. Správa cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies můžete spravovat nebo zakázat v nastavení vašeho prohlížeče. Mějte na paměti, že vypnutí některých cookies může ovlivnit funkcionalitu webu.
              </p>
            </section>
            
            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                Pro další informace o používání cookies na našich stránkách
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

export default Cookies;

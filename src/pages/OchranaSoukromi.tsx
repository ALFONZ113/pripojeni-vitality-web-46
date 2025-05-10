
import React from 'react';
import { Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const OchranaSoukromi = () => {
  // Aktuální datum pro dynamickou aktualizaci metadat
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="py-24 min-h-screen bg-gray-50">
      <Helmet>
        <title>Ochrana soukromí | PODA Internet od Popri.cz</title>
        <meta name="description" content="Zásady ochrany osobních údajů při využívání služeb PODA internetu. Informace o zpracování osobních údajů, vašich právech a způsobech jejich uplatnění." />
        <link rel="canonical" href="https://www.popri.cz/ochrana-soukromi" />
        <meta property="og:title" content="Ochrana soukromí | PODA Internet od Popri.cz" />
        <meta property="og:description" content="Zásady ochrany osobních údajů při využívání služeb PODA internetu. Informace o zpracování osobních údajů." />
        <meta property="og:url" content="https://www.popri.cz/ochrana-soukromi" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Ochrana soukromí | PODA Internet od Popri.cz" />
        <meta name="twitter:description" content="Zásady ochrany osobních údajů při využívání služeb PODA internetu." />
        <link rel="alternate" href="https://popri.cz/ochrana-soukromi" hrefLang="cs" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="ochrana soukromí, GDPR, PODA internet, osobní údaje, zpracování dat, Popri.cz" />
        <meta name="last-updated" content={currentDate} />

        {/* Strukturovaná data pro stránku s dokumentací */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Ochrana soukromí | PODA Internet od Popri.cz",
              "description": "Zásady ochrany osobních údajů při využívání služeb PODA internetu. Informace o zpracování osobních údajů, vašich právech a způsobech jejich uplatnění.",
              "url": "https://www.popri.cz/ochrana-soukromi",
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
                    "name": "Ochrana soukromí",
                    "item": "https://www.popri.cz/ochrana-soukromi"
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-poda-blue">Úvod</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <span className="text-gray-700">Ochrana soukromí</span>
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-poda-blue" />
            <h1 className="text-4xl font-bold text-poda-blue">Ochrana soukromí</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">1. Úvod</h2>
              <p className="text-gray-700 leading-relaxed">
                Ochrana vašeho soukromí je pro nás velmi důležitá. Tento dokument vysvětluje, jak zpracováváme a chráníme vaše osobní údaje při využívání našich služeb.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">2. Jaké údaje shromažďujeme</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Kontaktní údaje (jméno, email, telefon)</li>
                <li>Adresa pro instalaci služeb</li>
                <li>Technické údaje potřebné pro poskytování služeb</li>
                <li>Údaje o využívání našich služeb</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">3. Jak údaje používáme</h2>
              <p className="text-gray-700 leading-relaxed">
                Vaše údaje používáme především pro:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                <li>Poskytování našich služeb</li>
                <li>Komunikaci s vámi</li>
                <li>Zlepšování našich služeb</li>
                <li>Plnění zákonných povinností</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">4. Zabezpečení údajů</h2>
              <p className="text-gray-700 leading-relaxed">
                Implementujeme vhodná technická a organizační opatření k ochraně vašich osobních údajů. Pravidelně kontrolujeme a aktualizujeme naše bezpečnostní systémy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">5. Vaše práva</h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                Máte právo na:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Přístup k vašim údajům</li>
                <li>Opravu nepřesných údajů</li>
                <li>Výmaz údajů</li>
                <li>Omezení zpracování</li>
                <li>Přenositelnost údajů</li>
                <li>Vznesení námitky</li>
              </ul>
            </section>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Máte-li jakékoli otázky ohledně zpracování vašich osobních údajů,
                <Link to="/kontakt" className="text-poda-blue hover:text-poda-orange ml-1">
                  kontaktujte nás
                </Link>.
              </p>
              <p className="text-gray-600 mt-2">
                Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OchranaSoukromi;

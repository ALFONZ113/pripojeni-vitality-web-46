
import React from 'react';
import { Cookie } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Cookies = () => {
  return (
    <div className="py-24 min-h-screen bg-gray-50">
      <Helmet>
        <title>Zásady používání cookies | PODA Internet | Popri.cz</title>
        <meta name="description" content="Přečtěte si informace o tom, jak používáme cookies na našem webu. Zásady ochrany soukromí a zpracování dat při využívání služeb PODA internetu." />
        <link rel="canonical" href="https://www.popri.cz/cookies" />
        <meta name="keywords" content="cookies, PODA cookies, ochrana dat, soukromí, GDPR, web cookies" />
        <link rel="alternate" href="https://popri.cz/cookies" hrefLang="cs" />
      </Helmet>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Cookie className="h-8 w-8 text-poda-blue" />
            <h1 className="text-4xl font-bold text-poda-blue">Zásady používání cookies</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">1. Co jsou cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče při návštěvě našich webových stránek. Pomáhají nám poskytovat lepší služby a zlepšovat váš uživatelský zážitek.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">2. Typy cookies</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Nezbytné cookies - potřebné pro základní fungování webu</li>
                <li>Analytické cookies - pro analýzu návštěvnosti</li>
                <li>Funkční cookies - pro lepší uživatelský zážitek</li>
                <li>Marketingové cookies - pro personalizovanou reklamu</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">3. Jak používáme cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies používáme pro:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                <li>Zajištění správného fungování webu</li>
                <li>Analýzu návštěvnosti a chování uživatelů</li>
                <li>Zlepšování našich služeb</li>
                <li>Personalizaci obsahu a reklamy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">4. Správa cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies můžete spravovat nebo zakázat v nastavení vašeho prohlížeče. Mějte na paměti, že vypnutí některých cookies může ovlivnit funkcionalitu webu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;

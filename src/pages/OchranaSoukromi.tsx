
import React from 'react';
import { Shield } from 'lucide-react';

const OchranaSoukromi = () => {
  return (
    <div className="py-24 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OchranaSoukromi;

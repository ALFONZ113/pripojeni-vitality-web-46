
import React from 'react';
import { FileText } from 'lucide-react';

const ObchodniPodminky = () => {
  return (
    <div className="py-24 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-poda-blue" />
            <h1 className="text-4xl font-bold text-poda-blue">Obchodní podmínky</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">1. Úvodní ustanovení</h2>
              <p className="text-gray-700 leading-relaxed">
                Tyto obchodní podmínky upravují vztahy mezi poskytovatelem služeb a zákazníkem při poskytování internetových a televizních služeb.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">2. Definice pojmů</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Poskytovatel - společnost poskytující služby</li>
                <li>Zákazník - fyzická nebo právnická osoba využívající služby</li>
                <li>Služby - internetové připojení a televizní služby</li>
                <li>Smlouva - dohoda o poskytování služeb</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">3. Poskytované služby</h2>
              <p className="text-gray-700 leading-relaxed">
                Poskytujeme následující služby:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                <li>Vysokorychlostní internetové připojení</li>
                <li>Televizní služby</li>
                <li>Kombinované balíčky služeb</li>
                <li>Doplňkové služby</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">4. Ceny a platební podmínky</h2>
              <p className="text-gray-700 leading-relaxed">
                Ceny služeb jsou stanoveny dle aktuálního ceníku. Fakturace probíhá měsíčně, s možností různých způsobů platby.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-poda-blue mb-4">5. Doba trvání smlouvy</h2>
              <p className="text-gray-700 leading-relaxed">
                Smlouva může být uzavřena na dobu určitou nebo neurčitou. Výpovědní doba a podmínky ukončení jsou specifikovány ve smlouvě.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObchodniPodminky;

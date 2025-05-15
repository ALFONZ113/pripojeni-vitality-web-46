
import { Check } from 'lucide-react';

const FormSuccess = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-green-800 mb-2">Formulář byl úspěšně odeslán</h3>
      <p className="text-green-700">
        Děkujeme za váš zájem. Milan Terč vás bude kontaktovat co nejdříve na uvedeném telefonním čísle nebo e-mailu.
      </p>
    </div>
  );
};

export default FormSuccess;

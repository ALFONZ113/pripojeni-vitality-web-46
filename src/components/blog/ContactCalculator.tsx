
import { useState } from 'react';
import { Calculator, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactCalculator = () => {
  const [currentProvider, setCurrentProvider] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [speed, setSpeed] = useState('');
  const [showResults, setShowResults] = useState(false);

  const calculateSavings = () => {
    if (!monthlyPrice || !speed) return;
    
    const currentPrice = parseFloat(monthlyPrice);
    const currentSpeed = parseFloat(speed);
    
    // PODA's competitive pricing
    const podaPrice = currentSpeed <= 100 ? 590 : currentSpeed <= 500 ? 790 : 990;
    const monthlySaving = Math.max(0, currentPrice - podaPrice);
    const yearlySaving = monthlySaving * 12;
    
    setShowResults(true);
  };

  const handleContactClick = () => {
    // Track the interaction
    console.log('Calculator contact clicked');
    window.location.href = '/kontakt';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center mb-4">
        <Calculator className="h-5 w-5 text-poda-blue mr-2" />
        <h3 className="text-lg font-semibold text-poda-blue">Kalkulačka úspor</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Zistite, koľko môžete ušetriť s pripojením od PODA
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Súčasný poskytovateľ
          </label>
          <input
            type="text"
            value={currentProvider}
            onChange={(e) => setCurrentProvider(e.target.value)}
            placeholder="napr. O2, Orange, Telekom..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-poda-blue focus:border-poda-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mesačná cena (Kč)
          </label>
          <input
            type="number"
            value={monthlyPrice}
            onChange={(e) => setMonthlyPrice(e.target.value)}
            placeholder="napr. 1200"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-poda-blue focus:border-poda-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rýchlosť (Mb/s)
          </label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="napr. 100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-poda-blue focus:border-poda-blue"
          />
        </div>

        <Button 
          onClick={calculateSavings}
          className="w-full bg-poda-blue hover:bg-poda-blue-dark"
          disabled={!monthlyPrice || !speed}
        >
          Vypočítať úspory
        </Button>

        {showResults && monthlyPrice && speed && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-2">Vaše potenciálne úspory:</p>
              <p className="text-2xl font-bold text-green-800">
                {Math.max(0, parseFloat(monthlyPrice) - (parseFloat(speed) <= 100 ? 590 : parseFloat(speed) <= 500 ? 790 : 990))} Kč/mesiac
              </p>
              <p className="text-sm text-green-600">
                {Math.max(0, (parseFloat(monthlyPrice) - (parseFloat(speed) <= 100 ? 590 : parseFloat(speed) <= 500 ? 790 : 990)) * 12)} Kč ročne
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-green-200">
              <p className="text-sm text-gray-600 mb-3 text-center">
                Chcete sa dozvedieť viac o našej ponuke?
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={handleContactClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Nezáväzne sa informovať
                </Button>
                <a 
                  href="tel:+420774100200"
                  className="flex items-center justify-center w-full px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Zavolať: +420 774 100 200
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactCalculator;

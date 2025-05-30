
import { useState } from 'react';
import { User, CheckCircle, Phone, Mail } from 'lucide-react';

const PersonalAssistant = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    { id: 1, title: 'Zistenie dostupnosti', completed: false },
    { id: 2, title: 'Výber tarifu', completed: false },
    { id: 3, title: 'Objednanie služby', completed: false },
    { id: 4, title: 'Inštalácia', completed: false }
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Redirect to contact
      window.location.href = '/kontakt';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <User className="h-5 w-5 text-poda-blue mr-2" />
        <h3 className="text-lg font-semibold text-poda-blue">Osobný asistent pre pripojenie</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
        Milan Terč vás prevedie celým procesom krok za krokom
      </p>

      <div className="space-y-3">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`flex items-center p-3 rounded-lg border ${
              step.id <= currentStep 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              step.id < currentStep 
                ? 'bg-green-500' 
                : step.id === currentStep 
                  ? 'bg-poda-blue' 
                  : 'bg-gray-300'
            }`}>
              {step.id < currentStep ? (
                <CheckCircle className="h-4 w-4 text-white" />
              ) : (
                <span className="text-white text-xs font-bold">{step.id}</span>
              )}
            </div>
            <span className={`text-sm ${
              step.id <= currentStep ? 'text-gray-800 font-medium' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        {currentStep < 4 ? (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Aktuálny krok: {steps[currentStep - 1]?.title}
            </p>
            <button 
              onClick={handleNextStep}
              className="w-full bg-poda-blue text-white px-4 py-2 rounded-lg hover:bg-poda-blue-dark transition-colors text-sm"
            >
              Pokračovať na ďalší krok
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-green-600 mb-3 font-medium">
              ✅ Všetko pripravené na kontakt!
            </p>
            <div className="space-y-2">
              <a 
                href="/kontakt"
                className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Kontaktný formulár
              </a>
              <a 
                href="tel:+420774100200"
                className="flex items-center justify-center w-full px-4 py-2 border border-poda-blue text-poda-blue rounded-lg hover:bg-blue-50 transition-colors text-sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                Zavolať: +420 774 100 200
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalAssistant;

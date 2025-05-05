
import { useState } from 'react';
import { Check, Phone, Loader2, AlertTriangle } from 'lucide-react';
import { sendContactFormEmail } from '../utils/emailService';
import { toast } from '@/hooks/use-toast';

const CallbackForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || phoneNumber.length < 9) {
      toast({
        title: "Neplatné telefonní číslo",
        description: "Prosím zadejte platné telefonní číslo pro zpětné volání.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the existing email service to send the callback request
      const emailSent = await sendContactFormEmail({
        name: "Žádost o zpětné volání",
        email: "callback@request.com", // Dummy email as required by the function
        phone: phoneNumber,
        message: "Žádost o zpětné volání na telefonní číslo: " + phoneNumber
      });
      
      if (emailSent) {
        setIsSuccess(true);
        setPhoneNumber('');
        
        toast({
          title: "Děkujeme za Váš zájem",
          description: "Brzy Vás budeme kontaktovat na zadaném čísle.",
          variant: "default"
        });
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting callback request:", error);
      toast({
        title: "Chyba při odeslání",
        description: "Nepodařilo se odeslat žádost o zpětné volání. Zkuste to prosím později.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-100">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <Phone className="h-5 w-5 text-poda-orange mr-2" />
          <h3 className="font-semibold text-poda-blue">
            Zadejte číslo a ozveme se Vám
          </h3>
        </div>
        
        {isSuccess ? (
          <div className="flex items-center bg-green-50 p-3 rounded-lg">
            <Check className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-sm text-green-700">Děkujeme, brzy Vás budeme kontaktovat!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow">
              <input
                type="tel"
                placeholder="Vaše telefonní číslo"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors text-sm"
                aria-label="Vaše telefonní číslo pro zpětné volání"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-poda-orange hover:bg-poda-orange/90 text-white px-4 py-2 rounded-md font-medium transition-all duration-300 text-sm flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Odesílání...
                </>
              ) : (
                'Získat hovor'
              )}
            </button>
          </form>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA.
        </p>
      </div>
    </div>
  );
};

export default CallbackForm;

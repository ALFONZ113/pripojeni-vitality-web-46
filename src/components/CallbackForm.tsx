
import React, { memo, useCallback } from 'react';
import { Check, Phone, Loader2 } from 'lucide-react';
import { sendContactFormEmail } from '../utils/emailService';
import { toast } from '@/hooks/use-toast';
import { useOptimizedForm } from '../hooks/use-optimized-form';

const CallbackForm = memo(() => {
  const initialData = { phoneNumber: '' };

  const validateCallback = useCallback((data: typeof initialData) => {
    if (!data.phoneNumber || data.phoneNumber.length < 9) {
      return 'Prosím zadejte platné telefonní číslo pro zpětné volání.';
    }
    return null;
  }, []);

  const handleFormSubmit = useCallback(async (data: typeof initialData) => {
    const emailSent = await sendContactFormEmail({
      name: "Žádost o zpětné volání",
      address: "",
      city: "",
      zip: "",
      phone: data.phoneNumber,
      email: "",
      propertyType: "byty",
      currentProvider: "",
      currentPrice: "",
      message: `Zákazník požádal o zpětné volání na číslo: ${data.phoneNumber}`
    });

    if (emailSent) {
      toast({
        title: "Žádost odeslána",
        description: "Budeme vás kontaktovat co nejdříve na uvedeném čísle.",
        variant: "default"
      });
      return true;
    }
    return false;
  }, []);

  const { 
    formData, 
    formState, 
    handleChange, 
    handleSubmit 
  } = useOptimizedForm({
    initialData,
    onSubmit: handleFormSubmit,
    validate: validateCallback
  });
  
  
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-100">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <Phone className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0" />
          <h3 className="font-semibold text-poda-blue">
            Potřebujete připojit internet a TV nebo změnit stávajícího poskytovatele?
          </h3>
        </div>
        
        {formState.success ? (
          <div className="flex items-center bg-green-50 p-3 rounded-lg">
            <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-green-700">Děkujeme, brzy Vás budeme kontaktovat!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Zadejte své telefonní číslo"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={formState.loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors text-sm"
                aria-label="Vaše telefonní číslo pro zpětné volání"
              />
            </div>
            <button
              type="submit"
              disabled={formState.loading}
              className="relative bg-poda-orange text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(255,107,53,0.5),inset_0_0_15px_rgba(255,107,53,0.2)] hover:shadow-[0_0_25px_rgba(255,107,53,0.8),inset_0_0_25px_rgba(255,107,53,0.4)] before:absolute before:inset-0 before:rounded-md before:p-[2px] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:bg-[length:200%_100%] hover:before:animate-shimmer before:-z-10"
            >
              {formState.loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Odesílání...
                </>
              ) : (
                'Zavolejte mi'
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
});

CallbackForm.displayName = 'CallbackForm';

export default CallbackForm;

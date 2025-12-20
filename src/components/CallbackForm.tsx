import React, { memo, useCallback } from 'react';
import { Check, Phone, Loader2 } from 'lucide-react';
import { sendContactFormEmail } from '../utils/emailService';
import { toast } from 'sonner';
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
      toast.success('Žádost odeslána', {
        description: "Budeme vás kontaktovat co nejdříve na uvedeném čísle.",
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
    <div className="glass-card rounded-xl p-4 glow-gold-subtle">
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
          <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
          <h3 className="font-display font-semibold text-foreground text-sm">
            Potřebujete připojit internet a TV?
          </h3>
        </div>
        
        {formState.success ? (
          <div className="flex items-center bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-green-400 font-body">Děkujeme, brzy Vás budeme kontaktovat!</p>
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
                className="w-full px-4 py-3 bg-secondary/70 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-body"
                aria-label="Vaše telefonní číslo pro zpětné volání"
              />
            </div>
            <button
              type="submit"
              disabled={formState.loading}
              className="bg-primary text-primary-foreground px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed font-body"
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
        
        <p className="text-xs text-muted-foreground mt-2 font-body">
          Zadáním svého telefonního čísla souhlasíte s kontaktováním ohledně služeb PODA.
        </p>
      </div>
    </div>
  );
});

CallbackForm.displayName = 'CallbackForm';

export default CallbackForm;

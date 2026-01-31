import React, { memo, useRef, useEffect, useCallback } from 'react';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { sendContactFormEmail } from '../utils/emailService';
import { initMapySuggester, parseAddressComponents } from '../utils/mapyService';
import { trackFormSubmission } from '../utils/googleAdsTracking';
import { useOptimizedForm } from '../hooks/use-optimized-form';

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ContactForm = memo(({ onSuccess, compact = false }: ContactFormProps) => {
  const initialFormData = {
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    email: '',
    propertyType: 'byty',
    currentProvider: '',
    currentPrice: '',
    message: ''
  };

  const validateForm = useCallback((data: typeof initialFormData) => {
    if (!data.name || !data.phone || !data.email) {
      return 'Prosím vyplňte všechna povinná pole označená *';
    }
    return null;
  }, []);

  const handleFormSubmit = useCallback(async (data: typeof initialFormData) => {
    const emailSent = await sendContactFormEmail(data);
    if (emailSent) {
      trackFormSubmission('contact');
      toast.success('Formulář odeslán', {
        description: "Děkujeme za váš zájem. Budeme vás kontaktovat co nejdříve.",
      });
      return true;
    }
    return false;
  }, []);

  const { 
    formData, 
    formState, 
    handleChange, 
    updateField, 
    handleSubmit 
  } = useOptimizedForm({
    initialData: initialFormData,
    onSubmit: handleFormSubmit,
    validate: validateForm,
    onSuccess
  });

  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleAddressSuggestion = useCallback((suggestion: any) => {
    if (suggestion && suggestion.data) {
      const addressComponents = parseAddressComponents(suggestion);
      
      updateField('address', addressComponents.street || formData.address);
      updateField('city', addressComponents.city || formData.city);
      updateField('zip', addressComponents.zip || formData.zip);
      
      if (addressComponents.street && addressComponents.city) {
        toast.success('Adresa byla doplněna', {
          description: "Adresa byla úspěšně doplněna z Mapy.cz",
        });
      }
    }
  }, [updateField, formData.address, formData.city, formData.zip]);

  useEffect(() => {
    if (addressInputRef.current) {
      initMapySuggester(
        addressInputRef.current,
        handleAddressSuggestion,
        { country: "cz" }
      );
    }
  }, [handleAddressSuggestion]);

  if (formState.error) {
    toast.error('Kontrola formuláře', {
      description: formState.error,
    });
  }

  const formWrapperClass = compact 
    ? "glass rounded-xl p-4 md:p-6 border border-border"
    : "glass rounded-2xl p-5 md:p-8 border border-border";

  const inputClass = "w-full px-4 py-3.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-base";
  const labelClass = "block text-foreground font-medium mb-2 text-responsive-sm";

  return (
    <div className={formWrapperClass}>
      {formState.submitted && formState.success ? (
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center glow-gold">
              <Check className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-heading font-bold text-primary mb-2">Formulář byl úspěšně odeslán</h3>
          <p className="text-muted-foreground">
            Děkujeme za váš zájem. Náš obchodní zástupce vás bude kontaktovat co nejdříve.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {!compact && (
            <h3 className="text-2xl font-heading font-bold text-gradient-gold mb-6">Kontaktní formulář</h3>
          )}
          
          {formState.error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6 flex items-start">
              <AlertTriangle className="h-5 w-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-destructive">{formState.error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClass} htmlFor="name">
                Jméno a příjmení *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={formState.loading}
              />
            </div>
            
            <div>
              <label className={labelClass} htmlFor="phone">
                Telefonní číslo *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={formState.loading}
              />
            </div>
            
            <div>
              <label className={labelClass} htmlFor="email">
                E-mailová adresa *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={formState.loading}
              />
            </div>
            
            <div>
              <label className={labelClass} htmlFor="propertyType">
                Typ nehnuteľnosti
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={inputClass}
                disabled={formState.loading}
              >
                <option value="byty">Byt/bytovka</option>
                <option value="domy">Rodinný dom</option>
              </select>
            </div>
            
            {!compact && (
              <>
                <div>
                  <label className={labelClass} htmlFor="address">
                    Ulice a číslo popisné
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    ref={addressInputRef}
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Začněte psát pro našeptávání adresy..."
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className={labelClass} htmlFor="city">
                    Město
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClass}
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className={labelClass} htmlFor="zip">
                    PSČ
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className={inputClass}
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className={labelClass} htmlFor="currentProvider">
                    Aktuální poskytovatel internetu
                  </label>
                  <input
                    type="text"
                    id="currentProvider"
                    name="currentProvider"
                    value={formData.currentProvider}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="např. O2, T-Mobile, UPC, ..."
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className={labelClass} htmlFor="currentPrice">
                    Kolik platíte měsíčně za internet
                  </label>
                  <input
                    type="text"
                    id="currentPrice"
                    name="currentPrice"
                    value={formData.currentPrice}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="např. 500 Kč"
                    disabled={formState.loading}
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="mb-6">
            <label className={labelClass} htmlFor="message">
              Zpráva nebo poznámka
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={compact ? 3 : 4}
              className={inputClass}
              placeholder="Napište nám, pokud máte nějaké specifické požadavky nebo dotazy..."
              disabled={formState.loading}
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className={`btn-gold flex items-center justify-center min-w-[180px] ${formState.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={formState.loading}
            >
              {formState.loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Odesílání...
                </>
              ) : 'Odeslat formulář'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;

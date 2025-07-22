import React, { memo, useRef, useEffect, useCallback } from 'react';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sendContactFormEmail } from '../utils/emailService';
import { initMapySuggester, parseAddressComponents } from '../utils/mapyService';
import { trackFormSubmission } from '../utils/googleAdsTracking';
import { useOptimizedForm } from '../hooks/use-optimized-form';

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ContactForm = memo(({ onSuccess, compact = false }: ContactFormProps) => {
  // Optimalizovaný form hook
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
      toast({
        title: "Formulář odeslán",
        description: "Děkujeme za váš zájem. Budeme vás kontaktovat co nejdříve.",
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
    updateField, 
    handleSubmit 
  } = useOptimizedForm({
    initialData: initialFormData,
    onSubmit: handleFormSubmit,
    validate: validateForm,
    onSuccess
  });

  // Reference for the address input field
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Optimalizovaný Mapy.cz suggester
  const handleAddressSuggestion = useCallback((suggestion: any) => {
    if (suggestion && suggestion.data) {
      const addressComponents = parseAddressComponents(suggestion);
      
      updateField('address', addressComponents.street || formData.address);
      updateField('city', addressComponents.city || formData.city);
      updateField('zip', addressComponents.zip || formData.zip);
      
      if (addressComponents.street && addressComponents.city) {
        toast({
          title: "Adresa byla doplněna",
          description: "Adresa byla úspěšně doplněna z Mapy.cz",
          variant: "default"
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

  // Error handling s toast notification
  if (formState.error) {
    toast({
      title: "Kontrola formuláře",
      description: formState.error,
      variant: "destructive"
    });
  }

  // Compact styling for the modal version
  const formWrapperClass = compact 
    ? "bg-white rounded-lg p-4 border border-gray-100"
    : "bg-white rounded-xl shadow-lg p-8 border border-gray-100";

  return (
    <div className={formWrapperClass}>
      {formState.submitted && formState.success ? (
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
      ) : (
        <form onSubmit={handleSubmit}>
          {!compact && <h3 className="text-2xl font-bold text-poda-blue mb-6">Kontaktní formulář</h3>}
          
          {formState.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-700">{formState.error}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Jméno a příjmení *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                required
                disabled={formState.loading}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Telefonní číslo *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                required
                disabled={formState.loading}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                E-mailová adresa *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                required
                disabled={formState.loading}
              />
            </div>
            
            {/* Typ nehnuteľnosti */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="propertyType">
                Typ nehnuteľnosti
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                disabled={formState.loading}
              >
                <option value="byty">Byt/bytovka</option>
                <option value="domy">Rodinný dom</option>
              </select>
            </div>
            
            {/* Additional form fields */}
            {!compact && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                    Ulice a číslo popisné
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    ref={addressInputRef}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                    placeholder="Začněte psát pro našeptávání adresy..."
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                    Město
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="zip">
                    PSČ
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="currentProvider">
                    Aktuální poskytovatel internetu
                  </label>
                  <input
                    type="text"
                    id="currentProvider"
                    name="currentProvider"
                    value={formData.currentProvider}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                    placeholder="např. O2, T-Mobile, UPC, ..."
                    disabled={formState.loading}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="currentPrice">
                    Kolik platíte měsíčně za internet
                  </label>
                  <input
                    type="text"
                    id="currentPrice"
                    name="currentPrice"
                    value={formData.currentPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
                    placeholder="např. 500 Kč"
                    disabled={formState.loading}
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Zpráva nebo poznámka
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={compact ? 3 : 4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
              placeholder="Napište nám, pokud máte nějaké specifické požadavky nebo dotazy..."
              disabled={formState.loading}
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className={`btn-secondary flex items-center justify-center min-w-[180px] ${formState.loading ? 'opacity-70 cursor-not-allowed' : ''}`}
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

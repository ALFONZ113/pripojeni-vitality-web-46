
import { useRef, useEffect } from 'react';
import { initMapySuggester, parseAddressComponents } from '../../utils/mapyService';
import { toast } from '@/hooks/use-toast';

interface FormFieldsProps {
  formData: {
    name: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    email: string;
    currentProvider: string;
    currentPrice: string;
    message: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  isLoading: boolean;
  compact?: boolean;
  setFormData: (data: any) => void;
}

const FormFields = ({ formData, handleChange, isLoading, compact = false, setFormData }: FormFieldsProps) => {
  // Reference for the address input field
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Initialize Mapy.cz suggester when component mounts
  useEffect(() => {
    if (addressInputRef.current) {
      console.log("Setting up Mapy.cz suggester");
      
      initMapySuggester(
        addressInputRef.current,
        (suggestion) => {
          console.log("Suggestion selected:", suggestion);
          
          if (suggestion && suggestion.data) {
            // Parse address components
            const addressComponents = parseAddressComponents(suggestion);
            console.log("Parsed address components:", addressComponents);
            
            // Update form data with the parsed components
            setFormData(prev => ({
              ...prev,
              address: addressComponents.street || prev.address,
              city: addressComponents.city || prev.city,
              zip: addressComponents.zip || prev.zip
            }));
            
            // Show a success toast when address is selected
            if (addressComponents.street && addressComponents.city) {
              toast({
                title: "Adresa byla doplněna",
                description: "Adresa byla úspěšně doplněna z Mapy.cz",
                variant: "default"
              });
            }
          }
        },
        { country: "cz" } // Limit to Czech Republic
      );
    }
    
    return () => {
      // Cleanup if necessary
      console.log("Cleaning up Mapy.cz suggester");
    };
  }, [setFormData]);

  return (
    <>
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
          disabled={isLoading}
        ></textarea>
      </div>
    </>
  );
};

export default FormFields;

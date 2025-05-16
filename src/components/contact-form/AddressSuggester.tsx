
import { useRef, useEffect } from 'react';
import { initMapySuggester, parseAddressComponents } from '../../utils/mapyService';
import { toast } from '@/hooks/use-toast';

interface AddressSuggesterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  setFormData: (updater: (prev: any) => any) => void;
}

const AddressSuggester = ({ value, onChange, isDisabled, setFormData }: AddressSuggesterProps) => {
  const addressInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (!addressInputRef.current) {
      console.log("⚠️ Address input reference not available");
      return;
    }
    
    console.log("🔄 Setting up Mapy.cz suggester for address field");
    
    // Setup the address suggester with better error handling
    try {
      initMapySuggester(
        addressInputRef.current,
        (suggestion) => {
          console.log("📍 Address suggestion selected:", suggestion);
          
          if (suggestion) {
            // Extract address components with our improved parser
            const addressComponents = parseAddressComponents(suggestion);
            console.log("✅ Parsed address components:", addressComponents);
            
            // Update each form field if we have data
            if (addressComponents.street) {
              // Create a synthetic event for the address field
              const addressEvent = {
                target: {
                  name: 'address',
                  value: addressComponents.street || ''
                }
              } as React.ChangeEvent<HTMLInputElement>;
              
              // Update the address field
              onChange(addressEvent);
            }
            
            // Only update city and ZIP if we actually got values
            if (addressComponents.city || addressComponents.zip) {
              setFormData(prev => {
                const updatedData = {
                  ...prev,
                  // Only update if we have values
                  ...(addressComponents.city ? { city: addressComponents.city } : {}),
                  ...(addressComponents.zip ? { zip: addressComponents.zip } : {})
                };
                
                console.log("📋 Updated form data:", updatedData);
                return updatedData;
              });
              
              // Show a success toast only if we actually got data
              if (addressComponents.street && (addressComponents.city || addressComponents.zip)) {
                toast({
                  title: "Adresa byla doplněna",
                  description: "Adresa byla úspěšně doplněna z Mapy.cz",
                  variant: "default"
                });
              }
            } else {
              console.warn("⚠️ City and ZIP not found in suggestion data");
            }
          }
        },
        { country: "cz" } // Limit to Czech Republic
      );
    } catch (error) {
      console.error("❌ Error setting up Mapy.cz suggester:", error);
      
      // Show error toast to user
      toast({
        title: "Chyba při inicializaci našeptávače",
        description: "Našeptávač adres se nepodařilo inicializovat. Můžete adresu zadat ručně.",
        variant: "destructive"
      });
    }
    
    // Cleanup function
    return () => {
      // Cleanup code if needed
      console.log("🧹 Cleaning up Mapy.cz suggester");
    };
  }, [onChange, setFormData]);

  return (
    <div className="relative">
      <input
        type="text"
        id="address"
        name="address"
        ref={addressInputRef}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
        placeholder="Začněte psát pro našeptávání adresy..."
        disabled={isDisabled}
        autoComplete="off" // Prevent browser autocomplete from interfering
        aria-label="Ulice a číslo popisné"
      />
      <small className="text-gray-500 mt-1 block">
        Začněte psát adresu a vyberte z našeptávače
      </small>
    </div>
  );
};

export default AddressSuggester;

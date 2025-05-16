
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
            
            // Create a synthetic event for the address field
            const addressEvent = {
              target: {
                name: 'address',
                value: addressComponents.street || ''
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            // Update the address field
            onChange(addressEvent);
            
            // Update the city and zip directly
            setFormData(prev => {
              const updatedData = {
                ...prev,
                city: addressComponents.city || prev.city,
                zip: addressComponents.zip || prev.zip
              };
              
              console.log("Updated form data:", updatedData);
              return updatedData;
            });
            
            // Show a success toast when address is selected
            if (addressComponents.street && (addressComponents.city || addressComponents.zip)) {
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
      />
    </div>
  );
};

export default AddressSuggester;

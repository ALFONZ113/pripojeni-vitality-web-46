
import { useRef, useEffect, useState } from 'react';
import { initMapySuggester, parseAddressComponents, waitForMapyApi, isMapyApiAvailable } from '../../utils/mapyService';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AddressSuggesterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  setFormData: (updater: (prev: any) => any) => void;
}

const AddressSuggester = ({ value, onChange, isDisabled, setFormData }: AddressSuggesterProps) => {
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [apiStatus, setApiStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');
  
  useEffect(() => {
    if (!addressInputRef.current) {
      console.log("⚠️ Address input reference not available");
      return;
    }
    
    console.log("🔄 Setting up Mapy.cz suggester for address field");
    
    // Check if API is immediately available
    if (isMapyApiAvailable()) {
      setApiStatus('loaded');
    }
    
    // Wait for API with timeout
    waitForMapyApi(15, 300)
      .then(() => {
        setApiStatus('loaded');
        setupSuggester();
      })
      .catch(() => {
        console.warn("⚠️ Mapy.cz API failed to load, address suggestions will be unavailable");
        setApiStatus('failed');
        
        // Show warning toast - changing from "warning" to "default" to fix type error
        toast({
          title: "Omezená funkčnost",
          description: "Našeptávač adres není dostupný. Adresu můžete zadat ručně.",
          variant: "default" // Changed from "warning" to "default"
        });
      });
    
    // Setup cleanup
    return () => {
      console.log("🧹 Cleaning up Mapy.cz suggester");
    };
  }, []);
  
  // Setup suggester once API is available
  const setupSuggester = () => {
    if (!addressInputRef.current) return;
    
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
      setApiStatus('failed');
      
      // Show error toast to user - changing from "warning" to "destructive" to fix type error
      toast({
        title: "Chyba při inicializaci našeptávače",
        description: "Našeptávač adres se nepodařilo inicializovat. Můžete adresu zadat ručně.",
        variant: "destructive" // Changed from potentially "warning" to "destructive"
      });
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          id="address"
          name="address"
          ref={addressInputRef}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors"
          placeholder={apiStatus === 'failed' ? "Zadejte adresu ručně..." : "Začněte psát pro našeptávání adresy..."}
          disabled={isDisabled}
          autoComplete="off" // Prevent browser autocomplete from interfering
          aria-label="Ulice a číslo popisné"
        />
        {apiStatus === 'loading' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
        )}
      </div>
      
      <small className="text-gray-500 mt-1 block">
        {apiStatus === 'loaded' && "Začněte psát adresu a vyberte z našeptávače"}
        {apiStatus === 'loading' && "Načítání našeptávače adres..."}
        {apiStatus === 'failed' && "Našeptávač adres není dostupný. Zadejte adresu ručně."}
      </small>
    </div>
  );
};

export default AddressSuggester;

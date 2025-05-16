
import React, { useEffect, useRef } from 'react';
import { initMapySuggester, parseAddressComponents } from '../../utils/mapyService';
import { toast } from '@/hooks/use-toast';
import { debugLog, isDebugMode, mapyApi } from '../../utils/debugUtils';
import { Loader2 } from 'lucide-react';

interface AddressSuggesterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSelected: (address: { street: string; city: string; zip: string }) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const AddressSuggester: React.FC<AddressSuggesterProps> = ({
  value,
  onChange,
  onAddressSelected,
  disabled = false,
  className = '',
  placeholder = 'Začněte psát pro našeptávání adresy...',
  required = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Show API status in debug mode
  useEffect(() => {
    if (isDebugMode() && mapyApi.failed) {
      toast({
        title: "Problém s načítáním Mapy.cz API",
        description: "Našeptávání adres nemusí fungovat správně.",
        variant: "destructive"
      });
    }
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;
    
    setIsLoading(true);
    
    // Initialize Mapy.cz suggester
    initMapySuggester(
      inputRef.current,
      (suggestion) => {
        debugLog("Address suggestion selected:", suggestion);
        
        if (suggestion && suggestion.data) {
          // Parse address components
          const addressComponents = parseAddressComponents(suggestion);
          debugLog("Parsed address components:", addressComponents);
          
          // Call the callback with the parsed components
          onAddressSelected(addressComponents);
          
          // Show success toast when address is selected
          if (addressComponents.street && addressComponents.city) {
            toast({
              title: "Adresa vyplněna",
              description: "Adresa byla úspěšně doplněna z Mapy.cz",
              variant: "default"
            });
          }
        }
      },
      { country: "cz" } // Limit to Czech Republic
    );
    
    setIsLoading(false);
    
  }, [onAddressSelected]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-poda-blue focus:border-poda-blue transition-colors ${className}`}
        placeholder={placeholder}
        required={required}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        </div>
      )}
      {mapyApi.failed && isDebugMode() && (
        <div className="text-xs text-red-500 mt-1">
          API pro našeptávání není momentálně dostupné
        </div>
      )}
    </div>
  );
};

export default AddressSuggester;

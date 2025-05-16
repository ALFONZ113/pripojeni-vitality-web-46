
// Improved and optimized Mapy.cz integration with fallbacks

/**
 * Safely checks if Mapy.cz API is loaded and available
 */
export const isMapyApiAvailable = (): boolean => {
  // Check window.mapyApi status first (our custom tracker)
  if (window.mapyApi?.loaded === true) {
    return true;
  }

  // Also check if Mapy.cz related objects exist
  return !!(
    window.SMap && 
    window.SMap.Suggest && 
    typeof window.SMap.Suggest === 'function'
  );
};

/**
 * Waits for Mapy.cz API to load with timeout
 * @param maxAttempts Maximum number of attempts before giving up
 * @param interval Time in ms between attempts
 * @returns Promise that resolves when API is loaded or rejects on timeout
 */
export const waitForMapyApi = (
  maxAttempts: number = 10, 
  interval: number = 500
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (isMapyApiAvailable()) {
      console.log('✅ Mapy.cz API is already loaded');
      resolve(true);
      return;
    }
    
    console.log('🔄 Starting Mapy.cz API check');
    
    // Set up a listener for our custom API loaded event
    const apiLoadedHandler = () => {
      console.log('✅ Detected Mapy.cz API loaded event');
      document.removeEventListener('mapyApiLoaded', apiLoadedHandler);
      document.removeEventListener('mapyApiFailed', apiFailedHandler);
      resolve(true);
    };
    
    // Set up a listener for API failure event
    const apiFailedHandler = () => {
      console.log('❌ Detected Mapy.cz API failed event');
      document.removeEventListener('mapyApiLoaded', apiLoadedHandler);
      document.removeEventListener('mapyApiFailed', apiFailedHandler);
      reject(new Error('Mapy.cz API failed to load'));
    };
    
    // Listen for custom events
    document.addEventListener('mapyApiLoaded', apiLoadedHandler);
    document.addEventListener('mapyApiFailed', apiFailedHandler);
    
    // Start polling as a backup mechanism
    let attempts = 0;
    
    const check = () => {
      attempts++;
      console.log(`Checking if Mapy.cz API is loaded (attempt ${attempts}/${maxAttempts})...`);
      
      if (isMapyApiAvailable()) {
        console.log('✅ Mapy.cz API detected during polling');
        document.removeEventListener('mapyApiLoaded', apiLoadedHandler);
        document.removeEventListener('mapyApiFailed', apiFailedHandler);
        resolve(true);
        return;
      }
      
      if (attempts >= maxAttempts) {
        console.log('❌ Mapy.cz API not available after maximum attempts');
        document.removeEventListener('mapyApiLoaded', apiLoadedHandler);
        document.removeEventListener('mapyApiFailed', apiFailedHandler);
        reject(new Error('Mapy.cz API timeout'));
        return;
      }
      
      console.log('⏳ Waiting for Mapy.cz API to load...');
      setTimeout(check, interval);
    };
    
    check();
  });
};

/**
 * Type definition for address components
 */
export interface AddressComponents {
  street: string;
  houseNumber?: string;
  city?: string;
  zip?: string;
  district?: string;
}

/**
 * Parse address components from Mapy.cz suggestion
 * @param suggestion Suggestion object from Mapy.cz API
 * @returns Parsed address components
 */
export const parseAddressComponents = (suggestion: any): AddressComponents => {
  // Log the shape of what we're working with
  console.log('📍 Raw suggestion data:', suggestion);
  
  // If we have a data property with components, use it
  if (suggestion.data && typeof suggestion.data === 'object') {
    const data = suggestion.data;
    
    // Log full data to understand structure
    console.log('🏠 Structured data from suggestion:', data);
    
    // Extract city - multiple possible fields
    const city = data.municipality || data.city || data.town || 
                 data.village || data.suburb || '';
                 
    // Extract ZIP code - might be in various formats
    let zip = '';
    if (data.zip && typeof data.zip === 'string') {
      // Extract just the numbers from zip
      zip = data.zip.replace(/\D/g, '').slice(0, 5);
    }
    
    // Extract street name
    const street = data.street || data.address || '';
    
    // Extract house number
    const houseNumber = data.number || '';
    
    // Combine street and house number if both exist
    const fullStreet = street && houseNumber 
      ? `${street} ${houseNumber}`
      : street || data.label || suggestion.phrase || '';
      
    // Extract district
    const district = data.district || '';
    
    console.log('🔍 Parsed address components:', {
      street: fullStreet,
      city,
      zip,
      district
    });
    
    return {
      street: fullStreet,
      city,
      zip,
      district
    };
  } 
  
  // Fallback if data structure is not as expected
  console.log('⚠️ Using fallback parsing for suggestion');
  
  // Try to extract from the suggestion's phrase or label
  const phrase = suggestion.phrase || suggestion.label || '';
  
  // Try to extract ZIP code with regex
  const zipMatch = phrase.match(/\b\d{5}\b/);
  const zip = zipMatch ? zipMatch[0] : '';
  
  // For other components, we need to make educated guesses
  // This is imperfect but better than nothing
  let street = phrase;
  let city = '';
  
  // If we found a ZIP code, the city often precedes it
  if (zip && phrase.indexOf(zip) > 0) {
    const beforeZip = phrase.substring(0, phrase.indexOf(zip)).trim();
    const parts = beforeZip.split(',');
    
    if (parts.length > 1) {
      // Last part before ZIP is likely city
      city = parts[parts.length - 1].trim();
      // First part is likely street
      street = parts[0].trim();
    }
  }
  
  console.log('🔍 Parsed address components (fallback):', {
    street,
    city,
    zip
  });
  
  return {
    street,
    city,
    zip
  };
};

/**
 * Interface for suggester options
 */
interface SuggesterOptions {
  country?: string;
  limit?: number;
  bounds?: Array<[number, number]>;
  enableHTML?: boolean;
}

/**
 * Initialize Mapy.cz address suggester with fallbacks
 * @param inputElement Input element to attach suggester to
 * @param onSelect Callback when address is selected
 * @param options Additional suggester options
 * @returns Cleanup function
 */
export const initMapySuggester = (
  inputElement: HTMLInputElement,
  onSelect: (suggestion: any) => void,
  options: SuggesterOptions = {}
): (() => void) => {
  try {
    // Wait for API to be available
    waitForMapyApi(20, 300)
      .then(() => {
        console.log('✅ Creating suggester for', inputElement.id);
        
        if (!window.SMap || !window.SMap.Suggest) {
          throw new Error('SMap.Suggest is not available');
        }
        
        // Create suggester
        const suggester = new window.SMap.Suggest(inputElement, {
          provider: new window.SMap.SuggestProvider({
            updateParams: (params: any) => {
              // Adjust params for better search
              params.type = 'street|municipality|address';
              params.limit = options.limit || 10;
              
              if (options.country) {
                params.country = options.country;
              }
              
              if (options.bounds) {
                params.bounds = options.bounds.join(',');
              }
              
              // Prefer exact matches
              params.sort = 'relevance';
              
              return params;
            }
          }),
          // DOM container will be automatically created
          // by the Suggest class
        });
        
        // Set up the suggester events
        suggester.addListener('suggest', (suggestedData: any) => {
          console.log('🔎 Suggester provided data:', suggestedData);
          
          // Extract the full data object from the suggested item
          onSelect(suggestedData);
        });
        
        // Enable HTML formatting if requested
        if (options.enableHTML) {
          suggester.addListener('render', () => {
            suggester.getContainer().style.maxWidth = '600px';
          });
        }
        
        // Store suggester instance on the input element for cleanup
        (inputElement as any).__mapySuggester = suggester;
        
        console.log('✅ Suggester setup complete for', inputElement.id);
      })
      .catch(error => {
        console.error('❌ Failed to initialize Mapy.cz suggester:', error);
      });
    
    // Return cleanup function
    return () => {
      // Clean up suggester if it was created
      if ((inputElement as any).__mapySuggester) {
        try {
          (inputElement as any).__mapySuggester.removeAll();
          delete (inputElement as any).__mapySuggester;
        } catch (e) {
          console.error('Error cleaning up suggester:', e);
        }
      }
    };
  } catch (error) {
    console.error('❌ Error in initMapySuggester:', error);
    return () => {}; // Empty cleanup function
  }
};

// Add type definitions to global window object
declare global {
  interface Window {
    SMap: any;
    Loader: any;
    JAK: any;
    mapyApi: {
      loaded: boolean;
      loading: boolean;
      failed: boolean;
      retries: number;
      maxRetries: number;
      retryTimeout: number | null;
    };
  }
}

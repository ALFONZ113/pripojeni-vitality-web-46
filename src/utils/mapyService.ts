
import { debugLog, mapyApi } from './debugUtils';

declare global {
  interface Window {
    SMap: any;
    Loader: any;
  }
}

/**
 * Safe check for Mapy.cz API availability
 */
const isMapyAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         window.SMap !== undefined && 
         window.SMap.Suggest !== undefined;
};

/**
 * Initialize Mapy.cz API loading with error handling and timeout
 * @returns Promise that resolves when Mapy.cz is loaded or rejects on timeout
 */
export const initMapyLoader = (timeout: number = 10000): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (isMapyAvailable()) {
      debugLog('Mapy.cz API already loaded');
      mapyApi.loaded = true;
      resolve();
      return;
    }
    
    // Set loading state
    mapyApi.loading = true;
    debugLog('Starting Mapy.cz API load');
    
    // Set timeout for loading
    const timeoutId = setTimeout(() => {
      if (!isMapyAvailable()) {
        mapyApi.loading = false;
        mapyApi.failed = true;
        debugLog('Mapy.cz API load timeout');
        reject(new Error('Mapy.cz API load timeout'));
      }
    }, timeout);
    
    // Check if Loader is already available
    if (window.Loader) {
      debugLog('Mapy.cz Loader found, initializing API');
      try {
        window.Loader.load(null, { suggest: true, apiKey: '99CljcS9lbvcstE5' }, () => {
          mapyApi.loaded = true;
          mapyApi.loading = false;
          clearTimeout(timeoutId);
          debugLog('Mapy.cz API loaded successfully via existing Loader');
          resolve();
        });
      } catch (error) {
        mapyApi.loading = false;
        mapyApi.failed = true;
        clearTimeout(timeoutId);
        debugLog('Error loading Mapy.cz API via existing Loader', error);
        reject(error);
      }
      return;
    }
    
    // Create and load script
    try {
      const script = document.createElement('script');
      script.src = "https://api.mapy.cz/loader.js";
      script.async = true;
      
      script.onload = () => {
        debugLog('Mapy.cz loader script loaded');
        if (!window.Loader) {
          mapyApi.loading = false;
          mapyApi.failed = true;
          clearTimeout(timeoutId);
          debugLog('Mapy.cz Loader not found after script load');
          reject(new Error('Mapy.cz Loader not found after script load'));
          return;
        }
        
        try {
          window.Loader.load(null, { suggest: true, apiKey: '99CljcS9lbvcstE5' }, () => {
            mapyApi.loaded = true;
            mapyApi.loading = false;
            clearTimeout(timeoutId);
            debugLog('Mapy.cz API loaded successfully');
            resolve();
          });
        } catch (loaderError) {
          mapyApi.loading = false;
          mapyApi.failed = true;
          clearTimeout(timeoutId);
          debugLog('Error initializing Mapy.cz API', loaderError);
          reject(loaderError);
        }
      };
      
      script.onerror = (error) => {
        mapyApi.loading = false;
        mapyApi.failed = true;
        clearTimeout(timeoutId);
        debugLog('Error loading Mapy.cz script', error);
        reject(error);
      };
      
      document.head.appendChild(script);
    } catch (error) {
      mapyApi.loading = false;
      mapyApi.failed = true;
      clearTimeout(timeoutId);
      debugLog('Error creating Mapy.cz script', error);
      reject(error);
    }
  });
};

/**
 * Retry loading Mapy.cz API with exponential backoff
 */
export const retryMapyLoading = (): Promise<void> => {
  if (mapyApi.retries >= mapyApi.maxRetries) {
    debugLog('Maximum retries for Mapy.cz API loading reached');
    return Promise.reject(new Error('Maximum retries reached'));
  }
  
  const timeout = mapyApi.retryTimeout * Math.pow(2, mapyApi.retries);
  mapyApi.retries += 1;
  
  debugLog(`Retrying Mapy.cz API load (${mapyApi.retries}/${mapyApi.maxRetries}) after ${timeout}ms`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      initMapyLoader()
        .then(resolve)
        .catch(reject);
    }, timeout);
  });
};

/**
 * Initialize Mapy.cz address suggester
 * @param inputElement The input element to attach the suggester to
 * @param onSuggestSelect Callback function that will be called when a suggestion is selected
 * @param options Additional options for the suggester
 */
export const initMapySuggester = (
  inputElement: HTMLInputElement,
  onSuggestSelect: (suggestion: { label: string, data: any }) => void,
  options: { country?: string } = {}
): void => {
  const checkAndInit = async () => {
    try {
      // Try to initialize if not already loaded
      if (!isMapyAvailable()) {
        await initMapyLoader();
      }
      
      createSuggester();
    } catch (error) {
      debugLog('Failed to initialize Mapy suggester', error);
      
      // Try once more with retry
      try {
        await retryMapyLoading();
        createSuggester();
      } catch (retryError) {
        debugLog('Failed to initialize Mapy suggester after retry', retryError);
      }
    }
  };
  
  const createSuggester = () => {
    if (!isMapyAvailable()) {
      debugLog('Cannot create suggester, Mapy API not available');
      return;
    }
    
    try {
      debugLog("Initializing Mapy.cz suggester");
      
      // Create the suggester
      const suggester = new window.SMap.Suggest(inputElement, {
        // Limit to Czech Republic by default unless specified otherwise
        bounds: options.country === "sk" ? "sk" : "cz",
        sugggestMapView: true,
        maxItems: 5 // Maximum number of suggestions to show
      });

      // Add listener for suggestions
      suggester.addListener("suggest", (suggestData: any) => {
        debugLog("Suggestion received:", suggestData);
        if (suggestData && suggestData.data && suggestData.data.length > 0) {
          // Extract the first suggestion
          const suggestion = {
            label: suggestData.phrase,
            data: suggestData.data[0]
          };
          onSuggestSelect(suggestion);
        }
      });

      debugLog("Mapy.cz suggester initialized successfully");
    } catch (error) {
      debugLog("Error initializing Mapy.cz suggester:", error);
    }
  };
  
  // Start the initialization process
  checkAndInit();
};

/**
 * Parse address components from Mapy.cz suggestion
 * @param suggestion The suggestion data from Mapy.cz
 * @returns Object with address components
 */
export const parseAddressComponents = (suggestion: any): {
  street: string;
  city: string;
  zip: string;
} => {
  try {
    const result = {
      street: "",
      city: "",
      zip: ""
    };

    if (!suggestion || !suggestion.data) {
      return result;
    }

    const data = suggestion.data;

    // Extract street (combine street name and house number if available)
    if (data.street) {
      result.street = data.street;
      if (data.number) {
        result.street += " " + data.number;
      }
    } else if (data.address) {
      result.street = data.address;
    }

    // Extract city
    if (data.municipality) {
      result.city = data.municipality;
    } else if (data.city) {
      result.city = data.city;
    }

    // Extract ZIP code
    if (data.zip) {
      result.zip = data.zip;
    }

    return result;
  } catch (error) {
    debugLog("Error parsing address components:", error);
    return {
      street: "",
      city: "",
      zip: ""
    };
  }
};

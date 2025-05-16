
declare global {
  interface Window {
    SMap: any;
    JAK: any;
    Loader: any;
  }
}

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
  // Create a more reliable check for API loading
  const checkMapyLoaded = () => {
    if (window.SMap && window.SMap.Suggest) {
      console.log("Mapy.cz API detected, initializing suggester");
      initSuggester();
    } else {
      console.log("Waiting for Mapy.cz API to load...");
      setTimeout(checkMapyLoaded, 300);
    }
  };

  const initSuggester = () => {
    try {
      console.log("Creating Mapy.cz suggester");
      
      // Fix: Using direct Suggest creation with source options
      // The API expects options to be passed directly to Suggest constructor
      const suggest = new window.SMap.Suggest(inputElement, {
        // Limit search to Czech Republic or Slovakia based on options
        bounds: options.country === "sk" ? "sk" : "cz",
        limit: 5,
        // Enable extended address data needed for extracting city and postal code
        enableAddressParams: true,
        // Search addresses instead of general points of interest
        suggestMapCenter: false
      });
      
      // Add listener for suggestion selection
      if (window.JAK) {
        window.JAK.Events.addListener(suggest, "suggest", (event: any) => {
          console.log("Suggestion selected:", event.data);
          
          if (event.data) {
            // Process the suggestion data
            const suggestion = {
              label: event.data.phrase || event.data.text || "",
              data: event.data
            };
            onSuggestSelect(suggestion);
          }
        });
        console.log("Event listener attached successfully");
      }

      console.log("Mapy.cz suggester initialized successfully");
    } catch (error) {
      console.error("Error initializing Mapy.cz suggester:", error);
    }
  };

  // Start checking if Mapy.cz is loaded
  console.log("Starting Mapy.cz API check");
  checkMapyLoaded();
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
    console.log("Parsing address components from:", suggestion);
    
    const result = {
      street: "",
      city: "",
      zip: ""
    };

    if (!suggestion || !suggestion.data) {
      return result;
    }

    // Extract the data based on the API structure
    const data = suggestion.data;
    console.log("Raw suggestion data:", data);

    // Enhanced data extraction logic
    // Directly use the address parts from the suggestion
    if (data.mouse || data.address) {
      // Street address extraction
      const addressParts = data.address?.split(",") || [];
      if (addressParts.length > 0) {
        result.street = addressParts[0].trim();
      }
      
      // City extraction - prefer municipality field over city field
      if (data.municipality) {
        result.city = data.municipality;
      } else if (data.town) {
        result.city = data.town;
      } else if (data.city) {
        result.city = data.city;
      } else if (addressParts.length > 1) {
        // Try to get city from the second part of address
        result.city = addressParts[1].trim();
      }
      
      // ZIP code extraction
      if (data.zip) {
        // Format ZIP code as XXXXX (5 digits without space)
        result.zip = data.zip.replace(/\s+/g, '');
        
        // If ZIP code doesn't have 5 digits, normalize it
        if (result.zip.length !== 5 && result.zip.length > 0) {
          // Add leading zeros if needed
          result.zip = result.zip.padStart(5, '0');
        }
      }
    }

    // Fallback to traditional API format if needed
    if (!result.street && !result.city && !result.zip) {
      // Extract from the userData object if present (more reliable source)
      if (data.userData) {
        const userData = data.userData;
        
        if (userData.suggestFirstRow) {
          result.street = userData.suggestFirstRow;
        }
        
        if (userData.municipality) {
          result.city = userData.municipality;
        } else if (userData.town) {
          result.city = userData.town;
        } else if (userData.city) {
          result.city = userData.city;
        }
        
        if (userData.zip) {
          result.zip = userData.zip.replace(/\s+/g, '').padStart(5, '0');
        }
      }
    }

    console.log("Parsed address components:", result);
    return result;
  } catch (error) {
    console.error("Error parsing address components:", error);
    return {
      street: "",
      city: "",
      zip: ""
    };
  }
};

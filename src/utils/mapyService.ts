
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
      
      // Create the suggester with correct configuration
      // The new API uses a different initialization pattern
      const suggesterProvider = new window.SMap.SuggestProvider({
        bounds: options.country === "sk" ? "sk" : "cz",
        limit: 5
      });
      
      const suggest = new window.SMap.Suggest(inputElement);
      suggest.addProvider(suggesterProvider);
      
      // Add listener for suggestion selection
      const dataHandler = (event: any) => {
        console.log("Suggestion selected:", event.data);
        
        if (event.data) {
          // Process the suggestion data
          const suggestion = {
            label: event.data.phrase || event.data.text || "",
            data: event.data
          };
          onSuggestSelect(suggestion);
        }
      };
      
      if (window.JAK) {
        window.JAK.Events.addListener(suggest, "suggest", dataHandler);
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

    // Extract the data based on the new API structure
    const data = suggestion.data;
    console.log("Raw suggestion data:", data);

    // New API might use different structure, handle both old and new formats
    const items = data.items || [data];
    
    items.forEach((item: any) => {
      // Extract address parts
      if (item.userData) {
        // Handle new API format
        const userData = item.userData;
        
        // Street info
        if (!result.street && userData.suggestFirstRow) {
          result.street = userData.suggestFirstRow;
        }
        
        // City info
        if (!result.city) {
          result.city = userData.municipality || userData.city || userData.town || userData.village || "";
        }
        
        // Postal code
        if (!result.zip && userData.zip) {
          // Format ZIP code as XXXXX (5 digits without space)
          result.zip = userData.zip.replace(/\s+/g, '');
          
          // If ZIP code doesn't have 5 digits, try to normalize it
          if (result.zip.length !== 5 && result.zip.length > 0) {
            // Add leading zeros if needed
            result.zip = result.zip.padStart(5, '0');
          }
        }
      } else {
        // Handle legacy format
        // Extract street (combine street name and house number if available)
        if (item.street) {
          result.street = item.street;
          if (item.number) {
            result.street += " " + item.number;
          }
        } else if (item.address) {
          result.street = item.address;
        }

        // Enhanced city extraction logic
        if (item.municipality) {
          result.city = item.municipality;
        } else if (item.city) {
          result.city = item.city;
        } else if (item.town) {
          result.city = item.town;
        } else if (item.village) {
          result.city = item.village;
        }

        // Enhanced ZIP code extraction logic
        if (item.zip) {
          // Format ZIP code as XXXXX (5 digits without space)
          result.zip = item.zip.replace(/\s+/g, '');
          
          // If ZIP code doesn't have 5 digits, try to normalize it
          if (result.zip.length !== 5 && result.zip.length > 0) {
            // Add leading zeros if needed
            result.zip = result.zip.padStart(5, '0');
          }
        } else if (item.postalCode) {
          result.zip = item.postalCode.replace(/\s+/g, '').padStart(5, '0');
        }
      }
    });

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

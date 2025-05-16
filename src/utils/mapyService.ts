
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
      const suggest = new window.SMap.Suggest(inputElement, {
        // Limit search to Czech Republic or Slovakia based on options
        bounds: options.country === "sk" ? "sk" : "cz",
        limit: 5,
        // Enable extended address data needed for extracting city and postal code
        enableAddressParams: true,
        suggestMapCenter: false
      });
      
      // Log suggest object to inspect properties
      console.log("Suggest object created:", suggest);
      
      // Add listener for suggestion selection
      if (window.JAK) {
        window.JAK.Events.addListener(suggest, "suggest", (event: any) => {
          console.log("Raw suggestion event:", event);
          
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

    // Extract street address
    if (data.phrase) {
      // For typical address phrases, extract the street address
      result.street = data.phrase.split(',')[0]?.trim() || "";
    } else if (data.address) {
      result.street = data.address.split(',')[0]?.trim() || "";
    }

    // Extract city - try multiple potential sources
    // Mapy.cz API can return this in various fields
    if (data.municipality) {
      result.city = data.municipality;
    } else if (data.town) {
      result.city = data.town;
    } else if (data.city) {
      result.city = data.city;
    } else if (data.phrase && data.phrase.includes(',')) {
      const parts = data.phrase.split(',');
      if (parts.length > 1) {
        result.city = parts[1].trim();
      }
    }

    // Extract ZIP code - try multiple potential sources
    if (data.zip) {
      // Format ZIP code as XXXXX (5 digits without space)
      result.zip = data.zip.replace(/\s+/g, '');
    } else if (data.postalCode) {
      result.zip = data.postalCode.replace(/\s+/g, '');
    } else if (data.postal) {
      result.zip = data.postal.replace(/\s+/g, '');
    }

    // If we have userData, it often has more detailed info
    if (data.userData) {
      const userData = data.userData;
      
      // Extract from userData if street is still empty
      if (!result.street && userData.suggestFirstRow) {
        result.street = userData.suggestFirstRow;
      }
      
      // Extract city from userData if it's still empty
      if (!result.city) {
        if (userData.municipality) {
          result.city = userData.municipality;
        } else if (userData.town) {
          result.city = userData.town;
        } else if (userData.city) {
          result.city = userData.city;
        }
      }
      
      // Extract ZIP from userData if it's still empty
      if (!result.zip && userData.zip) {
        result.zip = userData.zip.replace(/\s+/g, '');
        
        // If ZIP code doesn't have 5 digits, normalize it
        if (result.zip.length !== 5 && result.zip.length > 0) {
          // Add leading zeros if needed
          result.zip = result.zip.padStart(5, '0');
        }
      }
    }

    // If we still don't have a ZIP code but have an id field,
    // it might contain address components including a ZIP code
    if (!result.zip && data.id && typeof data.id === 'string') {
      // Look for postal code pattern in id (5 digits or XX XXX format)
      const zipMatch = data.id.match(/\b(\d{5}|\d{2}\s\d{3})\b/);
      if (zipMatch) {
        result.zip = zipMatch[1].replace(/\s+/g, '');
      }
    }

    // Last resort: if we have coordinates, we could try to do reverse geocoding
    // But that would require additional API calls

    console.log("Final parsed address components:", result);
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

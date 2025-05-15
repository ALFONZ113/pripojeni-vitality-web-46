
declare global {
  interface Window {
    SMap: any;
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
      const suggester = new window.SMap.Suggest(inputElement);
      
      // Set bounds to Czech Republic or Slovakia based on options
      suggester.setOptions({
        bounds: options.country === "sk" ? "sk" : "cz",
        suggestions: 5,
        partial: true
      });

      // Add listener for suggestion selection with proper event name
      suggester.addListener("suggest", (suggestData: any) => {
        console.log("Suggestion selected:", suggestData);
        
        if (suggestData && suggestData.data) {
          // Create a properly formatted suggestion object
          const suggestion = {
            label: suggestData.phrase,
            data: suggestData.data[0]
          };
          onSuggestSelect(suggestion);
        }
      });

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

    const data = suggestion.data;
    console.log("Raw suggestion data:", data);

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

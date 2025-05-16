
declare global {
  interface Window {
    SMap: any;
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
  // Wait for Mapy.cz API to load
  const checkMapyLoaded = () => {
    if (window.SMap && window.SMap.Geocoder) {
      initSuggester();
    } else {
      // If not loaded yet, check again after a short delay
      setTimeout(checkMapyLoaded, 200);
    }
  };

  const initSuggester = () => {
    try {
      if (!window.SMap) {
        console.error("Mapy.cz API not loaded");
        return;
      }

      // Create the suggester
      const suggester = new window.SMap.Geocoder.Suggest(inputElement, {
        // Limit to Czech Republic by default unless specified otherwise
        bounds: options.country === "sk" ? "sk" : "cz",
        noRequest: true, // Don't send request immediately on initialization
        maxItems: 5 // Maximum number of suggestions to show
      });

      // Add listener for suggestions
      suggester.addListener("suggest", (suggestData: any) => {
        if (suggestData && suggestData.data && suggestData.data.length > 0) {
          // Extract the first suggestion
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
    console.error("Error parsing address components:", error);
    return {
      street: "",
      city: "",
      zip: ""
    };
  }
};

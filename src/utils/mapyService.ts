
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
  // Create a more reliable check for API loading with increased timeout
  let attempts = 0;
  const maxAttempts = 10;
  
  const checkMapyLoaded = () => {
    attempts++;
    console.log(`Checking if Mapy.cz API is loaded (attempt ${attempts}/${maxAttempts})...`);
    
    if (window.SMap && window.SMap.Suggest) {
      console.log("✅ Mapy.cz API detected, initializing suggester");
      initSuggester();
    } else if (attempts < maxAttempts) {
      console.log("⏳ Waiting for Mapy.cz API to load...");
      setTimeout(checkMapyLoaded, 500); // Increased wait time between attempts
    } else {
      console.error("❌ Mapy.cz API failed to load after multiple attempts");
    }
  };

  const initSuggester = () => {
    try {
      console.log("🔍 Creating Mapy.cz suggester for input:", inputElement);
      
      // Create the suggest instance with expanded options
      const suggest = new window.SMap.Suggest(inputElement, {
        bounds: options.country === "sk" ? "sk" : "cz", // Limit to Czech Republic by default
        limit: 10, // Increased limit for more suggestions
        enableAddressParams: true, // Enable detailed address info
        suggestMapCenter: false, // Don't center map on suggestion
        // Add any other options that might help
        location: true, // Include location data
        residence: true, // Include residence data
        highlight: true // Highlight matching text
      });
      
      console.log("✅ Suggest instance created:", suggest);
      
      // Use the native 'suggest' event rather than JAK event system
      if (suggest && typeof suggest.addListener === 'function') {
        suggest.addListener("suggest", (suggestData: any) => {
          console.log("📍 Suggestion selected:", suggestData);
          
          if (suggestData && suggestData.data) {
            const suggestion = {
              label: suggestData.phrase || suggestData.text || "",
              data: suggestData
            };
            onSuggestSelect(suggestion);
          }
        });
        console.log("✅ Direct event listener attached successfully");
      } else if (window.JAK && window.JAK.Events) {
        // Fallback to JAK events system if direct approach doesn't work
        try {
          window.JAK.Events.addListener(suggest, "suggest", (suggestData: any) => {
            console.log("📍 Suggestion selected (JAK events):", suggestData);
            
            if (suggestData && suggestData.data) {
              const suggestion = {
                label: suggestData.phrase || suggestData.data.text || "",
                data: suggestData.data
              };
              onSuggestSelect(suggestion);
            }
          });
          console.log("✅ JAK event listener attached successfully");
        } catch (jakError) {
          console.error("❌ Error attaching JAK event listener:", jakError);
          
          // Last resort: try to use DOM events directly
          inputElement.addEventListener("change", () => {
            console.log("Input value changed:", inputElement.value);
            // This is a fallback that at least captures the selected text
            // but won't have the rich data from the API
            if (inputElement.value) {
              onSuggestSelect({
                label: inputElement.value,
                data: { phrase: inputElement.value }
              });
            }
          });
        }
      }

      console.log("✅ Mapy.cz suggester initialized successfully");
    } catch (error) {
      console.error("❌ Error initializing Mapy.cz suggester:", error);
      
      // Add error details to help with debugging
      if (error instanceof Error) {
        console.error({
          _type: "Error",
          value: {
            name: error.name,
            message: error.message,
            stack: error.stack
          }
        });
      }
      
      // Setup a basic fallback for text input
      inputElement.addEventListener("blur", () => {
        if (inputElement.value) {
          onSuggestSelect({
            label: inputElement.value,
            data: { phrase: inputElement.value }
          });
        }
      });
    }
  };

  // Start checking if Mapy.cz is loaded
  console.log("🔄 Starting Mapy.cz API check");
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
    console.log("🔍 Parsing address components from:", suggestion);
    
    const result = {
      street: "",
      city: "",
      zip: ""
    };

    if (!suggestion || (!suggestion.data && !suggestion.userData)) {
      console.warn("⚠️ No valid suggestion data found");
      return result;
    }

    // Handle different data structures that might come from the API
    const data = suggestion.data || suggestion;
    const userData = data.userData || {};
    
    console.log("📋 Raw suggestion data:", data);
    console.log("📋 User data:", userData);

    // Extract street address - try multiple sources
    if (data.phrase) {
      const parts = data.phrase.split(',');
      result.street = parts[0]?.trim() || "";
    } else if (data.address) {
      const parts = data.address.split(',');
      result.street = parts[0]?.trim() || "";
    } else if (userData.suggestFirstRow) {
      result.street = userData.suggestFirstRow;
    } else if (data.text) {
      const parts = data.text.split(',');
      result.street = parts[0]?.trim() || "";
    }

    // Extract city - try multiple data paths
    if (data.municipality) {
      result.city = data.municipality;
    } else if (data.town) {
      result.city = data.town;
    } else if (data.city) {
      result.city = data.city;
    } else if (userData.municipality) {
      result.city = userData.municipality;
    } else if (userData.suggestSecondRow && userData.suggestSecondRow.includes(',')) {
      // Try to extract from the second line of suggestion
      const parts = userData.suggestSecondRow.split(',');
      if (parts.length > 0) {
        result.city = parts[0].trim();
      }
    } else if (data.phrase && data.phrase.includes(',')) {
      // Last resort: try to extract from the phrase
      const parts = data.phrase.split(',');
      if (parts.length > 1) {
        result.city = parts[1].trim();
        
        // Sometimes the city includes the ZIP code
        const cityParts = result.city.match(/^([A-Za-z\s\-.]+)\s+(\d{3}\s*\d{2}|\d{5})$/);
        if (cityParts) {
          result.city = cityParts[1].trim();
          if (!result.zip) {
            result.zip = cityParts[2].replace(/\s+/g, '');
          }
        }
      }
    }

    // Extract ZIP code - try multiple sources
    if (data.zip) {
      result.zip = data.zip.replace(/\s+/g, '');
    } else if (data.postalCode) {
      result.zip = data.postalCode.replace(/\s+/g, '');
    } else if (data.postal) {
      result.zip = data.postal.replace(/\s+/g, '');
    } else if (userData.zip) {
      result.zip = userData.zip.replace(/\s+/g, '');
    } else if (userData.suggestSecondRow) {
      // Try to extract ZIP from the second line if it exists
      const zipMatch = userData.suggestSecondRow.match(/\b(\d{3}\s*\d{2}|\d{5})\b/);
      if (zipMatch) {
        result.zip = zipMatch[1].replace(/\s+/g, '');
      }
    }

    // Try to parse address from label/phrase if still missing
    if ((!result.city || !result.zip) && suggestion.label) {
      console.log("🔍 Trying to parse from label:", suggestion.label);
      const labelParts = suggestion.label.split(',');
      
      if (labelParts.length > 1) {
        // If city is missing and we have a second part
        if (!result.city && labelParts[1]) {
          const cityPart = labelParts[1].trim();
          // Check if the part has both city and zip
          const cityZipMatch = cityPart.match(/^([A-Za-z\s\-.]+)\s+(\d{3}\s*\d{2}|\d{5})$/);
          if (cityZipMatch) {
            result.city = cityZipMatch[1].trim();
            if (!result.zip) {
              result.zip = cityZipMatch[2].replace(/\s+/g, '');
            }
          } else {
            result.city = cityPart;
          }
        }
        
        // If we have a third part, it might contain the ZIP
        if (!result.zip && labelParts[2]) {
          const zipMatch = labelParts[2].trim().match(/\b(\d{3}\s*\d{2}|\d{5})\b/);
          if (zipMatch) {
            result.zip = zipMatch[1].replace(/\s+/g, '');
          }
        }
      }
    }

    // Debug the final result
    console.log("✅ Final parsed address components:", result);
    
    // Ensure ZIP code format is correct (5 digits)
    if (result.zip && result.zip.length !== 5) {
      result.zip = result.zip.padStart(5, '0').slice(0, 5);
    }
    
    return result;
  } catch (error) {
    console.error("❌ Error parsing address components:", error);
    return {
      street: "",
      city: "",
      zip: ""
    };
  }
};

/**
 * Popup Tracking Utilities
 * Tracks popup events for Google Ads and Analytics
 */

export type PopupTriggerType = 'scroll' | 'time' | 'exitIntent' | 'engagement';
export type PopupVariant = 'A' | 'B';

// Extend existing Window interface for additional properties
declare global {
  interface Window {
    trackConversion?: (conversionType?: string, value?: number, currency?: string) => void;
  }
}

/**
 * Track popup impression (when popup is shown)
 */
export const trackPopupImpression = (triggerSource: PopupTriggerType, variant: PopupVariant) => {
  console.log('[PopupTracking] Impression:', { triggerSource, variant });
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'popup_impression', {
      trigger_source: triggerSource,
      variant: variant,
      event_category: 'promotion_popup',
      event_label: `${triggerSource}_${variant}`
    });
  }
};

/**
 * Track popup conversion (when user submits phone number)
 */
export const trackPopupConversion = (
  triggerSource: PopupTriggerType, 
  variant: PopupVariant,
  phoneNumber: string
) => {
  console.log('[PopupTracking] Conversion:', { triggerSource, variant, phoneNumber });
  
  // Track generic conversion event
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'popup_conversion', {
      trigger_source: triggerSource,
      variant: variant,
      event_category: 'promotion_popup',
      event_label: `${triggerSource}_${variant}`,
      value: 1.0
    });
  }
  
  // Track Google Ads conversion using existing tracking function
  if (typeof window.trackConversion === 'function') {
    window.trackConversion('Popup - První měsíc zdarma', 1.0, 'CZK');
  }
};

/**
 * Track popup close
 */
export const trackPopupClose = (triggerSource: PopupTriggerType | null, variant: PopupVariant) => {
  console.log('[PopupTracking] Close:', { triggerSource, variant });
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'popup_close', {
      trigger_source: triggerSource || 'unknown',
      variant: variant,
      event_category: 'promotion_popup',
      event_label: `${triggerSource || 'unknown'}_${variant}`
    });
  }
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage
    });
  }
};

/**
 * Track engagement event (clicks on tariffs/TV)
 */
export const trackEngagementEvent = (elementType: string) => {
  console.log('[PopupTracking] Engagement:', elementType);
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'content_engagement', {
      event_category: 'engagement',
      event_label: elementType,
      element_type: elementType
    });
  }
};

/**
 * Get or generate A/B test variant
 * 70% Variant A, 30% Variant B
 */
export const getPopupVariant = (): PopupVariant => {
  const VARIANT_STORAGE_KEY = 'poda_popup_variant';
  
  // Check if variant already exists in session
  const storedVariant = sessionStorage.getItem(VARIANT_STORAGE_KEY) as PopupVariant | null;
  if (storedVariant === 'A' || storedVariant === 'B') {
    return storedVariant;
  }
  
  // Generate new variant: 70% A, 30% B
  const variant: PopupVariant = Math.random() < 0.7 ? 'A' : 'B';
  sessionStorage.setItem(VARIANT_STORAGE_KEY, variant);
  
  console.log('[PopupTracking] New variant assigned:', variant);
  return variant;
};

/**
 * Reset variant (for testing)
 */
export const resetPopupVariant = () => {
  const VARIANT_STORAGE_KEY = 'poda_popup_variant';
  sessionStorage.removeItem(VARIANT_STORAGE_KEY);
  console.log('[PopupTracking] Variant reset');
};

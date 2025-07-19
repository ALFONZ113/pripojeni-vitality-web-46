
// Google Ads conversion tracking utilities

export interface ConversionData {
  value?: number;
  currency?: string;
  transactionId?: string;
}

export const trackConversion = (data: ConversionData = {}) => {
  const {
    value = 1.0,
    currency = 'CZK',
    transactionId = ''
  } = data;

  // Check if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17366246923/xUWjCPadwPIaEIvM79hA',
      'value': value,
      'currency': currency,
      'transaction_id': transactionId
    });
    
    console.log('Google Ads conversion tracked:', { value, currency, transactionId });
  } else {
    console.warn('Google Ads tracking not available');
  }
};

// Specific conversion tracking functions
export const trackFormSubmission = (formType: string = 'contact') => {
  trackConversion({
    value: 1.0,
    currency: 'CZK',
    transactionId: `${formType}_${Date.now()}`
  });
};

export const trackPhoneClick = () => {
  trackConversion({
    value: 0.5, // Lower value for phone clicks
    currency: 'CZK',
    transactionId: `phone_${Date.now()}`
  });
};

export const trackPromoFormSubmission = () => {
  trackConversion({
    value: 2.0, // Higher value for promo forms
    currency: 'CZK',
    transactionId: `promo_${Date.now()}`
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

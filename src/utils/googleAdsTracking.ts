
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

// Enhanced tracking functions for Phase 1 optimization
export const trackScrollEvent = (percentage: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      'event_category': 'engagement',
      'event_label': `${percentage}%_scroll`,
      'value': percentage > 75 ? 1 : 0
    });
  }
};

export const trackTimeOnPage = (seconds: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      'name': 'time_on_page',
      'value': seconds,
      'event_category': 'engagement'
    });
  }
};

export const trackCustomerJourney = (step: string, details?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'customer_journey', {
      'event_category': 'user_flow',
      'event_label': step,
      'custom_parameters': details
    });
  }
};

export const trackPageEngagement = (action: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      'event_category': 'engagement',
      'value': value || 1
    });
  }
};

// Enhanced e-commerce events
export const trackViewItem = (itemId: string, itemName: string, category: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      'currency': 'CZK',
      'value': value || 1,
      'items': [{
        'item_id': itemId,
        'item_name': itemName,
        'item_category': category
      }]
    });
  }
};

export const trackBeginCheckout = (value: number, currency: string = 'CZK') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      'currency': currency,
      'value': value
    });
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

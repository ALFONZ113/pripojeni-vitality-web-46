import { useEffect, useRef } from 'react';
import { 
  trackScrollEvent, 
  trackTimeOnPage, 
  trackCustomerJourney,
  trackPageEngagement 
} from '../utils/googleAdsTracking';

export const useEnhancedTracking = () => {
  const startTime = useRef<number>(Date.now());
  const scrollTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Track initial page load
    trackCustomerJourney('page_load', { 
      page: window.location.pathname,
      timestamp: Date.now()
    });

    // Scroll tracking
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track milestone percentages
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollTracked.current.has(milestone)) {
          scrollTracked.current.add(milestone);
          trackScrollEvent(milestone);
        }
      });
    };

    // Time on page tracking
    const timeInterval = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      if (timeSpent > 0 && timeSpent % 30 === 0) { // Every 30 seconds
        trackTimeOnPage(timeSpent);
      }
    }, 30000);

    // Form interaction tracking
    const handleFormFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        trackPageEngagement('form_interaction');
      }
    };

    // Button click tracking
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const buttonText = target.textContent || target.closest('button')?.textContent;
        trackPageEngagement('button_click', 1);
        trackCustomerJourney('button_interaction', { buttonText });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('focusin', handleFormFocus);
    document.addEventListener('click', handleButtonClick);

    // Cleanup
    return () => {
      // Track final time on page
      const finalTime = Math.round((Date.now() - startTime.current) / 1000);
      trackTimeOnPage(finalTime);
      trackCustomerJourney('page_exit', { 
        timeSpent: finalTime,
        maxScroll: Math.max(...Array.from(scrollTracked.current), 0)
      });

      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('focusin', handleFormFocus);
      document.removeEventListener('click', handleButtonClick);
      clearInterval(timeInterval);
    };
  }, []);

  return {
    trackCustomEvent: trackCustomerJourney,
    trackEngagement: trackPageEngagement
  };
};
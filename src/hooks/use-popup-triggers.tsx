import { useState, useEffect, useCallback } from 'react';

interface PopupTriggers {
  scroll: boolean;
  time: boolean;
  exitIntent: boolean;
  engagement: boolean;
}

interface UsePopupTriggersOptions {
  scrollThreshold?: number; // Percentage (default 50)
  timeDelay?: number; // Milliseconds (default 60000)
  enableExitIntent?: boolean; // Desktop only (default true)
  enableEngagement?: boolean; // Track clicks on tariffs/TV (default true)
}

export const usePopupTriggers = (options: UsePopupTriggersOptions = {}) => {
  const {
    scrollThreshold = 50,
    timeDelay = 60000, // 60 seconds
    enableExitIntent = true,
    enableEngagement = true
  } = options;

  const [triggers, setTriggers] = useState<PopupTriggers>({
    scroll: false,
    time: false,
    exitIntent: false,
    engagement: false
  });

  const [shouldShow, setShouldShow] = useState(false);
  const [triggerSource, setTriggerSource] = useState<keyof PopupTriggers | null>(null);

  // Detect if mobile device
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  };

  // Scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= scrollThreshold && !triggers.scroll) {
        console.log('[PopupTriggers] Scroll threshold reached:', scrollPercentage.toFixed(1) + '%');
        setTriggers(prev => ({ ...prev, scroll: true }));
        if (!shouldShow) {
          setShouldShow(true);
          setTriggerSource('scroll');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, triggers.scroll, shouldShow]);

  // Time trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('[PopupTriggers] Time threshold reached:', timeDelay + 'ms');
      setTriggers(prev => ({ ...prev, time: true }));
      if (!shouldShow) {
        setShouldShow(true);
        setTriggerSource('time');
      }
    }, timeDelay);

    return () => clearTimeout(timer);
  }, [timeDelay, shouldShow]);

  // Exit intent trigger (desktop only)
  useEffect(() => {
    if (!enableExitIntent || isMobile()) {
      console.log('[PopupTriggers] Exit intent disabled:', isMobile() ? 'mobile device' : 'disabled in options');
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the window
      if (e.clientY <= 0 && e.relatedTarget === null && !triggers.exitIntent) {
        console.log('[PopupTriggers] Exit intent detected');
        setTriggers(prev => ({ ...prev, exitIntent: true }));
        if (!shouldShow) {
          setShouldShow(true);
          setTriggerSource('exitIntent');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [enableExitIntent, triggers.exitIntent, shouldShow]);

  // Engagement trigger (clicks on tariffs, TV sections)
  useEffect(() => {
    if (!enableEngagement) return;

    const handleEngagement = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked on tariff-related or TV-related elements
      const engagementSelectors = [
        '[href*="tarify"]',
        '[href*="tv"]',
        '[href*="iptv"]',
        '[class*="tariff"]',
        '[class*="tv"]',
        '[id*="tariff"]',
        '[id*="tv"]'
      ];

      const isEngagement = engagementSelectors.some(selector => 
        target.closest(selector) !== null
      );

      if (isEngagement && !triggers.engagement) {
        console.log('[PopupTriggers] Engagement detected:', target);
        setTriggers(prev => ({ ...prev, engagement: true }));
        if (!shouldShow) {
          setShouldShow(true);
          setTriggerSource('engagement');
        }
      }
    };

    document.addEventListener('click', handleEngagement);
    return () => document.removeEventListener('click', handleEngagement);
  }, [enableEngagement, triggers.engagement, shouldShow]);

  const reset = useCallback(() => {
    setTriggers({
      scroll: false,
      time: false,
      exitIntent: false,
      engagement: false
    });
    setShouldShow(false);
    setTriggerSource(null);
    console.log('[PopupTriggers] Reset all triggers');
  }, []);

  return {
    triggers,
    shouldShow,
    triggerSource,
    reset,
    isMobile: isMobile()
  };
};

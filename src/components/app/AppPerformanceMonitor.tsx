import React, { useEffect, useState } from 'react';

/**
 * Safe performance monitoring component that doesn't block loading
 */
const AppPerformanceMonitor = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only start monitoring after app is fully loaded
    const timer = setTimeout(() => {
      setIsReady(true);
      
      // Basic performance logging without complex monitoring
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        console.log('App loaded successfully, performance monitoring enabled');
        
        // Simple navigation timing
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log(`Page load time: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
        }
      }
    }, 2000); // Wait 2 seconds after app load

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default AppPerformanceMonitor;
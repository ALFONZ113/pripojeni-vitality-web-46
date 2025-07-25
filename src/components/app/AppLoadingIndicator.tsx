import React, { useEffect, useState } from 'react';

/**
 * Loading indicator that shows during app initialization
 */
const AppLoadingIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show loading indicator after 500ms to avoid flash
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Načítává se...</p>
      </div>
    </div>
  );
};

export default AppLoadingIndicator;
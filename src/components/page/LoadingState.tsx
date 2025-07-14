
import React from 'react';

// Zjednodušený loading state - minimálny a rýchly
const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" aria-busy="true" aria-live="polite">
      <div className="flex flex-col items-center space-y-4">
        {/* Malý, nenápadný loading indikátor */}
        <div className="w-8 h-8 border-2 border-poda-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground">Načítává se...</p>
      </div>
    </div>
  );
};

export default LoadingState;


import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" aria-busy="true" aria-live="polite">
      <Loader2 className="w-12 h-12 text-poda-blue animate-spin" />
    </div>
  );
};

export default LoadingState;

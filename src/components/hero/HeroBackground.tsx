
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ contentVisibility: 'auto', willChange: 'auto' }}>
      {/* Base gradient mesh background - optimized for LCP with faster rendering */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5" style={{ transform: 'translate3d(0,0,0)' }}></div>
      
      {/* Simplified animated orbs - reduce for LCP */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-primary/15 via-primary/8 to-transparent rounded-full animate-float" style={{ willChange: 'transform' }}></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-radial from-secondary/12 via-secondary/6 to-transparent rounded-full animate-float delay-1000" style={{ willChange: 'transform' }}></div>
      
      {/* Simplified mesh overlay for better LCP */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
    </div>
  );
};

export default HeroBackground;

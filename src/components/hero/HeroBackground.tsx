
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ contentVisibility: 'auto', willChange: 'auto' }}>
      {/* Base gradient mesh background - reduced intensity for photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent/2 to-secondary/3" style={{ transform: 'translate3d(0,0,0)' }}></div>
      
      {/* Subtle animated orbs - reduced opacity to not compete with photo */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-primary/8 via-primary/4 to-transparent rounded-full animate-float hidden lg:block" style={{ willChange: 'transform' }}></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-radial from-secondary/6 via-secondary/3 to-transparent rounded-full animate-float delay-1000 hidden lg:block" style={{ willChange: 'transform' }}></div>
      
      {/* Lighter mesh overlay */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
    </div>
  );
};

export default HeroBackground;

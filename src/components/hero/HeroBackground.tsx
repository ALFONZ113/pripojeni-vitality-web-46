
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-primary/20 via-primary/10 to-transparent rounded-full animate-float"></div>
      <div className="absolute -top-20 right-1/4 w-60 h-60 bg-gradient-radial from-accent/15 via-accent/8 to-transparent rounded-full animate-float delay-1000"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-radial from-secondary/18 via-secondary/9 to-transparent rounded-full animate-float delay-2000"></div>
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-gradient-radial from-primary/12 via-primary/6 to-transparent rounded-full animate-float delay-3000"></div>
      
      {/* Mesh overlay with complex gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60"></div>
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-gradient-noise opacity-20"></div>
      
      {/* Interactive gradient that follows cursor */}
      <div className="absolute inset-0 bg-gradient-interactive opacity-0 hover:opacity-10 transition-opacity duration-1000"></div>
    </div>
  );
};

export default HeroBackground;

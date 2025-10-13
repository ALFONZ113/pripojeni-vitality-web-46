
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
      
      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-poda-blue/10 to-transparent rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-poda-orange/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
    </div>
  );
};

export default HeroBackground;

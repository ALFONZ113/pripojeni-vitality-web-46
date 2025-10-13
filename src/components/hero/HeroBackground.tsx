
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Premium gradient base with mesh effect */}
      <div className="absolute inset-0 bg-gradient-mesh"></div>
      
      {/* Shimmer overlay for luxury effect */}
      <div className="absolute inset-0 bg-shimmer opacity-60"></div>
      
      {/* Large floating gradient orbs with glow */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(210 100% 70% / 0.4) 0%, hsl(210 100% 60% / 0.2) 40%, transparent 70%)',
          boxShadow: '0 0 100px 40px hsl(210 100% 70% / 0.2)'
        }}
      ></div>
      
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-35 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(25 100% 65% / 0.45) 0%, hsl(25 100% 60% / 0.25) 40%, transparent 70%)',
          boxShadow: '0 0 100px 40px hsl(25 100% 65% / 0.25)',
          animationDelay: '2s',
          animationDuration: '8s'
        }}
      ></div>
      
      <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-25 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(210 100% 75% / 0.35) 0%, hsl(200 100% 70% / 0.2) 40%, transparent 70%)',
          boxShadow: '0 0 120px 50px hsl(210 100% 75% / 0.2)',
          animationDelay: '4s',
          animationDuration: '10s'
        }}
      ></div>
      
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ 
        backgroundImage: `
          radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0),
          linear-gradient(45deg, transparent 48%, hsl(var(--primary) / 0.03) 50%, transparent 52%)
        `,
        backgroundSize: '50px 50px, 100px 100px'
      }}></div>
      
      {/* Gradient noise texture for depth */}
      <div className="absolute inset-0 bg-gradient-noise opacity-40"></div>
      
      {/* Top light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
    </div>
  );
};

export default HeroBackground;

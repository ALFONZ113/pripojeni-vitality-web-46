
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Noir base with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-noir"></div>
      
      {/* Large floating gold orbs with glow */}
      <div 
        className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(38, 92%, 50%, 0.3) 0%, hsl(38, 92%, 50%, 0.1) 40%, transparent 70%)',
          boxShadow: '0 0 100px 40px hsl(38, 92%, 50%, 0.15)'
        }}
      ></div>
      
      <div 
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(38, 70%, 60%, 0.35) 0%, hsl(38, 70%, 60%, 0.15) 40%, transparent 70%)',
          boxShadow: '0 0 100px 40px hsl(38, 70%, 60%, 0.2)',
          animationDelay: '2s',
          animationDuration: '8s'
        }}
      ></div>
      
      <div 
        className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-15 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(38, 100%, 65%, 0.25) 0%, hsl(38, 100%, 65%, 0.1) 40%, transparent 70%)',
          boxShadow: '0 0 120px 50px hsl(38, 100%, 65%, 0.15)',
          animationDelay: '4s',
          animationDuration: '10s'
        }}
      ></div>
      
      {/* Subtle geometric pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(38, 92%, 50%) 1px, transparent 0),
            linear-gradient(45deg, transparent 48%, hsl(38, 92%, 50%, 0.05) 50%, transparent 52%)
          `,
          backgroundSize: '50px 50px, 100px 100px'
        }}
      ></div>
      
      {/* Top light glow - gold accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent"></div>
      
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
    </div>
  );
};

export default HeroBackground;

import React, { useEffect, useRef, useState } from 'react';

const HeroBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [showParallax, setShowParallax] = useState(false);

  useEffect(() => {
    // Enable parallax after initial render
    const timer = setTimeout(() => setShowParallax(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showParallax) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          // Parallax effect - subtle movement (0.3 factor for gentle effect)
          const newOffset = lastScrollY * 0.3;
          setOffset(newOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttle scroll events
    let timeoutId: number;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        handleScroll();
        timeoutId = 0;
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showParallax]);

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 overflow-hidden" 
      aria-hidden="true" 
      style={{ contentVisibility: 'auto', willChange: showParallax ? 'transform' : 'auto' }}
    >
      {/* Base gradient mesh background with parallax - optimized for LCP */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-secondary/5" 
        style={{ 
          transform: showParallax ? `translate3d(0, ${offset}px, 0)` : 'translate3d(0,0,0)',
          transition: showParallax ? 'none' : 'transform 0.1s ease-out'
        }}
      />
      
      {/* Simplified animated orbs with parallax - reduce for LCP */}
      <div 
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-radial from-primary/15 via-primary/8 to-transparent rounded-full animate-float" 
        style={{ 
          willChange: 'transform',
          transform: showParallax ? `translate3d(0, ${offset * 0.5}px, 0)` : 'translate3d(0,0,0)'
        }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-radial from-secondary/12 via-secondary/6 to-transparent rounded-full animate-float delay-1000" 
        style={{ 
          willChange: 'transform',
          transform: showParallax ? `translate3d(0, ${offset * 0.7}px, 0)` : 'translate3d(0,0,0)'
        }}
      />
      
      {/* Simplified mesh overlay for better LCP */}
      <div 
        className="absolute inset-0 bg-gradient-mesh opacity-40"
        style={{ 
          transform: showParallax ? `translate3d(0, ${offset * 0.2}px, 0)` : 'translate3d(0,0,0)'
        }}
      />
    </div>
  );
};

export default HeroBackground;

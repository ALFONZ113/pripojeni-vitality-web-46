
import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute top-0 left-0 w-full h-full bg-background"></div>
    </div>
  );
};

export default HeroBackground;

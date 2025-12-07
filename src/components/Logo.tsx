import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizes = {
    sm: { textSize: 'text-xl' },
    md: { textSize: 'text-2xl' },
    lg: { textSize: 'text-3xl' }
  };

  const { textSize } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-display font-bold ${textSize} tracking-tight`}>
        <span className="text-primary">popri</span>
        <span className="text-foreground">.cz</span>
      </span>
    </div>
  );
};

export default Logo;


import React, { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  behavior?: 'smooth' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ 
  children, 
  behavior = 'smooth',
  block = 'start'
}) => {
  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = behavior;
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [behavior]);

  // Smooth scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: behavior
    });
  };

  // Smooth scroll to element functionality
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: behavior,
        block: block
      });
    }
  };

  return (
    <div data-smooth-scroll>
      {children}
    </div>
  );
};

export const useSmoothScroll = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToElement = (elementId: string, block: ScrollLogicalPosition = 'start') => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: block
      });
    }
  };

  return { scrollToTop, scrollToElement };
};

export default SmoothScroll;

import { useEffect, useRef, useState, RefCallback } from 'react';

interface UseCounterAnimationOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCounterAnimation = ({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = ''
}: UseCounterAnimationOptions) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const elementRef: RefCallback<HTMLElement> = (node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node && !hasAnimated) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        },
        {
          threshold: 0.3,
          rootMargin: '0px'
        }
      );

      observerRef.current.observe(node);
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const range = end - start;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + range * easeOutQuart;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, start, end, duration]);

  const displayValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { elementRef, displayValue, count };
};

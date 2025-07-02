
import { useEffect, useRef, useState } from 'react';

interface UseLazyLoadingProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useLazyLoading = ({
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = true
}: UseLazyLoadingProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    
    // Fallback: if IntersectionObserver is not supported, show content immediately
    if (!element || !('IntersectionObserver' in window)) {
      console.log('[useLazyLoading] IntersectionObserver not supported, showing content immediately');
      setIsVisible(true);
      return;
    }

    // Additional fallback: show content after a timeout
    const fallbackTimeout = setTimeout(() => {
      console.log('[useLazyLoading] Fallback timeout reached, showing content');
      setIsVisible(true);
    }, 2000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('[useLazyLoading] IntersectionObserver triggered, isIntersecting:', entry.isIntersecting);
        const shouldShow = entry.isIntersecting && (!triggerOnce || !hasTriggered);
        
        if (shouldShow) {
          console.log('[useLazyLoading] Setting content visible');
          setIsVisible(true);
          clearTimeout(fallbackTimeout);
          if (triggerOnce) {
            setHasTriggered(true);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimeout);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref, isVisible] as const;
};

export default useLazyLoading;


import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Clear any pending timeout to prevent multiple rapid updates
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Batch DOM updates to prevent forced reflows
        timeoutRef.current = setTimeout(() => {
          requestAnimationFrame(() => {
            const isVisible = entry.isIntersecting;
            
            if (isVisible && (!triggerOnce || !hasTriggered)) {
              setIsIntersecting(true);
              if (triggerOnce) {
                setHasTriggered(true);
              }
            } else if (!triggerOnce) {
              setIsIntersecting(isVisible);
            }
          });
        }, 16); // Debounce for ~1 frame at 60fps
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [targetRef, isIntersecting] as const;
};

export default useIntersectionObserver;

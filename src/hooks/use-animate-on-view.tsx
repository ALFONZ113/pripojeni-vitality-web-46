import { useRef, useEffect, useState } from 'react';

/**
 * Lightweight CSS-based alternative to framer-motion's useInView.
 * Returns a ref and a boolean. When element enters viewport, isVisible becomes true.
 * Uses IntersectionObserver — zero JS animation overhead.
 */
export const useAnimateOnView = (options?: { once?: boolean; margin?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const once = options?.once ?? true;
  const margin = options?.margin ?? '-50px';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: margin, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return { ref, isVisible };
};

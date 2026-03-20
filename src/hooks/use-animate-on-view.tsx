import { useRef, useEffect, useState } from 'react';

/**
 * Detect if current visitor is likely a search engine bot.
 * If so, all content should be visible immediately (no animation gating).
 */
const isBot = typeof navigator !== 'undefined' && /Googlebot|Google-InspectionTool|bingbot|Slurp|DuckDuckBot|YandexBot|Baiduspider/i.test(navigator.userAgent);

/**
 * Lightweight CSS-based alternative to framer-motion's useInView.
 * Returns a ref and a boolean. When element enters viewport, isVisible becomes true.
 * For search engine bots, isVisible is always true immediately.
 * Uses IntersectionObserver — zero JS animation overhead.
 */
export const useAnimateOnView = (options?: { once?: boolean; margin?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(isBot); // bots see content immediately
  const once = options?.once ?? true;
  const margin = options?.margin ?? '-50px';

  useEffect(() => {
    if (isBot) return; // skip observer for bots
    
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

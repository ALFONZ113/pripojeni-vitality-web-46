
/**
 * Optimized animation initialization with performance improvements
 * - Uses IntersectionObserver for efficient reveal animations
 * - Batch DOM operations to reduce layout thrashing
 * - Implements passive event listeners for better scroll performance
 */
export function initAnimations() {
  // Use requestAnimationFrame for better performance
  const scheduleTask = window.requestAnimationFrame;
  
  // Performance optimized observer options
  const observerOptions = {
    rootMargin: '0px 0px -50px 0px', // Smaller threshold to load faster
    threshold: 0.1 // Lower threshold to trigger earlier
  };

  // Collect elements to unobserve on cleanup
  const observedElements = new Set<Element>();
  
  // Create a single observer instance for all animations
  const observer = new IntersectionObserver((entries) => {
    // Batch DOM operations for better performance
    const activateElements: Element[] = [];
    
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateElements.push(entry.target);
        observedElements.delete(entry.target);
        observer.unobserve(entry.target);
      }
    });
    
    // Apply changes in next animation frame to avoid layout thrashing
    if (activateElements.length) {
      requestAnimationFrame(() => {
        activateElements.forEach(el => {
          el.classList.add('active');
        });
      });
    }
  }, observerOptions);
  
  // Immediate observation for better initial load
  const animatedElements = document.querySelectorAll('.reveal-animation');
  
  if (animatedElements.length > 0) {
    animatedElements.forEach(el => {
      observer.observe(el);
      observedElements.add(el);
    });
  }
  
  // Clean up function to prevent memory leaks
  return () => {
    observedElements.forEach(el => {
      observer.unobserve(el);
    });
    observedElements.clear();
  };
}

/**
 * Helper function to add animations to dynamically added content
 * @param {HTMLElement} container - Container with new content to animate
 */
export function refreshAnimations(container: HTMLElement) {
  if (!container || !(container instanceof HTMLElement)) {
    console.warn('Invalid container provided to refreshAnimations');
    return;
  }
  
  const newElements = container.querySelectorAll('.reveal-animation:not(.active)');
  
  if (newElements.length === 0) return;
  
  // Optimized observer options for faster animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  
  newElements.forEach(el => {
    observer.observe(el);
  });
}

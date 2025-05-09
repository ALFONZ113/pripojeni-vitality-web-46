
/**
 * Optimized animation initialization with better performance and memory usage
 */
export function initAnimations() {
  // Use cached selectors and optimize observer options
  const observerOptions = {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  // Use a WeakSet for memory-efficient tracking of observed elements
  const observedElements = new WeakSet<Element>();
  
  // Create a single observer instance with batched operations
  const observer = new IntersectionObserver((entries) => {
    if (!entries.length) return;
    
    // Batch DOM operations in a single animation frame
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    });
  }, observerOptions);
  
  // Observe all animation elements immediately
  document.querySelectorAll('.reveal-animation').forEach(el => {
    observer.observe(el);
    observedElements.add(el);
  });
  
  // Clean up function
  return () => observer.disconnect();
}

/**
 * Optimized helper function to add animations to dynamically added content
 * @param {HTMLElement} container - Container with new content to animate
 */
export function refreshAnimations(container: HTMLElement) {
  if (!container || !(container instanceof HTMLElement)) return;
  
  const newElements = container.querySelectorAll('.reveal-animation:not(.active)');
  if (newElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  
  newElements.forEach(el => observer.observe(el));
}

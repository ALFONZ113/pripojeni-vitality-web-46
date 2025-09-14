
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
  
  // Create a single observer instance with optimized batched operations
  const observer = new IntersectionObserver((entries) => {
    if (!entries.length) return;
    
    // Use double RAF to ensure layout calculations are complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Batch all DOM writes together to minimize reflows
        const elementsToActivate: Element[] = [];
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            elementsToActivate.push(entry.target);
          }
        });
        
        // Apply all class changes in a single batch
        elementsToActivate.forEach(element => {
          element.classList.add('active');
          observer.unobserve(element);
        });
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
    // Use double RAF for better reflow prevention
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elementsToActivate: Element[] = [];
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            elementsToActivate.push(entry.target);
          }
        });
        
        // Batch DOM operations to prevent forced reflows
        elementsToActivate.forEach(element => {
          element.classList.add('active');
          observer.unobserve(element);
        });
      });
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });
  
  newElements.forEach(el => observer.observe(el));
}

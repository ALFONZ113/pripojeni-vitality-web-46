
/**
 * Optimized animation system with global observer and memory management
 */

class AnimationManager {
  private observer: IntersectionObserver | null = null;
  private observedElements = new WeakSet<Element>();
  private isInitialized = false;

  private createObserver() {
    if (this.observer) return this.observer;

    this.observer = new IntersectionObserver(
      (entries) => {
        requestAnimationFrame(() => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              this.observer?.unobserve(entry.target);
            }
          });
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      }
    );

    return this.observer;
  }

  observe(element: Element) {
    if (this.observedElements.has(element)) return;
    
    const observer = this.createObserver();
    observer.observe(element);
    this.observedElements.add(element);
  }

  observeAll() {
    if (this.isInitialized) return;
    
    document.querySelectorAll('.reveal-animation').forEach(el => {
      this.observe(el);
    });
    
    this.isInitialized = true;
  }

  refreshContainer(container: HTMLElement) {
    const newElements = container.querySelectorAll('.reveal-animation:not(.active)');
    newElements.forEach(el => this.observe(el));
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.isInitialized = false;
  }
}

// Global instance
const animationManager = new AnimationManager();

export const initAnimations = () => {
  animationManager.observeAll();
  return () => animationManager.disconnect();
};

export const refreshAnimations = (container: HTMLElement) => {
  animationManager.refreshContainer(container);
};

export default animationManager;

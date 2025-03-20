
export function initAnimations() {
  const observerOptions = {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements with the reveal-animation class
  const animatedElements = document.querySelectorAll('.reveal-animation');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  return () => {
    animatedElements.forEach(el => {
      observer.unobserve(el);
    });
  };
}

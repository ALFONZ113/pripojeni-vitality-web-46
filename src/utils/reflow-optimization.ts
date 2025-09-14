/**
 * Reflow optimization utilities to prevent forced synchronous layouts
 */

/**
 * Batch DOM read and write operations to prevent forced reflows
 */
export const batchDomOperations = (operations: Array<() => void>) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      operations.forEach(operation => operation());
    });
  });
};

/**
 * Debounced IntersectionObserver callback to prevent rapid updates
 */
export const createOptimizedObserverCallback = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  delay = 16
) => {
  let timeoutId: NodeJS.Timeout;
  
  return (entries: IntersectionObserverEntry[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      batchDomOperations([() => callback(entries)]);
    }, delay);
  };
};

/**
 * CSS containment helper to limit layout scope
 */
export const addCssContainment = (element: HTMLElement) => {
  element.style.contain = 'layout style paint';
  element.style.contentVisibility = 'auto';
};

/**
 * Prevent layout thrashing by reading all measurements first, then writing
 */
export const measureThenMutate = (
  measureFn: () => any,
  mutateFn: (measurements: any) => void
) => {
  requestAnimationFrame(() => {
    const measurements = measureFn();
    requestAnimationFrame(() => {
      mutateFn(measurements);
    });
  });
};
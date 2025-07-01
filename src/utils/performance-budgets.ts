/**
 * Performance budgets for monitoring
 */

export const PERFORMANCE_BUDGETS = {
  // Bundle size budgets (in KB)
  javascript: 400,  // Reduced from 800KB
  css: 50,
  images: 1000,
  fonts: 100,
  total: 1550,      // Reduced from 2500KB

  // Core Web Vitals targets
  lcp: 2500,        // Largest Contentful Paint (ms)
  fid: 100,         // First Input Delay (ms)
  cls: 0.1,         // Cumulative Layout Shift
  fcp: 1800,        // First Contentful Paint (ms)
  ttfb: 600,        // Time to First Byte (ms)

  // Performance scores
  performance: 90,
  accessibility: 95,
  bestPractices: 95,
  seo: 100
};

/**
 * Monitor and warn about budget violations
 */
export const checkPerformanceBudgets = (metrics: any) => {
  const violations = [];

  if (metrics.lcp > PERFORMANCE_BUDGETS.lcp) {
    violations.push(`LCP: ${metrics.lcp}ms (target: ${PERFORMANCE_BUDGETS.lcp}ms)`);
  }

  if (metrics.fid > PERFORMANCE_BUDGETS.fid) {
    violations.push(`FID: ${metrics.fid}ms (target: ${PERFORMANCE_BUDGETS.fid}ms)`);
  }

  if (metrics.cls > PERFORMANCE_BUDGETS.cls) {
    violations.push(`CLS: ${metrics.cls} (target: ${PERFORMANCE_BUDGETS.cls})`);
  }

  if (violations.length > 0) {
    console.warn('Performance Budget Violations:', violations);
  }

  return violations.length === 0;
};
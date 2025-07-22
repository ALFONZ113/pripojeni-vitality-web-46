/**
 * Bundle analysis and optimization utilities
 */

/**
 * Analyze and report bundle performance metrics
 */
export const analyzeBundlePerformance = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  // Monitor resource loading
  const resourceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    entries.forEach((entry) => {
      if (entry.name.includes('.js') || entry.name.includes('.css')) {
        const size = (entry as any).transferSize || 0;
        const duration = entry.duration;
        
        console.group(`📦 Bundle: ${entry.name.split('/').pop()}`);
        console.log(`Size: ${(size / 1024).toFixed(2)} KB`);
        console.log(`Load time: ${duration.toFixed(2)}ms`);
        console.log(`Type: ${entry.name.includes('.js') ? 'JavaScript' : 'CSS'}`);
        console.groupEnd();
      }
    });
  });

  resourceObserver.observe({ entryTypes: ['resource'] });

  // Monitor navigation performance
  const navigationObserver = new PerformanceObserver((list) => {
    const [entry] = list.getEntries();
    const timing = entry as PerformanceNavigationTiming;
    
    console.group('🚀 Navigation Performance');
    console.log(`DNS: ${timing.domainLookupEnd - timing.domainLookupStart}ms`);
    console.log(`Connect: ${timing.connectEnd - timing.connectStart}ms`);
    console.log(`Response: ${timing.responseEnd - timing.responseStart}ms`);
    console.log(`DOM Interactive: ${timing.domInteractive - timing.fetchStart}ms`);
    console.log(`DOM Complete: ${timing.domComplete - timing.fetchStart}ms`);
    console.log(`Load Complete: ${timing.loadEventEnd - timing.fetchStart}ms`);
    console.groupEnd();
  });

  navigationObserver.observe({ entryTypes: ['navigation'] });

  // Monitor memory usage
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory.usedJSHeapSize > memory.usedJSHeapSize * 0.9) {
        console.warn('⚠️ High memory usage detected:', {
          used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
        });
      }
    }, 30000); // Check every 30 seconds
  }
};

/**
 * Report bundle size warnings
 */
export const reportBundleSizeWarnings = () => {
  if (typeof window === 'undefined') return;

  const checkBundleSize = () => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    Promise.all([
      ...scripts.map(script => fetch((script as HTMLScriptElement).src, { method: 'HEAD' })),
      ...stylesheets.map(link => fetch((link as HTMLLinkElement).href, { method: 'HEAD' }))
    ]).then(responses => {
      responses.forEach((response, index) => {
        const contentLength = response.headers.get('content-length');
        if (contentLength) {
          const size = parseInt(contentLength) / 1024; // KB
          const isScript = index < scripts.length;
          const fileName = response.url.split('/').pop();
          
          // Warn about large bundles
          if (isScript && size > 500) {
            console.warn(`⚠️ Large JavaScript bundle detected: ${fileName} (${size.toFixed(2)} KB)`);
          } else if (!isScript && size > 100) {
            console.warn(`⚠️ Large CSS bundle detected: ${fileName} (${size.toFixed(2)} KB)`);
          }
        }
      });
    }).catch(() => {
      // Silently handle fetch errors
    });
  };

  // Check after page load
  if (document.readyState === 'complete') {
    checkBundleSize();
  } else {
    window.addEventListener('load', checkBundleSize);
  }
};

/**
 * Suggest optimization opportunities
 */
export const suggestOptimizations = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  const suggestions: string[] = [];

  // Check for unused CSS
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  if (stylesheets.length > 3) {
    suggestions.push('Consider combining CSS files to reduce HTTP requests');
  }

  // Check for inline scripts
  const inlineScripts = document.querySelectorAll('script:not([src])');
  if (inlineScripts.length > 2) {
    suggestions.push('Consider moving inline scripts to external files for better caching');
  }

  // Check for missing resource hints
  const preloads = document.querySelectorAll('link[rel="preload"]');
  const prefetches = document.querySelectorAll('link[rel="prefetch"]');
  
  if (preloads.length === 0) {
    suggestions.push('Add preload hints for critical resources');
  }
  
  if (prefetches.length === 0) {
    suggestions.push('Add prefetch hints for likely next navigation');
  }

  // Report suggestions
  if (suggestions.length > 0) {
    console.group('💡 Optimization Suggestions');
    suggestions.forEach(suggestion => console.log(`• ${suggestion}`));
    console.groupEnd();
  }
};

export default {
  analyzeBundlePerformance,
  reportBundleSizeWarnings,
  suggestOptimizations
};
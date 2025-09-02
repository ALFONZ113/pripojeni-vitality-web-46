
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// CSS loaded non-blocking via index.html
import { preloadCriticalRoutes, optimizeChunkLoading } from './utils/code-splitting'
import { measureCoreWebVitals } from './utils/performance-optimization'
import { handleBlogRedirects } from './utils/redirectManager'

// Global type declaration for window functions
declare global {
  interface Window {
    markReactLoaded?: () => void;
  }
}

// Performance tracking - minimize console logs for production
if (process.env.NODE_ENV === 'development') {
  console.log('React app loading started');
}
const startTime = performance.now();

// ULTRA-OPTIMIZED React rendering for fastest possible FCP
try {
  // Handle redirects first, before any DOM manipulation
  handleBlogRedirects();
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  // CRITICAL: Create and render React IMMEDIATELY using concurrent features
  const root = createRoot(rootElement);
  
  // Use React 18 concurrent rendering for better performance
  root.render(<App />);
  
  // IMMEDIATE callback to mark React loaded for fastest static content replacement
  const loadTime = performance.now() - startTime;
  
  // Signal React loaded IMMEDIATELY
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`React FCP optimized: ${loadTime.toFixed(2)}ms`);
  }
  
  // Defer ALL non-critical operations until after paint
  requestAnimationFrame(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Dynamic imports for non-blocking optimization loading
        import('./utils/code-splitting').then(({ 
          preloadCriticalRoutes, 
          optimizeChunkLoading, 
          lazyLoadHeavyComponents, 
          loadMapyWhenNeeded 
        }) => {
          preloadCriticalRoutes();
          optimizeChunkLoading();  
          lazyLoadHeavyComponents();
          loadMapyWhenNeeded();
          measureCoreWebVitals();
        });
      }, { timeout: 1000 });
    } else {
      // Immediate fallback for browsers without requestIdleCallback
      setTimeout(() => {
        import('./utils/code-splitting').then(({ 
          preloadCriticalRoutes, 
          optimizeChunkLoading, 
          lazyLoadHeavyComponents, 
          loadMapyWhenNeeded 
        }) => {
          preloadCriticalRoutes();
          optimizeChunkLoading();
          lazyLoadHeavyComponents();
          loadMapyWhenNeeded();
          measureCoreWebVitals();
        });
      }, 100);
    }
  });
  
} catch (error) {
  // Minimal error handling to avoid blocking render
  if (process.env.NODE_ENV === 'development') {
    console.error('[App Error]:', (error as Error).message);
  }
  console.error('React render failed, showing fallback');
  
  // Fallback UI if React fails to render
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 400px;">
          <h1 style="color: #1e40af; margin-bottom: 16px;">PODA Internet Připojení</h1>
          <p style="color: #64748b; margin-bottom: 24px;">Omlouváme se, došlo k chybě při načítání stránky.</p>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #1e40af; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; width: 100%;">
            Obnovit stránku
          </button>
        </div>
      </div>
    `;
  }
}


import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalRoutes, optimizeChunkLoading, lazyLoadHeavyComponents, loadMapyWhenNeeded } from './utils/code-splitting'
import { measureCoreWebVitals } from './utils/performance'
import { handleBlogRedirects } from './utils/redirectManager'
import { initializeLCPOptimizations } from './utils/lcp-optimization'

// Register service worker after hydration
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (/googlebot|bingbot|slurp|duckduckbot|yandex/i.test(navigator.userAgent)) return;
  
  navigator.serviceWorker.getRegistrations()
    .then(regs => Promise.all(regs.map(r => r.unregister())))
    .then(() => navigator.serviceWorker.register('/service-worker.js?v=4.0'))
    .catch(() => {});
}

// Global type declaration for window functions
declare global {
  interface Window {
    markReactLoaded?: () => void;
  }
}

// Initialize LCP optimizations IMMEDIATELY for best performance
initializeLCPOptimizations();

// Performance tracking - minimize console logs for production
if (process.env.NODE_ENV === 'development') {
  console.log('React app loading started');
}
const startTime = performance.now();

// Enhanced render application with optimized performance and IMMEDIATE CONTENT RENDERING
try {
  // Handle redirects first, before any DOM manipulation
  handleBlogRedirects();
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  // Create root and render IMMEDIATELY for fastest FCP
  const root = createRoot(rootElement);
  
  // CRITICAL: Use immediate synchronous rendering to replace static content ASAP
  root.render(<App />);
  
  // Mark React as loaded IMMEDIATELY - no delays for instant content swap
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
  // Log performance only in dev
  const loadTime = performance.now() - startTime;
  if (process.env.NODE_ENV === 'development') {
    console.log(`React app loaded in ${loadTime.toFixed(2)}ms`);
  }
  
  // Defer ALL non-critical optimizations to avoid blocking initial render
  setTimeout(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadCriticalRoutes();
        optimizeChunkLoading();
        lazyLoadHeavyComponents();
        loadMapyWhenNeeded();
        measureCoreWebVitals();
        registerServiceWorker();
      }, { timeout: 2000 });
    } else {
      preloadCriticalRoutes();
      optimizeChunkLoading();
      lazyLoadHeavyComponents();
      loadMapyWhenNeeded();
      measureCoreWebVitals();
      registerServiceWorker();
    }
  }, 0);
  
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

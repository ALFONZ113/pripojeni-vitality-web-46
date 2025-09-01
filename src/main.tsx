
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
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

// Enhanced render application with optimized performance
try {
  // Handle redirects first, before any DOM manipulation
  handleBlogRedirects();
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  // Create root and render immediately for faster FCP
  const root = createRoot(rootElement);
  
  // Use synchronous rendering for critical initial paint
  root.render(<App />);
  
  // Signal successful React load immediately for better UX
  const loadTime = performance.now() - startTime;
  if (process.env.NODE_ENV === 'development') {
    console.log(`React app loaded in ${loadTime.toFixed(2)}ms`);
  }
  
  // Mark React as loaded for static content management
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
  // Defer non-critical optimizations to avoid blocking initial render
  setTimeout(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const { preloadCriticalRoutes, optimizeChunkLoading, lazyLoadHeavyComponents, loadMapyWhenNeeded } = require('./utils/code-splitting');
        preloadCriticalRoutes();
        optimizeChunkLoading();
        lazyLoadHeavyComponents();
        loadMapyWhenNeeded();
        measureCoreWebVitals();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        const { preloadCriticalRoutes, optimizeChunkLoading, lazyLoadHeavyComponents, loadMapyWhenNeeded } = require('./utils/code-splitting');
        preloadCriticalRoutes();
        optimizeChunkLoading();
        lazyLoadHeavyComponents();
        loadMapyWhenNeeded();
        measureCoreWebVitals();
      }, 100);
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


import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalRoutes, optimizeChunkLoading } from './utils/code-splitting'
import { measureCoreWebVitals } from './utils/performance-optimization'

// Global type declaration for window functions
declare global {
  interface Window {
    markReactLoaded?: () => void;
  }
}

// Performance tracking
console.log('React app loading started');
const startTime = performance.now();

// Error tracking with improved error information
const handleError = (error: Error) => {
  console.error('[App Error]:', error.message);
  console.error('Stack:', error.stack);
};

// Enhanced render application with performance monitoring
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  // Create root and render with performance tracking
  const root = createRoot(rootElement);
  root.render(<App />);
  
  // Signal successful React load to global scope
  const loadTime = performance.now() - startTime;
  console.log(`React app loaded in ${loadTime.toFixed(2)}ms`);
  
  // Mark React as loaded for static content management
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
  // Initialize performance optimizations after successful render
  requestIdleCallback(() => {
    preloadCriticalRoutes();
    optimizeChunkLoading();
    measureCoreWebVitals();
  });
  
} catch (error) {
  handleError(error as Error);
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

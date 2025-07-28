
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global type declaration for window functions
declare global {
  interface Window {
    markReactLoaded?: () => void;
  }
}

// Add debug logging to identify the issue
console.log('React app loading started');
const startTime = performance.now();

// Error tracking with improved error information
const handleError = (error: Error) => {
  console.error('[App Error]:', error.message);
  console.error('Stack:', error.stack);
  // Also display error in DOM for debugging
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif; background: #fee; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 600px;">
          <h1 style="color: #dc2626; margin-bottom: 16px;">JavaScript Error</h1>
          <p style="color: #64748b; margin-bottom: 24px;"><strong>Error:</strong> ${error.message}</p>
          <pre style="background: #f8f8f8; padding: 16px; border-radius: 4px; text-align: left; font-size: 12px; overflow-x: auto;">${error.stack}</pre>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; width: 100%; margin-top: 16px;">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
};

// Debug React startup step by step
console.log('Step 1: Finding root element...');
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error('CRITICAL: Root element not found!');
  throw new Error("Root element not found - check your HTML");
}

console.log('Step 2: Root element found, creating React root...');
try {
  const root = createRoot(rootElement);
  
  console.log('Step 3: Rendering App component...');
  root.render(<App />);
  
  console.log('Step 4: App rendered successfully');
  const loadTime = performance.now() - startTime;
  console.log(`React app loaded in ${loadTime.toFixed(2)}ms`);
  
  // Mark React as loaded for static content management
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
} catch (error) {
  console.error('CRITICAL ERROR in main.tsx:', error);
  handleError(error as Error);
}

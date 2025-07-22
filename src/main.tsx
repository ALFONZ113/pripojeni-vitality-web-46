
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalRoutes, optimizeChunkLoading } from './utils/code-splitting'

// Error tracking with improved error information
const handleError = (error: Error) => {
  console.error('[App Error]:', error.message);
  console.error('Stack:', error.stack);
};

// Render application
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  createRoot(rootElement).render(<App />);
  
  // Initialize performance optimizations
  preloadCriticalRoutes();
  optimizeChunkLoading();
} catch (error) {
  handleError(error as Error);
  
  // Fallback UI if React fails to render
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h1>PODA Internet Připojení</h1>
        <p>Omlouváme se, došlo k chybě při načítání stránky.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer; background: #0066cc; color: white; border: none; border-radius: 4px;">
          Obnovit stránku
        </button>
      </div>
    `;
  }
}

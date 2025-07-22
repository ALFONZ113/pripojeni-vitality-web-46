
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simplified error handling
const handleError = (error: Error) => {
  console.error('[App Error]:', error.message);
  console.error('Stack:', error.stack);
};

// Render application with better mobile support
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  createRoot(rootElement).render(<App />);
  
} catch (error) {
  handleError(error as Error);
  
  // Enhanced fallback UI for mobile
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        padding: 20px; 
        text-align: center; 
        font-family: system-ui, sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
      ">
        <div style="
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          max-width: 400px;
          width: 90%;
        ">
          <h1 style="
            color: #0F4C81;
            margin-bottom: 16px;
            font-size: 24px;
            font-weight: 700;
          ">PODA Internet Připojení</h1>
          <p style="
            color: #666;
            margin-bottom: 24px;
            line-height: 1.5;
          ">Omlouváme se, došlo k chybě při načítání stránky.</p>
          <button onclick="window.location.reload()" style="
            padding: 12px 24px; 
            background: #0F4C81; 
            color: white; 
            border: none; 
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
          ">
            Obnovit stránku
          </button>
        </div>
      </div>
    `;
  }
}

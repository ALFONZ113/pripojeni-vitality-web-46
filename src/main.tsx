
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { debugLog, startPerformanceTracking, setupGlobalErrorHandling, isDebugMode } from './utils/debugUtils';

// Start performance tracking if in debug mode
if (isDebugMode()) {
  startPerformanceTracking();
  setupGlobalErrorHandling();
}

// Error tracking with improved error information
const handleError = (error: Error) => {
  debugLog('[App Error]:', error);
  console.error('[App Error]:', error.message);
  console.error('Stack:', error.stack);
};

// Render application with timeout safeguard
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  // Set a timeout to detect if rendering takes too long
  const renderTimeout = setTimeout(() => {
    // If we hit this timeout, React initialization is likely stuck
    const fallbackElement = document.createElement('div');
    fallbackElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h1>PODA Internet Připojení</h1>
        <p>Načítání stránky trvá déle než obvykle.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer; background: #0066cc; color: white; border: none; border-radius: 4px;">
          Obnovit stránku
        </button>
        <p id="countdown">30</p>
      </div>
    `;
    
    // Only add fallback if the root is still empty
    if (rootElement.children.length === 0) {
      rootElement.appendChild(fallbackElement);
      
      // Auto-reload countdown
      let count = 30;
      const countdownElement = document.getElementById('countdown');
      const countInterval = setInterval(() => {
        count--;
        if (countdownElement) {
          countdownElement.textContent = count.toString();
        }
        if (count <= 0) {
          clearInterval(countInterval);
          window.location.reload();
        }
      }, 1000);
    }
  }, 10000); // 10 second timeout for rendering
  
  // Render the app
  createRoot(rootElement).render(<App />);
  
  // If we got here, rendering started, so clear the timeout
  clearTimeout(renderTimeout);
  
  debugLog('Application successfully rendered');
} catch (error) {
  handleError(error as Error);
  
  // Fallback UI if React fails to render
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h1>PODA Internet Připojení</h1>
        <p>Omlouváme se, došlo k chybě při načítání stránky.</p>
        <p style="color: #cc0000;">Chyba: ${(error as Error).message}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer; background: #0066cc; color: white; border: none; border-radius: 4px;">
          Obnovit stránku
        </button>
        <p>Pokud problém přetrvává, zkuste vypnout blokování cookies nebo se na stránky přihlásit v anonymním režimu.</p>
      </div>
    `;
  }
}

// Register service worker with improved error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Delay service worker registration until after page load
    setTimeout(() => {
      navigator.serviceWorker.register('/service-worker.js?v=1.5.1')
        .then(registration => {
          debugLog('Service Worker registered with scope:', registration.scope);
          
          // Force update the service worker
          registration.update()
            .then(() => debugLog('Service Worker update attempted'))
            .catch(error => debugLog('Service Worker update failed:', error));
          
          // If the service worker is waiting, we can skip waiting to apply updates now
          if (registration.waiting) {
            debugLog('New Service Worker waiting, activating immediately');
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        })
        .catch(error => {
          debugLog('Service Worker registration failed:', error);
        });
    }, 3000); // Delay registration by 3 seconds to prioritize UI rendering
  });
  
  // Handle service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    debugLog('Service Worker controller changed');
  });
}

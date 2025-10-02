
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { injectCriticalCSS } from './utils/critical-css'

// Global type declaration for window functions
declare global {
  interface Window {
    markReactLoaded?: () => void;
  }
}

// CRITICAL: Inject critical CSS FIRST for fastest FCP
injectCriticalCSS();

const startTime = performance.now();

// Render application with IMMEDIATE CONTENT for fastest FCP
try {
  // Handle redirects asynchronously to not block FCP
  import('./utils/redirectManager').then(({ handleBlogRedirects }) => {
    handleBlogRedirects();
  });
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Create root and render IMMEDIATELY for fastest FCP
  const root = createRoot(rootElement);
  
  // CRITICAL: Synchronous render - NO StrictMode for faster FCP
  root.render(<App />);
  
  // Mark React as loaded IMMEDIATELY
  if (window.markReactLoaded) {
    window.markReactLoaded();
  }
  
  // Log performance only in dev
  if (process.env.NODE_ENV === 'development') {
    const loadTime = performance.now() - startTime;
    console.log(`FCP: ${loadTime.toFixed(2)}ms`);
  }
  
  // Load main CSS after FCP to not block rendering
  requestAnimationFrame(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/index.css';
    document.head.appendChild(link);
  });
  
  // Defer ALL non-critical code far after FCP
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('./utils/code-splitting').then(mod => {
        mod.preloadCriticalRoutes();
        mod.lazyLoadHeavyComponents();
        mod.loadMapyWhenNeeded();
      });
      
      if (process.env.NODE_ENV === 'development') {
        import('./utils/performance-optimization').then(({ measureCoreWebVitals }) => {
          measureCoreWebVitals();
        });
      }
    }, { timeout: 3000 });
  }
  
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

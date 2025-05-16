
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Better error tracking with improved error information
const handleError = (error: Error, errorInfo?: React.ErrorInfo) => {
  console.error('[App Error]:', error.message);
  console.error('Stack:', error.stack);
  
  if (errorInfo) {
    console.error('Component Stack:', errorInfo.componentStack);
  }
  
  // Show a user-friendly error
  showErrorFallback(error.message);
};

// Show fallback UI if React fails to render
const showErrorFallback = (errorMessage: string) => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h1>POPRI Internet Připojení</h1>
        <p>Omlouváme se, došlo k chybě při načítání stránky.</p>
        <p style="color: #666; margin: 20px 0; font-size: 14px;">
          Technická informace: ${errorMessage || 'Neznámá chyba'}
        </p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer; background: #0066cc; color: white; border: none; border-radius: 4px;">
          Obnovit stránku
        </button>
        <div style="margin-top: 30px;">
          <a href="/?debug=true" style="color: #0066cc; text-decoration: underline;">
            Spustit v debug režimu
          </a>
        </div>
      </div>
    `;
  }
};

// Configurable error boundary to prevent white screens
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    handleError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: "20px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <h1>POPRI Internet Připojení</h1>
          <p>Omlouváme se, došlo k chybě při načítání stránky.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              cursor: "pointer",
              background: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "4px"
            }}
          >
            Obnovit stránku
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Standard React import
import React from 'react';

// Render application with error boundary
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found - check your HTML");
  }
  
  // Remove initial loading indicator if it exists
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadingEl = document.getElementById('initialLoadingIndicator');
      if (loadingEl && loadingEl.parentNode) {
        loadingEl.style.opacity = '0';
        loadingEl.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          if (loadingEl.parentNode) {
            loadingEl.parentNode.removeChild(loadingEl);
          }
        }, 500);
      }
    }, 1000);
  });
  
  // Create root with error boundary
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('Application successfully rendered');
} catch (error) {
  handleError(error as Error);
}

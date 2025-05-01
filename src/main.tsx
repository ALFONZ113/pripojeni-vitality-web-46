
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error tracking for debugging
const handleError = (error: Error) => {
  console.error('Application error:', error);
  // Zde můžete přidat kód pro odeslání chyby do analytického nástroje
};

// Pokus o vykreslení aplikace
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Root element not found in DOM");
  }
  
  const root = createRoot(rootElement);
  root.render(<App />);
  
  console.log('Application successfully rendered');
} catch (error) {
  handleError(error as Error);
  
  // Záložní vykreslení - velmi jednoduchý obsah v případě selhání Reactu
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1>PODA Internet Připojení</h1>
        <p>Omlouváme se, došlo k chybě při načítání stránky.</p>
        <p>Prosím, obnovte stránku nebo zkuste přijít později.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
          Obnovit stránku
        </button>
      </div>
    `;
  }
}

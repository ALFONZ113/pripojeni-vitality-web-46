
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Přidání časové značky
const cacheBuster = new Date().getTime();
document.documentElement.dataset.cacheBuster = cacheBuster.toString();

// Funkce pro ověření, zda byl web plně načten
function checkFullLoad() {
  // Kontroluje, zda jsou všechny styly a skripty načteny
  const allResourcesLoaded = Array.from(document.styleSheets).every(sheet => {
    try {
      return sheet.cssRules.length > 0;
    } catch (e) {
      return false; // Chyba při přístupu k pravidlům CSS (cross-origin)
    }
  });

  if (allResourcesLoaded) {
    document.body.classList.add('loaded');
    document.documentElement.classList.add('fonts-loaded');
  } else {
    // Zkusit znovu za krátkou dobu
    setTimeout(checkFullLoad, 50);
  }
}

// Spustit vykreslení aplikace
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Ověřit plné načtení po vykreslení
setTimeout(checkFullLoad, 100);

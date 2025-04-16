
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Vymazání všech cache před montáží
if ('caches' in window) {
  caches.keys().then((names) => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
}

// Přidání časové značky, aby se prohlížeč nucen znovu stáhnout prostředky
const cacheBuster = new Date().getTime();
document.documentElement.dataset.cacheBuster = cacheBuster.toString();

// Vynucení obnovení při zjištění neodpovídající verze
const lastVersion = localStorage.getItem('site-version');
const currentVersion = '2025041601'; // Aktualizováno při významných změnách
localStorage.setItem('site-version', currentVersion);

if (lastVersion && lastVersion !== currentVersion) {
  console.log('Zjištěna nová verze, vynuceno obnovení');
  window.location.reload();
}

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

// Spustit ověření načtení po vykreslení aplikace
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Ověřit plné načtení po vykreslení
setTimeout(checkFullLoad, 100);

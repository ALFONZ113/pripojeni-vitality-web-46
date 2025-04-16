
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force favicon refresh
const updateFavicon = () => {
  const links = document.querySelectorAll("link[rel*='icon']");
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('?v=')) {
      // Přidání časového razítka k URL pro vynucení obnovení cache
      const newHref = href.split('?v=')[0] + '?v=' + new Date().getTime();
      link.setAttribute('href', newHref);
    }
  });
};

// Spustíme aktualizaci favicon
updateFavicon();

// Clear router cache to ensure pages are correctly reloaded
const forceCacheUpdate = () => {
  // Add a timestamp to the URL if not already present
  if (window.location.href.indexOf('cache=') === -1) {
    const separator = window.location.href.indexOf('?') === -1 ? '?' : '&';
    const newUrl = window.location.href + separator + 'cache=' + new Date().getTime();
    window.history.replaceState(null, document.title, newUrl);
  }
};

// Run the cache update on load
forceCacheUpdate();

// Render the application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);


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
  
  // Clear any localStorage cache that might be affecting the app
  const cacheKeys = Object.keys(localStorage).filter(key => key.includes('cache') || key.includes('route'));
  cacheKeys.forEach(key => localStorage.removeItem(key));
  
  // Force a hard reload if needed
  if (window.performance && window.performance.navigation.type === 1) {
    console.log('Page was reloaded, clearing cache...');
    caches.keys().then(names => {
      names.forEach(name => {
        console.log('Deleting cache:', name);
        caches.delete(name);
      });
    });
  }
};

// Run the cache update on load
forceCacheUpdate();

// Add event listener for route changes
window.addEventListener('popstate', forceCacheUpdate);

// Render the application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

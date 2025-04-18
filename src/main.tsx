
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Force favicon refresh
const updateFavicon = () => {
  const links = document.querySelectorAll("link[rel*='icon']");
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('?v=')) {
      // Add timestamp to URL to force cache refresh
      const newHref = href.split('?v=')[0] + '?v=' + new Date().getTime();
      link.setAttribute('href', newHref);
    }
  });
};

// Run favicon update
updateFavicon();

// Enhanced cache clearing function
const forceCacheUpdate = () => {
  // Add a timestamp to the URL if not already present
  if (window.location.href.indexOf('cache=') === -1) {
    const separator = window.location.href.indexOf('?') === -1 ? '?' : '&';
    const newUrl = window.location.href + separator + 'cache=' + new Date().getTime();
    window.history.replaceState(null, document.title, newUrl);
  }
  
  // Clear localStorage cache that might affect the app
  const cacheKeys = Object.keys(localStorage).filter(key => 
    key.includes('cache') || 
    key.includes('route') || 
    key.includes('edit') || 
    key.includes('state')
  );
  cacheKeys.forEach(key => localStorage.removeItem(key));
  
  // Clear sessionStorage as well
  const sessionKeys = Object.keys(sessionStorage).filter(key => 
    key.includes('cache') || 
    key.includes('route') || 
    key.includes('edit') || 
    key.includes('state')
  );
  sessionKeys.forEach(key => sessionStorage.removeItem(key));
  
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

// Add event listeners for route changes and user interactions
window.addEventListener('popstate', forceCacheUpdate);
window.addEventListener('beforeunload', forceCacheUpdate);

// Fix for potential React Router issues with edit functionality
window.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
    e.preventDefault();
    const href = target.getAttribute('href');
    if (href) {
      // Store the current edit state if needed
      sessionStorage.setItem('lastEditPath', window.location.pathname);
      window.history.pushState({}, '', href);
      window.dispatchEvent(new Event('popstate'));
    }
  }
});

// Render the application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

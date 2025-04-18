
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global flag for edit mode
declare global {
  interface Window {
    __LOVABLE_EDIT_MODE?: boolean;
  }
}

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
  // Check if we're in edit mode
  const isEditMode = window.location.href.includes('edit=true') || 
                     document.querySelector('[data-lovable-edit="true"]') !== null;
  
  // Set the global edit mode flag
  window.__LOVABLE_EDIT_MODE = isEditMode;
  
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
  
  // Clear sessionStorage as well, but preserve edit state
  const editState = sessionStorage.getItem('editState');
  
  const sessionKeys = Object.keys(sessionStorage).filter(key => 
    (key.includes('cache') || 
    key.includes('route') || 
    key.includes('state')) &&
    key !== 'editState'
  );
  sessionKeys.forEach(key => sessionStorage.removeItem(key));
  
  // Restore edit state if needed
  if (isEditMode && editState) {
    sessionStorage.setItem('editState', editState);
  }
  
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

// Check if the edit mode has been activated
const checkEditMode = () => {
  const isEditMode = window.location.href.includes('edit=true') || 
                    document.querySelector('[data-lovable-edit="true"]') !== null;
  window.__LOVABLE_EDIT_MODE = isEditMode;
  
  if (isEditMode) {
    console.log('Edit mode is active');
    document.body.setAttribute('data-edit-mode', 'true');
    
    // Make editable elements more visible in edit mode
    const style = document.createElement('style');
    style.textContent = `
      [data-editable="true"] {
        outline: 2px dashed rgba(0, 123, 255, 0.5) !important;
        outline-offset: 2px !important;
        position: relative !important;
        cursor: pointer !important;
      }
      [data-editable="true"]:hover {
        outline: 2px dashed rgba(0, 123, 255, 0.8) !important;
        background-color: rgba(0, 123, 255, 0.05) !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Run initially and on URL changes
checkEditMode();

// Add event listeners for route changes and user interactions
window.addEventListener('popstate', () => {
  forceCacheUpdate();
  checkEditMode();
});
window.addEventListener('beforeunload', forceCacheUpdate);

// Make sure all click handlers preserve edit state
document.addEventListener('click', (e) => {
  // Check if we're in edit mode
  if (!window.__LOVABLE_EDIT_MODE) return;
  
  const target = e.target as HTMLElement;
  const linkElement = target.closest('a') as HTMLAnchorElement;
  
  if (linkElement && linkElement.getAttribute('href')?.startsWith('/')) {
    // This will be handled by the custom navigation in the Navbar component
    console.log('Edit mode link click detected');
  }
});

// Create a global event to notify when the edit mode changes
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'lovable-edit-mode-change') {
    window.__LOVABLE_EDIT_MODE = event.data.enabled;
    checkEditMode();
  }
});

// Render the application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

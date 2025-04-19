import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initEditListener, isEditMode, enableEditMode } from './utils/editMode.ts'

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
  // Check if we're in edit mode from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const editParam = urlParams.get('edit') === 'true';
  const hasEditAttribute = document.querySelector('[data-lovable-edit="true"]') !== null;
  const hasEditFlag = localStorage.getItem('lovable-edit-mode') === 'true';
  
  // Combine all possible edit mode indicators
  const isInEditMode = editParam || hasEditAttribute || hasEditFlag;
  
  // Set the global edit mode flag
  window.__LOVABLE_EDIT_MODE = isInEditMode;
  
  if (isInEditMode) {
    console.log('Edit mode activated from parameters');
    document.body.setAttribute('data-edit-mode', 'true');
    localStorage.setItem('lovable-edit-mode', 'true');
  }
  
  // Add a timestamp to the URL if not already present
  const cacheBustKey = 'cache';
  if (window.location.href.indexOf(cacheBustKey + '=') === -1) {
    const separator = window.location.href.indexOf('?') === -1 ? '?' : '&';
    const newUrl = window.location.href + separator + cacheBustKey + '=' + new Date().getTime();
    window.history.replaceState(null, document.title, newUrl);
  }
  
  // Preserve editable content in localStorage
  const editableKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('lovable-edit-')
  );
  
  const editableContent = {};
  editableKeys.forEach(key => {
    editableContent[key] = localStorage.getItem(key);
  });
  
  // Clear localStorage cache that might affect the app
  const cacheKeys = Object.keys(localStorage).filter(key => 
    key.includes('cache') || 
    key.includes('route') || 
    (key.includes('edit') && !key.startsWith('lovable-edit-')) || 
    key.includes('state')
  );
  
  cacheKeys.forEach(key => {
    // Keep lovable-edit keys
    localStorage.removeItem(key);
  });
  
  // Restore editable content
  Object.keys(editableContent).forEach(key => {
    localStorage.setItem(key, editableContent[key]);
  });
  
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
  if (isInEditMode && editState) {
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
  if (isEditMode()) {
    console.log('Edit mode is active, setting up UI indicators');
    
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
      [data-edit-mode="true"] .editable-indicator {
        display: block !important;
      }
      .editable-indicator {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 123, 255, 0.6);
        color: white;
        font-size: 9px;
        padding: 1px 4px;
        border-radius: 0 0 0 4px;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    // Add a toggle button for edit mode
    const editToggle = document.createElement('div');
    editToggle.style.position = 'fixed';
    editToggle.style.bottom = '10px';
    editToggle.style.right = '10px';
    editToggle.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
    editToggle.style.color = 'white';
    editToggle.style.padding = '5px 10px';
    editToggle.style.borderRadius = '4px';
    editToggle.style.zIndex = '9999';
    editToggle.style.cursor = 'pointer';
    editToggle.style.fontSize = '12px';
    editToggle.textContent = 'Edit Mode: ON';
    
    editToggle.addEventListener('click', () => {
      const currentState = window.__LOVABLE_EDIT_MODE;
      if (currentState) {
        // Disable edit mode
        window.__LOVABLE_EDIT_MODE = false;
        localStorage.removeItem('lovable-edit-mode');
        document.body.removeAttribute('data-edit-mode');
        editToggle.textContent = 'Edit Mode: OFF';
        editToggle.style.backgroundColor = 'rgba(108, 117, 125, 0.8)';
      } else {
        // Enable edit mode
        window.__LOVABLE_EDIT_MODE = true;
        localStorage.setItem('lovable-edit-mode', 'true');
        document.body.setAttribute('data-edit-mode', 'true');
        editToggle.textContent = 'Edit Mode: ON';
        editToggle.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
      }
      
      // Reload the page to apply changes
      window.location.reload();
    });
    
    document.body.appendChild(editToggle);
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

// Initialize edit listener
initEditListener();

// Check for edit mode in URL parameters and enable if needed
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('edit') === 'true') {
  console.log('Edit mode detected in URL, enabling...');
  enableEditMode();
}

// Render the application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

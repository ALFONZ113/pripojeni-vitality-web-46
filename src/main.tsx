
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

// Force favicon refresh to ensure we're not using cached versions
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

// Enhanced cache clearing function with better persistence of editable content
const forceCacheUpdate = () => {
  console.log('Running enhanced cache update');

  // Check for edit mode from various sources
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
  
  // Add a timestamp to the URL to force fresh content
  const cacheBustKey = 'cache';
  if (window.location.href.indexOf(cacheBustKey + '=') === -1) {
    const separator = window.location.href.indexOf('?') === -1 ? '?' : '&';
    const newUrl = window.location.href + separator + cacheBustKey + '=' + new Date().getTime();
    window.history.replaceState(null, document.title, newUrl);
  }
  
  // Save a list of all editable content keys before clearing cache
  const editableKeys = Object.keys(localStorage).filter(key => 
    key.startsWith('lovable-edit-')
  );
  
  // Backup all editable content
  const editableContent = {};
  editableKeys.forEach(key => {
    editableContent[key] = localStorage.getItem(key);
  });
  
  // Clear localStorage cache that might affect the app but preserve edit content
  const cacheKeys = Object.keys(localStorage).filter(key => 
    key.includes('cache') || 
    key.includes('route') || 
    (key.includes('edit') && !key.startsWith('lovable-edit-')) || 
    key.includes('state')
  );
  
  cacheKeys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Restore editable content to ensure it persists
  Object.keys(editableContent).forEach(key => {
    if (editableContent[key]) {
      localStorage.setItem(key, editableContent[key]);
      console.log(`Preserved editable content: ${key}`);
    }
  });
  
  // Handle sessionStorage similarly - clear cache but preserve edit state
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
    console.log('Preserved edit state during cache clearing');
  }
  
  // Force a hard reload if needed by clearing service worker caches
  if (window.performance && window.performance.navigation.type === 1) {
    console.log('Page was reloaded, clearing service worker caches...');
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          console.log('Deleting cache:', name);
          caches.delete(name);
        });
      });
    }
  }
};

// Run the cache update on load
forceCacheUpdate();

// Enhanced function to set up edit mode
const setupEditMode = () => {
  if (isEditMode()) {
    console.log('Edit mode is active, setting up enhanced UI indicators');
    
    // Add styles to make editable elements more visible
    const style = document.createElement('style');
    style.textContent = `
      [data-editable="true"] {
        outline: 3px dashed rgba(0, 123, 255, 0.5) !important;
        outline-offset: 2px !important;
        position: relative !important;
        cursor: pointer !important;
        transition: all 0.2s ease-in-out !important;
      }
      [data-editable="true"]:hover {
        outline: 3px dashed rgba(0, 123, 255, 0.8) !important;
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
        background-color: rgba(0, 123, 255, 0.7);
        color: white;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 0 0 0 4px;
        pointer-events: none;
        z-index: 9999;
      }
      #edit-mode-toggle {
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      #edit-mode-toggle:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);
    
    // Create an improved toggle button for edit mode
    const editToggle = document.createElement('div');
    editToggle.id = 'edit-mode-toggle';
    editToggle.style.position = 'fixed';
    editToggle.style.bottom = '15px';
    editToggle.style.right = '15px';
    editToggle.style.backgroundColor = 'rgba(0, 123, 255, 0.9)';
    editToggle.style.color = 'white';
    editToggle.style.padding = '8px 12px';
    editToggle.style.borderRadius = '6px';
    editToggle.style.zIndex = '9999';
    editToggle.style.cursor = 'pointer';
    editToggle.style.fontSize = '13px';
    editToggle.style.fontWeight = 'bold';
    editToggle.style.display = 'flex';
    editToggle.style.alignItems = 'center';
    editToggle.style.justifyContent = 'center';
    editToggle.textContent = 'Edit Mode: ACTIVE';
    
    // Add event listener with improved UX feedback
    editToggle.addEventListener('click', () => {
      const currentState = window.__LOVABLE_EDIT_MODE;
      
      if (currentState) {
        // Disable edit mode
        window.__LOVABLE_EDIT_MODE = false;
        localStorage.removeItem('lovable-edit-mode');
        document.body.removeAttribute('data-edit-mode');
        editToggle.textContent = 'Edit Mode: OFF';
        editToggle.style.backgroundColor = 'rgba(108, 117, 125, 0.9)';
        
        // Visual feedback
        editToggle.classList.add('transitioning');
        setTimeout(() => editToggle.classList.remove('transitioning'), 300);
      } else {
        // Enable edit mode
        window.__LOVABLE_EDIT_MODE = true;
        localStorage.setItem('lovable-edit-mode', 'true');
        document.body.setAttribute('data-edit-mode', 'true');
        editToggle.textContent = 'Edit Mode: ACTIVE';
        editToggle.style.backgroundColor = 'rgba(0, 123, 255, 0.9)';
        
        // Visual feedback
        editToggle.classList.add('transitioning');
        setTimeout(() => editToggle.classList.remove('transitioning'), 300);
      }
      
      // Show feedback toast
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '70px';
      toast.style.right = '15px';
      toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      toast.style.color = 'white';
      toast.style.padding = '8px 16px';
      toast.style.borderRadius = '4px';
      toast.style.zIndex = '10000';
      toast.style.fontSize = '14px';
      toast.textContent = currentState ? 'Edit mode disabled, reloading...' : 'Edit mode enabled, reloading...';
      
      document.body.appendChild(toast);
      
      // Reload after a short delay to allow the user to see the toast
      setTimeout(() => {
        // Add cache buster to URL
        const url = new URL(window.location.href);
        url.searchParams.set('cache_bust', Date.now().toString());
        window.location.href = url.toString();
      }, 800);
    });
    
    document.body.appendChild(editToggle);
    
    console.log('Edit mode UI enhanced and ready');
  }
};

// Run edit mode setup
setupEditMode();

// Add event listeners for route changes and user interactions
window.addEventListener('popstate', () => {
  forceCacheUpdate();
  setupEditMode();
});

// Ensure cache is updated when user leaves the page
window.addEventListener('beforeunload', () => {
  console.log('Page unloading, preserving editable content');
  
  // Create a list of editable content that needs to be preserved
  const editableKeyData = {};
  
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('lovable-edit-')) {
      editableKeyData[key] = localStorage.getItem(key);
    }
  });
  
  // Store a snapshot of editable content in sessionStorage for possible recovery
  if (Object.keys(editableKeyData).length > 0) {
    sessionStorage.setItem('editableContentSnapshot', JSON.stringify(editableKeyData));
  }
});

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

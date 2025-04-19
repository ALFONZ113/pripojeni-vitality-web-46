
/**
 * Enhanced utility functions for handling edit mode functionality with improved synchronization
 */

// Global event name constants
const CONTENT_SAVED_EVENT = 'lovableContentSaved';
const EDIT_MODE_CHANGE_EVENT = 'lovableEditModeChange';

// Initialize storage prefix
const STORAGE_PREFIX = 'lovable-edit-';

// Check if the application is currently in edit mode with improved detection
export const isEditMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  const editModeParam = urlParams.get('edit') === 'true';
  const globalEditMode = !!window.__LOVABLE_EDIT_MODE;
  const localStorageEditMode = localStorage.getItem('lovable-edit-mode') === 'true';
  const editMode = editModeParam || globalEditMode || localStorageEditMode;
  
  if (editMode) {
    console.log('Edit mode is active');
    // Set global flag for other components
    window.__LOVABLE_EDIT_MODE = true;
    // Persist to localStorage for cross-page consistency
    localStorage.setItem('lovable-edit-mode', 'true');
    // Add a data attribute to the body for CSS targeting
    document.body.setAttribute('data-edit-mode', 'true');
    
    // Broadcast edit mode state change
    window.dispatchEvent(new CustomEvent(EDIT_MODE_CHANGE_EVENT, { 
      detail: { enabled: true } 
    }));
  }
  
  return editMode;
};

// Make an element editable in Lovable with improved handling
export const makeEditable = (ref: HTMLElement | null, id: string): void => {
  if (!ref) {
    console.warn(`Cannot make element editable: element with id ${id} was not found`);
    return;
  }
  
  console.log(`Making element editable: ${id}`);
  
  // Set data attributes
  ref.setAttribute('data-editable', 'true');
  ref.setAttribute('data-edit-id', id);
  
  // Clear any existing event listeners (to avoid duplicates)
  const newElement = ref.cloneNode(true);
  if (ref.parentNode) {
    ref.parentNode.replaceChild(newElement, ref);
    ref = newElement as HTMLElement;
  }
  
  // Add click listener if in edit mode
  if (isEditMode()) {
    console.log(`Adding edit listeners to ${id}`);
    
    ref.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Create a timestamp to track this edit session
      const editTimestamp = Date.now();
      
      // Store the current element state in sessionStorage for reliability
      const editState = {
        id,
        content: ref.innerHTML,
        path: window.location.pathname,
        timestamp: editTimestamp
      };
      
      // Save the edit state for resilience during navigation
      sessionStorage.setItem('editState', JSON.stringify(editState));
      
      // Notify the Lovable editor
      window.parent.postMessage({
        type: 'lovable-edit-element',
        id,
        content: ref.innerHTML,
        timestamp: editTimestamp
      }, '*');
      
      console.log('Edit requested for', id);
      
      // Add a visual indicator that the edit was requested
      ref.style.outline = '2px solid rgba(0, 123, 255, 0.8)';
      ref.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
      
      // Add a temporary indicator that edit was requested
      const editIndicator = document.createElement('div');
      editIndicator.textContent = 'Editing...';
      editIndicator.style.position = 'absolute';
      editIndicator.style.top = '0';
      editIndicator.style.right = '0';
      editIndicator.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
      editIndicator.style.color = 'white';
      editIndicator.style.padding = '2px 6px';
      editIndicator.style.borderRadius = '0 0 0 4px';
      editIndicator.style.fontSize = '10px';
      editIndicator.style.zIndex = '1000';
      ref.style.position = 'relative';
      ref.appendChild(editIndicator);
      
      // Remove the indicator after 3 seconds
      setTimeout(() => {
        if (ref.contains(editIndicator)) {
          ref.removeChild(editIndicator);
        }
      }, 3000);
    });
    
    // Add visual indicator for editable elements
    ref.style.outline = '2px dashed rgba(0, 123, 255, 0.5)';
    ref.style.outlineOffset = '2px';
    ref.style.position = 'relative';
    ref.style.cursor = 'pointer';
    
    // Add hover effect
    ref.addEventListener('mouseenter', () => {
      ref.style.outline = '2px dashed rgba(0, 123, 255, 0.8)';
      ref.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
    });
    
    ref.addEventListener('mouseleave', () => {
      ref.style.outline = '2px dashed rgba(0, 123, 255, 0.5)';
      ref.style.backgroundColor = '';
    });
  }
};

// Enhanced hook for handling editable content with improved persistence
export const useEditableContent = (id: string, defaultContent: string): string => {
  console.log(`Fetching editable content for: ${id}, default: ${defaultContent}`);
  
  // Check for cached edited content in localStorage with proper prefix
  const storageKey = `${STORAGE_PREFIX}${id}`;
  const cachedContent = localStorage.getItem(storageKey);
  
  if (cachedContent) {
    console.log(`Found cached content for ${id}`);
  } else {
    console.log(`No cached content found for ${id}, using default`);
  }
  
  // Return cached content if available, otherwise default content
  return cachedContent || defaultContent;
};

// Enhanced save edited content function with event dispatching
export const saveEditedContent = (id: string, content: string): void => {
  console.log(`Saving content for ${id}:`, content);
  const storageKey = `${STORAGE_PREFIX}${id}`;
  
  // Save content to localStorage
  localStorage.setItem(storageKey, content);
  
  // Update any live element with this ID
  const liveElement = document.querySelector(`[data-edit-id="${id}"]`);
  if (liveElement) {
    liveElement.innerHTML = content;
    console.log(`Updated live element with ID ${id}`);
  }
  
  // Dispatch a custom event to notify components that content has changed
  const event = new CustomEvent(CONTENT_SAVED_EVENT, { 
    detail: { id, content } 
  });
  window.dispatchEvent(event);
  console.log(`Dispatched ${CONTENT_SAVED_EVENT} event for ${id}`);
};

// Improved edit listener with better error handling
export const initEditListener = (): void => {
  console.log('Initializing enhanced edit listener');
  
  // Remove any existing listeners to prevent duplicates
  window.removeEventListener('message', handleEditMessage as EventListener);
  
  // Add the message listener
  window.addEventListener('message', handleEditMessage as EventListener);
  
  // Also check localStorage for edit mode on page load
  if (localStorage.getItem('lovable-edit-mode') === 'true') {
    window.__LOVABLE_EDIT_MODE = true;
    document.body.setAttribute('data-edit-mode', 'true');
    console.log('Edit mode activated from localStorage');
  }
  
  // Try to recover edit state if any
  recoverEditState();
};

// Message handler extracted for better organization
const handleEditMessage = (event: MessageEvent): void => {
  if (!event.data) return;
  
  try {
    if (event.data.type === 'lovable-save-edit') {
      const { id, content } = event.data;
      console.log('Received edit save request for', id, content);
      
      if (id && content !== undefined) {
        saveEditedContent(id, content);
        // Clear the edit state as it's been processed
        sessionStorage.removeItem('editState');
        // Force refresh to show edited content if needed
        if (!documentHasLiveElement(id)) {
          console.log('No live element found, reloading to show changes');
          addCacheBusterToUrl();
          window.location.reload();
        }
      } else {
        console.error('Invalid edit save request:', event.data);
      }
    } else if (event.data.type === 'lovable-edit-mode-change') {
      console.log('Edit mode changed:', event.data.enabled);
      window.__LOVABLE_EDIT_MODE = event.data.enabled;
      
      if (event.data.enabled) {
        document.body.setAttribute('data-edit-mode', 'true');
        localStorage.setItem('lovable-edit-mode', 'true');
      } else {
        document.body.removeAttribute('data-edit-mode');
        localStorage.removeItem('lovable-edit-mode');
      }
      
      // Refresh the page to update editable elements
      addCacheBusterToUrl();
      window.location.reload();
    }
  } catch (error) {
    console.error('Error processing edit message:', error);
  }
};

// Check if there's a live element with the given ID
const documentHasLiveElement = (id: string): boolean => {
  return !!document.querySelector(`[data-edit-id="${id}"]`);
};

// Try to recover edit state
const recoverEditState = (): void => {
  const editStateJson = sessionStorage.getItem('editState');
  if (!editStateJson) return;
  
  try {
    const editState = JSON.parse(editStateJson);
    console.log('Recovered edit state:', editState);
    
    // Check if state is from the current page
    if (editState.path === window.location.pathname) {
      console.log('Edit state matches current path');
      
      // Check if the state is fresh (less than 5 minutes old)
      const ageInMs = Date.now() - editState.timestamp;
      if (ageInMs < 5 * 60 * 1000) {
        console.log('Edit state is fresh, can be used');
        // The edit state will be used when makeEditable is called
      } else {
        console.log('Edit state expired, clearing');
        sessionStorage.removeItem('editState');
      }
    } else {
      console.log('Edit state path mismatch, clearing');
      sessionStorage.removeItem('editState');
    }
  } catch (e) {
    console.error('Error parsing edit state', e);
    sessionStorage.removeItem('editState');
  }
};

// Add a cache buster to URL to force a fresh page load
const addCacheBusterToUrl = (): void => {
  const url = new URL(window.location.href);
  url.searchParams.set('cache_bust', Date.now().toString());
  window.history.replaceState({}, '', url.toString());
};

// Function to enable edit mode
export const enableEditMode = (): void => {
  window.__LOVABLE_EDIT_MODE = true;
  localStorage.setItem('lovable-edit-mode', 'true');
  document.body.setAttribute('data-edit-mode', 'true');
  
  // Add edit=true to URL if not already there
  const url = new URL(window.location.href);
  if (url.searchParams.get('edit') !== 'true') {
    url.searchParams.set('edit', 'true');
    window.history.replaceState({}, '', url.toString());
  }
  
  console.log('Edit mode enabled');
  
  // Broadcast edit mode state change
  window.dispatchEvent(new CustomEvent(EDIT_MODE_CHANGE_EVENT, { 
    detail: { enabled: true } 
  }));
};

// Function to disable edit mode
export const disableEditMode = (): void => {
  window.__LOVABLE_EDIT_MODE = false;
  localStorage.removeItem('lovable-edit-mode');
  document.body.removeAttribute('data-edit-mode');
  
  // Remove edit=true from URL
  const url = new URL(window.location.href);
  if (url.searchParams.has('edit')) {
    url.searchParams.delete('edit');
    window.history.replaceState({}, '', url.toString());
  }
  
  console.log('Edit mode disabled');
  
  // Broadcast edit mode state change
  window.dispatchEvent(new CustomEvent(EDIT_MODE_CHANGE_EVENT, { 
    detail: { enabled: false } 
  }));
};

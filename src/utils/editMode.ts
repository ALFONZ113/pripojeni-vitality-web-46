
/**
 * Utility functions for handling edit mode functionality
 */

// Check if the application is currently in edit mode
export const isEditMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  const editModeParam = urlParams.get('edit') === 'true';
  const globalEditMode = !!window.__LOVABLE_EDIT_MODE;
  const editMode = editModeParam || globalEditMode;
  
  if (editMode) {
    console.log('Edit mode is active');
    // Set global flag for other components
    window.__LOVABLE_EDIT_MODE = true;
    // Add a data attribute to the body for CSS targeting
    document.body.setAttribute('data-edit-mode', 'true');
  }
  
  return editMode;
};

// Make an element editable in Lovable
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
      
      // Notify the Lovable editor
      window.parent.postMessage({
        type: 'lovable-edit-element',
        id,
        content: ref.innerHTML
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

// Custom hook for handling editable content
export const useEditableContent = (id: string, defaultContent: string): string => {
  console.log(`Fetching editable content for: ${id}, default: ${defaultContent}`);
  
  // Check for cached edited content in localStorage
  const cachedContent = localStorage.getItem(`lovable-edit-${id}`);
  
  if (cachedContent) {
    console.log(`Found cached content for ${id}`);
  }
  
  // Return cached content if available, otherwise default content
  return cachedContent || defaultContent;
};

// Save edited content
export const saveEditedContent = (id: string, content: string): void => {
  console.log(`Saving content for ${id}:`, content);
  localStorage.setItem(`lovable-edit-${id}`, content);
  
  // Dispatch a custom event to notify components that content has changed
  const event = new CustomEvent('lovableContentSaved', { 
    detail: { id, content } 
  });
  window.dispatchEvent(event);
};

// Listen for edit content messages
export const initEditListener = (): void => {
  console.log('Initializing edit listener');
  
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'lovable-save-edit') {
      const { id, content } = event.data;
      console.log('Received edit save request for', id, content);
      saveEditedContent(id, content);
      
      // Force refresh to show edited content
      window.location.reload();
    } else if (event.data && event.data.type === 'lovable-edit-mode-change') {
      console.log('Edit mode changed:', event.data.enabled);
      window.__LOVABLE_EDIT_MODE = event.data.enabled;
      
      if (event.data.enabled) {
        document.body.setAttribute('data-edit-mode', 'true');
      } else {
        document.body.removeAttribute('data-edit-mode');
      }
      
      // Refresh the page to update editable elements
      window.location.reload();
    }
  });
  
  // Also check localStorage for edit mode on page load
  if (localStorage.getItem('lovable-edit-mode') === 'true') {
    window.__LOVABLE_EDIT_MODE = true;
    document.body.setAttribute('data-edit-mode', 'true');
  }
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
};


/**
 * Utility functions for handling edit mode functionality
 */

// Check if the application is currently in edit mode
export const isEditMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  const editMode = urlParams.get('edit') === 'true' || !!window.__LOVABLE_EDIT_MODE;
  
  if (editMode) {
    console.log('Edit mode is active');
  }
  
  return editMode;
};

// Make an element editable in Lovable
export const makeEditable = (ref: HTMLElement | null, id: string): void => {
  if (!ref) return;
  
  ref.setAttribute('data-editable', 'true');
  ref.setAttribute('data-edit-id', id);
  
  // Add click listener if in edit mode
  if (isEditMode()) {
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
  // Check for cached edited content in localStorage
  const cachedContent = localStorage.getItem(`lovable-edit-${id}`);
  
  // Return cached content if available, otherwise default content
  return cachedContent || defaultContent;
};

// Save edited content
export const saveEditedContent = (id: string, content: string): void => {
  console.log(`Saving content for ${id}:`, content);
  localStorage.setItem(`lovable-edit-${id}`, content);
};

// Listen for edit content messages
export const initEditListener = (): void => {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'lovable-save-edit') {
      const { id, content } = event.data;
      console.log('Received edit save request for', id, content);
      saveEditedContent(id, content);
      
      // Refresh the page to show edited content
      window.location.reload();
    }
  });
};

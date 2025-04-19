
/**
 * Utility functions for handling edit mode functionality
 */

// Check if the application is currently in edit mode
export const isEditMode = (): boolean => {
  return !!window.__LOVABLE_EDIT_MODE;
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
  localStorage.setItem(`lovable-edit-${id}`, content);
};

// Listen for edit content messages
export const initEditListener = (): void => {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'lovable-save-edit') {
      const { id, content } = event.data;
      saveEditedContent(id, content);
      
      // Refresh the page to show edited content
      window.location.reload();
    }
  });
};

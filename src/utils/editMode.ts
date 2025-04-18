
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
  // In a real implementation, this would check for edited content
  return defaultContent;
};


import { useRef, useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { makeEditable, useEditableContent, isEditMode } from '../utils/editMode';

export type EditableContentRefs = {
  descriptionRef: React.RefObject<HTMLParagraphElement>;
  internetPriceRef: React.RefObject<HTMLSpanElement>;
  tvPriceRef: React.RefObject<HTMLSpanElement>;
  comboPriceRef: React.RefObject<HTMLSpanElement>;
};

export type EditableContentValues = {
  editableDescription: string;
  editableInternetPrice: string;
  editableTvPrice: string;
  editableComboPrice: string;
};

export const useEditableCity = (cityName: string, initialDescription: string, prices: {
  internet: string;
  tv: string;
  combo: string;
}) => {
  const { toast } = useToast();
  const [editInitialized, setEditInitialized] = useState(false);
  
  const refs: EditableContentRefs = {
    descriptionRef: useRef<HTMLParagraphElement>(null),
    internetPriceRef: useRef<HTMLSpanElement>(null),
    tvPriceRef: useRef<HTMLSpanElement>(null),
    comboPriceRef: useRef<HTMLSpanElement>(null)
  };
  
  const cityKey = cityName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  const contentValues: EditableContentValues = {
    editableDescription: useEditableContent(`${cityKey}-description`, initialDescription),
    editableInternetPrice: useEditableContent(`${cityKey}-internet-price`, prices.internet),
    editableTvPrice: useEditableContent(`${cityKey}-tv-price`, prices.tv),
    editableComboPrice: useEditableContent(`${cityKey}-combo-price`, prices.combo)
  };

  const initializeEditableElements = useCallback(() => {
    console.log(`Initializing editable elements for: ${cityName}`);
    
    if (refs.descriptionRef.current) {
      makeEditable(refs.descriptionRef.current, `${cityKey}-description`);
    }
    
    if (refs.internetPriceRef.current) {
      makeEditable(refs.internetPriceRef.current, `${cityKey}-internet-price`);
    }
    
    if (refs.tvPriceRef.current) {
      makeEditable(refs.tvPriceRef.current, `${cityKey}-tv-price`);
    }
    
    if (refs.comboPriceRef.current) {
      makeEditable(refs.comboPriceRef.current, `${cityKey}-combo-price`);
    }
    
    setEditInitialized(true);
    
    if (isEditMode()) {
      toast({
        title: "Edit mód je aktivní",
        description: `Klikněte na zvýrazněné prvky pro úpravu obsahu v ${cityName}.`,
        duration: 5000,
      });
    }
  }, [cityName, cityKey, toast]);

  useEffect(() => {
    setEditInitialized(false);
    
    const timer = setTimeout(() => {
      initializeEditableElements();
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [cityName, initializeEditableElements]);
  
  useEffect(() => {
    const handleContentSaved = (event: CustomEvent) => {
      console.log('Content saved event detected:', event.detail);
      
      toast({
        title: "Změny uloženy",
        description: `Upravený obsah pro ${cityName} byl úspěšně uložen.`,
        duration: 3000,
      });
      
      setEditInitialized(false);
      setTimeout(() => initializeEditableElements(), 100);
    };
    
    window.addEventListener('lovableContentSaved', handleContentSaved as EventListener);
    
    return () => {
      window.removeEventListener('lovableContentSaved', handleContentSaved as EventListener);
    };
  }, [cityName, initializeEditableElements, toast]);

  return {
    ...refs,
    ...contentValues,
    editModeActive: isEditMode()
  };
};

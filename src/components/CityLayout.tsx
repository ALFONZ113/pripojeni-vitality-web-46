import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { makeEditable, useEditableContent, isEditMode } from '../utils/editMode';
import HeroSection from './city/HeroSection';
import PriceCard from './city/PriceCard';
import CoverageMap from './city/CoverageMap';
import FAQSection from './city/FAQSection';

type CityLayoutProps = {
  cityName: string;
  cityDescription: string;
  metaTitle: string;
  metaDescription: string;
  benefits: string[];
  prices: {
    internet: string;
    tv: string;
    combo: string;
  };
};

const CityLayout: React.FC<CityLayoutProps> = ({
  cityName,
  cityDescription,
  metaTitle,
  metaDescription,
  benefits,
  prices
}) => {
  const { toast } = useToast();
  const [editInitialized, setEditInitialized] = useState(false);
  
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const internetPriceRef = useRef<HTMLSpanElement>(null);
  const tvPriceRef = useRef<HTMLSpanElement>(null);
  const comboPriceRef = useRef<HTMLSpanElement>(null);
  
  const cityKey = cityName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const editableDescription = useEditableContent(`${cityKey}-description`, cityDescription);
  const editableInternetPrice = useEditableContent(`${cityKey}-internet-price`, prices.internet);
  const editableTvPrice = useEditableContent(`${cityKey}-tv-price`, prices.tv);
  const editableComboPrice = useEditableContent(`${cityKey}-combo-price`, prices.combo);

  console.log(`CityLayout rendering for ${cityName} with prices:`, {
    internet: editableInternetPrice,
    tv: editableTvPrice,
    combo: editableComboPrice
  });

  const initializeEditableElements = useCallback(() => {
    console.log(`Initializing editable elements for: ${cityName}`);
    
    if (descriptionRef.current) {
      makeEditable(descriptionRef.current, `${cityKey}-description`);
    } else {
      console.warn(`Description ref not found for ${cityName}`);
    }
    
    if (internetPriceRef.current) {
      makeEditable(internetPriceRef.current, `${cityKey}-internet-price`);
    } else {
      console.warn(`Internet price ref not found for ${cityName}`);
    }
    
    if (tvPriceRef.current) {
      makeEditable(tvPriceRef.current, `${cityKey}-tv-price`);
    } else {
      console.warn(`TV price ref not found for ${cityName}`);
    }
    
    if (comboPriceRef.current) {
      makeEditable(comboPriceRef.current, `${cityKey}-combo-price`);
    } else {
      console.warn(`Combo price ref not found for ${cityName}`);
    }
    
    setEditInitialized(true);
    console.log(`Editable elements initialized for: ${cityName}`);
    
    if (isEditMode()) {
      toast({
        title: "Edit mód je aktivní",
        description: `Klikněte na zvýrazněné prvky pro úpravu obsahu v ${cityName}.`,
        duration: 5000,
      });
    }
  }, [cityName, cityKey, toast]);

  useEffect(() => {
    document.title = metaTitle;
    
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDescription);
    }
    
    window.scrollTo(0, 0);
    
    setEditInitialized(false);
    
    const timer = setTimeout(() => {
      initializeEditableElements();
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [cityName, metaTitle, metaDescription, initializeEditableElements]);
  
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
  
  const editModeActive = isEditMode();
  console.log(`Edit mode is: ${editModeActive ? 'ACTIVE' : 'INACTIVE'} for ${cityName}`);

  return (
    <div className="pt-32 pb-20">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <HeroSection
          cityName={cityName}
          description={cityDescription}
          benefits={benefits}
          descriptionRef={descriptionRef}
          editableDescription={editableDescription}
        />
        <PriceCard
          cityName={cityName}
          internetPriceRef={internetPriceRef}
          tvPriceRef={tvPriceRef}
          comboPriceRef={comboPriceRef}
          editableInternetPrice={editableInternetPrice}
          editableTvPrice={editableTvPrice}
          editableComboPrice={editableComboPrice}
        />
      </div>
      <CoverageMap cityName={cityName} />
      <FAQSection cityName={cityName} />
    </div>
  );
};

export default CityLayout;

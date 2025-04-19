
import React, { useEffect } from 'react';
import HeroSection from './city/HeroSection';
import PriceCard from './city/PriceCard';
import CoverageMap from './city/CoverageMap';
import FAQSection from './city/FAQSection';
import { useEditableCity } from '../hooks/useEditableCity';

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
  const {
    descriptionRef,
    internetPriceRef,
    tvPriceRef,
    comboPriceRef,
    editableDescription,
    editableInternetPrice,
    editableTvPrice,
    editableComboPrice,
    editModeActive
  } = useEditableCity(cityName, cityDescription, prices);

  useEffect(() => {
    document.title = metaTitle;
    
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', metaDescription);
    }
    
    window.scrollTo(0, 0);
  }, [metaTitle, metaDescription]);

  console.log(`CityLayout rendering for ${cityName} with prices:`, {
    internet: editableInternetPrice,
    tv: editableTvPrice,
    combo: editableComboPrice
  });

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

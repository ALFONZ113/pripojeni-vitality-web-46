
import { Check, Info, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TariffFeature {
  title: string;
  description: string;
}

interface PromoInfoState {
  bytyBasic: boolean;
  bytyMych10: boolean;
  domyBasic: boolean;
  domyMych10: boolean;
}

interface TariffCardProps {
  title: string;
  price: string;
  priceNote: string;
  promoId: keyof PromoInfoState;
  isPromo?: boolean;
  isRecommended?: boolean;
  features: TariffFeature[];
  openPromoInfo: PromoInfoState;
  onPromoInfoToggle: (tariff: keyof PromoInfoState) => void;
  promoInfoText: string;
}

const TariffCard = ({
  title,
  price,
  priceNote,
  promoId,
  isPromo = false,
  isRecommended = false,
  features,
  openPromoInfo,
  onPromoInfoToggle,
  promoInfoText
}: TariffCardProps) => {
  return (
    <div className="tariff-card group h-full flex flex-col">
      {isPromo && (
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
          <span className="promo-tag text-xs">Promo tarif</span>
        </div>
      )}
      {isRecommended && (
        <div className="recommended-badge px-4 sm:px-[22px] mx-3 sm:mx-[15px] my-8 sm:my-[36px] py-0 text-xs sm:text-sm">
          Doporučujeme
        </div>
      )}
      
      <div className="tariff-header">
        <h3 className="text-lg sm:text-xl font-bold px-2 sm:px-0">{title}</h3>
      </div>
      
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="mb-4 sm:mb-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-poda-blue">{price}</div>
            <div className="text-gray-500 text-xs sm:text-sm">{priceNote}</div>
            <Collapsible
              open={openPromoInfo[promoId]}
              onOpenChange={() => onPromoInfoToggle(promoId)}
              className="mt-1"
            >
              <CollapsibleTrigger className="flex items-center justify-center mx-auto text-gray-400 hover:text-gray-600 transition-colors">
                <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                <span className="text-xs">Více o ceně</span>
                <ChevronDown 
                  className="h-3 w-3 ml-1 transition-transform duration-200" 
                  style={{ transform: openPromoInfo[promoId] ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                {promoInfoText}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-poda-orange mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base">{feature.title}</p>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Link 
          to="/kontakt" 
          className={`btn-${isRecommended ? 'secondary' : 'primary'} 
                     w-full flex justify-center text-sm sm:text-base py-2 sm:py-3 mt-auto`}
        >
          Mám zájem
        </Link>
      </div>
    </div>
  );
};

export default TariffCard;

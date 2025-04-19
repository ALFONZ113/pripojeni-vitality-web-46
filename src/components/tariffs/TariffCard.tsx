
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type TariffCardProps = {
  title: string;
  price: string;
  deviceFee: string;
  features: {
    title: string;
    description: string;
  }[];
  isRecommended?: boolean;
  promoInfoOpen: boolean;
  onPromoInfoToggle: () => void;
  promoDescription: string;
};

const TariffCard = ({
  title,
  price,
  deviceFee,
  features,
  isRecommended,
  promoInfoOpen,
  onPromoInfoToggle,
  promoDescription,
}: TariffCardProps) => {
  return (
    <div className="tariff-card group">
      <div className="absolute top-4 left-4">
        <span className="promo-tag">Promo tarif</span>
      </div>
      {isRecommended && (
        <div className="recommended-badge px-[22px] mx-[15px] my-[36px] py-0">
          Doporučujeme
        </div>
      )}
      <div className="tariff-header">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-poda-blue">{price} Kč</div>
            <div className="text-gray-500 text-sm">měsíčně + {deviceFee} Kč za zařízení</div>
            <Collapsible
              open={promoInfoOpen}
              onOpenChange={onPromoInfoToggle}
              className="mt-1"
            >
              <CollapsibleTrigger className="flex items-center justify-center mx-auto text-gray-400 hover:text-gray-600 transition-colors">
                <Info className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Více o ceně</span>
                <ChevronDown 
                  className="h-3 w-3 ml-1 transition-transform duration-200" 
                  style={{ transform: promoInfoOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                {promoDescription}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-poda-orange mr-3 mt-0.5" />
              <div>
                <p className="font-medium">{feature.title}</p>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/kontakt" className={`btn-${isRecommended ? 'secondary' : 'primary'} w-full flex justify-center`}>
          Mám zájem
        </Link>
      </div>
    </div>
  );
};

export default TariffCard;


import { Check, Info, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedCollapsible, OptimizedCollapsibleContent, OptimizedCollapsibleTrigger } from '@/components/ui/optimized-collapsible';

interface TariffFeature {
  title: string;
  description: string;
}

// Define the expected shape of the openPromoInfo object
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
    <div className="tariff-card group">
      {isPromo && (
        <div className="absolute top-4 left-4">
          <span className="promo-tag">Promo tarif</span>
        </div>
      )}
      {isRecommended && (
        <div className="recommended-badge px-[22px] mx-[15px] my-[36px] py-0">Doporučujeme</div>
      )}
      <div className="tariff-header">
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-poda-blue">{price}</div>
            <div className="text-gray-500 text-sm">{priceNote}</div>
            <OptimizedCollapsible
              open={openPromoInfo[promoId]}
              onOpenChange={() => onPromoInfoToggle(promoId)}
              className="mt-1"
            >
              <OptimizedCollapsibleTrigger className="flex items-center justify-center mx-auto text-gray-400 hover:text-gray-600 transition-colors">
                <Info className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Více o ceně</span>
                <ChevronDown 
                  className="h-3 w-3 ml-1 transition-transform duration-200" 
                  style={{ transform: openPromoInfo[promoId] ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                />
              </OptimizedCollapsibleTrigger>
              <OptimizedCollapsibleContent className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
                {promoInfoText}
              </OptimizedCollapsibleContent>
            </OptimizedCollapsible>
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

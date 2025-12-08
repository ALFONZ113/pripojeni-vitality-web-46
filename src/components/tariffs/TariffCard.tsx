import { Check, Info, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

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
    <div className={`relative bg-card rounded-2xl border transition-all duration-500 overflow-hidden group h-full ${
      isRecommended 
        ? 'border-primary/50 shadow-[0_0_60px_-15px_hsl(38,92%,50%,0.3)]' 
        : 'border-border/50 hover:border-primary/30'
    }`}>
      {/* Recommended Glow */}
      {isRecommended && (
        <div className="absolute -inset-px bg-gradient-to-b from-primary/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
      )}
      
      {/* Promo Badge */}
      {isPromo && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground py-1.5 px-3 rounded-full text-xs font-bold shadow-lg">
            <Sparkles className="w-3 h-3" />
            Promo tarif
          </span>
        </div>
      )}
      
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-primary text-primary-foreground py-1.5 px-3 rounded-full text-xs font-bold uppercase tracking-wide">
            Doporučujeme
          </span>
        </div>
      )}
      
      {/* Header */}
      <div className={`px-6 py-5 ${isRecommended ? 'bg-gradient-to-r from-primary/10 to-transparent' : ''}`}>
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">{title}</h3>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-6 text-center">
          <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-1">{price}</div>
          <div className="text-muted-foreground text-sm">{priceNote}</div>
          
          <Collapsible
            open={openPromoInfo[promoId]}
            onOpenChange={() => onPromoInfoToggle(promoId)}
            className="mt-2"
          >
            <CollapsibleTrigger className="flex items-center justify-center mx-auto text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Více o ceně</span>
              <ChevronDown 
                className={`h-3 w-3 ml-1 transition-transform duration-200 ${openPromoInfo[promoId] ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg border border-border/50">
              {promoInfoText}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start group/feature">
              <div className="bg-primary/10 rounded-lg p-1.5 mr-3 mt-0.5 group-hover/feature:bg-primary/20 transition-colors">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{feature.title}</p>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <Button 
          variant={isRecommended ? 'gold' : 'noir'} 
          size="lg" 
          className="w-full" 
          asChild
        >
          <Link to="/kontakt">
            Mám zájem
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TariffCard;

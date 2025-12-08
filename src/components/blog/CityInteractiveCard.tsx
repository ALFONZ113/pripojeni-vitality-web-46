import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Phone, MapPin, Wifi, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CityInteractiveCardProps {
  cityName: string;
  coverage: string;
  speed: string;
  price: string;
  specialOffer?: string;
  features: string[];
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'amber'; // kept for backwards compatibility but ignored
}

const CityInteractiveCard = ({
  cityName,
  coverage,
  speed,
  price,
  specialOffer,
  features
}: CityInteractiveCardProps) => {
  return (
    <Card className="bg-card border border-border/30 hover:border-primary/30 hover:shadow-gold-glow/30 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-border/30">
        <CardTitle className="flex items-center gap-2 font-heading text-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          {cityName}
        </CardTitle>
        {specialOffer && (
          <div className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-medium">
            🎯 {specialOffer}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 text-muted-foreground">
                <Wifi className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Pokrytí</span>
              </div>
              <div className="text-lg font-bold text-primary">{coverage}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 text-muted-foreground">
                <Star className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Rychlost</span>
              </div>
              <div className="text-lg font-bold text-foreground">{speed}</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Cena od</div>
            <div className="text-2xl font-bold text-primary">{price}</div>
          </div>
          
          <div className="bg-secondary/50 p-3 rounded-lg border border-border/30">
            <h4 className="font-semibold text-sm text-foreground mb-2">Výhody:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-xs flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3 w-3 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Link to="/kontakt" className="flex-1">
              <EnhancedButton variant="gold" className="w-full" size="sm">
                💬 Získat nabídku
              </EnhancedButton>
            </Link>
            <a href="tel:+420730431313" className="flex-1">
              <EnhancedButton variant="outline" className="w-full" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Zavolat
              </EnhancedButton>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityInteractiveCard;

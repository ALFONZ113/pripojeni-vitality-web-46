
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Phone, MapPin, Wifi, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CityInteractiveCardProps {
  cityName: string;
  coverage: string;
  speed: string;
  price: string;
  specialOffer?: string;
  features: string[];
  color: 'blue' | 'green' | 'purple' | 'orange' | 'amber';
}

const colorVariants = {
  blue: {
    gradient: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  green: {
    gradient: 'from-green-500 to-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    button: 'bg-green-600 hover:bg-green-700'
  },
  purple: {
    gradient: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    button: 'bg-purple-600 hover:bg-purple-700'
  },
  orange: {
    gradient: 'from-orange-500 to-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-800',
    button: 'bg-orange-600 hover:bg-orange-700'
  },
  amber: {
    gradient: 'from-amber-500 to-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    button: 'bg-amber-600 hover:bg-amber-700'
  }
};

const CityInteractiveCard = ({
  cityName,
  coverage,
  speed,
  price,
  specialOffer,
  features,
  color
}: CityInteractiveCardProps) => {
  const colors = colorVariants[color];

  return (
    <Card className={`${colors.bg} ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      <CardHeader className={`bg-gradient-to-r ${colors.gradient} text-white`}>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {cityName}
        </CardTitle>
        {specialOffer && (
          <div className="bg-white/20 px-2 py-1 rounded text-sm font-medium">
            🎯 {specialOffer}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Wifi className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Pokrytí</span>
              </div>
              <div className="text-lg font-bold text-green-600">{coverage}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Rychlost</span>
              </div>
              <div className="text-lg font-bold text-poda-blue">{speed}</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-600">Cena od</div>
            <div className="text-2xl font-bold text-poda-orange">{price}</div>
          </div>
          
          <div className={`${colors.bg} p-3 rounded-lg`}>
            <h4 className={`font-semibold text-sm ${colors.text} mb-2`}>Výhody:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-xs flex items-center gap-1">
                  <span className="text-green-500">✅</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Link to="/kontakt" className="flex-1">
              <EnhancedButton className={`w-full ${colors.button} text-white`} size="sm">
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

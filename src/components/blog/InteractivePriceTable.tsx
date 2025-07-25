
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Check, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TariffOption {
  name: string;
  speed: string;
  price: string;
  originalPrice?: string;
  features: string[];
  isPopular?: boolean;
  citySpecific?: string;
}

interface InteractivePriceTableProps {
  title: string;
  subtitle?: string;
  tariffs: TariffOption[];
}

const InteractivePriceTable = ({ title, subtitle, tariffs }: InteractivePriceTableProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-poda-blue mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tariffs.map((tariff, index) => (
          <Card key={index} className={`relative ${tariff.isPopular ? 'ring-2 ring-poda-orange shadow-lg scale-105' : 'hover:shadow-md'} transition-all duration-300`}>
            {tariff.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-poda-orange text-white px-4 py-1 rounded-full text-sm font-bold">
                  🌟 NEJPOPULÁRNĚJŠÍ
                </span>
              </div>
            )}
            
            <CardHeader className={`text-center ${tariff.isPopular ? 'bg-gradient-to-br from-poda-orange to-orange-600 text-white' : 'bg-gray-50'}`}>
              <CardTitle className={`text-lg ${tariff.isPopular ? 'text-white' : 'text-poda-blue'}`}>
                {tariff.name}
              </CardTitle>
              <div className={`text-sm ${tariff.isPopular ? 'text-orange-100' : 'text-gray-600'}`}>
                {tariff.speed}
              </div>
              {tariff.citySpecific && (
                <div className={`text-xs ${tariff.isPopular ? 'text-orange-200' : 'text-gray-500'}`}>
                  {tariff.citySpecific}
                </div>
              )}
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="text-center mb-6">
                {tariff.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    {tariff.originalPrice}
                  </div>
                )}
                <div className="text-3xl font-bold text-poda-blue">
                  {tariff.price}
                </div>
                <div className="text-sm text-gray-600">měsíčně</div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {tariff.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-2">
                <Link to="/kontakt" className="block">
                  <EnhancedButton 
                    className={`w-full ${tariff.isPopular ? 'bg-poda-orange hover:bg-orange-600' : 'bg-poda-blue hover:bg-blue-700'} text-white`}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Objednat online
                  </EnhancedButton>
                </Link>
                <a href="tel:+420730431313" className="block">
                  <EnhancedButton variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    730 431 313
                  </EnhancedButton>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-800 mb-3">
            <strong>💡 Nezapomeňte:</strong> Všechny ceny jsou konečné bez skrytých poplatků. PODA nemá aktivační poplatky ani minimální vázanost!
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/kontakt">
              <EnhancedButton variant="outline" size="sm">
                📋 Porovnat všechny tarify
              </EnhancedButton>
            </Link>
            <a href="tel:+420730431313">
              <EnhancedButton size="sm" className="bg-poda-blue hover:bg-blue-700 text-white">
                📞 Poradenství zdarma
              </EnhancedButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePriceTable;

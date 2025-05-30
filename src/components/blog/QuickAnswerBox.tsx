
import { CheckCircle, Info, Lightbulb, AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface QuickAnswerBoxProps {
  type: 'tip' | 'info' | 'warning' | 'success';
  title: string;
  content: string;
  className?: string;
  showContactCTA?: boolean;
  category?: string;
}

const QuickAnswerBox = ({ 
  type, 
  title, 
  content, 
  className = '', 
  showContactCTA = false,
  category 
}: QuickAnswerBoxProps) => {
  const config = {
    tip: {
      icon: Lightbulb,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-800'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      titleColor: 'text-green-800'
    }
  };

  const { icon: Icon, bgColor, borderColor, iconColor, titleColor } = config[type];

  const getContextualCTA = (category?: string) => {
    if (category === 'Technologie') {
      return 'Potrebujete pomoc s technickým nastavením?';
    }
    if (category === 'Služby') {
      return 'Chcete sa dozvedieť viac o našich službách?';
    }
    return 'Máte otázky? Radi pomôžeme!';
  };

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-r-lg my-6 ${className}`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-1">
          <h4 className={`font-semibold ${titleColor} mb-1`}>{title}</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
          
          {showContactCTA && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3">{getContextualCTA(category)}</p>
              <div className="flex space-x-2">
                <a 
                  href="tel:+420774100200"
                  className="inline-flex items-center px-3 py-1.5 bg-poda-blue text-white rounded-md hover:bg-poda-blue-dark transition-colors text-xs"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Zavolať
                </a>
                <a 
                  href="/kontakt"
                  className="inline-flex items-center px-3 py-1.5 border border-poda-blue text-poda-blue rounded-md hover:bg-blue-50 transition-colors text-xs"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Napísať
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickAnswerBox;

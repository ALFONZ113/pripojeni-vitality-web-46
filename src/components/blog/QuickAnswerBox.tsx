
import { CheckCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';

interface QuickAnswerBoxProps {
  type: 'tip' | 'info' | 'warning' | 'success';
  title: string;
  content: string;
  className?: string;
}

const QuickAnswerBox = ({ type, title, content, className = '' }: QuickAnswerBoxProps) => {
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

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 p-4 rounded-r-lg my-6 ${className}`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${iconColor} mt-0.5 mr-3 flex-shrink-0`} />
        <div>
          <h4 className={`font-semibold ${titleColor} mb-1`}>{title}</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickAnswerBox;

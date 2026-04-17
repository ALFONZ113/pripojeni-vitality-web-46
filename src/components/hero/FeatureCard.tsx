import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useAnimateOnView } from '@/hooks/use-animate-on-view';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBgColor: string;
  index: number;
  className?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  iconColor, 
  iconBgColor, 
  index, 
  className = "" 
}: FeatureCardProps) => {
  const { ref, isVisible } = useAnimateOnView();

  return (
    <article 
      ref={ref}
      className={`glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-500 ${
        isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className="flex items-start">
        <div className={`${iconBgColor} p-3 rounded-lg mr-4 flex items-center justify-center`} aria-hidden="true">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <h3 className="font-semibold text-xl text-poda-blue mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default React.memo(FeatureCard);

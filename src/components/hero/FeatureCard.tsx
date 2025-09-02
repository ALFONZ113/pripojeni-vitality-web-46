
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const featureCardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 0.2 + index * 0.1
      }
    })
  };

  return (
    <motion.article 
      initial="offscreen" 
      whileInView="onscreen" 
      viewport={{
        once: true,
        amount: 0.2
      }} 
      custom={index} 
      variants={featureCardVariants} 
      className={`glass-card rounded-xl p-4 sm:p-5 lg:p-6 border border-white/20 shadow-xl backdrop-blur-md 
                  no-touch:hover:shadow-2xl transition-all duration-300 active:scale-95 ${className}`}
    >
      <div className="flex items-start">
        <div className={`${iconBgColor} p-2.5 sm:p-3 lg:p-3.5 rounded-lg mr-3 sm:mr-4 flex items-center justify-center flex-shrink-0`} aria-hidden="true">
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-poda-blue mb-2 leading-tight">{title}</h3>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.article>
  );
};

export default FeatureCard;

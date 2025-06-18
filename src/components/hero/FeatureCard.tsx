
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
      y: 60,
      opacity: 0,
      scale: 0.9
    },
    onscreen: (index: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1,
        delay: 0.3 + index * 0.15
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
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`glass-card rounded-2xl p-8 border border-white/30 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-500 premium-hover ${className}`}
    >
      <div className="flex items-start space-x-5">
        <div className={`${iconBgColor} p-4 rounded-2xl flex items-center justify-center shadow-lg`} aria-hidden="true">
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-poda-blue mb-3 premium-text-shadow">{title}</h3>
          <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
        </div>
      </div>
    </motion.article>
  );
};

export default FeatureCard;

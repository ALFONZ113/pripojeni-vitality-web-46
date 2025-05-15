
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
      className={`glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all ${className}`}
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
    </motion.article>
  );
};

export default FeatureCard;


import React from 'react';
import { motion } from 'framer-motion';
import CallbackForm from '../CallbackForm';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';
import HeroActions from './HeroActions';
import { item } from './heroAnimations';

interface HeroContentProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContent = ({ handleContactClick }: HeroContentProps) => {
  return (
    <div className="text-center lg:text-left">
      <HeroTitle item={item} />
      <HeroDescription item={item} />
      
      {/* Callback Form - Adjusted for better mobile visibility */}
      <motion.div variants={item} className="mb-6">
        <CallbackForm />
      </motion.div>
      
      <HeroActions item={item} handleContactClick={handleContactClick} />
    </div>
  );
};

export default HeroContent;

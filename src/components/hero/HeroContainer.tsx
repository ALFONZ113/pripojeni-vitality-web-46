
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import FastHeroContent from './FastHeroContent';
import FeatureCardsDesktop from './FeatureCardsDesktop';
import MobileFeatureCards from './MobileFeatureCards';
import DisclaimerText from './DisclaimerText';
import HeroSideDecorations from './HeroSideDecorations';
import { useState, useEffect } from 'react';

interface HeroContainerProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContainer = ({ handleContactClick }: HeroContainerProps) => {
  const [showAnimations, setShowAnimations] = useState(false);
  
  // Enable animations after initial render to optimize LCP
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimations(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };
  
  return (
    <>
      <HeroBackground />
      <HeroSideDecorations />

      <div className="container-custom relative z-10">
        {showAnimations ? (
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" initial="hidden" animate="show" variants={container}>
            <HeroContent handleContactClick={handleContactClick} />
            <FeatureCardsDesktop />
            <MobileFeatureCards />
          </motion.div>
        ) : (
          // Fast render for LCP - no animations
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" style={{ opacity: 1 }}>
            <FastHeroContent handleContactClick={handleContactClick} />
            <FeatureCardsDesktop />
            <MobileFeatureCards />
          </div>
        )}

        <DisclaimerText />
      </div>
    </>
  );
};

export default HeroContainer;

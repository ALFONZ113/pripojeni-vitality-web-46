
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import FastHeroContent from './FastHeroContent';
import FeatureCardsDesktop from './FeatureCardsDesktop';
import MobileFeatureCards from './MobileFeatureCards';
import HeroImage from './HeroImage';
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
      
      {/* Mobile Hero Image Background */}
      <div className="absolute inset-0 lg:hidden z-0">
        <HeroImage
          desktopSrc="/images/hero-family-desktop.jpg"
          mobileSrc="/images/hero-family-mobile.jpg"
          alt="Šťastná rodina užívající si rychlý PODA internet a TV"
          className="opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="container-custom relative z-10">
        {showAnimations ? (
          <motion.div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center" initial="hidden" animate="show" variants={container}>
            <HeroContent handleContactClick={handleContactClick} />
            
            {/* Hero Image - Desktop only */}
            <div className="hidden lg:block">
              <HeroImage
                desktopSrc="/images/hero-family-desktop.jpg"
                mobileSrc="/images/hero-family-mobile.jpg"
                alt="Šťastná rodina užívající si rychlý PODA internet a TV"
                className="shadow-2xl"
              />
            </div>
            
            <FeatureCardsDesktop />
            <MobileFeatureCards />
          </motion.div>
        ) : (
          // Fast render for LCP - no animations
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center" style={{ opacity: 1 }}>
            <FastHeroContent handleContactClick={handleContactClick} />
            
            {/* Hero Image - Desktop only */}
            <div className="hidden lg:block">
              <HeroImage
                desktopSrc="/images/hero-family-desktop.jpg"
                mobileSrc="/images/hero-family-mobile.jpg"
                alt="Šťastná rodina užívající si rychlý PODA internet a TV"
                className="shadow-2xl"
              />
            </div>
            
            <FeatureCardsDesktop />
            <MobileFeatureCards />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroContainer;

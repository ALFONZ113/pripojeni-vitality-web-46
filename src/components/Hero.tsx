
import { useState } from 'react';
import { motion } from 'framer-motion';
import QuickContactModal from './QuickContactModal';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroContent from './hero/HeroContent';
import HeroBackground from './hero/HeroBackground';
import FeatureCardsDesktop from './hero/FeatureCardsDesktop';
import MobileFeatureCards from './hero/MobileFeatureCards';
import WhyPopriSection from './hero/WhyPopriSection';
import DisclaimerText from './hero/DisclaimerText';

const Hero = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const handleContactClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsContactModalOpen(true);
    }
  };
  
  return (
    <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24 overflow-hidden" aria-labelledby="hero-title">
      <HeroBackground />

      <div className="container-custom relative z-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" initial="hidden" animate="show" variants={container}>
          <HeroContent handleContactClick={handleContactClick} />
          <FeatureCardsDesktop />
          <MobileFeatureCards />
        </motion.div>

        <WhyPopriSection />
        <DisclaimerText />
      </div>
      
      {/* Quick Contact Modal */}
      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;


import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import FeatureCardsDesktop from './FeatureCardsDesktop';
import MobileFeatureCards from './MobileFeatureCards';
import WhyPopriSection from './WhyPopriSection';
import DisclaimerText from './DisclaimerText';

interface HeroContainerProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContainer = ({ handleContactClick }: HeroContainerProps) => {
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
  
  return (
    <>
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
    </>
  );
};

export default HeroContainer;

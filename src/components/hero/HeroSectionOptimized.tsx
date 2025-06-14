
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import HeroBackground from './HeroBackground';
import HeroContentOptimized from './HeroContentOptimized';
import FeatureCardsDesktop from './FeatureCardsDesktop';
import MobileFeatureCards from './MobileFeatureCards';
import WhyPopriSection from './WhyPopriSection';
import DisclaimerText from './DisclaimerText';

const HeroSectionOptimized = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleContactClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsContactModalOpen(true);
    }
  };
  
  return (
    <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24 overflow-hidden hero-section" aria-labelledby="hero-title">
      <HeroBackground />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center hero-grid">
          <HeroContentOptimized handleContactClick={handleContactClick} />
          <FeatureCardsDesktop />
          <MobileFeatureCards />
        </div>

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

export default HeroSectionOptimized;

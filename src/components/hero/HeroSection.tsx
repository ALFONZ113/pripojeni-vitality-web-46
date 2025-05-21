
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import HeroContainer from './HeroContainer';

const HeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleContactClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsContactModalOpen(true);
    }
  };
  
  return (
    <section className="relative pt-20 sm:pt-32 pb-16 sm:pb-24 overflow-hidden" aria-labelledby="hero-title">
      <HeroContainer handleContactClick={handleContactClick} />
      
      {/* Quick Contact Modal */}
      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;

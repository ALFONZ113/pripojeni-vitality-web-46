
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CallbackForm from '../CallbackForm';
import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { RippleButton } from '@/components/ui/ripple-button';

interface HeroContentProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContent = ({ handleContactClick }: HeroContentProps) => {
  const { elementRef: speedRef, displayValue: speedValue } = useCounterAnimation({
    start: 0,
    end: 1000,
    duration: 2000,
    decimals: 0,
    suffix: ' Mbps'
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0 // Remove delay for LCP optimization
      }
    }
  };
  
  const item = {
    hidden: {
      opacity: 0,
      y: 10
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3 // Faster animation for LCP
      }
    }
  };

  return (
    <div className="text-center lg:text-left">
      <motion.span variants={item} className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
        Vaše cesta k nejlepšímu PODA internetu
      </motion.span>
      <motion.h1 
        id="hero-title" 
        variants={item} 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight"
        style={{ 
          willChange: 'auto' // Remove will-change after animation
        }}
      >
        PODA Internet - Prémiové optické gigabitové 
        <span className="text-poda-orange block sm:inline"> připojení a smart TV</span>
      </motion.h1>
      <motion.p variants={item} className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
        Přinášíme Vám rychlé <span className="text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až <span ref={speedRef} className="text-poda-orange font-bold">{speedValue}</span>. Užívejte si internet i TV bez kompromisů.
      </motion.p>
      
      {/* Callback Form - Adjusted for better mobile visibility */}
      <motion.div variants={item} className="mb-6">
        <CallbackForm />
      </motion.div>
      
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link to="/tarify">
          <RippleButton variant="primary" className="group transition-all w-full sm:w-auto" aria-label="Prozkoumat nabídku">
            Prozkoumat nabídku
            <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </RippleButton>
        </Link>
        <Link to="/kontakt" onClick={handleContactClick}>
          <RippleButton 
            variant="outline"
            className="hover:bg-poda-blue/10 w-full sm:w-auto" 
            aria-label="Kontaktní formulář"
          >
            Kontaktní formulář
          </RippleButton>
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroContent;

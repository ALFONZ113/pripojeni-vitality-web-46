
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CallbackForm from '../CallbackForm';
import { EnhancedButton } from '../ui/enhanced-button';
import useIntersectionObserver from '../../hooks/use-intersection-observer';

interface EnhancedHeroContentProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const EnhancedHeroContent: React.FC<EnhancedHeroContentProps> = ({ handleContactClick }) => {
  const [contentRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

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
  
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  return (
    <div ref={contentRef} className="text-center lg:text-left">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
      >
        <motion.span 
          variants={item} 
          className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4"
        >
          Popri.cz – Vaše cesta k nejlepšímu PODA internetu
        </motion.span>
        
        <motion.h1 
          id="hero-title" 
          variants={item} 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight"
        >
          Prémiové optické gigabitové 
          <span className="text-poda-orange block md:inline"> připojení a smart TV</span>
        </motion.h1>
        
        <motion.p 
          variants={item} 
          className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
        >
          S Popri.cz vám zajistíme rychle <span className="text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až 1000 Mbps. Užijte si stabilní internet a TV bez výpadků.
        </motion.p>
        
        {/* Enhanced Callback Form */}
        <motion.div variants={item} className="mb-6">
          <CallbackForm />
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link to="/tarify" className="group">
            <EnhancedButton size="lg" className="w-full sm:w-auto">
              Prozkoumat nabídku
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </EnhancedButton>
          </Link>
          
          <Link to="/kontakt" onClick={handleContactClick}>
            <EnhancedButton variant="outline" size="lg" className="w-full sm:w-auto">
              Kontaktní formulář
            </EnhancedButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedHeroContent;

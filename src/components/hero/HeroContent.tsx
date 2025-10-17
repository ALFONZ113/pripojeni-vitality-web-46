
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CallbackForm from '../CallbackForm';

interface HeroContentProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContent = ({ handleContactClick }: HeroContentProps) => {
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
    <div className="text-center max-w-5xl mx-auto">
      <motion.span variants={item} className="inline-flex items-center gap-2 bg-gradient-to-r from-poda-blue/10 to-poda-orange/10 text-poda-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-poda-blue/20">
        <svg className="w-4 h-4 text-poda-orange" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Vaše cesta k nejlepšímu PODA internetu
      </motion.span>
      
      <motion.h1 
        id="hero-title" 
        variants={item} 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
        style={{ willChange: 'auto' }}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700">
          Prémiové optické gigabitové
        </span>
        <br />
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-poda-orange to-poda-orange-light bg-clip-text text-transparent">
          připojení a smart TV
        </span>
      </motion.h1>
      
      <motion.p variants={item} className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
        Přinášíme Vám rychlé <span className="font-semibold text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="font-semibold text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až <span className="font-bold text-poda-blue">1000 Mbps</span>. Užívejte si internet i TV bez kompromisů.
      </motion.p>
      
      {/* Callback Form */}
      <motion.div variants={item} className="mb-8 max-w-md mx-auto">
        <CallbackForm />
      </motion.div>
      
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/tarify" className="btn-primary group transition-all shadow-lg hover:shadow-xl" aria-label="Prozkoumat nabídku">
          Prozkoumat nabídku
          <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link 
          to="/kontakt" 
          onClick={handleContactClick}
          className="btn-outline hover:bg-poda-blue/10 shadow-sm hover:shadow-md" 
          aria-label="Kontaktní formulář"
        >
          Kontaktní formulář
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroContent;

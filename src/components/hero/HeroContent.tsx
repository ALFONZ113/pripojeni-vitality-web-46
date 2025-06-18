
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: {
      opacity: 0,
      y: 30
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.8
      }
    }
  };

  return (
    <div className="text-center lg:text-left space-y-8">
      <motion.span 
        variants={item} 
        className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-poda-blue py-3 px-6 rounded-full text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm border border-white/30"
      >
        Popri.cz – Vaše cesta k nejlepšímu PODA internetu
      </motion.span>
      
      <motion.h1 
        id="hero-title" 
        variants={item} 
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-poda-blue mb-8 leading-tight tracking-tight premium-text-shadow"
      >
        Prémiové optické{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600">
          gigabitové
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-orange to-orange-500 block md:inline">
          připojení a smart TV
        </span>
      </motion.h1>
      
      <motion.p 
        variants={item} 
        className="text-gray-600 text-xl mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
      >
        S Popri.cz vám zajistíme rychle{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600 font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-orange to-orange-500">PO</span>DA
        </span>{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600 font-semibold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-orange to-orange-500">při</span>pojení
        </span>{' '}
        s garantovanou rychlostí až 1000 Mbps. Užijte si stabilní internet a TV bez výpadků.
      </motion.p>
      
      <motion.div variants={item} className="mb-10">
        <CallbackForm />
      </motion.div>
      
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
        <Link 
          to="/tarify" 
          className="btn-primary group transition-all premium-glow" 
          aria-label="Prozkoumat nabídku"
        >
          Prozkoumat nabídku
          <ArrowRight className="ml-3 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link 
          to="/kontakt" 
          onClick={handleContactClick}
          className="btn-outline hover:bg-poda-blue/10 premium-glow" 
          aria-label="Kontaktní formulář"
        >
          Kontaktní formulář
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroContent;

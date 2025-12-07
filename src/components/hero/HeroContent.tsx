
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
        delayChildren: 0
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
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.5
      }
    }
  };

  return (
    <div className="text-center max-w-5xl mx-auto">
      <motion.span 
        variants={item} 
        className="badge-gold inline-flex items-center gap-2 mb-8"
      >
        <Zap className="w-4 h-4" />
        Internet Provider Ostrava
      </motion.span>
      
      <motion.h1 
        id="hero-title" 
        variants={item} 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight"
        style={{ willChange: 'auto' }}
      >
        <span className="text-foreground">
          Rychlý a férový{' '}
        </span>
        <span className="text-gradient-gold">POPRI</span>
        <span className="text-foreground"> internet</span>
        <br />
        <span className="text-muted-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Bez limitů. Bez kompromisů.
        </span>
      </motion.h1>
      
      <motion.p 
        variants={item} 
        className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto"
      >
        Připojte svůj domov k budoucnosti – stabilní gigabitové připojení až{' '}
        <span className="font-bold text-primary">1000 Mbps</span>
        <br />
        s <span className="font-bold text-primary">TV zdarma</span>. Surfujte, sledujte, bavte se, kolik chcete.
      </motion.p>
      
      {/* Callback Form */}
      <motion.div variants={item} className="mb-10 max-w-md mx-auto">
        <CallbackForm />
      </motion.div>
      
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button variant="gold" size="xl" asChild className="group">
          <Link to="/tarify" aria-label="Prozkoumat nabídku">
            Prozkoumat nabídku
            <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="heroOutline" size="xl" asChild>
          <Link 
            to="/kontakt" 
            onClick={handleContactClick}
            aria-label="Kontaktní formulář"
          >
            Kontaktní formulář
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroContent;

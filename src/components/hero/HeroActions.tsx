
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroActionsProps {
  item: any; // Animation variant
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroActions = ({ item, handleContactClick }: HeroActionsProps) => {
  return (
    <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
      <Link to="/tarify" className="btn-primary group transition-all" aria-label="Prozkoumat nabídku">
        Prozkoumat nabídku
        <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
      <Link 
        to="/kontakt" 
        onClick={handleContactClick}
        className="btn-outline hover:bg-poda-blue/10" 
        aria-label="Kontaktní formulář"
      >
        Kontaktní formulář
      </Link>
    </motion.div>
  );
};

export default HeroActions;

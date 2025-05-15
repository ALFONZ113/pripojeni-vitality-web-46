
import React from 'react';
import { motion } from 'framer-motion';

interface HeroTitleProps {
  item: any; // Animation variant
}

const HeroTitle = ({ item }: HeroTitleProps) => {
  return (
    <>
      <motion.span variants={item} className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
        Popri.cz – Vaše cesta k nejlepšímu PODA internetu
      </motion.span>
      <motion.h1 id="hero-title" variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight">
        Prémiové optické gigabitové 
        <span className="text-poda-orange block md:inline"> připojení a smart TV</span>
      </motion.h1>
    </>
  );
};

export default HeroTitle;

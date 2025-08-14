
import React from 'react';
import { motion } from 'framer-motion';

const DisclaimerText = () => {
  return (
    <motion.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{delay: 1.5, duration: 0.8}} 
      className="mt-12 md:mt-16 text-xs text-gray-400 text-center max-w-3xl mx-auto"
    >
      <p>Tato webová stránka je provozována obchodním zástupcem společnosti PODA, nikoliv samotnou společností PODA.</p>
      <p className="mt-1">Milan Terč | IČO: 75546230 | Sídlo: Ostrava | Zapsán v živnostenském rejstříku</p>
    </motion.div>
  );
};

export default DisclaimerText;

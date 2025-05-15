
import React from 'react';
import { motion } from 'framer-motion';

interface HeroDescriptionProps {
  item: any; // Animation variant
}

const HeroDescription = ({ item }: HeroDescriptionProps) => {
  return (
    <motion.p variants={item} className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
      S Popri.cz vám zajistíme rychle <span className="text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až 1000 Mbps. Užijte si stabilní internet a TV bez výpadků.
    </motion.p>
  );
};

export default HeroDescription;

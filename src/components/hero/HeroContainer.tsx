
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import FastHeroContent from './FastHeroContent';
import FeatureCardsDesktop from './FeatureCardsDesktop';
import MobileFeatureCards from './MobileFeatureCards';
import { useState, useEffect } from 'react';

interface HeroContainerProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContainer = ({ handleContactClick }: HeroContainerProps) => {
  const [showAnimations, setShowAnimations] = useState(false);
  
  // Enable animations after initial render to optimize LCP
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimations(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };
  
  return (
    <>
      <HeroBackground />

      <div className="container-custom relative z-10">
        {showAnimations ? (
          <motion.div initial="hidden" animate="show" variants={container}>
            {/* Hero Content - Full Width */}
            <div className="mb-12">
              <HeroContent handleContactClick={handleContactClick} />
            </div>
            
            {/* Feature Cards - Horizontal Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="glass-card rounded-xl p-6 border border-white/20 shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mb-4">
                    <svg className="h-8 w-8 text-poda-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-poda-blue mb-2">Rychlý optický internet</h3>
                  <p className="text-gray-600">PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.</p>
                </div>
              </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="glass-card rounded-xl p-6 border border-white/20 shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-poda-orange/10 p-3 rounded-lg mb-4">
                    <svg className="h-8 w-8 text-poda-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-poda-blue mb-2">Chytrá televize</h3>
                  <p className="text-gray-600">Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.</p>
                </div>
              </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="glass-card rounded-xl p-6 border border-white/20 shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mb-4">
                    <svg className="h-8 w-8 text-poda-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-poda-blue mb-2">Moderní technologie</h3>
                  <p className="text-gray-600">Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Fast render for LCP - no animations
          <div style={{ opacity: 1 }}>
            {/* Hero Content - Full Width */}
            <div className="mb-12">
              <FastHeroContent handleContactClick={handleContactClick} />
            </div>
            
            {/* Feature Cards - Horizontal Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6 border border-white/20 shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mb-4">
                    <svg className="h-8 w-8 text-poda-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-poda-blue mb-2">Rychlý optický internet</h3>
                  <p className="text-gray-600">PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.</p>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6 border border-white/20 shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-poda-orange/10 p-3 rounded-lg mb-4">
                    <svg className="h-8 w-8 text-poda-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-poda-blue mb-2">Chytrá televize</h3>
                  <p className="text-gray-600">Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.</p>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6 border border-white/20 shadow-lg backdrop-blur-md">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mb-4">
                    <svg className="h-8 w-8 text-poda-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-xl text-poda-blue mb-2">Moderní technologie</h3>
                  <p className="text-gray-600">Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default HeroContainer;


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
            <div className="mb-16">
              <HeroContent handleContactClick={handleContactClick} />
            </div>
            
            {/* Feature Cards - Modern Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-poda-blue/10 shadow-sm hover:shadow-xl hover:border-poda-blue/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-poda-blue to-poda-blue-light p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-15.857 21.213 0" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-poda-blue mb-3">Rychlý optický internet</h3>
                  <p className="text-gray-600 leading-relaxed">PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-poda-orange/10 shadow-sm hover:shadow-xl hover:border-poda-orange/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-poda-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-poda-orange to-poda-orange-light p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-poda-blue mb-3">Chytrá televize</h3>
                  <p className="text-gray-600 leading-relaxed">Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-poda-blue/10 shadow-sm hover:shadow-xl hover:border-poda-blue/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-poda-blue to-poda-blue-light p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-poda-blue mb-3">Moderní technologie</h3>
                  <p className="text-gray-600 leading-relaxed">Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Fast render for LCP - no animations
          <div style={{ opacity: 1 }}>
            {/* Hero Content - Full Width */}
            <div className="mb-16">
              <FastHeroContent handleContactClick={handleContactClick} />
            </div>
            
            {/* Feature Cards - Modern Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-poda-blue/10 shadow-sm hover:shadow-xl hover:border-poda-blue/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-poda-blue to-poda-blue-light p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-poda-blue mb-3">Rychlý optický internet</h3>
                  <p className="text-gray-600 leading-relaxed">PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.</p>
                </div>
              </div>
              
              <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-poda-orange/10 shadow-sm hover:shadow-xl hover:border-poda-orange/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-poda-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-poda-orange to-poda-orange-light p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-poda-blue mb-3">Chytrá televize</h3>
                  <p className="text-gray-600 leading-relaxed">Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.</p>
                </div>
              </div>
              
              <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-poda-blue/10 shadow-sm hover:shadow-xl hover:border-poda-blue/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-poda-blue to-poda-blue-light p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-poda-blue mb-3">Moderní technologie</h3>
                  <p className="text-gray-600 leading-relaxed">Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů.</p>
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

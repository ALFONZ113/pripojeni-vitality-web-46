
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import MobileFeatureCards from './MobileFeatureCards';

interface HeroContainerProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContainer = ({ handleContactClick }: HeroContainerProps) => {
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
        <motion.div initial="hidden" animate="show" variants={container}>
          {/* Hero Content - Full Width */}
          <div className="mb-16">
            <HeroContent handleContactClick={handleContactClick} />
          </div>
          
          {/* Feature Cards - Premium Luxury Design - Hidden on mobile, shown on md+ */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
              className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(15,76,129,0.3)] hover:border-poda-blue/40 transition-all duration-500"
              style={{ boxShadow: '0 10px 40px -10px rgba(15, 76, 129, 0.15)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/8 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-poda-blue/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative bg-gradient-to-br from-poda-blue to-poda-blue-light p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(15,76,129,0.4)] transition-all duration-500">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="h-8 w-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-15.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-poda-blue mb-3 group-hover:text-poda-blue-light transition-colors duration-300">Rychlý optický internet</h3>
                <p className="text-gray-600 leading-relaxed">PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
              className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.3)] hover:border-poda-orange/40 transition-all duration-500"
              style={{ boxShadow: '0 10px 40px -10px rgba(255, 107, 53, 0.15)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-poda-orange/8 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-poda-orange/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative bg-gradient-to-br from-poda-orange to-poda-orange-light p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all duration-500">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="h-8 w-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-poda-blue mb-3 group-hover:text-poda-orange transition-colors duration-300">Chytrá televize</h3>
                <p className="text-gray-600 leading-relaxed">Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
              className="group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(15,76,129,0.3)] hover:border-poda-blue/40 transition-all duration-500"
              style={{ boxShadow: '0 10px 40px -10px rgba(15, 76, 129, 0.15)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-poda-blue/8 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-poda-blue/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative bg-gradient-to-br from-poda-blue to-poda-blue-light p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(15,76,129,0.4)] transition-all duration-500">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg className="h-8 w-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-poda-blue mb-3 group-hover:text-poda-blue-light transition-colors duration-300">Moderní technologie</h3>
                <p className="text-gray-600 leading-relaxed">Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů.</p>
              </div>
            </motion.div>
          </div>
          
          {/* Mobile Feature Cards */}
          <MobileFeatureCards />
        </motion.div>
      </div>
    </>
  );
};

export default HeroContainer;

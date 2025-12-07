
import { motion } from 'framer-motion';
import { Wifi, Monitor, Zap } from 'lucide-react';
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.6
      }
    }
  };
  
  return (
    <>
      <HeroBackground />

      <div className="container-custom relative z-10">
        <motion.div initial="hidden" animate="show" variants={container}>
          {/* Hero Content - Full Width */}
          <div className="mb-20">
            <HeroContent handleContactClick={handleContactClick} />
          </div>
          
          {/* Feature Cards - Luxury Noir + Gold Design */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div 
              variants={cardVariants}
              className="card-luxury group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative bg-primary/10 p-5 rounded-2xl mb-6 group-hover:bg-primary/20 transition-all duration-500">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Rychlý optický internet
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="card-luxury group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative bg-primary/10 p-5 rounded-2xl mb-6 group-hover:bg-primary/20 transition-all duration-500">
                  <Monitor className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Chytrá televize
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="card-luxury group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative bg-primary/10 p-5 rounded-2xl mb-6 group-hover:bg-primary/20 transition-all duration-500">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  Moderní technologie
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů.
                </p>
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

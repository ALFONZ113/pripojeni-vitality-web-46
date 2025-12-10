import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Zap, Tv, Wrench } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';

interface CityDistrict {
  name: string;
  coverage: string;
}

interface CityHeroSectionProps {
  cityName: string;
  highlight?: string;
  coverage: number;
  districts: CityDistrict[];
}

const CityHeroSection = ({ cityName, highlight, coverage, districts }: CityHeroSectionProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleContactClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsContactModalOpen(true);
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0 }
    }
  };

  const benefits = [
    { icon: <Zap className="h-5 w-5" />, text: '1000 Mbps' },
    { icon: <Tv className="h-5 w-5" />, text: '85+ programů' },
    { icon: <Wrench className="h-5 w-5" />, text: 'Instalace 0 Kč' }
  ];
  
  return (
    <section className="relative pt-24 pb-16 overflow-hidden min-h-[80vh] flex items-center bg-background" aria-labelledby="hero-title">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div initial="hidden" animate="show" variants={container} className="max-w-4xl mx-auto text-center">
          {/* City Badge */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center mb-6"
          >
            <div className="inline-flex items-center glass px-6 py-3 rounded-full border border-primary/20">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-lg font-semibold text-foreground">{cityName}</span>
              <span className="ml-3 text-sm text-primary font-medium">{coverage}% pokrytí</span>
            </div>
          </motion.div>

          {/* Main Price Headline */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mb-6"
          >
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight mb-4">
              Gigabit jen za{' '}
              <span className="text-gradient-gold">300 Kč</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              měsíčně s TV v ceně
            </p>
          </motion.div>

          {/* Benefits Row */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-foreground">
                <span className="text-primary">{benefit.icon}</span>
                <span className="font-semibold">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Highlight text */}
          {highlight && (
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              {highlight}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a 
              href="tel:+420730431313" 
              onClick={handleContactClick}
              className="btn-gold inline-flex items-center justify-center text-lg px-8 py-4"
            >
              <Phone className="mr-2 h-5 w-5" />
              730 431 313
            </a>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="btn-noir inline-flex items-center justify-center text-lg px-8 py-4"
            >
              Mám zájem
            </button>
          </motion.div>

          {/* Districts Preview */}
          {districts.length > 0 && (
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="glass rounded-2xl p-6 border border-border/50"
            >
              <p className="text-sm text-muted-foreground mb-3">Pokryté oblasti:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {districts.slice(0, 6).map((district, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1.5 bg-primary/10 text-foreground rounded-full text-sm font-medium border border-primary/20"
                  >
                    {district.name}
                  </span>
                ))}
                {districts.length > 6 && (
                  <span className="px-3 py-1.5 text-muted-foreground text-sm">
                    +{districts.length - 6} dalších
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default CityHeroSection;

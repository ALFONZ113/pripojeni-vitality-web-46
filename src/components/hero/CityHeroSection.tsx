import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Zap, Tv, Wrench } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import cityHeroImage from '@/assets/city-hero-family.jpg';

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={container} 
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* City Badge */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start mb-6"
            >
              <div className="inline-flex items-center glass px-6 py-3 rounded-full border border-primary/20">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <span className="text-lg font-semibold text-foreground">{cityName}</span>
                <span className="ml-3 text-sm text-primary font-medium">{coverage}% pokrytí</span>
              </div>
            </motion.div>

            {/* Main Price Headline */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight mb-4">
                Gigabit jen za{' '}
                <span className="text-gradient-gold">300 Kč</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
                měsíčně s TV v ceně
              </p>
            </motion.div>

            {/* Benefits Row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mb-6"
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
                variants={itemVariants}
                className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                {highlight}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
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
                variants={itemVariants}
                className="glass rounded-2xl p-4 sm:p-6 border border-border/50"
              >
                <p className="text-sm text-muted-foreground mb-3">Pokryté oblasti:</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
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

          {/* Right Column - Image */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Gold glow effect behind image */}
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl opacity-50"></div>
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 shadow-2xl">
                <img 
                  src={cityHeroImage}
                  alt="Rodina sledující televizi s PODA internetem"
                  className="w-full h-auto object-cover aspect-square lg:aspect-[4/3]"
                  loading="eager"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default CityHeroSection;

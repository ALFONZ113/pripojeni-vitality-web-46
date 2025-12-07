import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';

interface CityHeroSectionProps {
  cityName: string;
  title: string;
  subtitle: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  features: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: 'blue' | 'orange';
  }>;
}

const CityHeroSection = ({ cityName, title, subtitle, stats, features }: CityHeroSectionProps) => {
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
  
  return (
    <section className="relative pt-20 pb-16 overflow-hidden min-h-screen flex items-center bg-background" aria-labelledby="hero-title">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <motion.div initial="hidden" animate="show" variants={container}>
          {/* City Badge */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center mb-6"
          >
            <div className="inline-flex items-center glass px-6 py-3 rounded-full border border-primary/20">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-lg font-semibold text-foreground">{cityName}</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            id="hero-title"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-center mb-6 text-foreground leading-tight"
          >
            {title.split(' ').map((word, i) => 
              i === 1 ? <span key={i} className="text-gradient-gold">{word} </span> : word + ' '
            )}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-xl md:text-2xl text-center text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a 
              href="tel:+420730431313" 
              onClick={handleContactClick}
              className="btn-gold inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              730 431 313
            </a>
            <Link 
              to="/kontakt" 
              className="btn-noir inline-flex items-center justify-center"
            >
              Nezávazná nabídka
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center border border-border">
                <div className="font-heading font-bold text-3xl text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
                className="card-luxury group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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

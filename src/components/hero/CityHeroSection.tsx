import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import HeroBackground from './HeroBackground';

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
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };
  
  return (
    <section className="relative pt-20 pb-16 overflow-hidden min-h-screen flex items-center" aria-labelledby="hero-title">
      <HeroBackground />

      <div className="container-custom relative z-10">
        <motion.div initial="hidden" animate="show" variants={container}>
          {/* City Badge */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center mb-6"
          >
            <div className="inline-flex items-center bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full border border-white/40 shadow-lg">
              <MapPin className="h-5 w-5 text-poda-blue mr-2" />
              <span className="text-lg font-semibold text-poda-blue">{cityName}</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            id="hero-title"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-poda-blue via-poda-blue-light to-poda-blue bg-clip-text text-transparent leading-tight"
          >
            {title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-xl md:text-2xl text-center text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
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
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-poda-orange to-poda-orange-light text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              730 431 313
            </a>
            <Link 
              to="/kontakt" 
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-xl text-poda-blue font-bold rounded-2xl border-2 border-poda-blue/20 hover:border-poda-blue shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(15,76,129,0.3)] transition-all duration-300 transform hover:scale-105"
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
              <div key={index} className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/40 shadow-lg">
                <div className="font-bold text-3xl text-poda-blue mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
                className={`group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl transition-all duration-500 ${
                  feature.gradient === 'orange' 
                    ? 'hover:shadow-[0_20px_60px_-15px_rgba(255,107,53,0.3)] hover:border-poda-orange/40'
                    : 'hover:shadow-[0_20px_60px_-15px_rgba(15,76,129,0.3)] hover:border-poda-blue/40'
                }`}
                style={{ 
                  boxShadow: feature.gradient === 'orange' 
                    ? '0 10px 40px -10px rgba(255, 107, 53, 0.15)' 
                    : '0 10px 40px -10px rgba(15, 76, 129, 0.15)' 
                }}
              >
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  feature.gradient === 'orange' 
                    ? 'bg-gradient-to-br from-poda-orange/8 to-transparent'
                    : 'bg-gradient-to-br from-poda-blue/8 to-transparent'
                }`}></div>
                <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 ${
                  feature.gradient === 'orange'
                    ? 'bg-gradient-to-br from-poda-orange/20 to-transparent'
                    : 'bg-gradient-to-br from-poda-blue/20 to-transparent'
                }`}></div>
                <div className="relative flex flex-col items-center text-center">
                  <div className={`relative p-5 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-all duration-500 ${
                    feature.gradient === 'orange'
                      ? 'bg-gradient-to-br from-poda-orange to-poda-orange-light group-hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]'
                      : 'bg-gradient-to-br from-poda-blue to-poda-blue-light group-hover:shadow-[0_0_30px_rgba(15,76,129,0.4)]'
                  }`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className={`font-bold text-xl text-poda-blue mb-3 transition-colors duration-300 ${
                    feature.gradient === 'orange' ? 'group-hover:text-poda-orange' : 'group-hover:text-poda-blue-light'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
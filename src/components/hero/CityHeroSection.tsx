import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Zap, Tv, Wrench, Users, Star, ArrowRight } from 'lucide-react';
import QuickContactModal from '../QuickContactModal';
import defaultHeroImage from '@/assets/city-hero-family.jpg';
import { getPhoneProps } from '@/utils/phoneOptimization';
import { sendContactFormEmail } from '@/utils/emailService';
import { toast } from 'sonner';

interface CityDistrict {
  name: string;
  coverage: string;
}

interface CityHeroSectionProps {
  cityName: string;
  nameLocative?: string;
  highlight?: string;
  coverage: number;
  districts: CityDistrict[];
  heroImage?: string;
}

const CityHeroSection = ({ cityName, nameLocative, highlight, coverage, districts, heroImage }: CityHeroSectionProps) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Používame lifestyle obrázok pre všetky mestá
  const displayImage = defaultHeroImage;
  
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

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error('Zadejte platné telefonní číslo');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await sendContactFormEmail({
        name: `Callback z ${cityName}`,
        email: "city-page@popri.cz",
        phone: phoneNumber,
        message: `Žádost o zpětné volání z městské stránky ${cityName}`
      });
      toast.success('Děkujeme! Zavoláme Vám co nejdříve.');
      setPhoneNumber('');
    } catch (error) {
      toast.error('Něco se pokazilo. Zkuste to prosím znovu.');
    }
    setIsSubmitting(false);
  };

  const locationText = nameLocative || `v městě ${cityName}`;
  
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
            <motion.div variants={itemVariants} className="mb-4">
              <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-tight mb-4">
                Gigabit za{' '}
                <span className="text-gradient-gold">nejvýhodnější cenu</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium">
                měsíčně s TV v ceně
              </p>
            </motion.div>

            {/* Urgency Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-primary">Akční cena</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground">Instalace zdarma jen do konce měsíce</span>
              </span>
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

            {/* Social Proof */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-primary font-semibold mb-4"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Přes 2000 domácností {locationText} už má gigabit.
              </span>
            </motion.p>

            {/* Mini Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-primary font-bold">2000+</span>
                <span className="text-muted-foreground">spokojených zákazníků</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-primary font-bold">4.8/5</span>
                <span className="text-muted-foreground">hodnocení</span>
              </div>
            </motion.div>

            {/* Inline Phone Form */}
            <motion.div variants={itemVariants} className="mb-6">
              <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <div className="relative flex-grow">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                  <input
                    type="tel"
                    placeholder="Váš telefon"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all"
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold px-8 py-4 font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Odesílám...' : (
                    <>
                      Zavolejte mi
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-sm text-muted-foreground mt-3 text-center lg:text-left">
                Zavoláme Vám do 30 minut
              </p>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-8">
              <a 
                {...getPhoneProps('+420730431313')}
                className="text-primary hover:underline font-medium inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Nebo zavolejte přímo: 730 431 313
              </a>
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
            <div className="relative max-w-md lg:max-w-lg mx-auto">
              {/* Gold glow effect behind image */}
              <div className="absolute -inset-3 bg-primary/15 rounded-2xl blur-xl opacity-50"></div>
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-xl border border-primary/20 shadow-xl">
                <img 
                  src={displayImage}
                  alt={`Internet PODA ${cityName}`}
                  className="w-full h-auto object-cover aspect-video"
                  loading="eager"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
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

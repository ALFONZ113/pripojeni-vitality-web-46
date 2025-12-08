import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import { sendContactFormEmail } from '@/utils/emailService';
import heroBackground from '@/assets/hero-fullscreen-bg.jpg';


const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  
  // Parallax effects
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const handleContactClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsContactModalOpen(true);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      setIsLoading(true);
      const success = await sendContactFormEmail({
        name: "Žádost o zpětné volání - Hero",
        phone: phoneNumber,
        email: "",
        message: `Zákazník požádal o zpětné volání: ${phoneNumber}`
      });
      setIsLoading(false);
      if (success) {
        setIsSubmitted(true);
        setPhoneNumber('');
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    }
  };

  const trustPoints = [
    'Instalace do 48h',
    'Bez závazků',
    '2000+ zákazníků'
  ];

  const stats = [
    { value: '1000', suffix: 'Mbps', label: 'Rychlost' },
    { value: '99.9', suffix: '%', label: 'Dostupnost' },
    { value: '24/7', suffix: '', label: 'Podpora' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  
  return (
    <section 
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* ═══════════════════════════════════════════════════════════════
          FULL-SCREEN BACKGROUND IMAGE
         ═══════════════════════════════════════════════════════════════ */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <img 
          src={heroBackground} 
          alt="PODA internet pozadie" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </motion.div>

      {/* Content Container */}
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            {/* Badge with pulsing dot */}
            <motion.div variants={itemVariants} className="mb-4 md:mb-6">
              <span className="badge-gold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5" />
                Nový zákazník? Získejte bonus
              </span>
            </motion.div>

            {/* Headlines */}
            <motion.h1 
              id="hero-title"
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight"
            >
              <span className="text-foreground block">Internet, který</span>
              <span className="text-gradient-gold block">nikdy nezklame</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-foreground/90 text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-body"
            >
              Připojte svůj domov k budoucnosti. Gigabitový optický internet až{' '}
              <span className="text-primary font-semibold">1000 Mbps</span> s{' '}
              <span className="text-primary font-semibold">TV zdarma</span>.
            </motion.p>

            {/* Phone Input Form */}
            <motion.form 
              variants={itemVariants} 
              onSubmit={handlePhoneSubmit}
              className="mb-6 md:mb-8"
            >
              <div className="glass rounded-xl p-3 max-w-md mx-auto lg:mx-0 border border-primary/20">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Vaše telefonní číslo"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-secondary/80 border border-border rounded-lg pl-9 pr-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="default"
                    className="shadow-lg shadow-primary/30 w-full sm:w-auto whitespace-nowrap"
                    disabled={isSubmitted || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        Odesílám
                      </>
                    ) : isSubmitted ? 'Odesláno ✓' : 'Zavolejte mi'}
                  </Button>
                </div>
              </div>
            </motion.form>

            {/* Trust Points */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mb-6 md:mb-8"
            >
              {trustPoints.map((point, index) => (
                <motion.span 
                  key={index}
                  className="flex items-center text-sm text-foreground/90 font-body"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-sm shadow-green-500/50" />
                  {point}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button 
                variant="gold" 
                size="lg" 
                asChild 
                className="shadow-lg shadow-primary/30" 
                onClick={handleContactClick}
              >
                <Link to="/kontakt">
                  Mám zájem
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+420730431313">
                  <Phone className="mr-2 h-4 w-4" />
                  +420 730 431 313
                </a>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 md:mt-12 glass rounded-xl p-4 border border-primary/20 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex justify-around items-center">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl md:text-2xl font-display font-bold">
                      <span className="text-primary drop-shadow-[0_0_10px_rgba(218,165,32,0.5)]">{stat.value}</span>
                      <span className="text-primary text-sm">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] md:text-xs text-foreground/70 uppercase tracking-wider mt-1 font-body">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Price Badge - Desktop */}
            <motion.div 
              className="hidden lg:inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-lg shadow-lg shadow-primary/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              od 300 Kč/měs
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center z-10"
      >
        <span className="text-xs text-foreground/60 uppercase tracking-widest mb-2 font-body">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Quick Contact Modal for Mobile */}
      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;

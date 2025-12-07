import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, Play, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import { sendContactFormEmail } from '@/utils/emailService';
import heroImage from '@/assets/hero-family-tv.jpg';
import routerImage from '@/assets/router-premium.png';

const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  
  // Parallax effects
  const imageY = useTransform(scrollY, [0, 500], [0, 30]);
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

  // Animation variants - simple fade + translateY only
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  
  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center pt-20 md:pt-28 pb-12 md:pb-24 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* ═══════════════════════════════════════════════════════════════
              CONTENT COLUMN
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left px-4 lg:px-0"
          >
            {/* Badge with pulsing dot */}
            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
              <span className="badge-gold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5" />
                Nový zákazník? Získejte bonus
              </span>
            </motion.div>

            {/* Headlines - NO 3D rotations */}
            <motion.h1 
              id="hero-title"
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl md:text-5xl xl:text-7xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight"
            >
              <span className="text-foreground block">Internet, který</span>
              <span className="text-gradient-gold block">nikdy nezklame</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body"
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
              <div className="glass rounded-2xl p-3 md:p-4 max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Vaše telefonní číslo"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-secondary/50 border border-border rounded-xl pl-10 md:pl-12 pr-4 py-3 md:py-3.5 text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="lg" 
                    className="shadow-lg shadow-primary/20 w-full sm:w-auto"
                    disabled={isSubmitted || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Odesílám...
                      </>
                    ) : isSubmitted ? 'Odesláno ✓' : 'Zavolejte mi'}
                  </Button>
                </div>
              </div>
            </motion.form>

            {/* Trust Points with green dots */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap justify-center lg:justify-start gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 mb-8 md:mb-10"
            >
              {trustPoints.map((point, index) => (
                <motion.span 
                  key={index}
                  className="flex items-center text-xs md:text-sm text-foreground/80 font-body"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 mr-1.5 md:mr-2 shadow-sm shadow-green-500/50" />
                  {point}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
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
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="tel:+420730431313">
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  +420 730 431 313
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              IMAGE COLUMN
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ y: imageY }}
            className="relative px-4 lg:px-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Glow Effect */}
            <motion.div 
              className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl"
              animate={isHovering ? { opacity: 0.6 } : { opacity: 0.3 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Main Image Container */}
            <div className="relative bg-card rounded-3xl border border-border/50 overflow-hidden group aspect-video">
              <img 
                src={heroImage} 
                alt="Rodina sledující televizi" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer shadow-xl shadow-primary/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" fill="currentColor" />
                </motion.div>
              </div>
              
              {/* Stats Bar at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/98 to-transparent p-4 md:p-6 pt-12 md:pt-16">
                <div className="flex justify-around">
                  {stats.map((stat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-center"
                    >
                      <div className="text-lg sm:text-xl md:text-3xl font-display font-bold">
                        <span className="text-primary drop-shadow-[0_0_10px_rgba(218,165,32,0.5)]">{stat.value}</span>
                        <span className="text-primary text-sm md:text-lg">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] md:text-xs text-foreground/90 uppercase tracking-wider mt-0.5 md:mt-1 font-body font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Price Badge - Static, no aggressive animation */}
              <motion.div 
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-primary text-primary-foreground px-3 md:px-5 py-1.5 md:py-2.5 rounded-full font-bold text-xs md:text-sm shadow-lg shadow-primary/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                od 300 Kč/měs
              </motion.div>
              
              {/* Router Thumbnail - Static */}
              <motion.div 
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 bg-card rounded-xl md:rounded-2xl border border-border/50 p-2 md:p-3 shadow-xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img 
                  src={routerImage} 
                  alt="Premium WiFi Router" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-body">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Contact Modal for Mobile */}
      <QuickContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Phone, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import QuickContactModal from '../QuickContactModal';
import { sendContactFormEmail } from '@/utils/emailService';
import heroBgMobile from '@/assets/hero-bg-mobile.png';
import heroBgDesktop from '@/assets/hero-bg-desktop.png';
const HeroSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  const {
    scrollY
  } = useScroll();
  const isMobile = useIsMobile();

  // Parallax effects
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);
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
  const trustPoints = ['Rychlá instalace', 'Bez závazků', '2000+ zákazníků'];
  const stats = [{
    value: '1000',
    suffix: 'Mbps',
    label: 'Rychlost'
  }, {
    value: '99.9',
    suffix: '%',
    label: 'Dostupnost'
  }, {
    value: '24/7',
    suffix: '',
    label: 'Podpora'
  }];

  // Animation variants - simple fade + translateY only
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  return <section ref={ref} className="relative min-h-[80vh] md:min-h-[90vh] lg:min-h-[100svh] flex items-center overflow-hidden" aria-labelledby="hero-title">
      {/* ═══════════════════════════════════════════════════════════════
          FULL-SCREEN BACKGROUND IMAGE
         ═══════════════════════════════════════════════════════════════ */}
      <motion.div className="absolute inset-0 z-0" style={{
      scale: imageScale
    }}>
        <picture>
          {/* Desktop/Tablet - od 768px */}
          <source media="(min-width: 768px)" srcSet={heroBgDesktop} />
          {/* Mobile - default (vertikálny obrázok) */}
          <img src={heroBgMobile} alt="Abstraktní optická vlákna - PODA internet" className="w-full h-full object-cover object-center" loading="eager" />
        </picture>
        {/* Dark Overlay - stronger gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </motion.div>

      {/* Content Container */}
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* ═══════════════════════════════════════════════════════════════
              CONTENT COLUMN - LEFT SIDE
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center lg:text-left">
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

            {/* Headlines - Balanced elegant size */}
            <motion.h1 id="hero-title" variants={itemVariants} className="font-display font-bold mb-8 md:mb-12 tracking-tighter" style={{
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            lineHeight: '1.1'
          }}>
              <span className="text-foreground block">PODA Internet</span>
              <span className="text-gradient-gold block">na který se můžete spolehnout</span>
            </motion.h1>

            {/* Subtitle - LARGER */}
            <motion.p variants={itemVariants} className="text-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
              Nechte svůj domov fungovat na plný výkon.<br className="hidden sm:block" />
              <span className="text-primary font-semibold">Gigabit 1000 Mbps + TV zdarma</span> ​
            </motion.p>


            {/* Phone Input Form - LARGER */}
            <motion.form variants={itemVariants} onSubmit={handlePhoneSubmit} className="mb-6 md:mb-8">
              <div className="glass rounded-2xl p-3 sm:p-4 max-w-lg mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input type="tel" placeholder="Vaše telefonní číslo" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body" required />
                  </div>
                  <Button type="submit" variant="gold" size="lg" className="shadow-lg shadow-primary/20 w-full sm:w-auto whitespace-nowrap px-8 py-4 text-base" disabled={isSubmitted || isLoading}>
                    {isLoading ? <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Odesílám
                      </> : isSubmitted ? 'Odesláno ✓' : 'Zavolejte mi'}
                  </Button>
                </div>
              </div>
            </motion.form>

            {/* Trust Points - LARGER */}
            <motion.div variants={itemVariants} className="hidden sm:flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
              {trustPoints.map((point, index) => <motion.span key={index} className="flex items-center text-sm md:text-base text-foreground/80 font-body" initial={{
              opacity: 0,
              x: -10
            }} animate={isInView ? {
              opacity: 1,
              x: 0
            } : {}} transition={{
              delay: 0.5 + index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}>
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-sm shadow-green-500/50" />
                  {point}
                </motion.span>)}
            </motion.div>

            {/* CTA Buttons removed - now in Navbar */}
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              STATS COLUMN - RIGHT SIDE (visible on desktop) - UPDATED DESIGN
             ═══════════════════════════════════════════════════════════════ */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }} className="hidden lg:flex flex-col items-end justify-center gap-5">
            {/* Stats Cards - LARGER */}
            {stats.map((stat, index) => <motion.div key={index} initial={{
            opacity: 0,
            x: 30
          }} animate={isInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            delay: 0.5 + index * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94]
          }} className="glass rounded-2xl px-8 py-5 border border-primary/30 min-w-[240px] gap-5 hover:border-primary/50 transition-colors flex items-end justify-start mx-[100px]">
                {/* Icon circle */}
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_16px_rgba(218,165,32,0.8)]" />
                </div>
                {/* Text */}
                <div>
                  <div className="text-2xl font-display font-bold text-foreground">
                    <span className="text-primary drop-shadow-[0_0_8px_rgba(218,165,32,0.4)]">{stat.value}</span>
                    <span className="text-primary text-base ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-body font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>)}

            {/* Price Badge - LARGER */}
            <motion.div className="text-center mt-4" initial={{
            opacity: 0,
            y: 10
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            delay: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}>
              <span className="text-4xl xl:text-5xl font-display font-bold text-foreground">
                OD <span className="text-primary">300 Kč</span>/měs
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Stats Bar - Bottom of screen */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="lg:hidden mt-6 glass rounded-xl p-3 border border-primary/20">
          <div className="flex justify-around items-center">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="text-lg font-display font-bold">
                  <span className="text-primary">{stat.value}</span>
                  <span className="text-primary text-xs">{stat.suffix}</span>
                </div>
                <div className="text-[10px] text-foreground/70 uppercase tracking-wider font-body">
                  {stat.label}
                </div>
              </div>)}
            <div className="text-center pl-3 border-l border-border">
              <div className="text-sm font-bold text-primary">od 300 Kč</div>
              <div className="text-[10px] text-foreground/70 uppercase">měsíčně</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div style={{
      opacity: scrollOpacity
    }} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center z-10">
        <span className="text-xs text-foreground/60 uppercase tracking-widest mb-2 font-body">Scroll</span>
        <motion.div animate={{
        y: [0, 8, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Quick Contact Modal for Mobile */}
      <QuickContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>;
};
export default HeroSection;
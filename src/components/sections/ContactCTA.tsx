import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ContactCTA = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setIsLoading(false);
      toast.success('Děkujeme! Budeme vás brzy kontaktovat.');
      setTimeout(() => {
        setIsSubmitted(false);
        setPhoneNumber('');
      }, 3000);
    }
  };

  const trustBadges = [
    { icon: Clock, text: 'Instalace do 48h' },
    { icon: Shield, text: 'Bez závazků' },
    { icon: Zap, text: 'Rychlá aktivace' }
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          {/* Badge */}
          <span className="badge-gold mb-4 md:mb-6 inline-block">
            <Zap className="w-4 h-4" />
            Rychlá instalace do 48 hodin
          </span>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Připraveni na <span className="text-gradient-gold">změnu</span>?
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Nechte nám své číslo a my vám zavoláme do 30 minut. Pomůžeme vám s výběrem 
            toho nejlepšího tarifu pro vaši domácnost.
          </p>

          {/* Phone Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit}
            className="mb-8"
          >
            <div className="glass-card rounded-2xl p-4 md:p-6 max-w-lg mx-auto glow-gold-subtle">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Vaše telefonní číslo"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-secondary/70 border border-border rounded-xl pl-12 pr-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-body"
                    required
                    disabled={isSubmitted}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="gold" 
                  size="xl"
                  className="shadow-lg shadow-primary/30 w-full sm:w-auto"
                  disabled={isSubmitted || isLoading}
                >
                  {isLoading ? 'Odesílám...' : isSubmitted ? 'Odesláno ✓' : 'Zavolejte mi'}
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-foreground/80 font-body text-sm"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                {badge.text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;

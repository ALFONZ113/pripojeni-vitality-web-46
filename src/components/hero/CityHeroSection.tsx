import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, Mail } from 'lucide-react';
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
  
  const displayImage = defaultHeroImage;

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
  
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden" aria-labelledby="hero-title">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="container-custom relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Location Tag */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary tracking-wide uppercase">
                <MapPin className="h-4 w-4" />
                {cityName} · {coverage}% pokrytí
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <h1 
                id="hero-title" 
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
              >
                Gigabit za{' '}
                <span className="text-primary">nejvýhodnější cenu</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground font-light mb-10"
            >
              TV Basic v ceně
            </motion.p>

            {/* CTA Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <form onSubmit={handlePhoneSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <motion.div 
                  className="relative flex-grow"
                  whileFocus={{ scale: 1.02 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type="tel"
                    placeholder="Váš telefon"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_rgba(212,165,23,0.15)] text-foreground placeholder:text-muted-foreground transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold px-8 py-4 font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {isSubmitting ? 'Odesílám...' : 'Zavolejte mi'}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </motion.button>
              </form>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-muted-foreground mt-3"
              >
                Zavoláme Vám do 30 minut
              </motion.p>
            </motion.div>

            {/* Features - Minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground"
            >
              <span>1000 Mbps</span>
              <span>85+ TV programů</span>
              <span>Instalace zdarma</span>
            </motion.div>

            {/* Secondary Contact Options */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-8 border-t border-border/50 space-y-3"
            >
              <a 
                {...getPhoneProps('+420730431313')}
                className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center gap-2 text-sm"
              >
                <Phone className="h-4 w-4" />
                Nebo volejte: 730 431 313
              </a>
              <div>
                <Link 
                  to="/kontakt"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 text-sm group"
                >
                  <Mail className="h-4 w-4" />
                  Radši napsat?
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] lg:aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Subtle glow */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-60" />
              
              {/* Image Container */}
              <div className="relative h-full overflow-hidden rounded-2xl">
                <img 
                  src={displayImage}
                  alt={`Internet PODA ${cityName}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>

              {/* Districts Badge - Floating */}
              {districts.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-6 glass rounded-xl p-4 border border-border/50"
                >
                  <p className="text-xs text-muted-foreground mb-2">Pokryté oblasti</p>
                  <div className="flex flex-wrap gap-2">
                    {districts.slice(0, 4).map((district, index) => (
                      <span 
                        key={index} 
                        className="text-xs font-medium text-foreground"
                      >
                        {district.name}{index < Math.min(districts.length, 4) - 1 && ','}
                      </span>
                    ))}
                    {districts.length > 4 && (
                      <span className="text-xs text-muted-foreground">
                        +{districts.length - 4} dalších
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
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

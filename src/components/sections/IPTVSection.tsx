import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Tv, ArrowRight, Play, Monitor, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IPTVSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: Tv, value: '95+', label: 'TV kanálů' },
    { icon: Clock, value: '7 dní', label: 'Timeshift archív' },
    { icon: Monitor, value: 'Full HD', label: 'až 4K kvalita' },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-primary/5" />
      
      {/* Glow effect */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <span className="badge-gold mb-6 inline-block">
            <Play className="w-4 h-4" />
            Novinka
          </span>

          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
            <Tv className="w-10 h-10 text-primary" />
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            IPTV služba už od <span className="text-gradient-gold">99 Kč</span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto font-body leading-relaxed">
            Sledujte více ako 95 TV kanálů vo Full HD kvalitě bez satelitních parabolů. 
            Kompatibilní se všemi zařízeními - Smart TV, mobil, tablet, počítač.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-3 gap-4 md:gap-6 mb-12 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-4 md:p-6 text-center"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/iptv">
                Zjistit více o IPTV
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="noir" size="xl" asChild>
              <Link to="/kontakt">
                Objednat teď
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IPTVSection;

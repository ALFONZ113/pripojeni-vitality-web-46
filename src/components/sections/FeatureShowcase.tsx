import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Wifi, Gamepad2, HeadphonesIcon, LucideIcon } from 'lucide-react';

import featureInstallation from '@/assets/feature-installation.jpg';
import featureWorkHome from '@/assets/feature-work-home.jpg';
import featureGaming from '@/assets/feature-gaming.jpg';
import featureSupport from '@/assets/feature-support.jpg';

interface Feature {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: LucideIcon;
  image: string;
}

const features: Feature[] = [
  {
    title: 'Profesionální instalace',
    description: 'Náš technik vám vše nastaví a vysvětlí. Připojení bez starostí a komplikací.',
    stat: '48h',
    statLabel: 'Instalace',
    icon: Clock,
    image: featureInstallation,
  },
  {
    title: 'Práce z domova',
    description: 'Stabilní připojení pro videohovory a práci na dálku. Žádné výpadky, žádné problémy.',
    stat: '99.9%',
    statLabel: 'Dostupnost',
    icon: Wifi,
    image: featureWorkHome,
  },
  {
    title: 'Pro hráče',
    description: 'Nízká latence pro nejnáročnější hráče. Online gaming bez lagů a sekání.',
    stat: '<10ms',
    statLabel: 'Ping',
    icon: Gamepad2,
    image: featureGaming,
  },
  {
    title: 'Non-stop podpora',
    description: 'Technická podpora vždy, když ji potřebujete. Jsme tu pro vás 24 hodin denně.',
    stat: '24/7',
    statLabel: 'Podpora',
    icon: HeadphonesIcon,
    image: featureSupport,
  },
];

interface FeatureItemProps {
  feature: Feature;
  index: number;
}

const FeatureItem = ({ feature, index }: FeatureItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      {/* Image */}
      <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Stat overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="glass-card rounded-xl p-4 inline-block">
              <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
                {feature.stat}
              </div>
              <div className="text-muted-foreground text-sm font-body">
                {feature.statLabel}
              </div>
            </div>
          </div>
        </div>
        
        {/* Index number */}
        <div className="absolute -top-8 -left-4 lg:-left-8 font-display text-8xl lg:text-9xl font-bold text-foreground/5 select-none pointer-events-none">
          0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-muted-foreground font-body text-sm uppercase tracking-widest">
            Feature 0{index + 1}
          </span>
        </div>
        
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          {feature.title}
        </h3>
        
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const FeatureShowcase = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="badge-gold mb-4 inline-block">
            Naše výhody
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Proč si vybrat <span className="text-gradient-gold">Popri</span>?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-body">
            Nabízíme více než jen rychlý internet. Získáte kompletní služby od profesionálů.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

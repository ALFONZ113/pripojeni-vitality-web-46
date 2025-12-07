import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Wifi, Gamepad2, HeadphonesIcon } from 'lucide-react';

interface Feature {
  index: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

const features: Feature[] = [
  {
    index: '01',
    title: 'Profesionální instalace',
    description: 'Náš technik vám vše nastaví a vysvětlí. Připojení do 48 hodin od objednání.',
    stat: '48h',
    statLabel: 'Instalace',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
  },
  {
    index: '02',
    title: 'Práce z domova',
    description: 'Stabilní připojení pro videohovory, velké soubory a online spolupráci bez výpadků.',
    stat: '99.9%',
    statLabel: 'Dostupnost',
    icon: Wifi,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80'
  },
  {
    index: '03',
    title: 'Pro hráče',
    description: 'Nízká latence pro nejnáročnější online hry. Žádné lagy, plynulý gameplay.',
    stat: '<10ms',
    statLabel: 'Odezva',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
  },
  {
    index: '04',
    title: 'Non-stop podpora',
    description: 'Technická podpora vždy, když ji potřebujete. Jsme tu pro vás 24 hodin denně.',
    stat: '24/7',
    statLabel: 'Podpora',
    icon: HeadphonesIcon,
    image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=800&q=80'
  }
];

const FeatureItem = ({ feature, index }: { feature: Feature; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Image */}
      <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl aspect-[4/3] group">
          <img 
            src={feature.image} 
            alt={feature.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          
          {/* Stat Overlay */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-card/90 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-border/50">
            <div className="text-2xl md:text-4xl font-display font-bold text-primary">
              {feature.stat}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-body">
              {feature.statLabel}
            </div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        {/* Editorial Index Number */}
        <span className="editorial-index">{feature.index}</span>
        
        <div className="relative">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 mb-4 md:mb-6">
            <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {feature.title}
          </h3>
          
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-md">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureShowcase = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4"
        >
          <span className="badge-gold mb-4 md:mb-6 inline-block">Naše výhody</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Proč zvolit <span className="text-gradient-gold">PODA</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed font-body">
            Moderní technologie, osobní přístup a spolehlivost na prvním místě.
          </p>
        </motion.div>

        {/* Features Grid - Vertical Editorial Layout */}
        <div className="space-y-16 md:space-y-24 lg:space-y-32 px-4">
          {features.map((feature, index) => (
            <FeatureItem key={feature.index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

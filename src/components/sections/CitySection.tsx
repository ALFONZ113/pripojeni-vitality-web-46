import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface City {
  name: string;
  coverage: number;
  link?: string;
}

const cities: City[] = [
  { name: 'Ostrava', coverage: 98, link: '/internet-ostrava' },
  { name: 'Karviná', coverage: 95, link: '/internet-karvina' },
  { name: 'Havířov', coverage: 92, link: '/internet-havirov' },
  { name: 'Bohumín', coverage: 90, link: '/internet-bohumin' },
  { name: 'Poruba', coverage: 99, link: '/internet-poruba' },
  { name: 'Orlová', coverage: 88 }
];

const CityCard = ({ city, index }: { city: City; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-feature"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-display text-lg font-semibold text-foreground">{city.name}</span>
        </div>
        <span className="text-primary font-bold text-lg">{city.coverage}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-gold-soft rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${city.coverage}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      {city.link && (
        <Link 
          to={city.link}
          className="mt-3 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-body"
        >
          Více info <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </motion.div>
  );
};

const CitySection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  // Parallax for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img 
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80" 
          alt="Ostrava panorama"
          className="w-full h-[120%] object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-4 lg:px-0"
          >
            <span className="badge-gold mb-4 md:mb-6 inline-block">Pokrytí</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Připojujeme <span className="text-gradient-gold">Moravskoslezský kraj</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 font-body">
              Optická síť PODA pokrývá většinu bytových domů v regionu. 
              Ověřte si dostupnost na vaší adrese.
            </p>
            
            {/* Key Points */}
            <div className="space-y-3 mb-8">
              {['Optická síť GPON', 'Symetrická rychlost', 'Bez datových limitů'].map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground/90 font-body">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <Button variant="gold" size="lg" asChild className="shadow-lg shadow-primary/30">
              <Link to="/kontakt#kontakt-formular">
                Ověřit dostupnost
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* City Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 lg:px-0">
            {cities.map((city, index) => (
              <CityCard key={city.name} city={city} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitySection;

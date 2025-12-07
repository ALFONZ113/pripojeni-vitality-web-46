import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface City {
  name: string;
  coverage: number;
  population: string;
  status: string;
  link: string;
}

const cities: City[] = [
  { name: 'Ostrava', coverage: 98, population: '285 000', status: 'Plné pokrytí', link: '/internet-ostrava' },
  { name: 'Karviná', coverage: 95, population: '52 000', status: 'Plné pokrytí', link: '/internet-karvina' },
  { name: 'Havířov', coverage: 92, population: '71 000', status: 'Rozšiřujeme', link: '/internet-havirov' },
  { name: 'Bohumín', coverage: 90, population: '21 000', status: 'Rozšiřujeme', link: '/internet-bohumin' },
  { name: 'Poruba', coverage: 99, population: '65 000', status: 'Plné pokrytí', link: '/internet-poruba' },
  { name: 'Orlová', coverage: 88, population: '29 000', status: 'Rozšiřujeme', link: '/internet-karvina' },
];

const CityCard = ({ city, index }: { city: City; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={city.link}
        className="block glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {city.name}
            </h3>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="w-3 h-3" />
            {city.population}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground font-body">Pokrytí</span>
            <span className="font-semibold text-foreground">{city.coverage}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${city.coverage}%` } : {}}
              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-primary flex items-center gap-1">
            <Check className="w-3 h-3" />
            {city.status}
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
};

const CitySection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/Flux_Dev_a_surreal_and_vibrant_cinematic_photo_of_A_modern_apa_0.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="badge-gold mb-4 inline-block">
              <MapPin className="w-4 h-4" />
              Moravskoslezský kraj
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Připojujeme celý <span className="text-gradient-gold">region</span>
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-8 font-body leading-relaxed">
              Optický internet dostupný ve všech hlavních městech Moravskoslezského kraje. 
              Ověřte si dostupnost na vaší adrese.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/kontakt#kontakt-formular">
                  Ověřit dostupnost
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="noir" size="xl" asChild>
                <a href="tel:+420730431313">
                  Zavolat: 730 431 313
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right - City Grid */}
          <div className="grid grid-cols-2 gap-4">
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

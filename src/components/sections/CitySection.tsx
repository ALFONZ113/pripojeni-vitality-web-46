import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Check, ArrowRight, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities as citiesData } from '@/data/cities/citiesData';
import { useAnimateOnView } from '@/hooks/use-animate-on-view';

interface CityCardData {
  name: string;
  coverage: number;
  population: string;
  status: string;
  link: string;
}

const cities: CityCardData[] = citiesData.map(city => ({
  name: city.name,
  coverage: city.coverage,
  population: city.population,
  status: city.status === 'full' ? 'Plné pokrytí' : 'Rozšiřujeme',
  link: `/internet-${city.slug}`
}));

const CityCard = ({ city, index }: { city: CityCardData; index: number }) => {
  const { ref, isVisible } = useAnimateOnView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible ? 'animate-fade-up-sm' : 'opacity-0 translate-y-5'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Link
        to={city.link}
        className="block glass-card rounded-xl p-4 hover:border-primary/30 transition-all duration-300 group"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {city.name}
            </h3>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="w-3 h-3" />
            {city.population}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground font-body">Pokrytí</span>
            <span className="font-semibold text-foreground">{city.coverage}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
              style={{ width: isVisible ? `${city.coverage}%` : '0%' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-primary flex items-center gap-1">
            {city.status === 'Plné pokrytí' ? (
              <Check className="w-3 h-3" />
            ) : (
              <TrendingUp className="w-3 h-3" />
            )}
            {city.status}
          </span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </div>
  );
};

const CitySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref: headerRef, isVisible: isHeaderVisible } = useAnimateOnView();

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Static background — no parallax scroll listener */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `url('/Flux_Dev_a_surreal_and_vibrant_cinematic_photo_of_A_modern_apa_0.webp')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              isHeaderVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="badge-gold mb-4 inline-block">
              <MapPin className="w-4 h-4" />
              4 kraje • 12 měst
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Připojujeme celý <span className="text-gradient-gold">region</span>
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl mb-8 font-body leading-relaxed">
              Optický internet dostupný ve všech hlavních městech Moravskoslezského, Jihomoravského, Pardubického a Královéhradeckého kraje.
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
          </div>

          {/* Right - Collapsible City Grid */}
          <div>
            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full glass-card rounded-xl p-5 mb-4 flex items-center justify-between hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    Zobrazit všechna města
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cities.length} měst ve 4 krajích
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-primary" />
              </motion.div>
            </button>

            {/* Expandable City Grid — AnimatePresence kept for interactive expand/collapse */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cities.map((city, index) => (
                      <CityCard key={city.name} city={city} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitySection;

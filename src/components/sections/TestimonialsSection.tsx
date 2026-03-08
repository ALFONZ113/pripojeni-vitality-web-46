import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Users } from 'lucide-react';
import { useAnimateOnView } from '@/hooks/use-animate-on-view';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Martin Novák',
    location: 'Ostrava-Poruba',
    rating: 5,
    text: 'Konečně internet, který funguje! Práce z domova je teď radost. Instalace proběhla rychle a technik byl velmi profesionální.',
    avatar: 'MN',
  },
  {
    id: 2,
    name: 'Jana Veselá',
    location: 'Karviná',
    rating: 5,
    text: 'Přešli jsme od konkurence a nelitujeme. Rychlost je stabilní, žádné výpadky. Děti můžou streamovat a já pracovat současně.',
    avatar: 'JV',
  },
  {
    id: 3,
    name: 'Petr Svoboda',
    location: 'Havířov',
    rating: 5,
    text: 'Jako gamer oceňuji nízký ping. Online hry běží bez problémů. Podpora je dostupná kdykoliv a vždy ochotní pomoci.',
    avatar: 'PS',
  },
  {
    id: 4,
    name: 'Eva Horáková',
    location: 'Bohumín',
    rating: 5,
    text: 'Nejlepší poměr cena/výkon v okolí. TV kanály v HD kvalitě a rychlý internet za rozumnou cenu. Doporučuji všem sousedům.',
    avatar: 'EH',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, isVisible } = useAnimateOnView();

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Stats */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="badge-gold mb-4 inline-block">
              <Users className="w-4 h-4" />
              Reference
            </span>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8">
              Co říkají naši <span className="text-gradient-gold">zákazníci</span>
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  2000+
                </div>
                <div className="text-muted-foreground font-body text-sm">
                  Spokojených zákazníků
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  4.8
                </div>
                <div className="text-muted-foreground font-body text-sm">
                  Průměrné hodnocení
                </div>
              </div>
            </div>
          </div>

          {/* Right - Carousel — AnimatePresence kept for slide transitions */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'animate-fade-up-sm' : 'opacity-0 translate-y-5'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground text-lg md:text-xl font-body leading-relaxed mb-8">
                    "{currentTestimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="font-display font-semibold text-primary">
                        {currentTestimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-muted-foreground text-sm font-body">
                        {currentTestimonial.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={goToPrev}
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

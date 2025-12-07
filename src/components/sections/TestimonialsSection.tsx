import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
    text: 'Přešli jsme od O2 a je to nebe a dudy. Rychlost stabilní, technik přišel do 24 hodin. Doporučuji všem sousedům.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Jana Svobodová',
    location: 'Karviná',
    rating: 5,
    text: 'Konečně internet bez výpadků! Syn hraje online hry a poprvé nemá problémy s lagováním. Skvělá investice.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Petr Horák',
    location: 'Havířov',
    rating: 5,
    text: 'Pracuji z domova a potřebuji spolehlivé připojení. S PODA jsem neměl jediný výpadek za celý rok. Profesionální přístup.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Eva Marková',
    location: 'Bohumín',
    rating: 5,
    text: 'TV kanály v super kvalitě, Netflix jede bez buffování. Za tu cenu nemá konkurenci. Děkuji za skvělý servis!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Auto-rotate every 6 seconds
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
    <section ref={ref} className="py-20 lg:py-32 bg-card relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] translate-x-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Stats Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-4 lg:px-0"
          >
            <span className="badge-gold mb-4 md:mb-6 inline-block">Recenze</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
              Co říkají <span className="text-gradient-gold">lidé</span>
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card-feature p-6">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-muted-foreground font-body">spokojených zákazníků</div>
              </div>
              <div className="card-feature p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-display font-bold text-primary">4.8</span>
                  <Star className="w-8 h-8 text-primary fill-primary" />
                </div>
                <div className="text-sm text-muted-foreground font-body">průměrné hodnocení</div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Carousel Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-4 lg:px-0"
          >
            <div className="relative">
              {/* Quote Icon */}
              <Quote className="absolute -top-4 -left-2 w-12 h-12 text-primary/20" />
              
              {/* Testimonial Card */}
              <div className="card-luxury min-h-[280px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 font-body italic">
                      "{currentTestimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img 
                        src={currentTestimonial.avatar} 
                        alt={currentTestimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-display font-semibold text-foreground">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground font-body">
                          {currentTestimonial.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                {/* Arrows */}
                <div className="flex gap-2">
                  <button 
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:border-primary/30 hover:text-primary transition-all"
                    aria-label="Předchozí recenze"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:border-primary/30 hover:text-primary transition-all"
                    aria-label="Další recenze"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-border hover:bg-muted-foreground'
                      }`}
                      aria-label={`Přejít na recenzi ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

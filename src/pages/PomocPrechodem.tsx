
import React from 'react';
import { ArrowRight, Phone, Mail, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMetadata from '../components/page/PageMetadata';
import PhoneLink from '../components/ui/phone-link';
import ScrollProgressIndicator from '../components/migration/ScrollProgressIndicator';
import InteractiveTimeline from '../components/migration/InteractiveTimeline';
import FloatingBenefitCards from '../components/migration/FloatingBenefitCards';
import SmartFAQAccordion from '../components/migration/SmartFAQAccordion';
import FloatingContactWidget from '../components/migration/FloatingContactWidget';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

const PomocPrechodem = () => {
  const [heroRef, isHeroVisible] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-100px'
  });

  const steps = [
    {
      icon: Phone,
      title: "1. Kontaktujte nás",
      description: "Zavolejte nám na +420 730 431 313 nebo vyplňte kontaktní formulář. Náš tým je připraven vám poradit."
    },
    {
      icon: Sparkles,
      title: "2. Konzultace zdarma",
      description: "Projdeme s vámi současnou smlouvu a najdeme nejlepší řešení. Vše probíháme online nebo osobně."
    },
    {
      icon: Zap,
      title: "3. Vyřídíme vše za vás",
      description: "Postaráme se o výpověď u současného poskytovatele i koordinaci nové instalace. Bez starostí."
    },
    {
      icon: ArrowRight,
      title: "4. Bezproblémový přechod",
      description: "Zajistíme kontinuitu služeb bez výpadku internetu. Přecházíte plynule a bez komplikací."
    }
  ];

  const benefits = [
    "Výpověď současné smlouvy vyřídíme za vás",
    "Koordinace termínů instalace a odpojení",
    "Přenos telefonního čísla zdarma",
    "Technická podpora během celého procesu",
    "Garance nejlepší ceny na trhu",
    "Bez poplatků za přechod"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden">
      <ScrollProgressIndicator />
      <FloatingContactWidget />
      
      <PageMetadata 
        title="Pomoc s přechodem od jiného poskytovatele | PODA Internet"
        description="Vyřídíme za vás přechod od současného poskytovatele internetu. Bezplatná konzultace, výpověď smlouvy a koordinace instalace. Zavolejte +420 730 431 313"
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-4 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-4 w-96 h-96 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-20 relative z-10">
        <div className="container-custom">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/20 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHeroVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Zdarma a bez starostí</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-foreground">Pomůžeme vám s přechodem</span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                od jiného poskytovatele
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Nestarajte se o složité vyřizování. Postaráme se o vše - od výpovědi současné smlouvy 
              až po instalaci nového PODA připojení. <strong className="text-foreground">Vše zdarma a bez starostí.</strong>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneLink 
                  phoneNumber="+420730431313"
                  className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-elegant group text-lg"
                >
                  <Phone className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  Zavolat hned +420 730 431 313
                </PhoneLink>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/kontakt" 
                  className="glass-card border border-white/20 hover:border-primary/30 text-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm group text-lg"
                >
                  Kontaktní formulář
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 relative z-10">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Jak přechod probíhá?
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Celý proces je jednoduchý a rychlý. Vyřídíme vše za vás během několika dní.
              <br />
              <strong className="text-foreground">Bez stresu, bez starostí, bez poplatků.</strong>
            </motion.p>
          </motion.div>

          <InteractiveTimeline steps={steps} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Co za vás vyřídíme?
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Postaráme se o každý detail vašeho přechodu.
                <br />
                <strong className="text-foreground">Vy se můžete těšit na nové rychlé připojení.</strong>
              </motion.p>
            </motion.div>

            <FloatingBenefitCards benefits={benefits} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Často kladené otázky
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Najděte odpovědi na nejčastější otázky ohledně přechodu.
              <br />
              <strong className="text-foreground">Pokud nenajdete odpověď, rádi vám zavoláme.</strong>
            </motion.p>
          </motion.div>

          <SmartFAQAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary-glow opacity-95" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Začněte ještě dnes
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Zavolejte nám nebo vyplňte kontaktní formulář. Poradíme vám zdarma 
              a vyřídíme vše potřebné pro váš přechod.
              <br />
              <strong>Váš nový internet je jen hovor daleko.</strong>
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneLink 
                  phoneNumber="+420730431313"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-5 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center text-lg shadow-elegant group"
                >
                  <Phone className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  +420 730 431 313
                </PhoneLink>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/kontakt" 
                  className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-10 py-5 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center text-lg shadow-elegant group"
                >
                  <Mail className="mr-3 h-6 w-6" />
                  Kontaktní formulář
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PomocPrechodem;

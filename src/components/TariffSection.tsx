import React, { memo, useState, useCallback, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import TariffTabs from './tariffs/TariffTabs';
import TariffCard from './tariffs/TariffCard';
import { tariffData } from './tariffs/tariffData';
import { ArrowRight, Wifi, Tv, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PromoInfoState = Record<'bytyBasic' | 'bytyMych10' | 'domyBasic' | 'domyMych10', boolean>;

const TariffSection = memo(() => {
  const [activeTab, setActiveTab] = useState('byty');
  const [openPromoInfo, setOpenPromoInfo] = useState<PromoInfoState>({
    bytyBasic: false, bytyMych10: false, domyBasic: false, domyMych10: false,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const togglePromoInfo = useCallback((tariff: keyof PromoInfoState) => {
    setOpenPromoInfo(prev => ({ ...prev, [tariff]: !prev[tariff] }));
  }, []);

  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);
  const currentTariffData = useMemo(() => tariffData[activeTab as keyof typeof tariffData], [activeTab]);

  const stats = [
    { icon: Wifi, value: '1000', unit: 'Mbps', label: 'Max rychlost' },
    { icon: Tv, value: '160+', unit: '', label: 'TV kanálů' },
    { icon: Shield, value: '99.9', unit: '%', label: 'Dostupnost' },
    { icon: Zap, value: '⚡', unit: '', label: 'Rychlá instalace' }
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden" id="tarify">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] translate-x-1/3" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4"
        >
          <span className="badge-gold mb-4 md:mb-6 inline-block text-xs md:text-sm">Naše nabídka</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Tarify pro <span className="text-gradient-gold">byty</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed">
            Nabízíme výkonné a cenově dostupné internetové a televizní balíčky.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12 px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-xl md:rounded-2xl p-3 md:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 group text-center"
            >
              <div className="bg-primary/10 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground">
                {stat.value}<span className="text-sm md:text-lg text-primary">{stat.unit}</span>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <TariffTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </motion.div>

        {/* Tariff Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 max-w-6xl mx-auto px-4"
        >
          {currentTariffData.map((tariff, index) => (
            <motion.div
              key={tariff.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}
            >
              <TariffCard
                {...tariff}
                promoId={tariff.id as keyof PromoInfoState}
                openPromoInfo={openPromoInfo}
                onPromoInfoToggle={togglePromoInfo}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/tarify">
              Zobrazit všechny tarify
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

TariffSection.displayName = 'TariffSection';
export default TariffSection;

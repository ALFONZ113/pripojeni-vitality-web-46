
import React from 'react';
import FeatureCard from './FeatureCard';
import { Wifi, Tv, Zap } from 'lucide-react';

const FeatureCardsDesktop = () => {
  return (
    <div className="relative mt-6 lg:mt-0 hidden md:block">
      <div className="absolute -top-10 -left-10 w-32 h-32 lg:w-40 lg:h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" aria-hidden="true"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 lg:w-40 lg:h-40 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" aria-hidden="true"></div>
      
      <div className="relative space-y-4 lg:space-y-6">
        <FeatureCard
          icon={Wifi}
          title="Rychlý optický internet"
          description="PODA připojení s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost."
          iconColor="text-poda-blue"
          iconBgColor="bg-poda-blue/10"
          index={0}
        />
        
        <FeatureCard
          icon={Tv}
          title="Chytrá televize"
          description="Získáte více než 100 TV programů, sledování na všech zařízeních a vlastní výběr stanic."
          iconColor="text-poda-orange"
          iconBgColor="bg-poda-orange/10"
          index={1}
          className="md:ml-4 lg:ml-6"
        />
        
        <FeatureCard
          icon={Zap}
          title="Moderní technologie"
          description="Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort bez kompromisů."
          iconColor="text-poda-blue"
          iconBgColor="bg-poda-blue/10"
          index={2}
        />
      </div>
    </div>
  );
};

export default FeatureCardsDesktop;

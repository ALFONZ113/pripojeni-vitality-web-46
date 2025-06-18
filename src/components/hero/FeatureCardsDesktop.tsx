
import React from 'react';
import FeatureCard from './FeatureCard';
import { Wifi, Tv, Zap } from 'lucide-react';

const FeatureCardsDesktop = () => {
  return (
    <div className="relative mt-8 lg:mt-0 hidden md:block">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" aria-hidden="true"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gradient-to-r from-orange-200/40 to-pink-200/40 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" aria-hidden="true"></div>
      
      <div className="relative space-y-8">
        <FeatureCard
          icon={Wifi}
          title="Rychlý optický internet"
          description="PODA připojení od Popri.cz s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost s nejmodernější technologií."
          iconColor="text-poda-blue"
          iconBgColor="bg-gradient-to-br from-poda-blue/10 to-blue-100/50"
          index={0}
        />
        
        <FeatureCard
          icon={Tv}
          title="Chytrá televize"
          description="S Popri.cz získáte více než 100 TV programů v Full HD kvalitě, sledování na všech zařízeních a vlastní výběr stanic."
          iconColor="text-poda-orange"
          iconBgColor="bg-gradient-to-br from-poda-orange/10 to-orange-100/50"
          index={1}
          className="ml-8"
        />
        
        <FeatureCard
          icon={Zap}
          title="Moderní technologie"
          description="Optická síť GPON od PODA zajišťuje maximální stabilitu, spolehlivost a komfort bez kompromisů 24/7."
          iconColor="text-poda-blue"
          iconBgColor="bg-gradient-to-br from-poda-blue/10 to-blue-100/50"
          index={2}
        />
      </div>
    </div>
  );
};

export default FeatureCardsDesktop;

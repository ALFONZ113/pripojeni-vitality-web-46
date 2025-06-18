
import React from 'react';
import { Wifi, Tv } from 'lucide-react';

const MobileFeatureCards = () => {
  return (
    <div className="block md:hidden space-y-6 mt-8">
      <div className="glass-card rounded-2xl p-6 border border-white/30 shadow-xl backdrop-blur-xl premium-hover">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-poda-blue/10 to-blue-100/50 p-3 rounded-2xl flex items-center justify-center shadow-lg">
            <Wifi className="h-6 w-6 text-poda-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-poda-blue mb-2 premium-text-shadow">Rychlý optický internet</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              PODA připojení od Popri.cz s garantovanou rychlostí až 1000/1000 Mbps pro celou domácnost.
            </p>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-2xl p-6 border border-white/30 shadow-xl backdrop-blur-xl premium-hover">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-poda-orange/10 to-orange-100/50 p-3 rounded-2xl flex items-center justify-center shadow-lg">
            <Tv className="h-6 w-6 text-poda-orange" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-poda-blue mb-2 premium-text-shadow">Chytrá televize</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              S Popri.cz získáte více než 100 TV programů v Full HD kvalitě na všech zařízeních.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFeatureCards;

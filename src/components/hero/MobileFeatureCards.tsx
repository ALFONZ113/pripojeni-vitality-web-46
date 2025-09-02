
import React from 'react';
import { Wifi, Tv } from 'lucide-react';

const MobileFeatureCards = () => {
  return (
    <div className="block md:hidden space-y-4 mt-6 sm:mt-8">
      <div className="glass-card rounded-xl p-4 sm:p-5 border border-white/20 shadow-lg backdrop-blur-md transition-all duration-300 active:scale-95">
        <div className="flex items-start">
          <div className="bg-poda-blue/10 p-3 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
            <Wifi className="h-6 w-6 sm:h-7 sm:w-7 text-poda-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg sm:text-xl text-poda-blue mb-2 leading-tight">Rychlý optický internet</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">PODA připojení s garantovanou rychlostí až 1000/1000 Mbps.</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 sm:p-5 border border-white/20 shadow-lg backdrop-blur-md transition-all duration-300 active:scale-95">
        <div className="flex items-start">
          <div className="bg-poda-orange/10 p-3 rounded-lg mr-3 flex items-center justify-center flex-shrink-0">
            <Tv className="h-6 w-6 sm:h-7 sm:w-7 text-poda-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg sm:text-xl text-poda-blue mb-2 leading-tight">Chytrá televize</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Získáte více než 100 TV programů na všech zařízeních.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFeatureCards;

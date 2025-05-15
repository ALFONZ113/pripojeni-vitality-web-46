
import React from 'react';
import { Wifi, Tv } from 'lucide-react';

const MobileFeatureCards = () => {
  return (
    <div className="block md:hidden space-y-4 mt-4">
      <div className="glass-card rounded-xl p-4 border border-white/20 shadow-lg backdrop-blur-md">
        <div className="flex items-start">
          <div className="bg-poda-blue/10 p-2 rounded-lg mr-3 flex items-center justify-center">
            <Wifi className="h-5 w-5 text-poda-blue" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-poda-blue mb-1">Rychlý optický internet</h3>
            <p className="text-gray-600 text-sm">PODA připojení od Popri.cz s garantovanou rychlostí až 1000/1000 Mbps.</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 border border-white/20 shadow-lg backdrop-blur-md">
        <div className="flex items-start">
          <div className="bg-poda-orange/10 p-2 rounded-lg mr-3 flex items-center justify-center">
            <Tv className="h-5 w-5 text-poda-orange" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-poda-blue mb-1">Chytrá televize</h3>
            <p className="text-gray-600 text-sm">S Popri.cz získáte více než 100 TV programů na všech zařízeních.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFeatureCards;

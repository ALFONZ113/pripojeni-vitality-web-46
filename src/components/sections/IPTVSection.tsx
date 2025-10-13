
import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, ArrowRight } from 'lucide-react';

const IPTVSection = () => {
  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-br from-orange-50/50 via-white to-poda-orange/5 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-radial from-poda-orange/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-radial from-red-300/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 md:p-14 border border-white/40">
            <div className="bg-poda-orange/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Tv className="h-10 w-10 text-poda-orange" />
            </div>
            
            <span className="inline-block bg-poda-orange text-white py-2 px-4 rounded-full text-sm font-medium mb-4">
              Novinka
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
              IPTV služba už od <span className="text-poda-orange">99 Kč</span> mesačne
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Sledujte viac ako 200 TV kanálov vo Full HD kvalite bez satelitných parabôl. 
              Kompatibilné so všetkými zariadeniami - Smart TV, mobil, tablet, počítač.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="font-bold text-2xl text-poda-blue">200+</div>
                <div className="text-gray-600">TV kanálov</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-poda-blue">7 dní</div>
                <div className="text-gray-600">Timeshift archív</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-poda-blue">Full HD</div>
                <div className="text-gray-600">až 4K kvalita</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/iptv" className="btn-primary inline-flex items-center justify-center">
                Zistiť viac o IPTV <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/kontakt" className="btn-outline inline-flex items-center justify-center">
                Objednať teraz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IPTVSection;

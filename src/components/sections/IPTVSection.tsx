
import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, ArrowRight } from 'lucide-react';

const IPTVSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-poda-orange/5 via-orange-50/50 to-red-50/30 premium-overlay">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-card rounded-3xl shadow-2xl p-12 md:p-16 premium-glow">
            <div className="bg-gradient-to-br from-poda-orange/10 to-orange-100/50 p-6 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Tv className="h-12 w-12 text-poda-orange" />
            </div>
            
            <span className="inline-block bg-gradient-to-r from-poda-orange to-orange-500 text-white py-3 px-6 rounded-full text-sm font-bold mb-6 shadow-lg">
              Novinka
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-poda-blue mb-8 premium-text-shadow">
              IPTV služba už od{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-poda-orange to-orange-500">
                99 Kč
              </span>{' '}
              mesačne
            </h2>
            
            <p className="text-gray-600 text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Sledujte viac ako 200 TV kanálov vo Full HD kvalite bez satelitných parabôl. 
              Kompatibilné so všetkými zariadeniami - Smart TV, mobil, tablet, počítač.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 glass-card rounded-2xl">
                <div className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600 mb-2">200+</div>
                <div className="text-gray-600 font-medium">TV kanálov</div>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl">
                <div className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600 mb-2">7 dní</div>
                <div className="text-gray-600 font-medium">Timeshift archív</div>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl">
                <div className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600 mb-2">Full HD</div>
                <div className="text-gray-600 font-medium">až 4K kvalita</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/iptv" className="btn-primary inline-flex items-center justify-center premium-glow">
                Zistiť viac o IPTV <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
              <Link to="/kontakt" className="btn-outline inline-flex items-center justify-center premium-glow">
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

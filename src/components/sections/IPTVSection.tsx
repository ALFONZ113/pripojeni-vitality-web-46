
import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, ArrowRight } from 'lucide-react';

const IPTVSection = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-poda-orange/10 to-red-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
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

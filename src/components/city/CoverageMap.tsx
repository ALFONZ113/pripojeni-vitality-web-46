
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

type CoverageMapProps = {
  cityName: string;
};

const CoverageMap = ({ cityName }: CoverageMapProps) => {
  return (
    <section className="container-custom mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-poda-blue mb-4">Pokrytí PODA v {cityName}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Podívejte se na mapu pokrytí internetového připojení PODA v {cityName} a okolí. 
          Jsme neustále v procesu rozšiřování našeho pokrytí.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
          <div className="text-center p-8">
            <MapPin className="h-12 w-12 text-poda-blue/50 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-600">Mapa pokrytí pro {cityName}</p>
            <p className="text-sm text-gray-500 mt-2">
              Pro přesné informace o dostupnosti na vaší adrese nás kontaktujte
            </p>
          </div>
        </div>
        <div className="text-center">
          <Link to="/kontakt" className="btn-secondary">
            Ověřit dostupnost na vaší adrese
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;

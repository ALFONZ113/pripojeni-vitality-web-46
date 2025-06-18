
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const LocalSEOSection = () => {
  const locations = [
    { 
      city: 'Ostrava', 
      url: '/internet-ostrava', 
      population: '285k', 
      districts: 'Poruba, Vítkovice, Moravská Ostrava',
      highlight: 'Najväčší trh'
    },
    { 
      city: 'Poruba', 
      url: '/internet-poruba', 
      population: '67k', 
      districts: 'Najväčšia mestská časť Ostravy',
      highlight: 'Same-day inštalácia'
    },
    { 
      city: 'Havířov', 
      url: '/internet-havirov', 
      population: '70k', 
      districts: 'Šumbark, Město, Podlesí',
      highlight: 'Mladé mesto'
    },
    { 
      city: 'Karviná', 
      url: '/internet-karvina', 
      population: '52k', 
      districts: 'Ráj, Hranice, Mizerova',
      highlight: 'Medzinárodné pripojenie'
    },
    { 
      city: 'Bohumín', 
      url: '/internet-bohumin', 
      population: '21k', 
      districts: 'Starý Bohumín, Nový Bohumín',
      highlight: 'Trojkrajinné pripojenie'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-poda-blue/5 via-blue-50/50 to-purple-50/30 premium-overlay">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-divider">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-poda-blue to-blue-600 mb-8 premium-text-shadow">
              Gigabitový Internet PODA vo všetkých mestách regiónu
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed font-medium">
              Vyberte si svoje mesto a zistite, prečo si tisíce zákazníkov vybrali najrýchlejší optický internet PODA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Link 
                key={index}
                to={location.url}
                className="glass-card rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group premium-glow"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-poda-orange/10 to-orange-100/50 p-3 rounded-2xl mr-4 shadow-lg">
                    <MapPin className="h-6 w-6 text-poda-orange" />
                  </div>
                  <h3 className="font-bold text-2xl text-poda-blue group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-poda-orange group-hover:to-orange-500 transition-all duration-300 premium-text-shadow">
                    {location.city}
                  </h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="font-medium">Obyvatelia:</span>
                    <span className="font-bold text-poda-blue">{location.population}</span>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-medium">Pokrytie:</span> {location.districts}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-poda-orange/10 to-orange-100/50 text-poda-orange px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block shadow-lg">
                  {location.highlight}
                </div>
                <div className="flex items-center text-poda-blue font-semibold group-hover:text-poda-orange transition-colors duration-300">
                  Zistiť viac <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSEOSection;

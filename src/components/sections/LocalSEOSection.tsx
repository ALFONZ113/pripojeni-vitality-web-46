
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
    <section className="section-padding bg-gradient-to-r from-poda-blue/10 to-blue-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-6">
              Gigabitový Internet PODA vo všetkých mestách regiónu
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Vyberte si svoje mesto a zistite, prečo si tisíce zákazníkov vybrali najrýchlejší optický internet PODA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Link 
                key={index}
                to={location.url}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-poda-orange mr-3" />
                  <h3 className="font-bold text-xl text-poda-blue group-hover:text-poda-orange transition-colors">
                    {location.city}
                  </h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Obyvatelia:</span>
                    <span className="font-medium">{location.population}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Pokrytie:</span> {location.districts}
                  </div>
                </div>
                <div className="bg-poda-orange/10 text-poda-orange px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  {location.highlight}
                </div>
                <div className="flex items-center text-poda-blue font-medium group-hover:text-poda-orange transition-colors">
                  Zistiť viac <ArrowRight className="ml-2 h-4 w-4" />
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

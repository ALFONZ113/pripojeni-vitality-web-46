
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
      highlight: 'Regionální centrum'
    },
    { 
      city: 'Poruba', 
      url: '/internet-poruba', 
      population: '67k', 
      districts: 'Největší městská část Ostravy',
      highlight: 'Rychlá instalace'
    },
    { 
      city: 'Havířov', 
      url: '/internet-havirov', 
      population: '70k', 
      districts: 'Šumbark, Město, Podlesí',
      highlight: 'Moderní město'
    },
    { 
      city: 'Karviná', 
      url: '/internet-karvina', 
      population: '52k', 
      districts: 'Ráj, Hranice, Mizerova',
      highlight: 'U hranic'
    },
    { 
      city: 'Bohumín', 
      url: '/internet-bohumin', 
      population: '21k', 
      districts: 'Starý Bohumín, Nový Bohumín',
      highlight: 'Železniční uzel'
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-br from-poda-blue/5 via-blue-50/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-radial from-poda-blue/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-blue-300/15 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-poda-blue/10 to-blue-100/50 text-poda-blue py-2 px-5 rounded-full text-sm font-semibold mb-6 border border-poda-blue/20">
              Dostupnost v regionu
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight">
              Gigabitový Internet PODA<br />ve všech městech regionu
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Vyberte si své město a zjistěte, proč si tisíce zákazníků vybralo nejrychlejší optický internet PODA
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
                    <span>Obyvatelé:</span>
                    <span className="font-medium">{location.population}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Pokrytí:</span> {location.districts}
                  </div>
                </div>
                <div className="bg-poda-orange/10 text-poda-orange px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  {location.highlight}
                </div>
                <div className="flex items-center text-poda-blue font-medium group-hover:text-poda-orange transition-colors">
                  Zjistit více <ArrowRight className="ml-2 h-4 w-4" />
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

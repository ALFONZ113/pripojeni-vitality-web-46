
import { ArrowRight, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChannelsSection = () => {
  const channelCategories = [
    {
      name: "Dětské a mládež",
      description: "Zábavné a vzdělávací kanály pro děti a mládež",
      channels: ["Déčko", "Disney Channel", "Nickelodeon", "Cartoon Network", "Minimax", "JimJam"]
    },
    {
      name: "Zpravodajství",
      description: "Aktuální zprávy z domova i ze světa",
      channels: ["ČT24", "CNN Prima News", "BBC World News", "TA3", "Euronews"]
    },
    {
      name: "Dokumenty a kultura",
      description: "Poznávací a vzdělávací programy",
      channels: ["National Geographic", "Discovery Channel", "ČT art", "Spektrum", "Viasat History"]
    },
    {
      name: "Sport",
      description: "Sportovní přenosy a zpravodajství",
      channels: ["Eurosport 1 a 2", "Nova Sport 1 a 2", "ČT sport", "Arena Sport 1 a 2"]
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            TV programy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
            Bohatá programová nabídka
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Nabízíme více než 85 televizních kanálů v základní nabídce a další prémiové
            balíčky pro náročnější diváky. Vyberte si z široké škály filmů, seriálů, sportu a dokumentů.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {channelCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-gray-100"
            >
              <div className="bg-poda-blue/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Tv className="h-6 w-6 text-poda-blue" />
              </div>
              <h3 className="text-xl font-semibold text-poda-blue mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
              <ul className="space-y-2 mb-4">
                {category.channels.map((channel, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-poda-orange rounded-full mr-2"></span>
                    <span className="text-gray-700">{channel}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/programy" 
            className="btn-outline flex items-center"
          >
            Zobrazit všechny programy <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;


import { ArrowRight, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileChannelsSection = () => {
  const channelCategories = [
    {
      name: "Dětské a mládež",
      description: "Zábavné a vzdělávací kanály pro děti a mládež",
      channels: ["Déčko", "Disney Channel", "Nickelodeon"]
    },
    {
      name: "Zpravodajství",
      description: "Aktuální zprávy z domova i ze světa",
      channels: ["ČT24", "CNN Prima News", "BBC World News"]
    },
    {
      name: "Dokumenty",
      description: "Poznávací a vzdělávací programy",
      channels: ["National Geographic", "Discovery Channel", "ČT art"]
    },
    {
      name: "Sport",
      description: "Sportovní přenosy a zpravodajství",
      channels: ["Eurosport 1 a 2", "Nova Sport 1 a 2", "ČT sport"]
    }
  ];

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom">
        <div className="text-center mx-auto mb-8">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-2">
            TV programy
          </span>
          <h2 className="text-2xl font-bold text-poda-blue mb-3">
            Bohatá programová nabídka
          </h2>
          <p className="text-gray-600 text-sm">
            Nabízíme více než 85 televizních kanálů v základní nabídce a další prémiové balíčky.
          </p>
        </div>

        <div className="space-y-4">
          {channelCategories.map((category, index) => (
            <article 
              key={index} 
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
            >
              <div className="flex items-center mb-3">
                <div className="bg-poda-blue/10 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <Tv className="h-4 w-4 text-poda-blue" />
                </div>
                <h3 className="font-semibold text-poda-blue">{category.name}</h3>
              </div>
              <p className="text-gray-600 mb-3 text-xs">{category.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {category.channels.map((channel, i) => (
                  <span key={i} className="bg-gray-50 text-gray-700 text-xs py-1 px-2 rounded-full">
                    {channel}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link 
            to="/programy" 
            className="btn-outline text-sm flex items-center py-2 px-4"
          >
            Zobrazit všechny programy <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MobileChannelsSection;

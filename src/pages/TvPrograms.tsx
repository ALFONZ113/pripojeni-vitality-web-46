
import { useEffect, useState } from 'react';
import { ArrowRight, Tv, Film, Bookmark, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { initAnimations } from '../utils/animation';

const TvPrograms = () => {
  const [activeCategory, setActiveCategory] = useState('vsechny');
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    return () => {
      cleanupAnimation();
    };
  }, []);

  const categories = [
    { id: 'vsechny', name: 'Všechny programy' },
    { id: 'detske', name: 'Dětské a mládež' },
    { id: 'zpravodajstvi', name: 'Zpravodajství' },
    { id: 'dokumenty', name: 'Dokumenty a kultura' },
    { id: 'filmy', name: 'Filmy a seriály' },
    { id: 'sport', name: 'Sport' },
    { id: 'premium', name: 'Prémiové kanály' }
  ];

  // Sample TV channels for demonstration
  const channels = [
    // Dětské a mládež
    { id: 1, name: 'ČT :D (Déčko)', category: 'detske', hd: true, logo: 'https://via.placeholder.com/50x30?text=ČT:D' },
    { id: 2, name: 'Disney Channel', category: 'detske', hd: true, logo: 'https://via.placeholder.com/50x30?text=Disney' },
    { id: 3, name: 'Nickelodeon', category: 'detske', hd: true, logo: 'https://via.placeholder.com/50x30?text=Nick' },
    { id: 4, name: 'Cartoon Network', category: 'detske', hd: true, logo: 'https://via.placeholder.com/50x30?text=CN' },
    { id: 5, name: 'Minimax', category: 'detske', hd: true, logo: 'https://via.placeholder.com/50x30?text=Minimax' },
    { id: 6, name: 'JimJam', category: 'detske', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=JimJam' },
    { id: 7, name: 'Duck TV', category: 'detske', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=DuckTV' },
    
    // Zpravodajství
    { id: 8, name: 'ČT24', category: 'zpravodajstvi', hd: true, logo: 'https://via.placeholder.com/50x30?text=ČT24' },
    { id: 9, name: 'CNN Prima News', category: 'zpravodajstvi', hd: true, logo: 'https://via.placeholder.com/50x30?text=CNN' },
    { id: 10, name: 'BBC World News', category: 'zpravodajstvi', hd: true, logo: 'https://via.placeholder.com/50x30?text=BBC' },
    { id: 11, name: 'TA3', category: 'zpravodajstvi', hd: true, logo: 'https://via.placeholder.com/50x30?text=TA3' },
    { id: 12, name: 'Euronews', category: 'zpravodajstvi', hd: false, logo: 'https://via.placeholder.com/50x30?text=Euronews' },
    
    // Dokumenty a kultura
    { id: 13, name: 'National Geographic', category: 'dokumenty', hd: true, logo: 'https://via.placeholder.com/50x30?text=NatGeo' },
    { id: 14, name: 'Discovery Channel', category: 'dokumenty', hd: true, logo: 'https://via.placeholder.com/50x30?text=Discovery' },
    { id: 15, name: 'ČT art', category: 'dokumenty', hd: true, logo: 'https://via.placeholder.com/50x30?text=ČT art' },
    { id: 16, name: 'Spektrum', category: 'dokumenty', hd: true, logo: 'https://via.placeholder.com/50x30?text=Spektrum' },
    { id: 17, name: 'Viasat History', category: 'dokumenty', hd: true, logo: 'https://via.placeholder.com/50x30?text=Viasat' },
    { id: 18, name: 'Animal Planet', category: 'dokumenty', hd: true, logo: 'https://via.placeholder.com/50x30?text=Animal' },
    { id: 19, name: 'History Channel HD', category: 'dokumenty', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=History' },
    
    // Filmy a seriály
    { id: 20, name: 'Nova Cinema', category: 'filmy', hd: true, logo: 'https://via.placeholder.com/50x30?text=Nova Cinema' },
    { id: 21, name: 'Prima Max', category: 'filmy', hd: true, logo: 'https://via.placeholder.com/50x30?text=Prima Max' },
    { id: 22, name: 'AXN', category: 'filmy', hd: true, logo: 'https://via.placeholder.com/50x30?text=AXN' },
    { id: 23, name: 'AMC', category: 'filmy', hd: true, logo: 'https://via.placeholder.com/50x30?text=AMC' },
    { id: 24, name: 'Film Europe', category: 'filmy', hd: true, logo: 'https://via.placeholder.com/50x30?text=Film Europe' },
    { id: 25, name: 'HBO HD', category: 'filmy', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=HBO' },
    { id: 26, name: 'HBO2 HD', category: 'filmy', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=HBO2' },
    { id: 27, name: 'HBO3 HD', category: 'filmy', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=HBO3' },
    { id: 28, name: 'Cinemax HD', category: 'filmy', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=Cinemax' },
    
    // Sport
    { id: 29, name: 'Eurosport 1', category: 'sport', hd: true, logo: 'https://via.placeholder.com/50x30?text=Eurosport1' },
    { id: 30, name: 'Eurosport 2', category: 'sport', hd: true, logo: 'https://via.placeholder.com/50x30?text=Eurosport2' },
    { id: 31, name: 'Nova Sport 1', category: 'sport', hd: true, logo: 'https://via.placeholder.com/50x30?text=NovaSport1' },
    { id: 32, name: 'Nova Sport 2', category: 'sport', hd: true, logo: 'https://via.placeholder.com/50x30?text=NovaSport2' },
    { id: 33, name: 'ČT sport', category: 'sport', hd: true, logo: 'https://via.placeholder.com/50x30?text=ČTsport' },
    { id: 34, name: 'Arena Sport 1', category: 'sport', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=Arena1' },
    { id: 35, name: 'Arena Sport 2', category: 'sport', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=Arena2' },
    
    // Prémiové kanály (už jsou označené v různých kategoriích, ale přidáme i sem pro filtrování)
    { id: 36, name: 'Hustler TV HD', category: 'premium', premium: true, hd: true, logo: 'https://via.placeholder.com/50x30?text=18+' },
  ];

  const filteredChannels = activeCategory === 'vsechny' 
    ? channels 
    : activeCategory === 'premium' 
      ? channels.filter(channel => channel.premium)
      : channels.filter(channel => channel.category === activeCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero section */}
      <section className="section-padding bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              TV programy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-poda-blue mb-6 leading-tight reveal-animation delay-100">
              Programová nabídka
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed reveal-animation delay-200">
              Nabízíme více než 85 televizních kanálů v základní nabídce a další prémiové
              balíčky pro náročnější diváky. Vyberte si z široké škály filmů, seriálů, sportu a dokumentů.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section className="section-padding pt-4 pb-4 bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-poda-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channel list */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tv className="h-5 w-5 text-poda-blue mr-2" />
                <span className="font-medium">Zobrazeno {filteredChannels.length} programů</span>
              </div>
              {activeCategory !== 'premium' && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-4">
                    <span className="inline-block w-3 h-3 bg-gray-200 rounded-full mr-1"></span>
                    Základní nabídka
                  </span>
                  <span>
                    <span className="inline-block w-3 h-3 bg-poda-orange rounded-full mr-1"></span>
                    Prémiové programy
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 reveal-animation">
            {filteredChannels.map(channel => (
              <div
                key={channel.id}
                className="bg-white rounded-lg border border-gray-100 p-4 flex items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                  <div className="text-xs font-medium text-gray-500">Logo</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-poda-blue">
                    {channel.name} {channel.hd && <span className="text-xs text-blue-500 font-bold">HD</span>}
                  </h3>
                  {channel.premium ? (
                    <span className="inline-block text-xs bg-poda-orange/10 text-poda-orange px-2 py-0.5 rounded-full">
                      Prémiový kanál
                    </span>
                  ) : (
                    <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      Základní nabídka
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TV Features */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 reveal-animation">
              Funkce PODA net.TV
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-poda-blue mb-4 reveal-animation delay-100">
              Co všechno vám nabízí naše televize
            </h2>
            <p className="text-gray-600 leading-relaxed reveal-animation delay-200">
              Služba PODA net.TV přináší moderní funkce, díky kterým získáte mnohem více 
              než jen klasické televizní vysílání.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 reveal-animation">
              <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-poda-blue" />
              </div>
              <h3 className="text-xl font-semibold text-poda-blue mb-3">Zpětné přehrávání</h3>
              <p className="text-gray-600 mb-4">
                Vrátit se v programu až 7 dní zpět a přehrát si cokoliv, co vás zajímá, bez nutnosti nahrávání.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Přehrajte si pořady až 7 dní zpět</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pozastavení a přetáčení</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Bez nutnosti nahrávání</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 reveal-animation delay-100">
              <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Bookmark className="h-6 w-6 text-poda-blue" />
              </div>
              <h3 className="text-xl font-semibold text-poda-blue mb-3">Nahrávání pořadů</h3>
              <p className="text-gray-600 mb-4">
                Naplánujte si nahrávání vašich oblíbených pořadů a sledujte je kdykoliv později s možností přeskakování reklam.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Neomezený počet nahrávek</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Snadné plánování nahrávání</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Přeskakování reklam</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 reveal-animation delay-200">
              <div className="bg-poda-blue/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Tv className="h-6 w-6 text-poda-blue" />
              </div>
              <h3 className="text-xl font-semibold text-poda-blue mb-3">Sledování na 4 zařízeních</h3>
              <p className="text-gray-600 mb-4">
                Sledujte televizi současně až na 4 různých zařízeních - na televizi, počítači, tabletu nebo mobilním telefonu.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Televize s přijímačem nebo Smart TV</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Počítač nebo notebook</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-poda-orange mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tablet a mobilní telefon</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
            Chcete si objednat naše služby?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Kontaktujte Milana Terče pro získání podrobných informací o programové nabídce a možnostech připojení ve vaší lokalitě.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
            <Link
              to="/kontakt"
              className="bg-white text-poda-blue hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Kontaktovat Milana Terče
            </Link>
            <Link
              to="/internet-tv"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Zobrazit nabídku tarifů <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TvPrograms;

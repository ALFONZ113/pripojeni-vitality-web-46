
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Bookmark, MessageSquare, Wifi, Zap, Lock, Network, Cable } from 'lucide-react';
import { initAnimations } from '../utils/animation';

const BlogPost60GHz = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanupAnimation = initAnimations();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    return () => {
      cleanupAnimation();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero section */}
      <section className="section-padding pt-10 pb-12 bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na všechny články
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
              <span className="bg-blue-100 text-poda-blue px-3 py-1 rounded-full text-sm font-medium">
                Technologie
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                10. 4. 2025
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <User className="h-4 w-4 mr-1" />
                Team PODA
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-poda-blue mb-6 leading-tight">
              60 GHz Internet PODA: Revolučná Technológia pre Vysokorýchlostné Pripojenie
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s pre rodinné domy bez prístupu k optickej sieti.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
          alt="60 GHz bezdrôtová technológia" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <article className="prose prose-lg max-w-none">
                <p>
                  Spoločnosť PODA prináša revolučnú technológiu internetového pripojenia využívajúcu frekvenčné pásmo 
                  60 GHz, ktorá umožňuje rýchlosti až 600 Mb/s pre rodinné domy bez prístupu k optickej sieti. 
                  Tento inovatívny systém ponúka výkon takmer porovnateľný s optickým pripojením a predstavuje 
                  významný pokrok v oblasti bezdrôtového internetu.
                </p>

                <h2>Výhody 60 GHz pripojenia</h2>
                <p>
                  60 GHz internetové pripojenie prináša niekoľko významných výhod oproti tradičným bezdrôtovým technológiám:
                </p>

                <ul>
                  <li>
                    <strong>Vysoká rýchlosť</strong>: Umožňuje prenosové rýchlosti až 1 000 Mb/s, 
                    čo je porovnateľné s optickým pripojením
                  </li>
                  <li>
                    <strong>Nízka latencia</strong>: Poskytuje veľmi nízku a stabilnú odozvu, čo ocenia najmä hráči
                  </li>
                  <li>
                    <strong>Menšie rušenie</strong>: V porovnaní s bežnými Wi-Fi sieťami (2,4 GHz a 5 GHz) 
                    dochádza k výrazne menšiemu vzájomnému rušeniu signálov
                  </li>
                  <li>
                    <strong>Bezpečnosť</strong>: Pásmo 60 GHz je považované za veľmi bezpečné a dlhodobo ho využíva aj armáda
                  </li>
                </ul>

                <p>
                  Napriek kratšiemu dosahu signálu (do cca 400 metrov) predstavuje 60 GHz technológia optimálne riešenie 
                  pre rodinné domy bez prístupu k optickej sieti, ponúkajúc stabilné a vysokorýchlostné pripojenie.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg my-8 flex items-start">
                  <Wifi className="text-poda-blue mr-4 flex-shrink-0 mt-1" size={24} />
                  <p className="m-0 text-gray-700">
                    S 60 GHz technológiou môžete plynulo streamovať 4K videá, hrať online hry s minimálnou latenciou 
                    a využívať všetky výhody ultra-rýchleho internetu aj v lokalitách bez optickej infraštruktúry.
                  </p>
                </div>

                <h2>Mesh Wi-Fi pre lepší signál</h2>
                <p>
                  Mesh Wi-Fi systémy predstavujú efektívne riešenie pre rozšírenie a zlepšenie pokrytia Wi-Fi signálom 
                  v domácnostiach. Na rozdiel od tradičných Wi-Fi extenderov vytvára mesh systém jednotnú sieť s 
                  plynulým prechodom medzi jednotlivými prístupovými bodmi. Hlavné výhody mesh Wi-Fi zahŕňajú:
                </p>

                <ul>
                  <li>Jednotná sieť s automatickým pripojením k najsilnejšiemu signálu</li>
                  <li>Stabilné a rýchle pripojenie vďaka dynamickej optimalizácii</li>
                  <li>Jednoduchá konfigurácia a správa cez mobilnú aplikáciu</li>
                  <li>Škálovateľnosť - možnosť pridania ďalších mesh jednotiek pre rozšírenie pokrytia</li>
                  <li>Samoopraviteľná sieť odolná voči výpadkom jednotlivých uzlov</li>
                </ul>

                <p>
                  Mesh Wi-Fi je ideálny pre väčšie domy, viacpodlažné budovy alebo priestory s komplikovaným pôdorysom, 
                  kde bežné routery nedokážu zaistiť kvalitné pokrytie. Inštaláciou mesh systému možno efektívne eliminovať 
                  miesta so slabým signálom a zaistiť stabilné pripojenie vo všetkých častiach domova.
                </p>

                <h2>Porovnanie s optickým internetom</h2>
                <p>
                  Zatiaľ čo optické pripojenie zostáva špičkou v rýchlosti a stabilite, 60 GHz bezdrôtová technológia sa 
                  mu v mnohých ohľadoch približuje. Optika ponúka vyššie maximálne rýchlosti (až 100 Gb/s), ale 60 GHz pripojenie 
                  s rýchlosťami až 1 Gb/s je pre väčšinu domácností viac než dostačujúce. Hlavnou výhodou 60 GHz technológie je 
                  jej dostupnosť v oblastiach bez optickej infraštruktúry.
                </p>

                <table className="min-w-full bg-white border border-gray-300 my-8">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 bg-gray-100 border-b text-left">Parameter</th>
                      <th className="py-3 px-6 bg-gray-100 border-b text-left">60 GHz bezdrôtová technológia</th>
                      <th className="py-3 px-6 bg-gray-100 border-b text-left">Optické pripojenie</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-6 border-b font-medium">Latencia</td>
                      <td className="py-3 px-6 border-b">Veľmi nízka (10-20ms)</td>
                      <td className="py-3 px-6 border-b">Veľmi nízka (5-15ms)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b font-medium">Stabilita</td>
                      <td className="py-3 px-6 border-b">Vysoká</td>
                      <td className="py-3 px-6 border-b">Veľmi vysoká</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b font-medium">Inštalácia</td>
                      <td className="py-3 px-6 border-b">Rýchla, bez výkopových prác</td>
                      <td className="py-3 px-6 border-b">Zdĺhavejšia, vyžaduje pokládku káblov</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b font-medium">Dosah</td>
                      <td className="py-3 px-6 border-b">Limitovaný (do cca 400m)</td>
                      <td className="py-3 px-6 border-b">Takmer neobmedzený</td>
                    </tr>
                  </tbody>
                </table>

                <p>
                  Pre koncových užívateľov predstavuje 60 GHz technológia výbornú alternatívu k optike, najmä v lokalitách, 
                  kde optické siete nie sú dostupné. Zistite viac o možnostiach pripojenia vo vašej lokalite a vyberte si 
                  riešenie, ktoré najlepšie zodpovedá vašim potrebám.
                </p>

                <div className="flex items-center justify-center space-x-8 my-10">
                  <div className="flex flex-col items-center">
                    <Zap className="text-poda-blue mb-2" size={36} />
                    <p className="font-bold">Až 600 Mb/s</p>
                    <p className="text-sm text-center">Rýchlosť sťahovania</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Network className="text-poda-blue mb-2" size={36} />
                    <p className="font-bold">400 metrov</p>
                    <p className="text-sm text-center">Dosah signálu</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Lock className="text-poda-blue mb-2" size={36} />
                    <p className="font-bold">Vysoká bezpečnosť</p>
                    <p className="text-sm text-center">Šifrovaný prenos</p>
                  </div>
                </div>

              </article>
              
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors">
                    <Share2 className="h-5 w-5 mr-2" />
                    <span>Sdílet</span>
                  </button>
                  <button className="inline-flex items-center text-gray-500 hover:text-poda-blue transition-colors">
                    <Bookmark className="h-5 w-5 mr-2" />
                    <span>Uložit</span>
                  </button>
                </div>
                
                <Link 
                  to="/kontakt" 
                  className="inline-flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>Kontaktovat nás</span>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-poda-blue mb-4">Máte záujem o 60 GHz internet?</h3>
                  <p className="text-gray-600 mb-6">
                    Kontaktujte Milana Terče, ktorý vám poskytne všetky informácie o technológii 60 GHz a možnostiach pripojenia vo vašej lokalite.
                  </p>
                  <Link
                    to="/kontakt"
                    className="btn-secondary w-full flex justify-center"
                  >
                    Kontaktovat
                  </Link>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-poda-blue mb-4">Kľúčové výhody 60 GHz internetu</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Wifi className="h-5 w-5 text-poda-blue mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Vysoká rýchlosť</h4>
                        <p className="text-sm text-gray-600">Až 600 Mb/s pre plynulé streamovanie a hranie hier</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Cable className="h-5 w-5 text-poda-blue mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Bez nutnosti káblov</h4>
                        <p className="text-sm text-gray-600">Rýchla inštalácia bez výkopových prác</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Network className="h-5 w-5 text-poda-blue mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Široké pokrytie</h4>
                        <p className="text-sm text-gray-600">Dostupné aj v oblastiach bez optickej infraštruktúry</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
            Zaujala vás naše nabídka?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
            Nezávazně se informujte o možnostech připojení ve vaší lokalitě. Milan Terč vám rád poskytne veškeré informace.
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
              Zobrazit nabídku tarifů
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost60GHz;

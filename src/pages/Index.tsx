import React from 'react';
import PageMetadata from '../components/page/PageMetadata';
import LoadingState from '../components/page/LoadingState';
import ErrorState from '../components/page/ErrorState';
import MainContent from '../components/page/MainContent';
import PromotionPopup from '../components/PromotionPopup';
import ProgressIndicator from '../components/ui/progress-indicator';
import usePageInitialization from '../hooks/use-page-initialization';
import { Toaster } from '@/components/ui/toaster';
import { Link } from 'react-router-dom';
import { Tv, ArrowRight, MapPin } from 'lucide-react';

// Critical images that should be preloaded
const CRITICAL_IMAGES = [
  '/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png',
  '/poda-logo.svg'
];

// Critical resources for better loading
const CRITICAL_RESOURCES = [
  '/assets/index.css',
  '/assets/index.js'
];

const Index = () => {
  const { 
    isLoading, 
    error, 
    loadingProgress, 
    performanceMetrics 
  } = usePageInitialization({ 
    criticalImages: CRITICAL_IMAGES,
    criticalResources: CRITICAL_RESOURCES,
    enablePerformanceMonitoring: true
  });

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení"
        description="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
      />
      
      {/* Enhanced loading with progress indicator */}
      {isLoading && (
        <>
          <LoadingState />
          <ProgressIndicator 
            isLoading={isLoading} 
            variant="linear"
            size="sm"
          />
        </>
      )}
      
      {/* Main content with fade-in when loaded */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <MainContent />
        
        {/* Lokálne SEO sekcia */}
        {!isLoading && (
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
                  {[
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
                  ].map((location, index) => (
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
        )}
        
        {/* IPTV section */}
        {!isLoading && (
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
        )}
      </div>

      {/* Promotion popup - only show when fully loaded */}
      {!isLoading && <PromotionPopup />}

      {/* Toast notifications */}
      <Toaster />
      
      {/* Performance metrics in development */}
      {process.env.NODE_ENV === 'development' && performanceMetrics.lcp && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 text-xs rounded z-50">
          <div>LCP: {Math.round(performanceMetrics.lcp)}ms</div>
          <div>FCP: {performanceMetrics.fcp ? Math.round(performanceMetrics.fcp) : 'N/A'}ms</div>
          <div>CLS: {performanceMetrics.cls ? performanceMetrics.cls.toFixed(3) : 'N/A'}</div>
        </div>
      )}
    </div>
  );
};

export default Index;

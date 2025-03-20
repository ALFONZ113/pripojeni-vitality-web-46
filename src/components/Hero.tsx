import { ArrowRight, Wifi, Tv, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 radial-gradient">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI0YwRjdGRiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 animate-fade-in">
              Nejlepší připojení pro váš domov
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight animate-fade-up">
              Gigabitový internet<br />
              <span className="text-poda-orange">s chytrou TV</span> pro váš domov
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-up delay-100">
              Vychutnejte si rychlý a stabilní internet spolu s bohatou nabídkou televizních programů za výjimečnou cenu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up delay-200">
              <Link to="/internet-tv" className="btn-primary">
                Prozkoumat nabídku <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/kontakt" className="btn-outline"> Přímo Objednat</Link>
            </div>
          </div>
          
          {/* Feature cards with glass morphism */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
            
            <div className="relative space-y-5">
              {/* Card 1 */}
              <div className="glass-card rounded-xl p-6 animate-fade-up delay-100">
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mr-4">
                    <Wifi className="h-6 w-6 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">Rychlý internet</h3>
                    <p className="text-gray-600">Až 1000/1000 Mbps - bleskové stahování a nahrávání.</p>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="glass-card rounded-xl p-6 animate-fade-up delay-200 ml-6">
                <div className="flex items-start">
                  <div className="bg-poda-orange/10 p-3 rounded-lg mr-4">
                    <Tv className="h-6 w-6 text-poda-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">TV programy</h3>
                    <p className="text-gray-600">Více než 100 programů a možnost výběru 10 vlastních stanic.</p>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="glass-card rounded-xl p-6 animate-fade-up delay-300">
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mr-4">
                    <Zap className="h-6 w-6 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">GPON technologie</h3>
                    <p className="text-gray-600">Nejmodernější optické připojení pro stabilní rychlost.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, TrendingUp, Check } from 'lucide-react';
import { cities as citiesData } from '@/data/cities/citiesData';

const LocalSEOSection = () => {
  // Transformuj dáta z centrálneho zdroja
  const locations = citiesData.map(city => ({
    city: city.name,
    url: `/internet-${city.slug}`,
    population: city.population.includes('000') 
      ? city.population.replace(' 000', 'k').replace('000', 'k')
      : city.population,
    districts: city.districts.slice(0, 3).map(d => d.name).join(', '),
    highlight: city.highlight || 'Optický internet',
    status: city.status,
    coverage: city.coverage
  }));

  return (
    <section className="min-h-screen flex items-center py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary py-2 px-5 rounded-full text-sm font-semibold mb-6 border border-primary/30">
              Dostupnost v regionech
            </span>
            <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6 leading-tight">
              Gigabitový Internet <span className="text-gradient-gold">PODA</span><br />v {locations.length} městech
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Vyberte si své město a zjistěte, proč si tisíce zákazníků vybralo nejrychlejší optický internet PODA
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {locations.map((location, index) => (
              <Link 
                key={index}
                to={location.url}
                className="bg-card rounded-xl p-5 border border-border/30 hover:border-primary/30 hover:shadow-gold-glow/30 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {location.city}
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{location.population}</span>
                </div>
                
                {/* Coverage bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Pokrytí</span>
                    <span className="font-semibold text-foreground">{location.coverage}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${location.coverage}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground mb-3 line-clamp-1">
                  {location.districts}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                    location.status === 'full' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {location.status === 'full' ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3" />
                    )}
                    {location.status === 'full' ? 'Plné pokrytí' : 'Rozšiřujeme'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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

import { CheckCircle } from 'lucide-react';

interface District {
  name: string;
  residents: string;
  coverage: string;
  note?: string;
}

interface CitySpecificSectionProps {
  cityName: string;
  title: string;
  districts: District[];
}

const CitySpecificSection = ({ cityName, title, districts }: CitySpecificSectionProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground text-center mb-4">
            {title.split(cityName)[0]}
            <span className="text-gradient-gold">{cityName}</span>
            {title.split(cityName)[1] || ''}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Kompletní pokrytí ve všech částech města {cityName} s nejmodernější optickou infrastrukturou
          </p>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 ${districts.length > 4 ? 'lg:grid-cols-3' : ''} gap-6`}>
            {districts.map((district, index) => (
              <div 
                key={index} 
                className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-gold-glow/30 transition-all duration-300 border border-border/30 hover:border-primary/30 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {district.name}
                  </h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Obyvatelé:</span>
                    <span className="font-semibold text-foreground">{district.residents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPON pokrytí:</span>
                    <span className="font-semibold text-primary">{district.coverage}</span>
                  </div>
                  {district.note && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <p className="text-sm text-muted-foreground italic">{district.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitySpecificSection;

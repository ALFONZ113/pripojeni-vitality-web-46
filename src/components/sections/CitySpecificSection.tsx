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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-poda-blue to-poda-blue-light bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Kompletní pokrytí ve všech částech města {cityName} s nejmodernější optickou infrastrukturou
          </p>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 ${districts.length > 4 ? 'lg:grid-cols-3' : ''} gap-6`}>
            {districts.map((district, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-poda-blue/30 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-xl mr-3 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-poda-blue group-hover:text-poda-blue-light transition-colors">
                    {district.name}
                  </h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Obyvatelé:</span>
                    <span className="font-semibold text-poda-blue">{district.residents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPON pokrytí:</span>
                    <span className="font-semibold text-green-600">{district.coverage}</span>
                  </div>
                  {district.note && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-poda-blue font-medium italic">{district.note}</p>
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
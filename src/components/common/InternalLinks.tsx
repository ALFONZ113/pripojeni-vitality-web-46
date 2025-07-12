import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Wifi, FileText } from 'lucide-react';

interface InternalLinksProps {
  className?: string;
  title?: string;
  showTitle?: boolean;
}

const InternalLinks = ({ 
  className = "", 
  title = "Další užitečné stránky",
  showTitle = true 
}: InternalLinksProps) => {
  const links = [
    {
      to: "/internet-ostrava",
      text: "PODA Internet Ostrava",
      description: "Rychlé připojení v Ostravě",
      icon: <MapPin className="h-4 w-4" />
    },
    {
      to: "/internet-poruba", 
      text: "PODA Internet Poruba",
      description: "Gigabitové připojení v Porubě",
      icon: <Wifi className="h-4 w-4" />
    },
    {
      to: "/internet-karvina",
      text: "PODA Internet Karviná", 
      description: "Internetové služby v Karviné",
      icon: <MapPin className="h-4 w-4" />
    },
    {
      to: "/internet-havirov",
      text: "PODA Internet Havířov",
      description: "Připojení v Havířově",
      icon: <Wifi className="h-4 w-4" />
    },
    {
      to: "/blog",
      text: "PODA Blog a Novinky",
      description: "Aktuální informace o PODA",
      icon: <FileText className="h-4 w-4" />
    },
    {
      to: "/tarify",
      text: "PODA Tarify a Ceny",
      description: "Všechny tarify PODA internetu",
      icon: <Wifi className="h-4 w-4" />
    }
  ];

  return (
    <section className={`py-8 ${className}`}>
      {showTitle && (
        <h2 className="text-2xl font-bold text-poda-blue mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-poda-orange hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start space-x-3">
              <div className="text-poda-blue group-hover:text-poda-orange transition-colors">
                {link.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-poda-blue group-hover:text-poda-orange transition-colors mb-1">
                  {link.text}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                <div className="flex items-center text-sm text-poda-orange group-hover:text-poda-blue transition-colors">
                  <span>Více informací</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InternalLinks;
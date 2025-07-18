
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Wifi } from 'lucide-react';

interface BlogCTAProps {
  location?: string;
  variant?: 'inline' | 'floating' | 'footer';
  compact?: boolean;
}

const BlogCTA = ({ location, variant = 'inline', compact = false }: BlogCTAProps) => {
  const locationText = location ? ` v ${location}` : '';
  
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <a
          href="tel:+420730431313"
          className="bg-poda-blue hover:bg-poda-blue-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Zavolat"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link
          to="/kontakt"
          className="bg-poda-orange hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Kontakt"
        >
          <MessageSquare className="h-5 w-5" />
        </Link>
      </div>
    );
  }
  
  if (variant === 'footer') {
    return (
      <div className="bg-gradient-to-r from-poda-blue to-poda-orange text-white p-6 rounded-lg mt-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Zajímá vás naše připojení{locationText}?
            </h3>
            <p className="text-blue-100">
              Kontaktujte nás pro bezplatnou konzultaci a ověření dostupnosti.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+420730431313"
              className="bg-white text-poda-blue px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              730 431 313
            </a>
            <Link
              to="/kontakt"
              className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Kontaktní formulář
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Inline variant
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 text-poda-blue hover:text-poda-orange transition-colors">
        <Link to="/kontakt" className="font-medium">
          Kontaktujte nás
        </Link>
        <span className="text-gray-400">|</span>
        <a href="tel:+420730431313" className="font-medium hover:text-poda-orange transition-colors">
          730 431 313
        </a>
      </span>
    );
  }
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
      <div className="flex items-start gap-3">
        <div className="bg-poda-blue text-white p-2 rounded-lg">
          <Wifi className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-poda-blue mb-1">
            Potřebujete rychlé připojení{locationText}?
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            Ověříme dostupnost PODA internetu na vaší adrese a poradíme s výběrem nejvhodnějšího tarifu.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/kontakt"
              className="text-sm bg-poda-blue text-white px-3 py-1.5 rounded hover:bg-poda-blue-dark transition-colors"
            >
              Kontaktní formulář
            </Link>
            <a
              href="tel:+420730431313"
              className="text-sm text-poda-blue border border-poda-blue px-3 py-1.5 rounded hover:bg-poda-blue hover:text-white transition-colors"
            >
              📞 730 431 313
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCTA;


import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Info, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`} role="banner">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center" aria-label="Popri.cz - Domovská stránka">
            <span className="text-orange-500">P</span>o<span className="text-blue-600">pri</span>
            <span className="text-orange-500">.cz</span>
          </Link>
          <div className="flex items-center text-xs text-gray-500 hover:text-orange-500 transition-colors mt-1">
            <Info className="h-3 w-3 mr-1" />
            <span>PODA Internet provider</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-8" aria-label="Hlavní navigace">
          <Link 
            to="/" 
            className={`${isActivePath('/') ? 'text-orange-500' : 'text-blue-600 hover:text-orange-500'} font-medium transition-colors`}
            aria-current={isActivePath('/') ? 'page' : undefined}
          >
            Domů
          </Link>
        </nav>

        <div className="hidden lg:flex items-center">
          <a href="tel:+420730431313" className="flex items-center text-blue-600 hover:text-orange-500 transition-colors font-medium mr-6">
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            +420 730 431 313
          </a>
        </div>

        <button 
          className="lg:hidden text-blue-600" 
          onClick={toggleMobileMenu} 
          aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div 
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-white pt-20 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container px-4 py-6 flex flex-col">
          <nav className="flex flex-col space-y-6" aria-label="Mobilní navigace">
            <Link 
              to="/" 
              className={`${isActivePath('/') ? 'text-orange-500' : 'text-blue-600 hover:text-orange-500'} font-medium text-xl transition-colors`}
              aria-current={isActivePath('/') ? 'page' : undefined}
            >
              Domů
            </Link>
            
            <div className="border-t border-gray-100 pt-6 mt-4">
              <a href="tel:+420730431313" className="flex items-center text-blue-600 hover:text-orange-500 transition-colors font-medium text-xl mb-6">
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                +420 730 431 313
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

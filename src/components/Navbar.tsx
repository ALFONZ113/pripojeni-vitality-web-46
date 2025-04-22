
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Tv, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Zjistíme aktuální cestu pro označení aktivního odkazu
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
  
  // Zavře mobilní menu při navigaci
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`} role="banner">
      <div className="container-custom flex items-center justify-between">
        {/* Logo with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Link to="/" className="text-2xl font-bold text-poda-blue flex items-center" aria-label="Popri.cz - Domovská stránka">
              <span className="text-poda-orange">P</span>o<span className="text-poda-blue">pri</span>
              <span className="text-poda-orange">.cz</span>
            </Link>
          </PopoverTrigger>
          <PopoverContent className="z-50 w-72 p-4 bg-white rounded-md shadow-lg" sideOffset={5}>
            <div className="space-y-3">
              <h3 className="font-semibold text-poda-blue">PODA připojení</h3>
              <p className="text-sm text-gray-600">
                Autorizovaný obchodní zástupce PODA vám zajistí nejrychlejší připojení za nejlepší cenu na trhu.
              </p>
              <div className="pt-2">
                <Link to="/kontakt" className="text-sm text-poda-blue hover:text-poda-orange flex items-center">
                  Nezávazně poptat připojení
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Hlavní navigace">
          <Link 
            to="/" 
            className={`${isActivePath('/') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium transition-colors`}
            aria-current={isActivePath('/') ? 'page' : undefined}
          >
            Domů
          </Link>
          <Link 
            to="/internet-tv" 
            className={`${isActivePath('/internet-tv') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium transition-colors flex items-center`}
            aria-current={isActivePath('/internet-tv') ? 'page' : undefined}
          >
            <Wifi className="mr-1 h-4 w-4" aria-hidden="true" /> Internet & TV
          </Link>
          <Link 
            to="/programy" 
            className={`${isActivePath('/programy') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium transition-colors flex items-center`}
            aria-current={isActivePath('/programy') ? 'page' : undefined}
          >
            <Tv className="mr-1 h-4 w-4" aria-hidden="true" /> TV Programy
          </Link>
          <Link 
            to="/blog" 
            className={`${isActivePath('/blog') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium transition-colors flex items-center`}
            aria-current={isActivePath('/blog') ? 'page' : undefined}
          >
            <FileText className="mr-1 h-4 w-4" aria-hidden="true" /> Blog
          </Link>
          <Link 
            to="/kontakt" 
            className={`${isActivePath('/kontakt') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium transition-colors flex items-center`}
            aria-current={isActivePath('/kontakt') ? 'page' : undefined}
          >
            <MessageSquare className="mr-1 h-4 w-4" aria-hidden="true" /> Kontakt
          </Link>
        </nav>

        {/* Contact Button */}
        <div className="hidden lg:flex items-center">
          <a href="tel:+420730431313" className="flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium mr-6">
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            +420 730 431 313
          </a>
          <Link to="/kontakt" className="btn-secondary">Kontakt</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-poda-blue" 
          onClick={toggleMobileMenu} 
          aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-white pt-20 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container px-4 py-6 flex flex-col">
          <nav className="flex flex-col space-y-6" aria-label="Mobilní navigace">
            <Link 
              to="/" 
              className={`${isActivePath('/') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium text-xl transition-colors`}
              aria-current={isActivePath('/') ? 'page' : undefined}
            >
              Domů
            </Link>
            <Link 
              to="/internet-tv" 
              className={`${isActivePath('/internet-tv') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/internet-tv') ? 'page' : undefined}
            >
              <Wifi className="mr-2 h-5 w-5" aria-hidden="true" /> Internet & TV
            </Link>
            <Link 
              to="/programy" 
              className={`${isActivePath('/programy') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/programy') ? 'page' : undefined}
            >
              <Tv className="mr-2 h-5 w-5" aria-hidden="true" /> TV Programy
            </Link>
            <Link 
              to="/blog" 
              className={`${isActivePath('/blog') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/blog') ? 'page' : undefined}
            >
              <FileText className="mr-2 h-5 w-5" aria-hidden="true" /> Blog
            </Link>
            <Link 
              to="/kontakt" 
              className={`${isActivePath('/kontakt') ? 'text-poda-orange' : 'text-poda-blue hover:text-poda-orange'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/kontakt') ? 'page' : undefined}
            >
              <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" /> Kontakt
            </Link>
            
            <div className="border-t border-gray-100 pt-6 mt-4">
              <a href="tel:+420730431313" className="flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium text-xl mb-6">
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                +420 730 431 313
              </a>
              <Link to="/kontakt" className="btn-secondary w-full flex justify-center">
                Kontaktovat Milana
              </Link>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Tooltip that shows on first visit */}
      <TooltipProvider delayDuration={1000}>
        <Tooltip defaultOpen>
          <TooltipTrigger className="hidden" />
          <TooltipContent side="bottom" className="bg-white text-poda-blue p-2 text-xs border border-blue-100">
            Klikněte na logo pro více informací o PODA připojení
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};

export default Navbar;

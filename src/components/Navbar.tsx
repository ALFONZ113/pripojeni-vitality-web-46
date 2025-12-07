
import React, { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Tv, FileText, MessageSquare, Info, ArrowRight, HandHeart } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Navbar = memo(() => {
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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass py-3' 
          : 'bg-transparent py-5'
      }`} 
      role="banner"
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex flex-col items-start">
          <Link to="/" className="text-2xl font-display font-bold text-foreground flex items-center" aria-label="Popri.cz - Domovská stránka">
            <span className="text-gradient-gold">P</span>o<span className="text-foreground">pri</span>
            <span className="text-gradient-gold">.cz</span>
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mt-1">
                <Info className="h-3 w-3 mr-1" />
                <span>Info o službe</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-card border-border">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-primary font-display">
                  Popri.cz - PODA připojení
                </h3>
                <p className="text-sm text-muted-foreground">
                  Jsme specialisté na PODA připojení. Zajistíme vám nejlepší a nejlevnější internetové připojení na trhu.
                </p>
                <Link 
                  to="/kontakt"
                  className="inline-flex items-center text-sm text-primary hover:text-gold-soft transition-colors mt-2"
                >
                  Kontaktujte nás pro více informací
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <nav className="hidden lg:flex items-center space-x-8" aria-label="Hlavní navigace">
          <Link 
            to="/" 
            className={`${isActivePath('/') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'} font-medium transition-colors link-underline`}
            aria-current={isActivePath('/') ? 'page' : undefined}
          >
            Domů
          </Link>
          <Link 
            to="/internet-tv" 
            className={`${isActivePath('/internet-tv') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'} font-medium transition-colors link-underline flex items-center`}
            aria-current={isActivePath('/internet-tv') ? 'page' : undefined}
          >
            <Wifi className="mr-1 h-4 w-4" aria-hidden="true" /> Internet & TV
          </Link>
          <Link 
            to="/programy" 
            className={`${isActivePath('/programy') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'} font-medium transition-colors link-underline flex items-center`}
            aria-current={isActivePath('/programy') ? 'page' : undefined}
          >
            <Tv className="mr-1 h-4 w-4" aria-hidden="true" /> TV Programy
          </Link>
          <Link 
            to="/pomoc-s-prechodem" 
            className={`${isActivePath('/pomoc-s-prechodem') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'} font-medium transition-colors link-underline flex items-center`}
            aria-current={isActivePath('/pomoc-s-prechodem') ? 'page' : undefined}
          >
            <HandHeart className="mr-1 h-4 w-4" aria-hidden="true" /> Pomoc s přechodem
          </Link>
          <Link 
            to="/blog" 
            className={`${isActivePath('/blog') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'} font-medium transition-colors link-underline flex items-center`}
            aria-current={isActivePath('/blog') ? 'page' : undefined}
          >
            <FileText className="mr-1 h-4 w-4" aria-hidden="true" /> Blog
          </Link>
          <Link 
            to="/kontakt" 
            className={`${isActivePath('/kontakt') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'} font-medium transition-colors link-underline flex items-center`}
            aria-current={isActivePath('/kontakt') ? 'page' : undefined}
          >
            <MessageSquare className="mr-1 h-4 w-4" aria-hidden="true" /> Kontakt
          </Link>
        </nav>

        <div className="hidden lg:flex items-center">
          <a href="tel:+420730431313" className="flex items-center text-foreground hover:text-primary transition-colors font-medium mr-6">
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            +420 730 431 313
          </a>
          <Button variant="gold" size="sm" asChild>
            <Link to="/kontakt">Kontakt</Link>
          </Button>
        </div>

        <button 
          className="lg:hidden text-foreground" 
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
        className={`fixed inset-0 z-40 bg-background pt-20 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container px-4 py-6 flex flex-col">
          <nav className="flex flex-col space-y-6" aria-label="Mobilní navigace">
            <Link 
              to="/" 
              className={`${isActivePath('/') ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-xl transition-colors`}
              aria-current={isActivePath('/') ? 'page' : undefined}
            >
              Domů
            </Link>
            <Link 
              to="/internet-tv" 
              className={`${isActivePath('/internet-tv') ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/internet-tv') ? 'page' : undefined}
            >
              <Wifi className="mr-2 h-5 w-5" aria-hidden="true" /> Internet & TV
            </Link>
            <Link 
              to="/programy" 
              className={`${isActivePath('/programy') ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/programy') ? 'page' : undefined}
            >
              <Tv className="mr-2 h-5 w-5" aria-hidden="true" /> TV Programy
            </Link>
            <Link 
              to="/pomoc-s-prechodem" 
              className={`${isActivePath('/pomoc-s-prechodem') ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/pomoc-s-prechodem') ? 'page' : undefined}
            >
              <HandHeart className="mr-2 h-5 w-5" aria-hidden="true" /> Pomoc s přechodem
            </Link>
            <Link 
              to="/blog" 
              className={`${isActivePath('/blog') ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/blog') ? 'page' : undefined}
            >
              <FileText className="mr-2 h-5 w-5" aria-hidden="true" /> Blog
            </Link>
            <Link 
              to="/kontakt" 
              className={`${isActivePath('/kontakt') ? 'text-primary' : 'text-foreground hover:text-primary'} font-medium text-xl transition-colors flex items-center`}
              aria-current={isActivePath('/kontakt') ? 'page' : undefined}
            >
              <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" /> Kontakt
            </Link>
            
            <div className="border-t border-border pt-6 mt-4">
              <a href="tel:+420730431313" className="flex items-center text-foreground hover:text-primary transition-colors font-medium text-xl mb-6">
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                +420 730 431 313
              </a>
              <Button variant="gold" className="w-full" asChild>
                <Link to="/kontakt">Kontaktní formulář</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;

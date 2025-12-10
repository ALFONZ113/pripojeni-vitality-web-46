import React, { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Tv, FileText, HandHeart, ChevronRight, ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { cities, CityData } from '@/data/cities/citiesData';
import CityPreviewCard from './navigation/CityPreviewCard';

// Group cities by region
const citiesByRegion = cities.reduce((acc, city) => {
  if (!acc[city.region]) acc[city.region] = [];
  acc[city.region].push(city);
  return acc;
}, {} as Record<string, typeof cities>);

const regionOrder = ['Moravskoslezský kraj', 'Jihomoravský kraj', 'Pardubický kraj', 'Královéhradecký kraj'];

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoverageOpen, setIsCoverageOpen] = useState(false);
  const [isMobileCoverageOpen, setIsMobileCoverageOpen] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);
  const [expandedMobileCity, setExpandedMobileCity] = useState<string | null>(null);
  const location = useLocation();
  
  const isActivePath = (path: string) => location.pathname === path;
  const isCityPath = location.pathname.startsWith('/internet-') && location.pathname !== '/internet-tv';
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => { 
    setIsMobileMenuOpen(false); 
    setIsCoverageOpen(false);
    setIsMobileCoverageOpen(false);
    setExpandedMobileCity(null);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Domů', icon: null },
    { path: '/internet-tv', label: 'Internet & TV', icon: Wifi },
    { path: '/programy', label: 'TV Programy', icon: Tv },
    { path: '/pomoc-s-prechodem', label: 'Pomoc s přechodem', icon: HandHeart },
    { path: '/blog', label: 'Blog', icon: FileText },
  ];

  const handleMobileCityClick = (citySlug: string) => {
    if (expandedMobileCity === citySlug) {
      setExpandedMobileCity(null);
    } else {
      setExpandedMobileCity(citySlug);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileCity(null);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="flex flex-col">
            <Logo size="md" />
            <span className="text-[8px] md:text-[10px] text-muted-foreground/70 font-body tracking-wide -mt-0.5">
              Autorizovaný partner <span className="text-primary font-medium">PODA</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`link-underline font-body font-medium transition-colors duration-300 flex items-center ${
                isActivePath(link.path) ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              {link.icon && <link.icon className="mr-1.5 h-4 w-4" />}
              {link.label}
            </Link>
          ))}
          
          {/* Coverage Dropdown with Preview */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCoverageOpen(true)}
            onMouseLeave={() => {
              setIsCoverageOpen(false);
              setHoveredCity(null);
            }}
          >
            <button 
              className={`link-underline font-body font-medium transition-colors duration-300 flex items-center ${
                isCityPath ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              <MapPin className="mr-1.5 h-4 w-4" />
              Pokrytí
              <ChevronDown className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${isCoverageOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isCoverageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {/* City List */}
                  <div className="w-64 p-4 max-h-[70vh] overflow-y-auto border-r border-border/30">
                    {regionOrder.map((region) => (
                      citiesByRegion[region] && (
                        <div key={region} className="mb-4 last:mb-0">
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-2">
                            {region}
                          </h4>
                          <div className="space-y-1">
                            {citiesByRegion[region].map((city) => (
                              <div
                                key={city.slug}
                                onMouseEnter={() => setHoveredCity(city)}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                                  hoveredCity?.slug === city.slug
                                    ? 'bg-primary/10 text-primary'
                                    : location.pathname === `/internet-${city.slug}` 
                                      ? 'bg-primary/10 text-primary' 
                                      : 'hover:bg-secondary text-foreground/80 hover:text-foreground'
                                }`}
                              >
                                <Link 
                                  to={`/internet-${city.slug}`}
                                  className="flex-1 font-medium"
                                >
                                  {city.name}
                                </Link>
                                <span className={`text-xs flex items-center gap-1.5 ${
                                  city.status === 'full' ? 'text-green-500' : 'text-amber-500'
                                }`}>
                                  {city.coverage}%
                                  <span className={`w-2 h-2 rounded-full ${
                                    city.status === 'full' ? 'bg-green-500' : 'bg-amber-500'
                                  }`} />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  {/* Preview Panel */}
                  <AnimatePresence mode="wait">
                    {hoveredCity && (
                      <motion.div
                        key={hoveredCity.slug}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.15 }}
                        className="bg-secondary/30"
                      >
                        <CityPreviewCard city={hoveredCity} variant="desktop" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+420730431313" className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors font-semibold">
            <Phone className="h-4 w-4" />
            +420 730 431 313
          </a>
          <Link to="/kontakt" className="btn-gold px-6 py-2.5 rounded-lg text-sm font-semibold">
            Mám zájem
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-foreground p-2 hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20 lg:hidden"
          >
            <div className="container px-6 py-8 flex flex-col h-full overflow-y-auto">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <Link 
                      to={link.path} 
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        isActivePath(link.path) ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span className="flex items-center font-medium text-lg">
                        {link.icon && <link.icon className="mr-3 h-5 w-5" />}
                        {link.label}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Coverage Accordion */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.1 }}>
                  <button 
                    onClick={() => setIsMobileCoverageOpen(!isMobileCoverageOpen)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      isCityPath ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span className="flex items-center font-medium text-lg">
                      <MapPin className="mr-3 h-5 w-5" />
                      Pokrytí
                    </span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isMobileCoverageOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileCoverageOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/30 space-y-4">
                          {regionOrder.map((region) => (
                            citiesByRegion[region] && (
                              <div key={region}>
                                <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                  {region}
                                </h4>
                                <div className="space-y-1">
                                  {citiesByRegion[region].map((city) => (
                                    <div key={city.slug}>
                                      <button
                                        onClick={() => handleMobileCityClick(city.slug)}
                                        className={`w-full flex items-center justify-between py-2 px-3 rounded-lg transition-all ${
                                          expandedMobileCity === city.slug
                                            ? 'bg-primary/10 text-primary'
                                            : location.pathname === `/internet-${city.slug}` 
                                              ? 'bg-primary/10 text-primary' 
                                              : 'text-foreground/80 hover:bg-secondary hover:text-foreground'
                                        }`}
                                      >
                                        <span className="font-medium">{city.name}</span>
                                        <div className="flex items-center gap-2">
                                          <span className={`text-xs flex items-center gap-1.5 ${
                                            city.status === 'full' ? 'text-green-500' : 'text-amber-500'
                                          }`}>
                                            {city.coverage}%
                                            <span className={`w-2 h-2 rounded-full ${
                                              city.status === 'full' ? 'bg-green-500' : 'bg-amber-500'
                                            }`} />
                                          </span>
                                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                            expandedMobileCity === city.slug ? 'rotate-180' : ''
                                          }`} />
                                        </div>
                                      </button>
                                      
                                      {/* Mobile City Preview Card */}
                                      <AnimatePresence>
                                        {expandedMobileCity === city.slug && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                          >
                                            <CityPreviewCard 
                                              city={city} 
                                              variant="mobile" 
                                              onNavigate={closeMobileMenu}
                                            />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </nav>
              
              <div className="mt-auto pt-8 border-t border-border">
                <a href="tel:+420730431313" className="flex items-center text-foreground hover:text-primary font-medium text-lg mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  +420 730 431 313
                </a>
                <Link to="/kontakt" className="btn-gold w-full flex justify-center py-4 text-lg rounded-xl">
                  Kontaktujte nás
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;

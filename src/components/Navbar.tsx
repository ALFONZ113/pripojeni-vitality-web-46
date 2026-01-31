import React, { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Tv, FileText, HandHeart, ChevronRight, ChevronDown, MapPin, Newspaper, Cpu, Lightbulb, Star, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { cities } from '@/data/cities/citiesData';

// Group cities by region
const citiesByRegion = cities.reduce((acc, city) => {
  if (!acc[city.region]) acc[city.region] = [];
  acc[city.region].push(city);
  return acc;
}, {} as Record<string, typeof cities>);

const regionOrder = ['Moravskoslezský kraj', 'Jihomoravský kraj', 'Pardubický kraj', 'Královéhradecký kraj'];

// Blog categories
const blogCategories = [
  { label: 'Novinky', slug: 'Novinky', icon: Newspaper },
  { label: 'Technologie', slug: 'Technologie', icon: Cpu },
  { label: 'Tipy a rady', slug: 'Tipy a rady', icon: Lightbulb },
  { label: 'Recenze', slug: 'Recenze', icon: Star },
  { label: 'Služby', slug: 'Služby', icon: Briefcase },
];

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoverageOpen, setIsCoverageOpen] = useState(false);
  const [isMobileCoverageOpen, setIsMobileCoverageOpen] = useState(false);
  const [isCoverageExpanded, setIsCoverageExpanded] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isMobileArticlesOpen, setIsMobileArticlesOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => location.pathname === path;
  const isCityPath = location.pathname.startsWith('/internet-') && location.pathname !== '/internet-tv';
  const isBlogPath = location.pathname.startsWith('/blog');
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => { 
    setIsMobileMenuOpen(false); 
    setIsCoverageOpen(false);
    setIsMobileCoverageOpen(false);
    setIsCoverageExpanded(false);
    setIsArticlesOpen(false);
    setIsMobileArticlesOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Domů', icon: null },
    { path: '/programy', label: 'TV Programy', icon: Tv },
    { path: '/pomoc-s-prechodem', label: 'Pomoc s přechodem', icon: HandHeart },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCoverageExpanded(false);
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
        <nav className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`link-underline font-body font-medium transition-colors duration-300 ${
              isActivePath('/') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Domů
          </Link>
          
          {/* Internet & TV with Coverage Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCoverageOpen(true)}
            onMouseLeave={() => {
              setIsCoverageOpen(false);
            }}
          >
            <button 
              className={`link-underline font-body font-medium transition-colors duration-300 flex items-center ${
                isActivePath('/internet-tv') || isCityPath ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              <Wifi className="mr-1.5 h-4 w-4" />
              Internet & TV
              <ChevronDown className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${isCoverageOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isCoverageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[280px]"
                >
                  <div className="p-3">
                    {/* Přehled služeb - Link */}
                    <Link 
                      to="/internet-tv"
                      className="flex items-center gap-2 px-3 py-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                    >
                      <Wifi className="h-4 w-4" />
                      Přehled služeb
                    </Link>
                    
                    {/* Pokrytí - Expandable */}
                    <div className="mt-2">
                      <button
                        onClick={() => setIsCoverageExpanded(!isCoverageExpanded)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <MapPin className="h-4 w-4" />
                          Pokrytí podle města
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCoverageExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isCoverageExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 ml-3 pl-3 border-l-2 border-primary/30 max-h-[50vh] overflow-y-auto">
                              {regionOrder.map((region) => (
                                citiesByRegion[region] && (
                                  <div key={region} className="mb-3 last:mb-0">
                                    <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-2">
                                      {region}
                                    </h5>
                                    <div className="space-y-1">
                                      {citiesByRegion[region].map((city) => (
                                        <Link
                                          key={city.slug}
                                          to={`/internet-${city.slug}`}
                                          className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                                            location.pathname === `/internet-${city.slug}` 
                                              ? 'bg-primary/10 text-primary' 
                                              : 'hover:bg-secondary text-foreground/80 hover:text-foreground'
                                          }`}
                                        >
                                          <span className="font-medium">{city.name}</span>
                                          <span className={`text-xs flex items-center gap-1.5 ${
                                            city.status === 'full' ? 'text-green-500' : 'text-amber-500'
                                          }`}>
                                            {city.coverage}%
                                            <span className={`w-2 h-2 rounded-full ${
                                              city.status === 'full' ? 'bg-green-500' : 'bg-amber-500'
                                            }`} />
                                          </span>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((link) => (
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

          {/* Články Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsArticlesOpen(true)}
            onMouseLeave={() => setIsArticlesOpen(false)}
          >
            <button 
              className={`link-underline font-body font-medium transition-colors duration-300 flex items-center ${
                isBlogPath ? 'text-primary' : 'text-foreground/80 hover:text-primary'
              }`}
            >
              <FileText className="mr-1.5 h-4 w-4" />
              Články
              <ChevronDown className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${isArticlesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isArticlesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-background border border-border/50 rounded-xl shadow-2xl overflow-hidden z-50 min-w-[220px]"
                >
                  <div className="p-3">
                    {/* Všechny články */}
                    <Link 
                      to="/blog"
                      className="flex items-center gap-2 px-3 py-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Všechny články
                    </Link>
                    
                    {/* Kategorie */}
                    <div className="mt-2 space-y-1">
                      {blogCategories.map((category) => (
                        <Link
                          key={category.slug}
                          to={`/blog?category=${encodeURIComponent(category.slug)}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          <category.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium">{category.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
        <button 
          className="lg:hidden text-foreground p-2.5 hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
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
            <div className="container-custom py-6 flex flex-col h-full overflow-y-auto">
              <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobilní navigace">
                {/* Domů link */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                  <Link 
                    to="/" 
                    className={`flex items-center justify-between p-4 rounded-xl transition-all min-h-[52px] ${
                      isActivePath('/') ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span className="flex items-center font-medium text-base">Domů</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                </motion.div>

                {/* Internet & TV with Coverage Accordion */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <button 
                    onClick={() => setIsMobileCoverageOpen(!isMobileCoverageOpen)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      isActivePath('/internet-tv') || isCityPath ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span className="flex items-center font-medium text-lg">
                      <Wifi className="mr-3 h-5 w-5" />
                      Internet & TV
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
                        <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/30 space-y-2">
                          {/* Přehled služeb - Link */}
                          <Link 
                            to="/internet-tv"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 py-3 px-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                          >
                            <Wifi className="h-4 w-4" />
                            Přehled služeb
                          </Link>
                          
                          {/* Pokrytí - Expandable */}
                          <button
                            onClick={() => setIsCoverageExpanded(!isCoverageExpanded)}
                            className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          >
                            <span className="flex items-center gap-2 font-medium">
                              <MapPin className="h-4 w-4" />
                              Pokrytí podle města
                            </span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCoverageExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {isCoverageExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 pl-3 border-l-2 border-primary/20 space-y-3">
                                  {regionOrder.map((region) => (
                                    citiesByRegion[region] && (
                                      <div key={region}>
                                        <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                                          {region}
                                        </h5>
                                        <div className="space-y-1">
                                          {citiesByRegion[region].map((city) => (
                                            <Link
                                              key={city.slug}
                                              to={`/internet-${city.slug}`}
                                              onClick={closeMobileMenu}
                                              className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all ${
                                                location.pathname === `/internet-${city.slug}` 
                                                  ? 'bg-primary/10 text-primary' 
                                                  : 'text-foreground/80 hover:bg-secondary hover:text-foreground'
                                              }`}
                                            >
                                              <span className="font-medium">{city.name}</span>
                                              <span className={`text-xs flex items-center gap-1.5 ${
                                                city.status === 'full' ? 'text-green-500' : 'text-amber-500'
                                              }`}>
                                                {city.coverage}%
                                                <span className={`w-2 h-2 rounded-full ${
                                                  city.status === 'full' ? 'bg-green-500' : 'bg-amber-500'
                                                }`} />
                                              </span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    )
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {navLinks.slice(1).map((link, index) => (
                  <motion.div key={link.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (index + 2) * 0.1 }}>
                    <Link 
                      to={link.path} 
                      onClick={closeMobileMenu}
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

                {/* Články Accordion */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <button 
                    onClick={() => setIsMobileArticlesOpen(!isMobileArticlesOpen)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                      isBlogPath ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <span className="flex items-center font-medium text-lg">
                      <FileText className="mr-3 h-5 w-5" />
                      Články
                    </span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isMobileArticlesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileArticlesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/30 space-y-2">
                          {/* Všechny články */}
                          <Link 
                            to="/blog"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 py-3 px-3 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                          >
                            <FileText className="h-4 w-4" />
                            Všechny články
                          </Link>
                          
                          {/* Kategorie */}
                          {blogCategories.map((category) => (
                            <Link
                              key={category.slug}
                              to={`/blog?category=${encodeURIComponent(category.slug)}`}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-2 py-3 px-3 rounded-lg text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
                            >
                              <category.icon className="h-4 w-4 text-primary" />
                              <span className="font-medium">{category.label}</span>
                            </Link>
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

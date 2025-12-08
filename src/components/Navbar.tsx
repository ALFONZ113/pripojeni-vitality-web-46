import React, { memo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Tv, FileText, MessageSquare, HandHeart, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => location.pathname === path;
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  const navLinks = [
    { path: '/', label: 'Domů', icon: null },
    { path: '/internet-tv', label: 'Internet & TV', icon: Wifi },
    { path: '/programy', label: 'TV Programy', icon: Tv },
    { path: '/pomoc-s-prechodem', label: 'Pomoc s přechodem', icon: HandHeart },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/kontakt', label: 'Kontakt', icon: MessageSquare },
  ];
  
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
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+420730431313" className="flex items-center text-foreground/80 hover:text-primary transition-colors font-medium">
            <Phone className="mr-2 h-4 w-4" />
            +420 730 431 313
          </a>
          <Link to="/kontakt" className="btn-gold px-6 py-2.5 rounded-lg text-sm font-semibold">
            Kontakt
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
            <div className="container px-6 py-8 flex flex-col h-full">
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

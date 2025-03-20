import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Tv, FileText, MessageSquare } from 'lucide-react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-poda-blue flex items-center">
          <span className="text-poda-orange">P</span>řipojení-<span className="text-poda-blue">PODA</span>
          <span className="text-poda-orange">.cz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-poda-blue hover:text-poda-orange font-medium transition-colors">
            Domů
          </Link>
          <Link to="/internet-tv" className="text-poda-blue hover:text-poda-orange font-medium transition-colors flex items-center">
            <Wifi className="mr-1 h-4 w-4" /> Internet & TV
          </Link>
          <Link to="/programy" className="text-poda-blue hover:text-poda-orange font-medium transition-colors flex items-center">
            <Tv className="mr-1 h-4 w-4" /> TV Programy
          </Link>
          <Link to="/blog" className="text-poda-blue hover:text-poda-orange font-medium transition-colors flex items-center">
            <FileText className="mr-1 h-4 w-4" /> Blog
          </Link>
          <Link to="/kontakt" className="text-poda-blue hover:text-poda-orange font-medium transition-colors flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" /> Kontakt
          </Link>
        </nav>

        {/* Contact Button */}
        <div className="hidden lg:flex items-center">
          <a href="tel:+420730431313" className="flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium mr-6">
            <Phone className="mr-2 h-4 w-4" />
            +420 730 431 313
          </a>
          <Link to="/kontakt" className="btn-secondary">Kontakt</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-poda-blue" onClick={toggleMobileMenu} aria-label="Menu">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white pt-20 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="container px-4 py-6 flex flex-col">
          <nav className="flex flex-col space-y-6">
            <Link to="/" className="text-poda-blue hover:text-poda-orange font-medium text-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Domů
            </Link>
            <Link to="/internet-tv" className="text-poda-blue hover:text-poda-orange font-medium text-xl transition-colors flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Wifi className="mr-2 h-5 w-5" /> Internet & TV
            </Link>
            <Link to="/programy" className="text-poda-blue hover:text-poda-orange font-medium text-xl transition-colors flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Tv className="mr-2 h-5 w-5" /> TV Programy
            </Link>
            <Link to="/blog" className="text-poda-blue hover:text-poda-orange font-medium text-xl transition-colors flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <FileText className="mr-2 h-5 w-5" /> Blog
            </Link>
            <Link to="/kontakt" className="text-poda-blue hover:text-poda-orange font-medium text-xl transition-colors flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <MessageSquare className="mr-2 h-5 w-5" /> Kontakt
            </Link>
            
            <div className="border-t border-gray-100 pt-6 mt-4">
              <a href="tel:+420730431313" className="flex items-center text-poda-blue hover:text-poda-orange transition-colors font-medium text-xl mb-6">
                <Phone className="mr-2 h-5 w-5" />
                +420 730 431 313
              </a>
              <Link to="/kontakt" className="btn-secondary w-full flex justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                Kontaktovat Milana
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>;
};
export default Navbar;
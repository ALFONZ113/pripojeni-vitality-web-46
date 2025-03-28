
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Info } from 'lucide-react';

const Footer = () => {
  return <footer className="bg-poda-blue text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold flex items-center mb-4">
              <span className="text-poda-orange">P</span>řipojení-<span className="text-white">PODA</span>
              <span className="text-poda-orange">.cz</span>
            </Link>
            <p className="text-blue-100 leading-relaxed">
              Poskytujeme nejmodernější internetové a televizní služby 
              s důrazem na kvalitu, spolehlivost a zákaznickou spokojenost.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-blue-200 hover:text-poda-orange transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-poda-orange transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-poda-orange transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-poda-orange">Nabídka</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/internet-tv" className="text-blue-100 hover:text-poda-orange transition-colors">
                  Internet a TV pro byty
                </Link>
              </li>
              <li>
                <Link to="/internet-tv" className="text-blue-100 hover:text-poda-orange transition-colors">
                  Internet a TV pro domy
                </Link>
              </li>
              <li>
                <Link to="/programy" className="text-blue-100 hover:text-poda-orange transition-colors">
                  Programová nabídka
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-blue-100 hover:text-poda-orange transition-colors">
                  Blog a novinky
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-poda-orange">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-blue-200 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Milan Terč</p>
                  <a href="tel:+420730431313" className="text-blue-100 hover:text-poda-orange transition-colors">
                    +420 730 431 313
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-blue-200 mt-0.5" />
                <div>
                  <p className="text-white font-medium">E-mail</p>
                  <a href="mailto:terc@obchod.poda.cz" className="text-blue-100 hover:text-poda-orange transition-colors">
                    terc@obchod.poda.cz
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-blue-200 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Adresa</p>
                  <address className="text-blue-100 not-italic">
                    Připojení-PODA.cz<br />
                    Ostrava, Česká republika
                  </address>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-lg font-semibold mb-5 text-poda-orange">Rychlý kontakt</h4>
            <Link to="/kontakt" className="bg-poda-orange hover:bg-poda-orange/90 text-white px-6 py-3 rounded-lg 
              font-medium transition-all duration-300 inline-block mb-4">Kontaktovat Milan Terč</Link>
            <p className="text-blue-100 mt-2">
              Máte otázky nebo potřebujete poradit s výběrem služby? 
              Neváhejte nás kontaktovat, rádi vám pomůžeme.
            </p>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Připojení-PODA.cz. Všechna práva vyhrazena.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <a href="#" className="hover:text-poda-orange transition-colors">Ochrana soukromí</a>
              <a href="#" className="hover:text-poda-orange transition-colors">Obchodní podmínky</a>
              <a href="#" className="hover:text-poda-orange transition-colors">Cookies</a>
            </div>
          </div>
          
          {/* Legal information */}
          <div className="flex items-start mt-6 pt-6 border-t border-blue-800/50">
            <Info className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-300">
              <p className="mb-1">Tato webová stránka je provozována obchodním zástupcem společnosti PODA, nikoliv samotnou společností PODA.</p>
              <p>Milan Terč | IČO: 75546230 | Sídlo: Porubská 944/5, 708 00, Ostrava - Poruba | Zapsán v živnostenském rejstříku</p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;

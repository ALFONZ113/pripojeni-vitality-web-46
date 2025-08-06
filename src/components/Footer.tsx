import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Info } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-poda-blue text-white pt-16 pb-8" role="contentinfo" aria-label="Patička webu">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <section aria-label="O společnosti">
            <Link to="/" className="text-2xl font-bold flex items-center mb-4" aria-label="Domovská stránka Popri.cz">
              <span className="text-poda-orange">P</span>o<span className="text-white">pri</span>
              <span className="text-poda-orange">.cz</span>
            </Link>
            <p className="text-blue-100 leading-relaxed">
              Poskytujeme nejmodernější internetové a televizní služby 
              s důrazem na kvalitu, spolehlivost a zákaznickou spokojenost.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/podacz/" className="text-blue-200 hover:text-poda-orange transition-colors" aria-label="Facebook PODA">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/poda.cz/" className="text-blue-200 hover:text-poda-orange transition-colors" aria-label="Instagram PODA">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/poda-a-s-/" className="text-blue-200 hover:text-poda-orange transition-colors" aria-label="LinkedIn PODA">
                <Linkedin size={20} />
              </a>
            </div>
          </section>

          {/* Navigation Links */}
          <nav aria-label="Hlavní navigace v patičce">
            <h2 className="text-lg font-semibold mb-5 text-poda-orange">Nabídka</h2>
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
              <li>
                <Link to="/promo-akce" className="text-blue-100 hover:text-poda-orange transition-colors">
                  Promo akce - První měsíc ZDARMA
                </Link>
              </li>
              <li>
                <Link to="/giga-internet" className="text-blue-100 hover:text-poda-orange transition-colors">Gigabitový internet už i do Domu </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <section aria-label="Kontaktní informace">
            <h2 className="text-lg font-semibold mb-5 text-poda-orange">Kontakt</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-blue-200 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white font-medium">Milan Terč</p>
                  <a href="tel:+420730431313" className="text-blue-100 hover:text-poda-orange transition-colors">
                    +420 730 431 313
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-blue-200 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white font-medium">E-mail</p>
                  <a href="mailto:terc@obchod.poda.cz" className="text-blue-100 hover:text-poda-orange transition-colors">
                    terc@obchod.poda.cz
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-blue-200 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-white font-medium">Adresa</p>
                  <address className="text-blue-100 not-italic">
                    Popri.cz<br />
                    Ostrava, Česká republika
                  </address>
                </div>
              </li>
            </ul>
          </section>

          {/* Quick Access */}
          <section aria-label="Rychlý kontakt">
            <h2 className="text-lg font-semibold mb-5 text-poda-orange">Rychlý kontakt</h2>
            <Link to="/kontakt" className="bg-poda-orange hover:bg-poda-orange/90 text-white px-6 py-3 rounded-lg 
              font-medium transition-all duration-300 inline-block mb-4">Kontaktný formulár</Link>
            <p className="text-blue-100 mt-2">
              Máte otázky nebo potřebujete poradit s výběrem služby? 
              Neváhejte nás kontaktovat, rádi vám pomůžeme.
            </p>
          </section>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Popri.cz. Všechna práva vyhrazena.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200">
              <a href="/ochrana-soukromi" className="hover:text-poda-orange transition-colors">Ochrana soukromí</a>
              <a href="/obchodni-podminky" className="hover:text-poda-orange transition-colors">Obchodní podmínky</a>
              <a href="/cookies" className="hover:text-poda-orange transition-colors">Cookies</a>
            </div>
          </div>
          
          {/* Legal information */}
          <div className="flex items-start mt-6 pt-6 border-t border-blue-800/50">
            <Info className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs text-blue-300">
              <p className="mb-1">Tato webová stránka je provozována obchodním zástupcem společnosti <span className="text-poda-orange">PO</span>DA pod doménou Popri.cz, nikoliv samotnou společností <span className="text-poda-orange">PO</span>DA.</p>
              <p>Milan Terč | IČO: 75546230 | Sídlo: Porubská 944/5, 708 00, Ostrava - Poruba | Zapsán v živnostenském rejstříku</p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
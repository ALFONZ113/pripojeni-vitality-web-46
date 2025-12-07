import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-noir-light border-t border-border text-foreground pt-16 pb-8" role="contentinfo">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <section>
            <Logo size="lg" className="mb-4" />
            <p className="text-muted-foreground leading-relaxed text-sm mb-6">
              Poskytujeme nejmodernější internetové a televizní služby 
              s důrazem na kvalitu, spolehlivost a zákaznickou spokojenost.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/podacz/" 
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/poda.cz/" 
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/poda-a-s-/" 
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </section>

          {/* Navigation Links */}
          <nav>
            <h2 className="text-lg font-display font-semibold mb-5 text-foreground">Nabídka</h2>
            <ul className="space-y-3">
              {[
                { to: '/internet-tv', label: 'Internet a TV pro byty' },
                { to: '/internet-tv', label: 'Internet a TV pro domy' },
                { to: '/programy', label: 'Programová nabídka' },
                { to: '/blog', label: 'Blog a novinky' },
                { to: '/promo-akce', label: 'Promo akce' },
                { to: '/giga-internet', label: 'Gigabitový internet' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <section>
            <h2 className="text-lg font-display font-semibold mb-5 text-foreground">Kontakt</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-lg p-2 mr-3">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Obchodní zástupce</p>
                  <a href="tel:+420730431313" className="text-muted-foreground hover:text-primary transition-colors">
                    +420 730 431 313
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-lg p-2 mr-3">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">E-mail</p>
                  <a href="mailto:terc@obchod.poda.cz" className="text-muted-foreground hover:text-primary transition-colors">
                    terc@obchod.poda.cz
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 rounded-lg p-2 mr-3">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">Adresa</p>
                  <address className="text-muted-foreground not-italic text-sm">
                    Ostrava, Česká republika
                  </address>
                </div>
              </li>
            </ul>
          </section>

          {/* Quick Access */}
          <section>
            <h2 className="text-lg font-display font-semibold mb-5 text-foreground">Rychlý kontakt</h2>
            <Button variant="gold" asChild className="w-full mb-4">
              <Link to="/kontakt">Kontaktní formulář</Link>
            </Button>
            <p className="text-muted-foreground text-sm">
              Máte otázky nebo potřebujete poradit? 
              Neváhejte nás kontaktovat.
            </p>
          </section>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              &copy; {currentYear} Popri.cz. Všechna práva vyhrazena.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/ochrana-soukromi" className="text-muted-foreground hover:text-primary transition-colors">
                Ochrana soukromí
              </Link>
              <Link to="/obchodni-podminky" className="text-muted-foreground hover:text-primary transition-colors">
                Obchodní podmínky
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
          
          {/* Legal information */}
          <div className="flex items-start pt-6 border-t border-border/50">
            <div className="bg-secondary/50 rounded-lg p-2 mr-3 flex-shrink-0">
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">
                Tato webová stránka je provozována obchodním zástupcem společnosti <span className="text-primary">PO</span>DA pod doménou Popri.cz, nikoliv samotnou společností <span className="text-primary">PO</span>DA.
              </p>
              <p>Obchodní zástupce | IČO: 75456230 | Sídlo: Ostrava | Zapsán v živnostenském rejstříku</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

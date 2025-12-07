import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';

const BlogPostCTA = () => {
  return (
    <section className="section-padding bg-secondary/50 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-6 reveal-animation">
          Zaujala vás naše nabídka?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
          Nezávazně se informujte o možnostech připojení ve vaší lokalitě. Náš obchodní zástupce vám rád poskytne veškeré informace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
          <Link
            to="/kontakt"
            className="btn-gold inline-flex items-center justify-center"
          >
            Kontaktní formulář
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="tel:+420730431313"
            className="btn-noir inline-flex items-center justify-center"
          >
            <Phone className="mr-2 h-5 w-5" />
            730 431 313
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPostCTA;

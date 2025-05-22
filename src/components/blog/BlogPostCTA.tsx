
import { Link } from 'react-router-dom';

const BlogPostCTA = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-poda-blue to-poda-blue-light text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
          Zaujala vás naše nabídka?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed reveal-animation delay-100">
          Nezávazně se informujte o možnostech připojení ve vaší lokalitě. Milan Terč vám rád poskytne veškeré informace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-animation delay-200">
          <Link
            to="/kontakt"
            className="bg-white text-poda-blue hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Kontaktovat Milana Terče
          </Link>
          <Link
            to="/internet-tv"
            className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Zobrazit nabídku tarifů
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPostCTA;

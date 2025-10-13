import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CallbackForm from '../CallbackForm';

interface FastHeroContentProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

/**
 * Optimized hero content for instant LCP - no animations or delays
 * This component renders immediately without waiting for any effects
 */
const FastHeroContent = ({ handleContactClick }: FastHeroContentProps) => {
  return (
    <div className="text-center max-w-5xl mx-auto">
      <span className="inline-flex items-center gap-2 bg-gradient-to-r from-poda-blue/10 to-poda-orange/10 text-poda-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-poda-blue/20">
        <svg className="w-4 h-4 text-poda-orange" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Vaše cesta k nejlepšímu PODA internetu
      </span>
      
      {/* LCP Element - rendered immediately with no animations */}
      <h1 
        id="hero-title" 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
        style={{ 
          opacity: 1,
          transform: 'translateY(0)',
          contentVisibility: 'auto',
          containIntrinsicSize: '1200px 300px'
        }}
      >
        <span className="bg-gradient-to-r from-poda-blue to-poda-blue-light bg-clip-text text-transparent">
          PODA Internet
        </span>
        <br />
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700">
          Prémiové optické gigabitové
        </span>
        <br />
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-poda-orange to-poda-orange-light bg-clip-text text-transparent">
          připojení a smart TV
        </span>
      </h1>
      
      <p className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
        Přinášíme Vám rychlé <span className="font-semibold text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="font-semibold text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až <span className="font-bold text-poda-blue">1000 Mbps</span>. Užívejte si internet i TV bez kompromisů.
      </p>
      
      {/* Callback Form - Rendered immediately */}
      <div className="mb-8 max-w-md mx-auto">
        <CallbackForm />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link 
          to="/tarify" 
          className="btn-primary group transition-all shadow-lg hover:shadow-xl" 
          aria-label="Prozkoumat nabídku"
        >
          Prozkoumat nabídku
          <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link 
          to="/kontakt" 
          onClick={handleContactClick}
          className="btn-outline hover:bg-poda-blue/10 shadow-sm hover:shadow-md" 
          aria-label="Kontaktní formulář"
        >
          Kontaktní formulář
        </Link>
      </div>
    </div>
  );
};

export default FastHeroContent;
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
    <div className="text-center">
      <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
        Vaše cesta k nejlepšímu PODA internetu
      </span>
      
      {/* LCP Element - rendered immediately with no animations */}
      <h1 
        id="hero-title" 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight"
        style={{ 
          opacity: 1,
          transform: 'translateY(0)',
          contentVisibility: 'auto',
          containIntrinsicSize: '1200px 200px'
        }}
      >
        PODA Internet - Prémiové optické gigabitové 
        <span className="text-poda-orange block sm:inline"> připojení a smart TV</span>
      </h1>
      
      <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
        Přinášíme Vám rychlé <span className="text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až 1000 Mbps. Užívejte si internet i TV bez kompromisů.
      </p>
      
      {/* Callback Form - Rendered immediately */}
      <div className="mb-6">
        <CallbackForm />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/tarify" 
          className="btn-primary group transition-all" 
          aria-label="Prozkoumat nabídku"
        >
          Prozkoumat nabídku
          <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link 
          to="/kontakt" 
          onClick={handleContactClick}
          className="btn-outline hover:bg-poda-blue/10" 
          aria-label="Kontaktní formulář"
        >
          Kontaktní formulář
        </Link>
      </div>
    </div>
  );
};

export default FastHeroContent;
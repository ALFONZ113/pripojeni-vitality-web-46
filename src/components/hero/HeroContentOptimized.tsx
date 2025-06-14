
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CallbackForm from '../CallbackForm';

interface HeroContentOptimizedProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContentOptimized = ({ handleContactClick }: HeroContentOptimizedProps) => {
  return (
    <div className="text-center lg:text-left hero-content-animated">
      <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4 hero-badge">
        Popri.cz – Vaše cesta k nejlepšímu PODA internetu
      </span>
      
      <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight hero-title">
        Prémiové optické gigabitové 
        <span className="text-poda-orange block md:inline"> připojení a smart TV</span>
      </h1>
      
      <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 hero-description">
        S Popri.cz vám zajistíme rychle <span className="text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až 1000 Mbps. Užijte si stabilní internet a TV bez výpadků.
      </p>
      
      {/* Callback Form */}
      <div className="mb-6 hero-form">
        <CallbackForm />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start hero-buttons">
        <Link to="/tarify" className="btn-primary group transition-all" aria-label="Prozkoumat nabídku">
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

export default HeroContentOptimized;

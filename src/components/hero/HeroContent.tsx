
import React from 'react';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CallbackForm from '../CallbackForm';

interface HeroContentProps {
  handleContactClick: (e: React.MouseEvent) => void;
}

const HeroContent = ({ handleContactClick }: HeroContentProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  return (
    <div className="text-center lg:text-left">
      <motion.div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-green-100 text-poda-blue py-2 px-4 rounded-full text-sm font-medium mb-6 border border-blue-200" variants={item}>
        <Zap className="w-4 h-4 mr-2" />
        <span>Najrýchlejší internet v Ostrave za najlepšiu cenu</span>
      </motion.div>
      
      <motion.h1 id="hero-title" variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-4 leading-tight tracking-tight">
        PODA Internet 
        <span className="text-poda-orange block md:inline"> 1000 Mbps</span>
        <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mt-2">
          už od 25€/mesiac
        </span>
      </motion.h1>
      
      <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Inštalácia ZDARMA</span>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
          <Clock className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">24/7 Podpora</span>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
          <Zap className="w-5 h-5 text-orange-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">TV zahrnutá</span>
        </div>
      </motion.div>
      
      <motion.p variants={item} className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
        Získajte najrýchlejší gigabitový internet s TV balíkom <strong>úplne ZDARMA</strong>. 
        Bez skrytých poplatkov, bez zbytočných komplikácií. 
        <span className="text-poda-blue font-semibold"> Vaše pripojenie bude aktívne už zajtra!</span>
      </motion.p>
      
      {/* Enhanced Callback Form */}
      <motion.div variants={item} className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-poda-blue mb-3 text-center lg:text-left">
            🎯 Získajte cenové návrh na mieru za 60 sekúnd
          </h3>
          <CallbackForm />
        </div>
      </motion.div>
      
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link to="/tarify" className="btn-primary group transition-all bg-gradient-to-r from-poda-blue to-blue-600 hover:from-blue-600 hover:to-poda-blue shadow-lg hover:shadow-xl" aria-label="Porovnať všetky tarify">
          <Zap className="mr-2 h-5 w-5" />
          Porovnať tarify
          <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link 
          to="/kontakt" 
          onClick={handleContactClick}
          className="btn-outline hover:bg-poda-blue/10 border-2" 
          aria-label="Osobná konzultácia"
        >
          <span className="mr-2">📞</span>
          Osobná konzultácia
        </Link>
      </motion.div>
      
      {/* Urgency/Scarcity element */}
      <motion.div variants={item} className="mt-6 text-center lg:text-left">
        <p className="text-sm text-gray-500">
          ⚡ <strong>Akcia platí len tento mesiac!</strong> Posledných 7 miest pre vašu lokalitu.
        </p>
      </motion.div>
    </div>
  );
};

export default HeroContent;

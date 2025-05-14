
import { ArrowRight, Wifi, Tv, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CallbackForm from './CallbackForm';

const MobileHero = () => {
  // Simplified animation variants for mobile
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.4 }
    }
  };

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
        >
          <motion.span variants={item} className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            Popri.cz – Vaše cesta k nejlepšímu PODA internetu
          </motion.span>
          
          <motion.h1 variants={item} className="text-3xl font-bold text-poda-blue mb-4 leading-tight tracking-tight">
            Prémiové optické gigabitové připojení
            <span className="text-poda-orange block">a smart TV</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-gray-600 text-base mb-6 leading-relaxed px-4">
            S Popri.cz vám zajistíme rychle <span className="text-poda-blue"><span className="text-poda-orange">PO</span>DA</span> <span className="text-poda-blue"><span className="text-poda-orange">při</span>pojení</span> s garantovanou rychlostí až 1000 Mbps.
          </motion.p>
          
          {/* Callback Form */}
          <motion.div variants={item} className="mb-6">
            <CallbackForm />
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col gap-3">
            <Link to="/tarify" className="btn-primary group transition-all mx-4">
              Prozkoumat nabídku
              <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link to="/kontakt" className="btn-outline hover:bg-poda-blue/10 mx-4">
              Kontaktní formulář
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Feature cards - simplified for mobile */}
        <div className="mt-10 space-y-4">
          <motion.article 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 border border-white/20 shadow-md"
          >
            <div className="flex items-start">
              <div className="bg-poda-blue/10 p-3 rounded-lg mr-3 flex items-center justify-center">
                <Wifi className="h-5 w-5 text-poda-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-poda-blue mb-1">Rychlý optický internet</h3>
                <p className="text-gray-600 text-sm">PODA připojení od Popri.cz s garantovanou rychlostí až 1000/1000 Mbps.</p>
              </div>
            </div>
          </motion.article>
          
          <motion.article 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 border border-white/20 shadow-md"
          >
            <div className="flex items-start">
              <div className="bg-poda-orange/10 p-3 rounded-lg mr-3 flex items-center justify-center">
                <Tv className="h-5 w-5 text-poda-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-poda-blue mb-1">Chytrá televize</h3>
                <p className="text-gray-600 text-sm">S Popri.cz získáte více než 100 TV programů a sledování na všech zařízeních.</p>
              </div>
            </div>
          </motion.article>
          
          <motion.article 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-4 border border-white/20 shadow-md"
          >
            <div className="flex items-start">
              <div className="bg-poda-blue/10 p-3 rounded-lg mr-3 flex items-center justify-center">
                <Zap className="h-5 w-5 text-poda-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-poda-blue mb-1">Moderní technologie</h3>
                <p className="text-gray-600 text-sm">Optická síť GPON od PODA zajišťuje maximální stabilitu a komfort.</p>
              </div>
            </div>
          </motion.article>
        </div>

        {/* "Why Popri.cz" section - simplified for mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-md border border-blue-50"
        >
          <h2 className="text-xl font-bold text-poda-blue mb-3 text-center">Proč právě Popri.cz?</h2>
          <p className="text-gray-600 mb-4 text-center text-sm">
            Jsme <span className="text-poda-blue font-semibold">popri</span> vám při každém kroku instalace PODA internetu.
          </p>
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="font-semibold text-poda-blue mb-1">Rychlost</h3>
              <p className="text-gray-600 text-sm">Jsme popri vás, když potřebujete rychlé PODA připojení.</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-poda-blue mb-1">Spolehlivost</h3>
              <p className="text-gray-600 text-sm">S Popri.cz získáte stabilní PODA internet, na který se můžete spolehnout.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-xs text-gray-400 text-center"
        >
          <p>Tato webová stránka je provozována obchodním zástupcem společnosti PODA.</p>
          <p className="mt-1">Milan Terč | IČO: 75546230</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileHero;

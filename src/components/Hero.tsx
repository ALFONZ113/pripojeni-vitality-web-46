
import { ArrowRight, Wifi, Tv, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  const featureCardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 0.2 + index * 0.1
      }
    })
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background with subtle gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI0YwRjdGRiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100/40 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <div className="text-center lg:text-left">
            <motion.span 
              variants={item} 
              className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4"
            >
              Nejlepší připojení pro váš domov
            </motion.span>
            <motion.h1 
              variants={item} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight"
            >
              Gigabitový internet<br />
              <span className="text-poda-orange">s chytrou TV</span> pro váš domov
            </motion.h1>
            <motion.p 
              variants={item} 
              className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Vychutnejte si rychlý a stabilní internet spolu s bohatou nabídkou televizních programů za výjimečnou cenu.
            </motion.p>
            <motion.div 
              variants={item} 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/internet-tv" className="btn-primary group transition-all">
                Prozkoumat nabídku 
                <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/kontakt" className="btn-outline hover:bg-poda-blue/10">
                Kontaktní formulář
              </Link>
            </motion.div>
          </div>
          
          {/* Feature cards with glass morphism */}
          <div className="relative mt-10 lg:mt-0">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
            
            <div className="relative space-y-6">
              {/* Card 1 */}
              <motion.div 
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                custom={0}
                variants={featureCardVariants}
                className="glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all"
              >
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mr-4 flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">Rychlý internet</h3>
                    <p className="text-gray-600">Až 1000/1000 Mbps - bleskové stahování a nahrávání.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Card 2 */}
              <motion.div 
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                custom={1}
                variants={featureCardVariants}
                className="glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all ml-6"
              >
                <div className="flex items-start">
                  <div className="bg-poda-orange/10 p-3 rounded-lg mr-4 flex items-center justify-center">
                    <Tv className="h-6 w-6 text-poda-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">TV programy</h3>
                    <p className="text-gray-600">Více než 100 programů a možnost výběru 10 vlastních stanic.</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Card 3 */}
              <motion.div 
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                custom={2}
                variants={featureCardVariants}
                className="glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all"
              >
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mr-4 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">GPON technologie</h3>
                    <p className="text-gray-600">Nejmodernější optické připojení pro stabilní rychlost.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;

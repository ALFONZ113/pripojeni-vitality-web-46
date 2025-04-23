
import { ArrowRight, Wifi, Tv, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const container = {
    hidden: {
      opacity: 0
    },
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
  return <section className="relative pt-32 pb-24 overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIHN0cm9rZT0iI0YwRjdGRiIgc3Ryb2tlLXdpZHRoPSIxIiBjeD0iMTAiIGN5PSIxMCIgcj0iMyIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100/40 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" initial="hidden" animate="show" variants={container}>
          <div className="text-center lg:text-left">
            <motion.span variants={item} className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
              Pripojenie internetu a televízie PODA jednoducho u vás doma
            </motion.span>
            <motion.h1 id="hero-title" variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold text-poda-blue mb-6 leading-tight tracking-tight">
              Stabilné pripojenie a kvalitná televízia od PODA 
            </motion.h1>
            <motion.p variants={item} className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Pripojíme vás k rýchlemu a spoľahlivému internetu s rýchlosťou až 1000 Mbps priamo u vás doma. Oceníte viac ako <b>100 TV programov</b>, stabilné pripojenie v celej domácnosti a podporu, na ktorú sa môžete obrátiť vždy, keď budete potrebovať. Bez zbytočných komplikácií, bez skrytých poplatkov a bez starostí.<br /><br />
              Prepojíme vás s moderným svetom – pre viac informácií využite <b>kontaktný formulár</b>.
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/tarify" className="btn-primary group transition-all" aria-label="Zobraziť ponuku tarifov">
                Zobraziť tarify
                <ArrowRight className="ml-2 h-5 w-5 inline transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link to="/kontakt" className="btn-outline hover:bg-poda-blue/10" aria-label="Kontaktný formulár">
                Kontaktný formulár
              </Link>
            </motion.div>
          </div>
          
          <div className="relative mt-10 lg:mt-0">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" aria-hidden="true"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" aria-hidden="true"></div>
            
            <div className="relative space-y-6">
              <motion.article initial="offscreen" whileInView="onscreen" viewport={{
              once: true,
              amount: 0.2
            }} custom={0} variants={featureCardVariants} className="glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all">
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mr-4 flex items-center justify-center" aria-hidden="true">
                    <Wifi className="h-6 w-6 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">Rýchly optický internet</h3>
                    <p className="text-gray-600">Stabilné pripojenie s garantovanou rýchlosťou až 1000/1000 Mbps pre vašu domácnosť.</p>
                  </div>
                </div>
              </motion.article>
              
              <motion.article initial="offscreen" whileInView="onscreen" viewport={{
              once: true,
              amount: 0.2
            }} custom={1} variants={featureCardVariants} className="glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all ml-6">
                <div className="flex items-start">
                  <div className="bg-poda-orange/10 p-3 rounded-lg mr-4 flex items-center justify-center" aria-hidden="true">
                    <Tv className="h-6 w-6 text-poda-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">Televízia na mieru</h3>
                    <p className="text-gray-600">Viac než 100 TV programov, vlastný výber staníc a sledovanie na viacerých zariadeniach.</p>
                  </div>
                </div>
              </motion.article>
              
              <motion.article initial="offscreen" whileInView="onscreen" viewport={{
              once: true,
              amount: 0.2
            }} custom={2} variants={featureCardVariants} className="glass-card rounded-xl p-6 border border-white/20 shadow-xl backdrop-blur-md hover:shadow-2xl transition-all">
                <div className="flex items-start">
                  <div className="bg-poda-blue/10 p-3 rounded-lg mr-4 flex items-center justify-center" aria-hidden="true">
                    <Zap className="h-6 w-6 text-poda-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-poda-blue mb-2">Moderné technológie</h3>
                    <p className="text-gray-600">Optická sieť GPON zaručí maximálnu stabilitu a komfort bez kompromisov.</p>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5,
        duration: 0.8
      }} className="mt-16 text-xs text-gray-400 text-center max-w-3xl mx-auto">
          <p>Tato webová stránka je provozována obchodním zástupcem společnosti PODA, nikoliv samotnou společností PODA.</p>
          <p className="mt-1">
            Milan Terč | IČO: 75546230 | Sídlo: Porubská 944/5, 708 00, Ostrava - Poruba | Zapsán v živnostenském rejstříku
          </p>
        </motion.div>
      </div>
    </section>;
};

export default Hero;

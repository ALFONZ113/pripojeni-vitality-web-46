import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSideDecorations = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop) return null;

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, delay: 0.5 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, delay: 0.5 }
  };

  return (
    <>
      {/* Left side decorations */}
      <motion.div
        className="fixed left-0 top-1/4 -translate-y-1/2 z-0 pointer-events-none"
        style={{ width: '300px', height: '400px' }}
        {...fadeInLeft}
      >
        <motion.img
          src="/src/assets/decorations/fiber-optic.svg"
          alt=""
          className="w-full h-full object-contain opacity-40"
          animate={floatAnimation}
          style={{ willChange: 'transform' }}
        />
      </motion.div>

      <motion.div
        className="fixed left-4 bottom-1/4 z-0 pointer-events-none"
        style={{ width: '300px', height: '400px' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.img
          src="/src/assets/decorations/wifi-waves.svg"
          alt=""
          className="w-full h-full object-contain opacity-30"
          animate={{
            y: [0, 15, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ willChange: 'transform' }}
        />
      </motion.div>

      {/* Right side decorations */}
      <motion.div
        className="fixed right-0 top-1/3 -translate-y-1/2 z-0 pointer-events-none"
        style={{ width: '300px', height: '400px' }}
        {...fadeInRight}
      >
        <motion.img
          src="/src/assets/decorations/speed-meter.svg"
          alt=""
          className="w-full h-full object-contain opacity-35"
          animate={{
            y: [0, -15, 0],
            transition: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ willChange: 'transform' }}
        />
      </motion.div>
    </>
  );
};

export default HeroSideDecorations;

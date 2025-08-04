import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

interface FloatingBenefitCardsProps {
  benefits: string[];
}

const FloatingBenefitCards = ({ benefits }: FloatingBenefitCardsProps) => {
  const [cardsRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-20px'
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariant = {
    hidden: { 
      y: 30, 
      opacity: 0,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      ref={cardsRef}
      className="grid md:grid-cols-2 gap-6"
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          variants={cardVariant}
          className="group relative"
          whileHover={{ 
            y: -8,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
        >
          <motion.div
            className="glass-card p-6 rounded-xl border border-white/20 backdrop-blur-sm relative overflow-hidden"
            whileHover={{
              boxShadow: "0 20px 40px -10px rgba(var(--primary-rgb), 0.2)"
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10 flex items-start gap-4">
              <motion.div
                className="mt-1"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-6 h-6 text-primary" />
              </motion.div>
              
              <motion.span
                className="text-foreground text-lg leading-relaxed flex-1"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {benefit}
              </motion.span>
            </div>

            {/* Hover effect border */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary/20 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FloatingBenefitCards;
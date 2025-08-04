import { motion } from 'framer-motion';
import { Phone, Users, CheckCircle, Shield } from 'lucide-react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

interface Step {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

interface InteractiveTimelineProps {
  steps: Step[];
}

const InteractiveTimeline = ({ steps }: InteractiveTimelineProps) => {
  const [timelineRef, isTimelineVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div ref={timelineRef} className="relative">
      {/* Vertical connection line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2 hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={isTimelineVisible ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <motion.div
        className="grid lg:grid-cols-1 gap-8 lg:gap-16"
        variants={container}
        initial="hidden"
        animate={isTimelineVisible ? "visible" : "hidden"}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`relative flex items-center gap-8 ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Step content */}
            <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
              <motion.div
                className="glass-card p-8 rounded-2xl border border-white/20 backdrop-blur-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px -10px rgba(var(--primary-rgb), 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            </div>

            {/* Step icon */}
            <motion.div
              className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-elegant"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.6)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <step.icon className="w-10 h-10 text-primary-foreground" />
              
              {/* Floating ring animation */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Empty space for alternating layout */}
            <div className="flex-1 hidden lg:block" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InteractiveTimeline;
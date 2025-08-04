import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PhoneLink from '@/components/ui/phone-link';
import QuickContactModal from '@/components/QuickContactModal';

const FloatingContactWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mb-4 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-elegant min-w-[280px]"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Potřebujete pomoc?</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Kontaktujte nás ještě dnes a vyřídíme váš přechod zdarma
              </p>
              
              <div className="space-y-3">
                <PhoneLink
                  phoneNumber="+420730431313"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
                >
                  <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  Zavolat hned
                </PhoneLink>
                
                <button
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsExpanded(false);
                  }}
                  className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Napsat zprávu
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center shadow-elegant text-primary-foreground group"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(var(--primary-rgb), 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isExpanded ? 45 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Pulsing ring for attention */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <QuickContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default FloatingContactWidget;

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+420730431313';
  };

  const handleContact = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50"
        >
          {isMinimized ? (
            // Minimized floating button
            <motion.button
              onClick={() => setIsMinimized(false)}
              className="bg-poda-blue hover:bg-poda-blue-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-6 h-6" />
            </motion.button>
          ) : (
            // Expanded CTA card
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Online teraz</span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Potrebujete pomoc s výberom?
                </h3>
                <p className="text-sm text-gray-600">
                  Milan Terč vám poradí s najlepším tarifom
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleCall}
                  className="flex-1 bg-poda-blue hover:bg-poda-blue-dark text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Zavolať</span>
                </button>
                <button
                  onClick={handleContact}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Napísať</span>
                </button>
              </div>
              
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  📞 +420 730 431 313 • Odpoveď do 2 minút
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;

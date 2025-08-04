import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';

interface FAQ {
  question: string;
  answer: string;
}

const SmartFAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [faqRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-20px'
  });

  const faqs: FAQ[] = [
    {
      question: "Kolik stojí přechod od jiného poskytovatele?",
      answer: "Naše služby spojené s přechodem jsou zcela zdarma. Neúčtujeme žádné poplatky za vyřízení výpovědi ani za koordinaci přechodu."
    },
    {
      question: "Jak dlouho přechod trvá?",
      answer: "Celý proces obvykle trvá 7-14 dní. Závisí na výpovědní lhůtě u vašeho současného poskytovatele a dostupnosti našich techniků pro instalaci."
    },
    {
      question: "Budu mít výpadek internetu?",
      answer: "Ne, koordinujeme termíny tak, aby byla kontinuita služeb zachována. Nové připojení instalujeme před odpojením toho současného."
    },
    {
      question: "Můžu si ponechat své telefonní číslo?",
      answer: "Ano, přenos telefonního čísla zajistíme zdarma. Váše číslo zůstane stejné a všechny služby budou fungovat bez změny."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      ref={faqRef}
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Search Bar */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Hledat v často kladených otázkách..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass-card rounded-xl border border-white/20 backdrop-blur-sm bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>
      </motion.div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <motion.div
            key={index}
            className="glass-card rounded-xl border border-white/20 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              boxShadow: "0 10px 30px -10px rgba(var(--primary-rgb), 0.2)"
            }}
          >
            <motion.button
              className="w-full px-6 py-6 text-left flex items-center justify-between bg-background/30 hover:bg-background/50 transition-colors"
              onClick={() => toggleAccordion(index)}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-lg font-semibold text-foreground pr-4">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="px-6 pb-6"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-muted-foreground">Žádné otázky neodpovídají vašemu hledání.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SmartFAQAccordion;
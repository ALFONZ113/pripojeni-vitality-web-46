
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Aká je skutočná rýchlosť PODA internetu?",
    answer: "PODA internet využíva GPON technológiu s garantovanými rýchlosťami až 1000/1000 Mbps. Na rozdiel od konkurencie, naše rýchlosti sú skutočné a stabilné počas celého dňa, nie len teoretické maximá."
  },
  {
    question: "Koľko stojí pripojenie a sú tam skryté poplatky?",
    answer: "Ponúkame transparentné cenníky bez skrytých poplatkov. Základný balík začína od 25€/mesiac. Inštalácia je ZDARMA pri 24-mesačnej zmluve. Žiadne aktivačné poplatky ani poplatky za technickú podporu."
  },
  {
    question: "Ako dlho trvá inštalácia PODA internetu?",
    answer: "Štandardná inštalácia trvá 2-4 hodiny. Náš technik príde v dohodnutom termíne, nainštaluje optické pripojenie a nastaví všetky zariadenia. Ihneď po inštalácii môžete používať internet aj TV."
  },
  {
    question: "Môžem sledovať TV na viacerých zariadeniach súčasne?",
    answer: "Áno! PODA net.TV umožňuje sledovanie až na 4 zariadeniach súčasne. Môžete sledovať na TV, mobile, tablete alebo počítači. Všetko je zahrnuté v cene bez dodatočných poplatkov."
  },
  {
    question: "Čo ak mám problémy s pripojením?",
    answer: "Poskytujeme 24/7 technickú podporu. Milan Terč je váš osobný kontakt pre všetky otázky. Navyše máte prístup na online portál pre diagnostiku a správu služieb."
  },
  {
    question: "Môžem si vybrať vlastné TV programy?",
    answer: "Samozrejme! Máte na výber z viac ako 100 TV programov. Môžete si vytvoriť vlastný balík podľa vašich potrieb a záujmov. Zahŕňame HD kvalitu a možnosť nahrávania."
  },
  {
    question: "Je možné zrušiť zmluvu predčasne?",
    answer: "Ponúkame flexibilné podmienky. Pri 24-mesačnej zmluve je možné zrušenie s výpovednou lehotou 2 mesiace. Bez penalizácií pri sťahovaní alebo technických problémoch na našej strane."
  },
  {
    question: "Pokrývate moju lokalitu v Ostrave?",
    answer: "PODA pokrýva väčšinu lokalít v Ostrave vrátane Poruby, Vítkovic, Mariánskych Hôr a ďalších. Kontaktujte nás pre overenie pokrytia na vašej adrese - overenie je zadarmo."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate Schema.org FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="section-padding bg-gray-50" aria-labelledby="faq-heading">
      {/* Schema.org structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-poda-blue py-1 px-3 rounded-full text-sm font-medium mb-4">
            Často kladené otázky
          </span>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-poda-blue mb-4">
            Všetko, čo potrebujete vedieť o PODA internete
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Odpovede na najčastejšie otázky o našich službách, cenách a inštalácii
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-poda-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-poda-blue" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-[72px]">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-poda-blue mb-4">
              Máte ďalšie otázky?
            </h3>
            <p className="text-gray-600 mb-6">
              Milan Terč vám rád poskytne osobnú konzultáciu a odpovie na všetky vaše otázky
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+420730431313" 
                className="btn-primary"
              >
                Zavolať: +420 730 431 313
              </a>
              <a 
                href="mailto:terc@obchod.poda.cz" 
                className="btn-outline"
              >
                Napísať e-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

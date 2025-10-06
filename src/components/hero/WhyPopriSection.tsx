
import React from 'react';
import { motion } from 'framer-motion';

const WhyPopriSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }} 
          viewport={{ once: true }} 
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-blue-50"
        >
      <h2 className="text-2xl md:text-3xl font-bold text-poda-blue mb-4 text-center">Proč právě Popri.cz?</h2>
      <p className="text-gray-600 text-lg mb-6 text-center">
        Jsme <span className="text-poda-blue font-semibold">popri</span> vám při každém kroku instalace PODA internetu. Naše jméno vyjadřuje naši filozofii – stát po vašem boku a zajistit nejlepší internetové připojení.
      </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="text-center">
            <h3 className="font-semibold text-lg lg:text-xl text-poda-blue mb-2">Rychlost</h3>
            <p className="text-gray-600">Jsme popři vás, když potřebujete rychlé PODA internet, připojení bez čekání.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg lg:text-xl text-poda-blue mb-2">Spolehlivost</h3>
            <p className="text-gray-600">Získáte stabilní PODA internet, na který se můžete spolehnout.</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg lg:text-xl text-poda-blue mb-2">Podpora</h3>
            <p className="text-gray-600">Jsme vždy popři vás, když potřebujete pomoc s vaším PODA internetem.</p>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPopriSection;

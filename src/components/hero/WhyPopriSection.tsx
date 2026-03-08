import React from 'react';
import { useAnimateOnView } from '@/hooks/use-animate-on-view';

const WhyPopriSection = () => {
  const { ref, isVisible } = useAnimateOnView();

  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-radial from-poda-blue/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-radial from-poda-orange/20 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={ref}
          className={`max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-10 md:p-14 lg:p-16 shadow-2xl border border-white/40 transition-all duration-700 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-poda-blue mb-6 text-center leading-tight">
            Proč právě Popri.cz?
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-12 text-center max-w-3xl mx-auto leading-relaxed">
            Jsme <span className="text-poda-blue font-semibold">popri</span> vám při každém kroku instalace PODA internetu. Naše jméno vyjadřuje naši filozofii – stát po vašem boku a zajistit nejlepší internetové připojení.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-poda-blue to-poda-blue-light w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl lg:text-2xl text-poda-blue mb-3">Rychlost</h3>
              <p className="text-gray-600 leading-relaxed">Jsme popří vás, když potřebujete rychlé PODA internet, připojení bez čekání.</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-poda-orange to-poda-orange-light w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl lg:text-2xl text-poda-blue mb-3">Spolehlivost</h3>
              <p className="text-gray-600 leading-relaxed">Získáte stabilní PODA internet, na který se můžete spolehnout.</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-poda-blue to-poda-blue-light w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl lg:text-2xl text-poda-blue mb-3">Podpora</h3>
              <p className="text-gray-600 leading-relaxed">Jsme vždy popří vás, když potřebujete pomoc s vaším PODA internetem.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPopriSection;

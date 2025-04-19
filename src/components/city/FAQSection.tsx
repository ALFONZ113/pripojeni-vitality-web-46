
import React from 'react';
import { Link } from 'react-router-dom';

type FAQSectionProps = {
  cityName: string;
};

const FAQSection = ({ cityName }: FAQSectionProps) => {
  return (
    <section className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-poda-blue mb-4">Časté dotazy</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Odpovědi na nejčastější otázky o připojení PODA v {cityName}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-poda-blue mb-3">Jak rychlý je internet PODA v {cityName}?</h3>
          <p className="text-gray-600">V {cityName} nabízíme připojení až 1000/1000 Mbps díky nejmodernější GPON technologii.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-poda-blue mb-3">Je internet PODA dostupný po celém {cityName}?</h3>
          <p className="text-gray-600">Pokrýváme většinu {cityName}, ale pro ověření dostupnosti na vaší adrese nás kontaktujte.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-poda-blue mb-3">Jaké TV programy mohu sledovat?</h3>
          <p className="text-gray-600">Nabízíme více než 100 TV programů v různých balíčcích, včetně možnosti výběru vlastních programů.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-poda-blue mb-3">Jak dlouho trvá instalace připojení?</h3>
          <p className="text-gray-600">Instalace v {cityName} obvykle trvá 1-2 pracovní dny od potvrzení objednávky.</p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/kontakt" className="btn-secondary">
          Mám další dotaz
        </Link>
      </div>
    </section>
  );
};

export default FAQSection;

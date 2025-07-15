
import React from 'react';
import PageMetadata from '../components/page/PageMetadata';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageMetadata 
        title="Popri.cz – Rychlý PODA Internet s TV Zdarma | Gigabitové Připojení"
        description="Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou. Rychlá instalace."
        seznamVerification="TZXj7ilgwfcAOewRproL3dFn9jTDd15R"
        currentDate="2025-01-14"
        faviconVersion="3.1"
      />
      
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">
            Popri.cz - PODA Internet
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Rychlé a spolehlivé internetové připojení s TV zdarma
          </p>
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Kontaktujte nás
            </h2>
            <p className="text-lg text-blue-700">
              Telefon: +420 730 431 313
            </p>
            <p className="text-lg text-blue-700">
              Email: terc@obchod.poda.cz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React from 'react';
import { Helmet } from 'react-helmet-async';
import A4Flyer from './A4Flyer';

const FlyerPage = () => {
  return (
    <>
      <Helmet>
        <title>A4 Leták - PODA Internet | Popri.cz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-poda-blue mb-2">A4 Leták - Popri.cz</h1>
            <p className="text-gray-600">Optimalizované pre tlač | Rozmer: A4 (210x297mm)</p>
            <button 
              onClick={() => window.print()} 
              className="mt-4 bg-poda-blue text-white px-6 py-2 rounded-lg hover:bg-poda-blue/90 transition-colors"
            >
              Vytlačiť leták
            </button>
          </div>
          
          <div className="print-container">
            <A4Flyer />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlyerPage;

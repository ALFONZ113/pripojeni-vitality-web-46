import React from 'react';

const DisclaimerText = () => {
  return (
    <div 
      className="mt-12 md:mt-16 text-xs text-gray-400 text-center max-w-3xl mx-auto animate-fade-in-only"
      style={{ animationDelay: '1.5s' }}
    >
      <p>Tato webová stránka je provozována obchodním zástupcem společnosti PODA, nikoliv samotnou společností PODA.</p>
      <p className="mt-1">Obchodní zástupce | IČO: 75456230 | Sídlo: Ostrava | Zapsán v živnostenském rejstříku</p>
    </div>
  );
};

export default DisclaimerText;

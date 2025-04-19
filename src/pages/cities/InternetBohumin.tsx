
import React from 'react';
import CityLayout from '../../components/CityLayout';

const InternetBohumin = () => {
  const cityData = {
    cityName: "Bohumín",
    cityDescription: "Zajistěte si rychlý a levný internet PODA v Bohumíně. Nabízíme kvalitní připojení s možností kombinace s televizí a dalšími službami za příznivé ceny.",
    metaTitle: "Internet PODA Bohumín | Rychlý a levný internet v Bohumíně",
    metaDescription: "Rychlý a levný internet PODA v Bohumíně. Kvalitní připojení s možností TV služeb za příznivé ceny. Ověřte dostupnost.",
    benefits: [
      "Rychlost připojení až 1000/1000 Mbps v Bohumíně",
      "Stabilní připojení pro celou rodinu",
      "Instalace rychle a profesionálně",
      "Výhodné kombinace s televizí",
      "Lokální technická podpora"
    ],
    prices: {
      internet: "300",
      tv: "280",
      combo: "440"
    }
  };

  return <CityLayout {...cityData} />;
};

export default InternetBohumin;

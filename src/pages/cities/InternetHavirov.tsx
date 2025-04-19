
import React from 'react';
import CityLayout from '../../components/CityLayout';

const InternetHavirov = () => {
  const cityData = {
    cityName: "Havířov",
    cityDescription: "Využijte rychlý a spolehlivý internet PODA v Havířově za výhodné ceny. Nabízíme vysokorychlostní připojení s možností kombinace s televizí a dalšími službami.",
    metaTitle: "Internet PODA Havířov | Rychlý a levný internet v Havířově",
    metaDescription: "Rychlý a stabilní internet PODA v Havířově. Spolehlivé připojení s možností TV služeb za příznivé ceny. Zjistěte dostupnost.",
    benefits: [
      "Rychlost až 1000/1000 Mbps - nejrychlejší připojení v Havířově",
      "Stabilní připojení bez výpadků",
      "Bezplatná instalace při závazku",
      "Výhodné kombinace s digitální televizí",
      "Technická podpora 7 dní v týdnu"
    ],
    prices: {
      internet: "300",
      tv: "280",
      combo: "440"
    }
  };

  return <CityLayout {...cityData} />;
};

export default InternetHavirov;

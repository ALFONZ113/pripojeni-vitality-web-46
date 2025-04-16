
import React from 'react';
import CityLayout from '../../components/CityLayout';

const InternetHavirov = () => {
  const cityData = {
    cityName: "Havířov",
    cityDescription: "Spolehlivý a rychlý internet PODA v Havířově za výhodné ceny. Připojte celou domácnost k vysokorychlostnímu internetu a užívejte si kvalitní televizní programy.",
    metaTitle: "Internet PODA Havířov | Rychlý a levný internet v Havířově",
    metaDescription: "Rychlý a levný internet PODA v Havířově. Vysokorychlostní připojení a bohatá nabídka TV programů za výhodné ceny.",
    benefits: [
      "Rychlosti připojení až 1000/1000 Mbps v Havířově",
      "Stabilní a spolehlivé připojení pro práci i zábavu",
      "Možnost sledování TV na více zařízeních současně",
      "Bez omezení přenesených dat",
      "Připojení bez nutnosti pevné linky"
    ],
    prices: {
      internet: "399",
      tv: "199",
      combo: "499"
    }
  };

  return <CityLayout {...cityData} />;
};

export default InternetHavirov;

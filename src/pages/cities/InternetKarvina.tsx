
import React from 'react';
import CityLayout from '../../components/CityLayout';

const InternetKarvina = () => {
  const cityData = {
    cityName: "Karviná",
    cityDescription: "Připojte se k rychlému a levnému internetu PODA v Karviné. Nabízíme spolehlivé vysokorychlostní připojení s možností kombinace s televizí pro celou rodinu.",
    metaTitle: "Internet PODA Karviná | Rychlý a levný internet v Karviné",
    metaDescription: "Rychlý a levný internet PODA v Karviné. Spolehlivé připojení s televizí za výhodné ceny. Zjistěte dostupnost na vaší adrese.",
    benefits: [
      "Rychlost až 1000/1000 Mbps - bleskové připojení v Karviné",
      "Stabilní připojení s minimálními výpadky",
      "Možnost připojení i bez závazku",
      "Výhodné balíčky s TV a další služby",
      "Rychlá instalace a profesionální servis"
    ],
    prices: {
      internet: "300",
      tv: "280",
      combo: "440"
    }
  };

  return <CityLayout {...cityData} />;
};

export default InternetKarvina;

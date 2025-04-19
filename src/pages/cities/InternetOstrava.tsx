
import React from 'react';
import CityLayout from '../../components/CityLayout';

const InternetOstrava = () => {
  const cityData = {
    cityName: "Ostrava",
    cityDescription: "Poskytujeme rychlý a levný internet PODA v Ostravě s možností kombinace s televizí. Naše gigabitové připojení využívá moderní GPON technologii pro maximální spolehlivost a rychlost.",
    metaTitle: "Internet PODA Ostrava | Rychlý a levný internet v Ostravě",
    metaDescription: "Rychlý a levný internet PODA v Ostravě. Gigabitové připojení s televizí za výhodné ceny. Ověřte dostupnost na vaší adrese.",
    benefits: [
      "Rychlost až 1000/1000 Mbps - nejrychlejší připojení v Ostravě",
      "Stabilní připojení díky moderní GPON technologii",
      "Výhodné balíčky s televizí a telefonem",
      "Instalace zdarma při závazku 24 měsíců",
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

export default InternetOstrava;

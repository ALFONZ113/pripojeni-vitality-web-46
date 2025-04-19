
export type TariffFeature = {
  title: string;
  description: string;
};

export type TariffData = {
  title: string;
  price: string;
  deviceFee: string;
  features: TariffFeature[];
  isRecommended?: boolean;
  promoDescription: string;
};

export type TariffConfig = {
  byty: TariffData[];
  domy: TariffData[];
};

export const tariffConfig: TariffConfig = {
  byty: [
    {
      title: 'Internet + TV Basic',
      price: '250',
      deviceFee: '50',
      features: [
        {
          title: 'Internet 1000/1000 Mbps',
          description: 'Symetrická rychlost pomocí GPON technologie',
        },
        {
          title: 'Více než 85 TV programů',
          description: 'Automaticky v ceně',
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení',
        },
      ],
      promoDescription: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 440 Kč/měsíc.',
    },
    {
      title: 'Internet + TV Mých 10',
      price: '390',
      deviceFee: '50',
      isRecommended: true,
      features: [
        {
          title: 'Internet 1000/1000 Mbps',
          description: 'Symetrická rychlost pomocí GPON technologie',
        },
        {
          title: 'Více než 100 TV programů',
          description: 'Možnost výběru 10 vlastních stanic',
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení',
        },
      ],
      promoDescription: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 520 Kč/měsíc.',
    },
  ],
  domy: [
    {
      title: 'Internet + TV Basic',
      price: '250',
      deviceFee: '50',
      features: [
        {
          title: 'Internet 500/200 Mbps',
          description: 'Bezdrátový internet s rychlostí optického',
        },
        {
          title: 'Více než 85 TV programů',
          description: 'Automaticky v ceně',
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení',
        },
      ],
      promoDescription: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 440 Kč/měsíc.',
    },
    {
      title: 'Internet + TV Mých 10',
      price: '390',
      deviceFee: '50',
      isRecommended: true,
      features: [
        {
          title: 'Internet 500/200 Mbps',
          description: 'Bezdrátový internet s rychlostí optického',
        },
        {
          title: 'Více než 100 TV programů',
          description: 'Možnost výběru 10 vlastních stanic',
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení',
        },
      ],
      promoDescription: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 520 Kč/měsíc.',
    },
  ],
};

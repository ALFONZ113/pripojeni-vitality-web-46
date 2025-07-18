
export const tariffData = {
  byty: [
    {
      id: 'bytyBasic',
      title: 'Internet + TV Basic',
      price: '250 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      promoId: 'bytyBasic' as const,
      isPromo: true,
      features: [
        {
          title: 'Internet 1000/1000 Mbps',
          description: 'Symetrická rychlost pomocí GPON technologie'
        },
        {
          title: 'Více než 85 TV programů',
          description: 'Automaticky v ceně'
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení'
        }
      ],
      promoInfoText: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 440 Kč/měsíc.'
    },
    {
      id: 'bytyMych10',
      title: 'Internet + TV Mých 10',
      price: '390 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      promoId: 'bytyMych10' as const,
      isPromo: true,
      isRecommended: true,
      features: [
        {
          title: 'Internet 1000/1000 Mbps',
          description: 'Symetrická rychlost pomocí GPON technologie'
        },
        {
          title: 'Více než 100 TV programů',
          description: 'Možnost výběru 10 vlastních stanic'
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení'
        }
      ],
      promoInfoText: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 520 Kč/měsíc.'
    }
  ],
  domy: [
    {
      id: 'domyBasic',
      title: 'Internet + TV Basic',
      price: '250 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      promoId: 'domyBasic' as const,
      isPromo: true,
      features: [
        {
          title: 'Internet 1000/200 Mbps',
          description: 'Bezdrátový internet s rychlostí optického'
        },
        {
          title: 'Více než 85 TV programů',
          description: 'Automaticky v ceně'
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení'
        }
      ],
      promoInfoText: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 440 Kč/měsíc.'
    },
    {
      id: 'domyMych10',
      title: 'Internet + TV Mých 10',
      price: '390 Kč',
      priceNote: 'měsíčně + 50 Kč za zařízení',
      promoId: 'domyMych10' as const,
      isPromo: true,
      isRecommended: true,
      features: [
        {
          title: 'Internet 1000/200 Mbps',
          description: 'Bezdrátový internet s rychlostí optického'
        },
        {
          title: 'Více než 100 TV programů',
          description: 'Možnost výběru 10 vlastních stanic'
        },
        {
          title: 'Služba PODA net.TV',
          description: 'Až pro 4 zařízení'
        }
      ],
      promoInfoText: 'Zvýhodněná PROMO cena je určena novým zákazníkům a platí 12 měsíců od aktivace, následně se cena upravuje na standardních 520 Kč/měsíc.'
    }
  ]
};

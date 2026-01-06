import { Wifi, Activity, Zap, Shield, Users, Building } from 'lucide-react';
import { ReactNode } from 'react';

export interface CityDistrict {
  name: string;
  residents: string;
  coverage: string;
  note?: string;
}

export interface CityFeature {
  icon: 'wifi' | 'zap' | 'activity' | 'shield' | 'users' | 'building';
  title: string;
  description: string;
  gradient: 'blue' | 'orange';
}

export interface CityStat {
  value: string;
  label: string;
}

export interface CityData {
  slug: string;
  name: string;
  nameLocative: string; // "v Ostravě", "v Karviné"
  region: string;
  population: string;
  coverage: number;
  status: 'full' | 'expanding';
  coordinates: { lat: number; lng: number };
  districts: CityDistrict[];
  features: CityFeature[];
  stats: CityStat[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  highlight?: string;
  priceRange: string;
  heroImage?: string;
}

export const cities: CityData[] = [
  // === MORAVSKOSLEZSKÝ KRAJ ===
  {
    slug: 'ostrava',
    name: 'Ostrava',
    nameLocative: 'v Ostravě',
    region: 'Moravskoslezský kraj',
    population: '285 000',
    coverage: 98,
    status: 'full',
    coordinates: { lat: 49.8175, lng: 18.2624 },
    priceRange: '250-520 CZK',
    highlight: 'Regionální centrum s plným pokrytím',
    heroImage: '/src/assets/ostrava-vitkovice.jpg',
    stats: [
      { value: '285k+', label: 'obyvatel' },
      { value: '98%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Metropolitní síť',
        description: 'Nejmodernější optická infrastruktura pokrývající celou Ostravu s rychlostí až 1000 Mbps.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Bleskurychlá aktivace',
        description: 'Rychlá instalace díky rozsáhlé síti techniků PODA v celém městě.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Stabilita 99.9%',
        description: 'Garantovaná dostupnost služeb s redundantní páteřní sítí a záložním napájením.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Poruba', residents: '65 000', coverage: '100%', note: 'Největší městský obvod' },
      { name: 'Ostrava-Jih', residents: '105 000', coverage: '100%', note: 'Nejlidnatější část' },
      { name: 'Moravská Ostrava', residents: '35 000', coverage: '100%', note: 'Centrum města' },
      { name: 'Slezská Ostrava', residents: '20 000', coverage: '95%', note: 'Historická část' },
      { name: 'Mariánské Hory', residents: '12 000', coverage: '100%', note: 'Rezidenční oblast' },
      { name: 'Vítkovice', residents: '8 000', coverage: '100%', note: 'Průmyslová zóna' }
    ],
    seo: {
      title: 'Internet Ostrava 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Hledáte spolehlivý internet v Ostravě? Optické připojení 1000 Mbps + TV zdarma. 98% pokrytí města, férová cena. Zavolejte 730 431 313!',
      keywords: [
        'internet Ostrava', 'PODA Ostrava', 'optické připojení Ostrava',
        'gigabitový internet Ostrava', 'rychlý internet Ostrava', 'GPON Ostrava'
      ]
    }
  },
  {
    slug: 'karvina',
    name: 'Karviná',
    nameLocative: 'v Karviné',
    region: 'Moravskoslezský kraj',
    population: '50 000',
    coverage: 95,
    status: 'full',
    coordinates: { lat: 49.8542, lng: 18.5428 },
    priceRange: '250-520 CZK',
    highlight: 'Lázeňské město s moderním připojením',
    stats: [
      { value: '50k+', label: 'obyvatel' },
      { value: '95%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Lázeňské město online',
        description: 'Moderní optická síť propojující všechny části Karviné včetně lázeňské oblasti.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Rychlá aktivace',
        description: 'Instalace v krátkém čase díky lokálnímu týmu techniků PODA.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Spolehlivost 99.9%',
        description: 'Stabilní připojení pro domácnosti i firmy s minimálními výpadky.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Fryštát', residents: '8 000', coverage: '100%', note: 'Historické centrum' },
      { name: 'Darkov', residents: '5 000', coverage: '100%', note: 'Lázeňská oblast' },
      { name: 'Nové Město', residents: '20 000', coverage: '95%', note: 'Největší sídliště' },
      { name: 'Hranice', residents: '12 000', coverage: '90%', note: 'Hraniční oblast' },
      { name: 'Mizerov', residents: '5 000', coverage: '95%', note: 'Rezidenční část' }
    ],
    seo: {
      title: 'Internet Karviná 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Stabilní gigabitový internet pro Karvinou. 1000 Mbps, TV zdarma, bez limitů. Žádné skryté poplatky. Zavolejte 730 431 313!',
      keywords: [
        'internet Karviná', 'PODA Karviná', 'optické připojení Karviná',
        'gigabitový internet Karviná', 'rychlý internet Karviná', 'GPON Karviná'
      ]
    }
  },
  {
    slug: 'havirov',
    name: 'Havířov',
    nameLocative: 'v Havířově',
    region: 'Moravskoslezský kraj',
    population: '70 000',
    coverage: 96,
    status: 'full',
    coordinates: { lat: 49.7798, lng: 18.4370 },
    priceRange: '250-520 CZK',
    highlight: 'Nejmladší město v ČR',
    stats: [
      { value: '70k+', label: 'obyvatel' },
      { value: '96%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Moderní město',
        description: 'Havířov jako nejmladší české město má moderní infrastrukturu ideální pro optiku.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Expresní servis',
        description: 'Rychlá instalace a servis díky blízkosti technického centra.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Stabilní síť',
        description: 'Nová optická infrastruktura zajišťuje maximální stabilitu připojení.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Město', residents: '25 000', coverage: '100%', note: 'Centrum města' },
      { name: 'Podlesí', residents: '18 000', coverage: '95%', note: 'Rezidenční oblast' },
      { name: 'Šumbark', residents: '15 000', coverage: '95%', note: 'Velké sídliště' },
      { name: 'Životice', residents: '8 000', coverage: '90%', note: 'Okrajová část' },
      { name: 'Bludovice', residents: '4 000', coverage: '95%', note: 'Vilová čtvrť' }
    ],
    seo: {
      title: 'Internet Havířov 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Potřebujete rychlý internet v Havířově? 1000 Mbps optika + TV programy zdarma. Férová cena, rychlá instalace. Zavolejte 730 431 313!',
      keywords: [
        'internet Havířov', 'PODA Havířov', 'optické připojení Havířov',
        'gigabitový internet Havířov', 'rychlý internet Havířov', 'GPON Havířov'
      ]
    }
  },
  {
    slug: 'bohumin',
    name: 'Bohumín',
    nameLocative: 'v Bohumíně',
    region: 'Moravskoslezský kraj',
    population: '21 000',
    coverage: 100,
    status: 'full',
    coordinates: { lat: 49.9043, lng: 18.3570 },
    priceRange: '250-520 CZK',
    highlight: 'Strategická poloha u hranic',
    stats: [
      { value: '21k+', label: 'obyvatel' },
      { value: '100%', label: 'pokrytí GPON' },
      { value: '24/7', label: 'stabilita' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Strategická poloha',
        description: 'Moderní město s gigabitovým internetem a strategickou polohou s nejrychlejší optickou sítí až 1000 Mbps.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Express instalace',
        description: 'Malé město = velká rychlost. Instalace zdarma a v rekordním čase.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Maximální stabilita',
        description: 'Výjimečná síťová stabilita díky robustní infrastruktuře s latencí pod 5ms.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Starý Bohumín', residents: '8 000', coverage: '100%', note: 'Historické centrum města' },
      { name: 'Nový Bohumín', residents: '10 000', coverage: '100%', note: 'Moderní obytná zástavba' },
      { name: 'Skřečoň', residents: '3 000', coverage: '100%', note: 'Přírodní lokalita u řeky' }
    ],
    seo: {
      title: 'Internet Bohumín 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Gigabitový internet pro Bohumín. 100% pokrytí, optika 1000 Mbps + TV zdarma. Bez závazků. Objednejte ještě dnes - 730 431 313!',
      keywords: [
        'internet Bohumín', 'PODA Bohumín', 'optické připojení Bohumín',
        'gigabitový internet Bohumín', 'rychlý internet Bohumín', 'GPON Bohumín'
      ]
    }
  },
  {
    slug: 'frydek-mistek',
    name: 'Frýdek-Místek',
    nameLocative: 've Frýdku-Místku',
    region: 'Moravskoslezský kraj',
    population: '55 000',
    coverage: 85,
    status: 'expanding',
    coordinates: { lat: 49.6882, lng: 18.3530 },
    priceRange: '250-520 CZK',
    highlight: 'Brána do Beskyd',
    stats: [
      { value: '55k+', label: 'obyvatel' },
      { value: '85%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Dvojměstí online',
        description: 'Optická síť propojující obě historická města - Frýdek i Místek.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Rozšiřující se síť',
        description: 'Aktivně budujeme nové přípojky v dalších lokalitách města.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Beskydská kvalita',
        description: 'Spolehlivé připojení pro aktivní obyvatele podhorského města.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Frýdek', residents: '25 000', coverage: '90%', note: 'Historické centrum' },
      { name: 'Místek', residents: '20 000', coverage: '85%', note: 'Obchodní centrum' },
      { name: 'Lysůvky', residents: '5 000', coverage: '80%', note: 'Rezidenční oblast' },
      { name: 'Chlebovice', residents: '3 000', coverage: '75%', note: 'Okrajová část' },
      { name: 'Lískovec', residents: '2 000', coverage: '80%', note: 'Vilová zástavba' }
    ],
    seo: {
      title: 'Internet Frýdek-Místek 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Optický internet pro Frýdek-Místek. 1000 Mbps, TV zdarma, rozšiřujeme pokrytí. Férová cena. Zavolejte 730 431 313!',
      keywords: [
        'internet Frýdek-Místek', 'PODA Frýdek-Místek', 'optické připojení Frýdek-Místek',
        'gigabitový internet Frýdek-Místek', 'rychlý internet Frýdek-Místek'
      ]
    }
  },
  {
    slug: 'orlova',
    name: 'Orlová',
    nameLocative: 'v Orlové',
    region: 'Moravskoslezský kraj',
    population: '28 000',
    coverage: 90,
    status: 'full',
    coordinates: { lat: 49.8456, lng: 18.4304 },
    priceRange: '250-520 CZK',
    highlight: 'Hornické město s moderním připojením',
    stats: [
      { value: '28k+', label: 'obyvatel' },
      { value: '90%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Tradice a inovace',
        description: 'Historické hornické město s nejmodernější optickou sítí.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Lokální servis',
        description: 'Technici PODA přímo v regionu pro rychlou instalaci a podporu.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Stabilní připojení',
        description: 'Spolehlivá síť odolná vůči povětrnostním podmínkám.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Město', residents: '12 000', coverage: '95%', note: 'Centrum Orlové' },
      { name: 'Lutyně', residents: '10 000', coverage: '90%', note: 'Velké sídliště' },
      { name: 'Poruba', residents: '4 000', coverage: '85%', note: 'Rezidenční část' },
      { name: 'Lazy', residents: '2 000', coverage: '80%', note: 'Okrajová oblast' }
    ],
    seo: {
      title: 'Internet Orlová 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Rychlý a stabilní internet pro Orlovou. 1000 Mbps, TV zdarma, férová cena. Žádné limity. Zavolejte 730 431 313!',
      keywords: [
        'internet Orlová', 'PODA Orlová', 'optické připojení Orlová',
        'gigabitový internet Orlová', 'rychlý internet Orlová'
      ]
    }
  },
  {
    slug: 'poruba',
    name: 'Ostrava-Poruba',
    nameLocative: 'v Porubě',
    region: 'Moravskoslezský kraj',
    population: '65 000',
    coverage: 100,
    status: 'full',
    coordinates: { lat: 49.8276, lng: 18.1689 },
    priceRange: '250-520 CZK',
    highlight: 'Největší městský obvod Ostravy',
    heroImage: '/src/assets/ostrava-vitkovice.jpg',
    stats: [
      { value: '65k+', label: 'obyvatel' },
      { value: '100%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Kompletní pokrytí',
        description: 'Celá Poruba je pokryta optickou sítí PODA s rychlostí až 1000 Mbps.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Největší obvod Ostravy',
        description: '65 000 obyvatel s přístupem k nejmodernějšímu připojení v regionu.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Stabilita 99.9%',
        description: 'Redundantní síť zajišťuje nepřetržité připojení pro všechny domácnosti.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Poruba I', residents: '12 000', coverage: '100%', note: 'Historické centrum Poruby' },
      { name: 'Poruba II', residents: '10 000', coverage: '100%', note: 'Rezidenční oblast' },
      { name: 'Poruba III-V', residents: '15 000', coverage: '100%', note: 'Sídlištní zástavba' },
      { name: 'Poruba VI-VIII', residents: '18 000', coverage: '100%', note: 'Moderní bytová výstavba' },
      { name: 'Studentské koleje', residents: '10 000', coverage: '100%', note: 'VŠB-TU Ostrava' }
    ],
    seo: {
      title: 'Internet Poruba 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Rychlý internet v Porubě? Optické připojení 1000 Mbps + TV zdarma. 100% pokrytí městského obvodu. Instalace zdarma. Volejte 730 431 313!',
      keywords: [
        'internet Poruba', 'PODA Poruba', 'optické připojení Poruba',
        'internet Ostrava-Poruba', 'rychlý internet Poruba', 'GPON Poruba'
      ]
    }
  },

  // === JIHOMORAVSKÝ KRAJ ===
  {
    slug: 'brno',
    name: 'Brno',
    nameLocative: 'v Brně',
    region: 'Jihomoravský kraj',
    population: '380 000',
    coverage: 60,
    status: 'expanding',
    coordinates: { lat: 49.1951, lng: 16.6068 },
    priceRange: '250-520 CZK',
    highlight: 'Druhé největší město ČR',
    stats: [
      { value: '380k+', label: 'obyvatel' },
      { value: '60%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Metropole Moravy',
        description: 'Expandujeme do druhého největšího města ČR s nejmodernější optickou sítí.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Rychlá expanze',
        description: 'Aktivně rozšiřujeme pokrytí do dalších brněnských čtvrtí.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Univerzitní kvalita',
        description: 'Spolehlivé připojení pro studenty, firmy i domácnosti.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Brno-střed', residents: '80 000', coverage: '70%', note: 'Historické centrum' },
      { name: 'Královo Pole', residents: '30 000', coverage: '65%', note: 'Univerzitní čtvrť' },
      { name: 'Žabovřesky', residents: '25 000', coverage: '60%', note: 'Rezidenční oblast' },
      { name: 'Líšeň', residents: '28 000', coverage: '55%', note: 'Velké sídliště' },
      { name: 'Bystrc', residents: '25 000', coverage: '50%', note: 'Moderní zástavba' }
    ],
    seo: {
      title: 'Internet Brno 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Hledáte rychlý internet v Brně? Gigabitová optika 1000 Mbps + TV zdarma. Rozšiřujeme pokrytí. Zavolejte 730 431 313!',
      keywords: [
        'internet Brno', 'PODA Brno', 'optické připojení Brno',
        'gigabitový internet Brno', 'rychlý internet Brno'
      ]
    }
  },

  // === PARDUBICKÝ KRAJ ===
  {
    slug: 'svitavy',
    name: 'Svitavy',
    nameLocative: 've Svitavách',
    region: 'Pardubický kraj',
    population: '16 000',
    coverage: 80,
    status: 'full',
    coordinates: { lat: 49.7558, lng: 16.4693 },
    priceRange: '250-520 CZK',
    highlight: 'Rodné město Oskara Schindlera',
    stats: [
      { value: '16k+', label: 'obyvatel' },
      { value: '80%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Historické město',
        description: 'Moderní optická síť v historickém městě na pomezí Čech a Moravy.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Regionální centrum',
        description: 'Kvalitní připojení pro celý svitavský region.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Spolehlivost',
        description: 'Stabilní síť pro domácnosti i místní podnikatele.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Centrum', residents: '8 000', coverage: '90%', note: 'Historické jádro' },
      { name: 'Lány', residents: '5 000', coverage: '80%', note: 'Rezidenční oblast' },
      { name: 'Předměstí', residents: '3 000', coverage: '70%', note: 'Okrajová část' }
    ],
    seo: {
      title: 'Internet Svitavy 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Optický internet pro Svitavy. 1000 Mbps, TV zdarma, spolehlivé připojení. Férová cena. Zavolejte 730 431 313!',
      keywords: [
        'internet Svitavy', 'PODA Svitavy', 'optické připojení Svitavy',
        'gigabitový internet Svitavy', 'rychlý internet Svitavy'
      ]
    }
  },
  {
    slug: 'policka',
    name: 'Polička',
    nameLocative: 'v Poličce',
    region: 'Pardubický kraj',
    population: '8 500',
    coverage: 75,
    status: 'full',
    coordinates: { lat: 49.7147, lng: 16.2655 },
    priceRange: '250-520 CZK',
    highlight: 'Rodné město Bohuslava Martinů',
    stats: [
      { value: '8.5k+', label: 'obyvatel' },
      { value: '75%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Kulturní město',
        description: 'Optická síť v historickém městě s bohatou kulturní tradicí.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Kompaktní město',
        description: 'Rychlá instalace díky přehledné městské struktuře.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Rodinné připojení',
        description: 'Ideální pro rodiny s dětmi a práci z domova.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Centrum', residents: '5 000', coverage: '85%', note: 'Historické náměstí' },
      { name: 'Horní předměstí', residents: '2 000', coverage: '70%', note: 'Rezidenční část' },
      { name: 'Dolní předměstí', residents: '1 500', coverage: '65%', note: 'Okrajová oblast' }
    ],
    seo: {
      title: 'Internet Polička 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Gigabitový internet pro Poličku. 1000 Mbps optika + TV zdarma. Bez závazků, férová cena. Zavolejte 730 431 313!',
      keywords: [
        'internet Polička', 'PODA Polička', 'optické připojení Polička',
        'gigabitový internet Polička', 'rychlý internet Polička'
      ]
    }
  },
  {
    slug: 'vysoke-myto',
    name: 'Vysoké Mýto',
    nameLocative: 've Vysokém Mýtě',
    region: 'Pardubický kraj',
    population: '12 000',
    coverage: 70,
    status: 'expanding',
    coordinates: { lat: 49.9508, lng: 16.1625 },
    priceRange: '250-520 CZK',
    highlight: 'Město s největším náměstím v ČR',
    stats: [
      { value: '12k+', label: 'obyvatel' },
      { value: '70%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Rekordní náměstí',
        description: 'Moderní připojení pro město s největším náměstím v České republice.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Aktivní rozvoj',
        description: 'Průběžně rozšiřujeme síť do dalších částí města.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Průmyslová kvalita',
        description: 'Spolehlivé připojení pro domácnosti i místní průmysl.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Centrum', residents: '6 000', coverage: '80%', note: 'Historické jádro' },
      { name: 'Litomyšlské předměstí', residents: '4 000', coverage: '65%', note: 'Rezidenční oblast' },
      { name: 'Pražské předměstí', residents: '2 000', coverage: '60%', note: 'Průmyslová zóna' }
    ],
    seo: {
      title: 'Internet Vysoké Mýto 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Optický internet pro Vysoké Mýto. 1000 Mbps, TV zdarma, rozšiřujeme síť. Zavolejte 730 431 313!',
      keywords: [
        'internet Vysoké Mýto', 'PODA Vysoké Mýto', 'optické připojení Vysoké Mýto',
        'gigabitový internet Vysoké Mýto', 'rychlý internet Vysoké Mýto'
      ]
    }
  },

  // === KRÁLOVÉHRADECKÝ KRAJ ===
  {
    slug: 'tyniste-nad-orlici',
    name: 'Týniště nad Orlicí',
    nameLocative: 'v Týništi nad Orlicí',
    region: 'Královéhradecký kraj',
    population: '6 000',
    coverage: 65,
    status: 'expanding',
    coordinates: { lat: 50.1515, lng: 16.0784 },
    priceRange: '250-520 CZK',
    highlight: 'Město na soutoku Tiché a Divoké Orlice',
    stats: [
      { value: '6k+', label: 'obyvatel' },
      { value: '65%', label: 'pokrytí' },
      { value: '24/7', label: 'podpora' },
      { value: '0 Kč', label: 'instalace' }
    ],
    features: [
      {
        icon: 'wifi',
        title: 'Přírodní prostředí',
        description: 'Rychlý internet v klidném městě obklopeném přírodou.',
        gradient: 'blue'
      },
      {
        icon: 'zap',
        title: 'Rozvojové město',
        description: 'Budujeme síť pro rostoucí komunitu u Orlice.',
        gradient: 'orange'
      },
      {
        icon: 'activity',
        title: 'Rodinné bydlení',
        description: 'Ideální připojení pro rodiny hledající klid a přírodu.',
        gradient: 'blue'
      }
    ],
    districts: [
      { name: 'Centrum', residents: '3 500', coverage: '75%', note: 'Hlavní část města' },
      { name: 'Okolí nádraží', residents: '1 500', coverage: '60%', note: 'Dopravní uzel' },
      { name: 'Okrajové části', residents: '1 000', coverage: '50%', note: 'Rozvíjející se oblast' }
    ],
    seo: {
      title: 'Internet Týniště nad Orlicí 1000 Mbps | Optické Připojení + TV Zdarma',
      description: 'Rychlý internet pro Týniště nad Orlicí. 1000 Mbps optika + TV zdarma. Férová cena. Zavolejte 730 431 313!',
      keywords: [
        'internet Týniště nad Orlicí', 'PODA Týniště nad Orlicí', 'optické připojení Týniště',
        'gigabitový internet Týniště', 'rychlý internet Týniště nad Orlicí'
      ]
    }
  }
];

// === HELPER FUNKCIE ===

export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(city => city.slug === slug);
};

export const getCitiesByRegion = (region: string): CityData[] => {
  return cities.filter(city => city.region === region);
};

export const getAllCitySlugs = (): string[] => {
  return cities.map(city => city.slug);
};

export const getFullCoverageСities = (): CityData[] => {
  return cities.filter(city => city.status === 'full');
};

export const getExpandingCities = (): CityData[] => {
  return cities.filter(city => city.status === 'expanding');
};

// Pre CitySection a LocalSEOSection komponenty
export const getCityCardData = () => {
  return cities.map(city => ({
    name: city.name,
    link: `/internet-${city.slug}`,
    coverage: city.coverage,
    population: city.population,
    status: city.status,
    highlight: city.highlight
  }));
};

// Pre sitemap generovanie
export const getCityUrls = (): string[] => {
  return cities.map(city => `/internet-${city.slug}`);
};

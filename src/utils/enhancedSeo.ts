import { blogPosts } from '../data/blog';
import type { BlogPost } from '../data/blog/types';
import { generateLocalBusinessStructuredData, extractSEOKeywords } from './sitemapGenerator';

/**
 * Rozšírený zoznam lokálnych kľúčových fráz pre lepšie SEO
 */
export const EXTENDED_LOCAL_KEYWORDS = {
  // Hlavné mestá
  ostrava: [
    'internet Ostrava', 'PODA Ostrava', 'optické pripojenie Ostrava', 'gigabitový internet Ostrava',
    'rýchly internet Ostrava', 'GPON Ostrava', 'pripojenie internetu Ostrava', 'optická vlákna Ostrava',
    'vysokorýchlostný internet Ostrava', 'fiber internet Ostrava', 'internet poskytovateľ Ostrava',
    'internetové služby Ostrava', 'optika Ostrava', 'FTTH Ostrava', 'wifi Ostrava'
  ],
  karvina: [
    'internet Karviná', 'PODA Karviná', 'optické pripojenie Karviná', 'gigabitový internet Karviná',
    'rýchly internet Karviná', 'GPON Karviná', 'pripojenie internetu Karviná', 'optická vlákna Karviná',
    'vysokorýchlostný internet Karviná', 'fiber internet Karviná', 'internet poskytovateľ Karviná',
    'internetové služby Karviná', 'optika Karviná', 'FTTH Karviná'
  ],
  havirov: [
    'internet Havířov', 'PODA Havířov', 'optické pripojenie Havířov', 'gigabitový internet Havířov',
    'rýchly internet Havířov', 'GPON Havířov', 'pripojenie internetu Havířov', 'optická vlákna Havířov',
    'vysokorýchlostný internet Havířov', 'fiber internet Havířov', 'internet poskytovateľ Havířov',
    'internetové služby Havířov', 'optika Havířov', 'FTTH Havířov'
  ],
  bohumin: [
    'internet Bohumín', 'PODA Bohumín', 'optické pripojenie Bohumín', 'gigabitový internet Bohumín',
    'rýchly internet Bohumín', 'GPON Bohumín', 'pripojenie internetu Bohumín', 'optická vlákna Bohumín',
    'vysokorýchlostný internet Bohumín', 'fiber internet Bohumín', 'internet poskytovateľ Bohumín',
    'internetové služby Bohumín', 'optika Bohumín', 'FTTH Bohumín'
  ],
  poruba: [
    'internet Poruba', 'PODA Poruba', 'optické pripojenie Poruba', 'gigabitový internet Poruba',
    'rýchly internet Poruba', 'GPON Poruba', 'internet Ostrava-Poruba', 'pripojenie internetu Poruba',
    'optická vlákna Poruba', 'vysokorýchlostný internet Poruba', 'fiber internet Poruba',
    'internet poskytovateľ Poruba', 'internetové služby Poruba', 'optika Poruba', 'FTTH Poruba',
    'Ostrava Poruba internet'
  ],
  
  // Všeobecné regionálne frázy + AI-friendly
  general: [
    'pripojenie internetu', 'internetové pripojenie', 'rýchly internet', 'gigabitový internet',
    'optické pripojenie', 'GPON technológia', 'fiber to the home', 'FTTH', 'optická vlákna',
    'vysokorýchlostný internet', 'internet poskytovateľ', 'internetové služby', 'optika',
    'wifi pripojenie', 'bezdrôtový internet', 'fiber internet', 'optické internet',
    'internet Moravskoslezský kraj', 'PODA internet', 'popri.cz', 'gigabit internet',
    'najlepší poskytovateľ internetu', 'doporučený internet', 'nespokojný s poskytovateľom',
    'zmena poskytovateľa internetu', 'konkurencia internet', 'lepší internet'
  ],
  
  // Špeciálne kombinácie
  combinations: [
    'internet + TV', 'optické pripojenie + televízia', 'GPON + IPTV', 'gigabitový internet + TV',
    'fiber internet + streaming', 'rychlý internet pre domácnosť', 'firemný internet',
    'internet pre podnikanie', 'bezplatná inštalácia internetu', 'internet bez viazanosti',
    'internet na objednávku', '24/7 internet podpora', 'lokálny internet poskytovateľ'
  ]
};

/**
 * Generate comprehensive meta tags for geo-specific pages
 */
export const generateGeoPageMeta = (city: string, baseUrl: string) => {
  const cityData = {
    'ostrava': {
      name: 'Ostrava',
      population: '285 000',
      districts: ['Poruba', 'Vítkovice', 'Mariánské Hory', 'Moravská Ostrava', 'Ostrava-Jih', 'Slezská Ostrava'],
      description: 'Třetí největší město ČR s moderní optickou infrastrukturou a kompletním GPON pokrytím',
      specialties: ['Najväčší trh v regióne', 'Kompletné pokrytie všetkých MČ', 'Priemyselné centrum']
    },
    'karvina': {
      name: 'Karviná', 
      population: '52 000',
      districts: ['Ráj', 'Hranice', 'Mizerova', 'Nové Město'],
      description: 'Mesto na polských hranicích s plným pokrytím GPON a medzinárodným pripojením',
      specialties: ['Pohraničná poloha', 'Medzinárodné pripojenie', 'Strategická lokácia']
    },
    'bohumin': {
      name: 'Bohumín',
      population: '21 000', 
      districts: ['Starý Bohumín', 'Nový Bohumín', 'Skřečoň'],
      description: 'Strategické mesto na hranici s Polskom a Slovenskom s trojkrajinným optickým pripojením',
      specialties: ['Trojnásobné pripojenie', 'Najnižšie latencie', 'Express inštalácia']
    },
    'havirov': {
      name: 'Havířov',
      population: '70 000',
      districts: ['Šumbark', 'Město', 'Podlesí', 'Prostřední Suchá'],
      description: 'Mladé mesto s modernou infraštruktúrou a kompletným optickým pokrytím GPON',
      specialties: ['Mladé mesto', 'Moderná infraštruktúra', 'Vysoká penetrácia']
    },
    'poruba': {
      name: 'Poruba',
      population: '67 000',
      districts: ['Ostrava-Poruba'],
      description: 'Najväčšia mestská časť Ostravy s najhustejšou optickou sieťou v regióne',
      specialties: ['Najväčšia MČ', 'Študentské zľavy', 'Same-day inštalácia']
    }
  };

  const info = cityData[city as keyof typeof cityData];
  if (!info) return null;

  // Získaj relevantné kľúčové slová
  const cityKeywords = EXTENDED_LOCAL_KEYWORDS[city as keyof typeof EXTENDED_LOCAL_KEYWORDS] || [];
  const generalKeywords = EXTENDED_LOCAL_KEYWORDS.general;
  const combinationKeywords = EXTENDED_LOCAL_KEYWORDS.combinations;

  const title = `Internet PODA ${info.name} | Gigabitové optické pripojenie | Tel: 730 431 313`;
  const description = `Najrýchlejší internet PODA v ${info.name} s optickou technológiou GPON. Rýchlosť až 1000 Mbps, bezplatná inštalácia. Pokrytie: ${info.districts.join(', ')}. ${info.description}`;
  
  return {
    title,
    description,
    keywords: [
      ...cityKeywords.slice(0, 10), // Top 10 lokálnych
      ...generalKeywords.slice(0, 8), // Top 8 všeobecných
      ...combinationKeywords.slice(0, 5), // Top 5 kombinácií
      'Moravskoslezský kraj',
      'PODA internet',
      'popri.cz'
    ].join(', '),
    structuredData: generateLocalBusinessStructuredData(info.name, baseUrl),
    breadcrumbs: [
      { name: 'Úvod', url: '/' },
      { name: 'Služby', url: '/internet-tv' },
      { name: `Internet ${info.name}`, url: `/internet-${city}` }
    ],
    geoMeta: {
      'geo.region': 'CZ-MO',
      'geo.placename': `${info.name}, Czech Republic`,
      'geo.position': getCoordinates(info.name),
      'ICBM': getCoordinates(info.name),
      'DC.title': `Internet PODA ${info.name}`
    },
    cityInfo: info // Pridané pre použitie v komponentoch
  };
};

/**
 * Get coordinates for cities
 */
const getCoordinates = (city: string): string => {
  const coords = {
    'Ostrava': '49.8175,18.2624',
    'Karviná': '49.8557,18.5370', 
    'Bohumín': '49.9043,18.3570',
    'Havířov': '49.7794,18.4437',
    'Poruba': '49.8175,18.2624' // Rovnaké ako Ostrava
  };
  
  return coords[city as keyof typeof coords] || coords['Ostrava'];
};

/**
 * Generate enhanced blog post meta with geo optimization
 */
export const generateEnhancedBlogMeta = (post: BlogPost, baseUrl: string) => {
  const keywords = extractSEOKeywords(post);
  const canonicalUrl = `${baseUrl}/blog/${post.id}`;
  
  // Extract location for geo-specific optimization
  const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Havířov', 'Poruba'];
  const postLocation = locations.find(loc => 
    post.title.includes(loc) || post.content.includes(loc) || post.tags?.includes(loc)
  );

  return {
    title: `${post.title} | PODA Blog | Popri.cz`,
    description: post.excerpt,
    keywords: keywords.join(', '),
    canonicalUrl,
    imageUrl: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
      "datePublished": formatDateForSchema(post.date),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": `${baseUrl}/kontakt`
      },
      "publisher": {
        "@type": "Organization", 
        "name": "PODA",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/poda-logo.svg`
        }
      },
      "mainEntityOfPage": canonicalUrl,
      "keywords": post.tags?.join(', '),
      "about": {
        "@type": "Thing",
        "name": postLocation ? `Internet služby PODA ${postLocation}` : "Internet služby PODA"
      }
    },
    geoMeta: postLocation ? {
      'geo.region': 'CZ-MO',
      'geo.placename': `${postLocation}, Czech Republic`,
      'geo.position': getCoordinates(postLocation),
      'ICBM': getCoordinates(postLocation)
    } : null
  };
};

/**
 * Format date for schema.org
 */
const formatDateForSchema = (dateStr: string): string => {
  const parts = dateStr.split('. ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0'); 
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
};

/**
 * Generate FAQ structured data from blog content
 */
export const generateFAQSchema = (content: string) => {
  // Extract questions from h3 headers that look like questions
  const questionRegex = /<h3[^>]*>([^<]*\?[^<]*)<\/h3>/g;
  const questions = [];
  let match;
  
  while ((match = questionRegex.exec(content)) !== null) {
    questions.push({
      "@type": "Question",
      "name": match[1],
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Kontaktujte PODA na čísle 730 431 313 alebo vyplňte kontaktný formulár na popri.cz pre podrobné informácie."
      }
    });
  }

  if (questions.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage", 
    "mainEntity": questions
  };
};

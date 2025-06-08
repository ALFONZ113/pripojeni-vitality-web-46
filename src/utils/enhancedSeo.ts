
import { blogPosts } from '../data/blog';
import type { BlogPost } from '../data/blog/types';
import { generateLocalBusinessStructuredData, extractSEOKeywords } from './sitemapGenerator';

/**
 * Generate comprehensive meta tags for geo-specific pages
 */
export const generateGeoPageMeta = (city: string, baseUrl: string) => {
  const cityData = {
    'ostrava': {
      name: 'Ostrava',
      population: '285 000',
      districts: ['Poruba', 'Vítkovice', 'Mariánské Hory', 'Moravská Ostrava'],
      description: 'Třetí největší město ČR s moderní optickou infrastrukturou'
    },
    'karvina': {
      name: 'Karviná', 
      population: '52 000',
      districts: ['Ráj', 'Hranice', 'Mizerova', 'Nové Město'],
      description: 'Město na polských hranicích s plným pokrytím GPON'
    },
    'bohumin': {
      name: 'Bohumín',
      population: '21 000', 
      districts: ['Starý Bohumín', 'Nový Bohumín', 'Skřečoň'],
      description: 'Strategické město na hranici s Polskem a Slovenskem'
    },
    'havirov': {
      name: 'Havířov',
      population: '70 000',
      districts: ['Šumbark', 'Město', 'Podlesí', 'Prostřední Suchá'],
      description: 'Mladé město s moderní infrastrukturou a kompletním optickým pokrytím'
    }
  };

  const info = cityData[city as keyof typeof cityData];
  if (!info) return null;

  const title = `Internet PODA ${info.name} | Gigabitové optické pripojenie | Popri.cz`;
  const description = `Rýchly internet PODA v ${info.name} s optickou technológiou GPON. Rýchlosť až 1000 Mbps, bezplatná inštalácia. Pokrytie: ${info.districts.join(', ')}. Tel: 730 431 313`;
  
  return {
    title,
    description,
    keywords: [
      `internet ${info.name}`,
      `PODA ${info.name}`,
      `optické pripojenie ${info.name}`,
      'GPON',
      'gigabitový internet',
      'rýchly internet',
      ...info.districts.map(d => `internet ${d}`),
      'Moravskoslezský kraj',
      'optická vlákna'
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
    }
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
    'Havířov': '49.7794,18.4437'
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

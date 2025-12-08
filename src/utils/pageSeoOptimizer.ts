/**
 * Page-specific SEO optimization utility
 */

export interface PageSEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  robots?: string;
  ogImage?: string;
}

/**
 * Optimized SEO data for all main pages
 */
export const OPTIMIZED_PAGE_SEO: Record<string, PageSEOData> = {
  '/': {
    title: 'PODA Internet | Rychlé Optické Připojení + TV | Tel: 730 431 313',
    description: 'Nejrychlejší PODA internet v Moravskoslezském kraji. Gigabitové optické připojení s TV zdarma. Bez závazků, rychlá instalace. Tel: 730 431 313.',
    keywords: ['PODA internet', 'optické připojení', 'rychlý internet', 'Moravskoslezský kraj', 'gigabit internet', 'TV zdarma', 'popri.cz'],
    canonical: 'https://www.popri.cz/',
    robots: 'index, follow',
    ogImage: '/poda-favicon-192x192.png'
  },
  
  '/internet-ostrava': {
    title: 'Internet Ostrava | PODA Gigabit + TV Zdarma | Tel: 730 431 313',
    description: 'PODA internet Ostrava - gigabitové připojení GPON s TV zdarma. Pokrytí celé Ostravy včetně Poruby, rychlá instalace. Bez závazků od 250 Kč/měsíc. Tel: 730 431 313.',
    keywords: ['internet Ostrava', 'PODA Ostrava', 'optické připojení Ostrava', 'gigabitový internet Ostrava', 'GPON Ostrava', 'internet Poruba'],
    canonical: 'https://www.popri.cz/internet-ostrava'
  },

  '/internet-karvina': {
    title: 'Internet Karviná | PODA Optické GPON + TV | Tel: 730 431 313',
    description: 'Rychlý PODA internet v Karviné. Optické připojení až 1000 Mbps + TV balíčky. Kompletní pokrytí města včetně Ráj, Hranice. Instalace zdarma. Tel: 730 431 313.',
    keywords: ['internet Karviná', 'PODA Karviná', 'optické připojení Karviná', 'rychlý internet Karviná', 'GPON Karviná'],
    canonical: 'https://www.popri.cz/internet-karvina'
  },

  '/internet-havirov': {
    title: 'Internet Havířov | PODA GPON + TV Služby | Tel: 730 431 313',
    description: 'PODA internet Havířov - moderní GPON síť s TV službami. Rychlost až 1 Gbit/s, spolehlivé připojení pro domácnosti i firmy. Šumbark, Město, Podlesí. Tel: 730 431 313.',
    keywords: ['internet Havířov', 'PODA Havířov', 'optické připojení Havířov', 'GPON Havířov', 'rychlý internet Havířov'],
    canonical: 'https://www.popri.cz/internet-havirov'
  },

  '/internet-bohumin': {
    title: 'Internet Bohumín | PODA Fiber Trojmezí | Tel: 730 431 313',
    description: 'Internet PODA Bohumín - fiber optické připojení na trojmezí CZ/PL/SK. Rychlá instalace, nízké ceny, TV zdarma. Starý i Nový Bohumín. Bez závazků. Tel: 730 431 313.',
    keywords: ['internet Bohumín', 'PODA Bohumín', 'optické připojení Bohumín', 'fiber internet Bohumín'],
    canonical: 'https://www.popri.cz/internet-bohumin'
  },

  '/internet-poruba': {
    title: 'Internet Poruba | PODA Gigabit Ostrava-Poruba | Tel: 730 431 313',
    description: 'PODA internet Ostrava-Poruba. Nejhustší optická síť v regionu. Gigabitové rychlosti + IPTV. Studentské slevy pro VŠB. Same-day instalace. Tel: 730 431 313.',
    keywords: ['internet Poruba', 'PODA Poruba', 'Ostrava-Poruba internet', 'optické připojení Poruba', 'internet VŠB'],
    canonical: 'https://www.popri.cz/internet-poruba' 
  },

  '/tarify': {
    title: 'Tarify PODA 2025 | Ceny Internet + TV | Od 250 Kč Měsíčně',
    description: 'Aktuální ceník PODA internetu 2025. Transparentní tarify od 250 Kč/měsíc. Internet + TV combo balíčky od 390 Kč. Bez skrytých poplatků. Porovnat na popri.cz',
    keywords: ['tarify PODA', 'ceny PODA internet', 'ceník internet', 'PODA balíčky', 'internet TV ceny'],
    canonical: 'https://www.popri.cz/tarify'
  },

  '/iptv': {
    title: 'IPTV PODA | 160+ TV Kanálů HD Zdarma | Tel: 730 431 313',
    description: 'IPTV PODA - 160+ televizních kanálů v HD kvalitě. Sport, filmy, dokumenty zdarma k internetu. Žádné dodatečné poplatky. Aktivovat IPTV: 730 431 313.',
    keywords: ['IPTV PODA', 'PODA televize', 'HD kanály', 'TV zdarma', 'internetová televize'],
    canonical: 'https://www.popri.cz/iptv'
  },

  '/internet-tv': {
    title: 'Internet + TV PODA | Combo Balíčky Od 390 Kč | Popri.cz',
    description: 'Combo balíčky PODA - internet + TV od 390 Kč měsíčně. Nejvýhodnější kombinace služeb. Gigabit internet + 160 kanálů HD. Objednat na popri.cz',
    keywords: ['internet TV PODA', 'combo balíčky', 'internet + televize', 'PODA balíčky'],
    canonical: 'https://www.popri.cz/internet-tv'
  },

  '/programy': {
    title: 'TV Programy PODA | 160+ Kanálů | Program Guide Online',
    description: 'TV program PODA - přehled všech 160+ kanálů. Aktuální vysílání sportovních, filmových a dokumentárních stanic. Kompletní programový guide online.',
    keywords: ['TV program PODA', 'programy', 'televizní program', 'PODA kanály'],
    canonical: 'https://www.popri.cz/programy'
  },

  '/kontakt': {
    title: 'Kontakt PODA | Objednávka Internet + TV | Tel: 730 431 313',
    description: 'Kontakt PODA - objednávka internetu a TV služeb. Telefon: 730 431 313, email: terc@obchod.poda.cz. Rychlá instalace po celém Moravskoslezském kraji.',
    keywords: ['kontakt PODA', 'objednávka PODA', 'PODA telefon', 'popri.cz kontakt'],
    canonical: 'https://www.popri.cz/kontakt'
  },

  '/blog': {
    title: 'PODA Blog | Tipy Internet + TV | Technické Návody | Popri.cz',
    description: 'PODA blog - praktické tipy pro internet a TV. Technické návody, srovnání poskytovatelů, optimalizace domácí sítě. Expertní rady pro lepší připojení.',
    keywords: ['PODA blog', 'internet tipy', 'TV návody', 'technické rady', 'síťové řešení'],
    canonical: 'https://www.popri.cz/blog'
  }
};

/**
 * Get optimized SEO data for a page
 */
export const getPageSEO = (path: string): PageSEOData => {
  // Remove trailing slash and query parameters
  const cleanPath = path.replace(/\/$/, '') || '/';
  
  return OPTIMIZED_PAGE_SEO[cleanPath] || {
    title: 'PODA Internet | Optické Připojení Moravskoslezský Kraj | Tel: 730 431 313',
    description: 'Nejlepší PODA internet v Moravskoslezském kraji. Gigabitové optické připojení s TV službami. Rychlá instalace, spolehlivá podpora. Tel: 730 431 313.',
    keywords: ['PODA internet', 'optické připojení', 'Moravskoslezský kraj', 'rychlý internet'],
    canonical: `https://www.popri.cz${cleanPath}`
  };
};

/**
 * Generate structured data for page
 */
export const generatePageStructuredData = (path: string, seoData: PageSEOData) => {
  const baseUrl = 'https://www.popri.cz';
  
  if (path === '/') {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PODA",
      "url": baseUrl,
      "logo": `${baseUrl}/poda-logo.svg`,
      "description": seoData.description,
      "telephone": "+420730431313",
      "email": "terc@obchod.poda.cz",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Moravskoslezský kraj",
        "addressCountry": "CZ"
      },
      "serviceType": [
        "Internet Service Provider",
        "Optické pripojenie",
        "IPTV služby",
        "Telekomunikácie"
      ],
      "areaServed": {
        "@type": "State", 
        "name": "Moravskoslezský kraj"
      }
    };
  }

  // City-specific pages
  const cityMatch = path.match(/\/internet-(.+)/);
  if (cityMatch) {
    const city = cityMatch[1];
    const cityNames: Record<string, string> = {
      'ostrava': 'Ostrava',
      'karvina': 'Karviná', 
      'havirov': 'Havířov',
      'bohumin': 'Bohumín',
      'poruba': 'Poruba'
    };

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `PODA ${cityNames[city] || city}`,
      "description": seoData.description,
      "url": `${baseUrl}${path}`,
      "telephone": "+420730431313",
      "email": "terc@obchod.poda.cz",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityNames[city] || city,
        "addressRegion": "Moravskoslezský kraj",
        "addressCountry": "CZ"
      },
      "serviceType": [
        "Internet",
        "Optické pripojenie",
        "IPTV",
        "Gigabitové pripojenie"
      ],
      "priceRange": "250-899 CZK",
      "currenciesAccepted": "CZK"
    };
  }

  return null;
};

/**
 * Check if page SEO is optimized
 */
export const isPageSEOOptimized = (path: string, currentTitle?: string, currentDescription?: string): boolean => {
  const optimized = getPageSEO(path);
  
  const titleOptimized = currentTitle && 
    currentTitle.length >= 30 && 
    currentTitle.length <= 65 &&
    currentTitle.includes('PODA');

  const descriptionOptimized = currentDescription &&
    currentDescription.length >= 130 &&
    currentDescription.length <= 160 &&
    currentDescription.includes('730 431 313');

  return titleOptimized && descriptionOptimized;
};

/**
 * Get all pages that need SEO optimization
 */
export const getPagesNeedingOptimization = (): Array<{path: string, issues: string[]}> => {
  const pages = Object.keys(OPTIMIZED_PAGE_SEO);
  const needingOptimization: Array<{path: string, issues: string[]}> = [];

  pages.forEach(path => {
    const issues: string[] = [];
    const seo = getPageSEO(path);
    
    // This would normally check actual page content
    // For now, we assume they need optimization
    if (path !== '/') {
      issues.push('Title needs optimization');
      issues.push('Meta description needs optimization'); 
    }
    
    if (issues.length > 0) {
      needingOptimization.push({ path, issues });
    }
  });

  return needingOptimization;
};
/**
 * Advanced sitemap optimization utilities for Google Search Console
 * Includes validation, optimization tips, and GSC-specific enhancements
 */

import { generateSitemap, validateSitemapXML } from './sitemapGenerator';

/**
 * Advanced sitemap optimization with GSC best practices
 */
export interface SitemapOptimization {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
  gscCompatibility: boolean;
  totalUrls: number;
  duplicateUrls: string[];
  invalidUrls: string[];
}

/**
 * Optimize sitemap for Google Search Console submission
 */
export const optimizeSitemapForGSC = (sitemapContent: string): SitemapOptimization => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let gscCompatibility = true;
  
  // Basic XML validation
  const isValid = validateSitemapXML(sitemapContent);
  
  if (!isValid) {
    issues.push('❌ Sitemap XML nie je validný');
    gscCompatibility = false;
  }

  // Check URL count (GSC limit: 50,000 URLs per sitemap)
  const urlMatches = sitemapContent.match(/<loc>/g);
  const totalUrls = urlMatches ? urlMatches.length : 0;
  
  if (totalUrls > 50000) {
    issues.push('❌ Sitemap obsahuje viac ako 50,000 URL (GSC limit)');
    recommendations.push('💡 Rozdeľte sitemap na menšie súbory a použite sitemap index');
    gscCompatibility = false;
  }

  // Check file size (GSC limit: 50MB uncompressed, 10MB compressed)
  const sizeBytes = new Blob([sitemapContent]).size;
  const sizeMB = sizeBytes / (1024 * 1024);
  
  if (sizeMB > 50) {
    issues.push('❌ Sitemap je väčší ako 50MB');
    gscCompatibility = false;
  } else if (sizeMB > 10) {
    recommendations.push('💡 Zvážte gzip kompresiu pre rýchlejšie načítanie');
  }

  // Extract URLs for duplicate detection
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls: string[] = [];
  let match;
  
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  // Find duplicate URLs
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
  const uniqueDuplicates = [...new Set(duplicateUrls)];
  
  if (uniqueDuplicates.length > 0) {
    issues.push(`❌ Nájdené duplicitné URL: ${uniqueDuplicates.length}`);
    gscCompatibility = false;
  }

  // Check for invalid URLs
  const invalidUrls: string[] = [];
  urls.forEach(url => {
    try {
      new URL(url);
      // Check for common issues
      if (!url.startsWith('https://')) {
        invalidUrls.push(url);
      }
      if (url.includes(' ')) {
        invalidUrls.push(url);
      }
    } catch {
      invalidUrls.push(url);
    }
  });

  if (invalidUrls.length > 0) {
    issues.push(`❌ Nevalidné URL: ${invalidUrls.length}`);
    gscCompatibility = false;
  }

  // SEO recommendations
  if (sitemapContent.includes('<priority>')) {
    recommendations.push('✅ Používa priority elementy pre lepšie SEO');
  } else {
    recommendations.push('💡 Pridajte priority elementy (0.0-1.0)');
  }

  if (sitemapContent.includes('<changefreq>')) {
    recommendations.push('✅ Používa changefreq elementy');
  } else {
    recommendations.push('💡 Pridajte changefreq elementy (daily, weekly, monthly)');
  }

  if (sitemapContent.includes('<lastmod>')) {
    recommendations.push('✅ Používa lastmod elementy');
  } else {
    recommendations.push('💡 Pridajte lastmod elementy s aktuálnymi dátumami');
  }

  if (sitemapContent.includes('image:image')) {
    recommendations.push('✅ Obsahuje image sitemap elementy');
  } else {
    recommendations.push('💡 Pridajte image sitemap elementy pre obrázky');
  }

  if (sitemapContent.includes('hreflang')) {
    recommendations.push('✅ Obsahuje hreflang elementy');
  } else {
    recommendations.push('💡 Pridajte hreflang elementy pre internationalization');
  }

  return {
    isValid,
    issues,
    recommendations,
    gscCompatibility,
    totalUrls,
    duplicateUrls: uniqueDuplicates,
    invalidUrls
  };
};

/**
 * Generate sitemap index for large sites
 */
export const generateSitemapIndex = (sitemapUrls: string[], baseUrl: string = 'https://www.popri.cz'): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapIndex += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  sitemapUrls.forEach(sitemapUrl => {
    sitemapIndex += `  <sitemap>\n`;
    sitemapIndex += `    <loc>${baseUrl}${sitemapUrl.startsWith('/') ? sitemapUrl : '/' + sitemapUrl}</loc>\n`;
    sitemapIndex += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemapIndex += `  </sitemap>\n`;
  });
  
  sitemapIndex += `</sitemapindex>`;
  
  return sitemapIndex;
};

/**
 * Validate individual URL for sitemap inclusion
 */
export const validateSitemapUrl = (url: string): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  let isValid = true;

  try {
    const urlObj = new URL(url);
    
    // Check protocol
    if (urlObj.protocol !== 'https:') {
      issues.push('URL nepoužíva HTTPS');
      isValid = false;
    }
    
    // Check for special characters
    if (url.includes(' ')) {
      issues.push('URL obsahuje medzery');
      isValid = false;
    }
    
    // Check length (Google recommends <2048 characters)
    if (url.length > 2048) {
      issues.push('URL je príliš dlhé (>2048 znakov)');
      isValid = false;
    }
    
    // Check for fragments
    if (urlObj.hash) {
      issues.push('URL obsahuje fragment (#), ktorý bude ignorovaný');
    }
    
  } catch (error) {
    issues.push('URL má nevalidný formát');
    isValid = false;
  }

  return { isValid, issues };
};

/**
 * GSC submission checklist
 */
export const getGSCSubmissionChecklist = (): { item: string; status: 'required' | 'recommended' | 'optional' }[] => {
  return [
    { item: 'XML je validný a dobre formátovaný', status: 'required' },
    { item: 'Všetky URL sú dostupné (HTTP 200)', status: 'required' },
    { item: 'Sitemap je dostupný na verejnej URL', status: 'required' },
    { item: 'Obsahuje menej ako 50,000 URL', status: 'required' },
    { item: 'Súbor je menší ako 50MB', status: 'required' },
    { item: 'Používa HTTPS URL', status: 'required' },
    { item: 'Neobsahuje duplicitné URL', status: 'required' },
    { item: 'Má aktuálne lastmod dátumy', status: 'recommended' },
    { item: 'Používa správne priority (0.0-1.0)', status: 'recommended' },
    { item: 'Má rozumné changefreq hodnoty', status: 'recommended' },
    { item: 'Obsahuje image sitemap elementy', status: 'recommended' },
    { item: 'Má hreflang pre internationalization', status: 'optional' },
    { item: 'Je gzip komprimovaný', status: 'optional' },
  ];
};

/**
 * Generate complete optimized sitemap with all enhancements
 */
export const generateOptimizedSitemap = (baseUrl: string = 'https://www.popri.cz'): string => {
  const sitemap = generateSitemap(baseUrl);
  const optimization = optimizeSitemapForGSC(sitemap);
  
  if (!optimization.gscCompatibility) {
    console.warn('Sitemap nie je optimalizovaný pre GSC:', optimization.issues);
  }
  
  return sitemap;
};

/**
 * Export sitemap report for manual review
 */
export const generateSitemapReport = (sitemapContent: string): string => {
  const optimization = optimizeSitemapForGSC(sitemapContent);
  const checklist = getGSCSubmissionChecklist();
  
  let report = `
# SITEMAP REPORT PRE GOOGLE SEARCH CONSOLE

## Základné informácie
- Celkový počet URL: ${optimization.totalUrls}
- GSC kompatibilita: ${optimization.gscCompatibility ? '✅ ÁNO' : '❌ NIE'}
- XML validita: ${optimization.isValid ? '✅ Validný' : '❌ Nevalidný'}

## Problémy (${optimization.issues.length})
${optimization.issues.map(issue => `- ${issue}`).join('\n')}

## Odporúčania (${optimization.recommendations.length})
${optimization.recommendations.map(rec => `- ${rec}`).join('\n')}

## GSC Submission Checklist
${checklist.map(item => `- [${item.status === 'required' ? 'REQUIRED' : item.status === 'recommended' ? 'REC' : 'OPT'}] ${item.item}`).join('\n')}

## Duplicitné URL (${optimization.duplicateUrls.length})
${optimization.duplicateUrls.map(url => `- ${url}`).join('\n')}

## Nevalidné URL (${optimization.invalidUrls.length})
${optimization.invalidUrls.map(url => `- ${url}`).join('\n')}

---
Report vygenerovaný: ${new Date().toISOString()}
  `.trim();
  
  return report;
};
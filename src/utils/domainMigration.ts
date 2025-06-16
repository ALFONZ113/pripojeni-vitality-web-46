
/**
 * Domain Migration Utilities
 * Pomôcky pre migráciu z pripojeni-poda.cz na www.popri.cz
 */

export const MIGRATION_CONFIG = {
  oldDomain: 'pripojeni-poda.cz',
  newDomain: 'www.popri.cz',
  migrationDate: '2025-06-16',
  googleSearchConsoleProperty: 'sc-domain:popri.cz'
};

/**
 * Generuje správne canonical URLs pre migráciu
 */
export const generateCanonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://${MIGRATION_CONFIG.newDomain}${cleanPath}`;
};

/**
 * Kontroluje či je request z starej domény
 */
export const isOldDomain = (hostname: string): boolean => {
  return hostname.includes('pripojeni-poda') || hostname === 'pripojeni-poda.cz' || hostname === 'www.pripojeni-poda.cz';
};

/**
 * Generuje 301 redirect pravidlá pre .htaccess
 */
export const generateRedirectRules = (): string[] => {
  return [
    '# Domain Migration Rules - pripojeni-poda.cz -> www.popri.cz',
    'RewriteCond %{HTTP_HOST} ^(www\\.)?pripojeni-poda\\.cz$ [NC]',
    'RewriteRule ^(.*)$ https://www.popri.cz/$1 [L,R=301]',
    '',
    '# Force www for popri.cz',
    'RewriteCond %{HTTP_HOST} ^popri\\.cz$ [NC]',
    'RewriteRule ^(.*)$ https://www.popri.cz/$1 [L,R=301]'
  ];
};

/**
 * Generuje hreflang značky pre migráciu
 */
export const generateHreflangTags = (currentPath: string): Array<{href: string, hreflang: string}> => {
  const canonicalUrl = generateCanonicalUrl(currentPath);
  
  return [
    { href: canonicalUrl, hreflang: 'cs' },
    { href: canonicalUrl, hreflang: 'sk' },
    { href: canonicalUrl, hreflang: 'x-default' }
  ];
};

/**
 * Google Search Console Change of Address data
 */
export const getGSCMigrationData = () => {
  return {
    oldSite: 'https://pripojeni-poda.cz',
    newSite: 'https://www.popri.cz',
    migrationDate: MIGRATION_CONFIG.migrationDate,
    verificationMethods: [
      'HTML file upload',
      'DNS TXT record',
      'Google Analytics',
      'Google Tag Manager'
    ],
    keyActions: [
      'Pridať obe domény do GSC',
      'Nastaviť Change of Address tool',
      'Odoslať sitemap na novej doméne',
      'Monitorovať indexovanie',
      'Sledovať 404 chyby'
    ]
  };
};

/**
 * Checklist pre migráciu domény
 */
export const getMigrationChecklist = () => {
  return {
    technical: [
      '✓ 301 redirecty nastavené',
      '✓ Canonical URLs aktualizované',
      '✓ Sitemap presmerovaný',
      '✓ Robots.txt aktualizovaný',
      '□ SSL certifikát pre novú doménu',
      '□ DNS záznamy aktualizované'
    ],
    seo: [
      '□ Google Search Console - nová property',
      '□ Change of Address tool aktivovaný',
      '□ Sitemap odoslaný na novej doméne',
      '□ Hreflang značky pridané',
      '□ Schema.org údaje aktualizované',
      '□ Open Graph meta tags aktualizované'
    ],
    monitoring: [
      '□ Google Analytics tracking',
      '□ Search Console chyby',
      '□ 404 error monitoring',
      '□ Organic traffic tracking',
      '□ Backlink monitoring',
      '□ Page speed monitoring'
    ]
  };
};

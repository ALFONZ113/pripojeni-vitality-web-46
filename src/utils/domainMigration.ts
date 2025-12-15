
/**
 * Domain Migration Utilities - FIXED FOR PROPER CANONICAL URLS
 * Pomôcky pre migráciu z pripojeni-poda.cz na www.popri.cz
 */

export const MIGRATION_CONFIG = {
  oldDomain: 'pripojeni-poda.cz',
  newDomain: 'www.popri.cz',
  migrationDate: '2025-06-23',
  googleSearchConsoleProperty: 'sc-domain:popri.cz'
};

/**
 * Generuje správne canonical URLs pre migráciu - ALWAYS www.popri.cz
 */
export const generateCanonicalUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // CRITICAL: Always return www.popri.cz as canonical
  return `https://www.popri.cz${cleanPath}`;
};

/**
 * Kontroluje či je request z starej domény
 */
export const isOldDomain = (hostname: string): boolean => {
  return hostname.includes('pripojeni-poda') || 
         hostname === 'pripojeni-poda.cz' || 
         hostname === 'www.pripojeni-poda.cz' ||
         hostname === 'popri.cz'; // Non-www is also old
};

/**
 * Generuje 301 redirect pravidlá pre .htaccess
 */
export const generateRedirectRules = (): string[] => {
  return [
    '# Domain Migration Rules - FIXED ORDER',
    '# 1. Force HTTPS first',
    'RewriteCond %{HTTPS} off',
    'RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]',
    '',
    '# 2. Redirect old domain to new domain',
    'RewriteCond %{HTTP_HOST} ^(www\.)?pripojeni-poda\.cz$ [NC]',
    'RewriteRule ^(.*)$ https://www.popri.cz/$1 [L,R=301]',
    '',
    '# 3. Force www for popri.cz',
    'RewriteCond %{HTTP_HOST} ^popri\.cz$ [NC]',
    'RewriteRule ^(.*)$ https://www.popri.cz$1 [L,R=301]'
  ];
};

/**
 * Generuje hreflang značky pre migráciu - FIXED
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
 * Google Search Console Migration data - UPDATED
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
      'Odoslať sitemap na novej doméne (www.popri.cz/sitemap.xml)',
      'Požiadať o re-indexovanie kritických stránok',
      'Sledovať Index Coverage report',
      'Kontrolovať odstránenie duplicitných stránok z indexu'
    ],
    criticalUrls: [
      'https://www.popri.cz/',
      'https://www.popri.cz/kontakt',
      'https://www.popri.cz/tarify',
      'https://www.popri.cz/internet-tv'
    ]
  };
};

/**
 * Checklist pre migráciu domény - UPDATED
 */
export const getMigrationChecklist = () => {
  return {
    technical: [
      '✓ 301 redirecty nastavené (.htaccess + _redirects)',
      '✓ Canonical URLs aktualizované (iba www.popri.cz)',
      '✓ Sitemap aktualizovaný (iba www verzie)',
      '✓ Robots.txt aktualizovaný',
      '✓ SSL certifikát pre novú doménu',
      '✓ DNS záznamy aktualizované'
    ],
    seo: [
      '□ Google Search Console - nová property pridaná',
      '□ Change of Address tool aktivovaný',
      '□ Sitemap odoslaný na www.popri.cz',
      '□ Hreflang značky pridané',
      '□ Schema.org údaje aktualizované',
      '□ Open Graph meta tags aktualizované',
      '□ Kritické stránky re-indexované'
    ],
    monitoring: [
      '□ Index Coverage sledované',
      '□ Search Console chyby monitorované',
      '□ 404 error monitoring',
      '□ Organic traffic tracking',
      '□ Duplicitné stránky odstránené z indexu'
    ]
  };
};

import { blogPosts } from '../data/blog';
import { createSlug } from './slugGenerator';

/**
 * Generate URLs for manual indexing requests - uses dynamic slug-based URLs
 */
export const getIndexingUrls = () => {
  // Generate blog URLs dynamically from blogPosts with slug-based URLs
  const blogUrls = blogPosts.slice(0, 20).map(post => {
    const slug = post.slug || createSlug(post.title);
    return `https://www.popri.cz/blog/${slug}`;
  });

  return {
    critical: [
      'https://www.popri.cz/',
      'https://www.popri.cz/kontakt', 
      'https://www.popri.cz/tarify',
      'https://www.popri.cz/internet-tv'
    ],
    geographic: [
      'https://www.popri.cz/internet-ostrava',
      'https://www.popri.cz/internet-karvina',
      'https://www.popri.cz/internet-bohumin',
      'https://www.popri.cz/internet-havirov',
      'https://www.popri.cz/internet-frydek-mistek',
      'https://www.popri.cz/internet-orlova',
      'https://www.popri.cz/internet-brno'
    ],
    blog: blogUrls
  };
};

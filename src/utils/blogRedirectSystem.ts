/**
 * Blog redirect system for handling old ID-based URLs to new slug-based URLs
 */

import { BlogPost } from '../data/blog/types';
import { createSlug } from './slugGenerator';
import { blogPosts } from '../data/blog';

/**
  * COMPLETE redirect mapping for ALL blog post IDs to their slug-based URLs
  * CRITICAL: Tieto mapovania musia zodpovedať public/_redirects
 */
export const blogRedirectMap: Record<string, string> = {
  // ID 2 - GPON technologie v regionu
  '/blog/2': '/blog/gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu',
  
  // ID 3 - Router výběr
  '/blog/3': '/blog/jak-vybrat-spravny-router-domov-kompletni-pruvodce-2025',
  
  // ID 4 - Mesh systémy
  '/blog/4': '/blog/mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov',
  
  // ID 5 - Zabezpečení WiFi
  '/blog/5': '/blog/zabezpeceni-domaci-wifi-site-kompletni-pruvodce-bezpecnosti',
  
  // ID 6 - TV balíčky
  '/blog/6': '/blog/jak-vybrat-nejlepsi-tv-balicek-vasi-rodinu',
  
  // ID 7 - Sport online
  '/blog/7': '/blog/nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky',
  
  // ID 8 - Test rychlosti
  '/blog/8': '/blog/jak-otestovat-rychlost-internetu-prakticke-tipy-nejlepsi-nastroje',
  
  // ID 10 - Karviná
  '/blog/10': '/blog/rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda',
  
  // ID 11 - Novinky PODA
  '/blog/11': '/blog/novinky-poda-sluzby-nove-moznosti-zakaznici',
  
  // ID 12 - Rozšíření pokrytí
  '/blog/12': '/blog/rozsireni-pokryti-poda-nove-oblasti-opticky-internet',
  
  // ID 13 - Recenze zákazníků
  '/blog/13': '/blog/recenze-zakazniku-poda-skutecne-zkusenosti-sluzby',
  
  // ID 30 - Pomalý internet fix
  '/blog/30': '/blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025',
  
  // ID 31 - Gaming Ostrava
  '/blog/31': '/blog/internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  
  // ID 100 - Ostrava Poruba
  '/blog/100': '/blog/internet-poda-ostrava-poruba-gigabitove-pripojeni-nejvetsi-mestska-cast',
  
  // ID 102 - O2 Nej prevzatie
  '/blog/102': '/blog/o2-nej-prevzatie-poda-alternativa-zakaznici',
  
  // ID 150 - Optika vs měď
  '/blog/150': '/blog/optika-vs-med-ostravsko-internet-21-stoleti',
  
  // ID 201 - Polanka 60GHz
  '/blog/201': '/blog/polanka-nad-odrou-60ghz-pripojeni-2025',
  
  // ID 203 - IPTV vs tradičná TV
  '/blog/203': '/blog/iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod',
  
  // ID 204 - Panelák FAQ
  '/blog/204': '/blog/nejcastejsi-otazky-pripojeni-internet-panelak',
  
  // ID 205 - Gaming (alias to 31)
  '/blog/205': '/blog/internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  
  // ID 206 - Internet guide
  '/blog/206': '/blog/nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025',
  
  // ID 301 - Home office 2025
  '/blog/301': '/blog/home-office-2025-jak-nastavit-domaci-kancelar-produktivita',
  
  // ID 401 - Výběr internetu chyby
  '/blog/401': '/blog/ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi',
  
  // ID 500 - Ostrava hlavní článek
  '/blog/500': '/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025',
  
  // ID 601 - PODA Internet 2026
  '/blog/601': '/blog/poda-internet-2026-budoucnost-pripojeni',
  
  // ID 701 - WiFi signal zlepšení
  '/blog/701': '/blog/jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025',
  
  // ID 801 - Mýty o optike
  '/blog/801': '/blog/myty-opticky-internet-pravda-vs-fikce',
  
  // ID 901 - Pomalý internet večer
  '/blog/901': '/blog/proc-internet-zpomaluje-vecer-reseni',
  
  // ID 999 - GPON technologie
  '/blog/999': '/blog/gpon-technologie-jak-funguje-moderni-opticky-internet',
  
  // ID 1001 - AI a internet
  '/blog/1001': '/blog/jak-ai-meni-svet-internetu-budoucnost-pripojeni',
  
  // Opravené staré slugy
  '/blog/gaming-internet-ostrava-2025': '/blog/internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  '/blog/internet-vyber-5-chyb-ktore-vas-stoji-penize': '/blog/ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi',
};

/**
 * Get redirect target for old URL
 */
export const getRedirectTarget = (oldPath: string): string | null => {
  return blogRedirectMap[oldPath] || null;
};

/**
 * Generate all blog post redirects automatically
 */
export const generateBlogRedirects = (): Record<string, string> => {
  const redirects: Record<string, string> = { ...blogRedirectMap };
  
  blogPosts.forEach(post => {
    const slug = post.slug || createSlug(post.title);
    const oldIdPath = `/blog/${post.id}`;
    const newSlugPath = `/blog/${slug}`;
    
    // Only add if not already defined manually
    if (!redirects[oldIdPath]) {
      redirects[oldIdPath] = newSlugPath;
    }
  });
  
  return redirects;
};

/**
 * Check if URL should redirect
 */
export const shouldRedirect = (currentPath: string): boolean => {
  return currentPath in blogRedirectMap || /^\/blog\/\d+$/.test(currentPath);
};

/**
 * Apply client-side redirect if needed
 */
export const applyRedirect = (currentPath: string): void => {
  const redirectTarget = getRedirectTarget(currentPath);
  
  if (redirectTarget) {
    // Use replace to avoid adding to history
    window.history.replaceState({}, '', redirectTarget);
  }
};

/**
 * Generate robots meta content based on path
 */
export const getRobotsMetaContent = (path: string): string => {
  // Noindex for old ID-based URLs and parameterized URLs
  if (path.match(/^\/blog\/\d+/) || path.includes('?')) {
    return 'noindex, follow';
  }
  return 'index, follow';
};

/**
 * Generate canonical URL for blog posts - ALWAYS use www.popri.cz
 */
export const getCanonicalUrl = (path: string, baseUrl: string = 'https://www.popri.cz'): string => {
  // CRITICAL: Force www.popri.cz for all canonical URLs
  const canonicalBase = 'https://www.popri.cz';
  const redirectTarget = getRedirectTarget(path);
  const canonicalPath = redirectTarget || path;
  
  // Remove query parameters for canonical URL
  const cleanPath = canonicalPath.split('?')[0];
  
  return `${canonicalBase}${cleanPath}`;
};

/**
 * Export for .htaccess generation
 */
export const generateHtaccessRedirects = (): string => {
  const redirects = generateBlogRedirects();
  let htaccess = '# Blog post redirects\n';
  
  Object.entries(redirects).forEach(([from, to]) => {
    htaccess += `Redirect 301 ${from} ${to}\n`;
  });
  
  // Query parameter cleanup
  htaccess += '\n# Query parameter cleanup\n';
  htaccess += 'RewriteEngine On\n';
  htaccess += 'RewriteCond %{QUERY_STRING} ^(.*&)?utm_[^&]*(&.*)?$\n';
  htaccess += 'RewriteRule ^blog/(.*)$ /blog/%1? [R=301,L]\n';
  
  return htaccess;
};
/**
 * Blog redirect system for handling old ID-based URLs to new slug-based URLs
 */

import { BlogPost } from '../data/blog/types';
import { createSlug } from './slugGenerator';
import { blogPosts } from '../data/blog';

/**
 * Redirect mapping for old blog post URLs to new slug-based URLs
 */
export const blogRedirectMap: Record<string, string> = {
  // Old O2 Nej.cz article (was ID 102, now 102)
  '/blog/102': '/blog/o2-nej-prevzatie-poda-alternativa-zakaznici',
  
  // Polanka 60ghz (was ID 102, now 201)
  '/blog/201': '/blog/polanka-nad-odrou-60ghz-pripojeni-2025',
  
  // Internet guide (was ID 102, now 206)
  '/blog/206': '/blog/nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025',
  
  // IPTV vs traditional TV (was ID 101, now 203)
  '/blog/203': '/blog/iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod',
  
  // Panelak questions (was ID 101, now 204)
  '/blog/204': '/blog/nejcastejsi-otazky-pripojeni-internet-panelak',
  
  // Gaming example (was ID 101, now 205)
  '/blog/205': '/blog/gaming-internet-ostrava-2025',
  
  // Slow internet fix (ID 30)
  '/blog/30': '/blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025',
  
  // Gaming Ostrava (ID 31)
  '/blog/31': '/blog/internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  
  // Ostrava main post (ID 500)
  '/blog/500': '/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025',
  
  // Karvina post (ID 10)
  '/blog/10': '/blog/rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda',
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
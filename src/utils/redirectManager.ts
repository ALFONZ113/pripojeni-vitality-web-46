/**
 * Enhanced redirect and canonicalization manager for GSC indexing fixes
 */

export interface RedirectRule {
  from: string;
  to: string;
  status: 301 | 302;
  reason: string;
}

// Critical blog post redirects based on GSC data
export const blogPostRedirects: RedirectRule[] = [
  // High priority redirects based on GSC indexing data
  { from: '/blog/102', to: '/blog/internet-poda-ostrava-pripojeni', status: 301, reason: 'SEO migration' },
  { from: '/blog/101', to: '/blog/rychly-internet-karvina', status: 301, reason: 'SEO migration' },
  { from: '/blog/100', to: '/blog/opticky-internet-ostrava', status: 301, reason: 'SEO migration' },
  
  // Additional redirects for all numeric blog IDs
  { from: '/blog/1', to: '/blog/technologie-budoucnosti-60ghz-internet', status: 301, reason: 'SEO migration' },
  { from: '/blog/2', to: '/blog/mesh-vs-wifi-routers-complete-guide', status: 301, reason: 'SEO migration' },
  { from: '/blog/3', to: '/blog/jednoduchy-prechod-k-poda-od-stavajuceho-poskytovatela-v-moravskoslezskem-regione', status: 301, reason: 'SEO migration' },
  { from: '/blog/4', to: '/blog/mesh-systemy-vs-klasicke-routery-co-je-lepsi-pro-vas-domov', status: 301, reason: 'SEO migration' },
  { from: '/blog/5', to: '/blog/home-network-setup-guide', status: 301, reason: 'SEO migration' },
  { from: '/blog/6', to: '/blog/internet-speed-test-tips', status: 301, reason: 'SEO migration' },
  { from: '/blog/7', to: '/blog/fiber-vs-cable-internet-comparison', status: 301, reason: 'SEO migration' },
  { from: '/blog/8', to: '/blog/jak-otestovat-rychlost-internetu-prakticke-tipy-a-nejlepsi-nastroje', status: 301, reason: 'SEO migration' },
  { from: '/blog/9', to: '/blog/60ghz-internet', status: 301, reason: 'SEO migration' },
  { from: '/blog/10', to: '/blog/gaming-internet-requirements', status: 301, reason: 'SEO migration' },
  { from: '/blog/11', to: '/blog/internet-for-business-guide', status: 301, reason: 'SEO migration' },
  { from: '/blog/12', to: '/blog/domaci-sit-nastaveni', status: 301, reason: 'SEO migration' },
  { from: '/blog/13', to: '/blog/recenzie-zakaznikov-poda-skutocne-skusenosti-s-nasimi-sluzbami', status: 301, reason: 'SEO migration' },
  { from: '/blog/31', to: '/blog/latest-poda-news-updates', status: 301, reason: 'SEO migration' },
];

// Canonical rules for handling duplicate content shown in GSC
export const canonicalRules = [
  // Remove all query parameters from blog URLs
  { pattern: '/blog\\?.*', canonical: '/blog', noindex: true },
  { pattern: '/blog/\\?.*', canonical: '/blog', noindex: true },
  { pattern: '/blog.*\\?source=.*', canonical: (path: string) => path.split('?')[0], noindex: true },
  { pattern: '/blog.*\\?post_id=.*', canonical: (path: string) => path.split('?')[0], noindex: true },
  { pattern: '/blog.*\\?category=.*', canonical: (path: string) => path.split('?')[0], noindex: true },
  { pattern: '/blog.*\\?tag=.*', canonical: '/blog', noindex: true },
];

/**
 * Check if URL should be noindexed based on GSC duplicate content issues
 */
export const shouldNoIndex = (currentPath: string): boolean => {
  // Noindex URLs with query parameters that cause duplicate content
  if (currentPath.includes('?')) {
    try {
      const url = new URL(currentPath, 'https://www.popri.cz');
      const params = url.searchParams;
      
      // Noindex blog pages with parameters that create duplicates
      if (currentPath.startsWith('/blog') && (
        params.has('tag') || 
        params.has('category') || 
        params.has('source') || 
        params.has('post_id') ||
        params.has('page')
      )) {
        return true;
      }
    } catch (e) {
      // If URL parsing fails, treat as noindex if has query params
      return currentPath.includes('?');
    }
  }
  
  return false;
};

/**
 * Handle client-side redirects for indexing fixes
 */
export const handleBlogRedirects = (): void => {
  if (typeof window === 'undefined') return;
  
  const currentPath = window.location.pathname;
  const redirectTarget = getRedirectTarget(currentPath);
  
  if (redirectTarget) {
    // Use replaceState to avoid creating history entries
    window.history.replaceState(null, '', redirectTarget);
  }
};

/**
 * Generate SEO-friendly slug from blog post title
 */
export const generateSEOSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[áàâäčďéèêëěíìîïňóòôöřšťúùûüůýžŕľ]/g, (match) => {
      const map: { [key: string]: string } = {
        'á': 'a', 'à': 'a', 'â': 'a', 'ä': 'a', 'č': 'c', 'ď': 'd',
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e', 'ě': 'e',
        'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i', 'ň': 'n',
        'ó': 'o', 'ò': 'o', 'ô': 'o', 'ö': 'o', 'ř': 'r',
        'š': 's', 'ť': 't', 'ú': 'u', 'ù': 'u', 'û': 'u',
        'ü': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z', 'ŕ': 'r', 'ľ': 'l'
      };
      return map[match] || match;
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Check if URL needs redirect and return target
 */
export const getRedirectTarget = (currentPath: string): string | null => {
  const redirect = blogPostRedirects.find(rule => rule.from === currentPath);
  return redirect?.to || null;
};

/**
 * Generate canonical URL for current page based on GSC issues
 */
export const getCanonicalURL = (currentPath: string): string => {
  const baseUrl = 'https://www.popri.cz';
  
  // Handle blog redirects first
  const redirectTarget = getRedirectTarget(currentPath);
  if (redirectTarget) {
    return `${baseUrl}${redirectTarget}`;
  }
  
  // Handle query parameter cleanup for duplicate content
  if (currentPath.includes('?')) {
    const cleanPath = currentPath.split('?')[0];
    
    // For blog tag/category pages, canonical is /blog
    if (currentPath.includes('/blog') && (currentPath.includes('tag=') || currentPath.includes('category='))) {
      return `${baseUrl}/blog`;
    }
    
    return `${baseUrl}${cleanPath}`;
  }
  
  return `${baseUrl}${currentPath}`;
};

/**
 * Generate robots meta content based on GSC indexing issues
 */
export const getRobotsContent = (currentPath: string): string => {
  if (shouldNoIndex(currentPath)) {
    return 'noindex, follow';
  }
  
  // Default indexing with enhanced snippet settings
  return 'index, follow, max-snippet:-1, max-image-preview:large';
};

/**
 * URL shortening for overly long URLs
 */
export const shortenLongURL = (url: string): string => {
  if (url.length <= 60) return url;
  
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  
  if (lastPart && lastPart.length > 50) {
    // Keep important terms, remove common filler words
    const shortened = lastPart
      .replace(/-v-moravskoslezskem-(kraji|regione)/g, '-moravskoslezsky')
      .replace(/-nejrychlejsi-opticke-pripojeni/g, '-opticky-internet')
      .replace(/-skutocne-skusenosti-s-nasimi-sluzbami/g, '-recenzie')
      .replace(/-od-stavajuceho-poskytovatela/g, '-prechod-poskytovatel');
    
    parts[parts.length - 1] = shortened;
    return parts.join('/');
  }
  
  return url;
};

/**
 * Generate htaccess redirects for Apache servers based on GSC fixes
 */
export const generateHtaccessRedirects = (): string => {
  let htaccess = `# PODA Blog URL Redirects - GSC Indexing Fixes - ${new Date().toISOString().split('T')[0]}\n`;
  
  // Add all blog post redirects
  blogPostRedirects.forEach(redirect => {
    htaccess += `Redirect ${redirect.status} ${redirect.from} ${redirect.to}\n`;
  });
  
  htaccess += '\n# Clean up duplicate content from query parameters\n';
  htaccess += 'RewriteEngine On\n';
  htaccess += 'RewriteRule ^blog\\?.*$ /blog [R=301,L]\n';
  htaccess += 'RewriteRule ^blog/\\?.*$ /blog [R=301,L]\n';
  htaccess += 'RewriteRule ^blog(.*)\\?source=.*$ /blog$1 [R=301,L]\n';
  htaccess += 'RewriteRule ^blog(.*)\\?post_id=.*$ /blog$1 [R=301,L]\n';
  htaccess += 'RewriteRule ^blog(.*)\\?category=.*$ /blog$1 [R=301,L]\n';
  
  return htaccess;
};

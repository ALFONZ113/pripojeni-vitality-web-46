/**
 * URL redirect and canonicalization manager
 * Handles the migration from numeric IDs to SEO-friendly URLs
 */

export interface RedirectRule {
  from: string;
  to: string;
  status: 301 | 302;
  reason: string;
}

// Blog post URL redirects (numeric ID to SEO slug)
export const blogPostRedirects: RedirectRule[] = [
  {
    from: '/blog/102',
    to: '/blog/internet-poda-ostrava-pripojeni',
    status: 301,
    reason: 'SEO-friendly URL migration'
  },
  {
    from: '/blog/101', 
    to: '/blog/rychly-internet-karvina',
    status: 301,
    reason: 'SEO-friendly URL migration'
  },
  {
    from: '/blog/100',
    to: '/blog/opticky-internet-ostrava',
    status: 301,
    reason: 'SEO-friendly URL migration'
  }
];

// Duplicate content canonicalization
export const canonicalRules = [
  {
    pattern: '/blog/?tag=*',
    canonical: '/blog/',
    action: 'noindex'
  },
  {
    pattern: '/blog/?category=*', 
    canonical: '/blog/',
    action: 'noindex'
  },
  {
    pattern: '/blog/?page=*',
    canonical: '/blog/',
    action: 'canonical'
  }
];

/**
 * Handle client-side blog redirects for indexing fixes
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
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .substring(0, 50) // Limit to 50 characters
    .replace(/-$/, ''); // Remove trailing hyphen
};

/**
 * Check if URL needs redirect and return target
 */
export const getRedirectTarget = (currentPath: string): string | null => {
  const redirect = blogPostRedirects.find(rule => rule.from === currentPath);
  return redirect?.to || null;
};

/**
 * Generate canonical URL for current page
 */
export const getCanonicalURL = (currentPath: string): string => {
  const baseUrl = 'https://www.popri.cz';
  
  // Handle blog tag/category pages
  if (currentPath.includes('/blog/?')) {
    return `${baseUrl}/blog/`;
  }
  
  // Handle redirected URLs
  const redirectTarget = getRedirectTarget(currentPath);
  if (redirectTarget) {
    return `${baseUrl}${redirectTarget}`;
  }
  
  return `${baseUrl}${currentPath}`;
};

/**
 * Generate robots meta content based on URL
 */
export const getRobotsContent = (currentPath: string): string => {
  // Noindex for parameterized blog pages
  if (currentPath.includes('/blog/?tag=') || currentPath.includes('/blog/?category=')) {
    return 'noindex, follow';
  }
  
  // Default indexing
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
    // Shorten the slug while keeping key terms
    const keyTerms = ['internet', 'poda', 'ostrava', 'karvina', 'pripojeni', 'opticky'];
    const words = lastPart.split('-');
    const importantWords = words.filter(word => 
      keyTerms.some(term => word.includes(term)) || words.indexOf(word) < 3
    );
    
    const newSlug = importantWords.slice(0, 5).join('-');
    parts[parts.length - 1] = newSlug;
    
    return parts.join('/');
  }
  
  return url;
};

/**
 * Generate htaccess redirects for Apache servers
 */
export const generateHtaccessRedirects = (): string => {
  const redirects = blogPostRedirects.map(rule => 
    `Redirect ${rule.status} ${rule.from} ${rule.to}`
  ).join('\n');
  
  return `
# PODA Blog URL Redirects - ${new Date().toISOString().split('T')[0]}
${redirects}

# Canonical rules for duplicate content
RewriteEngine On
RewriteRule ^blog/\\?tag=.* /blog/ [R=301,L]
RewriteRule ^blog/\\?category=.* /blog/ [R=301,L]
`;
};

/**
 * Universal Canonical URL Fixer
 * Ensures all pages have proper canonical tags and handles edge cases
 */

/**
 * Generate canonical URL with proper formatting
 * Removes query params, trailing slashes, and ensures www prefix
 */
export const generateCanonicalUrlStrict = (path: string): string => {
  // Remove query parameters
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Remove trailing slash (except for root)
  const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');
  
  // Always use www.popri.cz as base
  const baseUrl = 'https://www.popri.cz';
  
  // Ensure path starts with /
  const finalPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
  
  return `${baseUrl}${finalPath}`;
};

/**
 * Get current canonical URL from browser location
 */
export const getCurrentCanonicalUrl = (): string => {
  if (typeof window === 'undefined') return 'https://www.popri.cz/';
  
  const currentPath = window.location.pathname;
  return generateCanonicalUrlStrict(currentPath);
};

/**
 * Validate if URL needs canonical tag update
 */
export const needsCanonicalUpdate = (currentUrl: string, canonicalUrl: string): boolean => {
  const currentClean = currentUrl.split('?')[0].split('#')[0].replace(/\/$/, '');
  const canonicalClean = canonicalUrl.split('?')[0].split('#')[0].replace(/\/$/, '');
  
  return currentClean !== canonicalClean;
};

/**
 * Check if page should be indexed (exclude ID-based blog URLs)
 */
export const shouldIndexPage = (path: string): boolean => {
  // Noindex for ID-based blog URLs
  if (/^\/blog\/\d+$/.test(path)) {
    return false;
  }
  
  // Noindex for admin pages
  if (path.includes('/admin')) {
    return false;
  }
  
  // Index everything else
  return true;
};

/**
 * Get robots meta tag value based on path
 */
export const getRobotsTag = (path: string): string => {
  return shouldIndexPage(path) 
    ? 'index, follow, max-image-preview:large, max-snippet:-1'
    : 'noindex, follow';
};

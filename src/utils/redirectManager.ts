/**
 * Redirect manager for handling URL migrations and 301 redirects
 */

import { blogPosts } from '../data/blog';
import { generateRedirectMap } from './blogRouting';

/**
 * Handle client-side redirects for old blog URLs
 */
export const handleBlogRedirects = (): boolean => {
  const currentPath = window.location.pathname;
  const redirectMap = generateRedirectMap(blogPosts);
  
  // Check if current path needs redirection
  if (redirectMap[currentPath]) {
    const newUrl = redirectMap[currentPath];
    window.history.replaceState(null, '', newUrl);
    return true;
  }
  
  return false;
};

/**
 * Get all redirect mappings for server-side configuration
 */
export const getAllRedirects = (): Record<string, string> => {
  return generateRedirectMap(blogPosts);
};

/**
 * Generate .htaccess rules for 301 redirects
 */
export const generateHtaccessRules = (): string => {
  const redirects = getAllRedirects();
  let htaccessContent = '# Blog post redirects - Generated automatically\n';
  
  Object.entries(redirects).forEach(([oldPath, newPath]) => {
    htaccessContent += `Redirect 301 ${oldPath} ${newPath}\n`;
  });
  
  return htaccessContent;
};

/**
 * Check if a URL needs redirection
 */
export const needsRedirect = (path: string): string | null => {
  const redirectMap = generateRedirectMap(blogPosts);
  return redirectMap[path] || null;
};
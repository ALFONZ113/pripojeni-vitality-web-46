
/**
 * Blog-related utilities for sitemap generation
 */

import { blogPosts } from '../../data/blog';
import type { BlogPost } from '../../data/blog/types';
import { sanitizeForXml } from './xmlUtils';

/**
 * Validate blog post for sitemap inclusion
 */
export const isValidBlogPost = (post: BlogPost): boolean => {
  return Boolean(
    post.id &&
    post.title &&
    post.content &&
    typeof post.id === 'number' &&
    sanitizeForXml(post.title).trim().length > 0 &&
    sanitizeForXml(post.content).trim().length > 0
  );
};

/**
 * Get all valid blog posts for sitemap
 */
export const getValidBlogPosts = (): BlogPost[] => {
  return blogPosts.filter(isValidBlogPost);
};

/**
 * Extract keywords from blog post for meta optimization
 */
export const extractSEOKeywords = (post: BlogPost): string[] => {
  const geoKeywords = ['PODA', 'internet', 'optické pripojenie', 'Moravskoslezský kraj'];
  const techKeywords = ['GPON', 'FTTH', 'Wi-Fi', 'router', 'optika'];
  
  // Extract location-specific keywords
  const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Havířov', 'Poruba'];
  const foundLocations = locations.filter(loc => 
    post.title.includes(loc) || post.content.includes(loc)
  );
  
  return [
    ...geoKeywords,
    ...techKeywords,
    ...(post.tags || []),
    ...foundLocations,
    post.category
  ].filter(Boolean);
};

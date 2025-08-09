/**
 * Utility functions for blog post routing and URL generation
 */

import { BlogPost } from '../data/blog/types';
import { createSlug } from './slugGenerator';

/**
 * Generate URL for blog post - prefers slug over ID for new posts
 */
export const getBlogPostUrl = (post: BlogPost): string => {
  // Preferuj vždy SEO-friendly slug (vygenerujeme ak chýba)
  return `/blog/${ensureSlug(post)}`;
};

/**
 * Generate slug for blog post if it doesn't have one
 */
export const ensureSlug = (post: BlogPost): string => {
  if (post.slug) {
    return post.slug;
  }
  return createSlug(post.title);
};

/**
 * Find blog post by slug or ID
 */
export const findBlogPost = (posts: BlogPost[], slugOrId: string): BlogPost | undefined => {
  // Najprv skús nájsť podľa slug alebo vygenerovaného slugu z nadpisu
  const bySlug = posts.find(post => (post.slug || createSlug(post.title)) === slugOrId);
  if (bySlug) {
    return bySlug;
  }
  
  // Ak sa nenašiel podľa slugu, skús podľa ID
  const numericId = parseInt(slugOrId);
  if (!isNaN(numericId)) {
    return posts.find(post => post.id === numericId);
  }
  
  return undefined;
};

/**
 * Check if identifier is likely a slug (contains hyphens and no numbers at start)
 */
export const isSlugFormat = (identifier: string): boolean => {
  return identifier.includes('-') && !/^\d+$/.test(identifier);
};

/**
 * Generate 301 redirect mapping for old ID-based URLs to new slug-based URLs
 */
export const generateRedirectMap = (posts: BlogPost[]): Record<string, string> => {
  const redirects: Record<string, string> = {};
  
  posts.forEach(post => {
    const slug = post.slug || createSlug(post.title);
    redirects[`/blog/${post.id}`] = `/blog/${slug}`;
  });
  
  return redirects;
};
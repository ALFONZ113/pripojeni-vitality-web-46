
/**
 * Sitemap statistics utilities
 */

import { getValidBlogPosts } from './blogUtils';

/**
 * Get current sitemap stats for monitoring
 */
export const getSitemapStats = () => {
  const validBlogPosts = getValidBlogPosts();
  
  return {
    totalUrls: 10 + 5 + validBlogPosts.length, // static + geo + blog posts
    staticPages: 10,
    geoPages: 5,
    blogPosts: validBlogPosts.length,
    lastGenerated: new Date().toISOString()
  };
};

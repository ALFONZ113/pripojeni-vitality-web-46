
/**
 * Main sitemap generator - refactored into focused utilities
 */

import type { BlogPost } from '../data/blog/types';
import { escapeXml, sanitizeUrl, validateSitemapXML } from './sitemap/xmlUtils';
import { formatDateISO } from './sitemap/dateUtils';
import { getValidBlogPosts, extractSEOKeywords } from './sitemap/blogUtils';
import { generateLocalBusinessStructuredData } from './sitemap/structuredData';
import { getStaticPages, getGeoPages } from './sitemap/sitemapConfig';
import { getSitemapStats } from './sitemap/sitemapStats';

/**
 * Generate clean XML sitemap content with automatic blog post detection
 */
export const generateSitemap = (baseUrl: string = 'https://www.popri.cz'): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = getStaticPages();
  const geoPages = getGeoPages();

  // Start with clean XML declaration
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static pages
  staticPages.forEach(page => {
    const fullUrl = page.url === '' ? baseUrl : `${baseUrl}${page.url}`;
    const sanitizedUrl = sanitizeUrl(fullUrl);
    
    if (sanitizedUrl) {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${escapeXml(sanitizedUrl)}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += `  </url>\n`;
    }
  });

  // Add geo-specific pages
  geoPages.forEach(page => {
    const sanitizedUrl = sanitizeUrl(`${baseUrl}${page.url}`);
    
    if (sanitizedUrl) {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${escapeXml(sanitizedUrl)}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += `  </url>\n`;
    }
  });

  // Add blog posts - AUTOMATIC DETECTION of all valid posts
  const validBlogPosts = getValidBlogPosts();

  validBlogPosts.forEach((post: BlogPost) => {
    try {
      const postUrl = `${baseUrl}/blog/${post.id}`;
      const sanitizedUrl = sanitizeUrl(postUrl);
      const postDate = post.date ? formatDateISO(post.date) : currentDate;
      
      if (sanitizedUrl) {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${escapeXml(sanitizedUrl)}</loc>\n`;
        sitemap += `    <lastmod>${postDate}</lastmod>\n`;
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.6</priority>\n`;
        sitemap += `  </url>\n`;
      }
    } catch (error) {
      console.warn(`Skipping blog post ${post.id} due to error:`, error);
    }
  });

  sitemap += `</urlset>`;

  return sitemap;
};

// Re-export utilities for backward compatibility
export { validateSitemapXML } from './sitemap/xmlUtils';
export { extractSEOKeywords } from './sitemap/blogUtils';
export { generateLocalBusinessStructuredData } from './sitemap/structuredData';
export { getSitemapStats } from './sitemap/sitemapStats';

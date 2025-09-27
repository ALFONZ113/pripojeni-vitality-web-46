/**
 * SEO routing utilities for clean URLs and proper indexing
 */

import { BlogPost } from '../data/blog/types';
import { createSlug } from './slugGenerator';
import { blogPosts } from '../data/blog';

/**
 * Generate proper blog post URL using slug
 */
export const generateBlogPostUrl = (post: BlogPost): string => {
  const slug = post.slug || createSlug(post.title);
  return `/blog/${slug}`;
};

/**
 * Find blog post by slug or ID (for backward compatibility)
 */
export const findBlogPostBySlugOrId = (identifier: string): BlogPost | undefined => {
  // First try to find by slug
  const bySlug = blogPosts.find(post => {
    const slug = post.slug || createSlug(post.title);
    return slug === identifier;
  });
  
  if (bySlug) {
    return bySlug;
  }
  
  // Fallback: try to find by numeric ID
  const numericId = parseInt(identifier);
  if (!isNaN(numericId)) {
    return blogPosts.find(post => post.id === numericId);
  }
  
  return undefined;
};

/**
 * Generate canonical URL for blog post
 */
export const generateCanonicalUrl = (post: BlogPost, baseUrl: string = 'https://www.popri.cz'): string => {
  const slug = post.slug || createSlug(post.title);
  return `${baseUrl}/blog/${slug}`;
};

/**
 * Check if URL should be noindexed
 */
export const shouldNoIndex = (path: string): boolean => {
  // Noindex old ID-based URLs
  if (path.match(/^\/blog\/\d+$/)) {
    return true;
  }
  
  // Noindex URLs with query parameters
  if (path.includes('?')) {
    return true;
  }
  
  return false;
};

/**
 * Generate robots meta tag content
 */
export const generateRobotsMeta = (path: string): string => {
  return shouldNoIndex(path) ? 'noindex, follow' : 'index, follow';
};

/**
 * Clean URL from query parameters for canonical version
 */
export const cleanUrl = (url: string): string => {
  return url.split('?')[0];
};

/**
 * Generate structured data for blog post
 */
export const generateBlogPostStructuredData = (post: BlogPost, baseUrl: string = 'https://www.popri.cz') => {
  const canonicalUrl = generateCanonicalUrl(post, baseUrl);
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? `${baseUrl}${post.image}` : undefined,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "PODA",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/poda-logo.svg`
      }
    },
    "url": canonicalUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };
};
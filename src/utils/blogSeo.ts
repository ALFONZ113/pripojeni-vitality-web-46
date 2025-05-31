
import type { BlogPost } from '../data/blog/types';
import { createSlug, calculateReadingTime, countWords, extractExcerpt } from './slugGenerator';

/**
 * Enhanced SEO utilities for blog posts
 */

/**
 * Generate SEO-optimized URL for blog post
 */
export const generateBlogUrl = (post: BlogPost): string => {
  const slug = createSlug(post.title);
  return `/blog/${slug}-${post.id}`;
};

/**
 * Parse blog URL to extract post ID
 */
export const parseBlogUrl = (url: string): number | null => {
  const match = url.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Generate comprehensive meta tags for blog post
 */
export const generateBlogPostMeta = (post: BlogPost, baseUrl: string) => {
  const canonicalUrl = `${baseUrl}${generateBlogUrl(post)}`;
  const excerpt = post.excerpt || extractExcerpt(post.content);
  const readingTime = calculateReadingTime(post.content);
  const wordCount = countWords(post.content);
  
  // Handle image URL - use imageUrl or image, with fallback
  const imageUrl = post.imageUrl || post.image || '/og-image.png';
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
  
  // Generate geo-specific keywords
  const geoKeywords = [
    'PODA internet',
    'optické pripojení',
    'rýchly internet',
    'Ostrava',
    'Karviná',
    'Bohumín',
    'Frýdek-Místek'
  ];
  
  const allKeywords = [
    ...(post.tags || []),
    post.category,
    ...geoKeywords
  ].join(', ');

  return {
    title: `${post.title} | Blog PODA | Popri.cz`,
    description: excerpt,
    keywords: allKeywords,
    canonicalUrl,
    ogImage: fullImageUrl,
    readingTime,
    wordCount,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": excerpt,
      "image": fullImageUrl,
      "datePublished": formatDateForSchema(post.date),
      "dateModified": formatDateForSchema(post.date),
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": `${baseUrl}/kontakt`
      },
      "publisher": {
        "@type": "Organization",
        "name": "PODA",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/poda-logo.svg`
        },
        "url": baseUrl,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+420730431313",
          "contactType": "customer service",
          "areaServed": "CZ"
        }
      },
      "mainEntityOfPage": canonicalUrl,
      "wordCount": wordCount,
      "timeRequired": `PT${readingTime}M`,
      "keywords": post.tags?.join(', ') || post.category,
      "about": {
        "@type": "Thing",
        "name": "Internet služby PODA"
      },
      "mentions": [
        {
          "@type": "Organization",
          "name": "PODA",
          "url": baseUrl
        }
      ]
    }
  };
};

/**
 * Format date for schema.org
 */
const formatDateForSchema = (dateStr: string): string => {
  return dateStr.split('. ').reverse().join('-');
};

/**
 * Generate geo-specific meta tags
 */
export const generateGeoMeta = (location?: string) => {
  const baseMeta = {
    'geo.region': 'CZ',
    'geo.placename': 'Česká republika',
    'ICBM': '49.8175, 18.2624' // Ostrava coordinates
  };
  
  if (location) {
    return {
      ...baseMeta,
      'geo.placename': `${location}, Česká republika`,
      'dc.title': `Internet PODA ${location}`
    };
  }
  
  return baseMeta;
};

/**
 * Generate local business structured data
 */
export const generateLocalBusinessData = (baseUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PODA",
    "description": "Poskytovateľ internetových a TV služieb",
    "url": baseUrl,
    "telephone": "+420730431313",
    "email": "terc@obchod.poda.cz",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CZ",
      "addressRegion": "Moravskoslezský kraj"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.8175",
      "longitude": "18.2624"
    },
    "areaServed": [
      "Ostrava", "Karviná", "Bohumín", "Frýdek-Místek", 
      "Havířov", "Orlová", "Poruba"
    ],
    "serviceType": [
      "Internet",
      "Optické pripojenie",
      "TV služby",
      "Telekomunikácie"
    ]
  };
};

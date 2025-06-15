import type { BlogPost } from '../data/blog/types';
import { createSlug, calculateReadingTime, countWords, extractExcerpt } from './slugGenerator';

/**
 * Enhanced SEO utilities for blog posts
 */

/**
 * Generate SEO-optimized URL for blog post - USE ID-BASED URLS FOR CANONICAL
 */
export const generateBlogUrl = (post: BlogPost): string => {
  // const slug = createSlug(post.title);
  // return `/blog/${slug}-${post.id}`;
  return `/blog/${post.id}`; // Use ID-based URL for canonical consistency
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
    ogImage: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
    readingTime,
    wordCount,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": excerpt,
      "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
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

/**
 * Generate FAQPage structured data from post content
 */
export const generateFaqSchema = (postContent: string) => {
  const qaPairs: { question: string, answer: string }[] = [];
  
  // Find questions (h3) and their subsequent content
  const sections = postContent.split(/<h3[^>]*>/).slice(1);
  for (const section of sections) {
    const parts = section.split(/<\/h3>/);
    if (parts.length < 2) continue;

    const question = parts[0].replace(/<[^>]+>/g, '').trim();
    
    // The answer is the content after </h3> until the next <h3>
    const answerHtml = parts[1];
    const answerText = answerHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    if (question && answerText) {
      qaPairs.push({ question, answer: answerText });
    }
  }

  if (qaPairs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qaPairs.map(qa => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  };
};

/**
 * Generate Review and AggregateRating structured data from review post content
 */
export const generateReviewSchema = (postContent: string, itemReviewed: object) => {
  const reviews = [];
  const reviewRegex = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>[\s\S]*?<footer[^>]*>[\s\S]*?<strong>([\s\S]*?)<\/strong>[\s\S]*?<\/footer>/g;
  let match;
  while ((match = reviewRegex.exec(postContent)) !== null) {
    const reviewBody = match[1].replace(/<[^>]+>/g, ' ').trim();
    const footerContent = match[2];
    
    const starMatch = footerContent.match(/⭐/g);
    const ratingValue = starMatch ? starMatch.length : 5;
    
    const authorName = footerContent.replace(/⭐/g, '').split(',')[0].trim();

    reviews.push({
      "@type": "Review",
      "author": { "@type": "Person", "name": authorName },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": ratingValue,
        "bestRating": "5"
      },
      "reviewBody": reviewBody,
      "itemReviewed": itemReviewed,
    });
  }

  const aggregateRatingMatch = postContent.match(/<div class="text-3xl font-bold text-green-600">(\d\.\d)\/5<\/div>/);
  const aggregateRatingValue = aggregateRatingMatch ? aggregateRatingMatch[1] : null;

  const aggregateRating = aggregateRatingValue ? {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": itemReviewed,
    "ratingValue": aggregateRatingValue,
    "bestRating": "5",
    "reviewCount": reviews.length || 1, // Use count of parsed reviews, fallback to 1
  } : null;

  return { reviews, aggregateRating };
};

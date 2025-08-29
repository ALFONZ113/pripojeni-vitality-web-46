/**
 * Advanced SEO enhancements for better search engine visibility
 */

import { BlogPost } from '../data/blog/types';
import { submitBlogPostToIndexNow } from './indexNowService';

export interface SEOMetrics {
  titleLength: number;
  descriptionLength: number;
  keywordDensity: number;
  readingTime: number;
  internalLinks: number;
  externalLinks: number;
  imageCount: number;
  headingStructure: { [key: string]: number };
}

/**
 * Enhanced meta description generator with keyword optimization
 */
export const generateEnhancedMetaDescription = (post: BlogPost): string => {
  const { title, content, category } = post;
  
  // Extract key phrases and location info
  const locationMatch = content.match(/(Ostrava|Karviná|Bohumín|Havířov|Poruba)/i);
  const location = locationMatch ? locationMatch[0] : '';
  
  // Key services and benefits
  const services = ['PODA internet', 'gigabitové připojení', 'TV zdarma', 'optické připojení'];
  const foundServices = services.filter(service => 
    title.toLowerCase().includes(service.toLowerCase()) || 
    content.toLowerCase().includes(service.toLowerCase())
  );

  let description = '';
  
  if (location && foundServices.length > 0) {
    description = `${foundServices[0]} v ${location}. ${title.substring(0, 80)}. Kontaktujte PODA na 730 431 313.`;
  } else {
    // Extract first meaningful sentence
    const sentences = content.replace(/<[^>]*>/g, ' ').split('.').filter(s => s.trim().length > 20);
    description = sentences[0]?.trim() || title;
    
    if (!description.includes('PODA')) {
      description += ' - PODA Internet služby';
    }
  }
  
  // Ensure optimal length (150-160 chars)
  if (description.length > 155) {
    description = description.substring(0, 152) + '...';
  }
  
  return description;
};

/**
 * Generate comprehensive structured data for blog posts
 */
export const generateEnhancedBlogStructuredData = (post: BlogPost, baseUrl: string) => {
  const publishDate = formatBlogDateToISO(post.date);
  const modifiedDate = new Date().toISOString();
  const wordCount = countWords(post.content);
  const readingTime = calculateReadingTime(wordCount);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": generateEnhancedMetaDescription(post),
    "image": {
      "@type": "ImageObject",
      "url": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
      "width": "1200",
      "height": "630"
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": post.author || "PODA Team",
      "url": `${baseUrl}/kontakt`
    },
    "publisher": {
      "@type": "Organization", 
      "name": "PODA Internet",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/poda-logo.svg`,
        "width": "300",
        "height": "60"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug || post.id}`
    },
    "articleSection": post.category,
    "keywords": generateSEOKeywords(post).join(', '),
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "inLanguage": "cs-CZ",
    "isPartOf": {
      "@type": "Blog",
      "@id": `${baseUrl}/blog`
    }
  };
};

/**
 * Generate FAQ structured data from post content
 */
export const generateFAQStructuredData = (content: string) => {
  const faqPattern = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gi;
  const faqs = [];
  let match;

  while ((match = faqPattern.exec(content)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, '').trim();
    const answer = match[2].replace(/<[^>]*>/g, '').trim();
    
    if (question.includes('?') || question.toLowerCase().includes('jak') || 
        question.toLowerCase().includes('co') || question.toLowerCase().includes('kdy')) {
      faqs.push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": answer
        }
      });
    }
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };
};

/**
 * Analyze SEO metrics for a blog post
 */
export const analyzeSEOMetrics = (post: BlogPost): SEOMetrics => {
  const content = post.content.replace(/<[^>]*>/g, ' ');
  const words = content.toLowerCase().split(/\s+/);
  const wordCount = words.length;

  // Analyze heading structure
  const headingMatches = post.content.match(/<h[1-6][^>]*>/gi) || [];
  const headingStructure: { [key: string]: number } = {};
  
  headingMatches.forEach(heading => {
    const levelMatch = heading.match(/h([1-6])/i);
    const level = levelMatch ? levelMatch[1] : '1';
    const key = `h${level}`;
    headingStructure[key] = (headingStructure[key] || 0) + 1;
  });

  // Count links
  const internalLinks = (post.content.match(/href="\/[^"]*"/gi) || []).length;
  const externalLinks = (post.content.match(/href="https?:\/\/[^"]*"/gi) || []).length;
  
  // Count images
  const imageCount = (post.content.match(/<img[^>]*>/gi) || []).length;

  // Keyword density (for "PODA" as example)
  const keywordCount = words.filter(word => word.includes('poda')).length;
  const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

  return {
    titleLength: post.title.length,
    descriptionLength: post.excerpt?.length || 0,
    keywordDensity: Math.round(keywordDensity * 100) / 100,
    readingTime: calculateReadingTime(wordCount),
    internalLinks,
    externalLinks,
    imageCount,
    headingStructure
  };
};

/**
 * Auto-submit new blog posts to search engines
 */
export const autoSubmitBlogPost = async (post: BlogPost): Promise<void> => {
  const slug = post.slug || post.id.toString();
  
  try {
    // Submit to IndexNow for immediate indexing
    await submitBlogPostToIndexNow(slug);
    
    // Log successful submission
    console.log(`📤 Auto-submitted blog post to search engines: ${slug}`);
  } catch (error) {
    console.error('Failed to auto-submit blog post:', error);
  }
};

// Helper functions
const formatBlogDateToISO = (dateStr: string): string => {
  if (!dateStr) return new Date().toISOString();
  
  if (dateStr.includes('. ')) {
    const parts = dateStr.split('. ');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0'); 
      const year = parts[2];
      return `${year}-${month}-${day}T12:00:00+01:00`;
    }
  }
  
  return new Date().toISOString();
};

const countWords = (content: string): number => {
  return content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(word => word.length > 0).length;
};

const calculateReadingTime = (wordCount: number): number => {
  return Math.ceil(wordCount / 200); // 200 words per minute
};

const generateSEOKeywords = (post: BlogPost): string[] => {
  const baseKeywords = ['PODA', 'internet', 'připojení'];
  const locationKeywords = ['Ostrava', 'Karviná', 'Bohumín', 'Havířov', 'Poruba'];
  const serviceKeywords = ['optické', 'gigabit', 'TV', 'IPTV', 'Wi-Fi'];
  
  const foundLocations = locationKeywords.filter(loc =>
    post.title.includes(loc) || post.content.includes(loc)
  );
  
  return [
    ...baseKeywords,
    ...foundLocations,
    ...(post.tags || []),
    ...serviceKeywords.slice(0, 2),
    post.category
  ].filter(Boolean);
};
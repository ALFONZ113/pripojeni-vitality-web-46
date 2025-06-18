
/**
 * Indexing optimization utilities
 */

export interface IndexingStatus {
  url: string;
  lastRequested?: string;
  status: 'not-indexed' | 'indexed' | 'requested' | 'error';
  lastModified: string;
}

/**
 * Generate meta description optimized for indexing
 */
export const generateOptimizedMetaDescription = (content: string, maxLength: number = 155): string => {
  // Remove HTML tags
  const cleanContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract first meaningful paragraph
  const sentences = cleanContent.split('.').filter(s => s.trim().length > 20);
  let description = sentences[0]?.trim() || cleanContent.substring(0, maxLength);
  
  // Ensure it ends properly
  if (description.length >= maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  } else if (!description.endsWith('.')) {
    description += '.';
  }
  
  return description;
};

/**
 * Generate structured data for better indexing
 */
export const generateBlogPostStructuredData = (post: any, baseUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": generateOptimizedMetaDescription(post.content),
    "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
    "datePublished": formatDateForSchema(post.date),
    "dateModified": new Date().toISOString(),
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
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.id}`
    },
    "keywords": post.tags?.join(', ') || post.category,
    "wordCount": countWords(post.content),
    "timeRequired": `PT${calculateReadingTime(post.content)}M`
  };
};

/**
 * Format date for schema.org
 */
const formatDateForSchema = (dateStr: string): string => {
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

/**
 * Count words in content
 */
const countWords = (content: string): number => {
  return content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Calculate reading time
 */
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = countWords(content);
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Generate internal linking suggestions
 */
export const generateInternalLinks = (currentPost: any, allPosts: any[]): any[] => {
  return allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      let score = 0;
      
      // Same category
      if (post.category === currentPost.category) score += 3;
      
      // Shared tags
      const sharedTags = currentPost.tags?.filter((tag: string) => 
        post.tags?.includes(tag)
      ) || [];
      score += sharedTags.length * 2;
      
      // Content similarity (simple keyword matching)
      const currentKeywords = extractKeywords(currentPost.content);
      const postKeywords = extractKeywords(post.content);
      const sharedKeywords = currentKeywords.filter(keyword => 
        postKeywords.includes(keyword)
      );
      score += sharedKeywords.length;
      
      return { ...post, relevanceScore: score };
    })
    .filter(post => post.relevanceScore > 1)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
};

/**
 * Extract keywords from content
 */
const extractKeywords = (content: string): string[] => {
  const cleanContent = content.replace(/<[^>]+>/g, ' ').toLowerCase();
  const commonWords = ['a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'will', 'with'];
  
  return cleanContent
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 20);
};

/**
 * Generate XML sitemap entry for blog post
 */
export const generateSitemapEntry = (post: any, baseUrl: string): string => {
  const lastmod = formatDateForSchema(post.date).split('T')[0];
  const url = `${baseUrl}/blog/${post.id}`;
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
};

/**
 * Check if URL needs indexing request
 */
export const needsIndexingRequest = (post: any): boolean => {
  const postDate = new Date(formatDateForSchema(post.date));
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  // Request indexing for posts newer than a week
  return postDate > weekAgo;
};


/**
 * Utilities for handling blog post metadata for SEO and structured data
 */

/**
 * Format date from "DD. MM. YYYY" format to "YYYY-MM-DD" for schema.org and datetime attributes
 */
export const formatDateForSchema = (dateStr: string): string => {
  return dateStr.split('. ').reverse().join('-');
};

/**
 * Create tracking parameters for blog navigation
 */
export const getPageTrackingParams = (postId: number, category: string): string => {
  return `?source=blog&post_id=${postId}&category=${encodeURIComponent(category)}`;
};

/**
 * Generate schema.org structured data for a blog post
 */
export const createBlogPostStructuredData = (
  post: {
    id: number;
    title: string;
    excerpt?: string;
    image: string;
    author: string;
    date: string;
    category: string;
    tags?: string[];
  },
  baseUrl: string,
  canonicalUrl: string
) => {
  const postDate = formatDateForSchema(post.date);
  const postImage = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": postImage,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/poda-logo.svg`,
        "width": "200",
        "height": "70"
      },
      "url": baseUrl,
      "sameAs": [
        "https://www.facebook.com/podacz/",
        "https://www.instagram.com/poda.cz/",
        "https://www.linkedin.com/company/poda-a-s-/"
      ]
    },
    "datePublished": postDate,
    "dateModified": postDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": post.tags && post.tags.length > 0 ? post.tags.join(', ') : post.category,
    "articleSection": post.category,
    "inLanguage": "cs-CZ",
    "copyrightYear": new Date(postDate).getFullYear(),
    "isAccessibleForFree": "True"
  };
};

/**
 * Generate meta keywords for SEO
 */
export const generateMetaKeywords = (
  category: string, 
  tags?: string[]
): string => {
  const baseKeywords = `${category}, PODA Internet, PODA připojení, Popri.cz`;
  
  if (tags && tags.length > 0) {
    return `${tags.join(', ')}, ${baseKeywords}`;
  }
  
  return baseKeywords;
};

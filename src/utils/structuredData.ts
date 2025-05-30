
/**
 * Utility functions for creating Schema.org structured data for better Google snippets
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

/**
 * Create FAQ Schema markup for rich snippets
 */
export const createFAQSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Create HowTo Schema markup for step-by-step guides
 */
export const createHowToSchema = (
  title: string,
  description: string,
  steps: HowToStep[],
  totalTime?: string,
  estimatedCost?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": description,
    "totalTime": totalTime,
    "estimatedCost": estimatedCost,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image ? {
        "@type": "ImageObject",
        "url": step.image
      } : undefined
    }))
  };
};

/**
 * Create enhanced Article Schema with more details for better snippets
 */
export const createEnhancedArticleSchema = (
  post: {
    id: number;
    title: string;
    excerpt?: string;
    content: string;
    image: string;
    alt?: string;
    author: string;
    date: string;
    category: string;
    tags?: string[];
  },
  baseUrl: string,
  canonicalUrl: string,
  faqs?: FAQItem[],
  estimatedReadTime?: string
) => {
  const postDate = post.date.split('. ').reverse().join('-');
  const postImage = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "image": {
      "@type": "ImageObject",
      "url": postImage,
      "width": "1200",
      "height": "630"
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${baseUrl}/autor/${post.author.toLowerCase().replace(/\s+/g, '-')}`
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
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+420-739-065-142",
        "contactType": "customer service"
      }
    },
    "datePublished": postDate,
    "dateModified": postDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": post.tags && post.tags.length > 0 ? post.tags.join(', ') : post.category,
    "articleSection": post.category,
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    "timeRequired": estimatedReadTime || "PT5M",
    "inLanguage": "cs-CZ",
    "about": {
      "@type": "Thing",
      "name": "PODA Internet",
      "description": "Vysokorychlostní internetové připojení"
    }
  };

  // Add FAQ if provided
  if (faqs && faqs.length > 0) {
    (schema as any).mainEntity = faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }));
  }

  return schema;
};

/**
 * Create BreadcrumbList Schema for better navigation snippets
 */
export const createBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

/**
 * Create Service Schema for PODA internet services
 */
export const createServiceSchema = (baseUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "PODA Internet",
    "description": "Vysokorychlostní optické internetové připojení s TV balíčky",
    "provider": {
      "@type": "Organization",
      "name": "PODA",
      "url": baseUrl
    },
    "serviceType": "Internet Service Provider",
    "areaServed": {
      "@type": "Country",
      "name": "Česká republika"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Internet a TV balíčky",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "PODA Internet 1000/1000 Mbps",
            "description": "Gigabitové optické připojení"
          }
        }
      ]
    }
  };
};

/**
 * Extract FAQ items from blog content
 */
export const extractFAQsFromContent = (content: string): FAQItem[] => {
  const faqs: FAQItem[] = [];
  
  // Look for common FAQ patterns in content
  const questionPatterns = [
    /(?:^|\n)(?:###?\s*)?(.+\?)\s*\n(.+?)(?=\n(?:###?|\n|$))/gm,
    /<h[23][^>]*>([^<]+\?)<\/h[23]>\s*<p>([^<]+)<\/p>/gm
  ];
  
  questionPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const question = match[1].trim();
      const answer = match[2].trim().replace(/<[^>]*>/g, '');
      
      if (question.length > 10 && answer.length > 20) {
        faqs.push({ question, answer });
      }
    }
  });
  
  return faqs.slice(0, 5); // Limit to 5 FAQs for better performance
};

/**
 * Calculate estimated reading time
 */
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `PT${minutes}M`;
};

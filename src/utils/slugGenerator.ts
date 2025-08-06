
/**
 * Utility functions for generating SEO-friendly URLs and slugs
 */

/**
 * Convert text to SEO-friendly slug
 */
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Replace Czech/Slovak characters
    .replace(/[áä]/g, 'a')
    .replace(/[éě]/g, 'e')
    .replace(/[íì]/g, 'i')
    .replace(/[óô]/g, 'o')
    .replace(/[úů]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/č/g, 'c')
    .replace(/ď/g, 'd')
    .replace(/ň/g, 'n')
    .replace(/ř/g, 'r')
    .replace(/š/g, 's')
    .replace(/ť/g, 't')
    .replace(/ž/g, 'z')
    .replace(/ľ/g, 'l')
    // Remove special characters and replace spaces with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Calculate reading time in minutes
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Count words in content
 */
export const countWords = (content: string): number => {
  return content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Extract excerpt from content if not provided
 */
export const extractExcerpt = (content: string, maxLength: number = 160): string => {
  const textContent = content.replace(/<[^>]*>/g, '');
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength).trim() + '...'
    : textContent;
};

/**
 * Generate breadcrumb items for blog posts
 */
export const generateBreadcrumbs = (post?: { title: string; category: string }) => {
  const breadcrumbs = [
    { name: 'Úvod', href: '/' },
    { name: 'Blog', href: '/blog' }
  ];
  
  if (post) {
    breadcrumbs.push({
      name: post.category,
      href: `/blog?category=${encodeURIComponent(post.category)}`
    });
    breadcrumbs.push({
      name: post.title,
      href: '#'
    });
  }
  
  return breadcrumbs;
};

/**
 * Create geo-optimized content snippets
 */
export const createGeoContent = (location?: string) => {
  const baseTexts = [
    'Kontaktujte nás pre viac informácií o pripojení',
    'Zavolajte nám na 730 431 313',
    'Vyplňte kontaktní formulář',
    'Overíme dostupnosť na vašej adrese'
  ];
  
  if (location) {
    return [
      `Služby PODA v ${location} - kontaktujte nás`,
      `Pripojenie PODA ${location} - zavolajte 730 431 313`,
      `Internet ${location} - vyplňte kontaktní formulář`,
      `Dostupnosť v ${location} - overíme na vašej adrese`
    ];
  }
  
  return baseTexts;
};

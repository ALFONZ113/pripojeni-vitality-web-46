
import { blogPosts } from '../data/blog';
import type { BlogPost } from '../data/blog/types';
import { getBlogPostUrl } from './blogRouting';

/**
 * Escape XML special characters properly
 */
const escapeXml = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Remove invalid XML characters and clean content
 */
const sanitizeForXml = (text: string): string => {
  if (!text) return '';
  // Remove control characters except tab, newline, and carriage return
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * Sanitize and validate URL
 */
const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  try {
    // Remove invalid characters and ensure proper encoding
    const cleanUrl = url.replace(/[^\w\-._~:/?#[\]@!$&'()*+,;=%]/g, '');
    return encodeURI(cleanUrl);
  } catch (error) {
    console.warn('URL sanitization failed:', error);
    return '';
  }
};

/**
 * Validate blog post for sitemap inclusion
 */
const isValidBlogPost = (post: BlogPost): boolean => {
  return Boolean(
    post.id &&
    post.title &&
    post.content &&
    typeof post.id === 'number' &&
    sanitizeForXml(post.title).trim().length > 0 &&
    sanitizeForXml(post.content).trim().length > 0
  );
};

/**
 * Format date to ISO 8601 format (YYYY-MM-DD)
 */
const formatDateISO = (dateStr: string): string => {
  try {
    if (!dateStr) {
      return new Date().toISOString().split('T')[0];
    }
    
    // Handle Czech date format (dd. mm. yyyy)
    if (dateStr.includes('. ')) {
      const parts = dateStr.split('. ');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
    }
    
    // Fallback to current date if parsing fails
    return new Date().toISOString().split('T')[0];
  } catch (error) {
    console.warn('Date parsing error:', error);
    return new Date().toISOString().split('T')[0];
  }
};

/**
 * Generate clean XML sitemap content with automatic blog post detection
 */
export const generateSitemap = (baseUrl: string = 'https://www.popri.cz'): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages with optimized priorities and change frequencies for GSC
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' }, // Homepage - highest priority
    { url: '/tarify', priority: '0.9', changefreq: 'weekly' }, // Commercial pages
    { url: '/internet-tv', priority: '0.9', changefreq: 'weekly' },
    { url: '/iptv', priority: '0.8', changefreq: 'weekly' },
    { url: '/kontakt', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' }, // Updated frequently
    { url: '/programy', priority: '0.6', changefreq: 'monthly' },
    { url: '/ochrana-soukromi', priority: '0.3', changefreq: 'yearly' },
    { url: '/obchodni-podminky', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
  ];

  // Geo-specific pages - High priority for local SEO
  const geoPages = [
    { url: '/internet-ostrava', priority: '0.9', changefreq: 'weekly' }, // Main city
    { url: '/internet-karvina', priority: '0.9', changefreq: 'weekly' },
    { url: '/internet-poruba', priority: '0.9', changefreq: 'weekly' },
    { url: '/internet-havirov', priority: '0.9', changefreq: 'weekly' },
    { url: '/internet-bohumin', priority: '0.9', changefreq: 'weekly' },
  ];

  // Start with enhanced XML declaration with image and hreflang support
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

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
      sitemap += `    <xhtml:link rel="alternate" hreflang="cs" href="${escapeXml(sanitizedUrl)}" />\n`;
      
      // Add images for homepage
      if (page.url === '') {
        sitemap += `    <image:image>\n`;
        sitemap += `      <image:loc>https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png</image:loc>\n`;
        sitemap += `      <image:caption>PODA Internet rychlé připojení</image:caption>\n`;
        sitemap += `      <image:title>PODA Gigabitové připojení</image:title>\n`;
        sitemap += `    </image:image>\n`;
      }
      
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
  const validBlogPosts = blogPosts.filter(isValidBlogPost);

  validBlogPosts.forEach((post: BlogPost) => {
    try {
      const postUrl = `${baseUrl}${getBlogPostUrl(post)}`;
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

/**
 * Validate sitemap XML format strictly
 */
export const validateSitemapXML = (sitemapContent: string): boolean => {
  try {
    // Check for basic XML structure
    if (!sitemapContent.includes('<?xml') || !sitemapContent.includes('<urlset')) {
      console.error('Missing XML declaration or urlset');
      return false;
    }

    // Check for HTML contamination
    const htmlTags = ['<html', '<head', '<body', '<meta', '<script', '<style', '<div', '<span'];
    for (const tag of htmlTags) {
      if (sitemapContent.toLowerCase().includes(tag)) {
        console.error(`HTML contamination detected: ${tag}`);
        return false;
      }
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapContent, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    
    if (parseError) {
      console.error('Sitemap XML validation error:', parseError.textContent);
      return false;
    }
    
    const urlElements = xmlDoc.querySelectorAll('url');
    const locElements = xmlDoc.querySelectorAll('loc');
    
    if (urlElements.length === 0 || locElements.length === 0) {
      console.error('Sitemap has no valid URLs');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Sitemap validation failed:', error);
    return false;
  }
};

/**
 * Generate structured data for local business
 */
export const generateLocalBusinessStructuredData = (location: string, baseUrl: string) => {
  const cityCoordinates = {
    'Ostrava': { lat: '49.8175', lng: '18.2624' },
    'Karviná': { lat: '49.8557', lng: '18.5370' },
    'Bohumín': { lat: '49.9043', lng: '18.3570' },
    'Havířov': { lat: '49.7794', lng: '18.4437' },
    'Poruba': { lat: '49.8297', lng: '18.1667' }
  };

  const coords = cityCoordinates[location as keyof typeof cityCoordinates] || cityCoordinates['Ostrava'];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PODA ${location}`,
    "description": `Poskytovateľ internetových a TV služieb v ${location}`,
    "url": `${baseUrl}/internet-${location.toLowerCase()}`,
    "telephone": "+420730431313",
    "email": "terc@obchod.poda.cz",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressCountry": "CZ",
      "addressRegion": "Moravskoslezský kraj"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.lng
    },
    "areaServed": {
      "@type": "City",
      "name": location
    },
    "serviceType": [
      "Internet",
      "Optické pripojenie", 
      "TV služby",
      "IPTV",
      "Telekomunikácie"
    ],
    "priceRange": "250-899 CZK",
    "currenciesAccepted": "CZK",
    "paymentAccepted": "Cash, Card, Bank Transfer"
  };
};

/**
 * Extract keywords from blog post for meta optimization
 */
export const extractSEOKeywords = (post: BlogPost): string[] => {
  const geoKeywords = ['PODA', 'internet', 'optické pripojenie', 'Moravskoslezský kraj'];
  const techKeywords = ['GPON', 'FTTH', 'Wi-Fi', 'router', 'optika'];
  
  // Extract location-specific keywords
  const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Havířov', 'Poruba'];
  const foundLocations = locations.filter(loc => 
    post.title.includes(loc) || post.content.includes(loc)
  );
  
  return [
    ...geoKeywords,
    ...techKeywords,
    ...(post.tags || []),
    ...foundLocations,
    post.category
  ].filter(Boolean);
};

/**
 * Get current sitemap stats for monitoring
 */
export const getSitemapStats = () => {
  const validBlogPosts = blogPosts.filter(post => 
    post.id && post.title && post.content && post.image
  );
  
  return {
    totalUrls: 10 + 5 + validBlogPosts.length, // static + geo + blog posts
    staticPages: 10,
    geoPages: 5,
    blogPosts: validBlogPosts.length,
    lastGenerated: new Date().toISOString()
  };
};

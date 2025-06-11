
import { blogPosts } from '../data/blog';
import type { BlogPost } from '../data/blog/types';

/**
 * Generate dynamic sitemap content based on current blog posts and pages
 */
export const generateSitemap = (baseUrl: string = 'https://www.popri.cz'): string => {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' }, // Homepage
    { url: '/internet-tv', priority: '0.9', changefreq: 'weekly' },
    { url: '/iptv', priority: '0.8', changefreq: 'weekly' },
    { url: '/tarify', priority: '0.8', changefreq: 'weekly' },
    { url: '/programy', priority: '0.7', changefreq: 'monthly' },
    { url: '/kontakt', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog', priority: '0.7', changefreq: 'weekly' },
    { url: '/ochrana-soukromi', priority: '0.3', changefreq: 'yearly' },
    { url: '/obchodni-podminky', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
  ];

  // Geo-specific pages
  const geoPages = [
    { url: '/internet-ostrava', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-karvina', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-bohumin', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-havirov', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-poruba', priority: '0.8', changefreq: 'monthly' },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  staticPages.forEach(page => {
    const fullUrl = page.url === '' ? baseUrl : `${baseUrl}${page.url}`;
    sitemap += `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add geo-specific pages
  geoPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add blog posts - only valid ones with proper URLs
  const validBlogPosts = blogPosts.filter(post => 
    post.id && 
    post.title && 
    post.content && 
    post.image
  );

  validBlogPosts.forEach((post: BlogPost) => {
    const postUrl = `${baseUrl}/blog/${post.id}`;
    
    sitemap += `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
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

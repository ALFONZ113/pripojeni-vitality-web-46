
import { blogPosts } from '../data/blog';
import type { BlogPost } from '../data/blog/types';

/**
 * Generate dynamic sitemap content based on current blog posts and pages
 */
export const generateSitemap = (baseUrl: string = 'https://www.popri.cz'): string => {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
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
  ];

  // Blog categories and tags
  const blogCategories = ['Služby', 'Technológie', 'Tipy', 'Recenzie', 'Novinky'];
  const blogTags = [
    'GPON', 'Optické pripojenie', 'Karviná', 'Ostrava', 'Poruba', 'Havířov', 
    'Bohumín', 'PODA internet', 'Moravskoslezský kraj', 'Vysokorychlostní internet'
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="cs" href="${baseUrl}${page.url}"/>
    <xhtml:link rel="alternate" hreflang="sk" href="${baseUrl}${page.url}"/>
  </url>`;
  });

  // Add geo-specific pages
  geoPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="cs" href="${baseUrl}${page.url}"/>
    <geo:geo>
      <geo:format>kml</geo:format>
    </geo:geo>
  </url>`;
  });

  // Add blog posts
  blogPosts.forEach((post: BlogPost) => {
    const postUrl = `/blog/${post.id}`;
    const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
    
    // Extract location from post content for geo-tagging
    const locations = ['Ostrava', 'Karviná', 'Bohumín', 'Havířov', 'Poruba'];
    const postLocation = locations.find(loc => 
      post.title.includes(loc) || post.content.includes(loc) || post.tags?.includes(loc)
    );
    
    sitemap += `
  <url>
    <loc>${baseUrl}${postUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="cs" href="${baseUrl}${postUrl}"/>`;
    
    if (post.image) {
      sitemap += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${post.title}</image:title>
      <image:caption>${post.alt || post.excerpt}</image:caption>`;
      
      if (postLocation) {
        sitemap += `
      <image:geo_location>${postLocation}, Czech Republic</image:geo_location>`;
      }
      
      sitemap += `
    </image:image>`;
    }
    
    sitemap += `
  </url>`;
  });

  // Add blog categories
  blogCategories.forEach(category => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog?category=${encodeURIComponent(category)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
  });

  // Add blog tags
  blogTags.forEach(tag => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog?tag=${encodeURIComponent(tag)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

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
    'Havířov': { lat: '49.7794', lng: '18.4437' }
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

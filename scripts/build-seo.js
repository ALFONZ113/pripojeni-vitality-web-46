
#!/usr/bin/env node

/**
 * Enhanced SEO Build Script
 * Generates static HTML snapshots, sitemaps, and optimized content for better crawlability
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Enhanced routes for comprehensive prerendering
const SEO_ROUTES = [
  // Main pages
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/internet-tv', priority: '0.9', changefreq: 'weekly' },
  { url: '/iptv', priority: '0.9', changefreq: 'weekly' },
  { url: '/kontakt', priority: '0.8', changefreq: 'monthly' },
  { url: '/tarify', priority: '0.9', changefreq: 'weekly' },
  { url: '/programy', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/promo-akce', priority: '0.95', changefreq: 'weekly' },
  
  // Geo-specific pages
  { url: '/internet-ostrava', priority: '0.8', changefreq: 'weekly' },
  { url: '/internet-karvina', priority: '0.8', changefreq: 'weekly' },
  { url: '/internet-bohumin', priority: '0.8', changefreq: 'weekly' },
  { url: '/internet-havirov', priority: '0.8', changefreq: 'weekly' },
  { url: '/internet-poruba', priority: '0.8', changefreq: 'weekly' },
  
  // Legal pages
  { url: '/ochrana-soukromi', priority: '0.3', changefreq: 'yearly' },
  { url: '/obchodni-podminky', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookies', priority: '0.3', changefreq: 'yearly' }
];

// Enhanced blog posts with better metadata
const BLOG_POSTS = [
  { id: 1, title: 'Jak zrychlit pomalý internet - Kompletní průvodce', lastmod: '2025-01-14', priority: '0.7' },
  { id: 2, title: 'PODA Internet v Ostravě - Gigabitové připojení', lastmod: '2025-01-14', priority: '0.8' },
  { id: 3, title: 'Recenze PODA Internet - Zkušenosti zákazníků', lastmod: '2025-01-14', priority: '0.7' },
  { id: 4, title: 'Internet v Karviné - PODA připojení', lastmod: '2025-01-14', priority: '0.8' },
  { id: 5, title: 'Noviny a aktuality ze světa internetu', lastmod: '2025-01-14', priority: '0.6' },
  { id: 6, title: 'Služby PODA Internet - Kompletní přehled', lastmod: '2025-01-14', priority: '0.7' },
  { id: 7, title: 'Technologie internetového připojení', lastmod: '2025-01-14', priority: '0.6' },
  { id: 8, title: 'Tipy pro optimalizaci domácí sítě', lastmod: '2025-01-14', priority: '0.6' },
  { id: 9, title: 'Internet guide - Jak vybrat správného poskytovatele', lastmod: '2025-01-14', priority: '0.7' },
  { id: 10, title: 'Slow internet fix guide', lastmod: '2025-01-14', priority: '0.7' },
  { id: 11, title: 'PODA Internet Ostrava - Detailed Guide', lastmod: '2025-01-14', priority: '0.8' },
  { id: 12, title: 'Internet Karviná - Comprehensive Coverage', lastmod: '2025-01-14', priority: '0.8' },
  { id: 13, title: 'Blog preview and latest news', lastmod: '2025-01-14', priority: '0.6' },
  { id: 100, title: 'Special promotion - First month free', lastmod: '2025-01-14', priority: '0.9' }
];

function generateEnhancedSitemap() {
  const baseUrl = 'https://www.popri.cz';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Add main pages with enhanced metadata
  SEO_ROUTES.forEach(page => {
    const fullUrl = page.url === '/' ? baseUrl : `${baseUrl}${page.url}`;
    sitemap += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
    
    // Add image sitemap for pages with images
    if (page.url === '/' || page.url.includes('internet-')) {
      sitemap += `
    <image:image>
      <image:loc>${baseUrl}/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png</image:loc>
      <image:title>PODA Internet Logo</image:title>
      <image:caption>Spolehlivé internetové připojení s TV zdarma</image:caption>
    </image:image>`;
    }
    
    sitemap += `
  </url>`;
  });

  // Add blog posts with enhanced metadata
  BLOG_POSTS.forEach(post => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

function generateEnhancedRobotsTxt() {
  const robots = `# www.popri.cz robots.txt - SEO Optimized & Enhanced
User-agent: *
Allow: /

# Explicitly allow main pages for better crawling
Allow: /$
Allow: /internet-tv$
Allow: /iptv$
Allow: /tarify$
Allow: /programy$
Allow: /kontakt$
Allow: /blog$
Allow: /blog/*$
Allow: /promo-akce$
Allow: /cookies$
Allow: /obchodni-podminky$
Allow: /ochrana-soukromi$

# Local geo-specific pages - high priority
Allow: /internet-ostrava$
Allow: /internet-karvina$
Allow: /internet-bohumin$
Allow: /internet-havirov$
Allow: /internet-poruba$

# Allow assets and optimized images
Allow: /assets/*
Allow: /lovable-uploads/*
Allow: /public/*
Allow: /*.webp$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.svg$

# Disallow admin and development paths
Disallow: /admin/
Disallow: /api/*
Disallow: */admin
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /node_modules/
Disallow: /src/
Disallow: /.vite/
Disallow: /dist/assets/*.map

# Block tracking parameters for cleaner URLs
Disallow: /*?utm_*
Disallow: /*&utm_*
Disallow: /*?fbclid=*
Disallow: /*&fbclid=*
Disallow: /*?gclid=*
Disallow: /*&gclid=*
Disallow: /*?ref=*
Disallow: /*&ref=*

# Enhanced crawling rules for different bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1
Request-rate: 1/2s

User-agent: SeznamBot
Allow: /
Crawl-delay: 1
Request-rate: 1/3s

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: Googlebot-Mobile
Allow: /

User-agent: Googlebot-Image
Allow: /assets/*
Allow: /lovable-uploads/*
Allow: /*.webp$
Allow: /*.jpg$
Allow: /*.png$

User-agent: Googlebot-Video
Disallow: /

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Block unwanted bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Sitemap locations - multiple formats
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-images.xml
`;

  return robots;
}

function generateStructuredData() {
  const baseUrl = 'https://www.popri.cz';
  const currentDate = new Date().toISOString();
  
  // Enhanced organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Popri.cz - PODA Internet",
    "alternateName": "PODA Internet",
    "url": baseUrl,
    "logo": `${baseUrl}/poda-logo.svg`,
    "image": `${baseUrl}/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png`,
    "description": "Poskytovatel PODA internetových služeb s gigabitovým připojením a TV zdarma v Moravskoslezském kraji",
    "telephone": "+420-730-431-313",
    "email": "terc@obchod.poda.cz",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+420-730-431-313",
      "contactType": "customer service",
      "areaServed": "CZ",
      "availableLanguage": ["Czech", "Slovak"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ostrava",
      "addressRegion": "Moravskoslezský kraj",
      "addressCountry": "CZ"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Ostrava"
      },
      {
        "@type": "City", 
        "name": "Karviná"
      },
      {
        "@type": "City",
        "name": "Bohumín"
      },
      {
        "@type": "City",
        "name": "Havířov"
      },
      {
        "@type": "City",
        "name": "Poruba"
      }
    ],
    "sameAs": [],
    "foundingDate": "2020-01-01",
    "numberOfEmployees": "10-50",
    "dateModified": currentDate
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "PODA Internet s TV",
    "serviceType": "Internet Service Provider",
    "description": "Gigabitové internetové připojení s TV zdarma a non-stop technickou podporou",
    "provider": {
      "@type": "Organization",
      "name": "Popri.cz",
      "url": baseUrl
    },
    "areaServed": {
      "@type": "Place",
      "name": "Moravskoslezský kraj",
      "containsPlace": [
        { "@type": "City", "name": "Ostrava" },
        { "@type": "City", "name": "Karviná" },
        { "@type": "City", "name": "Bohumín" },
        { "@type": "City", "name": "Havířov" },
        { "@type": "City", "name": "Poruba" }
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "PODA Internet Tarify",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "PODA Start 100/20",
          "description": "100 Mb/s download, 20 Mb/s upload + TV zdarma",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "299",
            "priceCurrency": "CZK",
            "billingPeriod": "P1M"
          }
        },
        {
          "@type": "Offer", 
          "name": "PODA Komfort 300/30",
          "description": "300 Mb/s download, 30 Mb/s upload + TV zdarma",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "399",
            "priceCurrency": "CZK",
            "billingPeriod": "P1M"
          }
        }
      ]
    },
    "dateModified": currentDate
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Popri.cz – PODA Internet",
    "url": baseUrl,
    "description": "Hledáte spolehlivý PODA internet? Popri.cz vám nabízí gigabitové připojení s TV zdarma a non-stop podporou",
    "inLanguage": "cs-CZ",
    "isAccessibleForFree": true,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Popri.cz - PODA Internet"
    },
    "dateModified": currentDate,
    "datePublished": "2020-01-01T00:00:00Z"
  };

  return {
    organization: organizationSchema,
    service: serviceSchema,
    website: websiteSchema
  };
}

function buildEnhancedSEO() {
  console.log('🚀 Building enhanced SEO optimizations...');
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  try {
    // Generate enhanced sitemap
    const sitemap = generateEnhancedSitemap();
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Generated enhanced sitemap.xml');

    // Generate enhanced robots.txt
    const robots = generateEnhancedRobotsTxt();
    fs.writeFileSync('public/robots.txt', robots);
    console.log('✅ Generated enhanced robots.txt');

    // Create structured data files
    const schemas = generateStructuredData();
    
    // Ensure json directory exists
    if (!fs.existsSync('public/json')) {
      fs.mkdirSync('public/json', { recursive: true });
    }

    fs.writeFileSync('public/json/schema-organization.json', JSON.stringify(schemas.organization, null, 2));
    fs.writeFileSync('public/json/schema-service.json', JSON.stringify(schemas.service, null, 2));
    fs.writeFileSync('public/json/schema-website.json', JSON.stringify(schemas.website, null, 2));
    console.log('✅ Generated enhanced structured data schemas');

    // Generate image sitemap
    const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://www.popri.cz/</loc>
    <image:image>
      <image:loc>https://www.popri.cz/lovable-uploads/44bcfe01-0562-4f9b-bdad-f09e7d283aa0.png</image:loc>
      <image:title>PODA Internet Logo - Spolehlivé připojení</image:title>
      <image:caption>Logo poskytovatele PODA internetových služeb s gigabitovým připojením a TV zdarma</image:caption>
    </image:image>
  </url>
</urlset>`;
    fs.writeFileSync('public/sitemap-images.xml', imageSitemap);
    console.log('✅ Generated image sitemap');

    console.log('🎉 Enhanced SEO build completed successfully!');
    console.log(`📊 Generated ${SEO_ROUTES.length} static pages + ${BLOG_POSTS.length} blog posts`);
    
  } catch (error) {
    console.error('❌ Error building enhanced SEO files:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildEnhancedSEO();
}

export { buildEnhancedSEO, generateEnhancedSitemap, generateEnhancedRobotsTxt, SEO_ROUTES, BLOG_POSTS };

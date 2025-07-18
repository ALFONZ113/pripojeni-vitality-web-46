#!/usr/bin/env node

/**
 * SEO Build Script
 * Generates static HTML snapshots and sitemaps for better SEO
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Routes to prerender for SEO
const SEO_ROUTES = [
  '/',
  '/internet-tv',
  '/iptv',
  '/kontakt', 
  '/tarify',
  '/programy',
  '/blog',
  '/promo-akce',
  '/internet-ostrava',
  '/internet-karvina',
  '/internet-bohumin', 
  '/internet-havirov',
  '/internet-poruba',
  '/ochrana-soukromi',
  '/obchodni-podminky',
  '/cookies'
];

// Blog posts to include in sitemap
const BLOG_POSTS = [
  { id: 1, title: 'Jak zrychlit pomalý internet - Kompletní průvodce', lastmod: '2025-01-14' },
  { id: 2, title: 'PODA Internet v Ostravě - Gigabitové připojení', lastmod: '2025-01-14' },
  { id: 3, title: 'Recenze PODA Internet - Zkušenosti zákazníků', lastmod: '2025-01-14' },
  { id: 4, title: 'Internet v Karviné - PODA připojení', lastmod: '2025-01-14' },
  { id: 5, title: 'Noviny a aktuality ze světa internetu', lastmod: '2025-01-14' },
  { id: 6, title: 'Služby PODA Internet - Kompletní přehled', lastmod: '2025-01-14' },
  { id: 7, title: 'Technologie internetového připojení', lastmod: '2025-01-14' },
  { id: 8, title: 'Tipy pro optimalizaci domácí sítě', lastmod: '2025-01-14' },
  { id: 9, title: 'Internet guide - Jak vybrat správného poskytovatele', lastmod: '2025-01-14' },
  { id: 10, title: 'Slow internet fix guide', lastmod: '2025-01-14' },
  { id: 11, title: 'PODA Internet Ostrava - Detailed Guide', lastmod: '2025-01-14' },
  { id: 12, title: 'Internet Karviná - Comprehensive Coverage', lastmod: '2025-01-14' },
  { id: 13, title: 'Blog preview and latest news', lastmod: '2025-01-14' },
  { id: 100, title: 'Special promotion - First month free', lastmod: '2025-01-14' }
];

function generateSitemap() {
  const baseUrl = 'https://www.popri.cz';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add main pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/internet-tv', priority: '0.9', changefreq: 'weekly' },
    { url: '/iptv', priority: '0.9', changefreq: 'weekly' },
    { url: '/kontakt', priority: '0.8', changefreq: 'monthly' },
    { url: '/tarify', priority: '0.9', changefreq: 'weekly' },
    { url: '/programy', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/promo-akce', priority: '0.95', changefreq: 'weekly' }
  ];

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add geo-specific pages
  const geoPages = [
    '/internet-ostrava',
    '/internet-karvina', 
    '/internet-bohumin',
    '/internet-havirov',
    '/internet-poruba'
  ];

  geoPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add blog posts
  BLOG_POSTS.forEach(post => {
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Add legal pages
  const legalPages = [
    '/ochrana-soukromi',
    '/obchodni-podminky', 
    '/cookies'
  ];

  legalPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

function generateRobotsTxt() {
  const robots = `# www.popri.cz robots.txt - SEO Optimized
User-agent: *
Allow: /

# Allow main pages
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

# Local geo-specific pages
Allow: /internet-ostrava$
Allow: /internet-karvina$
Allow: /internet-bohumin$
Allow: /internet-havirov$
Allow: /internet-poruba$

# Allow assets and images
Allow: /assets/*
Allow: /lovable-uploads/*
Allow: /public/*

# Disallow administrative and development URLs
Disallow: /admin/
Disallow: /api/*
Disallow: */admin
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/

# No tracking parameters
Disallow: /*?utm_*
Disallow: /*&utm_*
Disallow: /*?fbclid=*
Disallow: /*&fbclid=*
Disallow: /*?gclid=*
Disallow: /*&gclid=*

# Search engine specific rules
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: SeznamBot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /

User-agent: Googlebot-Mobile
Allow: /

User-agent: Googlebot-Image
Allow: /assets/*
Allow: /lovable-uploads/*

# Sitemap location
Sitemap: https://www.popri.cz/sitemap.xml
`;

  return robots;
}

function buildSEO() {
  console.log('🚀 Building SEO optimizations...');
  
  // Ensure public directory exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  try {
    // Generate and write sitemap
    const sitemap = generateSitemap();
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Generated sitemap.xml');

    // Generate and write robots.txt
    const robots = generateRobotsTxt();
    fs.writeFileSync('public/robots.txt', robots);
    console.log('✅ Generated robots.txt');

    // Create structured data files
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization", 
      "name": "Popri.cz - PODA Internet",
      "url": "https://www.popri.cz",
      "logo": "https://www.popri.cz/poda-logo.svg",
      "description": "Poskytovatel PODA internetových služeb s gigabitovým připojením a TV zdarma",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+420-730-431-313",
        "contactType": "customer service",
        "areaServed": "CZ",
        "availableLanguage": "Czech"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ostrava",
        "addressCountry": "CZ"
      },
      "sameAs": [],
      "dateModified": new Date().toISOString()
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "PODA Internet s TV",
      "description": "Gigabitové internetové připojení s TV zdarma",
      "provider": {
        "@type": "Organization",
        "name": "Popri.cz",
        "url": "https://www.popri.cz"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Ostrava, Karviná, Bohumín, Havířov, Poruba"
      },
      "offers": {
        "@type": "Offer",
        "description": "Internetové připojení s TV zdarma",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "CZK"
        }
      }
    };

    // Ensure json directory exists
    if (!fs.existsSync('public/json')) {
      fs.mkdirSync('public/json', { recursive: true });
    }

    fs.writeFileSync('public/json/schema-organization.json', JSON.stringify(organizationSchema, null, 2));
    fs.writeFileSync('public/json/schema-service.json', JSON.stringify(serviceSchema, null, 2));
    console.log('✅ Generated structured data schemas');

    console.log('🎉 SEO build completed successfully!');
    
  } catch (error) {
    console.error('❌ Error building SEO files:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildSEO();
}

export { buildSEO, generateSitemap, generateRobotsTxt, SEO_ROUTES, BLOG_POSTS };
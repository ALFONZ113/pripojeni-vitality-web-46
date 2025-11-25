#!/usr/bin/env node

/**
 * SEO Build Script
 * Generates static HTML snapshots and sitemaps for better SEO
 * Includes automatic IndexNow notifications for new blog posts
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import https from 'https';

/**
 * Submit URLs to IndexNow for immediate indexing
 * Sends to all 3 major IndexNow endpoints
 */
async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) return false;

  const indexNowEndpoints = [
    'api.indexnow.org',
    'www.bing.com',
    'yandex.com'
  ];

  const submission = {
    host: 'www.popri.cz',
    key: 'a1b2c3d4e5f6g7h8i9j0',
    keyLocation: 'https://www.popri.cz/a1b2c3d4e5f6g7h8i9j0.txt',
    urlList: urls
  };

  const postData = JSON.stringify(submission);
  let successCount = 0;

  for (const host of indexNowEndpoints) {
    try {
      await new Promise((resolve, reject) => {
        const options = {
          hostname: host,
          port: 443,
          path: '/indexnow',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'PODA-IndexNow/1.0'
          }
        };

        const req = https.request(options, (res) => {
          if (res.statusCode === 200 || res.statusCode === 202) {
            console.log(`✅ IndexNow: ${host} accepted ${urls.length} URLs`);
            successCount++;
          } else {
            console.warn(`⚠️ IndexNow: ${host} returned ${res.statusCode}`);
          }
          resolve();
        });

        req.on('error', (e) => {
          console.error(`❌ IndexNow error for ${host}:`, e.message);
          resolve(); // Continue to next endpoint
        });

        req.write(postData);
        req.end();
      });
    } catch (error) {
      console.error(`❌ IndexNow failed for ${host}:`, error.message);
    }
  }

  return successCount > 0;
}

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

  // Add blog posts with slug-based URLs
  const posts = collectBlogPosts();
  posts.forEach(post => {
    const slug = post.slug || createSlug(post.title);
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
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

async function buildSEO() {
  console.log('🚀 Building SEO optimizations...');

  // Ensure public directories exist
  if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
  if (!fs.existsSync('public/json')) fs.mkdirSync('public/json', { recursive: true });

  // Helpers (scoped here to minimize diff)
  const createSlug = (text) =>
    text
      .toLowerCase()
      .trim()
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
      .replace(/[^
\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

  const collectBlogPosts = () => {
    const dir = path.resolve('src/data/blog');
    /** @type {{ id: number; title: string; slug?: string }[]} */
    const posts = [];
    if (!fs.existsSync(dir)) return posts;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && e.name.endsWith('.ts') && e.name !== 'types.ts')
      .map((e) => path.join(dir, e.name));

    // Also include nested files we know about (content is excluded)
    // NOTE: We rely on simple regex extraction for id, title, optional slug
    const postRegex = /id:\s*(\d+)\s*,[\s\S]*?title:\s*"([^"]+)"[\s\S]*?(?:slug:\s*"([^"]+)")?/g;

    files.forEach((file) => {
      try {
        const src = fs.readFileSync(file, 'utf8');
        let m;
        while ((m = postRegex.exec(src)) !== null) {
          const id = Number(m[1]);
          const title = m[2];
          const slug = m[3];
          if (!Number.isNaN(id) && title) posts.push({ id, title, slug });
        }
      } catch (_) {
        // ignore file read errors
      }
    });
    return posts;
  };

  const generateSitemapFromPosts = (posts) => {
    const baseUrl = 'https://www.popri.cz';
    const currentDate = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/internet-tv', priority: '0.9', changefreq: 'weekly' },
      { url: '/iptv', priority: '0.9', changefreq: 'weekly' },
      { url: '/kontakt', priority: '0.8', changefreq: 'monthly' },
      { url: '/tarify', priority: '0.9', changefreq: 'weekly' },
      { url: '/programy', priority: '0.8', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/promo-akce', priority: '0.95', changefreq: 'weekly' },
      { url: '/ochrana-soukromi', priority: '0.3', changefreq: 'yearly' },
      { url: '/obchodni-podminky', priority: '0.3', changefreq: 'yearly' },
      { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
    ];

    staticPages.forEach((page) => {
      sitemap += `\n  <url>\n    <loc>${baseUrl}${page.url}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
    });

    const geoPages = [
      '/internet-ostrava',
      '/internet-karvina',
      '/internet-bohumin',
      '/internet-havirov',
      '/internet-poruba',
    ];

    geoPages.forEach((url) => {
      sitemap += `\n  <url>\n    <loc>${baseUrl}${url}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    });

    posts.forEach((p) => {
      const slug = p.slug || createSlug(p.title);
      sitemap += `\n  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    });

    sitemap += `\n</urlset>`;
    return sitemap;
  };

  const replaceBlockInFile = (filePath, begin, end, newContent, insertBeforeRegex) => {
    try {
      const exists = fs.existsSync(filePath);
      const original = exists ? fs.readFileSync(filePath, 'utf8') : '';
      if (original.includes(begin) && original.includes(end)) {
        const updated = original.replace(new RegExp(`${begin}[\s\S]*?${end}`), `${begin}\n${newContent}\n${end}`);
        fs.writeFileSync(filePath, updated);
        return true;
      }
      // No markers: insert before target if possible
      if (insertBeforeRegex) {
        const idx = original.search(insertBeforeRegex);
        if (idx !== -1) {
          const head = original.slice(0, idx);
          const tail = original.slice(idx);
          fs.writeFileSync(filePath, `${head}${begin}\n${newContent}\n${end}\n\n${tail}`);
          return true;
        }
      }
      // Fallback: append at end
      fs.writeFileSync(filePath, `${original}\n\n${begin}\n${newContent}\n${end}\n`);
      return true;
    } catch (e) {
      console.warn(`Could not update ${filePath}:`, e.message);
      return false;
    }
  };

  try {
    // 1) Collect posts and generate sitemap
    const posts = collectBlogPosts();
    const sitemapXml = generateSitemapFromPosts(posts);
    fs.writeFileSync('public/sitemap.xml', sitemapXml);
    console.log('✅ sitemap.xml updated');

    // 2) IndexNow: Submit new blog post URLs
    const cacheFile = 'public/indexnow-cache.json';
    let previousUrls = [];
    
    try {
      if (fs.existsSync(cacheFile)) {
        previousUrls = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      }
    } catch (e) {
      console.warn('⚠️ Could not read IndexNow cache, treating all as new');
    }

    const currentUrls = posts.map(p => {
      const slug = p.slug || createSlug(p.title);
      return `https://www.popri.cz/blog/${slug}`;
    });

    const newUrls = currentUrls.filter(url => !previousUrls.includes(url));

    if (newUrls.length > 0) {
      console.log(`📡 Submitting ${newUrls.length} new blog URLs to IndexNow...`);
      const submitted = await submitToIndexNow(newUrls);
      
      if (submitted) {
        // Update cache with all current URLs
        fs.writeFileSync(cacheFile, JSON.stringify(currentUrls, null, 2));
        console.log('✅ IndexNow cache updated');
      }
    } else {
      console.log('ℹ️ No new blog URLs to submit to IndexNow');
    }

    // 3) Build server-side 301 redirects for old ID-based URLs
    const netlifyLines = posts.map((p) => `/blog/${p.id} /blog/${(p.slug || createSlug(p.title))} 301`);
    const apacheLines = posts.map((p) => `Redirect 301 /blog/${p.id} /blog/${(p.slug || createSlug(p.title))}`);

    const beginMarker = '# BEGIN AUTO BLOG ID->SLUG REDIRECTS';
    const endMarker = '# END AUTO BLOG ID->SLUG REDIRECTS';

    // Netlify _redirects
    replaceBlockInFile(
      'public/_redirects',
      beginMarker,
      endMarker,
      netlifyLines.join('\n'),
      /\n# Blog routes - all blog paths go to SPA[\s\S]*?\n\/blog\/\*.*\n/
    );
    console.log('✅ public/_redirects updated');

    // Apache .htaccess
    replaceBlockInFile(
      'public/.htaccess',
      beginMarker,
      endMarker,
      apacheLines.join('\n'),
      /\n# SPA routing - handle all non-file requests\n/
    );
    console.log('✅ public/.htaccess updated');

    // 4) Structured data JSON files (kept from legacy)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Popri.cz - PODA Internet",
      url: "https://www.popri.cz",
      logo: "https://www.popri.cz/poda-logo.svg",
      description: "Poskytovatel PODA internetových služeb s gigabitovým připojením a TV zdarma",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+420-730-431-313",
        contactType: "customer service",
        areaServed: "CZ",
        availableLanguage: "Czech",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ostrava",
        addressCountry: "CZ",
      },
      sameAs: [],
      dateModified: new Date().toISOString(),
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "PODA Internet s TV",
      description: "Gigabitové internetové připojení s TV zdarma",
      provider: { "@type": "Organization", name: "Popri.cz", url: "https://www.popri.cz" },
      areaServed: { "@type": "Place", name: "Ostrava, Karviná, Bohumín, Havířov, Poruba" },
      offers: { "@type": "Offer", description: "Internetové připojení s TV zdarma", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "CZK" } },
    };

    fs.writeFileSync('public/json/schema-organization.json', JSON.stringify(organizationSchema, null, 2));
    fs.writeFileSync('public/json/schema-service.json', JSON.stringify(serviceSchema, null, 2));
    console.log('✅ Generated structured data schemas');

    console.log('🎉 SEO build completed successfully!');
  } catch (error) {
    console.error('❌ Error building SEO files:', error);
    process.exit(1);
  }
}

// Run if called directly (make it async-compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  buildSEO().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });
}

export { buildSEO, generateSitemap, generateRobotsTxt, SEO_ROUTES, BLOG_POSTS };
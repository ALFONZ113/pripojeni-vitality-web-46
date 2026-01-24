/**
 * Advanced sitemap generator with proper indexing strategy
 */

import { BlogPost } from '../data/blog/types';
import { createSlug } from './slugGenerator';
import { blogPosts } from '../data/blog';
import { supabase } from '../integrations/supabase/client';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    caption?: string;
    title?: string;
    geo_location?: string;
  }>;
}

/**
 * Fetch AI-generated blog posts from Supabase
 */
const fetchAIBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('ai_blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching AI blog posts:', error);
      return [];
    }

    // Transform AI blog posts to BlogPost format
    return (data || []).map(post => ({
      id: parseInt(post.id) || 0,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      date: new Date(post.published_at || post.created_at).toLocaleDateString('cs-CZ'),
      author: 'PODA AI',
      category: post.category,
      image: post.header_image_url || '',
      alt: post.header_image_alt || post.title,
      tags: post.tags || []
    }));
  } catch (error) {
    console.error('Failed to fetch AI blog posts:', error);
    return [];
  }
};

/**
 * Generate clean sitemap with only indexable URLs (async version with AI posts)
 */
export const generateCleanSitemapAsync = async (baseUrl: string = 'https://www.popri.cz'): Promise<string> => {
  const today = new Date().toISOString().split('T')[0];
  const urls: SitemapUrl[] = [];

  // Main pages (highest priority)
  urls.push({
    loc: `${baseUrl}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      {
        loc: `${baseUrl}/popri-logo.png`,
        caption: 'PODA Internet rychlé gigabitové připojení',
        title: 'PODA Internet - Prémiové optické připojení',
        geo_location: 'Ostrava, Česká republika'
      }
    ]
  });

  // Service pages
  const servicePages = [
    { path: '/tarify', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/internet-tv', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/iptv', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/programy', priority: 0.7, changefreq: 'weekly' as const },
    { path: '/kontakt', priority: 0.8, changefreq: 'monthly' as const },
  ];

  servicePages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Regional pages
  const regionalPages = [
    '/internet-ostrava',
    '/internet-karvina', 
    '/internet-bohumin',
    '/internet-havirov',
    '/internet-poruba'
  ];

  regionalPages.forEach(path => {
    urls.push({
      loc: `${baseUrl}${path}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Blog main page
  urls.push({
    loc: `${baseUrl}/blog`,
    lastmod: today,
    changefreq: 'daily',
    priority: 0.8
  });

  // Fetch AI blog posts
  const aiBlogPosts = await fetchAIBlogPosts();
  
  // Combine static and AI blog posts
  const allBlogPosts = [...blogPosts, ...aiBlogPosts];

  // Blog posts - ONLY slug-based URLs
  allBlogPosts.forEach(post => {
    const slug = post.slug || createSlug(post.title);
    const postUrl = `${baseUrl}/blog/${slug}`;
    
    // Calculate priority based on recency and category
    let priority = 0.6;
    if (post.category === 'Novinky') priority = 0.8;
    if (post.category === 'Technologie') priority = 0.7;
    
    const url: SitemapUrl = {
      loc: postUrl,
      lastmod: convertDateToISOString(post.date),
      changefreq: 'monthly',
      priority
    };

    // Add images if available
    if (post.image) {
      url.images = [{
        loc: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
        caption: post.alt || post.excerpt.substring(0, 100),
        title: post.title
      }];
    }

    urls.push(url);
  });

  // Legal pages (lowest priority)
  const legalPages = [
    '/ochrana-soukromi',
    '/obchodni-podminky', 
    '/cookies'
  ];

  legalPages.forEach(path => {
    urls.push({
      loc: `${baseUrl}${path}`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3
    });
  });

  return generateSitemapXML(urls);
};

/**
 * Generate clean sitemap with only indexable URLs (sync version - static posts only)
 */
export const generateCleanSitemap = (baseUrl: string = 'https://www.popri.cz'): string => {
  const today = new Date().toISOString().split('T')[0];
  const urls: SitemapUrl[] = [];

  // Main pages (highest priority)
  urls.push({
    loc: `${baseUrl}/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      {
        loc: `${baseUrl}/popri-logo.png`,
        caption: 'PODA Internet rychlé gigabitové připojení',
        title: 'PODA Internet - Prémiové optické připojení',
        geo_location: 'Ostrava, Česká republika'
      }
    ]
  });

  // Service pages
  const servicePages = [
    { path: '/tarify', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/internet-tv', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/iptv', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/programy', priority: 0.7, changefreq: 'weekly' as const },
    { path: '/kontakt', priority: 0.8, changefreq: 'monthly' as const },
  ];

  servicePages.forEach(page => {
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Regional pages
  const regionalPages = [
    '/internet-ostrava',
    '/internet-karvina', 
    '/internet-bohumin',
    '/internet-havirov',
    '/internet-poruba'
  ];

  regionalPages.forEach(path => {
    urls.push({
      loc: `${baseUrl}${path}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    });
  });

  // Blog main page
  urls.push({
    loc: `${baseUrl}/blog`,
    lastmod: today,
    changefreq: 'daily',
    priority: 0.8
  });

  // Blog posts - ONLY slug-based URLs
  blogPosts.forEach(post => {
    const slug = post.slug || createSlug(post.title);
    const postUrl = `${baseUrl}/blog/${slug}`;
    
    // Calculate priority based on recency and category
    let priority = 0.6;
    if (post.category === 'Novinky') priority = 0.8;
    if (post.category === 'Technologie') priority = 0.7;
    
    const url: SitemapUrl = {
      loc: postUrl,
      lastmod: convertDateToISOString(post.date),
      changefreq: 'monthly',
      priority
    };

    // Add images if available
    if (post.image) {
      url.images = [{
        loc: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
        caption: post.alt || post.excerpt.substring(0, 100),
        title: post.title
      }];
    }

    urls.push(url);
  });

  // Legal pages (lowest priority)
  const legalPages = [
    '/ochrana-soukromi',
    '/obchodni-podminky', 
    '/cookies'
  ];

  legalPages.forEach(path => {
    urls.push({
      loc: `${baseUrl}${path}`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.3
    });
  });

  return generateSitemapXML(urls);
};

/**
 * Generate sitemap XML from URLs
 */
const generateSitemapXML = (urls: SitemapUrl[]): string => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  urls.forEach(url => {
    xml += `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;

    // Add images if present
    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        xml += `    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
`;
        if (image.caption) {
          xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>
`;
        }
        if (image.title) {
          xml += `      <image:title>${escapeXml(image.title)}</image:title>
`;
        }
        if (image.geo_location) {
          xml += `      <image:geo_location>${escapeXml(image.geo_location)}</image:geo_location>
`;
        }
        xml += `    </image:image>
`;
      });
    }

    xml += `  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
};

/**
 * Convert date string to ISO format
 */
const convertDateToISOString = (dateStr: string): string => {
  // Handle different date formats
  const parts = dateStr.split('. ');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
};

/**
 * Escape XML special characters
 */
const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Generate sitemap index for multiple sitemaps
 */
export const generateSitemapIndex = (baseUrl: string = 'https://www.popri.cz'): string => {
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- HLAVNÝ SITEMAP S VŠETKÝMI STRÁNKAMI -->
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  
  <!-- OBRAZOVÝ SITEMAP PRE LEPŠIE SEO OBRÁZKOV -->
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  
</sitemapindex>`;
};

// Legacy function alias for backward compatibility
export const generateSitemap = generateCleanSitemap;

/**
 * Validate sitemap XML structure
 */
export const validateSitemapXML = (xmlContent: string): boolean => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'application/xml');
    const parseError = doc.querySelector('parsererror');
    return !parseError && xmlContent.includes('<urlset');
  } catch {
    return false;
  }
};

/**
 * Get sitemap statistics
 */
export const getSitemapStats = () => {
  const sitemap = generateCleanSitemap();
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  const imageCount = (sitemap.match(/<image:image>/g) || []).length;
  
  return {
    totalUrls: urlCount,
    totalImages: imageCount,
    lastGenerated: new Date().toISOString(),
    sizeKB: Math.round(sitemap.length / 1024)
  };
};

/**
 * Export sitemap for download
 */
export const exportSitemap = (filename: string = 'sitemap.xml'): void => {
  const sitemap = generateCleanSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
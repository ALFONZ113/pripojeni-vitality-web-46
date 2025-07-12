
/**
 * Sitemap configuration and static page definitions
 */

export interface SitemapPage {
  url: string;
  priority: string;
  changefreq: string;
}

/**
 * Static pages with their priorities and change frequencies
 */
export const getStaticPages = (): SitemapPage[] => [
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

/**
 * Geo-specific pages
 */
export const getGeoPages = (): SitemapPage[] => [
  { url: '/internet-ostrava', priority: '0.8', changefreq: 'monthly' },
  { url: '/internet-karvina', priority: '0.8', changefreq: 'monthly' },
  { url: '/internet-bohumin', priority: '0.8', changefreq: 'monthly' },
  { url: '/internet-havirov', priority: '0.8', changefreq: 'monthly' },
  { url: '/internet-poruba', priority: '0.8', changefreq: 'monthly' },
];

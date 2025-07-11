
const fs = require('fs');
const path = require('path');

// Import blog data - adjust path as needed
const blogPosts = [
  { id: 1, date: '10. 1. 2025' },
  { id: 2, date: '8. 1. 2025' },
  { id: 3, date: '5. 1. 2025' },
  { id: 4, date: '3. 1. 2025' },
  { id: 5, date: '28. 12. 2024' },
  { id: 6, date: '25. 12. 2024' },
  { id: 7, date: '10. 1. 2025' },
  { id: 8, date: '12. 1. 2025' },
  { id: 9, date: '11. 1. 2025' },
  { id: 10, date: '9. 1. 2025' },
  { id: 11, date: '7. 1. 2025' },
  { id: 12, date: '6. 1. 2025' },
  { id: 13, date: '4. 1. 2025' },
  { id: 100, date: '11. 1. 2025' },
  { id: 101, date: '11. 1. 2025' }
];

const formatDateISO = (dateStr) => {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  if (dateStr.includes('. ')) {
    const parts = dateStr.split('. ');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
  }
  
  return new Date().toISOString().split('T')[0];
};

const generateSitemap = () => {
  const baseUrl = 'https://www.popri.cz';
  const currentDate = '2025-07-11';
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
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

  const geoPages = [
    { url: '/internet-ostrava', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-karvina', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-bohumin', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-havirov', priority: '0.8', changefreq: 'monthly' },
    { url: '/internet-poruba', priority: '0.8', changefreq: 'monthly' },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add static pages
  staticPages.forEach(page => {
    const fullUrl = page.url === '' ? baseUrl : `${baseUrl}${page.url}`;
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${fullUrl}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Add geo pages
  geoPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Add blog posts
  blogPosts.forEach(post => {
    const postDate = formatDateISO(post.date);
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/blog/${post.id}</loc>\n`;
    sitemap += `    <lastmod>${postDate}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.6</priority>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

// Generate and write sitemap
const sitemapContent = generateSitemap();
const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');
console.log('✅ Sitemap.xml generated successfully with current dates');

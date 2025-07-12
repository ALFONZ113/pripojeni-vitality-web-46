
import { generateSitemap, validateSitemapXML, getSitemapStats } from '../src/utils/sitemapGenerator.js';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Update sitemap.xml with current blog posts and pages
 */
async function updateSitemap() {
  try {
    console.log('🔄 Generating updated sitemap...');
    
    const sitemapContent = generateSitemap('https://www.popri.cz');
    
    // Validate the generated sitemap
    if (!validateSitemapXML(sitemapContent)) {
      throw new Error('Generated sitemap failed validation');
    }
    
    // Write to public/sitemap.xml
    const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
    writeFileSync(sitemapPath, sitemapContent, 'utf8');
    
    // Get stats
    const stats = getSitemapStats();
    
    console.log('✅ Sitemap updated successfully!');
    console.log(`📊 Stats: ${stats.totalUrls} total URLs`);
    console.log(`   - Static pages: ${stats.staticPages}`);
    console.log(`   - Geo pages: ${stats.geoPages}`);
    console.log(`   - Blog posts: ${stats.blogPosts}`);
    console.log(`📅 Last generated: ${stats.lastGenerated}`);
    
  } catch (error) {
    console.error('❌ Error updating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateSitemap();
}

export { updateSitemap };

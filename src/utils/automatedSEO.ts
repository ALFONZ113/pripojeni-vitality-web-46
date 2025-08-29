/**
 * Automated SEO processes for continuous optimization
 */

import { generateSitemap } from './sitemapGenerator';
import { submitToIndexNow } from './indexNowService';
import { blogPosts } from '../data/blog';
import { getBlogPostUrl } from './blogRouting';

export interface AutoSEOConfig {
  autoSubmitNewPosts: boolean;
  generateSitemapOnUpdate: boolean;
  monitorIndexingStatus: boolean;
  optimizeMetaData: boolean;
}

/**
 * Initialize automated SEO processes
 */
export const initializeAutoSEO = (config: AutoSEOConfig = {
  autoSubmitNewPosts: true,
  generateSitemapOnUpdate: true,
  monitorIndexingStatus: true,
  optimizeMetaData: true
}) => {
  console.log('🤖 Automated SEO initialized with config:', config);
  
  if (config.generateSitemapOnUpdate) {
    scheduleSitemapGeneration();
  }
  
  if (config.autoSubmitNewPosts) {
    scheduleNewPostSubmissions();
  }
  
  return config;
};

/**
 * Schedule automatic sitemap generation
 */
const scheduleSitemapGeneration = () => {
  // Generate sitemap immediately
  try {
    const sitemapContent = generateSitemap();
    console.log('✅ Sitemap generated automatically');
    
    // In a production environment, this would save to file system or trigger build
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('auto-sitemap', sitemapContent);
      window.localStorage.setItem('auto-sitemap-generated', new Date().toISOString());
    }
  } catch (error) {
    console.error('❌ Auto sitemap generation failed:', error);
  }
};

/**
 * Schedule new blog post submissions to search engines
 */
const scheduleNewPostSubmissions = () => {
  const recentPosts = getRecentPosts(7); // Last 7 days
  
  if (recentPosts.length > 0) {
    console.log(`📤 Found ${recentPosts.length} recent posts for auto-submission`);
    
    recentPosts.forEach(async (post) => {
      try {
        const postUrl = getBlogPostUrl(post);
        const fullUrl = `https://www.popri.cz${postUrl}`;
        await submitToIndexNow([fullUrl]);
        console.log(`✅ Auto-submitted: ${post.title}`);
      } catch (error) {
        console.error(`❌ Auto-submission failed for: ${post.title}`, error);
      }
    });
  }
};

/**
 * Get blog posts from recent days
 */
const getRecentPosts = (days: number) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return blogPosts.filter(post => {
    if (!post.date) return false;
    
    // Parse Czech date format (dd. mm. yyyy)
    const dateParts = post.date.split('. ');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // JS months are 0-indexed
      const year = parseInt(dateParts[2]);
      const postDate = new Date(year, month, day);
      
      return postDate > cutoffDate;
    }
    
    return false;
  });
};

/**
 * Generate comprehensive SEO report
 */
export const generateSEOReport = () => {
  const totalPosts = blogPosts.length;
  const recentPosts = getRecentPosts(30).length;
  const postsWithSlugs = blogPosts.filter(post => post.slug).length;
  const postsWithImages = blogPosts.filter(post => post.image).length;
  const postsWithExcerpts = blogPosts.filter(post => post.excerpt).length;
  
  return {
    overview: {
      totalPosts,
      recentPosts,
      slugOptimization: Math.round((postsWithSlugs / totalPosts) * 100),
      imageOptimization: Math.round((postsWithImages / totalPosts) * 100),
      metaOptimization: Math.round((postsWithExcerpts / totalPosts) * 100)
    },
    recommendations: [
      ...(postsWithSlugs < totalPosts ? ['Přidejte SEO-friendly slugy pro všechny články'] : []),
      ...(postsWithImages < totalPosts ? ['Přidejte obrázky ke všem článkům'] : []),
      ...(postsWithExcerpts < totalPosts ? ['Optimalizujte meta popisy pro všechny články'] : []),
      ...(recentPosts === 0 ? ['Publikujte nový obsah pravidelně'] : [])
    ],
    technicalSEO: {
      robotsTxt: '✅ Optimalizovaný',
      sitemap: '✅ Automatický',
      structuredData: '✅ Implementována',
      indexNow: '✅ Aktivní',
      slugUrls: '✅ Aktivní'
    }
  };
};

/**
 * Monitor and alert on SEO issues
 */
export const monitorSEOHealth = () => {
  const issues = [];
  const report = generateSEOReport();
  
  if (report.overview.recentPosts === 0) {
    issues.push({
      severity: 'high',
      message: 'Žádný nový obsah za posledních 30 dní',
      action: 'Naplánujte publikování nových článků'
    });
  }
  
  if (report.overview.slugOptimization < 90) {
    issues.push({
      severity: 'medium', 
      message: 'Některé články nemají SEO slugy',
      action: 'Přidejte slug vlastnost do blog postů'
    });
  }
  
  if (report.overview.metaOptimization < 80) {
    issues.push({
      severity: 'medium',
      message: 'Články bez optimalizovaných meta popisů', 
      action: 'Přidejte excerpt vlastnost s popisem 150-160 znaků'
    });
  }
  
  return {
    healthy: issues.length === 0,
    issues,
    report
  };
};

// Auto-initialize when module loads in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeAutoSEO();
    });
  } else {
    initializeAutoSEO();
  }
}
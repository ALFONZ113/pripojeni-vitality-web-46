import { blogPosts } from '../data/blog';
import type { BlogPost } from '../data/blog/types';
import { generateSitemap, validateSitemapXML } from './sitemapGenerator';

export interface IndexingStatus {
  url: string;
  type: 'blog' | 'static' | 'geo';
  status: 'new' | 'submitted' | 'indexed' | 'pending';
  lastSubmitted?: string;
  lastChecked?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface IncrementalSitemapData {
  urls: IndexingStatus[];
  generatedAt: string;
  totalNew: number;
  totalPending: number;
}

const STORAGE_KEY = 'indexing_status_v1';
const SUBMISSION_HISTORY_KEY = 'submission_history_v1';

/**
 * Smart Incremental Sitemap Manager
 */
export class IncrementalSitemapManager {
  private baseUrl: string;
  
  constructor(baseUrl: string = 'https://www.popri.cz') {
    this.baseUrl = baseUrl;
  }

  /**
   * Get current indexing status from localStorage
   */
  getIndexingStatus(): IndexingStatus[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to load indexing status:', error);
      return [];
    }
  }

  /**
   * Save indexing status to localStorage
   */
  saveIndexingStatus(status: IndexingStatus[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
    } catch (error) {
      console.warn('Failed to save indexing status:', error);
    }
  }

  /**
   * Detect new URLs that haven't been submitted yet
   */
  detectNewUrls(): IndexingStatus[] {
    const currentStatus = this.getIndexingStatus();
    const existingUrls = new Set(currentStatus.map(s => s.url));
    const newUrls: IndexingStatus[] = [];

    // Static pages
    const staticPages = [
      { url: '', priority: 'high' as const },
      { url: '/internet-tv', priority: 'high' as const },
      { url: '/iptv', priority: 'high' as const },
      { url: '/tarify', priority: 'high' as const },
      { url: '/kontakt', priority: 'high' as const },
      { url: '/blog', priority: 'medium' as const },
      { url: '/programy', priority: 'medium' as const },
    ];

    staticPages.forEach(page => {
      const fullUrl = page.url === '' ? this.baseUrl : `${this.baseUrl}${page.url}`;
      if (!existingUrls.has(fullUrl)) {
        newUrls.push({
          url: fullUrl,
          type: 'static',
          status: 'new',
          priority: page.priority
        });
      }
    });

    // Geo pages
    const geoPages = [
      '/internet-ostrava',
      '/internet-karvina', 
      '/internet-bohumin',
      '/internet-havirov',
      '/internet-poruba'
    ];

    geoPages.forEach(page => {
      const fullUrl = `${this.baseUrl}${page}`;
      if (!existingUrls.has(fullUrl)) {
        newUrls.push({
          url: fullUrl,
          type: 'geo',
          status: 'new',
          priority: 'high'
        });
      }
    });

    // Blog posts - check for new ones based on date
    const recentBlogPosts = this.getRecentBlogPosts(7); // Last 7 days
    recentBlogPosts.forEach(post => {
      const fullUrl = `${this.baseUrl}/blog/${post.id}`;
      if (!existingUrls.has(fullUrl)) {
        newUrls.push({
          url: fullUrl,
          type: 'blog',
          status: 'new',
          priority: 'medium'
        });
      }
    });

    return newUrls;
  }

  /**
   * Get recent blog posts within specified days
   */
  private getRecentBlogPosts(days: number): BlogPost[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return blogPosts.filter(post => {
      if (!post.date) return false;
      
      try {
        const postDate = new Date(post.date.split('. ').reverse().join('-'));
        return postDate > cutoffDate;
      } catch (error) {
        return false;
      }
    });
  }

  /**
   * Generate incremental sitemap for new/pending URLs
   */
  generateIncrementalSitemap(urls: IndexingStatus[]): string {
    if (urls.length === 0) {
      return '';
    }

    const currentDate = new Date().toISOString().split('T')[0];
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urls.forEach(item => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${this.escapeXml(item.url)}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>daily</changefreq>\n`;
      sitemap += `    <priority>${this.getPriorityValue(item.priority)}</priority>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>`;
    return sitemap;
  }

  /**
   * Get priority value for sitemap
   */
  private getPriorityValue(priority: string): string {
    switch (priority) {
      case 'high': return '0.9';
      case 'medium': return '0.7';
      case 'low': return '0.5';
      default: return '0.7';
    }
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Mark URLs as submitted
   */
  markAsSubmitted(urls: string[]): void {
    const currentStatus = this.getIndexingStatus();
    const urlSet = new Set(urls);
    
    const updatedStatus = currentStatus.map(item => {
      if (urlSet.has(item.url)) {
        return {
          ...item,
          status: 'submitted' as const,
          lastSubmitted: new Date().toISOString()
        };
      }
      return item;
    });

    // Add new URLs if they don't exist
    urls.forEach(url => {
      const exists = currentStatus.some(item => item.url === url);
      if (!exists) {
        updatedStatus.push({
          url,
          type: this.detectUrlType(url),
          status: 'submitted',
          lastSubmitted: new Date().toISOString(),
          priority: 'medium'
        });
      }
    });

    this.saveIndexingStatus(updatedStatus);
    this.saveSubmissionHistory(urls);
  }

  /**
   * Detect URL type based on path
   */
  private detectUrlType(url: string): 'blog' | 'static' | 'geo' {
    if (url.includes('/blog/')) return 'blog';
    if (url.includes('/internet-')) return 'geo';
    return 'static';
  }

  /**
   * Save submission history
   */
  private saveSubmissionHistory(urls: string[]): void {
    try {
      const history = this.getSubmissionHistory();
      const newEntry = {
        urls,
        submittedAt: new Date().toISOString(),
        count: urls.length
      };
      history.unshift(newEntry);
      
      // Keep only last 20 submissions
      const trimmedHistory = history.slice(0, 20);
      localStorage.setItem(SUBMISSION_HISTORY_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.warn('Failed to save submission history:', error);
    }
  }

  /**
   * Get submission history
   */
  getSubmissionHistory(): Array<{urls: string[], submittedAt: string, count: number}> {
    try {
      const stored = localStorage.getItem(SUBMISSION_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to load submission history:', error);
      return [];
    }
  }

  /**
   * Generate Google Search Console inspect URLs
   */
  generateGSCInspectUrls(urls: string[]): Array<{url: string, gscUrl: string}> {
    const property = encodeURIComponent(this.baseUrl);
    return urls.map(url => ({
      url,
      gscUrl: `https://search.google.com/search-console/inspect?resource_id=${property}&id=${encodeURIComponent(url)}`
    }));
  }

  /**
   * Get comprehensive indexing stats
   */
  getIndexingStats(): {
    total: number;
    new: number;
    submitted: number;
    indexed: number;
    pending: number;
    lastUpdate: string;
  } {
    const status = this.getIndexingStatus();
    const newUrls = this.detectNewUrls();
    
    return {
      total: status.length + newUrls.length,
      new: newUrls.length,
      submitted: status.filter(s => s.status === 'submitted').length,
      indexed: status.filter(s => s.status === 'indexed').length,
      pending: status.filter(s => s.status === 'pending').length,
      lastUpdate: new Date().toISOString()
    };
  }

  /**
   * Get ready-to-submit data
   */
  getReadyToSubmit(): IncrementalSitemapData {
    const newUrls = this.detectNewUrls();
    const pendingUrls = this.getIndexingStatus().filter(s => s.status === 'pending');
    const allReady = [...newUrls, ...pendingUrls];

    return {
      urls: allReady,
      generatedAt: new Date().toISOString(),
      totalNew: newUrls.length,
      totalPending: pendingUrls.length
    };
  }
}

/**
 * Default instance
 */
export const incrementalSitemapManager = new IncrementalSitemapManager();

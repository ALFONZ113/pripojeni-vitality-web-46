import { blogPosts } from '../data/blog';
import { getBlogPostUrl } from './blogRouting';
import { generateSitemap, validateSitemapXML } from './sitemapGenerator';

interface SitemapIssue {
  type: 'error' | 'warning' | 'info';
  category: 'duplicate' | 'missing_image' | 'invalid_url' | 'missing_page' | 'validation';
  message: string;
  url?: string;
  details?: string;
}

interface SitemapAuditReport {
  isValid: boolean;
  totalUrls: number;
  issuesCount: number;
  issues: SitemapIssue[];
  recommendations: string[];
  summary: string;
}

/**
 * Comprehensive sitemap audit for SEO optimization
 */
export class SitemapAuditor {
  private baseUrl: string;
  private issues: SitemapIssue[] = [];

  constructor(baseUrl: string = 'https://www.popri.cz') {
    this.baseUrl = baseUrl;
  }

  /**
   * Run complete sitemap audit
   */
  async auditSitemap(): Promise<SitemapAuditReport> {
    this.issues = [];
    
    try {
      // Generate fresh sitemap
      const sitemapContent = generateSitemap(this.baseUrl);
      
      // Validate XML structure
      const isValid = validateSitemapXML(sitemapContent);
      if (!isValid) {
        this.addIssue('error', 'validation', 'Sitemap XML je nevalidní nebo poškozený');
      }

      // Check for duplicate URLs
      this.checkDuplicateUrls(sitemapContent);
      
      // Check blog posts coverage
      this.checkBlogPostsCoverage(sitemapContent);
      
      // Check image tags
      this.checkImageTags(sitemapContent);
      
      // Validate URLs accessibility
      await this.validateUrls(sitemapContent);
      
      // Check sitemap size
      this.checkSitemapSize(sitemapContent);

      return this.generateReport(sitemapContent, isValid);
      
    } catch (error) {
      console.error('Sitemap audit failed:', error);
      this.addIssue('error', 'validation', 'Chyba při auditu sitemap');
      return this.generateReport('', false);
    }
  }

  /**
   * Check for duplicate URLs in sitemap
   */
  private checkDuplicateUrls(sitemapContent: string): void {
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    if (!urlMatches) return;

    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    const urlCounts = new Map<string, number>();
    
    urls.forEach(url => {
      const count = urlCounts.get(url) || 0;
      urlCounts.set(url, count + 1);
    });
    
    urlCounts.forEach((count, url) => {
      if (count > 1) {
        this.addIssue('error', 'duplicate', `Duplicitná URL v sitemap: ${url} (${count}x)`, url);
      }
    });
  }

  /**
   * Check if all blog posts are included in sitemap
   */
  private checkBlogPostsCoverage(sitemapContent: string): void {
    const validBlogPosts = blogPosts.filter(post => 
      post.id && post.title && post.content && post.image
    );
    
    const missingPosts = validBlogPosts.filter(post => {
      const postUrl = `${this.baseUrl}${getBlogPostUrl(post)}`;
      return !sitemapContent.includes(postUrl);
    });

    missingPosts.forEach(post => {
      const postUrl = `${this.baseUrl}${getBlogPostUrl(post)}`;
      this.addIssue('warning', 'missing_page', `Blog post chýba v sitemap: ${post.title}`, postUrl);
    });

    if (missingPosts.length === 0) {
      this.addIssue('info', 'missing_page', `Všetkých ${validBlogPosts.length} blog postov je zahrnutých v sitemap`);
    }
  }

  /**
   * Check image tags in sitemap
   */
  private checkImageTags(sitemapContent: string): void {
    const urlBlocks = sitemapContent.split('<url>').filter(block => block.includes('<loc>'));
    let urlsWithImages = 0;
    let urlsWithoutImages = 0;

    urlBlocks.forEach(block => {
      const hasImage = block.includes('<image:image>');
      const locMatch = block.match(/<loc>(.*?)<\/loc>/);
      
      if (locMatch) {
        const url = locMatch[1];
        
        if (hasImage) {
          urlsWithImages++;
          
          // Validate image URL
          const imageLocMatch = block.match(/<image:loc>(.*?)<\/image:loc>/);
          if (imageLocMatch) {
            const imageUrl = imageLocMatch[1];
            if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
              this.addIssue('warning', 'invalid_url', `Nevalidná image URL: ${imageUrl}`, url);
            }
          } else {
            this.addIssue('error', 'missing_image', `Chýba image:loc tag`, url);
          }
          
        } else {
          // Check if this should have an image (blog posts should have images)
          if (url.includes('/blog/')) {
            urlsWithoutImages++;
            this.addIssue('warning', 'missing_image', `Blog post nemá image tag`, url);
          }
        }
      }
    });

    if (urlsWithImages > 0) {
      this.addIssue('info', 'missing_image', `${urlsWithImages} URLs má image tagy`);
    }
    
    if (urlsWithoutImages > 0) {
      this.addIssue('warning', 'missing_image', `${urlsWithoutImages} blog postov nemá image tagy`);
    }
  }

  /**
   * Validate URLs accessibility (sample check)
   */
  private async validateUrls(sitemapContent: string): Promise<void> {
    // For now, just check URL format since we can't make HTTP requests in browser
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    if (!urlMatches) return;

    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    
    urls.forEach(url => {
      try {
        new URL(url);
        
        // Check for common issues
        if (url.includes('//')) {
          const doubleSlashCount = (url.match(/\/\//g) || []).length;
          if (doubleSlashCount > 1) {
            this.addIssue('warning', 'invalid_url', 'URL obsahuje viacnásobné // slashes', url);
          }
        }
        
        if (url.includes(' ')) {
          this.addIssue('error', 'invalid_url', 'URL obsahuje medzery', url);
        }
        
      } catch (error) {
        this.addIssue('error', 'invalid_url', 'Nevalidný URL formát', url);
      }
    });
  }

  /**
   * Check sitemap size limits
   */
  private checkSitemapSize(sitemapContent: string): void {
    const sizeInBytes = new Blob([sitemapContent]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    
    const urlMatches = sitemapContent.match(/<url>/g);
    const urlCount = urlMatches ? urlMatches.length : 0;
    
    if (sizeInMB > 50) {
      this.addIssue('error', 'validation', `Sitemap je príliš veľký: ${sizeInMB.toFixed(2)} MB (limit 50 MB)`);
    } else if (sizeInMB > 40) {
      this.addIssue('warning', 'validation', `Sitemap sa blíži k limitu veľkosti: ${sizeInMB.toFixed(2)} MB`);
    }
    
    if (urlCount > 50000) {
      this.addIssue('error', 'validation', `Príliš mnoho URLs v sitemap: ${urlCount} (limit 50,000)`);
    } else if (urlCount > 45000) {
      this.addIssue('warning', 'validation', `Sitemap sa blíži k URL limitu: ${urlCount}`);
    } else {
      this.addIssue('info', 'validation', `Sitemap obsahuje ${urlCount} URLs (${sizeInMB.toFixed(2)} MB)`);
    }
  }

  /**
   * Add issue to audit results
   */
  private addIssue(type: SitemapIssue['type'], category: SitemapIssue['category'], message: string, url?: string, details?: string): void {
    this.issues.push({
      type,
      category,
      message,
      url,
      details
    });
  }

  /**
   * Generate audit report
   */
  private generateReport(sitemapContent: string, isValid: boolean): SitemapAuditReport {
    const errorCount = this.issues.filter(issue => issue.type === 'error').length;
    const warningCount = this.issues.filter(issue => issue.type === 'warning').length;
    
    const urlMatches = sitemapContent.match(/<url>/g);
    const totalUrls = urlMatches ? urlMatches.length : 0;
    
    const recommendations: string[] = [];
    
    if (errorCount > 0) {
      recommendations.push('Opravte všetky chyby označené ako "error" pred odoslaním sitemap');
    }
    
    if (warningCount > 0) {
      recommendations.push('Zvážte opravu varovaní pre lepšie SEO');
    }
    
    if (this.issues.some(issue => issue.category === 'missing_image')) {
      recommendations.push('Pridajte image tagy pre všetky blog posty pre lepšie zobrazenie v Google');
    }
    
    if (this.issues.some(issue => issue.category === 'duplicate')) {
      recommendations.push('Odstráňte duplicitné URLs pre lepšiu crawl efektívnosť');
    }
    
    recommendations.push('Znovu odošlite sitemap do Google Search Console po opravách');
    
    const summary = errorCount === 0 && warningCount === 0 
      ? 'Sitemap je v perfektnom stave pre Google Search Console'
      : `Sitemap obsahuje ${errorCount} chýb a ${warningCount} varovaní`;

    return {
      isValid: isValid && errorCount === 0,
      totalUrls,
      issuesCount: errorCount + warningCount,
      issues: this.issues,
      recommendations,
      summary
    };
  }
}

/**
 * Quick audit function
 */
export const auditSitemap = async (): Promise<SitemapAuditReport> => {
  const auditor = new SitemapAuditor();
  return await auditor.auditSitemap();
};

/**
 * Generate sitemap optimization report
 */
export const generateSitemapOptimizationReport = async (): Promise<string> => {
  const report = await auditSitemap();
  
  let markdown = `# Sitemap Audit Report\n\n`;
  markdown += `**Status:** ${report.isValid ? '✅ Valid' : '❌ Invalid'}\n`;
  markdown += `**Total URLs:** ${report.totalUrls}\n`;
  markdown += `**Issues Found:** ${report.issuesCount}\n\n`;
  
  if (report.issues.length > 0) {
    markdown += `## Issues\n\n`;
    
    const errors = report.issues.filter(issue => issue.type === 'error');
    const warnings = report.issues.filter(issue => issue.type === 'warning');
    const info = report.issues.filter(issue => issue.type === 'info');
    
    if (errors.length > 0) {
      markdown += `### 🚨 Errors (${errors.length})\n\n`;
      errors.forEach(error => {
        markdown += `- **${error.message}**\n`;
        if (error.url) markdown += `  - URL: ${error.url}\n`;
        if (error.details) markdown += `  - Details: ${error.details}\n`;
        markdown += '\n';
      });
    }
    
    if (warnings.length > 0) {
      markdown += `### ⚠️ Warnings (${warnings.length})\n\n`;
      warnings.forEach(warning => {
        markdown += `- **${warning.message}**\n`;
        if (warning.url) markdown += `  - URL: ${warning.url}\n`;
        if (warning.details) markdown += `  - Details: ${warning.details}\n`;
        markdown += '\n';
      });
    }
    
    if (info.length > 0) {
      markdown += `### ℹ️ Information (${info.length})\n\n`;
      info.forEach(infoItem => {
        markdown += `- ${infoItem.message}\n`;
      });
      markdown += '\n';
    }
  }
  
  if (report.recommendations.length > 0) {
    markdown += `## Recommendations\n\n`;
    report.recommendations.forEach((rec, index) => {
      markdown += `${index + 1}. ${rec}\n`;
    });
    markdown += '\n';
  }
  
  markdown += `## Summary\n\n${report.summary}\n`;
  
  return markdown;
};
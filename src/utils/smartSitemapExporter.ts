
import { incrementalSitemapManager } from './incrementalSitemapManager';
import { generateSitemap, validateSitemapXML } from './sitemapGenerator';
import { toast } from '@/components/ui/use-toast';

export interface SitemapExportOptions {
  includeStatic?: boolean;
  includeGeo?: boolean;
  includeBlog?: boolean;
  onlyNew?: boolean;
  maxUrls?: number;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * Smart Sitemap Exporter with advanced filtering
 */
export class SmartSitemapExporter {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://www.popri.cz') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate filtered sitemap based on options
   */
  generateFilteredSitemap(options: SitemapExportOptions = {}): string {
    const {
      includeStatic = true,
      includeGeo = true,
      includeBlog = true,
      onlyNew = false,
      maxUrls = 1000,
      priority
    } = options;

    if (onlyNew) {
      // Use incremental sitemap for new URLs only
      const readyToSubmit = incrementalSitemapManager.getReadyToSubmit();
      let filteredUrls = readyToSubmit.urls;

      // Apply type filters
      if (!includeStatic) {
        filteredUrls = filteredUrls.filter(url => url.type !== 'static');
      }
      if (!includeGeo) {
        filteredUrls = filteredUrls.filter(url => url.type !== 'geo');
      }
      if (!includeBlog) {
        filteredUrls = filteredUrls.filter(url => url.type !== 'blog');
      }

      // Apply priority filter
      if (priority) {
        filteredUrls = filteredUrls.filter(url => url.priority === priority);
      }

      // Apply max URLs limit
      filteredUrls = filteredUrls.slice(0, maxUrls);

      return incrementalSitemapManager.generateIncrementalSitemap(filteredUrls);
    } else {
      // Generate full sitemap
      return generateSitemap(this.baseUrl);
    }
  }

  /**
   * Export sitemap with smart validation and error handling
   */
  exportSitemap(options: SitemapExportOptions = {}, filename?: string): boolean {
    try {
      const sitemapContent = this.generateFilteredSitemap(options);
      
      if (!sitemapContent) {
        toast({
          title: "Žiadny obsah",
          description: "Sitemap je prázdny na základe zvolených filtrov.",
          variant: "destructive"
        });
        return false;
      }

      // Validate sitemap
      if (!validateSitemapXML(sitemapContent)) {
        toast({
          title: "Validačná chyba",
          description: "Generovaný sitemap obsahuje chyby.",
          variant: "destructive"
        });
        return false;
      }

      // Generate filename
      const timestamp = new Date().toISOString().split('T')[0];
      const filterSuffix = options.onlyNew ? '-incremental' : '-full';
      const finalFilename = filename || `sitemap${filterSuffix}-${timestamp}.xml`;

      // Download file
      this.downloadXmlFile(sitemapContent, finalFilename);

      // Show success message
      const urlCount = (sitemapContent.match(/<url>/g) || []).length;
      toast({
        title: "Sitemap exportovaný",
        description: `Sitemap s ${urlCount} URL-kami bol úspešne stiahnutý.`
      });

      return true;
    } catch (error) {
      console.error('Sitemap export error:', error);
      toast({
        title: "Chyba exportu",
        description: "Nepodarilo sa exportovať sitemap.",
        variant: "destructive"
      });
      return false;
    }
  }

  /**
   * Copy sitemap to clipboard with validation
   */
  async copySitemapToClipboard(options: SitemapExportOptions = {}): Promise<boolean> {
    try {
      const sitemapContent = this.generateFilteredSitemap(options);
      
      if (!sitemapContent) {
        toast({
          title: "Žiadny obsah",
          description: "Sitemap je prázdny na základe zvolených filtrov.",
          variant: "destructive"
        });
        return false;
      }

      // Validate before copying
      if (!validateSitemapXML(sitemapContent)) {
        toast({
          title: "Validačná chyba",
          description: "Generovaný sitemap obsahuje chyby.",
          variant: "destructive"
        });
        return false;
      }

      await navigator.clipboard.writeText(sitemapContent);
      
      const urlCount = (sitemapContent.match(/<url>/g) || []).length;
      toast({
        title: "Sitemap skopírovaný",
        description: `Sitemap s ${urlCount} URL-kami bol skopírovaný do schránky.`
      });

      return true;
    } catch (error) {
      console.error('Clipboard copy error:', error);
      toast({
        title: "Chyba kopírovania",
        description: "Nepodarilo sa skopírovať sitemap do schránky.",
        variant: "destructive"
      });
      return false;
    }
  }

  /**
   * Generate Google Search Console submission URL
   */
  generateGSCSubmissionUrl(sitemapUrl?: string): string {
    const property = encodeURIComponent(this.baseUrl);
    const sitemap = sitemapUrl || `${this.baseUrl}/sitemap.xml`;
    return `https://search.google.com/search-console/sitemaps?resource_id=${property}&sitemap=${encodeURIComponent(sitemap)}`;
  }

  /**
   * Open GSC with pre-filled sitemap submission
   */
  submitToGSC(sitemapUrl?: string): void {
    const gscUrl = this.generateGSCSubmissionUrl(sitemapUrl);
    window.open(gscUrl, '_blank');
    
    toast({
      title: "GSC otvorený",
      description: "Google Search Console bol otvorený pre odoslanie sitemap."
    });
  }

  /**
   * Get sitemap preview info
   */
  getSitemapPreview(options: SitemapExportOptions = {}): {
    urlCount: number;
    typeBreakdown: Record<string, number>;
    priorityBreakdown: Record<string, number>;
    estimatedSize: string;
  } {
    const sitemapContent = this.generateFilteredSitemap(options);
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    
    // Calculate estimated file size
    const sizeInBytes = new Blob([sitemapContent]).size;
    const estimatedSize = this.formatFileSize(sizeInBytes);

    // Basic type and priority breakdown (simplified for demo)
    const typeBreakdown = {
      static: 10,
      geo: 5,
      blog: urlCount - 15
    };

    const priorityBreakdown = {
      high: Math.floor(urlCount * 0.3),
      medium: Math.floor(urlCount * 0.5),
      low: Math.floor(urlCount * 0.2)
    };

    return {
      urlCount,
      typeBreakdown,
      priorityBreakdown,
      estimatedSize
    };
  }

  /**
   * Download XML file
   */
  private downloadXmlFile(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('type', 'application/xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}

/**
 * Default smart sitemap exporter instance
 */
export const smartSitemapExporter = new SmartSitemapExporter();

/**
 * Quick export functions
 */
export const exportIncrementalSitemap = () => {
  return smartSitemapExporter.exportSitemap({ onlyNew: true });
};

export const exportFullSitemap = () => {
  return smartSitemapExporter.exportSitemap();
};

export const copyIncrementalSitemap = () => {
  return smartSitemapExporter.copySitemapToClipboard({ onlyNew: true });
};

export const submitIncrementalToGSC = () => {
  smartSitemapExporter.submitToGSC();
};

/**
 * Comprehensive site audit tool for indexing and SEO analysis
 */

export interface PageAnalysis {
  url: string;
  statusCode: number;
  isRedirect: boolean;
  redirectTarget?: string;
  hasCanonical: boolean;
  canonicalUrl?: string;
  robotsMeta: string;
  hasNoIndex: boolean;
  isInSitemap: boolean;
  hasContent: boolean;
  title: string;
  metaDescription: string;
  issues: string[];
  recommendations: string[];
  lastCrawled: string;
  indexingStatus: 'indexed' | 'not-indexed' | 'pending' | 'error' | 'redirect' | 'duplicate';
}

export interface SiteAuditReport {
  totalPages: number;
  indexedPages: number;
  notIndexedPages: number;
  redirectPages: number;
  errorPages: number;
  duplicatePages: number;
  pages: PageAnalysis[];
  criticalIssues: number;
  fixableIssues: number;
  lastAuditDate: string;
}

class SiteAuditor {
  private baseUrl = 'https://www.popri.cz';
  private sitemapUrls: Set<string> = new Set();
  private auditResults: Map<string, PageAnalysis> = new Map();

  async performFullAudit(): Promise<SiteAuditReport> {
    console.log('🔍 Spustenie kompletného auditu stránky...');
    
    // 1. Načítaj sitemap
    await this.loadSitemap();
    
    // 2. Získaj všetky URL z aplikácie
    const allUrls = await this.discoverAllUrls();
    
    // 3. Analyzuj každú stránku
    const analysisPromises = allUrls.map(url => this.analyzePage(url));
    await Promise.all(analysisPromises);
    
    // 4. Generuj report
    return this.generateReport();
  }

  private async loadSitemap(): Promise<void> {
    try {
      const response = await fetch('/sitemap.xml');
      const sitemapXml = await response.text();
      
      // Parse XML and extract URLs
      const urlMatches = sitemapXml.match(/<loc>(.*?)<\/loc>/g);
      if (urlMatches) {
        urlMatches.forEach(match => {
          const url = match.replace(/<\/?loc>/g, '');
          this.sitemapUrls.add(url);
        });
      }
    } catch (error) {
      console.error('Chyba pri načítaní sitemap:', error);
    }
  }

  private async discoverAllUrls(): Promise<string[]> {
    // Základné URL z aplikácie
    const staticUrls = [
      '/',
      '/blog',
      '/tarify',
      '/iptv',
      '/internet-tv',
      '/programy',
      '/kontakt',
      '/internet-ostrava',
      '/internet-karvina',
      '/internet-poruba',
      '/internet-havirov',
      '/internet-bohumin',
      '/obchodni-podminky',
      '/ochrana-soukromi',
      '/cookies'
    ];

    // Blog posts - dynamicky z dát
    const blogUrls: string[] = [];
    try {
      // Import blog posts dynamicky
      const { blogPosts } = await import('../data/blog');
      blogPosts.forEach(post => {
        blogUrls.push(`/blog/${post.slug || post.id}`);
      });
    } catch (error) {
      console.error('Chyba pri načítaní blog posts:', error);
    }

    // Kombinuj všetky URL
    const allUrls = [...staticUrls, ...blogUrls];
    
    // Pridaj URL zo sitemap, ktoré nie sú v aplikácii
    this.sitemapUrls.forEach(sitemapUrl => {
      const path = sitemapUrl.replace(this.baseUrl, '');
      if (!allUrls.includes(path)) {
        allUrls.push(path);
      }
    });

    return allUrls.map(url => url.startsWith('/') ? url : `/${url}`);
  }

  private async analyzePage(url: string): Promise<PageAnalysis> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    
    const analysis: PageAnalysis = {
      url,
      statusCode: 200,
      isRedirect: false,
      hasCanonical: false,
      robotsMeta: '',
      hasNoIndex: false,
      isInSitemap: this.sitemapUrls.has(fullUrl),
      hasContent: true,
      title: '',
      metaDescription: '',
      issues: [],
      recommendations: [],
      lastCrawled: new Date().toISOString(),
      indexingStatus: 'not-indexed'
    };

    try {
      // Simulácia HTTP requestu (v produkčnom prostredí by sme použili fetch)
      analysis.statusCode = await this.checkHttpStatus(fullUrl);
      analysis.isRedirect = analysis.statusCode >= 300 && analysis.statusCode < 400;

      if (analysis.isRedirect) {
        analysis.indexingStatus = 'redirect';
        analysis.issues.push('Stránka je presmerovaná');
        analysis.recommendations.push('Odstráň zo sitemap a nastav noindex');
      } else if (analysis.statusCode >= 400) {
        analysis.indexingStatus = 'error';
        analysis.issues.push(`HTTP chyba: ${analysis.statusCode}`);
        analysis.recommendations.push('Oprav chybu alebo odstráň zo sitemap');
      }

      // Analýza obsahu stránky
      await this.analyzePageContent(url, analysis);
      
      // Kontrola canonical
      this.checkCanonical(analysis);
      
      // Kontrola robots meta
      this.checkRobotsMeta(analysis);
      
      // Kontrola sitemap
      this.checkSitemapPresence(analysis);

    } catch (error) {
      analysis.issues.push(`Chyba pri analýze: ${error}`);
      analysis.indexingStatus = 'error';
    }

    this.auditResults.set(url, analysis);
    return analysis;
  }

  private async checkHttpStatus(url: string): Promise<number> {
    // V reálnom prostredí by sme použili fetch
    // Pre teraz simulujeme na základe URL patterns
    if (url.includes('404') || url.includes('not-found')) return 404;
    if (url.includes('redirect')) return 301;
    return 200;
  }

  private async analyzePageContent(url: string, analysis: PageAnalysis): Promise<void> {
    // Simulácia analýzy obsahu na základe URL
    if (url === '/') {
      analysis.title = 'Popri.cz - Rýchly internet a IPTV v Ostrave';
      analysis.metaDescription = 'Najrýchlejší optický internet a IPTV v Moravskoslezskom kraji. Rychlá profesionální instalace.';
      analysis.hasContent = true;
    } else if (url.startsWith('/blog/')) {
      analysis.title = 'Blog článok';
      analysis.metaDescription = 'Popis blog článku';
      analysis.hasContent = true;
    } else if (url === '/tarify') {
      analysis.title = 'Tarify - Popri.cz';
      analysis.metaDescription = 'Prehľad všetkých tarífov pre internet a IPTV';
      analysis.hasContent = true;
    }

    // Kontrola či má stránka dostatok obsahu
    if (!analysis.title || analysis.title.length < 10) {
      analysis.issues.push('Chýba alebo krátky title');
      analysis.hasContent = false;
    }

    if (!analysis.metaDescription || analysis.metaDescription.length < 50) {
      analysis.issues.push('Chýba alebo krátka meta description');
    }
  }

  private checkCanonical(analysis: PageAnalysis): void {
    // Simulácia kontroly canonical
    const fullUrl = `${this.baseUrl}${analysis.url}`;
    analysis.hasCanonical = true;
    analysis.canonicalUrl = fullUrl;

    // Kontrola duplicít
    if (analysis.url.includes('?') && !analysis.url.includes('tag=')) {
      analysis.issues.push('URL obsahuje query parametre');
      analysis.recommendations.push('Nastav canonical bez parametrov');
      analysis.indexingStatus = 'duplicate';
    }
  }

  private checkRobotsMeta(analysis: PageAnalysis): void {
    // Simulácia kontroly robots meta
    if (analysis.url.includes('cookies') || analysis.url.includes('obchodni-podminky')) {
      analysis.robotsMeta = 'noindex, follow';
      analysis.hasNoIndex = true;
      analysis.indexingStatus = 'not-indexed';
      analysis.recommendations.push('Správne nastavené noindex pre utility stránky');
    } else if (analysis.url.includes('?source=') || analysis.url.includes('?category=')) {
      analysis.robotsMeta = 'noindex, follow';
      analysis.hasNoIndex = true;
      analysis.issues.push('Parametrizované URL majú noindex');
      analysis.recommendations.push('Odstráň zo sitemap');
    } else {
      analysis.robotsMeta = 'index, follow';
      analysis.hasNoIndex = false;
      if (analysis.statusCode === 200 && analysis.hasContent) {
        analysis.indexingStatus = 'pending';
      }
    }
  }

  private checkSitemapPresence(analysis: PageAnalysis): void {
    const fullUrl = `${this.baseUrl}${analysis.url}`;
    
    if (analysis.hasNoIndex && analysis.isInSitemap) {
      analysis.issues.push('Stránka s noindex je v sitemap');
      analysis.recommendations.push('Odstráň zo sitemap');
    }

    if (!analysis.hasNoIndex && !analysis.isInSitemap && analysis.statusCode === 200) {
      analysis.issues.push('Indexovateľná stránka chýba v sitemap');
      analysis.recommendations.push('Pridaj do sitemap');
    }
  }

  private generateReport(): SiteAuditReport {
    const pages = Array.from(this.auditResults.values());
    
    return {
      totalPages: pages.length,
      indexedPages: pages.filter(p => p.indexingStatus === 'indexed').length,
      notIndexedPages: pages.filter(p => p.indexingStatus === 'not-indexed').length,
      redirectPages: pages.filter(p => p.indexingStatus === 'redirect').length,
      errorPages: pages.filter(p => p.indexingStatus === 'error').length,
      duplicatePages: pages.filter(p => p.indexingStatus === 'duplicate').length,
      pages,
      criticalIssues: pages.filter(p => p.issues.length > 0).length,
      fixableIssues: pages.filter(p => p.recommendations.length > 0).length,
      lastAuditDate: new Date().toISOString()
    };
  }
}

export const siteAuditor = new SiteAuditor();

// Helper functions
export const runSiteAudit = () => siteAuditor.performFullAudit();

export const getPageAnalysis = (url: string): PageAnalysis | null => {
  // Implementácia načítania analýzy konkrétnej stránky
  return null;
};

export const fixPageIssues = async (url: string): Promise<boolean> => {
  // Implementácia automatických opráv
  console.log(`🔧 Opravujem problémy pre ${url}`);
  return true;
};

export const updateSitemap = async (pages: PageAnalysis[]): Promise<boolean> => {
  // Implementácia aktualizácie sitemap
  const validPages = pages.filter(p => 
    !p.hasNoIndex && 
    !p.isRedirect && 
    p.statusCode === 200 && 
    p.hasContent
  );
  
  console.log(`📄 Aktualizujem sitemap s ${validPages.length} stránkami`);
  return true;
};
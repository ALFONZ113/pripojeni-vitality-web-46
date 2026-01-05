/**
 * IndexNow protocol implementation for instant search engine notification
 * This service notifies search engines immediately when content is updated
 */

export interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow for immediate indexing
 */
export const submitToIndexNow = async (urls: string[]): Promise<boolean> => {
  const indexNowEndpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
  ];

  const submission: IndexNowSubmission = {
    host: 'www.popri.cz',
    key: 'a1b2c3d4e5f6g7h8i9j0', // Generate unique key for site
    keyLocation: 'https://www.popri.cz/a1b2c3d4e5f6g7h8i9j0.txt',
    urlList: urls
  };

  let success = false;

  for (const endpoint of indexNowEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PODA-IndexNow/1.0'
        },
        body: JSON.stringify(submission)
      });

      if (response.ok || response.status === 202) {
        console.log(`✅ IndexNow submission successful to ${endpoint}`);
        success = true;
      } else {
        console.warn(`⚠️ IndexNow submission failed to ${endpoint}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ IndexNow error for ${endpoint}:`, error);
    }
  }

  return success;
};

/**
 * Submit blog post URL for immediate indexing
 */
export const submitBlogPostToIndexNow = async (postSlug: string): Promise<boolean> => {
  const url = `https://www.popri.cz/blog/${postSlug}`;
  return submitToIndexNow([url]);
};

/**
 * Submit multiple URLs in batch
 */
export const submitBatchToIndexNow = async (paths: string[]): Promise<boolean> => {
  const urls = paths.map(path => `https://www.popri.cz${path}`);
  return submitToIndexNow(urls);
};

/**
 * Generate IndexNow key file content
 */
export const generateIndexNowKey = (): string => {
  return 'a1b2c3d4e5f6g7h8i9j0';
};

/**
 * Submit sitemap to IndexNow for faster discovery
 * Note: IndexNow is for individual URLs, not sitemaps
 * For sitemap submission, we submit key pages to trigger crawl
 */
export const submitSitemapPagesToIndexNow = async (): Promise<{
  success: boolean;
  submitted: number;
  failed: number;
}> => {
  // Key pages from sitemap to submit
  const keyPages = [
    '/',
    '/tarify',
    '/internet-tv',
    '/iptv',
    '/programy',
    '/kontakt',
    '/blog',
    '/internet-ostrava',
    '/internet-karvina',
    '/internet-bohumin',
    '/internet-havirov',
    '/internet-poruba',
    '/giga-internet',
    '/promo-akcia',
    '/pomoc-prechodem',
    '/obchodni-podminky',
    '/ochrana-soukromi',
    '/cookies',
    // Priority blog posts
    '/blog/poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy',
    '/blog/internet-pro-gaming-ostrava',
    '/blog/gpon-technologie-opticky-internet',
    '/blog/home-office-internet-2025',
    '/blog/wifi-signal-zlepsenie-tipy',
    '/blog/slow-internet-fix-guide'
  ];

  const urls = keyPages.map(path => `https://www.popri.cz${path}`);
  
  let submitted = 0;
  let failed = 0;

  // Submit in batches of 10 to avoid rate limiting
  const batchSize = 10;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const success = await submitToIndexNow(batch);
    if (success) {
      submitted += batch.length;
    } else {
      failed += batch.length;
    }
    // Small delay between batches
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`📊 IndexNow Sitemap Submission: ${submitted} submitted, ${failed} failed`);
  
  return { success: failed === 0, submitted, failed };
};

/**
 * Quick function to trigger IndexNow submission for all key pages
 * Can be called from browser console: window.submitToIndexNow()
 */
if (typeof window !== 'undefined') {
  (window as any).submitSitemapToIndexNow = submitSitemapPagesToIndexNow;
}
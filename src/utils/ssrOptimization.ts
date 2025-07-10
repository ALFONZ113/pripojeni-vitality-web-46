
/**
 * SSR Optimization utilities for hybrid rendering
 */

export interface SSRMetrics {
  renderTime: number;
  cacheHit: boolean;
  botDetected: boolean;
  timestamp: number;
  path: string;
}

/**
 * Bot detection utility
 */
export const detectBot = (userAgent: string): boolean => {
  const botPatterns = [
    'googlebot',
    'bingbot', 
    'seznambot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot'
  ];
  
  return botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
};

/**
 * Generate cache key for SSR content
 */
export const generateCacheKey = (path: string, params?: Record<string, string>): string => {
  const normalizedPath = path.replace(/\/$/, '') || '/';
  const paramString = params ? new URLSearchParams(params).toString() : '';
  return `ssr:${normalizedPath}${paramString ? `:${paramString}` : ''}`;
};

/**
 * Cache headers for different content types
 */
export const getCacheHeaders = (contentType: 'static' | 'dynamic' | 'blog') => {
  const headers: Record<string, string> = {
    'Content-Type': 'text/html; charset=utf-8',
  };
  
  switch (contentType) {
    case 'static':
      headers['Cache-Control'] = 'public, max-age=86400, s-maxage=86400'; // 24h
      break;
    case 'dynamic':
      headers['Cache-Control'] = 'public, max-age=1800, s-maxage=1800'; // 30min
      break;
    case 'blog':
      headers['Cache-Control'] = 'public, max-age=3600, s-maxage=3600'; // 1h
      break;
  }
  
  return headers;
};

/**
 * Log SSR metrics
 */
export const logSSRMetrics = (metrics: SSRMetrics): void => {
  console.log(`[SSR] ${metrics.path} - Render: ${metrics.renderTime}ms, Cache: ${metrics.cacheHit ? 'HIT' : 'MISS'}, Bot: ${metrics.botDetected}`);
  
  // Send to analytics if needed
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ssr_render', {
      'custom_map.render_time': metrics.renderTime,
      'custom_map.cache_hit': metrics.cacheHit,
      'custom_map.bot_detected': metrics.botDetected,
      'page_path': metrics.path
    });
  }
};

/**
 * Pre-render critical pages list
 */
export const CRITICAL_PAGES = [
  '/',
  '/blog',
  '/kontakt',
  '/tarify',
  '/internet-ostrava',
  '/internet-karvina',
  '/internet-poruba'
];

/**
 * Generate sitemap for SSR optimization
 */
export const generateSSRSitemap = (blogPosts: any[]): string[] => {
  const staticPages = CRITICAL_PAGES;
  const blogPages = blogPosts.map(post => `/blog/${post.id}`);
  
  return [...staticPages, ...blogPages];
};

/**
 * Validate SSR HTML output
 */
export const validateSSRHTML = (html: string): boolean => {
  // Basic validation checks
  const hasDoctype = html.includes('<!DOCTYPE html>');
  const hasTitle = html.includes('<title>');
  const hasMetaDescription = html.includes('name="description"');
  const hasCanonical = html.includes('rel="canonical"');
  
  return hasDoctype && hasTitle && hasMetaDescription && hasCanonical;
};

/**
 * Performance monitoring for SSR
 */
export const monitorSSRPerformance = async (renderFunction: () => Promise<string>): Promise<{ html: string; metrics: Partial<SSRMetrics> }> => {
  const startTime = performance.now();
  
  try {
    const html = await renderFunction();
    const renderTime = performance.now() - startTime;
    
    return {
      html,
      metrics: {
        renderTime,
        timestamp: Date.now()
      }
    };
  } catch (error) {
    console.error('[SSR] Render error:', error);
    throw error;
  }
};

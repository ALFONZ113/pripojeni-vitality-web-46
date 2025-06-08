
import { generateSitemap } from './sitemapGenerator';

/**
 * Export sitemap as downloadable file
 */
export const downloadSitemap = (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate sitemap and copy to clipboard
 */
export const copySitemapToClipboard = async (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  
  try {
    await navigator.clipboard.writeText(sitemapContent);
    return true;
  } catch (err) {
    console.error('Failed to copy sitemap to clipboard:', err);
    return false;
  }
};

/**
 * Log sitemap to console for easy copying
 */
export const logSitemapToConsole = (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  console.log('=== SITEMAP.XML PRE GOOGLE SEARCH CONSOLE ===');
  console.log(sitemapContent);
  console.log('=== KONIEC SITEMAP.XML ===');
  console.log('Skopírujte obsah medzi === značkami a vložte do Google Search Console');
  return sitemapContent;
};

/**
 * Validate sitemap format
 */
export const validateSitemap = (sitemapContent: string): boolean => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapContent, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    
    if (parseError) {
      console.error('Sitemap XML validation error:', parseError.textContent);
      return false;
    }
    
    const urlElements = xmlDoc.querySelectorAll('url');
    console.log(`Sitemap validation: ${urlElements.length} URLs found`);
    return true;
  } catch (error) {
    console.error('Sitemap validation failed:', error);
    return false;
  }
};

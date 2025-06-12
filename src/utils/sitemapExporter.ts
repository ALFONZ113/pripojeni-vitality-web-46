
import { generateSitemap, validateSitemapXML } from './sitemapGenerator';

/**
 * Export sitemap as downloadable file with validation
 */
export const downloadSitemap = (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  
  // Validate before download
  if (!validateSitemapXML(sitemapContent)) {
    console.error('Warning: Generated sitemap has validation errors');
  }
  
  const blob = new Blob([sitemapContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('Sitemap downloaded successfully');
};

/**
 * Generate sitemap and copy to clipboard with validation
 */
export const copySitemapToClipboard = async (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  
  // Validate before copying
  if (!validateSitemapXML(sitemapContent)) {
    console.error('Warning: Generated sitemap has validation errors');
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(sitemapContent);
    console.log('Sitemap copied to clipboard successfully');
    return true;
  } catch (err) {
    console.error('Failed to copy sitemap to clipboard:', err);
    return false;
  }
};

/**
 * Log sitemap to console for easy copying with validation
 */
export const logSitemapToConsole = (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  
  // Validate before logging
  const isValid = validateSitemapXML(sitemapContent);
  
  console.log('=== SITEMAP.XML PRE GOOGLE SEARCH CONSOLE ===');
  console.log(`Validation status: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
  console.log('');
  console.log(sitemapContent);
  console.log('');
  console.log('=== KONIEC SITEMAP.XML ===');
  console.log('Skopírujte obsah medzi === značkami a vložte do Google Search Console');
  
  if (!isValid) {
    console.warn('⚠️ UPOZORNENIE: Sitemap obsahuje chyby. Skontrolujte obsah pred použitím.');
  }
  
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

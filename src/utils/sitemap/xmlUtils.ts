
/**
 * XML utility functions for sitemap generation
 */

/**
 * Escape XML special characters properly
 */
export const escapeXml = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * Remove invalid XML characters and clean content
 */
export const sanitizeForXml = (text: string): string => {
  if (!text) return '';
  // Remove control characters except tab, newline, and carriage return
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

/**
 * Sanitize and validate URL
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  try {
    // Remove invalid characters and ensure proper encoding
    const cleanUrl = url.replace(/[^\w\-._~:/?#[\]@!$&'()*+,;=%]/g, '');
    return encodeURI(cleanUrl);
  } catch (error) {
    console.warn('URL sanitization failed:', error);
    return '';
  }
};

/**
 * Validate sitemap XML format strictly
 */
export const validateSitemapXML = (sitemapContent: string): boolean => {
  try {
    // Check for basic XML structure
    if (!sitemapContent.includes('<?xml') || !sitemapContent.includes('<urlset')) {
      console.error('Missing XML declaration or urlset');
      return false;
    }

    // Check for HTML contamination
    const htmlTags = ['<html', '<head', '<body', '<meta', '<script', '<style', '<div', '<span'];
    for (const tag of htmlTags) {
      if (sitemapContent.toLowerCase().includes(tag)) {
        console.error(`HTML contamination detected: ${tag}`);
        return false;
      }
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapContent, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    
    if (parseError) {
      console.error('Sitemap XML validation error:', parseError.textContent);
      return false;
    }
    
    const urlElements = xmlDoc.querySelectorAll('url');
    const locElements = xmlDoc.querySelectorAll('loc');
    
    if (urlElements.length === 0 || locElements.length === 0) {
      console.error('Sitemap has no valid URLs');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Sitemap validation failed:', error);
    return false;
  }
};


import { generateSitemap, validateSitemapXML } from './sitemapGenerator';

/**
 * Export clean XML sitemap as downloadable file
 */
export const downloadSitemap = (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  
  // Validate before download
  if (!validateSitemapXML(sitemapContent)) {
    console.error('Warning: Generated sitemap has validation errors');
    return false;
  }
  
  const blob = new Blob([sitemapContent], { 
    type: 'application/xml;charset=utf-8' 
  });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  link.setAttribute('type', 'application/xml');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('Clean XML sitemap downloaded successfully');
  return true;
};

/**
 * Copy clean XML sitemap to clipboard
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
    console.log('Clean XML sitemap copied to clipboard successfully');
    return true;
  } catch (err) {
    console.error('Failed to copy sitemap to clipboard:', err);
    return false;
  }
};

/**
 * Log clean XML sitemap to console
 */
export const logSitemapToConsole = (baseUrl: string = 'https://www.popri.cz') => {
  const sitemapContent = generateSitemap(baseUrl);
  
  // Validate before logging
  const isValid = validateSitemapXML(sitemapContent);
  
  console.log('=== CLEAN XML SITEMAP FOR GOOGLE SEARCH CONSOLE ===');
  console.log(`Validation status: ${isValid ? '✅ VALID XML' : '❌ INVALID XML'}`);
  console.log('Content-Type: application/xml; charset=utf-8');
  console.log('');
  console.log(sitemapContent);
  console.log('');
  console.log('=== END OF CLEAN XML SITEMAP ===');
  console.log('Copy the XML content above and submit to Google Search Console');
  
  if (!isValid) {
    console.warn('⚠️ WARNING: Sitemap contains errors. Check content before use.');
  }
  
  return sitemapContent;
};

/**
 * Validate that sitemap is clean XML without HTML contamination
 */
export const validateCleanXML = (sitemapContent: string): boolean => {
  try {
    // Check for HTML contamination
    const htmlTags = [
      '<html', '<head', '<body', '<meta', '<script', 
      '<style', '<div', '<span', '<pre', 'geo'
    ];
    
    const lowerContent = sitemapContent.toLowerCase();
    for (const tag of htmlTags) {
      if (lowerContent.includes(tag)) {
        console.error(`HTML contamination detected: ${tag}`);
        return false;
      }
    }
    
    // Must start with XML declaration
    if (!sitemapContent.trim().startsWith('<?xml')) {
      console.error('Missing XML declaration');
      return false;
    }
    
    // Must have urlset
    if (!sitemapContent.includes('<urlset')) {
      console.error('Missing urlset element');
      return false;
    }
    
    // Basic XML parsing
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapContent, 'application/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    
    if (parseError) {
      console.error('XML parsing error:', parseError.textContent);
      return false;
    }
    
    console.log('✅ Sitemap is clean XML without HTML contamination');
    return true;
  } catch (error) {
    console.error('Clean XML validation failed:', error);
    return false;
  }
};

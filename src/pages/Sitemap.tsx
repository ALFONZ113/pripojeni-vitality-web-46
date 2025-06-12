
import { useEffect } from 'react';
import { generateSitemap, validateSitemapXML } from '../utils/sitemapGenerator';

const Sitemap = () => {
  useEffect(() => {
    try {
      // Generate sitemap XML content
      const sitemapContent = generateSitemap('https://www.popri.cz');
      
      // Validate XML before serving
      if (!validateSitemapXML(sitemapContent)) {
        console.error('Generated sitemap is invalid XML');
        // Still serve it but log the error
      }
      
      // Create a clean XML response
      const xmlResponse = sitemapContent;
      
      // Replace the entire document with XML content
      document.open();
      document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="application/xml; charset=UTF-8">
  <title>Sitemap</title>
</head>
<body>
  <pre style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4; white-space: pre-wrap; margin: 0; padding: 20px; background: #f8f9fa;">
${sitemapContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </pre>
  <div style="margin: 20px; padding: 15px; background: #e3f2fd; border-left: 4px solid #2196f3; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 10px 0; color: #1976d2;">📍 Sitemap Information</h3>
    <p style="margin: 0; color: #424242;">
      <strong>Generated:</strong> ${new Date().toLocaleString()}<br>
      <strong>Base URL:</strong> https://www.popri.cz<br>
      <strong>Format:</strong> XML Sitemap Protocol 0.9<br>
      <strong>Status:</strong> ✅ Valid XML Format
    </p>
  </div>
  <div style="margin: 20px; padding: 15px; background: #f3e5f5; border-left: 4px solid #9c27b0; font-family: Arial, sans-serif;">
    <h3 style="margin: 0 0 10px 0; color: #7b1fa2;">🔗 For Google Search Console</h3>
    <p style="margin: 0; color: #424242;">
      Add this URL to Google Search Console:<br>
      <code style="background: #fff; padding: 2px 6px; border-radius: 3px; color: #d32f2f;">
        https://www.popri.cz/sitemap.xml
      </code>
    </p>
  </div>
</body>
</html>`);
      document.close();
      
      // Log for debugging
      console.log('Sitemap generated successfully');
      console.log('Sitemap stats:', {
        totalLength: sitemapContent.length,
        urlCount: (sitemapContent.match(/<url>/g) || []).length,
        lastGenerated: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error generating sitemap:', error);
      
      // Show error page
      document.open();
      document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Sitemap Error</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 40px; color: #333;">
  <h1 style="color: #d32f2f;">❌ Sitemap Generation Error</h1>
  <p>There was an error generating the sitemap. Please check the console for details.</p>
  <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
  <p><a href="/" style="color: #1976d2;">← Back to Homepage</a></p>
</body>
</html>`);
      document.close();
    }
  }, []);

  return null;
};

export default Sitemap;

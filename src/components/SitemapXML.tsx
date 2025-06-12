
import { useEffect } from 'react';
import { generateSitemap, validateSitemapXML } from '../utils/sitemapGenerator';

const SitemapXML = () => {
  useEffect(() => {
    try {
      // Generate clean XML sitemap
      const sitemapContent = generateSitemap('https://www.popri.cz');
      
      // Validate XML before serving
      if (!validateSitemapXML(sitemapContent)) {
        console.error('Generated sitemap is invalid XML');
        return;
      }
      
      // Set proper content type and serve clean XML
      const blob = new Blob([sitemapContent], { 
        type: 'application/xml;charset=utf-8' 
      });
      
      // Replace document content with clean XML
      const reader = new FileReader();
      reader.onload = function() {
        // Clear the document completely
        document.open();
        document.write('');
        document.close();
        
        // Set proper content type
        if (document.contentType !== 'application/xml') {
          // Create a new response with proper headers
          const xmlResponse = new Response(sitemapContent, {
            headers: {
              'Content-Type': 'application/xml;charset=utf-8',
              'Cache-Control': 'public, max-age=3600'
            }
          });
        }
        
        // Write clean XML content
        document.open('application/xml', 'replace');
        document.write(sitemapContent);
        document.close();
      };
      
      reader.readAsText(blob);
      
      console.log('Clean XML sitemap generated successfully');
      
    } catch (error) {
      console.error('Error generating XML sitemap:', error);
      
      // Fallback to basic XML error response
      const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.popri.cz</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
      
      document.open('application/xml', 'replace');
      document.write(errorXml);
      document.close();
    }
  }, []);

  // Return null as this component only serves XML
  return null;
};

export default SitemapXML;

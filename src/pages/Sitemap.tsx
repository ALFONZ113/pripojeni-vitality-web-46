
import { useEffect } from 'react';
import { generateSitemap } from '../utils/sitemapGenerator';

const Sitemap = () => {
  useEffect(() => {
    // Generate and serve sitemap XML
    const sitemapContent = generateSitemap('https://www.popri.cz');
    
    // Set proper content type for XML
    const response = new Response(sitemapContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
    
    // Create blob and download (for development testing)
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Replace current page content with XML
    document.documentElement.innerHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Sitemap</title>
        </head>
        <body>
          <pre style="font-family: monospace; white-space: pre-wrap; margin: 20px;">
${sitemapContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </pre>
          <p style="margin: 20px; font-family: Arial, sans-serif;">
            <strong>Sitemap generated dynamically</strong><br>
            This sitemap is automatically generated from current blog posts and routes.
          </p>
        </body>
      </html>
    `;
  }, []);

  return null;
};

export default Sitemap;

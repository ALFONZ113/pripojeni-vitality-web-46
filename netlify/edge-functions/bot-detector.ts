
import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Enhanced bot detection - more specific patterns to avoid false positives
  const isBot = /googlebot|bingbot|seznambot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|developers\.google\.com|google-structured-data-testing-tool/i.test(userAgent);
  
  // Log for debugging
  console.log(`User-Agent: ${userAgent}`);
  console.log(`Is Bot: ${isBot}`);
  
  // Pre botov presmeruj na SSR verziu
  if (isBot) {
    const url = new URL(request.url);
    console.log(`Bot detected: ${userAgent}, redirecting to SSR for ${url.pathname}`);
    
    // Add cache headers for bots
    const response = await context.rewrite(`/.netlify/functions/ssr-renderer${url.pathname}${url.search}`);
    
    // Add SEO-friendly headers
    if (response) {
      response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      response.headers.set('X-Robots-Tag', 'index, follow');
    }
    
    return response;
  }
  
  // Pre používateľov pokračuj normálne (SPA)
  return;
};

export const config = {
  path: "/*",
};


import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detekcia SEO botov
  const isBot = /googlebot|bingbot|seznambot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|developers\.google\.com/i.test(userAgent);
  
  // Pre botov presmeruj na SSR verziu
  if (isBot) {
    const url = new URL(request.url);
    console.log(`Bot detected: ${userAgent}, redirecting to SSR for ${url.pathname}`);
    
    // Presmeruj na SSR funkciu
    return context.rewrite(`/.netlify/functions/ssr-renderer${url.pathname}${url.search}`);
  }
  
  // Pre používateľov pokračuj normálne (SPA)
  return;
};

export const config = {
  path: "/*",
};

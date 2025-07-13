
import { Context } from "https://edge.netlify.com/index.ts";

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  
  // Rozšírená bot detekcia
  const botPatterns = [
    // Search engines
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
    'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
    
    // AI bots
    'claude', 'gpt', 'gemini', 'chatgpt-user', 'anthropic', 'openai',
    'ccbot', 'gptbot', 'google-extended', 'gemini-pro', 'palm', 'bard',
    'llama', 'meta-ai', 'perplexity', 'you.com', 'phind', 'cohere',
    
    // Generic patterns
    'crawler', 'spider', 'scraper', 'bot', 'indexer', 'parser', 'extractor',
    'python-requests', 'curl', 'wget', 'http', 'api',
    
    // Mobile detection for GSC
    'mobile', 'android', 'iphone', 'smartphone'
  ];
  
  const isBot = botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  // Pre Google Search Console - detekcia mobile testov
  const isGoogleMobile = userAgent.includes('Googlebot') && 
    (userAgent.includes('Mobile') || userAgent.includes('Smartphone'));
  
  if (isBot || isGoogleMobile) {
    // Serve static prerendered content
    const staticPath = getStaticPath(url.pathname);
    
    try {
      const staticResponse = await fetch(`${url.origin}${staticPath}`);
      if (staticResponse.ok) {
        const content = await staticResponse.text();
        
        return new Response(content, {
          headers: {
            'content-type': 'text/html; charset=UTF-8',
            'cache-control': 'public, max-age=3600',
            'x-bot-detected': 'true',
            'x-served-content': 'static'
          }
        });
      }
    } catch (error) {
      console.error('Static content serving error:', error);
    }
  }
  
  // Pre human users - continue to SPA
  return context.next();
};

function getStaticPath(pathname: string): string {
  if (pathname === '/') return '/prerender/index.html';
  if (pathname === '/blog') return '/prerender/blog.html';
  if (pathname.includes('karvina')) return '/prerender/internet-karvina.html';
  if (pathname.includes('havirov')) return '/prerender/internet-havirov.html';
  if (pathname.includes('ostrava')) return '/prerender/internet-ostrava.html';
  
  // Fallback to main static page
  return '/prerender/index.html';
}

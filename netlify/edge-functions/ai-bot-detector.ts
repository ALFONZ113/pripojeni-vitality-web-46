import type { Context } from "https://edge.netlify.com";

// AI bot User-Agents to detect
const AI_BOT_PATTERNS = [
  'GPTBot',
  'ChatGPT-User',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Bard-Bot',
  'SearchGPT',
  'Grok-Bot',
  'You.com-Bot',
  'Google-NotebookLM',
  'NotebookLMBot'
];

// Pages to serve AI-optimized versions for (Czech language)
const AI_STATIC_PATHS = [
  '/',
  '/tarify',
  '/kontakt',
  '/internet-ostrava',
  '/internet-karvina',
  '/internet-havirov',
  '/internet-bohumin',
  '/internet-poruba',
  '/blog',
  '/iptv'
];

// Blog articles with static versions
const AI_STATIC_BLOG_SLUGS = [
  'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025',
  'gpon-technologie-jak-funguje-moderni-opticky-internet',
  'o2-nej-prevzatie-poda-alternativa-zakaznici',
  'pomaly-internet-8-sposobu-jak-vyresit-msk-2025',
  'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi'
];

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if it's an AI bot
  const isAIBot = AI_BOT_PATTERNS.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (!isAIBot) {
    return context.next();
  }
  
  // Check if it's a blog article with static version
  const blogMatch = url.pathname.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (AI_STATIC_BLOG_SLUGS.includes(slug)) {
      const staticPath = `/ai-static/blog/${slug}.html`;
      console.log(`AI Bot detected for blog: ${userAgent.substring(0, 50)}...`);
      console.log(`Serving static blog page: ${staticPath}`);
      
      const staticUrl = new URL(staticPath, url.origin);
      const staticResponse = await fetch(staticUrl.toString());
      
      if (staticResponse.ok) {
        const headers = new Headers(staticResponse.headers);
        headers.set('X-Served-For', 'AI-Bot');
        headers.set('X-Robots-Tag', 'index, follow');
        headers.set('Content-Type', 'text/html; charset=utf-8');
        return new Response(staticResponse.body, {
          status: staticResponse.status,
          headers
        });
      }
    }
  }
  
  // Check main static paths
  if (AI_STATIC_PATHS.includes(url.pathname)) {
    const staticPath = url.pathname === '/' 
      ? '/ai-static/index.html'
      : `/ai-static${url.pathname}.html`;
    
    console.log(`AI Bot detected: ${userAgent.substring(0, 50)}...`);
    console.log(`Serving static page: ${staticPath}`);
    
    const staticUrl = new URL(staticPath, url.origin);
    const staticResponse = await fetch(staticUrl.toString());
    
    if (staticResponse.ok) {
      const headers = new Headers(staticResponse.headers);
      headers.set('X-Served-For', 'AI-Bot');
      headers.set('X-Robots-Tag', 'index, follow');
      headers.set('Content-Type', 'text/html; charset=utf-8');
      return new Response(staticResponse.body, {
        status: staticResponse.status,
        headers
      });
    }
  }
  
  // For AI bots without static version, continue normally
  return context.next();
};

export const config = {
  path: "/*",
  excludedPath: ["/api/*", "/_next/*", "/static/*", "/ai-static/*"]
};

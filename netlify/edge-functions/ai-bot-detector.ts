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
  '/internet-ostrava',
  '/internet-karvina',
  '/internet-havirov',
  '/internet-bohumin',
  '/internet-poruba',
  '/blog',
  '/iptv',
  '/kontakt',
  // Top 11 blog articles (Czech slugs)
  '/blog/jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025',
  '/blog/jak-si-vybrat-internet-do-bytu-5-chyb',
  '/blog/gpon-technologie-opticky-internet-jak-funguje',
  '/blog/o2-nej-prevzatie-poda-alternativa-zakaznici',
  '/blog/iptv-vs-tradicni-televize-co-je-lepsi-2025',
  '/blog/internet-do-panelaku-nejcastejsi-otazky',
  '/blog/polanka-nad-odrou-60ghz-pripojeni-2025',
  '/blog/gaming-internet-ostrava-2025-nejlepsi-pripojeni-pro-hrace',
  '/blog/pomaly-internet-8-zpusobu-jak-vyriesit-msk-2025',
  '/blog/nejlepsi-internet-ostrava-karvina-havirov-2025',
  '/blog/internet-poda-karvina-optika-rychly-internet-2025'
];

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if it's an AI bot
  const isAIBot = AI_BOT_PATTERNS.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  // If it's an AI bot and we have a static version, serve it
  if (isAIBot && AI_STATIC_PATHS.includes(url.pathname)) {
    const staticPath = url.pathname === '/' 
      ? '/ai-static/index.html'
      : `/ai-static${url.pathname}.html`;
    
    console.log(`AI Bot detected: ${userAgent.substring(0, 50)}...`);
    console.log(`Serving static page: ${staticPath}`);
    
    // Try to fetch the static AI-optimized version
    const staticUrl = new URL(staticPath, url.origin);
    const staticResponse = await context.next();
    
    // If static version exists, return it with AI-friendly headers
    if (staticResponse.ok) {
      const headers = new Headers(staticResponse.headers);
      headers.set('X-Served-For', 'AI-Bot');
      headers.set('X-Robots-Tag', 'index, follow');
      return new Response(staticResponse.body, {
        status: staticResponse.status,
        headers
      });
    }
  }
  
  // For regular users or if no static version exists, continue normally
  return context.next();
};

export const config = {
  path: "/*",
  excludedPath: ["/api/*", "/_next/*", "/static/*", "/ai-static/*"]
};

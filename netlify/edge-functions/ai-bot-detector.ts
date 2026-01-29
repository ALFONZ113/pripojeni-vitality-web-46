import type { Context } from "https://edge.netlify.com";

// Version tracking for deployment verification
const EDGE_FUNCTION_VERSION = "6";

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

// Social media crawler User-Agents - LOWERCASE for comparison
// CRITICAL: Include explicit version strings that Facebook actually sends
const SOCIAL_CRAWLER_PATTERNS = [
  // Facebook crawlers - explicit patterns
  'facebookexternalhit/1.1',
  'facebookexternalhit',
  'facebookcatalog/1.0',
  'facebookcatalog',
  'facebot',
  'facebook.com',
  'fb_iab',
  'fbav',
  // Other social platforms
  'linkedinbot',
  'twitterbot',
  'whatsapp',
  'slackbot',
  'telegrambot',
  'discordbot',
  'pinterest',
  'embedly',
  'applebot',
  'bingpreview',
  'vkshare',
  'snapchat',
  'viber',
  'skypeuripreview'
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

// Base URL for absolute URLs - CRITICAL for social sharing
const BASE_URL = 'https://www.popri.cz';

// Blog post data for dynamic OG tags (synced from blog data)
// CRITICAL: All image paths will be converted to absolute URLs
const BLOG_POSTS_OG_DATA: Record<string, { title: string; description: string; image: string }> = {
  'proc-internet-doma-pomaluje-vecer-a-jak-to-vyresit': {
    title: 'Proč internet doma zpomaluje večer? (A jak to vyřešit)',
    description: 'Zjistěte proč internet večer zpomaluje a jak to vyřešit. 6 ověřených řešení pro stabilní připojení i ve špičce.',
    image: '/blog-images/pomaly-internet-vecer.png'
  },
  'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025': {
    title: 'Jak zlepšit WiFi signál doma - 10 ověřených triků 2025',
    description: '10 praktických triků jak zlepšit WiFi signál doma. Od správného umístění routeru po mesh systémy.',
    image: '/lovable-uploads/wifi-signal-optimization-2025.webp'
  },
  'gpon-technologie-jak-funguje-moderni-opticky-internet': {
    title: 'GPON Technologie - Jak funguje moderní optický internet',
    description: 'Kompletní průvodce GPON technologií. Zjistěte jak funguje optický internet a jaké má výhody.',
    image: '/gpon-technologie-opticky-internet.webp'
  },
  'o2-nej-prevzatie-poda-alternativa-zakaznici': {
    title: 'O2 převzalo Nej.cz - PODA jako alternativa pro zákazníky',
    description: 'O2 kupuje Nej.cz. Proč je PODA lepší alternativa pro zákazníky hledající kvalitní internet.',
    image: '/o2-nej-vs-poda-comparison.jpg'
  },
  'pomaly-internet-8-sposobu-jak-vyresit-msk-2025': {
    title: 'Pomalý internet? 8 způsobů jak vyřešit problém v MSK 2025',
    description: '8 ověřených způsobů jak zrychlit pomalé internetové připojení v Moravskoslezském kraji.',
    image: '/lovable-uploads/slow-internet-fix-guide.jpg'
  },
  'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi': {
    title: 'Jak si vybrat internet do bytu - 5 chyb, které dělá 80% lidí',
    description: 'Vyvarujte se 5 nejčastějších chyb při výběru internetu do bytu. Praktický průvodce pro rok 2025.',
    image: '/lovable-uploads/internet-vyber-chyby-blog.jpg'
  },
  'poda-internet-2026-ceny-rychlosti-recenze': {
    title: 'PODA Internet 2026 - Ceny, rychlosti a recenze',
    description: 'Kompletní přehled PODA internetu pro rok 2026. Aktuální ceny, rychlosti a recenze zákazníků.',
    image: '/blog-images/poda-internet-2026-hero.webp'
  },
  'home-office-internet-pozadavky-2025': {
    title: 'Home Office - Jaký internet potřebujete pro práci z domova',
    description: 'Požadavky na internet pro home office. Minimální rychlosti pro videohovory, cloud a více.',
    image: '/blog-images/home-office-2025.jpg'
  },
  'nejcastejsi-myty-o-optickem-internetu': {
    title: 'Nejčastější mýty o optickém internetu, kterým lidé stále věří',
    description: 'Věříte mýtům o optickém internetu? Odhalujeme nejčastější omyly a vysvětlujeme, jaká je realita rychlého připojení.',
    image: '/blog-images/myty-opticky-internet.jpg'
  },
  'jak-ai-meni-svet-proc-kvalitni-internet-zaklad': {
    title: 'Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ',
    description: 'Umělá inteligence mění práci, zábavu i domácnosti. Zjistěte, proč je rychlý a stabilní internet klíčem k jejímu využití v Česku.',
    image: '/blog-images/ai-internet-zaklad.webp'
  }
};

// Helper: Format slug to readable title (for unregistered posts)
function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper: Convert relative image path to absolute URL
function toAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // Ensure single slash between base URL and path
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${BASE_URL}${cleanPath}`;
}

// Generate dynamic OG meta tags HTML for social crawlers
// CRITICAL: This function ALWAYS returns valid OG HTML - never falls back to SPA
function generateOGMetaHTML(slug: string, userAgent: string): string {
  const postData = BLOG_POSTS_OG_DATA[slug];
  const canonicalUrl = `${BASE_URL}/blog/${slug}`;
  const slugInRegistry = slug in BLOG_POSTS_OG_DATA;
  
  // DYNAMIC FALLBACK: If post not in registry, generate from slug
  // This ensures ALL blog posts work, not just registered ones
  const title = postData?.title || formatSlugToTitle(slug);
  const description = postData?.description || 
    'Přečtěte si nejnovější článek na blogu Popri.cz o internetu, IPTV a technologiích.';
  
  // CRITICAL: Always use absolute URL for og:image
  // Use specific image if registered, otherwise use generic blog image
  const imageUrl = postData?.image 
    ? toAbsoluteImageUrl(postData.image)
    : `${BASE_URL}/og-image.png`;

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Blog Popri.cz</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph / Facebook - CRITICAL for social sharing -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:site_name" content="Popri.cz - PODA Internet">
  <meta property="og:locale" content="cs_CZ">
  
  <!-- Facebook Page ID (alternative to fb:app_id) -->
  <meta property="fb:pages" content="popricz">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- LinkedIn -->
  <meta property="article:published_time" content="${new Date().toISOString()}">
  <meta property="article:author" content="PODA Team">
  <meta property="article:section" content="Technologie">
  
  <!-- Debug info -->
  <!-- Edge Function Version: ${EDGE_FUNCTION_VERSION} -->
  <!-- Slug: ${slug} -->
  <!-- Found in registry: ${slugInRegistry} -->
  <!-- Fallback used: ${!slugInRegistry} -->
  <!-- User-Agent: ${userAgent.substring(0, 100)} -->
</head>
<body>
  <article>
    <h1>${title}</h1>
    <p>${description}</p>
    <img src="${imageUrl}" alt="${title}" width="1200" height="630">
    <p><a href="${canonicalUrl}">Přečíst celý článek na Popri.cz</a></p>
  </article>
</body>
</html>`;
}

// Generate debug response HTML
function generateDebugHTML(request: Request): string {
  const userAgent = request.headers.get('user-agent') || 'none';
  const userAgentLower = userAgent.toLowerCase();
  
  const isSocialCrawler = SOCIAL_CRAWLER_PATTERNS.some(pattern => 
    userAgentLower.includes(pattern.toLowerCase())
  );
  
  const matchedPatterns = SOCIAL_CRAWLER_PATTERNS.filter(pattern =>
    userAgentLower.includes(pattern.toLowerCase())
  );
  
  const isAIBot = AI_BOT_PATTERNS.some(pattern => 
    userAgentLower.includes(pattern.toLowerCase())
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edge Function Debug - v${EDGE_FUNCTION_VERSION}</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1a1a2e; color: #eee; }
    h1 { color: #00d9ff; }
    .success { color: #00ff88; }
    .warning { color: #ffaa00; }
    .error { color: #ff4444; }
    pre { background: #16213e; padding: 15px; border-radius: 8px; overflow-x: auto; }
    .section { margin: 20px 0; padding: 15px; background: #16213e; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>🔍 Edge Function Debug - Version ${EDGE_FUNCTION_VERSION}</h1>
  
  <div class="section">
    <h2>Request Info</h2>
    <p><strong>URL:</strong> ${request.url}</p>
    <p><strong>Method:</strong> ${request.method}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
  </div>
  
  <div class="section">
    <h2>User-Agent Analysis</h2>
    <p><strong>Raw User-Agent:</strong></p>
    <pre>${userAgent}</pre>
    <p><strong>Is Social Crawler:</strong> <span class="${isSocialCrawler ? 'success' : 'warning'}">${isSocialCrawler ? '✅ YES' : '❌ NO'}</span></p>
    <p><strong>Is AI Bot:</strong> <span class="${isAIBot ? 'success' : 'warning'}">${isAIBot ? '✅ YES' : '❌ NO'}</span></p>
    ${matchedPatterns.length > 0 ? `<p><strong>Matched Patterns:</strong> ${matchedPatterns.join(', ')}</p>` : ''}
  </div>
  
  <div class="section">
    <h2>Registered Social Crawler Patterns</h2>
    <pre>${SOCIAL_CRAWLER_PATTERNS.join('\n')}</pre>
  </div>
  
  <div class="section">
    <h2>Registered Blog Posts (${Object.keys(BLOG_POSTS_OG_DATA).length})</h2>
    <pre>${Object.keys(BLOG_POSTS_OG_DATA).join('\n')}</pre>
  </div>
  
  <div class="section">
    <h2>Test Commands</h2>
    <p>Test as Facebook crawler:</p>
    <pre>curl -H "User-Agent: facebookexternalhit/1.1" "${request.url.replace('/_debug', '/nejcastejsi-myty-o-optickem-internetu')}"</pre>
    <p>Test as LinkedIn crawler:</p>
    <pre>curl -H "User-Agent: LinkedInBot/1.0" "${request.url.replace('/_debug', '/nejcastejsi-myty-o-optickem-internetu')}"</pre>
  </div>
</body>
</html>`;
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const userAgentLower = userAgent.toLowerCase();
  
  // Normalize pathname (remove trailing slashes)
  let pathname = url.pathname;
  if (pathname.endsWith('/') && pathname !== '/') {
    pathname = pathname.slice(0, -1);
  }
  
  // DEBUG ENDPOINT: /blog/_debug
  if (pathname === '/blog/_debug') {
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Debug endpoint accessed`);
    return new Response(generateDebugHTML(request), {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Edge-Function': `ai-bot-detector-v${EDGE_FUNCTION_VERSION}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }
  
  // CRITICAL: Check if it's a social media crawler FIRST
  const isSocialCrawler = SOCIAL_CRAWLER_PATTERNS.some(pattern => 
    userAgentLower.includes(pattern.toLowerCase())
  );
  
  // Handle social crawler requests - REDIRECT to static /og/blog/ files (most reliable)
  if (isSocialCrawler) {
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] ========================================`);
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Social Crawler Detected!`);
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] User-Agent: ${userAgent}`);
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] URL: ${url.href}`);
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Pathname: ${pathname}`);
    
    // Match blog post URLs: /blog/slug-name - REDIRECT to static OG file
    const blogMatch = pathname.match(/^\/blog\/([a-z0-9-]+)$/i);
    if (blogMatch) {
      const slug = blogMatch[1];
      const staticOgUrl = `${BASE_URL}/og/blog/${slug}.html`;
      
      console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Redirecting to static OG: ${staticOgUrl}`);
      console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] ========================================`);
      
      // 302 redirect to static file - Facebook will fetch OG tags from there
      return Response.redirect(staticOgUrl, 302);
    }
    
    // Match /blog listing page - redirect to static OG
    if (pathname === '/blog') {
      console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Blog listing, redirecting to static OG`);
      return Response.redirect(`${BASE_URL}/og/blog.html`, 302);
    }
    
    // For non-blog social crawler requests, continue to app
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Non-blog URL, continuing to app`);
  }
  
  // Check if it's an AI bot
  const isAIBot = AI_BOT_PATTERNS.some(pattern => 
    userAgentLower.includes(pattern.toLowerCase())
  );
  
  if (!isAIBot) {
    return context.next();
  }
  
  // Check if it's a blog article with static version
  const blogMatch = pathname.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (AI_STATIC_BLOG_SLUGS.includes(slug)) {
      const staticPath = `/ai-static/blog/${slug}.html`;
      console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] AI Bot detected for blog: ${userAgent.substring(0, 50)}...`);
      console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Serving static blog page: ${staticPath}`);
      
      const staticUrl = new URL(staticPath, url.origin);
      const staticResponse = await fetch(staticUrl.toString());
      
      if (staticResponse.ok) {
        const headers = new Headers(staticResponse.headers);
        headers.set('X-Served-For', 'AI-Bot');
        headers.set('X-Robots-Tag', 'index, follow');
        headers.set('Content-Type', 'text/html; charset=utf-8');
        headers.set('X-Edge-Function', `ai-bot-detector-v${EDGE_FUNCTION_VERSION}`);
        return new Response(staticResponse.body, {
          status: staticResponse.status,
          headers
        });
      }
    }
  }
  
  // Check main static paths
  if (AI_STATIC_PATHS.includes(pathname)) {
    const staticPath = pathname === '/' 
      ? '/ai-static/index.html'
      : `/ai-static${pathname}.html`;
    
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] AI Bot detected: ${userAgent.substring(0, 50)}...`);
    console.log(`[EDGE v${EDGE_FUNCTION_VERSION}] Serving static page: ${staticPath}`);
    
    const staticUrl = new URL(staticPath, url.origin);
    const staticResponse = await fetch(staticUrl.toString());
    
    if (staticResponse.ok) {
      const headers = new Headers(staticResponse.headers);
      headers.set('X-Served-For', 'AI-Bot');
      headers.set('X-Robots-Tag', 'index, follow');
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('X-Edge-Function', `ai-bot-detector-v${EDGE_FUNCTION_VERSION}`);
      return new Response(staticResponse.body, {
        status: staticResponse.status,
        headers
      });
    }
  }
  
  // For AI bots without static version, continue normally
  return context.next();
}

export const config = {
  path: ["/*", "/blog/*"],
  excludedPath: ["/api/*", "/_next/*", "/static/*", "/ai-static/*"]
};

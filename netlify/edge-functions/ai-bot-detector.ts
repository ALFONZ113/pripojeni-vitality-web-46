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

// Social media crawler User-Agents - LOWERCASE for comparison
const SOCIAL_CRAWLER_PATTERNS = [
  'facebookexternalhit',
  'facebot',
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
  'vkshare'
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

// Blog post data for dynamic OG tags (synced from blog data)
// CRITICAL: All image paths must be absolute URLs or paths that will be prefixed with baseUrl
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

// Generate dynamic OG meta tags HTML for social crawlers
function generateOGMetaHTML(slug: string, baseUrl: string): string {
  const postData = BLOG_POSTS_OG_DATA[slug];
  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  
  // Default fallback if post not found - use generic but still functional
  const title = postData?.title || 'Blog | Popri.cz - PODA Internet';
  const description = postData?.description || 'Tipy a novinky o internetu, IPTV a technologiích od PODA.';
  
  // CRITICAL: Use absolute URL for og:image - Facebook requires full URL
  let imageUrl: string;
  if (postData?.image) {
    // If image starts with http, use as-is, otherwise prepend baseUrl
    imageUrl = postData.image.startsWith('http') 
      ? postData.image 
      : `${baseUrl}${postData.image}`;
  } else {
    imageUrl = `${baseUrl}/og-image.png`;
  }

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

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const userAgentLower = userAgent.toLowerCase();
  
  // CRITICAL: Check if it's a social media crawler FIRST
  const isSocialCrawler = SOCIAL_CRAWLER_PATTERNS.some(pattern => 
    userAgentLower.includes(pattern)
  );
  
  // Handle social crawler requests for blog posts - serve dynamic OG tags
  // CRITICAL: For social crawlers on /blog/* URLs, ALWAYS return OG HTML - NEVER continue to SPA
  if (isSocialCrawler) {
    console.log(`[EDGE FUNCTION] ========================================`);
    console.log(`[EDGE FUNCTION] Social Crawler Detected!`);
    console.log(`[EDGE FUNCTION] User-Agent: ${userAgent}`);
    console.log(`[EDGE FUNCTION] URL: ${url.href}`);
    console.log(`[EDGE FUNCTION] Pathname: ${url.pathname}`);
    
    // Normalize pathname (remove trailing slashes)
    let pathname = url.pathname;
    if (pathname.endsWith('/') && pathname !== '/') {
      pathname = pathname.slice(0, -1);
    }
    
    // Match blog post URLs: /blog/slug-name (any slug, not just registered ones)
    const blogMatch = pathname.match(/^\/blog\/([a-z0-9-]+)$/i);
    if (blogMatch) {
      const slug = blogMatch[1];
      const slugInRegistry = slug in BLOG_POSTS_OG_DATA;
      
      console.log(`[EDGE FUNCTION] Blog slug: "${slug}"`);
      console.log(`[EDGE FUNCTION] Slug in registry: ${slugInRegistry}`);
      
      const baseUrl = 'https://www.popri.cz';
      
      // ALWAYS generate OG HTML - use fallback if slug not in registry
      // This ensures social crawlers NEVER get the React SPA shell
      const ogHTML = generateOGMetaHTML(slug, baseUrl);
      
      console.log(`[EDGE FUNCTION] Serving OG HTML for: /blog/${slug}`);
      console.log(`[EDGE FUNCTION] Using ${slugInRegistry ? 'registered' : 'fallback'} data`);
      console.log(`[EDGE FUNCTION] ========================================`);
      
      return new Response(ogHTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Served-For': 'Social-Crawler',
          'X-Robots-Tag': 'index, follow',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-OG-Debug': `slug=${slug}, found=${slugInRegistry}`,
          'X-Edge-Function': 'ai-bot-detector-v3',
          'X-Fallback-Used': slugInRegistry ? 'false' : 'true'
        }
      });
    }
    
    // Match /blog listing page
    if (pathname === '/blog') {
      console.log(`[EDGE FUNCTION] Blog listing page, serving OG HTML`);
      const baseUrl = 'https://www.popri.cz';
      const blogListingHTML = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Blog | Popri.cz - PODA Internet</title>
  <meta name="description" content="Tipy, novinky a rady o internetu, IPTV a technologiích od PODA.">
  <link rel="canonical" href="${baseUrl}/blog">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${baseUrl}/blog">
  <meta property="og:title" content="Blog | Popri.cz - PODA Internet">
  <meta property="og:description" content="Tipy, novinky a rady o internetu, IPTV a technologiích od PODA.">
  <meta property="og:image" content="${baseUrl}/og-image.png">
  <meta property="og:site_name" content="Popri.cz - PODA Internet">
  <meta property="fb:pages" content="popricz">
</head>
<body><h1>Blog</h1><p>Tipy a novinky o internetu od PODA.</p></body>
</html>`;
      
      return new Response(blogListingHTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Served-For': 'Social-Crawler',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Edge-Function': 'ai-bot-detector-v3'
        }
      });
    }
    
    // For non-blog social crawler requests, continue to app
    console.log(`[EDGE FUNCTION] Non-blog URL, continuing to app`);
  }
  
  // Check if it's an AI bot
  const isAIBot = AI_BOT_PATTERNS.some(pattern => 
    userAgentLower.includes(pattern.toLowerCase())
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
}

export const config = {
  path: ["/*", "/blog/*"],
  excludedPath: ["/api/*", "/_next/*", "/static/*", "/ai-static/*"]
};

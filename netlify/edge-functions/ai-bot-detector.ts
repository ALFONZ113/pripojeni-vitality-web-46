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

// Social media crawler User-Agents (Facebook, Twitter, LinkedIn)
const SOCIAL_CRAWLER_PATTERNS = [
  'facebookexternalhit',
  'Facebot',
  'LinkedInBot',
  'Twitterbot',
  'WhatsApp',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Pinterest',
  'Embedly'
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
  'myty-o-optickem-internetu-pravda-vs-fikce': {
    title: '7 mýtů o optickém internetu - Pravda vs. fikce',
    description: 'Vyvracíme 7 nejčastějších mýtů o optickém internetu. Co je pravda a co fikce?',
    image: '/blog-images/myty-opticky-internet.jpg'
  },
  'operatori-meni-ceny-internetu-fakta-prava-zakazniku': {
    title: 'Operátoři mění ceny internetu: co je pravda a jak se to týká domácností v Česku',
    description: 'Zdražují operátoři internet v Česku? Přinášíme ověřená fakta o změnách cen, vysvětlení práv zákazníků a tip, jak získat stabilní internet bez nepříjemných překvapení.',
    image: '/blog-images/operatori-ceny-internetu.webp'
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

  // Debug logging for troubleshooting
  console.log(`[OG Generator] Slug: ${slug}`);
  console.log(`[OG Generator] Found in registry: ${!!postData}`);
  console.log(`[OG Generator] Image URL: ${imageUrl}`);

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
  <meta property="og:image:type" content="image/png">
  <meta property="og:site_name" content="Popri.cz - PODA Internet">
  <meta property="og:locale" content="cs_CZ">
  
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
  
  <!-- NO redirect for crawlers - they need to parse this page -->
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <img src="${imageUrl}" alt="${title}" width="1200" height="630">
  <p><a href="${canonicalUrl}">Přečíst celý článek na ${canonicalUrl}</a></p>
</body>
</html>`;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if it's an AI bot
  const isAIBot = AI_BOT_PATTERNS.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  // Check if it's a social media crawler (Facebook, Twitter, LinkedIn, etc.)
  const isSocialCrawler = SOCIAL_CRAWLER_PATTERNS.some(pattern => 
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
  
  // Handle social crawler requests for blog posts - serve dynamic OG tags
  if (isSocialCrawler) {
    console.log(`[Social Crawler] Detected: ${userAgent}`);
    console.log(`[Social Crawler] URL: ${url.pathname}`);
    
    const blogMatch = url.pathname.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      console.log(`[Social Crawler] Blog slug: ${slug}`);
      console.log(`[Social Crawler] Slug in registry: ${slug in BLOG_POSTS_OG_DATA}`);
      
      const baseUrl = 'https://www.popri.cz';
      const ogHTML = generateOGMetaHTML(slug, baseUrl);
      
      console.log(`[Social Crawler] Serving OG HTML for: /blog/${slug}`);
      
      return new Response(ogHTML, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Served-For': 'Social-Crawler',
          'X-Robots-Tag': 'index, follow',
          'Cache-Control': 'public, max-age=300', // 5 min cache for faster debugging
          'X-OG-Debug': `slug=${slug}, found=${slug in BLOG_POSTS_OG_DATA}`
        }
      });
    }
  }
  
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

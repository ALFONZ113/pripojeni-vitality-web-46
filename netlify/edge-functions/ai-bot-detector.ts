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

// ============================================================
// BLOG SLUG REDIRECTS - old/short slugs -> current canonical slugs
// Mirrors _redirects file so edge function resolves BEFORE Netlify redirects
// ============================================================
const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  // Old slug variants
  'rychly-internet-karvina': 'rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda',
  'rychly-internet-v-karvine-revoluce-v-pripojeni-domacnosti-diky-poda': 'rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda',
  'recenze-zakazniku-poda-skutecne-zkusenosti-s-nasimi-sluzbami': 'recenze-zakazniku-poda-skutecne-zkusenosti-sluzby',
  'novinky-v-poda-sluzbach-nove-moznosti-pro-zakazniky': 'novinky-poda-sluzby-nove-moznosti-zakaznici',
  'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025': 'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025',
  'mesh-systemy-vs-klasicke-routery-co-je-lepsi-pro-vas-domov': 'mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov',
  'gaming-ostrava-esport-scena': 'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  'gaming-internet-ostrava-nejlepsi-pripojeni-pro-hrace': 'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  'gaming-internet-ostrava-2025': 'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  'prevzati-nej-cz-spolecnosti-o2-co-to-znamena-pro-zakazni': 'o2-nej-prevzatie-poda-alternativa-zakaznici',
  'poruchy-internetu-jak-vyresit-pomaly-internet-rychly-navod': 'pomaly-internet-8-sposobu-jak-vyresit-msk-2025',
  'komplexny-pruvodce-modernim-internetovym-pripojenim-2025': 'nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025',
  'opticky-internet-ostrava': 'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025',
  'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025-500': 'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025',
  'wifi-optimalizace': 'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025',
  'internet-vyber-5-chyb-ktore-vas-stoji-penize': 'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi',
  'poda-super-2025-60ghz-internet-polanka': 'polanka-nad-odrou-60ghz-pripojeni-2025',
  'gpon-technologia-v-moravskoslezskom-regione-revolucia-optickeho-internetu-1': 'gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu',
  'prechod-od-o2-k-poda-po-akvizicii-nejcz-a-netboxu-prilezitost-pre-lepsie-sluzby-v-moravskoslezskom-regione-101': 'o2-nej-prevzatie-poda-alternativa-zakaznici',
  'bleskovy-internet-bez-dratu-poznejte-60-ghz-technologii-a-nabidku-poda-102': 'polanka-nad-odrou-60ghz-pripojeni-2025',
  // ID-based redirects
  '1': 'polanka-nad-odrou-60ghz-pripojeni-2025',
  '2': 'gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu',
  '3': 'jak-vybrat-spravny-router-domov-kompletni-pruvodce-2025',
  '4': 'mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov',
  '5': 'zabezpeceni-domaci-wifi-site-kompletni-pruvodce-bezpecnosti',
  '6': 'jak-vybrat-nejlepsi-tv-balicek-vasi-rodinu',
  '7': 'nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky',
  '8': 'jak-otestovat-rychlost-internetu-prakticke-tipy-nejlepsi-nastroje',
  '10': 'rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda',
  '11': 'novinky-poda-sluzby-nove-moznosti-zakaznici',
  '12': 'rozsireni-pokryti-poda-nove-oblasti-opticky-internet',
  '13': 'recenze-zakazniku-poda-skutecne-zkusenosti-sluzby',
  '30': 'pomaly-internet-8-sposobu-jak-vyresit-msk-2025',
  '31': 'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  '100': 'internet-poda-ostrava-poruba-gigabitove-pripojeni-nejvetsi-mestska-cast',
  '102': 'o2-nej-prevzatie-poda-alternativa-zakaznici',
  '150': 'optika-vs-med-ostravsko-internet-21-stoleti',
  '201': 'polanka-nad-odrou-60ghz-pripojeni-2025',
  '203': 'iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod',
  '204': 'nejcastejsi-otazky-pripojeni-internet-panelak',
  '205': 'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda',
  '206': 'nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025',
  '301': 'home-office-2025-jak-nastavit-domaci-kancelar-produktivita',
  '401': 'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi',
  '500': 'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025',
  '601': 'poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy',
  '701': 'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025',
  '801': 'nejcastejsi-myty-o-optickem-internetu',
  '901': 'proc-internet-doma-pomaluje-vecer-a-jak-to-vyresit',
  '999': 'gpon-technologie-jak-funguje-moderni-opticky-internet',
  '1001': 'jak-ai-meni-svet-proc-kvalitni-internet-zaklad',
};

// Blog post data for dynamic OG tags - known articles with curated metadata
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
  'poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy': {
    title: 'PODA Internet 2026 - Optická éra až 2 gigabity',
    description: 'Kompletní průvodce PODA internetem v roce 2026. Optické připojení až 2 Gb/s, férové ceny bez závazků.',
    image: '/blog-images/poda-internet-2026-hero.webp'
  },
  'home-office-2025-jak-nastavit-domaci-kancelar-produktivita': {
    title: 'Home Office - Jaký internet potřebujete pro práci z domova',
    description: 'Požadavky na internet pro home office. Minimální rychlosti pro videohovory, cloud a více.',
    image: '/blog-images/home-office-2025.jpg'
  },
  'nejcastejsi-myty-o-optickem-internetu': {
    title: 'Nejčastější mýty o optickém internetu - Pravda vs. fikce',
    description: 'Odhalujeme nejčastější omyly o optickém internetu a vysvětlujeme realitu rychlého připojení.',
    image: '/blog-images/myty-opticky-internet.jpg'
  },
  'operatori-meni-ceny-internetu-fakta-prava-zakazniku': {
    title: 'Operátoři mění ceny internetu: co je pravda a jak se to týká domácností v Česku',
    description: 'Zdražují operátoři internet v Česku? Přinášíme ověřená fakta o změnách cen, vysvětlení práv zákazníků.',
    image: '/blog-images/operatori-ceny-internetu.webp'
  },
  'jak-ai-meni-svet-proc-kvalitni-internet-zaklad': {
    title: 'Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ',
    description: 'Umělá inteligence mění práci, zábavu i domácnosti. Zjistěte, proč je rychlý internet klíčem.',
    image: '/blog-images/ai-internet-zaklad.webp'
  },
  'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda': {
    title: 'Internetové připojení pro online hráče v Ostravě: Rychlosti, ping a spolehlivost s PODA',
    description: 'Jak dosáhnout nejnižšího pingu a nejvyšší stability pro online hraní v Ostravě.',
    image: '/lovable-uploads/e99cde57-f2e6-45ff-b0cb-db715960e72c.png'
  },
  'polanka-nad-odrou-60ghz-pripojeni-2025': {
    title: 'PODA 2025: Polanka nad Odrou připojena revolučním 60 GHz připojením',
    description: 'Obec Polanka nad Odrou získala nejmodernější bezdrátové připojení s 60 GHz technologií.',
    image: '/lovable-uploads/0c952940-aa5d-4157-b3a8-82b62d2a048c.png'
  },
  'nejcastejsi-otazky-pripojeni-internet-panelak': {
    title: 'Nejčastější otázky o připojení internetu v paneláku',
    description: 'Odpovídáme na nejčastější otázky o připojení internetu v bytových domech.',
    image: '/lovable-uploads/fdaf29a8-01a5-4fd4-82b1-457e07f40576.png'
  },
  'iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod': {
    title: 'TV přes internet vs klasická kabelová / satelitní televize — srovnání',
    description: 'Porovnání IPTV a klasické kabelové či satelitní TV.',
    image: '/lovable-uploads/slow-internet-fix-guide.jpg'
  },
  'nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025': {
    title: 'Jak najít nejlepší internet v Ostravě, Karviné a Havířově: Průvodce 2026',
    description: 'Kompletní průvodce výběrem nejlepšího internetového připojení v MSK.',
    image: '/lovable-uploads/4f53eb71-2c7a-4280-9b37-19e17047d420.png'
  },
  'rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda': {
    title: 'Rychlý internet v Karviné: Revoluce v připojení domácností díky PODA',
    description: 'Karviná vstupuje do digitální budoucnosti díky PODA s gigabitovým optickým připojením.',
    image: '/lovable-uploads/4fc5ce47-bd2b-4c44-8e84-4bf330cbf57c.png'
  },
  'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025': {
    title: 'Internet PODA Ostrava: Nejrychlejší optické připojení v MSK 2025',
    description: 'Hledáte rychlý internet v Ostravě? PODA nabízí nejkonkurenceschopnější internetové služby.',
    image: '/lovable-uploads/d043e07c-8916-4d2d-b35d-8f0ba81b4ebc.png'
  },
  'optika-vs-med-ostravsko-internet-21-stoleti': {
    title: 'Optika vs. měď: Proč Ostravsko konečně dostává internet 21. století',
    description: 'Konec pomalému internetu v Ostravě! Zjistěte, proč optické připojení PODA mění hru.',
    image: '/blog-images/optika-vs-med-ostrava.jpg'
  },
  'gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu': {
    title: 'GPON technologie v Moravskoslezském regionu: Revoluce optického internetu',
    description: 'Komplexní přehled GPON technologie a jejích výhod pro domácnosti v MSK.',
    image: '/gpon-technologie-opticky-internet.webp'
  },
  'jak-vybrat-spravny-router-domov-kompletni-pruvodce-2025': {
    title: 'Jak vybrat správný router pro váš domov: Kompletní průvodce 2025',
    description: 'Vše, co potřebujete vědět o výběru routeru pro domácí použití.',
    image: '/lovable-uploads/77099393-c42f-4da8-8d98-a7a65e08a093.png'
  },
  'mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov': {
    title: 'Mesh systémy vs. klasické routery: Co je lepší pro váš domov?',
    description: 'Kompletní porovnání mesh systémů a klasických routerů pro váš domov.',
    image: '/lovable-uploads/aa92ab29-4de6-409a-8e8b-89b0fe7555b0.png'
  },
  'zabezpeceni-domaci-wifi-site-kompletni-pruvodce-bezpecnosti': {
    title: 'Zabezpečení domácí Wi-Fi sítě: Kompletní průvodce bezpečností',
    description: 'Ochrana domácí Wi-Fi sítě před hackery a útoky.',
    image: '/lovable-uploads/64d06bad-71f3-4777-b62e-b49b4ca94abe.png'
  },
  'jak-vybrat-nejlepsi-tv-balicek-vasi-rodinu': {
    title: 'Jak vybrat nejlepší TV balíček pro vaši rodinu',
    description: 'Praktický průvodce výběrem televizního balíčku.',
    image: '/lovable-uploads/5daa6fb6-9d90-41e9-bb84-0e836eb8965f.png'
  },
  'nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky': {
    title: 'Nejlepší způsob sledování sportu online: Průvodce pro fanoušky',
    description: 'Kompletní přehled možností sledování sportovních přenosů online.',
    image: '/lovable-uploads/235022db-f6c5-4a2f-8970-681e7c476589.png'
  },
  'jak-otestovat-rychlost-internetu-prakticke-tipy-nejlepsi-nastroje': {
    title: 'Jak otestovat rychlost internetu: Praktické tipy a nejlepší nástroje',
    description: 'Jak správně otestovat rychlost internetového připojení.',
    image: '/lovable-uploads/35179673-7e72-4282-8609-a46686328aa0.png'
  },
  'novinky-poda-sluzby-nove-moznosti-zakaznici': {
    title: 'Novinky v PODA službách: Nové možnosti pro zákazníky',
    description: 'Nejnovější vylepšení a nové funkce v PODA službách.',
    image: '/lovable-uploads/56ebeef3-04d0-42a6-ac4f-f47224a075fb.png'
  },
  'rozsireni-pokryti-poda-nove-oblasti-opticky-internet': {
    title: 'Rozšíření pokrytí PODA: Nové oblasti s optickým internetem',
    description: 'Informace o rozšíření optické sítě PODA do nových oblastí MSK.',
    image: '/lovable-uploads/6f778a97-79bd-4698-b3f2-2a373893184b.png'
  },
  'recenze-zakazniku-poda-skutecne-zkusenosti-sluzby': {
    title: 'Recenze zákazníků PODA: Skutečné zkušenosti s našimi službami',
    description: 'Autentické recenze a hodnocení od spokojených zákazníků PODA.',
    image: '/lovable-uploads/8a151fa2-b198-402b-9ead-89329b8b9ab2.png'
  }
};

// ============================================================
// UNIVERSAL: Convert any blog slug to a readable Czech title
// Works for ANY slug - existing or future articles
// ============================================================
function slugToTitle(slug: string): string {
  // Czech word capitalization exceptions
  const lowerWords = new Set(['a', 'i', 'k', 'o', 's', 'v', 'z', 'na', 'do', 'od', 'pro', 'pri', 'pod', 'nad', 'za', 've', 'ze', 'po', 'se', 'si', 'je', 'to', 'vs', 'jak', 'co', 'kde', 'kdy', 'ani', 'ale', 'nebo']);
  
  // Common slug abbreviations to proper form
  const replacements: Record<string, string> = {
    'wifi': 'WiFi',
    'wi-fi': 'Wi-Fi',
    'gpon': 'GPON',
    'iptv': 'IPTV',
    'tv': 'TV',
    'poda': 'PODA',
    'msk': 'MSK',
    'ghz': 'GHz',
    '60ghz': '60 GHz',
    'ai': 'AI',
    'o2': 'O2',
    'vpn': 'VPN',
    'ip': 'IP',
  };

  const words = slug.split('-');
  
  return words.map((word, index) => {
    // Check replacements first
    const lower = word.toLowerCase();
    if (replacements[lower]) return replacements[lower];
    
    // Remove trailing numbers (year suffixes like 2025, 2026)
    // Keep them as-is
    if (/^\d+$/.test(word)) return word;
    
    // First word always capitalized
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Small words stay lowercase (unless first)
    if (lowerWords.has(lower)) return lower;
    
    // Capitalize first letter
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// Resolve slug: apply redirect if needed
function resolveSlug(slug: string): string {
  return BLOG_SLUG_REDIRECTS[slug] || slug;
}

// Generate dynamic OG meta tags HTML for ANY blog slug
function generateOGMetaHTML(slug: string, baseUrl: string): string {
  const postData = BLOG_POSTS_OG_DATA[slug];
  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  
  // Use curated data if available, otherwise generate from slug
  const title = postData?.title || slugToTitle(slug);
  const description = postData?.description || `${slugToTitle(slug)} - Tipy a novinky o internetu od Popri.cz, autorizovaného partnera PODA.`;
  const imageUrl = postData?.image
    ? (postData.image.startsWith('http') ? postData.image : `${baseUrl}${postData.image}`)
    : `${baseUrl}/og-image.png`;

  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>${title} | Blog Popri.cz</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Popri.cz - PODA Internet">
  <meta property="og:locale" content="cs_CZ">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <img src="${imageUrl}" alt="${title}" width="1200" height="630">
  <a href="${canonicalUrl}">Přečíst celý článek</a>
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
  
  // Handle social crawler requests for blog posts - UNIVERSAL for ALL slugs
  if (isSocialCrawler) {
    console.log(`[Social Crawler] Detected: ${userAgent.substring(0, 80)}`);
    console.log(`[Social Crawler] URL: ${url.pathname}`);
    
    const blogMatch = url.pathname.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      // Step 1: Resolve redirects (old slug -> new slug)
      const originalSlug = blogMatch[1];
      const slug = resolveSlug(originalSlug);
      const baseUrl = 'https://www.popri.cz';
      
      if (slug !== originalSlug) {
        console.log(`[Social Crawler] Redirect resolved: ${originalSlug} -> ${slug}`);
      }
      
      try {
        // Step 2: Try to serve static HTML file with OG tags
        const staticPath = `/ai-static/blog/${slug}.html`;
        const staticUrl = new URL(staticPath, url.origin);
        console.log(`[Social Crawler] Trying static file: ${staticPath}`);
        
        const staticResponse = await fetch(staticUrl.toString());
        
        if (staticResponse.ok) {
          console.log(`[Social Crawler] ✅ Serving STATIC file for: /blog/${slug}`);
          const body = await staticResponse.text();
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'X-Served-For': 'Social-Crawler-Static',
              'X-Robots-Tag': 'index, follow',
              'Cache-Control': 'public, max-age=300',
              'X-OG-Debug': `slug=${slug}, source=static-file`
            }
          });
        }
        
        // Step 3: Dynamic fallback - generate OG HTML from slug (NEVER generic)
        console.log(`[Social Crawler] ⚠️ No static file, generating dynamic OG for: ${slug}`);
        const ogHTML = generateOGMetaHTML(slug, baseUrl);
        return new Response(ogHTML, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Served-For': 'Social-Crawler-Dynamic',
            'X-Robots-Tag': 'index, follow',
            'Cache-Control': 'public, max-age=300',
            'X-OG-Debug': `slug=${slug}, source=dynamic-slugToTitle`
          }
        });
      } catch (e) {
        // Error fallback - still generate meaningful OG from slug
        console.error(`[Social Crawler] ❌ Error serving OG for ${slug}:`, e);
        const ogHTML = generateOGMetaHTML(slug, baseUrl);
        return new Response(ogHTML, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Served-For': 'Social-Crawler-Error-Fallback',
            'Cache-Control': 'public, max-age=60'
          }
        });
      }
    }
  }
  
  if (!isAIBot) {
    return context.next();
  }
  
  // AI bot handler - also universal for all blog slugs
  const blogMatch = url.pathname.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const originalSlug = blogMatch[1];
    const slug = resolveSlug(originalSlug);
    
    // Try static file for resolved slug
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
    
    // No static file? Generate dynamic OG for AI bot too
    const baseUrl = 'https://www.popri.cz';
    const ogHTML = generateOGMetaHTML(slug, baseUrl);
    return new Response(ogHTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Served-For': 'AI-Bot-Dynamic',
        'X-Robots-Tag': 'index, follow',
        'Cache-Control': 'public, max-age=300'
      }
    });
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

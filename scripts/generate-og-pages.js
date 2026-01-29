/**
 * Build script to generate static OG HTML pages for Facebook sharing
 * These pages contain Open Graph meta tags and redirect to the actual blog article
 * 
 * Run: node scripts/generate-og-pages.js
 * This is automatically run during build via netlify.toml
 */

const fs = require('fs');
const path = require('path');

// Blog posts data - manually maintained for reliability
// This ensures Facebook always gets correct OG tags without depending on Edge Functions
const BLOG_POSTS = [
  {
    slug: 'jak-ai-meni-svet-proc-kvalitni-internet-zaklad',
    title: 'Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ',
    description: 'Umělá inteligence mění práci, zábavu i domácnosti. Zjistěte, proč je rychlý a stabilní internet klíčem k jejímu využití v Česku.',
    image: '/blog-images/ai-internet-zaklad.webp'
  },
  {
    slug: 'nejcastejsi-myty-o-optickem-internetu',
    title: 'Nejčastější mýty o optickém internetu, kterým lidé stále věří',
    description: 'Věříte mýtům o optickém internetu? Odhalujeme nejčastější omyly a vysvětlujeme, jaká je realita rychlého připojení.',
    image: '/blog-images/myty-opticky-internet.jpg'
  },
  {
    slug: 'poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy',
    title: 'PODA internet 2026: Optická éra až 2 gigabity – domácnosti 1000/1000, rodinné domy 1000/300',
    description: 'Kompletní průvodce PODA internetem v roce 2026. Optické připojení až 2 Gb/s, symetrické tarify.',
    image: '/blog-images/poda-internet-2026-hero.webp'
  },
  {
    slug: 'home-office-2025-jak-nastavit-domaci-kancelar-produktivita',
    title: 'Home office 2025: Jak nastavit domácí kancelář pro maximální produktivitu',
    description: 'Kompletní průvodce nastavením domácí kanceláře. Tipy na internet, vybavení, ergonomii a nástroje pro efektivní práci z domova.',
    image: '/blog-images/home-office-2025.jpg'
  },
  {
    slug: 'pomaly-internet-8-sposobu-jak-vyresit-msk-2025',
    title: 'Pomalý Internet? 8 Způsobů Jak to Vyřešit [MSK 2026]',
    description: 'Seká se vám internet v Ostravě? Náš expert průvodce odhaluje 8 nejčastějších příčin pomalého internetu.',
    image: '/lovable-uploads/f46455cb-ee7c-4a2a-ab48-0c36d1584769.png'
  },
  {
    slug: 'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi',
    title: 'Ako si vybrať internet do bytu: 5 chýb, ktoré robí 80 % ľudí',
    description: 'Väčšina ľudí robí pri výbere internetu tie isté chyby – a potom sa diví, prečo im seká Netflix.',
    image: '/lovable-uploads/internet-vyber-chyby-blog.jpg'
  },
  {
    slug: 'o2-nej-prevzatie-poda-alternativa-zakaznici',
    title: 'Převzetí Nej.cz společností O2: Co to znamená pro zákazníky',
    description: 'Když O2 převzalo Nej.cz, mnoho zákazníků zůstalo zklamaných. Proč zvážit přechod k PODA?',
    image: '/o2-nej-vs-poda-comparison.jpg'
  },
  {
    slug: 'gpon-technologie-jak-funguje-moderni-opticky-internet',
    title: 'GPON technologie jednoduše: Jak funguje moderní optický internet?',
    description: 'Zjistěte, co je GPON technologie a proč je budoucností internetového připojení.',
    image: '/gpon-technologie-opticky-internet.webp'
  },
  {
    slug: 'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025',
    title: 'Jak zlepšit WiFi signál doma: 10 ověřených triků na rok 2026',
    description: 'Pomalé WiFi, mrtvé zóny v bytě? 10 praktických triků, jak vylepšit WiFi signál.',
    image: '/lovable-uploads/wifi-signal-optimization-2025.webp'
  },
  {
    slug: 'proc-internet-doma-pomaluje-vecer-a-jak-to-vyresit',
    title: 'Proč internet doma zpomaluje večer? (A jak to vyřešit)',
    description: 'Pomalý internet večer je jeden z nejčastějších problémů. Zjisti příčiny a řešení.',
    image: '/blog-images/pomaly-internet-vecer.png'
  }
];

const BASE_URL = 'https://www.popri.cz';

function generateOGPage(post) {
  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`;
  
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>${post.title} | Blog Popri.cz</title>
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Popri.cz">
  <meta property="og:locale" content="cs_CZ">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
  <link rel="canonical" href="${canonicalUrl}">
</head>
<body>
  <p>Přesměrování na článek...</p>
  <a href="${canonicalUrl}">Klikněte zde, pokud nebudete přesměrováni automaticky</a>
</body>
</html>`;
}

function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'og', 'blog');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('🚀 Generating OG pages for Facebook sharing...\n');
  
  let generated = 0;
  
  for (const post of BLOG_POSTS) {
    const filename = `${post.slug}.html`;
    const filepath = path.join(outputDir, filename);
    const content = generateOGPage(post);
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ Generated: /og/blog/${filename}`);
    generated++;
  }
  
  console.log(`\n🎉 Done! Generated ${generated} OG pages.`);
  console.log('\n📌 Usage: Share https://www.popri.cz/og/blog/[slug].html on Facebook');
  console.log('   Facebook will read OG tags, then user gets redirected to the actual article.');
}

main();

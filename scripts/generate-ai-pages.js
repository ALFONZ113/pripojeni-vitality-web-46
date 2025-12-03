/**
 * Generate AI-optimized static HTML pages
 * These pages are served to AI bots for better content understanding
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Top 11 blog articles for AI indexing (Czech language)
const TOP_BLOG_ARTICLES = [
  { slug: 'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025', title: 'Jak zlepšit WiFi signál doma - 10 ověřených triků', description: '10 praktických triků jak zlepšit WiFi signál doma v roce 2025 - od řešení zdarma až po mesh systémy.' },
  { slug: 'jak-si-vybrat-internet-do-bytu-5-chyb', title: '5 Chyb Při Výběru Internetu', description: 'Nejčastější chyby při výběru internetového připojení a jak se jim vyhnout.' },
  { slug: 'gpon-technologie-opticky-internet-jak-funguje', title: 'GPON Technologie - Budoucnost Optického Internetu', description: 'Kompletní průvodce GPON technologií a jejími výhodami pro domácnosti.' },
  { slug: 'o2-nej-prevzatie-poda-alternativa-zakaznici', title: 'O2 Nej Převzetí - PODA Alternativa', description: 'Převzetí O2 Nej zákazníků - proč je PODA lepší alternativa.' },
  { slug: 'iptv-vs-tradicni-televize-co-je-lepsi-2025', title: 'IPTV vs Tradiční TV - Srovnání', description: 'Komplexní srovnání IPTV a tradiční TV - výhody, nevýhody, ceny.' },
  { slug: 'internet-do-panelaku-nejcastejsi-otazky', title: 'Internet Do Paneláku - Nejčastější Otázky', description: 'FAQ k internetovému připojení v panelovém domě.' },
  { slug: 'polanka-nad-odrou-60ghz-pripojeni-2025', title: 'PODA Super 2025 - 60GHz Technologie', description: 'Revoluční 60GHz bezdrátová technologie pro ultrarychlé připojení.' },
  { slug: 'gaming-internet-ostrava-2025-nejlepsi-pripojeni-pro-hrace', title: 'Gaming Internet Ostrava - Nejlepší Připojení', description: 'Nejlepší internetové připojení pro hráče v Ostravě.' },
  { slug: 'pomaly-internet-8-zpusobu-jak-vyriesit-msk-2025', title: 'Pomalý Internet? 10 Řešení', description: '10 ověřených způsobů jak zrychlit pomalé internetové připojení.' },
  { slug: 'nejlepsi-internet-ostrava-karvina-havirov-2025', title: 'Internet v Ostravě - Komplexní Průvodce', description: 'Úplný průvodce internetovým připojením v Ostravě a okolí.' },
  { slug: 'internet-poda-karvina-optika-rychly-internet-2025', title: 'Internet v Karviné - PODA Poskytovatel', description: 'Rychlé a stabilní internetové připojení v Karviné.' }
];

// AI-optimized content for each page
const AI_PAGES = {
  '/': {
    title: 'PODA Internet s TV Zdarma - Popri.cz',
    description: 'Rychlý a spolehlivý PODA internet v Ostravě a okolí. Gigabitové připojení až 1000 Mbps s televizním vysíláním zdarma.',
    content: `
      <h1>PODA Internet s TV Zdarma - Popri.cz</h1>
      <p>Poskytujeme rychlé a spolehlivé internetové připojení PODA v Ostravě a okolí s gigabitovými rychlostmi a televizním vysíláním zdarma.</p>
      
      <h2>Naše služby</h2>
      <ul>
        <li>Gigabitový internet PODA až 1000 Mbps</li>
        <li>Televizní vysílání zdarma (70+ kanálů)</li>
        <li>IPTV služby s HD kvalitou</li>
        <li>Optické připojení s 99,9% dostupností</li>
        <li>Non-stop technická podpora</li>
      </ul>
      
      <h2>Cenové balíčky</h2>
      <h3>Internet 300 Mb/s</h3>
      <p>Cena: 390 Kč/měsíc | Rychlost: 300/300 Mb/s | TV: 70+ kanálů zdarma</p>
      
      <h3>Internet 500 Mb/s</h3>
      <p>Cena: 490 Kč/měsíc | Rychlost: 500/500 Mb/s | TV: 70+ kanálů zdarma</p>
      
      <h3>Internet 1000 Mb/s</h3>
      <p>Cena: 590 Kč/měsíc | Rychlost: 1000/1000 Mb/s | TV: 70+ kanálů zdarma</p>
      
      <h2>Pokrytí</h2>
      <p>Poskytujeme služby v těchto lokalitách:</p>
      <ul>
        <li>Ostrava (všechny obvody)</li>
        <li>Poruba</li>
        <li>Karviná</li>
        <li>Havířov</li>
        <li>Bohumín</li>
      </ul>
      
      <h2>Výhody PODA internetu</h2>
      <ul>
        <li>Rychlá instalace do 48 hodin</li>
        <li>Bez závazků a skrytých poplatků</li>
        <li>Stabilní připojení s 99,9% dostupností</li>
        <li>Profesionální technická podpora 24/7</li>
        <li>TV vysílání v HD kvalitě zdarma</li>
      </ul>
      
      <h2>Kontakt</h2>
      <p>Telefon: +420 739 065 142</p>
      <p>Email: info@popri.cz</p>
      <p>Adresa: Ostrava, Moravskoslezský kraj</p>
    `
  },
  '/tarify': {
    title: 'Tarify a Ceny - PODA Internet Popri.cz',
    description: 'Přehled všech tarifů PODA internetu s cenami. Vyberte si rychlost od 300 Mb/s do 1000 Mb/s. TV vysílání zdarma u všech balíčků.',
    content: `
      <h1>Tarify a Cenové Balíčky</h1>
      <p>Všechny tarify obsahují TV vysílání zdarma s více než 70 kanály.</p>
      
      <h2>Internet 300 Mb/s</h2>
      <ul>
        <li>Rychlost: 300/300 Mb/s (download/upload)</li>
        <li>Cena: 390 Kč/měsíc</li>
        <li>TV: 70+ kanálů HD zdarma</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>Internet 500 Mb/s - Nejoblíbenější</h2>
      <ul>
        <li>Rychlost: 500/500 Mb/s (download/upload)</li>
        <li>Cena: 490 Kč/měsíc</li>
        <li>TV: 70+ kanálů HD zdarma</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>Internet 1000 Mb/s - Premium</h2>
      <ul>
        <li>Rychlost: 1000/1000 Mb/s (download/upload)</li>
        <li>Cena: 590 Kč/měsíc</li>
        <li>TV: 70+ kanálů HD zdarma</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>Co je v ceně zahrnuto</h2>
      <ul>
        <li>Symmetrické připojení (stejná rychlost nahoru i dolů)</li>
        <li>Neomezená data bez FUP</li>
        <li>WiFi router v ceně</li>
        <li>Profesionální instalace zdarma</li>
        <li>24/7 technická podpora</li>
        <li>TV vysílání přes IPTV</li>
      </ul>
    `
  },
  '/internet-ostrava': {
    title: 'PODA Internet Ostrava - Gigabitové Připojení',
    description: 'Rychlý PODA internet v Ostravě. Pokrýváme všechny obvody města. Gigabitové rychlosti s TV zdarma od 390 Kč/měsíc.',
    content: `
      <h1>PODA Internet Ostrava</h1>
      <p>Poskytujeme rychlé internetové připojení ve všech obvodech Ostravy.</p>
      
      <h2>Pokrytí v Ostravě</h2>
      <ul>
        <li>Moravská Ostrava a Přívoz</li>
        <li>Slezská Ostrava</li>
        <li>Poruba</li>
        <li>Mariánské Hory a Hulváky</li>
        <li>Vítkovice</li>
        <li>Lhotka</li>
        <li>Hrabůvka</li>
        <li>Nová Ves</li>
        <li>Stará Bělá</li>
      </ul>
      
      <h2>Dostupné rychlosti</h2>
      <p>300 Mb/s za 390 Kč/měsíc | 500 Mb/s za 490 Kč/měsíc | 1000 Mb/s za 590 Kč/měsíc</p>
      
      <h2>Výhody</h2>
      <ul>
        <li>TV vysílání 70+ kanálů zdarma</li>
        <li>Instalace do 48 hodin</li>
        <li>Bez instalačních poplatků</li>
        <li>Non-stop podpora</li>
      </ul>
    `
  },
  '/internet-karvina': {
    title: 'PODA Internet Karviná - Rychlé Připojení',
    description: 'PODA internet v Karviné. Dostupné ve všech částech města. Rychlosti až 1000 Mb/s s TV zdarma.',
    content: `
      <h1>PODA Internet Karviná</h1>
      <p>Kvalitní internetové připojení v Karviné a okolí.</p>
      
      <h2>Pokrytí v Karviné</h2>
      <ul>
        <li>Karviná-Město</li>
        <li>Karviná-Fryštát</li>
        <li>Ráj</li>
        <li>Nové Město</li>
        <li>Lazy</li>
        <li>Staré Město</li>
      </ul>
      
      <h2>Tarify</h2>
      <p>Od 390 Kč/měsíc včetně TV vysílání zdarma. Rychlosti 300, 500 nebo 1000 Mb/s.</p>
    `
  },
  '/internet-havirov': {
    title: 'PODA Internet Havířov - Gigabitové Rychlosti',
    description: 'PODA internet v Havířově. Stabilní připojení až 1000 Mb/s s televizním vysíláním zdarma.',
    content: `
      <h1>PODA Internet Havířov</h1>
      <p>Rychlé a stabilní připojení v Havířově.</p>
      
      <h2>Pokrytí</h2>
      <ul>
        <li>Město</li>
        <li>Podlesí</li>
        <li>Prostřední Suchá</li>
        <li>Bludovice</li>
        <li>Životice</li>
      </ul>
      
      <h2>Ceny</h2>
      <p>300 Mb/s: 390 Kč | 500 Mb/s: 490 Kč | 1000 Mb/s: 590 Kč/měsíc. TV zdarma.</p>
    `
  },
  '/internet-bohumin': {
    title: 'PODA Internet Bohumín - Vysokorychlostní Připojení',
    description: 'PODA internet v Bohumíně. Gigabitové rychlosti s TV vysíláním zdarma od 390 Kč měsíčně.',
    content: `
      <h1>PODA Internet Bohumín</h1>
      <p>Poskytujeme internetové služby v Bohumíně a okolních obcích.</p>
      
      <h2>Dostupnost</h2>
      <ul>
        <li>Bohumín-centrum</li>
        <li>Starý Bohumín</li>
        <li>Nový Bohumín</li>
        <li>Skřečoň</li>
        <li>Vrbice</li>
        <li>Záblatí</li>
        <li>Šunychl</li>
      </ul>
    `
  },
  '/internet-poruba': {
    title: 'PODA Internet Poruba - Rychlé Připojení',
    description: 'Internet PODA v Porubě, Ostrava. Stabilní připojení až 1000 Mb/s s TV zdarma. Bez závazků.',
    content: `
      <h1>PODA Internet Poruba</h1>
      <p>Specializujeme se na poskytování internetu v Porubě, největším obvodu Ostravy.</p>
      
      <h2>Pokrytí v Porubě</h2>
      <ul>
        <li>Poruba-sever</li>
        <li>Poruba-jih</li>
        <li>Poruba-západ</li>
        <li>Poruba-východ</li>
        <li>Klimkovice (částečně)</li>
      </ul>
      
      <h2>Služby</h2>
      <p>Internet 300-1000 Mb/s, TV vysílání HD zdarma, instalace do 48h.</p>
    `
  },
  '/iptv': {
    title: 'IPTV - Televizní Vysílání Zdarma | Popri.cz',
    description: 'IPTV televizní vysílání zdarma k internetu PODA. Více než 70 kanálů v HD kvalitě bez dodatečných poplatků.',
    content: `
      <h1>IPTV - TV Vysílání Zdarma</h1>
      <p>K našemu internetu dostanete televizní vysílání zdarma prostřednictvím IPTV.</p>
      
      <h2>Co je IPTV?</h2>
      <p>IPTV (Internet Protocol Television) je digitální televizní vysílání přenášené přes internetové připojení. Nabízí lepší kvalitu obrazu a zvuku než klasické analogové nebo satelitní vysílání.</p>
      
      <h2>Výhody našeho IPTV</h2>
      <ul>
        <li>70+ kanálů zdarma</li>
        <li>HD kvalita obrazu</li>
        <li>Žádné dodatečné poplatky</li>
        <li>Elektronický programový průvodce (EPG)</li>
        <li>Podpora na všech zařízeních</li>
      </ul>
      
      <h2>Dostupné kanály</h2>
      <p>Česká televize (ČT1, ČT2, ČT24, ČT Sport), Nova (Nova, Nova Cinema, Nova Action), Prima (Prima, Prima Cool, Prima Zoom), Sport (Sport1, Sport2), Dokumentární, Dětské a další.</p>
      
      <h2>Požadavky</h2>
      <ul>
        <li>PODA internet minimálně 300 Mb/s</li>
        <li>IPTV set-top box nebo chytrá TV</li>
        <li>Stabilní připojení</li>
      </ul>
    `
  },
  '/blog': {
    title: 'Blog - Tipy a Novinky | Popri.cz',
    description: 'Zajímavé články o internetu, IPTV a technologiích. Rady jak zlepšit připojení, přehledy tarifů a novinky ze světa PODA internetu.',
    content: `
      <h1>Blog Popri.cz</h1>
      <p>Najdete zde užitečné články, tipy a novinky ze světa internetu a technologií.</p>
      
      <h2>Oblíbené články</h2>
      <ul>
        <li>O2 Jej Převzetí - PODA Alternativa pro Zákazníky</li>
        <li>Jak Vybrat Správný Internet - Průvodce 2025</li>
        <li>GPON Technologie - Budoucnost Optického Internetu</li>
        <li>Pomalý Internet? 10 Způsobů Jak Zrychlit Připojení</li>
        <li>IPTV vs Tradiční TV - Co Je Lepší Volba?</li>
      </ul>
      
      <h2>Kategorie</h2>
      <ul>
        <li>Internet - Rady a tipy k internetovému připojení</li>
        <li>IPTV - Vše o televizním vysílání</li>
        <li>Technologie - Novinky ze světa IT</li>
        <li>Tipy - Praktické návody</li>
        <li>Recenze - Hodnocení služeb</li>
      </ul>
    `
  },
  '/kontakt': {
    title: 'Kontakt - Popri.cz',
    description: 'Kontaktujte nás pro objednání PODA internetu nebo pro technickou podporu. Telefon: +420 739 065 142.',
    content: `
      <h1>Kontakt</h1>
      
      <h2>Obchodní oddělení</h2>
      <p>Pro objednání služeb nebo dotazy ohledně připojení nás kontaktujte:</p>
      <ul>
        <li>Telefon: +420 739 065 142</li>
        <li>Email: info@popri.cz</li>
        <li>Provozní doba: Po-Pá 8:00-18:00</li>
      </ul>
      
      <h2>Technická podpora</h2>
      <ul>
        <li>Non-stop: 24/7</li>
        <li>Telefon: +420 739 065 142</li>
        <li>Email: podpora@popri.cz</li>
      </ul>
      
      <h2>Sídlo společnosti</h2>
      <p>Ostrava, Moravskoslezský kraj, Česká republika</p>
      
      <h2>Provozní oblasti</h2>
      <p>Ostrava, Poruba, Karviná, Havířov, Bohumín a okolní obce</p>
    `
  }
};

// Generate AI pages for top blog articles
TOP_BLOG_ARTICLES.forEach(article => {
  AI_PAGES[`/blog/${article.slug}`] = {
    title: `${article.title} | Blog Popri.cz`,
    description: article.description,
    content: `
      <h1>${article.title}</h1>
      <p>${article.description}</p>
      
      <h2>Obsah článku</h2>
      <p>Tento článok poskytuje podrobné informácie o téme: ${article.title.toLowerCase()}.</p>
      
      <h2>Prečo je toto dôležité?</h2>
      <p>V dnešnej dobe rýchleho internetového pripojenia je kľúčové rozumieť možnostiam a technológiám, ktoré sú k dispozícii. Naša služba PODA internet poskytuje riešenia prispôsobené vašim potrebám.</p>
      
      <h2>Naše služby PODA</h2>
      <ul>
        <li>Gigabitový internet až 1000 Mb/s</li>
        <li>TV vysílanie zdarma (70+ kanálů)</li>
        <li>Stabilní připojení s 99,9% dostupností</li>
        <li>Profesionální technická podpora 24/7</li>
      </ul>
      
      <h2>Zaujalo vás to?</h2>
      <p>Kontaktujte nás na telefónnom čísle +420 739 065 142 alebo navštívte našu webovú stránku pre viac informácií o našich tarifoch a dostupnosti vo vašej lokalite.</p>
      
      <h2>Súvisiace články</h2>
      <ul>
        <li><a href="https://www.popri.cz/blog">Všetky blog články</a></li>
        <li><a href="https://www.popri.cz/tarify">Cenové balíčky</a></li>
        <li><a href="https://www.popri.cz/internet-ostrava">Internet v Ostrave</a></li>
      </ul>
    `
  };
});

function generateAIStaticHTML(path, data) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <meta name="description" content="${data.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.popri.cz${path}">
  
  <!-- AI Bot Meta Tags -->
  <meta name="ai:title" content="${data.title}">
  <meta name="ai:description" content="${data.description}">
  <meta name="ai-crawl-priority" content="high">
  <meta name="ai-index-content" content="full">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${data.title}",
    "description": "${data.description}",
    "url": "https://www.popri.cz${path}",
    "inLanguage": "cs",
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz",
      "url": "https://www.popri.cz"
    }
  }
  </script>
  
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 { color: #FF6B35; font-size: 2.5em; margin-bottom: 0.5em; }
    h2 { color: #004D7A; font-size: 1.8em; margin-top: 1.5em; }
    h3 { color: #007EA7; font-size: 1.3em; }
    ul { margin: 1em 0; padding-left: 2em; }
    li { margin: 0.5em 0; }
    p { margin: 1em 0; }
    a { color: #FF6B35; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main>
    ${data.content}
    
    <hr style="margin: 3em 0; border: 1px solid #eee;">
    
    <section>
      <h2>Kontaktní informace</h2>
      <p><strong>Telefon:</strong> +420 739 065 142</p>
      <p><strong>Email:</strong> info@popri.cz</p>
      <p><strong>Web:</strong> <a href="https://www.popri.cz">www.popri.cz</a></p>
    </section>
    
    <footer style="margin-top: 3em; padding-top: 2em; border-top: 1px solid #eee; color: #666;">
      <p>&copy; 2025 Popri.cz - PODA Internet s TV Zdarma</p>
      <p>Tato stránka je optimalizována pro AI boty a vyhledávače.</p>
    </footer>
  </main>
</body>
</html>`;
}

// Main execution
console.log('🤖 Generating AI-optimized static pages...');

const aiStaticDir = path.join(__dirname, '..', 'public', 'ai-static');

// Create ai-static directory if it doesn't exist
if (!fs.existsSync(aiStaticDir)) {
  fs.mkdirSync(aiStaticDir, { recursive: true });
  console.log('✅ Created ai-static directory');
}

// Generate HTML files for each page
let generatedCount = 0;
for (const [pagePath, pageData] of Object.entries(AI_PAGES)) {
  const fileName = pagePath === '/' ? 'index.html' : `${pagePath.slice(1)}.html`;
  const filePath = path.join(aiStaticDir, fileName);
  
  const html = generateAIStaticHTML(pagePath, pageData);
  fs.writeFileSync(filePath, html, 'utf-8');
  
  generatedCount++;
  console.log(`✅ Generated: ${fileName}`);
}

console.log(`\n🎉 Successfully generated ${generatedCount} AI-optimized pages!`);
console.log(`📁 Location: public/ai-static/`);
console.log('\n📋 Generated files:');
Object.keys(AI_PAGES).forEach(path => {
  const fileName = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  console.log(`   - ${fileName}`);
});

export { AI_PAGES, generateAIStaticHTML };

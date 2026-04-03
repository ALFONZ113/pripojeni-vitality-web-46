#!/usr/bin/env node

/**
 * Static Prerendering Script (No Puppeteer)
 * 
 * After Vite build, creates route-specific index.html files in dist/
 * so Google gets complete HTML with correct meta tags and content instantly.
 * 
 * Each page gets: correct <title>, meta description, canonical, OG tags,
 * and route-specific fallback content inside #ssr-fallback.
 */

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.popri.cz';
const DIST_DIR = 'dist';

// ============================================================
// Page definitions with SEO metadata and fallback content
// ============================================================
const PAGES = [
  {
    route: '/tarify',
    title: 'Tarify PODA Internet 2026 | Ceny od 300 Kč/měs | Popri.cz',
    description: 'Aktuální tarify PODA internetu 2026. Internet + TV Basic od 300 Kč/měsíc, Internet + TV Mých 10 od 440 Kč. Gigabit optika, instalace zdarma, bez závazku.',
    h1: 'Tarify PODA Internet 2026',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Vyberte si tarif, který vám vyhovuje. Všechny zahrnují instalaci zdarma a jsou bez závazku.</p>
      <div style="border:1px solid rgba(255,255,255,0.1); border-radius:0.75rem; padding:1.5rem; margin-bottom:1rem; background:rgba(255,255,255,0.03);">
        <h2 style="color:#d97706; margin-bottom:0.5rem;">Internet + TV Basic</h2>
        <p style="color:#f5f0e8; font-size:1.5rem; font-weight:700;">300 Kč/měsíc <span style="color:#9ca3af; font-size:0.875rem; font-weight:400;">(PROMO 12 měsíců, poté 440 Kč)</span></p>
        <p style="color:#9ca3af;">1000/1000 Mbps • 85+ TV programů • Instalace zdarma • Bez závazku</p>
      </div>
      <div style="border:1px solid rgba(217,119,6,0.3); border-radius:0.75rem; padding:1.5rem; background:rgba(217,119,6,0.05);">
        <h2 style="color:#d97706; margin-bottom:0.5rem;">Internet + TV Mých 10 ⭐</h2>
        <p style="color:#f5f0e8; font-size:1.5rem; font-weight:700;">440 Kč/měsíc <span style="color:#9ca3af; font-size:0.875rem; font-weight:400;">(PROMO 12 měsíců, poté 520 Kč)</span></p>
        <p style="color:#9ca3af;">1000/1000 Mbps • 100+ TV programů + 10 vlastních • Instalace zdarma • Bez závazku</p>
      </div>
    `
  },
  {
    route: '/internet-tv',
    title: 'Internet + TV od PODA | Gigabit s TV zdarma | Popri.cz',
    description: 'PODA Internet s TV službou zdarma. 85-100+ kanálů včetně HD a 4K. Optické připojení 1000 Mbps, bez závazku. Volejte 730 431 313.',
    h1: 'Internet + TV od PODA',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Gigabitový internet s kompletní TV službou v ceně. Sledujte 85+ kanálů na až 4 zařízeních současně.</p>
      <h2 style="color:#f5f0e8; margin-bottom:0.5rem;">Co získáte</h2>
      <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">
        <li>Optický internet 1000/1000 Mbps (GPON)</li>
        <li>PODA net.TV – IPTV na až 4 zařízeních</li>
        <li>85-100+ TV kanálů včetně HD a 4K</li>
        <li>Zpětné přehrávání až 7 dní</li>
        <li>Instalace a Wi-Fi router zdarma</li>
      </ul>
    `
  },
  {
    route: '/iptv',
    title: 'IPTV od PODA | 160+ kanálů s internetem zdarma | Popri.cz',
    description: 'PODA IPTV služba net.TV s 160+ kanály. Sledujte na smart TV, mobilu i tabletu. Součástí internetových tarifů zdarma.',
    h1: 'IPTV od PODA – net.TV',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Moderní IPTV služba PODA net.TV. Sledujte 160+ kanálů na libovolném zařízení.</p>
      <h2 style="color:#f5f0e8; margin-bottom:0.5rem;">Výhody PODA net.TV</h2>
      <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">
        <li>160+ TV kanálů včetně prémiových</li>
        <li>HD a 4K kvalita</li>
        <li>Zpětné přehrávání pořadů</li>
        <li>Multiscreen – až 4 zařízení současně</li>
        <li>Dostupné na Smart TV, mobilu, tabletu</li>
      </ul>
    `
  },
  {
    route: '/kontakt',
    title: 'Kontakt | PODA Internet Ostrava | 730 431 313 | Popri.cz',
    description: 'Kontaktujte nás pro PODA internet. Telefon: 730 431 313, email: terc@obchod.poda.cz. Objednejte připojení nebo ověřte dostupnost.',
    h1: 'Kontakt – PODA Internet',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Rádi vám pomůžeme s objednávkou nebo dotazy k PODA internetu.</p>
      <div style="border:1px solid rgba(217,119,6,0.3); border-radius:0.75rem; padding:1.5rem; background:rgba(217,119,6,0.05);">
        <h2 style="color:#d97706; margin-bottom:0.5rem;">Kontaktní údaje</h2>
        <p style="color:#f5f0e8; margin-bottom:0.5rem;">📞 Telefon: <a href="tel:+420730431313" style="color:#d97706; font-weight:700;">730 431 313</a></p>
        <p style="color:#f5f0e8; margin-bottom:0.5rem;">📧 Email: <a href="mailto:terc@obchod.poda.cz" style="color:#d97706;">terc@obchod.poda.cz</a></p>
        <p style="color:#9ca3af;">Provozní doba: Po–Pá 8:00–18:00</p>
      </div>
    `
  },
  {
    route: '/programy',
    title: 'TV Programy PODA net.TV | Seznam kanálů | Popri.cz',
    description: 'Kompletní seznam TV kanálů PODA net.TV. 160+ programů včetně sportovních, filmových a dětských kanálů v HD a 4K kvalitě.',
    h1: 'TV Programy – PODA net.TV',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Přehled všech TV kanálů dostupných v PODA net.TV. 160+ programů pro celou rodinu.</p>
      <h2 style="color:#f5f0e8; margin-bottom:0.5rem;">Kategorie kanálů</h2>
      <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">
        <li>České a slovenské kanály (ČT, Nova, Prima, Markíza)</li>
        <li>Sportovní kanály (O2 TV Sport, Eurosport, Nova Sport)</li>
        <li>Filmové kanály (HBO, Filmbox, AXN)</li>
        <li>Dětské kanály (JimJam, Cartoonito, Minimax)</li>
        <li>Zpravodajské kanály (CNN, BBC, ČT24)</li>
      </ul>
    `
  },
  {
    route: '/o-nas',
    title: 'O nás | Popri.cz – Autorizovaný partner PODA',
    description: 'Popri.cz je autorizovaný obchodní partner PODA a.s. Pomáháme domácnostem v Ostravě a okolí s rychlým internetovým připojením.',
    h1: 'O nás – Popri.cz',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Jsme popři vás při každém kroku k rychlému internetu.</p>
      <p style="color:#9ca3af; line-height:1.8; margin-bottom:1rem;">Popri.cz je autorizovaný obchodní zástupce společnosti PODA a.s. Specializujeme se na poskytování internetových služeb v Moravskoslezském kraji.</p>
      <p style="color:#9ca3af; line-height:1.8;">Nabízíme kompletní servis od konzultace, přes objednávku až po instalaci. Naším cílem je, aby každá domácnost měla přístup k rychlému a spolehlivému internetu za férovou cenu.</p>
    `
  },
  {
    route: '/giga-internet',
    title: 'Gigabitový internet PODA | 1000 Mbps optika | Popri.cz',
    description: 'Gigabitový internet od PODA. Symetrická rychlost 1000/1000 Mbps na optické síti GPON. Ideální pro práci z domova a streaming.',
    h1: 'Gigabitový internet od PODA',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Skutečný gigabit – symetrická rychlost 1000/1000 Mbps na optické síti GPON.</p>
      <h2 style="color:#f5f0e8; margin-bottom:0.5rem;">Pro koho je gigabit?</h2>
      <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">
        <li>Home office a videokonference bez sekání</li>
        <li>4K streaming na více zařízeních současně</li>
        <li>Online gaming s minimálním pingem</li>
        <li>Velké domácnosti s mnoha zařízeními</li>
      </ul>
    `
  },
  {
    route: '/promo-akce',
    title: 'Akční nabídka PODA Internet | Promo cena od 300 Kč | Popri.cz',
    description: 'Využijte akční nabídku PODA internetu. Internet + TV od 300 Kč/měsíc na 12 měsíců. Instalace zdarma, bez závazku. Volejte 730 431 313.',
    h1: 'Akční nabídka PODA Internet',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Exkluzivní promo akce – internet + TV od pouhých 300 Kč měsíčně!</p>
      <div style="border:1px solid rgba(217,119,6,0.3); border-radius:0.75rem; padding:1.5rem; background:rgba(217,119,6,0.05); margin-bottom:1rem;">
        <h2 style="color:#d97706; margin-bottom:0.5rem;">🎁 Co získáte v akci</h2>
        <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">
          <li>Internet 1000/1000 Mbps + TV od 300 Kč/měsíc</li>
          <li>PROMO cena na 12 měsíců</li>
          <li>Instalace a aktivace ZDARMA</li>
          <li>Wi-Fi router v ceně</li>
          <li>Bez závazku</li>
        </ul>
      </div>
      <a href="tel:+420730431313" style="background:#d97706; color:#0a0a0a; padding:0.75rem 2rem; border-radius:0.5rem; text-decoration:none; font-weight:600; display:inline-block;">📞 Objednat: 730 431 313</a>
    `
  },
  {
    route: '/blog',
    title: 'Blog | Tipy pro internet a technologie | Popri.cz',
    description: 'Články o internetu, Wi-Fi, IPTV a technologiích. Praktické rady jak zrychlit internet, vybrat router a využít optiku naplno.',
    h1: 'Blog – Internet a technologie',
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Praktické články a tipy ze světa internetu a technologií.</p>
      <ul style="color:#9ca3af; line-height:2.5; padding-left:1.5rem;">
        <li><a href="/blog/ostrava-gigabitovy-internet-exkluzivni-nabidka-poda-2026" style="color:#d97706; text-decoration:none;">Ostrava: Gigabitový internet – Exkluzivní nabídka PODA 2026</a></li>
        <li><a href="/blog/jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025" style="color:#d97706; text-decoration:none;">Jak zlepšit WiFi signál doma – 10 ověřených triků</a></li>
        <li><a href="/blog/poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy" style="color:#d97706; text-decoration:none;">PODA Internet 2026 – Optická éra</a></li>
        <li><a href="/blog/jak-ai-meni-svet-proc-kvalitni-internet-zaklad" style="color:#d97706; text-decoration:none;">Jak AI mění svět: Proč je kvalitní internet základ</a></li>
        <li><a href="/blog/gpon-technologie-jak-funguje-moderni-opticky-internet" style="color:#d97706; text-decoration:none;">GPON Technologie – Jak funguje moderní optický internet</a></li>
        <li><a href="/blog/home-office-2025-jak-nastavit-domaci-kancelar-produktivita" style="color:#d97706; text-decoration:none;">Home Office – Jaký internet potřebujete pro práci z domova</a></li>
        <li><a href="/blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025" style="color:#d97706; text-decoration:none;">Pomalý internet? 8 způsobů jak problém vyřešit</a></li>
      </ul>
    `
  },
  // City pages
  ...generateCityPages()
];

function generateCityPages() {
  const cities = [
    { slug: 'ostrava', name: 'Ostrava', districts: 'Poruba, Moravská Ostrava, Slezská Ostrava, Zábřeh, Hrabůvka, Dubina', coverage: '98%' },
    { slug: 'karvina', name: 'Karviná', districts: 'Fryštát, Darkov, Nové Město, Hranice', coverage: '95%' },
    { slug: 'havirov', name: 'Havířov', districts: 'Město, Podlesí, Šumbark, Životice', coverage: '96%' },
    { slug: 'bohumin', name: 'Bohumín', districts: 'Starý Bohumín, Nový Bohumín, Skřečoň', coverage: '100%' },
    { slug: 'poruba', name: 'Ostrava-Poruba', districts: 'všechny části Poruby', coverage: '100%' },
  ];

  return cities.map(city => ({
    route: `/internet-${city.slug}`,
    title: `Internet ${city.name} | PODA optika 1000 Mbps | Popri.cz`,
    description: `PODA internet v ${city.name === 'Ostrava-Poruba' ? 'Ostravě-Porubě' : city.name.endsWith('á') ? city.name.slice(0, -1) + 'é' : city.name.endsWith('ov') ? city.name + 'ě' : city.name.endsWith('ín') ? city.name + 'ě' : city.name}. Gigabitové optické připojení 1000 Mbps + TV zdarma. Pokrytí ${city.coverage}. Volejte 730 431 313.`,
    h1: `Internet ${city.name} – PODA optické připojení`,
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Gigabitový optický internet od PODA v ${city.name}. Pokrytí ${city.coverage} v oblastech: ${city.districts}.</p>
      <h2 style="color:#f5f0e8; margin-bottom:0.5rem;">Dostupné tarify v ${city.name}</h2>
      <div style="border:1px solid rgba(255,255,255,0.1); border-radius:0.75rem; padding:1.5rem; margin-bottom:1rem; background:rgba(255,255,255,0.03);">
        <h3 style="color:#d97706; margin-bottom:0.5rem;">Internet + TV Basic</h3>
        <p style="color:#f5f0e8; font-size:1.5rem; font-weight:700;">300 Kč/měsíc</p>
        <p style="color:#9ca3af;">1000/1000 Mbps • 85+ TV programů • Instalace zdarma</p>
      </div>
      <div style="border:1px solid rgba(217,119,6,0.3); border-radius:0.75rem; padding:1.5rem; background:rgba(217,119,6,0.05);">
        <h3 style="color:#d97706; margin-bottom:0.5rem;">Internet + TV Mých 10 ⭐</h3>
        <p style="color:#f5f0e8; font-size:1.5rem; font-weight:700;">440 Kč/měsíc</p>
        <p style="color:#9ca3af;">1000/1000 Mbps • 100+ TV programů + 10 vlastních • Instalace zdarma</p>
      </div>
      <h2 style="color:#f5f0e8; margin-top:2rem; margin-bottom:0.5rem;">Pokrytí v ${city.name}</h2>
      <p style="color:#9ca3af; line-height:1.8;">PODA internet pokrývá ${city.coverage} oblasti ${city.name}: ${city.districts}. Ověřte dostupnost na vaší adrese voláním na <a href="tel:+420730431313" style="color:#d97706;">730 431 313</a>.</p>
    `
  }));
}

// ============================================================
// Template: wraps content in the same structure as index.html fallback
// ============================================================
function generatePageHtml(baseHtml, page) {
  let html = baseHtml;

  // 1. Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${page.title}</title>`
  );

  // 2. Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${page.description}">`
  );

  // 3. Add/replace canonical URL
  const canonical = `${BASE_URL}${page.route}`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${canonical}">`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${canonical}">\n  </head>`
    );
  }

  // 4. Add OG tags for this specific page
  const ogTags = `
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
  `;
  html = html.replace('</head>', `${ogTags}\n  </head>`);

  // 5. Replace #ssr-fallback content with page-specific content
  const fallbackContent = `
      <div id="ssr-fallback" style="background:#0a0a0a; color:#f5f0e8; min-height:100vh; font-family:system-ui,sans-serif;">
        <nav style="padding:1rem 2rem; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.1);">
          <a href="/" style="color:#d97706; font-size:1.5rem; font-weight:700; text-decoration:none;">popri.cz</a>
          <div style="display:flex; gap:1rem; align-items:center;">
            <a href="/tarify" style="color:#9ca3af; text-decoration:none; font-size:0.875rem;">Tarify</a>
            <a href="/blog" style="color:#9ca3af; text-decoration:none; font-size:0.875rem;">Blog</a>
            <a href="tel:+420730431313" style="color:#d97706; text-decoration:none; font-size:0.875rem; font-weight:600;">730 431 313</a>
          </div>
        </nav>
        
        <main style="max-width:900px; margin:0 auto; padding:2rem 1rem;">
          <section style="padding:2rem 0;">
            <h1 style="font-size:2.5rem; font-weight:700; margin-bottom:1rem; color:#f5f0e8;">
              ${page.h1}
            </h1>
            ${page.content}
          </section>

          <section style="margin:2rem 0; text-align:center; padding:2rem; border:1px solid rgba(217,119,6,0.3); border-radius:0.75rem; background:rgba(217,119,6,0.05);">
            <h2 style="font-size:1.5rem; color:#f5f0e8; margin-bottom:0.5rem;">Kontaktujte nás</h2>
            <p style="color:#9ca3af; margin-bottom:1rem;">Telefon: <a href="tel:+420730431313" style="color:#d97706; text-decoration:none; font-weight:700;">730 431 313</a></p>
            <p style="color:#9ca3af; margin-bottom:1rem;">Email: <a href="mailto:terc@obchod.poda.cz" style="color:#d97706; text-decoration:none;">terc@obchod.poda.cz</a></p>
          </section>

          <nav style="margin:2rem 0;">
            <ul style="list-style:none; padding:0; display:flex; flex-wrap:wrap; gap:0.5rem;">
              <li><a href="/" style="color:#d97706; text-decoration:none; padding:0.25rem 0.75rem; border:1px solid rgba(217,119,6,0.3); border-radius:1rem; font-size:0.875rem;">Úvod</a></li>
              <li><a href="/tarify" style="color:#d97706; text-decoration:none; padding:0.25rem 0.75rem; border:1px solid rgba(217,119,6,0.3); border-radius:1rem; font-size:0.875rem;">Tarify</a></li>
              <li><a href="/iptv" style="color:#d97706; text-decoration:none; padding:0.25rem 0.75rem; border:1px solid rgba(217,119,6,0.3); border-radius:1rem; font-size:0.875rem;">IPTV</a></li>
              <li><a href="/kontakt" style="color:#d97706; text-decoration:none; padding:0.25rem 0.75rem; border:1px solid rgba(217,119,6,0.3); border-radius:1rem; font-size:0.875rem;">Kontakt</a></li>
              <li><a href="/blog" style="color:#d97706; text-decoration:none; padding:0.25rem 0.75rem; border:1px solid rgba(217,119,6,0.3); border-radius:1rem; font-size:0.875rem;">Blog</a></li>
            </ul>
          </nav>
        </main>
        
        <footer style="padding:1.5rem 2rem; border-top:1px solid rgba(255,255,255,0.1); text-align:center; color:#6b7280; font-size:0.875rem;">
          <p>© 2026 Popri.cz – Autorizovaný partner PODA a.s. | <a href="tel:+420730431313" style="color:#d97706; text-decoration:none;">730 431 313</a></p>
        </footer>
      </div>`;

  // Replace existing ssr-fallback div
  html = html.replace(
    /<div id="ssr-fallback"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    fallbackContent
  );

  return html;
}

// ============================================================
// Main
// ============================================================
function main() {
  console.log('🔨 Starting static prerendering...');

  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  let count = 0;

  for (const page of PAGES) {
    const routeDir = path.join(DIST_DIR, page.route);
    const outputPath = path.join(routeDir, 'index.html');

    // Don't overwrite if already exists (e.g. from Vite build)
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${page.route} (already exists)`);
      continue;
    }

    fs.mkdirSync(routeDir, { recursive: true });

    const pageHtml = generatePageHtml(baseHtml, page);
    fs.writeFileSync(outputPath, pageHtml);
    count++;
    console.log(`✅ ${page.route}/index.html`);
  }

  console.log(`\n🎉 Prerendered ${count} pages successfully!`);
}

main();

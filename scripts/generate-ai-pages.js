/**
 * Generate AI-optimized static HTML pages
 * These pages are served to AI bots for better content understanding
 * 
 * SPRÁVNE ÚDAJE (aktualizované):
 * - Telefón: 730 431 313
 * - Ceny: PODA 100 = 300 Kč, PODA 300 = 440 Kč, PODA 500 = 490 Kč, PODA 1000 = 520 Kč
 * - TV kanály: 85+ (Basic), 95+ (celkovo)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Správne kontaktné údaje
const CONTACT = {
  phone: '730 431 313',
  phoneFormatted: '+420 730 431 313',
  web: 'www.popri.cz'
};

// Správne ceny tarifov
const TARIFFS = {
  poda100: { speed: '100 Mbps', price: '300 Kč/měsíc' },
  poda300: { speed: '300 Mbps', price: '440 Kč/měsíc', tv: 'IPTV Basic zdarma' },
  poda500: { speed: '500 Mbps', price: '490 Kč/měsíc', tv: 'IPTV Standard zdarma' },
  poda1000: { speed: '1000 Mbps', price: '520 Kč/měsíc', tv: 'IPTV Premium zdarma' }
};

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
    title: 'Nejvýhodnější PODA Internet + TV | Tel: 730 431 313',
    description: 'Rychlé a spolehlivé optické připojení pro vaše město. Gigabitový internet až 1000 Mbps s TV zdarma a profesionální instalací. Volejte 730 431 313.',
    content: `
      <h1>PODA Internet s TV Zdarma - Autorizovaný partner</h1>
      <p>Poskytujeme rychlé a spolehlivé internetové připojení PODA v Ostravě a okolí s gigabitovými rychlostmi a televizním vysíláním zdarma.</p>
      
      <h2>Naše služby</h2>
      <ul>
        <li>Gigabitový internet PODA až 1000 Mbps</li>
        <li>Televizní vysílání zdarma (85+ kanálů)</li>
        <li>IPTV služby s HD kvalitou</li>
        <li>Optické připojení GPON s 99,9% dostupností</li>
        <li>Technická podpora</li>
      </ul>
      
      <h2>Cenové balíčky PODA 2025</h2>
      <h3>PODA 100</h3>
      <p>Cena: 300 Kč/měsíc | Rychlost: 100/100 Mbps</p>
      
      <h3>PODA 300</h3>
      <p>Cena: 440 Kč/měsíc | Rychlost: 300/300 Mbps | TV Basic zdarma (40+ kanálů)</p>
      
      <h3>PODA 500</h3>
      <p>Cena: 490 Kč/měsíc | Rychlost: 500/500 Mbps | TV Standard zdarma (60+ kanálů)</p>
      
      <h3>PODA 1000 ⭐ Nejoblíbenější</h3>
      <p>Cena: 520 Kč/měsíc | Rychlost: 1000/1000 Mbps | TV Premium zdarma (85+ kanálů)</p>
      
      <h2>Pokrytí</h2>
      <p>Poskytujeme služby v těchto lokalitách:</p>
      <ul>
        <li>Ostrava (Poruba, Zábřeh, Hrabůvka, Dubina, Bělský Les, Vítkovice)</li>
        <li>Karviná (Hranice, Mizerov, Nové Město)</li>
        <li>Havířov (Šumbark, Podlesí, Město)</li>
        <li>Bohumín (Nový Bohumín, Skřečoň)</li>
        <li>Frýdek-Místek, Orlová, Opava</li>
      </ul>
      
      <h2>Výhody PODA internetu</h2>
      <ul>
        <li>Rychlá instalace</li>
        <li>Bez závazků a skrytých poplatků</li>
        <li>Stabilní připojení s 99,9% dostupností</li>
        <li>TV vysílání v HD kvalitě zdarma</li>
        <li>Symetrická rychlost (download = upload)</li>
      </ul>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
      <p>Web: <a href="https://www.popri.cz">www.popri.cz</a></p>
      <p>Oblast: Moravskoslezský kraj</p>
    `
  },
  '/tarify': {
    title: 'Ceník PODA Internet 2025 | Tarify od 300 Kč | Popri.cz',
    description: 'Kompletní ceník internetových tarifů PODA 2025. Internet od 300 Kč/měsíc. Gigabit za 520 Kč. IPTV zdarma k vyšším tarifům. Bez závazku.',
    content: `
      <h1>Ceník PODA Internet 2025</h1>
      <p>Všechny tarify od PODA 300 obsahují TV vysílání zdarma.</p>
      
      <h2>PODA 100</h2>
      <ul>
        <li>Rychlost: 100/100 Mbps (symetrická)</li>
        <li>Cena: 300 Kč/měsíc</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>PODA 300</h2>
      <ul>
        <li>Rychlost: 300/300 Mbps (symetrická)</li>
        <li>Cena: 440 Kč/měsíc</li>
        <li>TV: IPTV Basic zdarma (40+ kanálů)</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>PODA 500</h2>
      <ul>
        <li>Rychlost: 500/500 Mbps (symetrická)</li>
        <li>Cena: 490 Kč/měsíc</li>
        <li>TV: IPTV Standard zdarma (60+ kanálů)</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>PODA 1000 - Gigabit ⭐ Nejoblíbenější</h2>
      <ul>
        <li>Rychlost: 1000/1000 Mbps (symetrická)</li>
        <li>Cena: 520 Kč/měsíc</li>
        <li>TV: IPTV Premium zdarma (85+ kanálů)</li>
        <li>Instalace: 0 Kč</li>
        <li>Bez závazků</li>
      </ul>
      
      <h2>Co je v ceně zahrnuto</h2>
      <ul>
        <li>Symetrické připojení (stejná rychlost nahoru i dolů)</li>
        <li>Neomezená data bez FUP</li>
        <li>WiFi router v ceně</li>
        <li>Profesionální instalace zdarma</li>
        <li>Technická podpora</li>
        <li>TV vysílání přes IPTV (od tarifu PODA 300)</li>
      </ul>
      
      <h2>Objednat</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/internet-ostrava': {
    title: 'Internet Ostrava | PODA Optické Připojení + TV Zdarma | 730 431 313',
    description: 'Nejrychlejší optický internet v Ostravě. Gigabit až 1000 Mbps od 300 Kč/měsíc. IPTV zdarma. Pokrytí: Poruba, Zábřeh, Hrabůvka, Dubina. Volejte 730 431 313.',
    content: `
      <h1>PODA Internet Ostrava</h1>
      <p>Poskytujeme rychlé optické internetové připojení ve všech obvodech Ostravy.</p>
      
      <h2>Pokrytí v Ostravě</h2>
      <ul>
        <li>Poruba</li>
        <li>Zábřeh</li>
        <li>Hrabůvka</li>
        <li>Dubina</li>
        <li>Bělský Les</li>
        <li>Mariánské Hory</li>
        <li>Vítkovice</li>
        <li>Moravská Ostrava</li>
      </ul>
      
      <h2>Dostupné tarify v Ostravě</h2>
      <p>PODA 100: 300 Kč/měsíc | PODA 300: 440 Kč/měsíc | PODA 500: 490 Kč/měsíc | PODA 1000: 520 Kč/měsíc</p>
      
      <h2>Výhody</h2>
      <ul>
        <li>TV vysílání 85+ kanálů zdarma (od PODA 300)</li>
        <li>Rychlá instalace</li>
        <li>Bez instalačních poplatků</li>
        <li>Symetrická rychlost</li>
      </ul>
      
      <h2>Kontakt pro Ostravu</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/internet-karvina': {
    title: 'Internet Karviná | PODA Optické Připojení + TV Zdarma | 730 431 313',
    description: 'Nejrychlejší optický internet v Karviné. Gigabit až 1000 Mbps od 300 Kč/měsíc. IPTV zdarma. Pokrytí: Hranice, Mizerov, Nové Město. Volejte 730 431 313.',
    content: `
      <h1>PODA Internet Karviná</h1>
      <p>Kvalitní optické internetové připojení v Karviné a okolí.</p>
      
      <h2>Pokrytí v Karviné</h2>
      <ul>
        <li>Hranice</li>
        <li>Mizerov</li>
        <li>Nové Město</li>
        <li>Fryštát</li>
        <li>Ráj</li>
      </ul>
      
      <h2>Tarify</h2>
      <p>Od 300 Kč/měsíc. PODA 1000 (gigabit) za 520 Kč/měsíc včetně TV Premium zdarma.</p>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/internet-havirov': {
    title: 'Internet Havířov | PODA Optické Připojení + TV Zdarma | 730 431 313',
    description: 'Nejrychlejší optický internet v Havířově. Gigabit až 1000 Mbps od 300 Kč/měsíc. IPTV zdarma. Pokrytí: Šumbark, Podlesí, Město. Volejte 730 431 313.',
    content: `
      <h1>PODA Internet Havířov</h1>
      <p>Rychlé a stabilní optické připojení v Havířově.</p>
      
      <h2>Pokrytí</h2>
      <ul>
        <li>Šumbark</li>
        <li>Podlesí</li>
        <li>Město</li>
        <li>Životice</li>
        <li>Bludovice</li>
        <li>Prostřední Suchá</li>
      </ul>
      
      <h2>Ceny</h2>
      <p>PODA 100: 300 Kč | PODA 300: 440 Kč | PODA 500: 490 Kč | PODA 1000: 520 Kč/měsíc. TV zdarma od PODA 300.</p>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/internet-bohumin': {
    title: 'Internet Bohumín | PODA Optické Připojení + TV Zdarma | 730 431 313',
    description: 'Nejrychlejší optický internet v Bohumíně. Gigabit až 1000 Mbps od 300 Kč/měsíc. IPTV zdarma. Pokrytí: Nový Bohumín, Skřečoň. Volejte 730 431 313.',
    content: `
      <h1>PODA Internet Bohumín</h1>
      <p>Poskytujeme internetové služby v Bohumíně a okolních obcích.</p>
      
      <h2>Dostupnost</h2>
      <ul>
        <li>Nový Bohumín</li>
        <li>Skřečoň</li>
        <li>Starý Bohumín</li>
        <li>Záblatí</li>
        <li>Pudlov</li>
      </ul>
      
      <h2>Tarify</h2>
      <p>Od 300 Kč/měsíc. Gigabit za 520 Kč včetně TV Premium.</p>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/internet-poruba': {
    title: 'Internet Poruba | PODA Optické Připojení + TV Zdarma | 730 431 313',
    description: 'Nejrychlejší optický internet v Porubě, Ostrava. Gigabit až 1000 Mbps od 300 Kč/měsíc. IPTV zdarma. Volejte 730 431 313.',
    content: `
      <h1>PODA Internet Poruba</h1>
      <p>Specializujeme se na poskytování optického internetu v Porubě, největším obvodu Ostravy.</p>
      
      <h2>Pokrytí v Porubě</h2>
      <ul>
        <li>Poruba I-VIII</li>
        <li>Všechny panelové domy</li>
        <li>Bytové domy</li>
      </ul>
      
      <h2>Služby</h2>
      <p>Internet 100-1000 Mbps, TV vysílání HD zdarma od tarifu PODA 300, rychlá instalace.</p>
      
      <h2>Ceny</h2>
      <p>PODA 100: 300 Kč | PODA 300: 440 Kč | PODA 500: 490 Kč | PODA 1000: 520 Kč/měsíc</p>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/iptv': {
    title: 'IPTV - Televizní Vysílání Zdarma | Popri.cz',
    description: 'IPTV televizní vysílání zdarma k internetu PODA. 85+ kanálů v HD kvalitě bez dodatečných poplatků. Volejte 730 431 313.',
    content: `
      <h1>IPTV - TV Vysílání Zdarma</h1>
      <p>K internetu PODA od tarifu 300 dostanete televizní vysílání zdarma prostřednictvím IPTV.</p>
      
      <h2>Co je IPTV?</h2>
      <p>IPTV (Internet Protocol Television) je digitální televizní vysílání přenášené přes optické připojení. Nabízí lepší kvalitu obrazu a zvuku než klasické analogové nebo satelitní vysílání.</p>
      
      <h2>IPTV balíčky</h2>
      <h3>IPTV Basic (zdarma k PODA 300)</h3>
      <p>40+ kanálů v HD kvalitě</p>
      
      <h3>IPTV Standard (zdarma k PODA 500)</h3>
      <p>60+ kanálů v HD kvalitě</p>
      
      <h3>IPTV Premium (zdarma k PODA 1000)</h3>
      <p>85+ kanálů v HD kvalitě včetně HBO, Sport</p>
      
      <h2>Výhody IPTV</h2>
      <ul>
        <li>HD kvalita obrazu</li>
        <li>Žádné dodatečné poplatky</li>
        <li>Elektronický programový průvodce (EPG)</li>
        <li>Zpětné přehrávání (Archiv)</li>
      </ul>
      
      <h2>Dostupné kanály</h2>
      <p>ČT1, ČT2, ČT24, ČT Sport, Nova, Nova Cinema, Prima, Prima Cool, Sport1, Sport2, HBO, dokumentární, dětské a další.</p>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/blog': {
    title: 'Blog - Tipy a Novinky | Popri.cz',
    description: 'Zajímavé články o internetu, IPTV a technologiích. Rady jak zlepšit připojení, přehledy tarifů a novinky. Volejte 730 431 313.',
    content: `
      <h1>Blog Popri.cz</h1>
      <p>Najdete zde užitečné články, tipy a novinky ze světa internetu a technologií.</p>
      
      <h2>Oblíbené články</h2>
      <ul>
        <li><a href="/blog/o2-nej-prevzatie-poda-alternativa-zakaznici">O2 Nej Převzetí - PODA Alternativa pro Zákazníky</a></li>
        <li><a href="/blog/jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025">Jak zlepšit WiFi signál - 10 triků</a></li>
        <li><a href="/blog/gpon-technologie-opticky-internet-jak-funguje">GPON Technologie - Budoucnost Optického Internetu</a></li>
        <li><a href="/blog/pomaly-internet-8-zpusobu-jak-vyriesit-msk-2025">Pomalý Internet? 10 Způsobů Jak Zrychlit</a></li>
        <li><a href="/blog/iptv-vs-tradicni-televize-co-je-lepsi-2025">IPTV vs Tradiční TV - Co Je Lepší?</a></li>
      </ul>
      
      <h2>Kategorie</h2>
      <ul>
        <li>Internet - Rady a tipy k internetovému připojení</li>
        <li>IPTV - Vše o televizním vysílání</li>
        <li>Technologie - Novinky ze světa IT</li>
        <li>Tipy - Praktické návody</li>
      </ul>
      
      <h2>Kontakt</h2>
      <p><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></p>
    `
  },
  '/kontakt': {
    title: 'Kontakt | PODA Internet Ostrava | 730 431 313 | Popri.cz',
    description: 'Kontaktujte nás pro sjednání PODA internetu. Telefon 730 431 313. Pokrytí: Ostrava, Karviná, Havířov, Bohumín. Odpovídáme do 24 hodin.',
    content: `
      <h1>Kontakt</h1>
      
      <h2>Objednávky a dotazy</h2>
      <p>Pro objednání služeb nebo dotazy ohledně připojení nás kontaktujte:</p>
      <ul>
        <li><strong>Telefon: <a href="tel:+420730431313">730 431 313</a></strong></li>
        <li>Web: <a href="https://www.popri.cz/kontakt">www.popri.cz/kontakt</a></li>
        <li>Provozní doba: Po-Pá 8:00-18:00</li>
      </ul>
      
      <h2>Co pro vás zařídíme</h2>
      <ul>
        <li>Zdarma ověříme dostupnost ve vaší adrese</li>
        <li>Poradíme s výběrem optimálního tarifu</li>
        <li>Zajistíme rychlou instalaci</li>
        <li>Odpovídáme na dotazy do 24 hodin</li>
      </ul>
      
      <h2>Provozní oblasti</h2>
      <ul>
        <li>Ostrava (Poruba, Zábřeh, Hrabůvka, Dubina, Bělský Les, Vítkovice)</li>
        <li>Karviná (Hranice, Mizerov, Nové Město)</li>
        <li>Havířov (Šumbark, Podlesí, Město)</li>
        <li>Bohumín (Nový Bohumín, Skřečoň)</li>
      </ul>
      
      <h2>O nás</h2>
      <p>Jsme autorizovaný partner PODA a.s., největšího regionálního poskytovatele optického internetu v Moravskoslezském kraji.</p>
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
      <p>Tento článek poskytuje podrobné informace o tématu: ${article.title.toLowerCase()}.</p>
      
      <h2>Proč je toto důležité?</h2>
      <p>V dnešní době rychlého internetového připojení je klíčové rozumět možnostem a technologiím, které jsou k dispozici. PODA internet poskytuje řešení přizpůsobená vašim potřebám.</p>
      
      <h2>Tarify PODA 2025</h2>
      <ul>
        <li>PODA 100: 300 Kč/měsíc (100 Mbps)</li>
        <li>PODA 300: 440 Kč/měsíc (300 Mbps + TV Basic)</li>
        <li>PODA 500: 490 Kč/měsíc (500 Mbps + TV Standard)</li>
        <li>PODA 1000: 520 Kč/měsíc (1000 Mbps + TV Premium)</li>
      </ul>
      
      <h2>Zaujalo vás to?</h2>
      <p>Kontaktujte nás na telefonním čísle <a href="tel:+420730431313">730 431 313</a> nebo navštivte <a href="https://www.popri.cz">www.popri.cz</a> pro více informací.</p>
      
      <h2>Další články</h2>
      <ul>
        <li><a href="https://www.popri.cz/blog">Všechny blog články</a></li>
        <li><a href="https://www.popri.cz/tarify">Cenové balíčky</a></li>
        <li><a href="https://www.popri.cz/internet-ostrava">Internet v Ostravě</a></li>
      </ul>
    `
  };
});

function generateAIStaticHTML(pagePath, data) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <meta name="description" content="${data.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.popri.cz${pagePath}">
  
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
    "url": "https://www.popri.cz${pagePath}",
    "inLanguage": "cs",
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz - Autorizovaný partner PODA",
      "url": "https://www.popri.cz",
      "telephone": "+420730431313"
    }
  }
  </script>
  
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    h1 { color: #1a1a2e; font-size: 2rem; margin-bottom: 0.5em; }
    h2 { color: #16213e; font-size: 1.5em; margin-top: 1.5em; }
    h3 { color: #0f3460; font-size: 1.2em; }
    ul { margin: 1em 0; padding-left: 2em; }
    li { margin: 0.5em 0; }
    p { margin: 1em 0; }
    a { color: #e74c3c; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .phone { font-size: 1.5rem; font-weight: bold; color: #e74c3c; }
    .cta { background: #e74c3c; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 8px; display: inline-block; margin: 1rem 0; }
  </style>
</head>
<body>
  <main>
    ${data.content}
    
    <hr style="margin: 3em 0; border: 1px solid #eee;">
    
    <section>
      <h2>Kontaktní informace</h2>
      <p class="phone">📞 <a href="tel:+420730431313">730 431 313</a></p>
      <p><strong>Web:</strong> <a href="https://www.popri.cz">www.popri.cz</a></p>
      <a href="https://www.popri.cz/kontakt" class="cta">Objednat online</a>
    </section>
    
    <footer style="margin-top: 3em; padding-top: 2em; border-top: 1px solid #eee; color: #666;">
      <p>© 2025 Popri.cz - Autorizovaný partner PODA a.s. | Moravskoslezský kraj</p>
    </footer>
  </main>
</body>
</html>`;
}

// Main execution
console.log('🤖 Generating AI-optimized static pages...');
console.log('📞 Using phone: 730 431 313');
console.log('💰 Using prices: 300/440/490/520 Kč');

const aiStaticDir = path.join(__dirname, '..', 'public', 'ai-static');

// Create ai-static directory if it doesn't exist
if (!fs.existsSync(aiStaticDir)) {
  fs.mkdirSync(aiStaticDir, { recursive: true });
  console.log('✅ Created ai-static directory');
}

// Generate HTML files for each page
let generatedCount = 0;
for (const [pagePath, pageData] of Object.entries(AI_PAGES)) {
  // Handle nested paths like /blog/article-slug
  let fileName;
  if (pagePath === '/') {
    fileName = 'index.html';
  } else if (pagePath.startsWith('/blog/')) {
    // Create blog subdirectory
    const blogDir = path.join(aiStaticDir, 'blog');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }
    const slug = pagePath.replace('/blog/', '');
    fileName = `blog/${slug}.html`;
  } else {
    fileName = `${pagePath.slice(1)}.html`;
  }
  
  const filePath = path.join(aiStaticDir, fileName);
  const htmlContent = generateAIStaticHTML(pagePath, pageData);
  
  fs.writeFileSync(filePath, htmlContent);
  generatedCount++;
  console.log(`✅ Generated: ${fileName}`);
}

console.log(`\n🎉 Generated ${generatedCount} AI-optimized static pages`);
console.log('📁 Location: public/ai-static/');
console.log('🔗 Access via: /ai-static/index.html');

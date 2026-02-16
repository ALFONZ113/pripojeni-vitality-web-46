/**
 * Generate AI-optimized static HTML pages
 * These pages are served to AI bots for better content understanding
 * 
 * SPRÁVNÉ ÚDAJE (synchronizované s webem):
 * - Telefón: 730 431 313
 * - Email: terc@obchod.poda.cz
 * - Tarify:
 *   - Internet + TV Basic: PROMO 300 Kč / standard 440 Kč, 1000/1000 Mbps (GPON) nebo 1000/200 Mbps (60GHz), 85+ TV programů
 *   - Internet + TV Mých 10: PROMO 440 Kč / standard 520 Kč, 1000/1000 Mbps (GPON) nebo 1000/200 Mbps (60GHz), 100+ TV programů + výběr 10 vlastních
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// Contact & tariff data
// ============================================================
const CONTACT = {
  phone: '730 431 313',
  phoneFormatted: '+420 730 431 313',
  email: 'terc@obchod.poda.cz',
  web: 'www.popri.cz'
};

const TARIFFS = {
  basic: { 
    name: 'Internet + TV Basic',
    speedGPON: '1000/1000 Mbps',
    speed60GHz: '1000/200 Mbps',
    pricePromo: '300 Kč/měsíc',
    priceStandard: '440 Kč/měsíc',
    tv: '85+ TV programů'
  },
  mych10: { 
    name: 'Internet + TV Mých 10',
    speedGPON: '1000/1000 Mbps',
    speed60GHz: '1000/200 Mbps',
    pricePromo: '440 Kč/měsíc',
    priceStandard: '520 Kč/měsíc',
    tv: '100+ TV programů + výběr 10 vlastních'
  }
};

// ============================================================
// ALL blog articles - complete list for static HTML generation
// Each new article added here will automatically get a static OG file
// ============================================================
const ALL_BLOG_ARTICLES = [
  { slug: 'operatori-meni-ceny-internetu-fakta-prava-zakazniku', title: 'Operátoři mění ceny internetu: co je pravda a jak se to týká domácností v Česku', description: 'Zdražují operátoři internet v Česku? Ověřená fakta o změnách cen a práva zákazníků.' },
  { slug: 'jak-ai-meni-svet-proc-kvalitni-internet-zaklad', title: 'Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ', description: 'Umělá inteligence mění práci, zábavu i domácnosti. Proč je rychlý internet klíčem.' },
  { slug: 'proc-internet-doma-pomaluje-vecer-a-jak-to-vyresit', title: 'Proč internet doma zpomaluje večer? (A jak to vyřešit)', description: '6 ověřených řešení pro stabilní připojení i ve špičce.' },
  { slug: 'nejcastejsi-myty-o-optickem-internetu', title: 'Nejčastější mýty o optickém internetu - Pravda vs. fikce', description: 'Odhalujeme nejčastější omyly o optickém internetu.' },
  { slug: 'poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy', title: 'PODA Internet 2026 - Optická éra až 2 gigabity', description: 'Kompletní průvodce PODA internetem v roce 2026.' },
  { slug: 'home-office-2025-jak-nastavit-domaci-kancelar-produktivita', title: 'Home Office - Jaký internet potřebujete pro práci z domova', description: 'Požadavky na internet pro home office.' },
  { slug: 'jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025', title: 'Jak zlepšit WiFi signál doma - 10 ověřených triků 2025', description: '10 praktických triků jak zlepšit WiFi signál doma.' },
  { slug: 'ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi', title: 'Jak si vybrat internet do bytu - 5 chyb, které dělá 80% lidí', description: 'Vyvarujte se 5 nejčastějších chyb při výběru internetu.' },
  { slug: 'gpon-technologie-jak-funguje-moderni-opticky-internet', title: 'GPON Technologie - Jak funguje moderní optický internet', description: 'Kompletní průvodce GPON technologií.' },
  { slug: 'o2-nej-prevzatie-poda-alternativa-zakaznici', title: 'O2 převzalo Nej.cz - PODA jako alternativa pro zákazníky', description: 'Proč je PODA lepší alternativa po převzetí Nej.cz.' },
  { slug: 'iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod', title: 'TV přes internet vs klasická kabelová / satelitní televize — srovnání', description: 'Porovnání IPTV a klasické TV.' },
  { slug: 'nejcastejsi-otazky-pripojeni-internet-panelak', title: 'Nejčastější otázky o připojení internetu v paneláku', description: 'Odpovídáme na nejčastější otázky o internetu v bytových domech.' },
  { slug: 'polanka-nad-odrou-60ghz-pripojeni-2025', title: 'PODA 2025: Polanka nad Odrou připojena revolučním 60 GHz připojením', description: '60 GHz technologie pro ultrarychlé připojení rodinných domů.' },
  { slug: 'internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda', title: 'Internetové připojení pro online hráče v Ostravě', description: 'Jak dosáhnout nejnižšího pingu a nejvyšší stability pro gaming.' },
  { slug: 'pomaly-internet-8-sposobu-jak-vyresit-msk-2025', title: 'Pomalý internet? 8 způsobů jak vyřešit problém v MSK 2025', description: '8 ověřených způsobů jak zrychlit pomalé internetové připojení.' },
  { slug: 'nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025', title: 'Jak najít nejlepší internet v Ostravě, Karviné a Havířově', description: 'Kompletní průvodce výběrem internetového připojení v MSK.' },
  { slug: 'rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda', title: 'Rychlý internet v Karviné: Revoluce v připojení domácností díky PODA', description: 'Karviná vstupuje do digitální budoucnosti díky PODA.' },
  { slug: 'internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025', title: 'Internet PODA Ostrava: Nejrychlejší optické připojení v MSK', description: 'PODA nabízí nejkonkurenceschopnější internetové služby v Ostravě.' },
  { slug: 'optika-vs-med-ostravsko-internet-21-stoleti', title: 'Optika vs. měď: Proč Ostravsko konečně dostává internet 21. století', description: 'Proč optické připojení PODA mění hru na Ostravsku.' },
  { slug: 'gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu', title: 'GPON technologie v Moravskoslezském regionu: Revoluce optického internetu', description: 'Přehled GPON technologie a výhod pro domácnosti v MSK.' },
  { slug: 'jak-vybrat-spravny-router-domov-kompletni-pruvodce-2025', title: 'Jak vybrat správný router pro váš domov: Kompletní průvodce 2025', description: 'Vše o výběru routeru pro domácí použití.' },
  { slug: 'mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov', title: 'Mesh systémy vs. klasické routery: Co je lepší pro váš domov?', description: 'Kompletní porovnání mesh systémů a klasických routerů.' },
  { slug: 'zabezpeceni-domaci-wifi-site-kompletni-pruvodce-bezpecnosti', title: 'Zabezpečení domácí Wi-Fi sítě: Kompletní průvodce bezpečností', description: 'Ochrana domácí Wi-Fi sítě před hackery a útoky.' },
  { slug: 'jak-vybrat-nejlepsi-tv-balicek-vasi-rodinu', title: 'Jak vybrat nejlepší TV balíček pro vaši rodinu', description: 'Praktický průvodce výběrem televizního balíčku.' },
  { slug: 'nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky', title: 'Nejlepší způsob sledování sportu online: Průvodce pro fanoušky', description: 'Přehled možností sledování sportovních přenosů online.' },
  { slug: 'jak-otestovat-rychlost-internetu-prakticke-tipy-nejlepsi-nastroje', title: 'Jak otestovat rychlost internetu: Praktické tipy a nejlepší nástroje', description: 'Jak správně otestovat rychlost internetového připojení.' },
  { slug: 'novinky-poda-sluzby-nove-moznosti-zakaznici', title: 'Novinky v PODA službách: Nové možnosti pro zákazníky', description: 'Nejnovější vylepšení a nové funkce v PODA službách.' },
  { slug: 'rozsireni-pokryti-poda-nove-oblasti-opticky-internet', title: 'Rozšíření pokrytí PODA: Nové oblasti s optickým internetem', description: 'Informace o rozšíření optické sítě PODA.' },
  { slug: 'recenze-zakazniku-poda-skutecne-zkusenosti-sluzby', title: 'Recenze zákazníků PODA: Skutečné zkušenosti s našimi službami', description: 'Autentické recenze od spokojených zákazníků PODA.' },
];

// ============================================================
// HTML generators
// ============================================================
function generateTariffTable(type = 'gpon') {
  const speed = type === 'gpon' ? 'speedGPON' : 'speed60GHz';
  const title = type === 'gpon' ? 'Pro byty (optické připojení GPON)' : 'Pro rodinné domy (bezdrátové připojení 60 GHz)';
  
  return `
    <h3>${title}</h3>
    <table>
      <thead>
        <tr><th>Tarif</th><th>Rychlost</th><th>PROMO cena</th><th>Standardní cena</th><th>TV programy</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>${TARIFFS.basic.name}</strong></td>
          <td>${TARIFFS.basic[speed]}</td>
          <td><strong>${TARIFFS.basic.pricePromo}</strong></td>
          <td>${TARIFFS.basic.priceStandard}</td>
          <td>${TARIFFS.basic.tv}</td>
        </tr>
        <tr>
          <td><strong>${TARIFFS.mych10.name}</strong> ⭐</td>
          <td>${TARIFFS.mych10[speed]}</td>
          <td><strong>${TARIFFS.mych10.pricePromo}</strong></td>
          <td>${TARIFFS.mych10.priceStandard}</td>
          <td>${TARIFFS.mych10.tv}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function generateBlogArticleHTML(article) {
  const canonicalUrl = `https://www.popri.cz/blog/${article.slug}`;
  
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | Blog Popri.cz</title>
  <meta name="description" content="${article.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.description}">
  <meta property="og:image" content="https://www.popri.cz/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Popri.cz - PODA Internet">
  <meta property="og:locale" content="cs_CZ">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.description}">
  <meta name="twitter:image" content="https://www.popri.cz/og-image.png">
  <meta name="ai:title" content="${article.title}">
  <meta name="ai:description" content="${article.description}">
  <meta name="ai-crawl-priority" content="high">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #1a1a2e; font-size: 1.8rem; }
    h2 { color: #16213e; margin-top: 2rem; }
    h3 { color: #2c3e50; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background: #f8f9fa; }
    a { color: #3498db; }
    .phone { font-size: 1.5rem; font-weight: bold; color: #e74c3c; }
  </style>
</head>
<body>
  <header>
    <p class="phone">📞 <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
  </header>
  
  <main>
    <h1>${article.title}</h1>
    <p>${article.description}</p>
    
    <h2>Aktuální tarify PODA 2026</h2>
    ${generateTariffTable('gpon')}
    
    <p><strong>PROMO podmínky:</strong> Zvýhodněná cena platí prvních 12 měsíců od aktivace pro nové zákazníky.</p>
    
    <h2>Kontakt</h2>
    <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    <p><strong>Web:</strong> <a href="https://${CONTACT.web}">${CONTACT.web}</a></p>
  </main>
  
  <footer>
    <p>© 2026 Popri.cz - Autorizovaný partner PODA a.s.</p>
    <p>Kontakt: ${CONTACT.phone} | ${CONTACT.email}</p>
  </footer>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${article.title}",
    "description": "${article.description}",
    "url": "${canonicalUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz",
      "telephone": "+420${CONTACT.phone.replace(/\s/g, '')}",
      "email": "${CONTACT.email}"
    }
  }
  </script>
</body>
</html>`;
}

// ============================================================
// Static page definitions (non-blog)
// ============================================================
const AI_PAGES = {
  '/': {
    title: 'Popri.cz - Autorizovaný partner PODA | Gigabitový Internet + TV | 730 431 313',
    description: `Gigabitový optický internet 1000 Mbps + TV zdarma od 300 Kč/měsíc. Ostrava, Karviná, Havířov a okolí. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>Popri.cz - Autorizovaný partner PODA</h1>
      <p><strong>Gigabitový optický internet + TV zdarma v Moravskoslezském kraji</strong></p>
      <h2>Aktuální tarify 2026 - PROMO AKCE</h2>
      ${generateTariffTable('gpon')}
      ${generateTariffTable('60ghz')}
      <p><strong>PROMO podmínky:</strong> Zvýhodněná cena platí prvních 12 měsíců od aktivace pro nové zákazníky.</p>
      <h2>Pokrytí služeb</h2>
      <ul>
        <li>Ostrava (98%) - Poruba, Zábřeh, Hrabůvka, Dubina, Bělský Les, Vítkovice</li>
        <li>Karviná (95%) - Hranice, Mizerov, Nové Město</li>
        <li>Havířov (96%) - Šumbark, Podlesí, Město</li>
        <li>Bohumín (100%)</li>
        <li>Frýdek-Místek (85%)</li>
        <li>Orlová (90%)</li>
      </ul>
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
      <p><strong>Web:</strong> <a href="https://${CONTACT.web}">${CONTACT.web}</a></p>
    `
  },
  '/tarify': {
    title: `Ceník PODA Internet + TV 2026 | Tarify od 300 Kč | Popri.cz`,
    description: `Aktuální ceník PODA internet a TV 2026. Internet + TV Basic od 300 Kč, Internet + TV Mých 10 od 440 Kč. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>Ceník PODA Internet + TV 2026</h1>
      ${generateTariffTable('gpon')}
      ${generateTariffTable('60ghz')}
      <p><strong>PROMO podmínky:</strong> Zvýhodněná cena platí prvních 12 měsíců od aktivace. Instalace zdarma, bez závazku.</p>
      <h2>Co je v ceně zahrnuto</h2>
      <ul>
        <li>Symetrická rychlost (download = upload) pro GPON</li>
        <li>Neomezená data bez FUP</li>
        <li>WiFi router v ceně</li>
        <li>Instalace ZDARMA</li>
        <li>PODA net.TV služba pro až 4 zařízení</li>
        <li>Bez závazku</li>
      </ul>
      <h2>Kontakt pro objednávku</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/internet-ostrava': {
    title: `Internet Ostrava | PODA Optické Připojení + TV Zdarma | ${CONTACT.phone}`,
    description: `Nejrychlejší optický internet v Ostravě. Gigabit 1000 Mbps od 300 Kč/měsíc. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>PODA Internet Ostrava</h1>
      <p>Poskytujeme rychlé optické internetové připojení ve všech obvodech Ostravy.</p>
      <h2>Pokrytí v Ostravě (98%)</h2>
      <ul><li>Poruba (100%)</li><li>Zábřeh</li><li>Hrabůvka</li><li>Dubina</li><li>Bělský Les</li><li>Mariánské Hory</li><li>Vítkovice</li><li>Moravská Ostrava</li></ul>
      <h2>Dostupné tarify v Ostravě</h2>
      ${generateTariffTable('gpon')}
      <h2>Kontakt pro Ostravu</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/internet-karvina': {
    title: `Internet Karviná | PODA Optické Připojení + TV Zdarma | ${CONTACT.phone}`,
    description: `Nejrychlejší optický internet v Karviné. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>PODA Internet Karviná</h1>
      <h2>Pokrytí v Karviné (95%)</h2>
      <ul><li>Hranice</li><li>Mizerov</li><li>Nové Město</li><li>Fryštát</li><li>Ráj</li></ul>
      <h2>Tarify</h2>
      ${generateTariffTable('gpon')}
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/internet-havirov': {
    title: `Internet Havířov | PODA Optické Připojení + TV Zdarma | ${CONTACT.phone}`,
    description: `Nejrychlejší optický internet v Havířově. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>PODA Internet Havířov</h1>
      <h2>Pokrytí (96%)</h2>
      <ul><li>Šumbark</li><li>Podlesí</li><li>Město</li><li>Životice</li><li>Bludovice</li><li>Prostřední Suchá</li></ul>
      <h2>Tarify</h2>
      ${generateTariffTable('gpon')}
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/internet-bohumin': {
    title: `Internet Bohumín | PODA Optické Připojení + TV Zdarma | ${CONTACT.phone}`,
    description: `Nejrychlejší optický internet v Bohumíně. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>PODA Internet Bohumín</h1>
      <h2>Dostupnost (100%)</h2>
      <ul><li>Nový Bohumín</li><li>Skřečoň</li><li>Starý Bohumín</li><li>Záblatí</li><li>Pudlov</li></ul>
      <h2>Tarify</h2>
      ${generateTariffTable('gpon')}
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/internet-poruba': {
    title: `Internet Poruba | PODA Optické Připojení + TV Zdarma | ${CONTACT.phone}`,
    description: `Nejrychlejší optický internet v Porubě, Ostrava. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>PODA Internet Poruba</h1>
      <h2>Pokrytí v Porubě (100%)</h2>
      <ul><li>Poruba I-VIII</li><li>Všechny panelové domy</li><li>Bytové domy</li></ul>
      <h2>Tarify</h2>
      ${generateTariffTable('gpon')}
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/iptv': {
    title: `IPTV - TV Vysílání Zdarma k Internetu | Popri.cz`,
    description: `IPTV televizní vysílání zdarma k internetu PODA. 85-100+ kanálů v HD kvalitě. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>IPTV - TV Vysílání Zdarma</h1>
      <p>K internetu PODA dostanete televizní vysílání zdarma prostřednictvím služby PODA net.TV.</p>
      <h2>TV balíčky</h2>
      <h3>Internet + TV Basic</h3>
      <p>85+ kanálů v HD kvalitě</p>
      <h3>Internet + TV Mých 10 ⭐</h3>
      <p>100+ kanálů v HD kvalitě + výběr 10 vlastních prémiových stanic</p>
      <h2>Výhody PODA net.TV</h2>
      <ul><li>HD kvalita obrazu</li><li>Sledování na až 4 zařízeních současně</li><li>EPG</li><li>Zpětné přehrávání</li><li>Mobilní aplikace</li></ul>
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/blog': {
    title: `Blog - Tipy a Novinky | Popri.cz`,
    description: `Zajímavé články o internetu, IPTV a technologiích. Volejte ${CONTACT.phone}.`,
    content: `
      <h1>Blog Popri.cz</h1>
      <p>Najdete zde užitečné články, tipy a novinky ze světa internetu a technologií.</p>
      <h2>Všechny články</h2>
      <ul>
        ${ALL_BLOG_ARTICLES.map(a => `<li><a href="/blog/${a.slug}">${a.title}</a> - ${a.description}</li>`).join('\n        ')}
      </ul>
      <h2>Aktuální tarify</h2>
      <p><strong>${TARIFFS.basic.name}:</strong> od ${TARIFFS.basic.pricePromo} (PROMO)</p>
      <p><strong>${TARIFFS.mych10.name}:</strong> od ${TARIFFS.mych10.pricePromo} (PROMO)</p>
      <h2>Kontakt</h2>
      <p><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
    `
  },
  '/kontakt': {
    title: `Kontakt | PODA Internet Ostrava | ${CONTACT.phone} | Popri.cz`,
    description: `Kontaktujte nás pro sjednání PODA internetu. Telefon ${CONTACT.phone}.`,
    content: `
      <h1>Kontakt</h1>
      <h2>Objednávky a dotazy</h2>
      <ul>
        <li><strong>Telefon:</strong> <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></li>
        <li><strong>Email:</strong> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><strong>Web:</strong> <a href="https://${CONTACT.web}">${CONTACT.web}</a></li>
        <li>Provozní doba: Po-Pá 8:00-18:00</li>
      </ul>
      <h2>Aktuální tarify</h2>
      ${generateTariffTable('gpon')}
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

// ============================================================
// HTML template for non-blog static pages
// ============================================================
function generateAIStaticHTML(pagePath, data) {
  const canonicalUrl = `https://www.popri.cz${pagePath === '/' ? '' : pagePath}`;
  
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <meta name="description" content="${data.description}">
  <meta name="robots" content="index, follow">
  <meta name="ai:title" content="${data.title}">
  <meta name="ai:description" content="${data.description}">
  <meta name="ai-crawl-priority" content="high">
  <meta name="ai-index-content" content="true">
  <link rel="canonical" href="${canonicalUrl}">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #1a1a2e; font-size: 1.8rem; }
    h2 { color: #16213e; margin-top: 2rem; }
    h3 { color: #2c3e50; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background: #f8f9fa; }
    a { color: #3498db; }
    .phone { font-size: 1.5rem; font-weight: bold; color: #e74c3c; }
  </style>
</head>
<body>
  <header>
    <p class="phone">📞 <a href="tel:+420${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></p>
  </header>
  <main>
    ${data.content}
  </main>
  <footer>
    <p>© 2026 Popri.cz - Autorizovaný partner PODA a.s.</p>
    <p>Kontakt: ${CONTACT.phone} | ${CONTACT.email}</p>
  </footer>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${data.title}",
    "description": "${data.description}",
    "url": "${canonicalUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Popri.cz",
      "telephone": "+420${CONTACT.phone.replace(/\s/g, '')}",
      "email": "${CONTACT.email}"
    }
  }
  </script>
</body>
</html>`;
}

// ============================================================
// Main generator
// ============================================================
function generateAllAIPages() {
  const outputDir = path.resolve(__dirname, '../public/ai-static');
  const blogOutputDir = path.resolve(outputDir, 'blog');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(blogOutputDir)) {
    fs.mkdirSync(blogOutputDir, { recursive: true });
  }
  
  let generatedCount = 0;
  
  // Generate non-blog static pages
  Object.entries(AI_PAGES).forEach(([pagePath, data]) => {
    let outputPath;
    if (pagePath === '/') {
      outputPath = path.join(outputDir, 'index.html');
    } else {
      outputPath = path.join(outputDir, `${pagePath.slice(1)}.html`);
    }
    
    const htmlContent = generateAIStaticHTML(pagePath, data);
    fs.writeFileSync(outputPath, htmlContent);
    generatedCount++;
    console.log(`Generated: ${outputPath}`);
  });
  
  // Generate blog article static pages - ALL articles
  ALL_BLOG_ARTICLES.forEach(article => {
    const outputPath = path.join(blogOutputDir, `${article.slug}.html`);
    const htmlContent = generateBlogArticleHTML(article);
    fs.writeFileSync(outputPath, htmlContent);
    generatedCount++;
    console.log(`Generated blog: ${outputPath}`);
  });
  
  console.log(`\n✅ Generated ${generatedCount} AI-optimized static pages`);
  console.log(`   📄 ${Object.keys(AI_PAGES).length} main pages`);
  console.log(`   📝 ${ALL_BLOG_ARTICLES.length} blog articles`);
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run the generator
generateAllAIPages();

#!/usr/bin/env node

/**
 * Static Prerendering Script (No Puppeteer)
 *
 * After Vite build, creates route-specific index.html files in dist/
 * so Google + AI crawlers get complete HTML with correct meta tags
 * and content instantly. Each page gets:
 *   - correct <title>, meta description, canonical, OG tags
 *   - JSON-LD schema (Article for blog, LocalBusiness for cities, BreadcrumbList everywhere)
 *   - route-specific fallback content inside #ssr-fallback (real H1, perex, CTA)
 *
 * The script auto-discovers content from:
 *   - src/data/blog/index.ts        → all blog posts
 *   - src/data/cities/citiesData.ts → all city pages
 * via on-the-fly esbuild bundling, so adding a new post/city
 * automatically yields a prerendered page on next build.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { build } from 'esbuild';
import { pathToFileURL } from 'url';

const BASE_URL = 'https://www.popri.cz';
const DIST_DIR = 'dist';
const PHONE = '730 431 313';
const PHONE_INTL = '+420730431313';
const EMAIL = 'terc@obchod.poda.cz';
const DEFAULT_OG_IMAGE = `${BASE_URL}/popri-favicon.png`;

// ============================================================
// Helpers
// ============================================================

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(s = '') {
  return escapeHtml(s);
}

function stripHtml(html = '') {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(s, n) {
  if (!s) return '';
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + '…';
}

async function loadTsModule(entry) {
  // Bundle the TS module into a single ESM file in tmp, then dynamic-import it.
  const outFile = path.join(os.tmpdir(), `prerender-${Date.now()}-${Math.random().toString(36).slice(2)}.mjs`);
  await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    outfile: outFile,
    logLevel: 'silent',
    // Stub asset/style imports the data modules might transitively pull in.
    loader: {
      '.css': 'empty',
      '.svg': 'empty',
      '.png': 'empty',
      '.jpg': 'empty',
      '.jpeg': 'empty',
      '.webp': 'empty',
      '.gif': 'empty',
    },
    external: [],
  });
  const mod = await import(pathToFileURL(outFile).href);
  // Cleanup tmp file (best-effort).
  try { fs.unlinkSync(outFile); } catch {}
  return mod;
}

// ============================================================
// Static (hand-curated) page definitions
// ============================================================
const STATIC_PAGES = [
  {
    route: '/tarify',
    title: 'Tarify PODA Internet 2026 | Ceny od 300 Kč/měs | Popri.cz',
    description: 'Aktuální tarify PODA internetu 2026. Internet + TV Basic od 300 Kč/měsíc, Internet + TV Mých 10 od 440 Kč. Gigabit optika, instalace zdarma, bez závazku.',
    h1: 'Tarify PODA Internet 2026',
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Tarify', url: '/tarify' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Internet + TV', url: '/internet-tv' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'IPTV', url: '/iptv' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Kontakt', url: '/kontakt' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'TV Programy', url: '/programy' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'O nás', url: '/o-nas' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Gigabit', url: '/giga-internet' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Promo akce', url: '/promo-akce' }],
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
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Blog', url: '/blog' }],
    // Content is filled dynamically in main() once blog posts are loaded.
    content: ''
  },
  {
    route: '/obchodni-podminky',
    title: 'Obchodní podmínky | Popri.cz',
    description: 'Obchodní podmínky portálu Popri.cz – autorizovaného obchodního partnera PODA a.s. pro internetové a TV služby.',
    h1: 'Obchodní podmínky',
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Obchodní podmínky', url: '/obchodni-podminky' }],
    robots: 'noindex, follow',
    content: `
      <p style="color:#9ca3af; line-height:1.8;">Tyto obchodní podmínky upravují vztahy mezi provozovatelem portálu Popri.cz a uživateli. Pro plné znění a aktuální verzi navštivte stránku v aplikaci.</p>
    `
  },
  {
    route: '/ochrana-soukromi',
    title: 'Ochrana soukromí | Popri.cz',
    description: 'Zásady ochrany osobních údajů na Popri.cz. Jak zpracováváme vaše údaje v souladu s GDPR.',
    h1: 'Ochrana soukromí',
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Ochrana soukromí', url: '/ochrana-soukromi' }],
    robots: 'noindex, follow',
    content: `
      <p style="color:#9ca3af; line-height:1.8;">Vaše soukromí je pro nás důležité. Tato stránka popisuje, jaké údaje shromažďujeme a jak je zpracováváme v souladu s GDPR.</p>
    `
  },
  {
    route: '/cookies',
    title: 'Cookies | Popri.cz',
    description: 'Informace o cookies používaných na webu Popri.cz a možnostech jejich nastavení.',
    h1: 'Zásady používání cookies',
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Cookies', url: '/cookies' }],
    robots: 'noindex, follow',
    content: `
      <p style="color:#9ca3af; line-height:1.8;">Web Popri.cz využívá cookies pro správné fungování stránek a měření návštěvnosti. Nastavení cookies můžete kdykoli změnit ve svém prohlížeči.</p>
    `
  },
  {
    route: '/pomoc-prechodem',
    title: 'Pomoc s přechodem k PODA | Popri.cz',
    description: 'Pomůžeme vám s přechodem od stávajícího operátora k PODA internetu. Bezplatné poradenství a kompletní servis.',
    h1: 'Pomoc s přechodem k PODA',
    breadcrumbs: [{ name: 'Úvod', url: '/' }, { name: 'Pomoc s přechodem', url: '/pomoc-prechodem' }],
    content: `
      <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Přechod od stávajícího operátora k PODA je jednodušší, než si myslíte – pomůžeme vám se vším.</p>
      <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">
        <li>Bezplatné posouzení stávající smlouvy</li>
        <li>Pomoc s výpovědí u stávajícího operátora</li>
        <li>Načasování instalace bez výpadku</li>
        <li>Konzultace optimálního tarifu PODA</li>
      </ul>
      <p style="margin-top:1.5rem;"><a href="tel:+420730431313" style="background:#d97706; color:#0a0a0a; padding:0.75rem 2rem; border-radius:0.5rem; text-decoration:none; font-weight:600; display:inline-block;">📞 Volejte 730 431 313</a></p>
    `
  },
];

// ============================================================
// City pages — derived from citiesData
// ============================================================
function buildCityPage(city) {
  const route = `/internet-${city.slug}`;
  const url = `${BASE_URL}${route}`;
  const districtsList = city.districts.map(d => d.name).join(', ');
  const title = (city.seo && city.seo.title)
    ? `${city.seo.title} | Popri.cz`
    : `Internet ${city.name} | PODA optika 1000 Mbps | Popri.cz`;
  const description = (city.seo && city.seo.description)
    ? city.seo.description
    : `PODA optický internet ${city.nameLocative}. Gigabit 1000/1000 Mbps + TV zdarma. Pokrytí ${city.coverage}%. Volejte 730 431 313.`;

  const districtsHtml = city.districts
    .map(d => `<li><strong style="color:#f5f0e8;">${escapeHtml(d.name)}</strong> – ${escapeHtml(d.coverage)} pokrytí${d.note ? ` (${escapeHtml(d.note)})` : ''}</li>`)
    .join('');

  const content = `
    <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Gigabitový optický internet od PODA ${escapeHtml(city.nameLocative)}. Pokrytí ${city.coverage}% v oblastech: ${escapeHtml(districtsList)}.</p>
    <h2 style="color:#f5f0e8; margin-bottom:0.5rem;">Dostupné tarify ${escapeHtml(city.nameLocative)}</h2>
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
    <h2 style="color:#f5f0e8; margin-top:2rem; margin-bottom:0.5rem;">Pokrytí ${escapeHtml(city.nameLocative)}</h2>
    <ul style="color:#9ca3af; line-height:2; padding-left:1.5rem;">${districtsHtml}</ul>
    <p style="color:#9ca3af; line-height:1.8; margin-top:1rem;">Ověřte dostupnost na vaší adrese voláním na <a href="tel:${PHONE_INTL}" style="color:#d97706;">${PHONE}</a>.</p>
  `;

  // LocalBusiness JSON-LD per city
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `PODA Internet – ${city.name}`,
    url,
    telephone: PHONE_INTL,
    email: EMAIL,
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: 'CZ',
    },
    geo: city.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: city.coordinates.lat,
      longitude: city.coordinates.lng,
    } : undefined,
    priceRange: city.priceRange || '250-520 CZK',
  };

  return {
    route,
    title,
    description,
    h1: `Internet ${city.name} – PODA optické připojení`,
    breadcrumbs: [
      { name: 'Úvod', url: '/' },
      { name: city.name, url: route },
    ],
    content,
    extraJsonLd: [localBusinessJsonLd],
    ogImage: city.heroImage && !city.heroImage.startsWith('/src/') ? `${BASE_URL}${city.heroImage}` : DEFAULT_OG_IMAGE,
  };
}

// ============================================================
// Blog pages — derived from blog index
// ============================================================
function buildBlogPostPage(post) {
  const slug = post.slug || `post-${post.id}`;
  const route = `/blog/${slug}`;
  const url = `${BASE_URL}${route}`;
  const cleanExcerpt = post.excerpt ? stripHtml(post.excerpt) : truncate(stripHtml(post.content || ''), 160);
  const description = truncate(cleanExcerpt, 160);
  const title = `${post.title} | Popri.cz`;

  const ogImage = post.image
    ? (post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`)
    : DEFAULT_OG_IMAGE;

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: cleanExcerpt,
    image: [ogImage],
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author || 'Redakce Popri.cz' },
    publisher: {
      '@type': 'Organization',
      name: 'Popri.cz',
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: post.category,
    keywords: Array.isArray(post.tags) ? post.tags.join(', ') : undefined,
  };

  const tagsHtml = Array.isArray(post.tags) && post.tags.length
    ? `<p style="color:#6b7280; font-size:0.875rem; margin-top:1rem;">Štítky: ${post.tags.map(t => escapeHtml(t)).join(', ')}</p>`
    : '';

  // Use the article HTML directly (already trusted, hand-authored).
  const content = `
    <p style="color:#9ca3af; font-size:0.95rem; margin-bottom:1rem;">
      ${escapeHtml(post.category || 'Blog')} • ${escapeHtml(post.date || '')} • ${escapeHtml(post.author || 'Redakce Popri.cz')}
    </p>
    <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">${escapeHtml(cleanExcerpt)}</p>
    ${post.image ? `<img src="${escapeAttr(post.image)}" alt="${escapeAttr(post.alt || post.title)}" style="width:100%; max-width:900px; height:auto; border-radius:0.75rem; margin-bottom:1.5rem;" loading="eager" />` : ''}
    <div style="color:#d1d5db; line-height:1.8;">${post.content || ''}</div>
    ${tagsHtml}
  `;

  return {
    route,
    title,
    description,
    h1: post.title,
    breadcrumbs: [
      { name: 'Úvod', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: post.title, url: route },
    ],
    content,
    extraJsonLd: [articleJsonLd],
    ogImage,
    ogType: 'article',
  };
}

// ============================================================
// Template helpers
// ============================================================
function buildBreadcrumbJsonLd(breadcrumbs) {
  if (!breadcrumbs || !breadcrumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${BASE_URL}${b.url}`,
    })),
  };
}

function jsonLdScript(obj) {
  // Strip undefined keys recursively
  const clean = JSON.parse(JSON.stringify(obj));
  return `<script type="application/ld+json">${JSON.stringify(clean)}</script>`;
}

function generatePageHtml(baseHtml, page) {
  let html = baseHtml;
  const canonical = `${BASE_URL}${page.route}`;
  const ogImage = page.ogImage || DEFAULT_OG_IMAGE;
  const ogType = page.ogType || 'website';

  // 1. <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);

  // 2. meta description
  if (/<meta name="description"[^>]*>/.test(html)) {
    html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeAttr(page.description)}">`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeAttr(page.description)}">\n  </head>`);
  }

  // 3. canonical
  if (/<link rel="canonical"[^>]*>/.test(html)) {
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}">`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonical}">\n  </head>`);
  }

  // 4. robots (optional override)
  if (page.robots) {
    if (/<meta name="robots"[^>]*>/.test(html)) {
      html = html.replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${escapeAttr(page.robots)}">`);
    } else {
      html = html.replace('</head>', `  <meta name="robots" content="${escapeAttr(page.robots)}">\n  </head>`);
    }
  }

  // 5. OG + Twitter tags
  const socialTags = `
    <meta property="og:title" content="${escapeAttr(page.title)}">
    <meta property="og:description" content="${escapeAttr(page.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:locale" content="cs_CZ">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(page.title)}">
    <meta name="twitter:description" content="${escapeAttr(page.description)}">
    <meta name="twitter:image" content="${ogImage}">
  `;
  html = html.replace('</head>', `${socialTags}\n  </head>`);

  // 6. JSON-LD (breadcrumbs + extras)
  const jsonLdBlocks = [];
  const breadcrumbLd = buildBreadcrumbJsonLd(page.breadcrumbs);
  if (breadcrumbLd) jsonLdBlocks.push(jsonLdScript(breadcrumbLd));
  if (Array.isArray(page.extraJsonLd)) {
    for (const ld of page.extraJsonLd) jsonLdBlocks.push(jsonLdScript(ld));
  }
  if (jsonLdBlocks.length) {
    html = html.replace('</head>', `${jsonLdBlocks.join('\n')}\n  </head>`);
  }

  // 7. Breadcrumb HTML for fallback
  const breadcrumbHtml = page.breadcrumbs && page.breadcrumbs.length
    ? `<nav aria-label="Drobečková navigace" style="margin-bottom:1.5rem; font-size:0.875rem;">
         ${page.breadcrumbs.map((b, i) => {
           const isLast = i === page.breadcrumbs.length - 1;
           return isLast
             ? `<span style="color:#9ca3af;">${escapeHtml(b.name)}</span>`
             : `<a href="${escapeAttr(b.url)}" style="color:#d97706; text-decoration:none;">${escapeHtml(b.name)}</a> <span style="color:#6b7280;">›</span> `;
         }).join('')}
       </nav>`
    : '';

  // 8. Replace ssr-fallback with rich content
  const fallbackContent = `
      <div id="ssr-fallback" style="background:#0a0a0a; color:#f5f0e8; min-height:100vh; font-family:system-ui,sans-serif;">
        <nav style="padding:1rem 2rem; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.1);">
          <a href="/" style="color:#d97706; font-size:1.5rem; font-weight:700; text-decoration:none;">popri.cz</a>
          <div style="display:flex; gap:1rem; align-items:center;">
            <a href="/tarify" style="color:#9ca3af; text-decoration:none; font-size:0.875rem;">Tarify</a>
            <a href="/blog" style="color:#9ca3af; text-decoration:none; font-size:0.875rem;">Blog</a>
            <a href="tel:${PHONE_INTL}" style="color:#d97706; text-decoration:none; font-size:0.875rem; font-weight:600;">${PHONE}</a>
          </div>
        </nav>

        <main style="max-width:900px; margin:0 auto; padding:2rem 1rem;">
          ${breadcrumbHtml}
          <section style="padding:2rem 0;">
            <h1 style="font-size:2.5rem; font-weight:700; margin-bottom:1rem; color:#f5f0e8;">
              ${escapeHtml(page.h1)}
            </h1>
            ${page.content}
          </section>

          <section style="margin:2rem 0; text-align:center; padding:2rem; border:1px solid rgba(217,119,6,0.3); border-radius:0.75rem; background:rgba(217,119,6,0.05);">
            <h2 style="font-size:1.5rem; color:#f5f0e8; margin-bottom:0.5rem;">Kontaktujte nás</h2>
            <p style="color:#9ca3af; margin-bottom:1rem;">Telefon: <a href="tel:${PHONE_INTL}" style="color:#d97706; text-decoration:none; font-weight:700;">${PHONE}</a></p>
            <p style="color:#9ca3af; margin-bottom:1rem;">Email: <a href="mailto:${EMAIL}" style="color:#d97706; text-decoration:none;">${EMAIL}</a></p>
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
          <p>© 2026 Popri.cz – Autorizovaný partner PODA a.s. | <a href="tel:${PHONE_INTL}" style="color:#d97706; text-decoration:none;">${PHONE}</a></p>
        </footer>
      </div>`;

  // Robust replace: handle multi-line existing fallback
  if (/<div id="ssr-fallback"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/.test(html)) {
    html = html.replace(/<div id="ssr-fallback"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, fallbackContent);
  } else if (/<div id="ssr-fallback"[\s\S]*?<\/div>/.test(html)) {
    // Single-div fallback variant
    html = html.replace(/<div id="ssr-fallback"[\s\S]*?<\/div>(\s*<\/div>)*/, fallbackContent);
  } else if (/<div id="root">/.test(html)) {
    // No fallback exists yet — inject inside #root
    html = html.replace(/<div id="root">/, `<div id="root">${fallbackContent}`);
  }

  return html;
}

// ============================================================
// Build blog index content (after posts loaded)
// ============================================================
function buildBlogIndexContent(posts) {
  const items = posts.slice(0, 30).map(p => {
    const slug = p.slug || `post-${p.id}`;
    return `<li><a href="/blog/${escapeAttr(slug)}" style="color:#d97706; text-decoration:none;">${escapeHtml(p.title)}</a></li>`;
  }).join('');
  return `
    <p style="font-size:1.25rem; color:#d97706; margin-bottom:2rem;">Praktické články a tipy ze světa internetu a technologií.</p>
    <ul style="color:#9ca3af; line-height:2.5; padding-left:1.5rem;">${items}</ul>
  `;
}

// ============================================================
// Main
// ============================================================
async function main() {
  console.log('🔨 Starting static prerendering...');

  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  // Load dynamic data (blog + cities) via esbuild bundling
  let blogPosts = [];
  let cities = [];
  try {
    const blogMod = await loadTsModule('src/data/blog/index.ts');
    blogPosts = Array.isArray(blogMod.blogPosts) ? blogMod.blogPosts : [];
    console.log(`📚 Loaded ${blogPosts.length} blog posts`);
  } catch (err) {
    console.warn('⚠️  Failed to load blog posts:', err.message);
  }
  try {
    const citiesMod = await loadTsModule('src/data/cities/citiesData.ts');
    cities = Array.isArray(citiesMod.cities) ? citiesMod.cities : [];
    console.log(`🏙️  Loaded ${cities.length} cities`);
  } catch (err) {
    console.warn('⚠️  Failed to load cities:', err.message);
  }

  // Assemble all pages
  const allPages = [...STATIC_PAGES];

  // Inject blog index content now that we have the posts
  const blogIndex = allPages.find(p => p.route === '/blog');
  if (blogIndex && blogPosts.length) {
    blogIndex.content = buildBlogIndexContent(blogPosts);
  }

  // Add city pages
  for (const city of cities) {
    if (city && city.slug) allPages.push(buildCityPage(city));
  }

  // Add blog post pages
  for (const post of blogPosts) {
    if (post && (post.slug || post.id)) allPages.push(buildBlogPostPage(post));
  }

  let written = 0;
  let skipped = 0;
  for (const page of allPages) {
    const routeDir = path.join(DIST_DIR, page.route);
    const outputPath = path.join(routeDir, 'index.html');

    // Don't overwrite an already-existing prerendered file (e.g. from Vite build)
    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    fs.mkdirSync(routeDir, { recursive: true });

    try {
      const pageHtml = generatePageHtml(baseHtml, page);
      fs.writeFileSync(outputPath, pageHtml);
      written++;
    } catch (err) {
      console.warn(`⚠️  Failed to render ${page.route}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Prerendered ${written} pages (${skipped} skipped, already existed).`);
  console.log(`   • Static pages: ${STATIC_PAGES.length}`);
  console.log(`   • City pages:   ${cities.length}`);
  console.log(`   • Blog posts:   ${blogPosts.length}`);
}

main().catch(err => {
  console.error('❌ Prerendering failed:', err);
  // Exit 0 so build doesn't fail — netlify.toml uses `|| true` anyway,
  // but make sure we don't break local builds either.
  process.exit(0);
});



# Oprava "Duplikovať bez kánonickej adresy" v Google Search Console

## Problém
GSC hlási 19 stránok s problémom "Duplicate without user-selected canonical". Z screenshotov vidím tieto konkrétne URL:

| URL | Príčina |
|---|---|
| `/iptv/` | Trailing slash — chýba redirect na `/iptv` |
| `/tarify/` | Trailing slash — chýba redirect na `/tarify` |
| `/blog/?tag=Bohumín` | Parametrizovaná URL bez správneho canonical |
| `/blog/6` | ID-based URL — redirect existuje v `_redirects`, ale SPA ho obchádza |
| `/blog/11?source=blog&post_id=11&category=Novinky` | Parametrizovaná URL |
| `/blog/o2-nej-...?source=blog&post_id=102&category=Technologie` | Parametrizovaná URL |
| `/cookies`, `/blog`, `/kontakt` | Google vidí duplikáty kvôli konfliktu medzi Helmet a DOM manipuláciou |

## Koreňové príčiny

1. **Chýbajúce trailing slash redirecty** — `_redirects` má redirecty len pre `/internet-*` stránky, ale nie pre `/iptv/`, `/tarify/`, `/kontakt/`, `/blog/`, `/cookies/`

2. **Konflikt NoIndexMeta vs Helmet** — `NoIndexMeta` manipuluje DOM priamo (`document.querySelector`), zatiaľ čo `PageMetadata` a jednotlivé stránky nastavujú robots cez Helmet. Tieto sa navzájom prepisujú a výsledok je nepredvídateľný.

3. **Parametrizované URL nemajú canonical na čistú verziu** — Keď je URL `/blog/?tag=Bohumín`, canonical v Helmet je stále `https://www.popri.cz/blog` (správne), ale `NoIndexMeta` nastaví `noindex` cez DOM, čo môže byť ignorované botom pred JS renderom.

## Plán opráv

### 1. Pridať trailing slash redirecty do `_redirects`
Pridať 301 redirecty pre všetky SPA routes s trailing slash:
```
/tarify/ /tarify 301
/iptv/ /iptv 301
/kontakt/ /kontakt 301
/blog/ /blog 301
/cookies/ /cookies 301
/ochrana-soukromi/ /ochrana-soukromi 301
/obchodni-podminky/ /obchodni-podminky 301
/programy/ /programy 301
/internet-tv/ /internet-tv 301
```

### 2. Odstrániť `NoIndexMeta` a presunúť logiku do Helmet
Problém: `NoIndexMeta` používa `document.querySelector` na manipuláciu DOM, čo koliduje s react-helmet-async. Riešenie:
- Odstrániť `NoIndexMeta` komponent z `App.tsx`
- Upraviť `Blog.tsx` — ak URL obsahuje query parametre (`tag=`, `category=`, `search=`), nastaviť cez Helmet: `<meta name="robots" content="noindex, follow" />` a canonical na čistú `/blog` URL
- Rovnako pre `BlogPost.tsx` — ak URL obsahuje `source=` alebo `post_id=`, nastaviť noindex cez Helmet

### 3. Pridať globálne trailing slash normalizácia v `App.tsx`
Pridať React-level redirect: ak `location.pathname` končí na `/` (okrem root `/`), redirect na verziu bez trailing slash. Toto zachytí prípady, ktoré Netlify `_redirects` nezachytí.

### 4. Opraviť `BlogPost.tsx` pre parametrizované URL
V `BlogPostSEO.tsx` zabezpečiť, že canonical URL nikdy neobsahuje query parametre — vždy len čistý slug.

### Technické detaily

**Súbory na zmenu:**
- `public/_redirects` — pridať trailing slash redirecty
- `src/App.tsx` — odstrániť `NoIndexMeta`, pridať trailing slash redirect komponent
- `src/pages/Blog.tsx` — pridať noindex pre parametrizované URL cez Helmet
- `src/pages/BlogPost.tsx` — pridať noindex pre parametrizované URL cez Helmet
- `src/components/seo/NoIndexMeta.tsx` — odstrániť (nahradené Helmet logikou)

**Poradie:** Všetko v jednom kroku, keďže zmeny sú prepojené.


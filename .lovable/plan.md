

# Plán: Rozšírenie build-seo.js o automatické SEO funkcie

## Prehľad zmien

Tri konkrétne vylepšenia existujúceho build procesu — žiadny nový systém, len rozšírenie toho, čo funguje.

## 1. Google Sitemap Ping po builde

Pridať na koniec `scripts/build-seo.js` funkciu, ktorá po úspešnom builde automaticky pingne Google:

```
GET https://www.google.com/ping?sitemap=https://www.popri.cz/sitemap.xml
```

Výsledok sa zaloguje do Netlify build logov. Jednoduchý HTTPS GET request, 10 riadkov kódu.

## 2. Dynamický `currentDate` — odstrániť hardcoded dátumy

**Problém:** `Index.tsx` a `CityTemplate.tsx` majú `currentDate="2026-03-09"` — manuálne sa musí updatovať. `PageMetadata.tsx` už má default `new Date().toISOString().split('T')[0]`, takže stačí odstrániť prop.

**Zmeny:**
- `src/pages/Index.tsx` — odstrániť `currentDate="2026-03-09"` prop
- `src/pages/CityTemplate.tsx` — odstrániť `currentDate="2026-03-09"` prop
- Skontrolovať ďalšie stránky (Tarify, Blog, IPTV, Contact) a odstrániť hardcoded dátumy ak existujú

Výsledok: Každá stránka bude mať vždy dnešný dátum v `last-modified`, `dateModified` schéme, a `og:updated_time` — bez manuálneho zásahu.

## 3. `Last-Modified` HTTP header pre HTML stránky

Pridať do `netlify.toml` header sekciu pre HTML odpovede. Keďže Netlify nepodporuje dynamické hodnoty v TOML headeroch, použijeme edge function alebo existujúci `ai-bot-detector` na pridanie `Last-Modified` headeru s aktuálnym dátumom.

**Zmena v `netlify.toml`:**
```toml
[[headers]]
  for = "/"
  [headers.values]
    X-Robots-Tag = "index, follow"

[[headers]]
  for = "/*.html"  
  [headers.values]
    X-Robots-Tag = "index, follow"
```

**Zmena v `netlify/edge-functions/ai-bot-detector.ts`:**
Pridať `Last-Modified` header do response pre všetky HTML stránky (nie len bot requesty).

## 4. Aktualizácia lastmod v existujúcom sitemap.xml (bez prepisovania)

Zmeniť `build-seo.js` tak, aby namiesto prepisovania celého `sitemap.xml` len aktualizoval `<lastmod>` dátumy na dnešný dátum pomocou regex replace. Ak súbor neexistuje, vygeneruje nový.

## Súbory na zmenu

| Súbor | Zmena |
|---|---|
| `scripts/build-seo.js` | Pridať Google Ping + sitemap lastmod updater |
| `src/pages/Index.tsx` | Odstrániť `currentDate` prop |
| `src/pages/CityTemplate.tsx` | Odstrániť `currentDate` prop |
| `netlify.toml` | Pridať `X-Robots-Tag` header |
| `netlify/edge-functions/ai-bot-detector.ts` | Pridať `Last-Modified` header |

## Čo sa NEZMENÍ
- `robots.txt` — manuálne spravovaný
- `sitemap.xml` štruktúra — len dátumy
- Existujúce redirecty a edge function logika


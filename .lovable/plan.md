

# Fix: Googlebot vidí prázdnu stránku

## Príčina problému

Edge function `ai-bot-detector.ts` má 3 kategórie botov:
- **AI boty** (GPTBot, Claude) → servuje statické HTML zo všetkých `AI_STATIC_PATHS` (/, /tarify, /kontakt, /iptv, /blog, city pages)
- **Social crawlery** (Facebook, LinkedIn) → servuje OG tagy pre blog
- **Search boty** (Googlebot, Bingbot) → servuje statické HTML **LEN pre city pages** (`CITY_STATIC_PATHS`)

Googlebot teda na `/o-nas`, `/tarify`, `/kontakt`, `/iptv` dostáva React SPA s lazy loading. Chunky sa nestihnú načítať → prázdna stránka.

## Riešenie

### 1. Vytvoriť `public/ai-static/o-nas.html`
Statická HTML verzia stránky O nás s plným obsahom, Organization schema, kontaktnými údajmi.

### 2. Rozšíriť search bot handling v edge function
Zmeniť `ai-bot-detector.ts` tak, aby Googlebot dostal statické HTML aj pre `AI_STATIC_PATHS` — nie len pre city pages. Jeden riadok zmeny: použiť `AI_STATIC_PATHS` aj pre search boty.

Konkrétne v riadku ~459:
```
// Pred: if (isSearchBot && CITY_STATIC_PATHS.includes(url.pathname))
// Po:   if (isSearchBot && (CITY_STATIC_PATHS.includes(url.pathname) || AI_STATIC_PATHS.includes(url.pathname)))
```

A pridať `/o-nas` do `AI_STATIC_PATHS` (riadok 53).

### 3. Pridať `/o-nas` do AI_STATIC_PATHS
Aby edge function vedela servovať statickú verziu aj AI botom.

## Súbory na zmenu

| Súbor | Zmena |
|---|---|
| `public/ai-static/o-nas.html` | **NOVÝ** — statická HTML verzia stránky O nás |
| `netlify/edge-functions/ai-bot-detector.ts` | Pridať `/o-nas` do `AI_STATIC_PATHS` + rozšíriť search bot handling na všetky statické cesty |

## Výsledok
Googlebot na `/o-nas` (a aj `/tarify`, `/kontakt`, `/iptv`, `/blog`) dostane plné statické HTML namiesto prázdnej SPA. Google URL Inspection test ukáže kompletný obsah.


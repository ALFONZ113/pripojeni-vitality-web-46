

## Áno, plán A je pre teba najlepší

### Prečo A vyhráva nad B a C

**A) Posilniť SSG (rozšíriť `prerender-pages.js`)**
- Rieši reálny problém: Google a AI boty dostanú statické HTML pre **VŠETKY** stránky (nie len 20 kritických)
- Nulové riziko regresie — len pridáva HTML súbory do `dist/`
- Plne kompatibilné s Lovable, Netlify, aktuálnym setupom
- Najväčší SEO dopad za najmenej práce
- Rieši práve to, kvôli čomu si zvažoval Next.js (SSG pre celý web)

**B) Performance push** — pekné, ale tvoj web už má vyladený LCP/TTI po nedávnej optimalizácii. Marginálny zisk.

**C) Edge SSR pre všetkých** — komplexné, drahé na Netlify edge invocations, riziko cache problémov, prepisuje fungujúci bot detector.

### Čo plán A konkrétne urobí

1. **Rozšíriť `scripts/prerender-pages.js`** aby auto-generoval statické HTML pre:
   - Všetkých 40+ blog článkov (z `src/data/blog/index.ts`)
   - Všetky mestské stránky z `citiesData.ts` (Ostrava + sub-časti, Karviná, Havířov, Bohumín, Poruba…)
   - Statické stránky ktoré ešte chýbajú (`/o-nas`, `/kontakt`, `/obchodni-podminky`, `/ochrana-soukromi`, `/cookies`, `/pomoc-prechodem`)

2. **Pre každú stránku vygenerovať**:
   - Správny `<title>`, `meta description`, canonical
   - OG tagy (title, description, image, url)
   - JSON-LD schema (Article pre blog, LocalBusiness pre mestá)
   - Plnohodnotný `#ssr-fallback` HTML s reálnym obsahom (h1, perex, CTA, kontakt)
   - Breadcrumb navigáciu

3. **Konsolidovať s existujúcimi `public/ai-static/`** — odstrániť duplicity, jeden zdroj pravdy v `prerender-pages.js`

4. **Build pipeline** — `netlify.toml` už `prerender-pages.js` spúšťa, len rozšírime jeho výstup

### Čo plán A NEZMENÍ
- Žiadny vizuál, žiadne komponenty, žiadny React kód
- Žiadne závislosti
- Žiadny user-facing UI
- React SPA pre ľudí funguje úplne rovnako — statické HTML je len pre prvý paint + boty

### Očakávaný výsledok
- 100 % stránok indexovateľných okamžite (nie čakanie na JS render)
- Lepšie pozície pre dlhé blogové články a mestské landing pages
- AI crawlery (ChatGPT, Perplexity, Claude) získajú plný obsah
- Rýchlejší First Contentful Paint pre všetky routes

### Súbory na úpravu
- `scripts/prerender-pages.js` — hlavná logika rozšírenia (~150-250 nových riadkov)
- Možno minor cleanup `public/ai-static/` (po overení že nový pipeline pokrýva všetko)

### Odhad rozsahu
1 cohesive iteration, žiadne riziko pre produkciu (build fail = fallback na aktuálne pre-rendered súbory cez `|| true` v `netlify.toml`).


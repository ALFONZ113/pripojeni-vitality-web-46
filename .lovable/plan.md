

## Plán: Optimalizácia projektu bez zmeny dizajnu a funkcionality

### 1. Odstránenie mŕtveho kódu (utils + komponenty)
12 utility súborov má **0 importov** v projekte — bezpečne ich vymažem:
- `automatedSEO.ts`, `blogDescriptionFixer.ts`, `blogSlugMigration.ts`, `enhancedSeo.ts`, `gscMigration.ts`, `indexingOptimization.ts`, `lazyLoading.ts`, `pageSeoOptimizer.ts`, `seoRouting.ts`, `sitemap-optimizer.ts`, `sitemapExporter.ts`, `webp-converter.ts`

`src/components/ui/chart.tsx` sa nikde neimportuje → zmaže sa **celý** recharts import (cca 400 KB v bundle).

### 2. Odstránenie framer-motion (–~120 KB gzipped)
Memory pravidlo projektu hovorí: **"Animations: CSS only (useAnimateOnView hook), no framer-motion"**. Aktuálne je framer-motion v 9 súboroch v rozpore s pravidlom.

Nahradím `motion.*` za bežné `<div>`/`<h1>` s Tailwind animáciami (`animate-fade-in`, `animate-slide-up` — tieto už v `tailwind.config.ts` a `index.css` existujú). Vizuálny výsledok ostane rovnaký (fade/slide animácie v rovnakom timingu).

Súbory: `Navbar.tsx`, `HeroSection.tsx`, `HeroContainer.tsx`, `HeroContent.tsx`, `CityHeroSection.tsx`, `CitySection.tsx`, `TestimonialsSection.tsx`, `TariffTabs.tsx`, `use-animate-on-view.tsx`. Potom `npm uninstall framer-motion`.

### 3. Vyčistenie závislostí v `package.json`
Odstrániť: `framer-motion`, `recharts`, `ts-node` (nepoužitý), `terser` (vite ho má ako optional, ale `vite.config.ts` ho používa — ponechám), `@types/dompurify` (DOMPurify má vlastné typy v 3.x).

Zo `vite.config.ts` odstrániť `charts: ["recharts"]` a `animations: ["framer-motion"]` z `manualChunks`.

### 4. Console.log čistka (72 výskytov)
Wrapnem všetky `console.log/info/warn` v src/ do `if (import.meta.env.DEV)` guard, alebo úplne vymažem v utility súboroch. Production build už cez terser `drop_console: true` toto čistí, ale kód bude čitateľnejší.

### 5. React performance — memoizácia
- `BlogCard`, `TariffCard`, `FeatureCard`, `CityPreviewCard`, `ChannelLogo` → wrap do `React.memo` (často sa renderujú v listoch).
- `MainContent.tsx` sekcie — overiť či nemajú nestable callbacks.

### 6. Lazy loading — drobnosti
- `Home` (Index.tsx) je direct-imported (správne kvôli LCP), ale `LocalSEOSection`, `AIContentSummary`, `AIOptimizedSchema` sa dajú lazy-loadnúť (under-the-fold).
- `PromotionPopup` → lazy import (nezobrazuje sa hneď).

### 7. CSS čistka (`index.css` 937 riadkov)
- Odstrániť duplicitné `@layer` definície.
- Konsolidovať wildcard selektory `div[class*="bg-..."] *` (sú performance-killery — prepíšu cez celé DOM stromy). Nahradiť za explicit selector list.
- Ponechať vizuálne identické správanie.

### 8. SEO & a11y mikro-vylepšenia (bez zmeny dizajnu)
- `<button>` bez `aria-label` (icon-only) → doplniť aria-label.
- Duplicitné `<meta name="robots">` v `UniversalCanonicalTag` + `PageMetadata` — konsolidovať.
- `loading="lazy"` + `decoding="async"` na všetky `<img>` pod foldom (FeaturedBlogPosts, CitySection).
- Pridať `width`/`height` atribúty na obrázky v hero/blog kde chýbajú (CLS prevention).

### 9. Bundle config (`vite.config.ts`)
- Pridať `cssCodeSplit: true` (default true ale potvrdiť).
- Odstrániť mŕtve manualChunks po odstránení recharts/framer-motion.
- Pridať `assetsInlineLimit: 4096` (default OK).

### Očakávaný výsledok
- **Bundle size**: –300 až –500 KB gzipped (recharts + framer-motion + dead utils).
- **TTI / FCP**: rýchlejšie o ~200-400 ms na 4G.
- **Re-renders**: menej zbytočných re-renderov v listoch (memo).
- **Maintainability**: –12 mŕtvych súborov, –72 console.log, –1 nepoužitý chart komponent.
- **Dizajn**: 100 % identický (fade/slide animácie zachované cez CSS s rovnakým timingom).
- **Funkčnosť**: 100 % identická.

### Súbory na úpravu (~25 súborov)
- Zmazať: 12 utils + `chart.tsx`
- Upraviť: 9 framer-motion súborov, `vite.config.ts`, `package.json`, `index.css`, `Index.tsx`, ~5 list komponentov pre memo, ~10 súborov console.log čistka.

### Riziká a mitigácia
- **Framer-motion → CSS**: animácie sa môžu mierne líšiť v stagger delay. Použijem `animation-delay` v Tailwind štýle aby vyzerali identicky.
- **Memo wrapping**: bezpečné, žiadny vizuálny dopad.
- **Dead code removal**: kontrolované grep-om, žiadne externé importy.


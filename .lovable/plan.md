

# Kompletná revízia webu popri.cz

Preskúmal som celý kód projektu. Nižšie je plán rozdelený do 6 oblastí s konkrétnymi nálezmi a opravami. Keďže konverzie sú priorita a dizajn zostáva, zameriavam sa na to, čo bráni efektivite webu.

---

## 1. Kritické chyby (bugy v produkčnom kóde)

| Problém | Súbor | Detail |
|---|---|---|
| **IPTVSection sa zobrazuje 2×** na hlavnej stránke | `Index.tsx` + `MainContent.tsx` | MainContent obsahuje IPTVSection a Index.tsx ho pridáva znova pod `<MainContent />`. Návštevník vidí sekciu IPTV dvakrát. |
| **Slovenčina v českom texte** | `ContactForm.tsx:179` | "Typ nehnuteľnosti" — má byť "Typ nemovitosti" |
| **Slovenčina v IPTV sekcii** | `IPTVSection.tsx:50` | "více ako 95 TV kanálů vo Full HD" — "ako" a "vo" sú slovenské slová |
| **SearchAction schéma v index.html** | `index.html:276-282` | Táto schéma bola odstránená z PageMetadata, ale zostala v statickom HTML. Google ju stále vidí a hlási chybu. |
| **`user-scalable=no`** | `index.html:6` | Blokuje zoom na mobile — porušenie WCAG prístupnosti a Google to penalizuje v Core Web Vitals |
| **Font sa načítava 2×** | `index.css:6` + `index.html:81` | `@import` v CSS + `<link preload>` v HTML = duplicitný request |

---

## 2. SEO opravy

| Problém | Riešenie |
|---|---|
| **Duplicitná WebSite + Organization schéma** | `index.html` aj `PageMetadata.tsx` generujú rovnaké JSON-LD. Na homepage sú 2× WebSite + 2× Organization. Odstrániť z `index.html` a nechať len dynamickú verziu v PageMetadata. |
| **Zbytočné migration meta tagy** | `PageMetadata.tsx:67-72` — `original-domain`, `migration-status`, `migration-date` — migrácia je dokončená, tieto tagy nemajú SEO hodnotu a robia DOM väčší |
| **Duplicitný `preferred-domain` meta tag** | `PageMetadata.tsx` má `preferred-domain` 2× (riadky 55 a 70) |
| **`og:image` ukazuje na logo** | `PageMetadata.tsx:80` — OG image by mal byť atraktívny obrázok, nie logo. Aktuálne `index.html` má správny social image, ale PageMetadata ho prepisuje na logo. |
| **Hardcoded keywords v PageMetadata** | Riadok 64 má hardcoded keywords, ale funkcia prijíma `keywords` prop — tieto sa neprepíšu, iba doplnia cez `ai:keywords` |

---

## 3. Výkon (Performance)

| Oblasť | Nález | Riešenie |
|---|---|---|
| **framer-motion bundle** | ~140 KB gzipped, použitý v každej sekcii vrátane jednoduchých fade-in | Pre jednoduché animácie (fade-in, slide-up) použiť CSS `@keyframes` + Intersection Observer. framer-motion ponechať len pre komplexné interakcie (carousel, parallax). |
| **Parallax na CitySection** | `useScroll` + `useTransform` + background image — ťažký scroll listener | Nahradiť CSS `background-attachment: fixed` alebo odstrániť — minimálny vizuálny efekt za vysokú cenu |
| **Service Worker** | `sw-register.js` sa načítava synchrónne v `<body>` | Presunúť registráciu do `main.tsx` po hydratácii |
| **Mapy.cz suggester** | Načítava sa v ContactForm aj keď používateľ ešte nezačal písať | Lazy load až po focus na address input |

---

## 4. Konverzie (najdôležitejšia oblasť)

| Problém | Dopad | Riešenie |
|---|---|---|
| **Telefónny formulár nemá validáciu formátu** | Používateľ môže odoslať "123" (len 3 znaky) | HeroSection validuje `>= 9`, ale nevaliduje český formát. Pridať regex `/^(\+420)?[0-9]{9}$/` |
| **Chýba toast po odoslaní v HeroSection** | Používateľ vidí len "Odesláno ✓" na 3 sekundy, žiadna toast notifikácia | Pridať `toast.success()` ako v ContactCTA |
| **Promo popup posiela dummy email** | `PromotionPopup.tsx:135` — `email: "promo@popri.cz"` | Supabase send-email edge function posiela aj customer email na tento dummy — zbytočný request + potenciálna chyba |
| **Kontaktný formulár — chyba sa zobrazí ako toast VŽDY** | `ContactForm.tsx:88-92` — `if (formState.error)` je mimo event handler, spustí sa pri každom renderovaní | Presunúť do submit handlera |
| **Chýba telefón CTA na mobile v navbar** | Na mobile je len hamburger menu, chýba viditeľné tlačidlo "Zavolat" | Pridať sticky phone CTA vedľa hamburger ikony |

---

## 5. Čistenie kódu (bez mazania stránok, podľa tvojej voľby)

| Oblasť | Detail |
|---|---|
| **Nepoužívané importy/komponenty** | `enhanced-hero/`, `enhanced-blog/`, `development/PerformanceDebugger` — importované ale nepoužívané v produkčných stránkach |
| **Duplicitné utility súbory** | `blogSeo.ts`, `blogSeoOptimizer.ts`, `blogMetadata.ts` — 3 súbory robia podobnú vec |
| **Stale vite.config STATIC_ROUTES** | `vite.config.ts:56-79` — 20+ routes definovaných ale prerendering je vypnutý (riadok 87). Mŕtvy kód. |
| **Nepoužívané hooky** | `use-lazy-loading.tsx`, `use-optimized-performance.tsx` — treba overiť či sa používajú |

---

## 6. Poradie implementácie

Odporúčam nasledovné poradie (od najväčšieho dopadu):

1. **Kritické bugy** — duplicitná IPTVSection, slovenčina, SearchAction, zoom blokácia (~15 min)
2. **Konverzné opravy** — validácia telefónu, toast v hero, ContactForm bug, mobile CTA (~30 min)
3. **SEO opravy** — duplicitné schémy, migration tagy, OG image (~20 min)
4. **Výkon** — font duplicita, CSS animácie namiesto framer-motion pre jednoduché efekty (~45 min)
5. **Čistenie** — nepoužívané súbory a kód (~20 min)

Celkovo ~2.5 hodiny práce, rozdelené do 5 samostatných krokov.

---

### Technické poznámky

- Všetky zmeny sú interné — žiadna zmena vizuálu alebo UX
- Konverzné opravy zlepšia mieru dokončenia formulárov
- SEO opravy odstránia chyby v Google Search Console
- Výkonové opravy zlepšia Core Web Vitals (LCP, TBT)


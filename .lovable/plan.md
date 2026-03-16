

## Co znamena "Indexovo prehľadávané – momentálne neindexované"

Google tieto stránky **prehľadal** (crawloval), ale **rozhodol sa ich nezaradiť** do indexu. To znamená, že sa nezobrazujú vo vyhľadávaní. Dôvody sú rôzne -- duplicitný obsah, nízka kvalita, parametre v URL, staré URL bez presmerovanie atď.

Zo 51 postihnutých URL som identifikoval **4 kategórie problémov**:

---

### Kategória 1: Parametrové URL (tag, category, search) — ~18 URL
Príklady: `/blog/?category=Technologie`, `/blog?tag=Karviná`, `/blog?search={search_term_string}`

**Stav:** Blog.tsx už správne nastavuje `noindex, follow` pre parametrové URL. Problém je, že Google ich stále crawluje, pretože ich objavil cez interné linky (tag kliknutia, breadcrumb schéma).

**Oprava:**
1. **Odstrániť interné linky na tag URL** -- komponenty `BlogPostTags.tsx` a `BlogPostSEO.tsx` breadcrumb schéma linkujú na `?category=` URL. Treba ich zmeniť na `/blog` bez parametrov, alebo úplne odstrániť tag linky z HTML.
2. **Pridať `?tag=` a `?category=` do robots.txt Disallow** -- už je tam `Disallow: /blog/*?*`, ale niektoré URL nemajú lomku pred `?` (napr. `/blog?tag=`). Treba pridať aj `Disallow: /blog?*`.
3. **Odstrániť `{search_term_string}` referenciu** -- SearchAction schéma bola odstránená, ale Google si ju pamätá. Stačí počkať + zablokovať v robots.txt.

### Kategória 2: Staré slug URL s existujúcimi 301 redirectmi — ~15 URL  
Príklady: `/blog/gaming-internet-ostrava-2025`, `/blog/pomalý-internet-riesenia-guide`, `/blog/polanka-60ghz-antena-revolucia`

**Stav:** Väčšina už má 301 redirect v `_redirects`. Niektoré chýbajú.

**Oprava:**
1. Pridať chýbajúce redirecty do `_redirects` a `blogRedirectSystem.ts`:
   - `/blog/pomalý-internet-riesenia-guide` → `/blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025`
   - `/blog/rychly-internet-navod-problemy` → `/blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025`
   - `/blog/panelak-internet-otazky-odpovede` → `/blog/nejcastejsi-otazky-pripojeni-internet-panelak`
   - `/blog/iptv-vs-traditionalni-tv-porovnani` → `/blog/iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod`
   - `/blog/poda-recenzie-skusenosti-zakaznikov-2025` → `/blog/recenze-zakazniku-poda-skutecne-zkusenosti-sluzby`
   - `/blog/polanka-60ghz-antena-revolucia` → `/blog/polanka-nad-odrou-60ghz-pripojeni-2025`
   - `/blog/internet-poda-v-ostrave-porube-gigabitove-pripojeni-pro-nejvetsi-mestskou-cast` → `/blog/internet-poda-ostrava-poruba-gigabitove-pripojeni-nejvetsi-mestska-cast`
   - `/blog/internet-poda-v-ostrave-porube-gigabitove-pripojenie-pre-najvacsiu-mestsku-cast-100` → `/blog/internet-poda-ostrava-poruba-gigabitove-pripojeni-nejvetsi-mestska-cast`
   - `/blog/jak-otestovat-rychlost-internetu-prakticke-tipy-a-nejlepsi-nastroje-8` → `/blog/jak-otestovat-rychlost-internetu-prakticke-tipy-nejlepsi-nastroje`
   - `/blog/jak-vybrat-spravny-router-domov-kompletni-pruvodce-2025` → skontrolovať, či tento slug existuje v dátach
   - `/blog/rozsireni-pokryti-poda-nove-oblasti-opticky-internet` → skontrolovať
   - `/blog/nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky` → skontrolovať
2. Pridať rovnaké do edge funkcie `ai-bot-detector.ts`

### Kategória 3: ID-based URL — ~6 URL
`/blog/4`, `/blog/5`, `/blog/12`, `/blog/100`, `/blog/999`, `/blog/7?source=...`, `/blog/13?source=...`

**Stav:** Redirecty pre `/blog/4`, `/blog/5`, `/blog/12`, `/blog/100`, `/blog/999` **už existujú** v `_redirects`. Google ich crawloval, ale ešte nespracoval redirect. URL s parametrami (`/blog/7?source=blog&post_id=7`) sú problém, lebo Netlify redirect neodchytí query string.

**Oprava:**
1. Toto sa rieši samo — 301 redirecty fungujú, Google ich časom spracuje.
2. Pre parametrové varianty (`/blog/7?source=...`) nie je potrebná akcia — BlogPost.tsx aj tak robí client-side redirect.

### Kategória 4: Špeciálne URL — 2 URL
- `/sitemap-index.xml` — Google ho crawluje ako sitemap, nie ako stránku. Toto je normálne a nie je problém.
- `/blog/gaming-internet-ostrava-2025` — redirect už existuje.

---

## Plán implementácie

### 1. Pridať chýbajúce 301 redirecty do `public/_redirects`
Pridať ~10 nových riadkov pre staré slug URL, ktoré Google crawluje ale nemajú redirect.

### 2. Synchronizovať `blogRedirectSystem.ts`
Pridať rovnaké mapovania do client-side redirect systému.

### 3. Synchronizovať `ai-bot-detector.ts`
Pridať nové slug redirecty do edge funkcie.

### 4. Opraviť robots.txt
Pridať `Disallow: /blog?` (bez lomky pred otáznikom) pre zachytenie URL ako `/blog?tag=Karviná`.

### 5. Odstrániť tag linky z breadcrumb schémy
V `BlogPostSEO.tsx` zmeniť breadcrumb position 3 z `?category=` URL na čistú `/blog` URL.

### 6. Po deploy-i
V Google Search Console kliknúť "Overiť opravu" na tejto issue, aby Google znovu precrawloval postihnuté URL a spracoval 301 redirecty.

---

### Súhrn
Hlavná príčina je, že Google objavil desiatky starých/parametrových URL, ktoré buď nemajú redirect, alebo ich redirect ešte nespracoval. Opravou je doplnenie chýbajúcich 301 redirectov a eliminácia interných odkazov na parametrové URL.


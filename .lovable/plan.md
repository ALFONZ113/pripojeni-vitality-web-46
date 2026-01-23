

## Hĺbková analýza: Čo vidia AI nástroje z webu popri.cz

Na základe mojej analýzy som identifikoval **závažné rozdiely** medzi tým, čo zobrazuje React aplikácia používateľom, a tým, čo vidia AI nástroje (ChatGPT, Gemini, Perplexity, NotebookLM).

---

## Súhrn problémov

### 1. Nesprávny rok (2025 namiesto 2026)

| Súbor | Problém |
|-------|---------|
| `public/ai-static/kontakt.html` | Footer: © 2025 |
| `public/ai-static/internet-poruba.html` | Footer: © 2025 |
| `public/ai-static/internet-bohumin.html` | Footer: © 2025 |
| `public/ai-static/internet-karvina.html` | Footer: © 2025 |
| `public/ai-static/blog.html` | Footer: © 2025 |
| `public/ai-static/blog/*.html` (5 článkov) | "Aktualizováno: Leden 2025" + footery |
| `index.html` | Schema.org `dateModified: "2025-01-14"` |
| `scripts/generate-ai-pages.js` | Riadok 97: "Aktuální tarify 2025" |

### 2. Nesprávne tarify v index.html (noscript sekcia)

**Čo vidia AI nástroje:**
```
- Tarif 300 Mbps: 300 Kč/měsíc
- Tarif 600 Mbps: 400 Kč/měsíc  
- Tarif 1000 Mbps: 490 Kč/měsíc
- Jednorázový instalační poplatek: 300 Kč
```

**Čo je správne (podľa tariffData.ts):**
```
- Internet + TV Basic: 300 Kč (PROMO) / 440 Kč (standard)
- Internet + TV Mých 10: 440 Kč (PROMO) / 520 Kč (standard)
- Rychlost: 1000/1000 Mbps (GPON) alebo 1000/200 Mbps (60 GHz)
- Instalace: ZDARMA (0 Kč)
```

### 3. Nesprávny email v index.html

**Aktuálne:** `info@popri.cz`  
**Správne:** `terc@obchod.poda.cz`

### 4. Blog článkov so slugmi obsahujúcimi "2025"

Tieto slugy sú použité v AI systéme aj na webe:
- `jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025`
- `pomaly-internet-8-sposobu-jak-vyresit-msk-2025`
- `polanka-nad-odrou-60ghz-pripojeni-2025`
- `nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025`

---

## Podrobný zoznam súborov na opravu

### Kategória A: AI-Static HTML súbory (najvyššia priorita)

Tieto súbory priamo ovplyvňujú, čo vidia AI boty:

| Súbor | Opravy |
|-------|--------|
| `public/ai-static/kontakt.html:68` | 2025 → 2026 |
| `public/ai-static/internet-poruba.html:126` | 2025 → 2026 |
| `public/ai-static/internet-bohumin.html:66` | 2025 → 2026 |
| `public/ai-static/internet-karvina.html:68` | 2025 → 2026 |
| `public/ai-static/blog.html:76` | 2025 → 2026 |
| `public/ai-static/blog/jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025.html` | Kompletná aktualizácia |
| `public/ai-static/blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025.html` | Kompletná aktualizácia |
| `public/ai-static/blog/gpon-technologie-jak-funguje-moderni-opticky-internet.html` | 2025 → 2026 |
| `public/ai-static/blog/o2-nej-prevzatie-poda-alternativa-zakaznici.html` | 2025 → 2026 |
| `public/ai-static/blog/ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi.html` | 2025 → 2026 |

### Kategória B: Hlavný index.html

| Lokácia | Oprava |
|---------|--------|
| Riadok 280 | `dateModified: "2025-01-14"` → `"2026-01-23"` |
| Riadok 305 | `dateModified: "2025-01-14"` → `"2026-01-23"` |
| Riadky 384-395 | Kompletne prepísať tarify na správne |
| Riadok 410 | `info@popri.cz` → `terc@obchod.poda.cz` |

### Kategória C: Generátor a Edge Function

| Súbor | Oprava |
|-------|--------|
| `scripts/generate-ai-pages.js:97` | "Aktuální tarify 2025" → "Aktuální tarify 2026" |
| `netlify/edge-functions/ai-bot-detector.ts:36,39` | Blog slugy obsahujú "2025" |

### Kategória D: Blog dáta (nižšia priorita - pre úplnú konzistentnosť)

| Súbor | Problém |
|-------|---------|
| `src/data/blog/slow-internet-fix.ts` | Slug a title obsahujú 2025 |
| `src/data/blog/wifi-signal-zlepsenie.ts` | Slug a title obsahujú 2025 |
| `src/data/blog/internet-guide.ts` | Title obsahuje 2025 |
| `src/data/blog/content/ostrava-intro.ts` | Dátum "13. června 2025" |
| `src/data/blog/content/ostrava-remaining.ts` | Text "rok 2025" |
| `src/data/blog/content/ostrava-cities.ts` | "Plán na rok 2025" |

---

## Plán opráv

### Fáza 1: Kritické opravy AI-visible obsahu

1. **Aktualizovať `index.html`**
   - Opraviť Schema.org `dateModified` na 2026
   - Kompletne prepísať noscript tarify na správne hodnoty
   - Opraviť email na `terc@obchod.poda.cz`

2. **Aktualizovať všetky `public/ai-static/*.html`**
   - Zmeniť © 2025 → © 2026 v pätkách
   - Aktualizovať "Aktualizováno: Leden 2025" → "Leden 2026"

3. **Aktualizovať všetky `public/ai-static/blog/*.html`**
   - Zmeniť roky v titulkoch a textoch
   - Opraviť footery na © 2026

### Fáza 2: Generátor a infraštruktúra

4. **Opraviť `scripts/generate-ai-pages.js`**
   - Riadok 97: 2025 → 2026

5. **Synchronizovať `netlify/edge-functions/ai-bot-detector.ts`**
   - Aktualizovať slugy ak sa budú meniť

### Fáza 3: Blog dáta (voliteľné)

6. **Aktualizovať blog content súbory**
   - Toto je komplexnejšie, pretože zmena slugov vyžaduje:
     - 301 redirecty zo starých URL
     - Aktualizáciu sitemap
     - Notifikáciu Search Console

---

## Čo presne vidia AI nástroje

### ChatGPT / Perplexity / NotebookLM

Keď tieto nástroje navštívia popri.cz:

1. **Netlify Edge Function** (`ai-bot-detector.ts`) detekuje AI User-Agent
2. Namiesto React aplikácie im servíruje **statické HTML** z `/ai-static/`
3. Tieto statické stránky obsahujú zastaralé informácie

### Google Extended / Bard

1. Majú prístup k `llms.txt` - tento súbor je **správne aktualizovaný** na 2026
2. Ale ak crawlujú stránky, dostanú statické HTML so starými dátami

### Prečo je to problém

Keď sa používateľ opýta ChatGPT "Koľko stojí internet od PODA?", AI môže odpovedať:
- "Tarif 1000 Mbps stojí 490 Kč/měsíc" (NESPRÁVNE)
- "Instalace stojí 300 Kč" (NESPRÁVNE)

Namiesto správnych informácií:
- "Internet + TV Basic stojí 300 Kč/měsíc (promo) / 440 Kč (standard)"
- "Instalace je ZDARMA"

---

## Technické detaily opráv

### Noscript sekcia v index.html - správna verzia

Namiesto aktuálnych nesprávnych tarifov:

```html
<section style="margin-bottom: 2rem;">
  <h2>Tarify a ceny 2026</h2>
  <div class="ns-card">
    <strong>Internet + TV Basic:</strong> 300 Kč/měsíc (PROMO) / 440 Kč (standard) - 85+ TV programů
  </div>
  <div class="ns-card">
    <strong>Internet + TV Mých 10:</strong> 440 Kč/měsíc (PROMO) / 520 Kč (standard) - 100+ TV programů
  </div>
  <p class="ns-text">
    Rychlost: 1000/1000 Mbps (byty) nebo 1000/200 Mbps (domy). 
    Instalace ZDARMA. Bez závazku.
  </p>
</section>

<section>
  <h2>Kontakt</h2>
  <p>
    <strong>Telefon:</strong> +420 730 431 313<br>
    <strong>Email:</strong> terc@obchod.poda.cz<br>
    <strong>Web:</strong> www.popri.cz
  </p>
</section>
```

---

## Odporúčanie ohľadom blog slugov s "2025"

Zmena blog slugov je **riziková** z hľadiska SEO, pretože:
- Stránky sú už zaindexované v Google
- Používatelia môžu mať uložené odkazy

**Odporúčam:**
- Ponechať existujúce slugy (sú časťou URL)
- Aktualizovať len **obsah** článkov na rok 2026
- Pri budúcich článkoch nepoužívať rok v slugu

---

## Súhrn: Čo bude implementované

| Priorita | Akcia | Súbory |
|----------|-------|--------|
| 1 | Opraviť roky a tarify v index.html | 1 súbor |
| 2 | Aktualizovať ai-static hlavné stránky | 5 súborov |
| 3 | Aktualizovať ai-static blog články | 5 súborov |
| 4 | Opraviť generátor | 1 súbor |
| 5 | Aktualizovať blog content dáta | 8+ súborov |

**Celkovo: ~20 súborov na úpravu**


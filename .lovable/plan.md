
# Plán: Kompletná výmena loga a favicon na nové Popri.cz logo

## Prehľad

Nahradíme všetky staré logá (modro-oranžové PODA logo) novým noir+gold logom Popri.cz, ktoré ste dodali. Nové logo sa bude zobrazovať všade: v prehliadači (favicon), na Facebooku, Googli, a všetkých ostatných platformách.

---

## Čo sa zmení

### Nový obrázok

Dodaný obrázok bude skopírovaný do projektu ako:
- `/public/popri-logo.png` - hlavné logo (štvorcové, pre sociálne siete)
- `/public/popri-favicon.png` - favicon (nahradí existujúci)
- `/public/og-image.png` - Open Graph obrázok (pre Facebook, Twitter, LinkedIn)

### Súbory na vymazanie (staré logá)

| Súbor | Popis |
|-------|-------|
| `/public/poda-favicon.ico` | Staré PODA favicon |
| `/public/poda-favicon-16x16.png` | Staré PODA favicon 16x16 |
| `/public/poda-favicon-32x32.png` | Staré PODA favicon 32x32 |
| `/public/poda-favicon-48x48.png` | Staré PODA favicon 48x48 |
| `/public/poda-favicon-96x96.png` | Staré PODA favicon 96x96 |
| `/public/poda-favicon-192x192.png` | Staré PODA favicon 192x192 |
| `/public/poda-favicon-512x512.png` | Staré PODA favicon 512x512 |
| `/public/poda-apple-touch-icon.png` | Staré PODA Apple touch icon |
| `/public/poda-logo.svg` | Staré PODA SVG logo |

---

## Súbory na úpravu

### 1. index.html (hlavný HTML súbor)

**Zmeny:**
- Riadok 56: `og:image` z `lovable-uploads/44bcfe01...` na `/og-image.png`
- Riadok 65: `twitter:image` z `lovable-uploads/44bcfe01...` na `/og-image.png`
- Riadok 263: Preload obrázku z `lovable-uploads/44bcfe01...` na `/popri-logo.png`
- Riadok 295: Schema logo z `poda-logo.svg` na `/popri-logo.png`

### 2. src/components/page/PageMetadata.tsx

**Zmeny:**
- Riadok 80: `og:image` z `og-image.png` na `popri-logo.png`
- Riadok 87: `twitter:image` z `og-image.png` na `popri-logo.png`
- Riadky 100-103: Zmena všetkých favicon odkazov z `poda-*` na `popri-favicon.png`
- Riadok 135: Schema logo z `poda-logo.svg` na `popri-logo.png`

### 3. public/json/schema-organization.json

**Zmeny:**
- Riadok 7: Logo z `lovable-uploads/44bcfe01...` na `https://www.popri.cz/popri-logo.png`
- Riadok 21: Facebook URL na `https://www.facebook.com/profile.php?id=61586889543817`

### 4. src/components/seo/AIOptimizedSchema.tsx

**Zmeny:**
- Riadok 20: Logo z `poda-logo.svg` na `popri-logo.png`
- Riadok 21: Image z `og-image.png` na `popri-logo.png`

### 5. src/pages/Index.tsx

**Zmeny:**
- Riadky 14-22: Aktualizovať CRITICAL_IMAGES a CRITICAL_RESOURCES na nové logo

### 6. src/utils/performance.ts

**Zmeny:**
- Riadky 12-15: Aktualizovať criticalResources na nové logo

### 7. src/hooks/use-optimized-performance.tsx

**Zmeny:**
- Riadky 40-43: Aktualizovať criticalResources na nové logo

### 8. src/utils/pageSeoOptimizer.ts

**Zmeny:**
- Riadok 24: ogImage z `poda-favicon-192x192.png` na `popri-logo.png`

### 9. scripts/build-seo.js

**Zmeny:**
- Riadok 483: Logo z `poda-logo.svg` na `popri-logo.png`

### 10. src/utils/sitemapGenerator.ts

**Zmeny:**
- Riadok 74: Logo z `lovable-uploads/44bcfe01...` na `popri-logo.png`

### 11. public/sitemap.xml

**Zmeny:**
- Riadok 13: Logo z `lovable-uploads/44bcfe01...` na `popri-logo.png`

### 12. public/service-worker.js

**Zmeny:**
- Riadok 22: Zmena z `poda-logo.svg` na `popri-logo.png`
- Riadky 35-42: Aktualizovať zoznam favicon súborov na nové názvy

### 13. public/site.webmanifest

**Zmeny:**
- Riadky 6, 12: Už používa `popri-favicon.png` - zostáva bez zmeny

### 14. public/browserconfig.xml

**Zmeny:**
- Riadok 5: Už používa `popri-favicon.png` - zostáva bez zmeny

---

## Technické detaily implementácie

### Krok 1: Kopírovanie obrázka

```text
user-uploads://Gemini_Generated_Image_xulninxulninxuln.png
  -> public/popri-logo.png (hlavné logo)
  -> public/popri-favicon.png (favicon - prepísať existujúci)
  -> public/og-image.png (Open Graph - prepísať existujúci)
```

### Krok 2: Vymazanie starých súborov

Súbory zo zoznamu vyššie budú odstránené z `/public/` priečinka.

### Krok 3: Aktualizácia kódu

Všetky súbory uvedené vyššie budú aktualizované s novými cestami k logu.

---

## Po implementácii

### Ako vynútiť aktualizáciu na Facebooku

1. Navštívte [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Zadajte URL: `https://www.popri.cz`
3. Kliknite na **"Scrape Again"** / **"Znovu načíst"**
4. Facebook načíta nový `og:image` a zobrazí nové logo

### Cache v prehliadači

- Favicon sa môže ukladať do cache prehliadača
- Používatelia môžu potrebovať vyčistiť cache alebo použiť Ctrl+F5
- Nová verzia bude mať cache-busting parameter

---

## Výsledok

Po implementácii:
- Nové noir+gold logo sa zobrazí ako favicon v prehliadači
- Facebook bude zobrazovať nové logo pri zdieľaní odkazov
- Google bude indexovať nové logo v štruktúrovaných dátach
- Twitter/X bude zobrazovať nové logo pri zdieľaní
- Všetky ostatné platformy budú používať nové logo

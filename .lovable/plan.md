

# Audit favikonu popri.cz — Čo je pravda a čo treba opraviť

## Čo Gemini povedal správne

Gemini má v zásade pravdu v týchto bodoch:
- Google si favikony cachuje a zmena v SERP trvá **dni až týždne**
- Favicon musí byť štvorec, násobok 48px
- Musí byť dostupný pre crawlery (nie blokovaný v robots.txt)
- Treba požiadať o re-indexáciu v GSC

## Aktuálny stav vášho kódu

Váš favicon `/popri-favicon.png` je nastavený na **6 miestach** — to je zbytočne veľa a spôsobuje problémy:

### Problem 1: Duplicitné favicon tagy
V `index.html` máte 5 `<link rel="icon">` tagov a zároveň `PageMetadata.tsx` pridáva ďalšie 4 cez React Helmet — **spolu 9 favicon tagov**. Google vidí chaos a môže si vybrať nesprávny alebo starý.

### Problem 2: `Date.now()` v URL favikonu
```tsx
href={`/popri-favicon.png?v=${faviconVersion}&t=${Date.now()}`}
```
Toto pri **každom renderovaní** mení URL favikonu. Google Favicon crawler vidí zakaždým inú URL → myslí si, že je to iný obrázok → ignoruje zmeny.

### Problem 3: Chýba `sizes="48x48"` v React Helmet verzii
Google **explicitne vyžaduje** 48x48 alebo jeho násobok. V `PageMetadata.tsx` máte len 32x32 a 192x192, chýba 48x48.

### Problem 4: Manifest uvádza nesprávne veľkosti
`site.webmanifest` tvrdí, že `popri-favicon.png` je 192x192 aj 512x512 — ale je to **jeden a ten istý súbor**. Ak skutočná veľkosť nezodpovedá, Google to môže odmietnuť.

### Problem 5: Favicon nie je blokovaný v robots.txt ✅
Toto je v poriadku — `/popri-favicon.png` nie je v Disallow pravidlách.

---

## Plán opráv

### Krok 1: Vyčistiť `index.html` — ponechať len 1 hlavný favicon tag
Odstrániť 5 duplicitných tagov a ponechať len:
```html
<link rel="icon" type="image/png" href="/popri-favicon.png" sizes="48x48">
<link rel="apple-touch-icon" href="/popri-favicon.png" sizes="180x180">
```
Google požaduje presne `sizes="48x48"` alebo násobok — ostatné veľkosti sú zbytočné.

### Krok 2: Odstrániť `Date.now()` z favicon URL v PageMetadata.tsx
Nahradiť dynamický timestamp fixnou verziou:
```tsx
href="/popri-favicon.png?v=2026.03"
```
Stabilná URL = Google favicon crawler rozpozná, že sa jedná o ten istý obrázok.

### Krok 3: Zjednodušiť favicon tagy v PageMetadata.tsx
Ponechať len 2 tagy (icon 48x48 + apple-touch-icon), zhodné s index.html.

### Krok 4: Opraviť site.webmanifest
Odstrániť falošnú veľkosť 512x512 (ak súbor nie je skutočne 512px).

### Krok 5: Pridať caching header pre favicon v netlify.toml
```toml
[[headers]]
  for = "/popri-favicon.png"
  [headers.values]
    Cache-Control = "public, max-age=86400"
```
Toto zabezpečí, že Google dostane stabilný, cachovateľný obrázok.

---

## Súhrn

| Čo Gemini povedal | Pravda? |
|---|---|
| Google cachuje favikony dlho | ✅ Áno |
| Treba 48px násobok | ✅ Áno |
| Treba re-indexáciu v GSC | ✅ Áno |
| Skontrolovať robots.txt | ✅ Áno (u vás je OK) |

| Čo Gemini nepovedal (a je problém) | |
|---|---|
| Máte 9 duplicitných favicon tagov | Treba opraviť |
| `Date.now()` mení URL pri každom renderovaní | Treba opraviť |
| Chýba explicitná veľkosť 48x48 | Treba pridať |
| Manifest uvádza falošné veľkosti | Treba opraviť |

## Dotknuté súbory
- `index.html` — zjednodušenie favicon tagov
- `src/components/page/PageMetadata.tsx` — odstránenie Date.now(), zjednodušenie
- `public/site.webmanifest` — oprava veľkostí
- `netlify.toml` — pridanie cache headeru pre favicon


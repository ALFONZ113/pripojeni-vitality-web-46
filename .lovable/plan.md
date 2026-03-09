

# Plán na návrat na první stránku Google pro "PODA internet", "PODA dostupnost", "PODA Ostrava"

## Analýza aktuálneho stavu

Z kódu a screenshotu vidím:
- Popri.cz sa zobrazuje na Google, ale kleslo z 1. na 2. stránku
- Homepage title: "PODA Internet Ostrava | Gigabit + TV zdarma | 730 431 313"
- Existuje `/internet-ostrava` stránka s dobrým obsahom
- Chýba dedikovaná stránka pre "PODA dostupnost"
- Sitemap `lastmod` dátumy sú staré (2026-01-12 — takmer 2 mesiace)
- `index.html` má `last-modified: 2026-03-03` ale Helmet prepíše na `2025-01-14`
- Chýba "O nás" stránka (E-E-A-T signál)
- Schema.org dáta sú dobré, ale niektoré dátumy sú nekonzistentné

## Identifikované problémy a riešenia

### 1. Zastaralé lastmod dátumy v sitemap.xml (KRITICKÉ)
Google vidí `2026-01-12` na všetkých stránkach — signalizuje "stagnujúci web". Aktualizovať na `2026-03-09` (dnešný dátum) pre hlavné stránky.

### 2. Nekonzistentné dátumy v PageMetadata
`Index.tsx` posieľa `currentDate="2025-01-14"` — viac ako rok starý! `CityTemplate.tsx` má `"2025-12-10"`. Toto musí byť aktuálne.

### 3. Chýba dedikovaná landing page pre "PODA dostupnost"
Kľúčové slovo "PODA dostupnost" nemá žiadnu cielenú stránku. Riešenie: Rozšíriť `LocalSEOSection` na homepage o výrazný H2 nadpis s textom "Dostupnost PODA internetu" a pridať dedikovanú sekciu s mapou pokrytia a CTA.

### 4. Nedostatočný on-page SEO pre cieľové kľúčové slová
Homepage nemá v H1/H2 priamo frázy "PODA internet", "PODA Ostrava", "PODA dostupnost". Tieto frázy musia byť viditeľné v heading tagoch.

### 5. Homepage `<title>` začína "PODA Internet Ostrava" — dobré, ale meta description nezahŕňa "dostupnost"
Upraviť meta description aby zahŕňal slovo "dostupnost".

### 6. Interné prepojenie (internal linking) je slabé
Homepage linkuje na mestské stránky, ale `/internet-ostrava` nelinkuje späť na tarify alebo blog. Pridať interné odkazy medzi kľúčovými stránkami.

### 7. Nový obsah / freshness signály
Aktualizovať dátumy, pridať nový textový obsah na homepage (sekcia "Dostupnost"), a aktualizovať `llms.txt` s dnešným dátumom.

## Konkrétne zmeny

### Súbor 1: `public/sitemap.xml`
- Aktualizovať všetky `<lastmod>` na `2026-03-09` pre hlavné stránky (homepage, tarify, internet-ostrava, internet-tv, blog)

### Súbor 2: `src/pages/Index.tsx`
- Zmeniť `currentDate` na `"2026-03-09"`
- Pridať kľúčové slová: `'PODA dostupnost'`, `'PODA Ostrava'`, `'internet PODA'`
- Upraviť meta description: pridať slovo "dostupnost"

### Súbor 3: `src/pages/CityTemplate.tsx`
- Zmeniť `currentDate` na `"2026-03-09"`

### Súbor 4: `src/components/sections/LocalSEOSection.tsx`
- Pridať `<h2>` s textom "Dostupnost PODA internetu v regionu" (targeting "PODA dostupnost")
- Pridať krátky SEO odstavec pod nadpis vysvetľujúci dostupnosť

### Súbor 5: `src/components/hero/HeroSection.tsx`
- Zabezpečiť, že H1 obsahuje "PODA" a "internet" spolu
- Pridať `<p>` tag s "PODA internet Ostrava" pre on-page relevance

### Súbor 6: `index.html`
- Aktualizovať `last-modified` a `content-updated` na `2026-03-09`

### Súbor 7: `public/llms.txt`
- Aktualizovať dátum na `2026-03-09`

### Súbor 8: `src/components/page/PageMetadata.tsx`
- Pridať `dateModified` do WebSite a Organization schém s aktuálnym dátumom

### Súbor 9: `public/ai-static/internet-ostrava.html`
- Aktualizovať statický HTML s aktuálnym dátumom pre Google boty

### Súbor 10: `src/data/cities/citiesData.ts`
- Rozšíriť Ostrava SEO keywords o "PODA dostupnost Ostrava", "dostupnost PODA internet"

## Očakávaný dopad

| Zmena | Dopad na ranking |
|---|---|
| Aktualizácia sitemap lastmod | Google recrawlne stránky rýchlejšie |
| Oprava `currentDate` z 2025 na 2026-03 | Freshness signál — veľký boost |
| H2 "Dostupnost PODA internetu" | Priamy targeting kľúčového slova |
| Rozšírenie keywords v meta tagoch | Lepšia relevancia pre queries |
| Internal linking vylepšenia | Lepšia distribúcia PageRank |
| Aktualizácia llms.txt a ai-static | AI search a crawler signály |


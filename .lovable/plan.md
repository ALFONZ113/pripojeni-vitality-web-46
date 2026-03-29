

## Prečo overenie zlyhalo a čo s tým

### Vysvetlenie pre teba (jednoducho)

Keď si v GSC klikol "Overiť opravu", Google začal znova prechádzať všetkých 59 problémových URL. Ak čo i len **jedna** stránka stále nefunguje správne, celé overenie zlyhá. Neznamená to, že sa nič neopravilo — znamená to, že niektoré z tých 59 URL stále nie sú v poriadku.

Z tvojho zoznamu vidím **3 konkrétne chyby v kóde**, ktoré spôsobujú zlyhanie:

### Chyba č. 1: `/promo-akcia` neexistuje
Google crawluje URL `https://www.popri.cz/promo-akcia`, ale tvoj web má route `/promo-akce` (s **e** na konci, nie **ia**). Takže `/promo-akcia` zobrazí tvoj React web, ale s komponentom NotFound (404 stránka renderovaná ako 200 status). Google to vidí ako "prázdnu stránku" a odmietne indexovať.

**Oprava**: Pridať redirect `/promo-akcia` → `/promo-akce` do `_redirects`.

### Chyba č. 2: `/blog/internet-poda-ostrava-pripojeni` nemá redirect
Toto je starý blog slug, ktorý Google stále crawluje. Neexistuje k nemu redirect na aktuálny slug. V `redirectManager.ts` vidím, že sa na tento slug odkazuje ako na cieľ, ale samotný slug už neexistuje ako platný článok.

**Oprava**: Pridať redirect na správny aktuálny slug do `_redirects`.

### Chyba č. 3: `/sitemap-index.xml` v robots.txt
V `robots.txt` máš riadok `Sitemap: https://www.popri.cz/sitemap-index.xml`. Google ho crawluje ako stránku a samozrejme ho neindexuje (je to XML). Toto zbytočne nafukuje počet "neindexovaných" stránok.

**Oprava**: Odstrániť `sitemap-index.xml` z robots.txt (ponechať len `sitemap.xml`).

### Čo so zvyšnými URL?

Väčšina ostatných (trailing slash URL ako `/programy/`, `/internet-tv/`, query param URL ako `/blog/11?source=...`) **už má správne redirecty**. Google ich len ešte nestihol znova precrawlovať po opravách. Po fixe týchto 3 chýb a novom overení by to malo prejsť.

### Technické zmeny

**Súbor `public/_redirects`** — pridať 2 nové redirecty:
```
/promo-akcia /promo-akce 301!
/blog/internet-poda-ostrava-pripojeni /blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025 301!
```

**Súbor `public/robots.txt`** — odstrániť riadok so `sitemap-index.xml`, ponechať len:
```
Sitemap: https://www.popri.cz/sitemap.xml
```

**Súbor `public/sitemap.xml`** — overiť, že neobsahuje URL `/promo-akcia` ani `/sitemap-index.xml`.

### Po deploy-i
1. V GSC znova klikni "Overiť opravu" na tejto chybe
2. Požiadaj o indexovanie pre `/promo-akce` a homepage
3. Počkaj 2-4 týždne — Google postupne precrawluje všetky URL

### Súbory na úpravu
- `public/_redirects` — 2 nové 301 redirecty
- `public/robots.txt` — odstrániť sitemap-index.xml


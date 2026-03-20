

## Synchronizácia ai-static meta tagov s React komponentmi

### Problém
Edge funkcia `ai-bot-detector` posiela Googlebotu statický HTML z `public/ai-static/`, ktorý má **iné meta tagy** než React aplikácia. Google preto indexuje nesprávne titulky a popisy.

**Príklad homepage:**
- React (`Index.tsx`): "PODA Internet Ostrava a okolí | Gigabit + TV zdarma | 730 431 313"
- ai-static (`index.html`): "Popri.cz - Autorizovaný partner PODA | Gigabitový Internet + TV | 730 431 313"

Google používa ten druhý (statický) — preto vidíš vo vyhľadávaní iný text.

### Plán

#### 1. Aktualizovať `public/ai-static/index.html`
Zmeniť `<title>` a `<meta description>` aby presne zodpovedali tomu, čo je v `Index.tsx`:
- Title: "PODA Internet Ostrava a okolí | Gigabit + TV zdarma | 730 431 313"
- Description: "PODA internet Ostrava — dostupnost a pokrytí v celém regionu. Optika 1000 Mbps bez výpadků, TV zdarma, bez závazků. Ověřte dostupnost: 730 431 313."

#### 2. Aktualizovať ai-static city stránky
Synchronizovať meta tagy pre tieto súbory s údajmi z `pageSeoOptimizer.ts` a `citiesData.ts`:
- `public/ai-static/internet-ostrava.html`
- `public/ai-static/internet-karvina.html`
- `public/ai-static/internet-havirov.html`
- `public/ai-static/internet-bohumin.html`
- `public/ai-static/internet-poruba.html`

#### 3. Aktualizovať ai-static ďalšie stránky
- `public/ai-static/tarify.html`
- `public/ai-static/kontakt.html`
- `public/ai-static/blog.html`
- `public/ai-static/o-nas.html`

#### 4. Aktualizovať `index.html` (hlavný)
Zosúladiť `<title>` v `index.html` s `Index.tsx` (momentálne má "Nejvýhodnější PODA Internet Ostrava" vs "PODA Internet Ostrava a okolí").

#### 5. Aktualizovať OG tagy v ai-static
Pridať `og:title` a `og:description` do statických HTML súborov, aby aj social sharing z cache-ovaných verzií zobrazoval správne údaje.

### Súbory na úpravu
- `public/ai-static/index.html` — homepage meta tagy
- `public/ai-static/internet-ostrava.html` — city meta tagy
- `public/ai-static/internet-karvina.html`
- `public/ai-static/internet-havirov.html`
- `public/ai-static/internet-bohumin.html`
- `public/ai-static/internet-poruba.html`
- `public/ai-static/tarify.html`
- `public/ai-static/kontakt.html`
- `public/ai-static/blog.html`
- `public/ai-static/o-nas.html`
- `index.html` — zosúladiť title s Index.tsx

### Výsledok
Po deploy-i Google pri ďalšom crawle uvidí správne meta tagy a postupne aktualizuje snippet vo vyhľadávaní. Zmena sa prejaví do 1-4 týždňov.


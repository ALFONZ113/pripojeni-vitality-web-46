

## Prečo konkurent s WordPress/HTML je indexovaný rýchlejšie a čo s tým

### Jednoduchá odpoveď

**Áno, máš pravdu.** WordPress/HTML stránky sa indexujú rýchlejšie. Dôvod je jednoduchý:

```text
WordPress stránka:
  Google príde → okamžite vidí hotové HTML s celým obsahom → indexuje

Tvoja React stránka (SPA):
  Google príde → vidí prázdny <div id="root"> → musí spustiť JavaScript
  → počká kým React vykreslí obsah → AŽ POTOM indexuje
```

Aj keď máš zapnutý Netlify Prerendering, ten funguje tak, že Netlify **na pozadí** spustí prehliadač, počká na vykreslenie a pošle výsledok Googlu. Ale:
- Trvá to dlhšie ako čisté HTML
- Niekedy sa stane timeout a Google dostane neúplnú stránku
- Google dáva prednosť stránkam, kde obsah vidí okamžite

### Čo konkrétne robiť

Riešenie je **SSG (Static Site Generation)** — vygenerovať hotové HTML súbory pri builde, nie za behu. Tvoj web už má základ v `scripts/generate-ai-pages.js` pre AI crawlery. Rozšírime to tak, aby **každá dôležitá stránka** mala vopred vygenerované kompletné HTML.

### Technický plán

#### 1. Vytvoriť build-time prerendering skript

Nový skript `scripts/prerender-pages.js`, ktorý po `npm run build`:
- Spustí hotový build v headless prehliadači (Puppeteer)
- Navštívi každú dôležitú URL (homepage, tarify, mestské stránky, blog)
- Uloží výsledné HTML do `dist/` priečinka
- Google potom dostane **hotové HTML** okamžite, bez čakania na JavaScript

#### 2. Aktualizovať Netlify build príkaz

V `netlify.toml` pridať krok prerenderovania po builde:
```text
command = "npm ci && node scripts/build-seo.js || true && npm run build && node scripts/prerender-pages.js || true"
```

#### 3. Stránky na prerenderovanie (prioritne)

Celkovo ~25 kľúčových stránok:
- `/` (homepage)
- `/tarify`, `/internet-tv`, `/iptv`, `/programy`, `/kontakt`
- `/internet-ostrava`, `/internet-karvina`, `/internet-havirov`, `/internet-bohumin`, `/internet-poruba`
- `/giga-internet`, `/promo-akce`, `/o-nas`
- `/blog` + top 10 blogových článkov

#### 4. Čo to zmení

```text
PRED opravou:
  Google príde → Netlify prerendering (2-5 sekúnd) → možný timeout → čierna stránka

PO oprave:
  Google príde → hotové HTML okamžite (< 100ms) → plný obsah → rýchla indexácia
```

### Alternatívny jednoduchší prístup

Ak nechceme pridávať Puppeteer (veľká závislosť), môžeme použiť **vite-plugin-prerender**, ktorý je už odkomentovaný v `vite.config.ts`. Tento plugin generuje statické HTML priamo počas Vite buildu bez externého prehliadača.

### Odporúčaný prístup

Použiť `vite-plugin-prerender` — je to najčistejšie riešenie pre Vite projekt:
- Pridať `vite-plugin-prerender` ako závislosť
- Konfigurovať v `vite.config.ts` so zoznamom 25 kľúčových routes
- Plugin pri builde automaticky vygeneruje statické HTML pre každú route

### Súbory na úpravu
- `vite.config.ts` — pridať vite-plugin-prerender s 25 routes
- `package.json` — pridať závislosť vite-plugin-prerender
- `netlify.toml` — prípadné úpravy build príkazu




## Čo je na audite LovableHTML pravda a čo nie

### Čo tool ukazuje

LovableHTML simuluje crawlery **bez spustenia JavaScriptu** (ľavá strana "BEFORE") vs. **s prerenderingom** (pravá strana "AFTER"). Výsledky:

- BEFORE: SEO 25, Visibility 0%, Content words 0
- AFTER: SEO 85, Visibility 100%, Content words 1010

### Čo je PRAVDA

**Tool správne identifikuje, že tvoj raw HTML (bez JS) má 0 viditeľného obsahu.** Dôvod je riadok 493 v `index.html`:

```html
<script>document.getElementById('ssr-fallback').style.display='none';</script>
```

Tento inline skript sa spustí okamžite a skryje celý fallback obsah. Takže aj jednoduchý crawler, ktorý spúšťa inline JS, vidí prázdnu stránku.

Tool tiež správne ukazuje, že `og:image` chýba v raw HTML (máš len `og:locale` a `og:site_name` staticky, zvyšok pridáva React Helmet dynamicky).

### Čo je ZAVÁDZAJÚCE

1. **"Missing title" a "Missing meta description"** — toto je **nepravda**. Tvoj `index.html` má obe na riadkoch 12 a 15. Tool má bug v parseri alebo ich ignoruje kvôli veľkému `<style>` bloku.

2. **"Missing canonical link"** — **nepravda**. Máš `<link rel="canonical">` na riadku 46.

3. **"Missing h1"** — je tam, ale skrytý cez `display:none`, takže tool ho nepočíta.

4. **Googlebot score 50 (BEFORE)** — zavádzajúce. Google má vlastný renderer (Chromium), takže vidí plný obsah. Plus máš Netlify Prerendering, ktorý Googlu posiela hotové HTML.

### Čo je SKUTOČNÝ problém

Pre **Bingbot, GPTBot, ClaudeBot, PerplexityBot a facebookexternalhit** je to relevantné — tieto crawlery nespúšťajú JS a vidia prázdnu stránku. ALE tvoja edge funkcia `ai-bot-detector` už toto rieši — posiela im statické HTML z `/ai-static/`.

Takže v praxi:
- **Google** → Netlify Prerendering → vidí plný web ✅
- **Facebook/social** → edge funkcia → statické OG HTML ✅  
- **AI boty** → edge funkcia → statické HTML ✅
- **Bingbot** → edge funkcia → statické HTML ✅

### Jediná zmena, ktorá stojí za zváženie

Odstrániť inline skript `display:none` a namiesto toho skryť fallback **iba keď React naozaj načíta** (čo už robíš cez `.react-loaded` CSS triedu). Tým by aj raw HTML bez akejkoľvek edge funkcie ukázal obsah.

Konkrétne: zmeniť riadok 493 v `index.html` z:
```html
<script>document.getElementById('ssr-fallback').style.display='none';</script>
```
na odstránenie tohto riadku úplne, a nechať skrývanie na existujúce CSS pravidlo `.react-loaded #ssr-fallback { display: none; }` (alebo `.react-loaded .static-content { display: none; }`).

**Problém**: toto sme už skúšali a spôsobovalo to prebliknutie fallback obsahu pre bežných používateľov.

**Kompromisné riešenie**: Skryť fallback s krátkym oneskorením (100ms), aby crawlery bez JS stihli obsah vidieť, ale používatelia ho neuvidia:

```html
<script>
  var f = document.getElementById('ssr-fallback');
  if (f) setTimeout(function(){ f.style.display='none'; }, 100);
</script>
```

### Súhrn

| Tvrdenie LovableHTML | Skutočnosť |
|---|---|
| SEO score 25 | Zavádzajúce — počíta len raw HTML bez edge funkcie a prerenderingu |
| Missing title/description/canonical | **Nepravda** — sú tam, tool má bug |
| Content words 0 | Technicky pravda pre raw HTML (skryté cez JS), ale crawlery dostávajú obsah cez edge funkciu |
| Potrebuješ ich službu | **Nie** — máš Netlify Prerendering + edge funkciu, ktoré robia to isté |

### Súbory na úpravu
- `index.html` — zmeniť riadok 493: nahradiť okamžité `display:none` za 100ms timeout


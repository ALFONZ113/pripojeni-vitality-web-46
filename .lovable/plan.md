
# Riešenie: Statické OG HTML pre Facebook zdieľanie

## Diagnostika problému

### Čo ukazuje Facebook Debugger
- **Response Code: 418** ("I'm a teapot") - neštandardný HTTP kód
- **Curl Timeout** - Facebook crawler nedostáva odpoveď
- **og:title: www.popri.cz** - dostáva default hodnoty

### Prečo Edge funkcia nefunguje
1. **Duplicitná konfigurácia** - path je definovaný v `netlify.toml` AJ v `export const config`
2. **Edge funkcia možno zlyháva** - chyba spôsobuje timeout
3. **Netlify môže blokovať** - rate limiting alebo bot protection

### Prečo predchádzajúce opravy nefungovali
Všetky opravy sa zameriavali na OG tagy v kóde, ale skutočný problém je že **server vôbec neodpovedá Facebooku správne** (HTTP 418 + timeout).

## Navrhované riešenie: Statické HTML súbory

Vytvoríme jednoduché statické HTML súbory pre každý blogový článok v priečinku `public/og/`. Facebook ich načíta PRIAMO bez závislosti na Edge funkcii.

### Prečo toto funguje
- Statické súbory nevyžadujú Edge funkciu
- Netlify ich servuje priamo bez spracovania
- Facebook crawler ich načíta okamžite
- 100% spoľahlivé riešenie

### Implementácia

#### 1. Vytvoriť priečinok `public/og/blog/`

Pre každý blogový článok vytvoriť súbor ako:
`public/og/blog/jak-ai-meni-svet-proc-kvalitni-internet-zaklad.html`

#### 2. Obsah statického HTML súboru

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Jak AI mění svět kolem nás | Blog Popri.cz</title>
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://www.popri.cz/blog/jak-ai-meni-svet-proc-kvalitni-internet-zaklad">
  <meta property="og:title" content="Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ">
  <meta property="og:description" content="Umělá inteligence mění práci, zábavu i domácnosti.">
  <meta property="og:image" content="https://www.popri.cz/blog-images/ai-internet-zaklad.webp">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Popri.cz">
  <meta http-equiv="refresh" content="0;url=https://www.popri.cz/blog/jak-ai-meni-svet-proc-kvalitni-internet-zaklad">
</head>
<body>
  <p>Presmerovanie na článok...</p>
</body>
</html>
```

#### 3. Konfigurácia redirectu v `public/_redirects`

```text
# Facebook OG pre blog články - presmerovať na statické OG súbory
/og/blog/* /og/blog/:splat 200
```

#### 4. Aktualizovať zdieľacie URL

Na Facebooku zdieľať URL: `https://www.popri.cz/og/blog/slug-clanku`
- Facebook načíta OG tagy
- Meta refresh presmeruje užívateľa na skutočný článok

### Alternatívny prístup: Opraviť Edge funkciu

Ak preferuješ opravu Edge funkcie:

1. **Odstrániť `export const config`** z `ai-bot-detector.ts` - použiť len `netlify.toml`
2. **Pridať try-catch** okolo celého handlera
3. **Zjednodušiť logiku** - menej kódu = menej chýb
4. **Testovať lokálne** pomocou `netlify dev`

### Súbory na vytvorenie

Pre každý blogový článok v `BLOG_POSTS_OG_DATA` vytvoriť statický HTML:

```text
public/og/blog/
├── jak-ai-meni-svet-proc-kvalitni-internet-zaklad.html
├── nejcastejsi-myty-o-optickem-internetu.html
├── poda-internet-2026-ceny-rychlosti-recenze.html
├── home-office-internet-pozadavky-2025.html
├── pomaly-internet-8-sposobu-jak-vyresit-msk-2025.html
├── ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi.html
├── o2-nej-prevzatie-poda-alternativa-zakaznici.html
├── gpon-technologie-jak-funguje-moderni-opticky-internet.html
├── jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025.html
└── proc-internet-doma-pomaluje-vecer-a-jak-to-vyresit.html
```

### Build script pre automatizáciu

Vytvorím script `scripts/generate-og-pages.js` ktorý:
1. Načíta všetky blogové články
2. Vygeneruje statické HTML súbory s OG tagmi
3. Beží automaticky pri každom builde

### Výsledok

Po implementácii:
- Zdieľanie na Facebook: `https://www.popri.cz/og/blog/slug`
- Facebook zobrazí správny obrázok a titulok
- Užívateľ bude presmerovaný na skutočný článok

### Časový odhad

- Vytvorenie statických HTML: 5 minút
- Build script: 10 minút
- Testovanie: 5 minút

## Technické poznámky

### Prečo HTTP 418
- Netlify Edge Functions môžu vrátiť 418 pri internej chybe
- Môže byť aj rate limiting alebo bot protection
- Statické súbory toto obchádzajú

### Prečo nerobiť ďalšie opravy Edge funkcie
- Už bolo vyskúšaných 5+ verzií
- Problém nie je v OG tagoch ale v serverovej odozve
- Statické riešenie je zaručene funkčné

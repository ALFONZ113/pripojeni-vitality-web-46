
# Oprava Facebook zdieľania - Definitívne riešenie

## Zistený problém

Zo screenshotu Facebook Debuggera vidím:
- **og:url** = `https://www.popri.cz/` (HOMEPAGE!)
- **og:title** = "PODA Internet Ostrava a okolí | Gigabit + TV zdarma | 730 431 313" (HOMEPAGE!)
- **og:image** = `https://www.popri.cz/popri-logo.png` (HOMEPAGE logo!)
- **Response Code** = 200 (takže server odpovedá)

**Koreňová príčina:** Pravidlo `/blog/* /index.html 200` v `public/_redirects` má vyššiu prioritu ako edge funkcia a servuje React SPA (index.html) s homepage OG tagmi PREDTÝM, ako edge funkcia zachytí request.

## Riešenie

### Krok 1: Odstrániť `/blog/*` redirect z `_redirects`

Súbor `public/_redirects` obsahuje na riadku 59:
```
/blog/* /index.html 200
```

**Toto pravidlo musí byť ODSTRÁNENÉ** - edge funkcia sa postará o blog URL routing.

### Krok 2: Aktualizovať `netlify.toml` s explicitným edge function priority

Pridať `cache = "manual"` a explicitne definovať poradie:

```toml
# CRITICAL: Edge function pre social crawlers - MUSÍ byť PRVÁ
[[edge_functions]]
  function = "ai-bot-detector"
  path = "/blog/*"
  cache = "manual"
```

### Krok 3: Upraviť edge funkciu pre lepšiu diagnostiku

Pridať fallback ak slug nie je v registri - vrátiť generický článkový OG tag namiesto pokračovania do SPA:

```typescript
// Ak slug nie je v registri, stále vrátiť OG HTML s fallback hodnotami
// NIKDY nepokračovať do React SPA pre social crawlery na /blog/* URL
```

### Krok 4: Pridať chýbajúci slug do registra

Článok `nejcastejsi-myty-o-optickem-internetu` už je v registri (riadok 103-107), takže dáta sú správne.

## Technické detaily

### Zmeny v `public/_redirects`

```diff
- /blog/* /index.html 200
# Edge function handles blog routing for crawlers
```

### Zmeny v `netlify/edge-functions/ai-bot-detector.ts`

1. Pre social crawlery na `/blog/*` URL VŽDY vrátiť OG HTML - nikdy `context.next()`
2. Lepšie logovanie pre debug

### Zmeny v `netlify.toml`

Explicitná priorita edge funkcie s cache control.

## Prečo predchádzajúce pokusy nefungovali

1. **Redirect priorita**: `public/_redirects` súbor má v Netlify prednosť pred edge functions pre rewrite pravidlá
2. **200 status**: Pravidlo `/blog/* /index.html 200` je rewrite (nie redirect), takže Netlify servuje `index.html` priamo
3. **Edge function bypass**: Kvôli rewrite pravidlu edge funkcia buď:
   - Zachytí request, ale potom `context.next()` ho pošle do rewrite
   - Alebo sa nespustí vôbec kvôli rewrite priorite

## Očakávaný výsledok

Po nasadení a kliknutí na "Scrape Again" v Facebook Debugger:
- `og:url` = `https://www.popri.cz/blog/nejcastejsi-myty-o-optickem-internetu`
- `og:title` = "Nejčastější mýty o optickém internetu, kterým lidé stále věří"
- `og:image` = `https://www.popri.cz/blog-images/myty-opticky-internet.jpg`
- `og:description` = článkový popis

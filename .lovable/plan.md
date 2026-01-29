
# Plán: Definitívna oprava Facebook zdieľania článkov

## Analýza aktuálneho stavu

### Čo zistil Claude Sonnet 4.5 (a čo z toho je pravda)

**PRAVDA:**
- Facebook crawler dostáva homepage OG tagy (`og:url = https://www.popri.cz/`)
- Namiesto článkového obrázka vidí `popri-logo.png`
- Namiesto článkového titulku vidí "Nejvýhodnější PODA Internet Ostrava"

**PREČO sa to deje:**
Edge funkcia `ai-bot-detector.ts` existuje a je správne nakonfigurovaná, ALE pravdepodobne sa nespúšťa alebo jej výsledok nie je doručený Facebooku.

### Technické zistenia z analýzy kódu

1. **Edge funkcia obsahuje správne dáta** (riadky 103-107):
```typescript
'nejcastejsi-myty-o-optickem-internetu': {
  title: 'Nejčastější mýty o optickém internetu...',
  description: 'Věříte mýtům o optickém internetu?...',
  image: '/blog-images/myty-opticky-internet.jpg'
}
```

2. **Obrázok existuje** v `public/blog-images/myty-opticky-internet.jpg`

3. **Netlify konfigurácia vyzerá správne** v `netlify.toml`:
```toml
[[edge_functions]]
  function = "ai-bot-detector"
  path = "/blog/*"
  cache = "manual"
```

4. **Podľa Netlify dokumentácie**: "Edge functions process before redirects" - takže priorita by mala byť správna

## Možné príčiny problému

1. **Edge funkcia sa vôbec nenasadí** - Netlify Edge Functions vyžadujú špecifickú štruktúru
2. **User-Agent detekcia nefunguje** - možno Facebook používa iný User-Agent string
3. **Fallback na `context.next()` spúšťa SPA** - pre non-blog URL funkcia pokračuje, ale pre blog by nemala
4. **Cache problém** - Netlify môže cachovať nesprávnu verziu

## Navrhované riešenie

### Krok 1: Zjednodušenie Edge funkcie pre blog
Presunúť logiku tak, aby VŽDY pre `/blog/*` URL vrátila OG HTML pre social crawlery - bez možnosti fallbacku na SPA.

### Krok 2: Pridanie explicitných Facebook User-Agent stringov
```typescript
const SOCIAL_CRAWLER_PATTERNS = [
  'facebookexternalhit/1.1',  // Explicitná verzia
  'facebookexternalhit',
  'facebookcatalog',          // Katalógový crawler
  'facebot',
  // ... ostatné
];
```

### Krok 3: Pridanie diagnostických endpointov
Pridať URL `/blog/test-og` ktorá vráti debug informácie o detekcii crawlera.

### Krok 4: Overenie obrázkov - absolútne URL
Zabezpečiť, že všetky `og:image` URL sú absolútne:
```typescript
// MUSÍ byť: https://www.popri.cz/blog-images/myty-opticky-internet.jpg
// NIE: /blog-images/myty-opticky-internet.jpg
```

### Krok 5: Testovanie cez curl simuláciu
Po nasadení otestovať:
```bash
curl -H "User-Agent: facebookexternalhit/1.1" \
     "https://www.popri.cz/blog/nejcastejsi-myty-o-optickem-internetu"
```

## Technická implementácia

### Zmeny v `netlify/edge-functions/ai-bot-detector.ts`

1. **Pridať explicitnejšie User-Agent patterny:**
   - `facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)`
   - `facebookcatalog/1.0`

2. **Pridať debug endpoint:**
   - Pre URL `/blog/_debug` vrátiť info o detekcii

3. **Zabezpečiť VŽDY absolútne URL:**
   - Všetky `og:image` musia začínať `https://www.popri.cz`

4. **Pridať číslo verzie do response headeru:**
   - `X-Edge-Version: 4` pre tracking nasadenia

### Zmeny v `netlify.toml`

1. **Pridať onError handler:**
```toml
[[edge_functions]]
  function = "ai-bot-detector"
  path = "/blog/*"
  cache = "manual"
  on_error = "bypass"
```

### Zmeny v `public/_redirects`

1. **Odstrániť globálny catch-all pre blog** ak ešte existuje problém - presunúť routing výhradne do edge funkcie

## Testovací plán

1. Po nasadení spustiť curl s Facebook User-Agent
2. Overiť response headers (`X-Edge-Function`, `X-Edge-Version`)
3. Overiť OG tagy v response HTML
4. Ak všetko OK, použiť Facebook Sharing Debugger → Scrape Again

## Očakávaný výsledok

Facebook Debugger zobrazí:
- `og:url`: `https://www.popri.cz/blog/nejcastejsi-myty-o-optickem-internetu`
- `og:title`: `Nejčastější mýty o optickém internetu, kterým lidé stále věří`
- `og:image`: `https://www.popri.cz/blog-images/myty-opticky-internet.jpg`
- `og:description`: článkový popis

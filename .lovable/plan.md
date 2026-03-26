

## Prečo Google vidí "debilinu" namiesto tvojho webu

### Čo sa deje

Tvoja edge funkcia `ai-bot-detector.ts` na riadku 511 robí toto:

```text
Googlebot príde na www.popri.cz
  → Edge funkcia ho ZACHYTÍ
  → Namiesto tvojho React webu mu POŠLE /ai-static/index.html
  → To je tá jednoduchá stránka s tabuľkou a telefónnym číslom
  → Google TOTO indexuje namiesto tvojho skutočného webu
```

**To je presne to, čo vidíš na screenshote** — jednoduchá HTML stránka s tabuľkami taríf, nie tvoj dizajnový web.

### Prečo to tam je

Pridali sme to, lebo predtým Google videl čiernu obrazovku (React sa nestihol načítať). Ale teraz máš **Netlify Prerendering zapnuté** — to znamená, že Netlify **automaticky** vyrenderuje tvoj React web pre Googlebota. Nepotrebuješ edge funkciu.

### Riešenie

**Odstrániť Google z `SEARCH_BOT_PATTERNS`** v edge funkcii. Nechať Netlify Prerendering robiť svoju prácu pre Google. Edge funkcia bude naďalej obsluhovať len:
- Social crawlery (Facebook, Twitter, LinkedIn) — pre OG tagy
- AI boty (GPTBot, Claude) — pre textový obsah

### Technická zmena

**Súbor: `netlify/edge-functions/ai-bot-detector.ts`**

1. Odstrániť z `SEARCH_BOT_PATTERNS` (riadky 38-46) všetky Google patterny:
```typescript
const SEARCH_BOT_PATTERNS = [
  'bingbot',
  'Slurp',
  'DuckDuckBot',
  'YandexBot'
];
```

Googlebot už nebude zachytávaný → dostane skutočný React web prerenderovaný Netlify.

2. V sekcii trailing slash + query param redirect (riadky 394-440) — pridať detekciu Googlebota **samostatne**, aby redirecty stále fungovali aj pre Google:
```typescript
const isGoogleBot = /googlebot|google-inspectiontool/i.test(uaLower);
const isAnyBot = isAIBot || isSocialCrawler || isSearchBot || isGoogleBot;
```

Tým sa zachová trailing slash normalizácia a stripping parametrov pre Google, ale Google **nedostane statický HTML** — dostane skutočný web.

### Výsledok

- Google uvidí tvoj **skutočný React web** (prerenderovaný cez Netlify)
- Trailing slash a parameter redirecty zostanú funkčné
- Social crawlery stále dostanú OG tagy
- AI boty stále dostanú textový obsah

### Súbory na úpravu
- `netlify/edge-functions/ai-bot-detector.ts` — úprava SEARCH_BOT_PATTERNS + pridanie samostatnej Google detekcie pre redirecty


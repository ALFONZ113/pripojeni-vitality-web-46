

## Odstránenie prebliknutia fallback obsahu

### Problém
Statický fallback HTML vnútri `<div id="root">` sa na zlomok sekundy zobrazí používateľom pred tým, než React namontuje aplikáciu. Vizuálne to pôsobí ako "iná stránka" ktorá preblikne.

### Riešenie
Skryť fallback obsah cez CSS `display: none` a zobraziť ho **iba pre crawlery** (ktoré nemajú JavaScript). React ho aj tak okamžite nahradí pri mount-e.

### Implementácia

**Súbor: `index.html`**

1. Zmeniť inline style na `<div id="ssr-fallback">` — pridať `display: none`:
```html
<div id="ssr-fallback" style="display:none; background:#0a0a0a; ...">
```

2. Pridať do `<noscript>` v `<head>` CSS, ktoré fallback zobrazí ak JavaScript nefunguje (= crawlery):
```html
<noscript>
  <style>
    #ssr-fallback { display: block !important; }
  </style>
</noscript>
```

### Výsledok
- **Bežní návštevníci**: Žiadne prebliknutie. Uvidia len skutočný React web.
- **Googlebot**: Ak JavaScript zlyhá, uvidí fallback obsah cez noscript pravidlo. Ak JavaScript funguje (čo je štandardné pre Googlebot), uvidí plný React web.
- **Boty bez JS** (Bing, Yandex cez edge funkciu): Dostanú statický HTML z `/ai-static/` cez edge funkciu — tento fallback sa ich netýka.

### Súbory na úpravu
- `index.html` — 2 malé zmeny (display:none + noscript style)


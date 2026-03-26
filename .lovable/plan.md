

## Analýza odporúčania od Claude + skutočný problém

### Má Claude pravdu?

**Čiastočne áno.** Hlavný problém je reálny:

Google otvorí tvoj web → React sa nestihne načítať (timeout) → fallback je `display:none` → Google vidí **čiernu obrazovku**.

Ale riešenie "daj fallback `display:block`" sme už skúšali a spôsobilo to **prebliknutie** (videl si "inú stránku" pred načítaním). Preto sme to zmenili na `display:none`. Teraz je Google opäť slepý.

### Prečo to tak je — jednoduché vysvetlenie

```text
Čo sa deje teraz:

Používateľ otvorí web:
  1. HTML sa načíta (fallback je SKRYTÝ)
  2. React sa načíta (za 1-2 sekundy)
  3. Vidí krásny web ✅

Googlebot otvorí web:
  1. HTML sa načíta (fallback je SKRYTÝ)
  2. React sa NESTIHNE načítať (timeout)
  3. Vidí ČIERNU OBRAZOVKU ❌
```

### Správne riešenie — malý inline skript

Namiesto `display:none` alebo `display:block` použijeme **chytrý prístup**:

1. Fallback bude **viditeľný** (`display:block`) — Google ho uvidí okamžite
2. Hneď pod ním dáme **3-riadkový JavaScript** (nie React!), ktorý ho **okamžite skryje**

```text
Čo sa stane:

Používateľ (má JavaScript):
  1. HTML sa načíta, fallback je viditeľný
  2. Inline skript ho OKAMŽITE skryje (< 1 ms)
  3. React sa načíta, zobrazí web
  4. Žiadne prebliknutie ✅

Googlebot (JavaScript timeout):
  1. HTML sa načíta, fallback je viditeľný ✅
  2. Google VIDÍ obsah okamžite ✅
  3. Aj keď React zlyhá, obsah tam je
```

### Technická implementácia

**Súbor: `index.html`**

1. Zmeniť `display:none` na `display:block` na `#ssr-fallback`
2. Pridať hneď za `</div>` fallbacku malý inline skript:

```html
<div id="ssr-fallback" style="display:block; ...">
  <!-- existujúci fallback obsah -->
</div>
<script>
  // Okamžite skryje fallback pre používateľov s JS
  // Googlebot s timeout-om tento skript nespustí = uvidí obsah
  document.getElementById('ssr-fallback').style.display='none';
</script>
```

3. Odstrániť `<noscript>` pravidlo pre `#ssr-fallback` (už nie je potrebné — fallback je viditeľný by default)

### Čo s klesajúcim počtom indexovaných stránok (60 → 20)?

Toto je **priamo spôsobené** čiernou obrazovkou. Google postupne deindexuje stránky, ktoré nevie prečítať. Po oprave sa začnú vracať.

### Ďalšie kroky po deploy-i

- V GSC urobiť Live Test na `https://www.popri.cz/` — overiť, že Google vidí H1, tarify, FAQ
- Kliknúť "Vyžiadať indexovanie" na homepage a kľúčových stránkach

### Súbory na úpravu
- `index.html` — 3 malé zmeny (display:block, inline skript, odstránenie noscript pravidla)


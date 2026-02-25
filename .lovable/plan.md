

# Oprava indexovania mestských stránok - Diagnostika a riešenie

## Zistený problém

Zo screenshotov z Google Search Console som identifikoval **2 kritické problémy**, prečo Google nemôže indexovať stránky ako `/internet-karvina` a `/internet-havirov`:

### Problém 1: Hardcoded canonical tag v index.html (KRITICKÝ)

Súbor `index.html` (riadok 47) obsahuje:
```text
<link rel="canonical" href="https://www.popri.cz/" />
```

Pretože je to SPA (Single Page Application), **VŠETKY stránky** sa servírujú z tohto jedného `index.html`. To znamená, že keď Googlebot načíta `/internet-karvina`, prvé čo uvidí v HTML je canonical smerujúci na homepage `/`.

Aj keď React (Helmet) neskôr prepisuje canonical na správnu URL, Google môže spracovať pôvodný canonical z HTML skôr, než sa JavaScript vykoná. Presne toto potvrdzuje GSC hlásenie pre `/internet-havirov`: **"Alternatívna stránka so správnou kanonickou značkou"** - Google si myslí, že mestská stránka je duplikát homepage.

### Problém 2: Edge funkcia blokuje Googlebot rendering

Edge funkcia `ai-bot-detector` beží na KAŽDOM requeste (`path: "/*"`). Pre bežného Googlebota (nie AI bot) volá `context.next()`, čo je v poriadku. Ale problém môže byť v tom, že edge funkcia pridáva latenciu a pri servírovaní SPA môže Googlebot naraziť na timeout alebo chybu presmerovania.

Navyše, stránky mesta existujú iba v `AI_STATIC_PATHS` pre AI boty, ale **pre Googlebota nie je žiadna statická verzia** - musí renderovať celú React aplikáciu.

### Problém 3: Service Worker interferuje s Googlebotom

Súbor `sw-register.js` pri **každom načítaní stránky** odregistruje VŠETKY service workery a znova registruje nový. Toto môže narušiť rendering pipeline Googlebota.

## Plán opravy

### Krok 1: Odstrániť hardcoded canonical z index.html
**Súbor**: `index.html`

Odstrániť riadok 47 (`<link rel="canonical" href="https://www.popri.cz/" />`). Canonical bude nastavovaný dynamicky cez React Helmet na každej stránke.

### Krok 2: Pridať Googlebot do edge funkcie pre statické servírovanie
**Súbor**: `netlify/edge-functions/ai-bot-detector.ts`

Pridať `Googlebot` do detekcie botov (rovnako ako AI boty), aby sa mestským stránkam servíroval statický HTML namiesto SPA. Googlebot tak dostane plnohodnotný HTML s korektným canonical tagom bez nutnosti renderovať JavaScript.

Pridať do `AI_BOT_PATTERNS` alebo vytvoriť novú skupinu `SEARCH_BOT_PATTERNS`:
- `Googlebot` (ale NIE pre hlavné stránky ako `/`, `/blog` - tam nechať SPA)
- Aplikovať iba na mestské stránky (`/internet-*`), kde statické HTML verzie už existujú

### Krok 3: Aktualizovať statické HTML stránky miest
**Súbory**: `public/ai-static/internet-karvina.html`, `internet-havirov.html`, atd.

Overiť, že všetky statické HTML stránky miest majú:
- Správny `<link rel="canonical">` tag
- Aktuálne meta tagy `robots: index, follow`
- Presný obsah zodpovedajúci React verzii

### Krok 4: Deaktivovať Service Worker pre boty
**Súbor**: `public/sw-register.js`

Pridať kontrolu User-Agenta pred registráciou SW, aby sa pre Googlebota SW vôbec neregistroval:
```text
if (navigator.userAgent && /googlebot|bingbot/i.test(navigator.userAgent)) return;
```

### Krok 5: Pridať Googlebot do edge funkcie pre mestské stránky
**Súbor**: `netlify/edge-functions/ai-bot-detector.ts`

Upraviť logiku tak, aby pre Googlebota na cestách `/internet-*` servírovala statický HTML zo zložky `/ai-static/`. Tým Googlebot dostane:
- Korektný canonical tag
- Plný HTML obsah bez nutnosti JS renderingu
- Správne meta tagy pre indexovanie

## Očakávaný výsledok

Po nasadení týchto zmien:
1. Googlebot uvidí správny canonical tag na každej mestskej stránke
2. GSC prestane hlásiť "Alternatívna stránka so správnou kanonickou značkou"
3. GSC prestane hlásiť "Chyba presmerovania"
4. Mestské stránky sa začnú indexovať (zvyčajne do 1-2 týždňov)

Po nasadení bude potrebné v GSC znova požiadať o indexovanie každej mestskej URL.


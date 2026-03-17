

## Analýza GSC problémov zo screenshotov

Z tvojich screenshotov vidím tri nové kategórie problémov:

### 1. "Duplikovať bez kanonickej adresy" -- 17 URL

URL adresy z GSC:
- `/cookies`, `/blog`, `/kontakt` -- bez trailing slash (OK verzie)
- `/iptv/`, `/tarify/`, `/cookies/`, `/internet-tv/`, `/blog/` -- s trailing slash (duplicity)
- `/blog/?tag=Bohumín`, `/blog/?tag=Mesh`, `/blog?tag=Kybernetická bezpečnost`, `/blog?category=Novinky` -- parametrové URL
- `/blog/6`, `/blog/3` -- ID-based URL
- `/blog/11?source=blog&post_id=11&category=Novinky`, `/blog/o2-nej-prevzatie-poda-alternativa-zakaznici?source=blog&post_id=102&category=Technologie` -- slug + parametre

**Prícina:** Google vidí dve verzie tej istej stránky (napr. `/iptv` aj `/iptv/`) a ani jedna nemá explicitný `rel=canonical` tag, ktorý by ukazoval na tú druhú. Trailing slash redirecty v `_redirects` existujú, ale Google ich zachytil predtým, než boli implementované, alebo redirect neprebehol spolahlivo. Pre parametrové URL -- Google ich objavil z interných odkazov a nemajú canonical tag ukazujúci na čistú verziu.

### 2. "Chyba presmerovania" -- 8 URL

- `/blog/?tag=Služby`, `/blog/?tag=Moravskoslezský región`, `/blog/?tag=Test rychlosti` -- parametrové s trailing slash
- `/internet-havirov/`, `/internet-ostrava/`, `/internet-poruba/` -- trailing slash city URL
- `/blog/` -- trailing slash
- `/internet-karvina` -- bez trailing slash

**Prícina:** Edge funkcia `ai-bot-detector.ts` spracováva request PRED `_redirects`. Pre search boty kontroluje `CITY_STATIC_PATHS` a `AI_STATIC_PATHS`, ale tieto polia obsahujú len verzie BEZ trailing slash. Keď Googlebot pristúpi na `/internet-ostrava/`, edge funkcia nenájde match, zavolá `context.next()`, a Netlify spraví 301 redirect. Ale potom pri novom requeste edge funkcia znovu interceptuje. Problém je pravdepodobne v tom, ze edge funkcia pri `context.next()` pre trailing slash URL vracia malformed response alebo redirect chain, ktorý Google nedokáže spracovať.

### 3. "Chyba servera (5xx)" -- 5 URL

- `/blog?tag=Router`, `/blog/?tag=Poruba` -- parametrové URL
- `/internet-ostrava` -- hlavná city stránka
- `/blog/poda-super-2025-60ghz-internet-polanka` -- starý slug
- `/blog/1` -- ID redirect

**Prícina:** Edge funkcia nemá `try/catch` okolo `fetch()` volania pre search boty (riadky 470-488). Ak fetch statického súboru zlyhá (timeout, network error), edge funkcia crashne a vráti 5xx. Pre social crawlery try/catch existuje, ale pre search boty NIE.

---

## Plan implementácie

### 1. Oprava edge funkcie -- trailing slash normalizácia a try/catch

Na začiatku handler funkcie (riadok 382+) pridať normalizáciu trailing slash. Ak URL končí na `/` (okrem root `/`), odstrániť trailing slash a spraviť 301 redirect priamo z edge funkcie. Toto zabezpečí, že search boty nikdy nedostanú duplicitný obsah.

Pridať `try/catch` okolo search bot `fetch()` volania (riadky 470-488), rovnako ako to má social crawler handler.

### 2. Oprava edge funkcie -- parametrové URL

Pre search boty, ak URL obsahuje query parametre (`?tag=`, `?category=`, `?source=`, `?search=`), odstrániť parametre a spraviť 301 redirect na čistú URL. Toto zabráni duplikátnemu obsahu aj redirect chybám.

### 3. Synchronizácia `_redirects`

Trailing slash redirecty v `_redirects` zmeniť na `301!` (force), aby mali prednosť pred SPA catch-all. Aktuálne sú bez `!`.

### 4. Verifikácia v GSC

Po deploy-i kliknúť "Overiť opravu" na všetkých troch issue kategóriách.

---

### Súbory na úpravu:
- `netlify/edge-functions/ai-bot-detector.ts` -- hlavná oprava (trailing slash + params + try/catch)
- `public/_redirects` -- force flag na trailing slash redirecty


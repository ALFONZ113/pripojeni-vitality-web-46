

# Oprava indexácie 48 neindexovaných stránok na popri.cz

## Analýza všetkých 48 URL

Rozdelil som URL do 5 kategórií podľa typu problému:

---

### KATEGÓRIA A: Staré slugy - články EXISTUJÚ, ale pod iným slug (301 redirect potrebný)

Tieto URL vedú na reálne články, ale slug sa zmenil. Treba pridať 301 redirecty v `_redirects`:

| Neindexovaná URL | Aktuálny slug v kóde | Akcia |
|---|---|---|
| `/blog/rychly-internet-v-karvine-revoluce-v-pripojeni-domacnosti-diky-poda` | `rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda` | 301 redirect |
| `/blog/gaming-internet-ostrava-2025` | `internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda` | 301 redirect (uz je v `_redirects`, ale aj `gaming-ostrava-example.ts` ma slug `gaming-internet-ostrava-2025`) |
| `/blog/recenze-zakazniku-poda-skutecne-zkusenosti-s-nasimi-sluzbami` | `recenze-zakazniku-poda-skutecne-zkusenosti-sluzby` | 301 redirect |
| `/blog/novinky-v-poda-sluzbach-nove-moznosti-pro-zakazniky` | `novinky-poda-sluzby-nove-moznosti-zakaznici` | 301 redirect |
| `/blog/nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky` | `nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky` | Slug sa zhoduje - problem je canonical tag |
| `/blog/nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025` | `nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025` | Slug sa zhoduje - problem je canonical tag |
| `/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025` | `internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025` | 301 redirect (dlhší slug na kratší) |
| `/blog/mesh-systemy-vs-klasicke-routery-co-je-lepsi-pro-vas-domov` | `mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov` | 301 redirect |
| `/blog/rozsireni-pokryti-poda-nove-oblasti-opticky-internet` | `rozsireni-pokryti-poda-nove-oblasti-opticky-internet` | Slug sa zhoduje - canonical problem |
| `/blog/gaming-ostrava-esport-scena` | Neexistuje - redirect na gaming-ostrava slug | 301 redirect |
| `/blog/gaming-internet-ostrava-nejlepsi-pripojeni-pro-hrace` | Neexistuje - redirect na gaming-ostrava slug | 301 redirect |
| `/blog/prevzati-nej-cz-spolecnosti-o2-co-to-znamena-pro-zakazni` | `o2-nej-prevzatie-poda-alternativa-zakaznici` | 301 redirect |
| `/blog/poruchy-internetu-jak-vyresit-pomaly-internet-rychly-navod` | `pomaly-internet-8-sposobu-jak-vyresit-msk-2025` | 301 redirect |
| `/blog/komplexny-pruvodce-modernim-internetovym-pripojenim-2025` | `nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025` | 301 redirect |
| `/blog/opticky-internet-ostrava` | `internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025` | 301 redirect |
| `/blog/jednoduchy-prechod-k-poda-od-stavajuceho-poskytovatela-v-moravskoslezskem-regione` | Neexistuje - redirect na `/blog` | 301 redirect |
| `/blog/rychly-internet-karvina` | `rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda` | 301 redirect |
| `/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025-500` | `internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025` | 301 redirect |
| `/blog/wifi-optimalizace` | `jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025` | 301 redirect |
| `/blog/domaci-sit-nastaveni` | Neexistuje - redirect na `/blog` | 301 redirect |
| `/blog/opticky-internet-vyhody` | Neexistuje - redirect na `/blog` | 301 redirect |
| `/blog/gpon-technologia-v-moravskoslezskom-regione-revolucia-optickeho-internetu-1` | `gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu` | 301 redirect |
| `/blog/prechod-od-o2-k-poda-po-akvizicii-nejcz-a-netboxu-prilezitost-pre-lepsie-sluzby-v-moravskoslezskom-regione-101` | `o2-nej-prevzatie-poda-alternativa-zakaznici` | 301 redirect |
| `/blog/jednoduchy-prechod-k-poda-od-stavajuceho-poskytovatela-v-moravskoslezskom-regione-3` | Neexistuje - redirect na `/blog` | 301 redirect |
| `/blog/bleskovy-internet-bez-dratu-poznejte-60-ghz-technologii-a-nabidku-poda-102` | `polanka-nad-odrou-60ghz-pripojeni-2025` | 301 redirect |

### KATEGÓRIA B: ID-čkové URL - už majú 301 redirecty, ale stále sú v indexe

| URL | Status |
|---|---|
| `/blog/4` | Redirect existuje v `_redirects` -> OK, len čaká na re-crawl |
| `/blog/12` | Redirect existuje -> OK |
| `/blog/999` | Redirect existuje -> OK |
| `/blog/100` | Redirect existuje -> OK |
| `/blog/13` | Redirect existuje -> OK |
| `/blog/2` | Redirect existuje -> OK |
| `/blog/7` | Redirect existuje -> OK |

**Akcia:** Vyžiadať re-indexáciu v GSC. Redirecty fungujú správne.

### KATEGÓRIA C: Tag/filter URL - NOINDEX (nemajú byť indexované)

| URL | Akcia |
|---|---|
| `/blog/?tag=Rychlý internet` | noindex - `NoIndexMeta` to rieši pre `tag=` |
| `/blog?tag=Poruba` | noindex |
| `/blog?tag=Pokrytí` | noindex |
| `/blog?tag=Online sledování` | noindex |
| `/blog/?tag=Online sledování` | noindex |
| `/blog?tag=Přechod poskytovatele` | noindex |
| `/blog?tag=Karviná` | noindex |
| `/blog?tag=Televizní přenos` | noindex |
| `/blog/?tag=Nej.cz` | noindex |
| `/blog?tag=Rychlý internet` | noindex |
| `/blog?tag=Optické pripojenie` | noindex |

**Status:** `NoIndexMeta` komponent uz pridáva `noindex` pre `tag=` parametre. Ale problem je redirect loop (`ERR_TOO_MANY_REDIRECTS`) kvoli `_redirects` pravidlu `/blog/ /blog 301` - trailing slash redirect + SPA fallback sa bijú.

### KATEGÓRIA D: Parametrizované URL - NOINDEX + redirect na čistú URL

| URL | Akcia |
|---|---|
| `/blog/7?source=blog&post_id=7&category=Tipy` | Redirect na `/blog/nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky` |
| `/blog/13?source=blog&post_id=13&category=Recenzie` | Redirect na slug |
| `/blog/11?source=blog&post_id=11&category=Služby` | Redirect na slug |
| `/blog/500?source=blog&post_id=500&category=Služby` | Redirect na slug |
| `/blog?search={search_term_string}` | noindex (schema.org SearchAction placeholder) |

### KATEGÓRIA E: Duplicitný slug `gaming-internet-ostrava-2025`

Súbor `gaming-ostrava-example.ts` definuje post s ID 205 a slug `gaming-internet-ostrava-2025`, ale `gaming-ostrava.ts` definuje post s ID 31 a slug `internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda`. Obe sú exportované. Treba odstrániť duplicitu.

---

## Technický plán implementácie

### 1. Pridať 301 redirecty pre staré slugy do `public/_redirects`

Pridať ~20 nových redirect pravidiel pre staré slugy z kategórie A:

```text
/blog/rychly-internet-v-karvine-revoluce-v-pripojeni-domacnosti-diky-poda /blog/rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda 301!
/blog/recenze-zakazniku-poda-skutecne-zkusenosti-s-nasimi-sluzbami /blog/recenze-zakazniku-poda-skutecne-zkusenosti-sluzby 301!
/blog/novinky-v-poda-sluzbach-nove-moznosti-pro-zakazniky /blog/novinky-poda-sluzby-nove-moznosti-zakaznici 301!
/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025 /blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025 301!
/blog/mesh-systemy-vs-klasicke-routery-co-je-lepsi-pro-vas-domov /blog/mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov 301!
/blog/gaming-ostrava-esport-scena /blog/internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda 301!
/blog/gaming-internet-ostrava-nejlepsi-pripojeni-pro-hrace /blog/internetove-pripojeni-online-hraci-ostrava-rychlosti-ping-spolehlivost-poda 301!
/blog/prevzati-nej-cz-spolecnosti-o2-co-to-znamena-pro-zakazni /blog/o2-nej-prevzatie-poda-alternativa-zakaznici 301!
/blog/poruchy-internetu-jak-vyresit-pomaly-internet-rychly-navod /blog/pomaly-internet-8-sposobu-jak-vyresit-msk-2025 301!
/blog/komplexny-pruvodce-modernim-internetovym-pripojenim-2025 /blog/nejlepsi-internet-ostrava-karvina-havirov-pruvodce-2025 301!
/blog/opticky-internet-ostrava /blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025 301!
/blog/rychly-internet-karvina /blog/rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda 301!
/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025-500 /blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025 301!
/blog/wifi-optimalizace /blog/jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025 301!
/blog/domaci-sit-nastaveni /blog 301!
/blog/opticky-internet-vyhody /blog 301!
/blog/gpon-technologia-v-moravskoslezskom-regione-revolucia-optickeho-internetu-1 /blog/gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu 301!
/blog/prechod-od-o2-k-poda-po-akvizicii-nejcz-a-netboxu-prilezitost-pre-lepsie-sluzby-v-moravskoslezskom-regione-101 /blog/o2-nej-prevzatie-poda-alternativa-zakaznici 301!
/blog/jednoduchy-prechod-k-poda-od-stavajuceho-poskytovatela-v-moravskoslezskem-regione /blog 301!
/blog/jednoduchy-prechod-k-poda-od-stavajuceho-poskytovatela-v-moravskoslezskom-regione-3 /blog 301!
/blog/bleskovy-internet-bez-dratu-poznejte-60-ghz-technologii-a-nabidku-poda-102 /blog/polanka-nad-odrou-60ghz-pripojeni-2025 301!
```

### 2. Opraviť redirect loop pre tag stránky

Problem: `_redirects` obsahuje `/blog/ /blog 301` co koliduje so SPA fallback `/blog/* /index.html 200`.

Riešenie: Odstrániť `/blog/ /blog 301` riadok z `_redirects` - trailing slash normalizácia pre `/blog/` nie je potrebná a spôsobuje loop.

### 3. Opraviť `NoIndexMeta` komponent - pridať robustnejšie noindex pravidlá

Aktualizovať `NoIndexMeta.tsx` aby pokrýval aj `/blog/` s trailing slash a `?source=` parametre:

```typescript
const shouldNoIndex = 
  location.search.includes('tag=') ||
  location.search.includes('category=') ||
  location.search.includes('search=') ||
  location.search.includes('source=') ||
  location.search.includes('post_id=') ||
  location.search.includes('?utm_') ||
  location.search.includes('&utm_');
```

### 4. Pridať staré slugy do klientského redirect systému

Aktualizovať `blogRedirectMap` v `src/utils/blogRedirectSystem.ts` o nové staré slug -> nový slug mapovania, aby klientský routing tiež fungoval.

### 5. Odstrániť duplicitný gaming-ostrava-example.ts

Súbor `gaming-ostrava-example.ts` s ID 205 a slug `gaming-internet-ostrava-2025` je duplicitný. Redirect z ID 205 uz existuje. Treba overiť, či sa tento súbor importuje a prípadne ho odstrániť.

### 6. Opraviť SearchAction v schema.org

V `PageMetadata.tsx` je SearchAction s `target: "https://www.popri.cz/search?q={search_term_string}"` - stránka `/search` neexistuje. Google to crawluje ako `/blog?search={search_term_string}`. Treba odstrániť SearchAction alebo ho opraviť.

---

## Zoznam súborov na úpravu

| Súbor | Akcia |
|---|---|
| `public/_redirects` | Pridať ~20 nových 301 redirectov pre staré slugy, odstrániť `/blog/ /blog 301` |
| `src/utils/blogRedirectSystem.ts` | Pridať staré slug mapovania do `blogRedirectMap` |
| `src/components/seo/NoIndexMeta.tsx` | Pridať `source=` a `post_id=` do noindex podmienok |
| `src/components/page/PageMetadata.tsx` | Odstrániť SearchAction schema (spôsobuje crawl zbytočnej URL) |
| `public/.htaccess` | Synchronizovať redirecty s `_redirects` |

## Očakávaný výsledok

Po implementácii a publikovaní:
- 24 starých slug URL bude mať 301 redirect na správny článok
- 7 ID-čkových URL uz ma redirecty - stačí vyžiadať re-indexáciu v GSC
- 11 tag/filter URL bude mať noindex a nebude redirect loop
- 5 parametrizovaných URL bude mať noindex
- Google postupne vyčistí index a indexuje len aktuálne slug URL
- Treba počkať 2-4 týždne na re-crawl po publikovaní


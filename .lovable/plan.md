

# Oprava chýb presmerovania a duplicít v Google Search Console

## Zistené problémy

GSC hlási 2 problémy:
1. **"Chyba presmerovania"** — 301 redirecty vedú na neexistujúce slugy
2. **"Duplikovať bez kánonickej adresy"** — duplicitné ID a nesprávne mapovania

## Koreňová príčina

V `_redirects` a `blogRedirectSystem.ts` sú **4 redirecty na nesprávne slugy**, ktoré neexistujú. Google nasleduje 301 redirect, dorazí na neexistujúcu URL a dostane prázdnu SPA stránku (200) — to spôsobuje chybu presmerovania.

### Nesúlad medzi redirectmi a skutočnými slugmi:

| Redirect | Cieľ v `_redirects` (ZLÝÝ) | Skutočný slug v dátach (SPRÁVNY) |
|---|---|---|
| `/blog/601` | `poda-internet-2026-budoucnost-pripojeni` | `poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy` |
| `/blog/801` | `myty-opticky-internet-pravda-vs-fikce` | `nejcastejsi-myty-o-optickem-internetu` |
| `/blog/901` | `proc-internet-zpomaluje-vecer-reseni` | `proc-internet-doma-pomaluje-vecer-a-jak-to-vyresit` |
| `/blog/1001` | `jak-ai-meni-svet-internetu-budoucnost-pripojeni` | `jak-ai-meni-svet-proc-kvalitni-internet-zaklad` |

### Duplicitné ID:
- `id: 30` je použité dvakrát: `myty-opticky-internet` aj `slow-internet-fix`. Redirect `/blog/30` ide na `slow-internet-fix` — správne, ale `myty` článok nemá svoj ID redirect.

### Kolízia ID 401 vs 601:
- `internet-vyber-chyby.ts` má `id: 601` ale redirect `/blog/401` smeruje na jeho slug
- `poda-internet-2026.ts` má `id: 401` ale redirect `/blog/601` smeruje na jeho (nesprávny) slug

Edge funkcia (`ai-bot-detector.ts`) má **správne** slugy — problém je len v `_redirects` a `blogRedirectSystem.ts`.

### Stará doména `pripojeni-poda.cz`:
- Nemá priamy vplyv na tieto GSC chyby (doména je zrušená)
- Ale `emailService.ts` stále obsahuje text "Nový kontakt z pripojeni-poda.cz" — kozmetická chyba

## Plán opráv

### 1. Opraviť 4 zlé redirect slugy v `public/_redirects`
Zmeniť riadky 99, 105, 108, 114 na správne slugy.

### 2. Opraviť 4 zlé redirect slugy v `src/utils/blogRedirectSystem.ts`
Zmeniť riadky 87, 93, 96, 102 na správne slugy.

### 3. Opraviť kolíziu ID 401/601 v `_redirects` a `blogRedirectSystem.ts`
- `/blog/401` → `poda-internet-2026-opticka-era-2-gigabity-domacnosti-rodinne-domy` (skutočný id: 401)
- `/blog/601` → `ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi` (skutočný id: 601)

### 4. Pridať staré zlé slugy ako redirecty
Pridať 301 redirecty pre staré nesprávne cieľové slugy (napr. `poda-internet-2026-budoucnost-pripojeni` → správny slug), aby Google neuvidel 404/soft-404 pre URL, ktoré už crawloval.

### 5. Opraviť text v `emailService.ts`
Zmeniť "pripojeni-poda.cz" na "popri.cz".

## Dotknuté súbory
- `public/_redirects`
- `src/utils/blogRedirectSystem.ts`
- `src/utils/emailService.ts`


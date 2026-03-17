

# Oprava duplicitných FAQPage schém na hlavnej stránke

## Problém

Google Search Console hlási **"Duplicitné pole FAQPage"** — na hlavnej stránke `popri.cz` sú **2 samostatné FAQPage schémy**, čo Google považuje za chybu:

1. **AIOptimizedSchema.tsx** — JSON-LD FAQPage s 18 otázkami (ID `/#faq`) — toto je správna, kompletná verzia
2. **AIContentSummary.tsx** — HTML microdata FAQPage s 2 otázkami ("Co nabízíme?", "Kde poskytujeme služby?") — toto je duplicit, ktorý spôsobuje chybu

Google nedokáže rozlíšiť, ktorá FAQPage je "tá správna", a obe označí ako neplatné.

## Riešenie

**Odstrániť microdata FAQPage z `AIContentSummary.tsx`** (riadky 81-102). Ponechať len JSON-LD verziu v `AIOptimizedSchema.tsx`, ktorá je kompletná a správne štruktúrovaná.

Tie 2 otázky z AIContentSummary ("Co nabízíme?" a "Kde poskytujeme služby?") sú aj tak príliš generické a nemajú SEO hodnotu. Kompletná FAQ s 18 otázkami v AIOptimizedSchema pokrýva všetko.

## Dotknutý súbor

| Súbor | Zmena |
|---|---|
| `src/components/seo/AIContentSummary.tsx` | Odstránenie `<div itemScope itemType="https://schema.org/FAQPage">` bloku (riadky 81-102) |

## Výsledok

Po nasadení a re-indexácii v GSC zmizne chyba "Zistili sa 2 neplatné položky" a FAQ schéma bude validná.


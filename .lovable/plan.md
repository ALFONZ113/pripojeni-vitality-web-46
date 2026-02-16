
# Oprava obrázkov pre Facebook zdieľanie - skutočné obrázky článkov

## Problém

V edge funkcii `BLOG_POSTS_OG_DATA` a statických HTML súboroch (`public/ai-static/blog/*.html`) je pre vacsinu clankov nastaveny genericky obrazok `/og-image.png` (logo popri.cz) namiesto skutocneho obrazku clanku.

Facebook crawler dostane `/og-image.png` a preto zobrazuje logo webu namiesto obrazku clanku.

## Riesenie

Aktualizovat `image` hodnotu v `BLOG_POSTS_OG_DATA` v edge funkcii a v statickyych HTML suboroch na skutocne obrazky z blog data suborov.

## Mapovanie slug -> skutocny obrazok

| Slug | Aktualna (chybna) hodnota | Spravna hodnota (z blog dat) |
|---|---|---|
| `internetove-pripojeni-online-hraci-ostrava...` | `/og-image.png` | `/lovable-uploads/e99cde57-f2e6-45ff-b0cb-db715960e72c.png` |
| `polanka-nad-odrou-60ghz-pripojeni-2025` | `/polanka-60ghz-antenna.jpg` | `/lovable-uploads/0c952940-aa5d-4157-b3a8-82b62d2a048c.png` |
| `nejcastejsi-otazky-pripojeni-internet-panelak` | `/og-image.png` | `/lovable-uploads/fdaf29a8-01a5-4fd4-82b1-457e07f40576.png` |
| `iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod` | `/og-image.png` | `/lovable-uploads/slow-internet-fix-guide.jpg` |
| `rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda` | `/og-image.png` | `/lovable-uploads/4fc5ce47-bd2b-4c44-8e84-4bf330cbf57c.png` |
| `internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025` | `/og-image.png` | `/lovable-uploads/d043e07c-8916-4d2d-b35d-8f0ba81b4ebc.png` |
| `gpon-technologie-moravskoslezsky-region-revoluce-optickeho-internetu` | `/og-image.png` | `/gpon-technologie-opticky-internet.webp` |
| `jak-vybrat-spravny-router-domov-kompletni-pruvodce-2025` | `/og-image.png` | `/lovable-uploads/77099393-c42f-4da8-8d98-a7a65e08a093.png` |
| `mesh-systemy-vs-klasicke-routery-co-je-lepsi-domov` | `/og-image.png` | `/lovable-uploads/aa92ab29-4de6-409a-8e8b-89b0fe7555b0.png` |
| `zabezpeceni-domaci-wifi-site-kompletni-pruvodce-bezpecnosti` | `/og-image.png` | `/lovable-uploads/64d06bad-71f3-4777-b62e-b49b4ca94abe.png` |
| `jak-vybrat-nejlepsi-tv-balicek-vasi-rodinu` | `/og-image.png` | `/lovable-uploads/5daa6fb6-9d90-41e9-bb84-0e836eb8965f.png` |
| `nejlepsi-zpusob-sledovani-sportu-online-pruvodce-fanoušky` | `/og-image.png` | `/lovable-uploads/235022db-f6c5-4a2f-8970-681e7c476589.png` |
| `jak-otestovat-rychlost-internetu-prakticke-tipy-nejlepsi-nastroje` | `/og-image.png` | `/lovable-uploads/35179673-7e72-4282-8609-a46686328aa0.png` |
| `novinky-poda-sluzby-nove-moznosti-zakaznici` | `/og-image.png` | `/lovable-uploads/56ebeef3-04d0-42a6-ac4f-f47224a075fb.png` |
| `rozsireni-pokryti-poda-nove-oblasti-opticky-internet` | `/og-image.png` | `/lovable-uploads/6f778a97-79bd-4698-b3f2-2a373893184b.png` |
| `recenze-zakazniku-poda-skutecne-zkusenosti-sluzby` | `/og-image.png` | `/lovable-uploads/8a151fa2-b198-402b-9ead-89329b8b9ab2.png` |

## Subory na upravu

| Subor | Akcia |
|---|---|
| `netlify/edge-functions/ai-bot-detector.ts` | Aktualizovat `image` hodnoty v `BLOG_POSTS_OG_DATA` pre 16 clankov |
| `public/ai-static/blog/*.html` (16 suborov) | Aktualizovat `og:image` a `twitter:image` meta tagy na spravne obrazky |

## Ocakavany vysledok

Po publikovani a vycisteni Facebook cache cez [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) sa pri zdielani clanku na Facebooku zobrazi skutocny obrazok clanku namiesto generickeho loga popri.cz.

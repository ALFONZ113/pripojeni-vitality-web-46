

# Univerzálny systém OG tagov pre VŠETKY blogové články (aj budúce)

## Problém

Aktuálny systém vyžaduje manuálne pridávanie každého článku do 3 miest v edge funkcii:
1. `AI_STATIC_BLOG_SLUGS` - zoznam slugov
2. `BLOG_POSTS_OG_DATA` - hardcodované OG dáta
3. Statický HTML súbor v `public/ai-static/blog/`

Keď pridáš nový článok, musíš manuálne aktualizovať edge funkciu - inak Facebook zobrazí generický náhľad.

## Riešenie

Prepísať logiku edge funkcie tak, aby automaticky fungovala pre **akýkoľvek** blog slug - existujúci aj budúci:

### Nová logika (3 kroky):

```text
1. Crawler príde na /blog/SLUG
2. Ak je SLUG v redirect mape -> preložiť na nový slug
3. Skúsiť načítať /ai-static/blog/SLUG.html (statický súbor)
4. Ak neexistuje -> vygenerovať OG HTML dynamicky zo slugu
   (vytvoriť čitateľný title zo slugu: "rychly-internet-karvina" -> "Rychly internet karvina")
5. Vždy vrátiť platný HTML s OG tagmi - nikdy generický fallback
```

### Kľúčová zmena: Automatický title zo slugu

Namiesto generického "Blog | Popri.cz" funkcia vytvorí rozumný title priamo zo slug URL:
- `rychly-internet-karvina` -> `Rychlý internet Karviná | Blog Popri.cz`
- `jak-zlepsit-wifi-signal` -> `Jak zlepšit WiFi signál | Blog Popri.cz`

Tým pádom aj úplne nový článok bez statického HTML súboru bude mať zmysluplný OG náhľad.

## Technické zmeny

### 1. `netlify/edge-functions/ai-bot-detector.ts`

**Odstrániť:**
- `AI_STATIC_BLOG_SLUGS` pole (už nebude potrebné)

**Pridať:**
- `BLOG_SLUG_REDIRECTS` mapa (všetky staré slugy -> nové slugy)
- Funkcia `slugToTitle(slug)` - konvertuje slug na čitateľný český title
- Nová logika: redirect resolution -> static file -> dynamic fallback (so slug-based title)

**Zmeniť:**
- Social crawler handler: pridať redirect resolution pred hľadaním static file
- AI bot handler: rovnako pridať redirect resolution, odstrániť `AI_STATIC_BLOG_SLUGS.includes()` check
- `BLOG_POSTS_OG_DATA` zostane ako "known articles" lookup, ale fallback bude slug-based title namiesto generického

### 2. `scripts/generate-ai-pages.js`

**Pridať:**
- Generovanie statických HTML pre VŠETKY články z `blogPosts` poľa (nie len top 5)
- Build script automaticky vytvorí `/ai-static/blog/SLUG.html` pre každý článok

Toto zabezpečí, že pri builde sa vygenerujú statické súbory pre všetky existujúce články.

## Zoznam súborov na úpravu

| Súbor | Akcia |
|---|---|
| `netlify/edge-functions/ai-bot-detector.ts` | Pridať redirect mapu, slug-to-title funkciu, odstrániť AI_STATIC_BLOG_SLUGS check |
| `scripts/generate-ai-pages.js` | Rozšíriť o generovanie static HTML pre VŠETKY blog články |

## Výsledok

- **Existujúce články**: statický HTML + OG data z `BLOG_POSTS_OG_DATA` (najlepšia kvalita)
- **Staré slug URL**: automaticky preložené na nový slug -> správne OG dáta
- **Nové budúce články**: aj bez statického súboru dostanú zmysluplný OG title zo slugu
- **Žiadna manuálna údržba**: netreba pridávať nové články do edge funkcie


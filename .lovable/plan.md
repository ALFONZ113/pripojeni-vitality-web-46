

# Oprava zdieľania blogov na sociálne siete - statické HTML s OG tagmi

## Prečo to nefunguje

Keď Facebook crawler navštívi `https://www.popri.cz/blog/slug`:
1. Edge funkcia by mala zachytiť crawler a vrátiť HTML s OG tagmi
2. ALE dynamické generovanie v edge funkcii nefunguje spoľahlivo
3. Facebook tak dostane `index.html` (SPA) = OG tagy domovskej stránky (logo popri.cz, "PODA Internet Ostrava")
4. Preto sa zdieľa "web" a nie konkrétny článok

## Riešenie: Statické HTML súbory s OG tagmi pre KAŽDÝ článok

Najspoľahlivejšie riešenie je vytvoriť pre každý blogový článok statický HTML súbor, ktorý:
- Obsahuje kompletné OG tagy (og:title, og:description, og:image s absolútnou URL)
- Obsahuje Twitter Card tagy
- Obsahuje aj základný čitateľný obsah článku
- Edge funkcia ho iba podá crawleru - žiadne dynamické generovanie

## Technické zmeny

### 1. Vytvoriť statické HTML súbory pre VŠETKY články

Vytvorím súbory v `public/ai-static/blog/` pre KAŽDÝ článok, ktorý ešte nemá statickú verziu s OG tagmi. Existujúce súbory aktualizujem o OG tagy.

Každý súbor bude obsahovať:

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Názov článku | Blog Popri.cz</title>
  <meta name="description" content="...">
  <link rel="canonical" href="https://www.popri.cz/blog/slug">
  
  <!-- OG tagy pre Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://www.popri.cz/blog/slug">
  <meta property="og:title" content="Názov článku">
  <meta property="og:description" content="Popis">
  <meta property="og:image" content="https://www.popri.cz/blog-images/obrazok.webp">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Popri.cz">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Názov článku">
  <meta name="twitter:image" content="https://www.popri.cz/blog-images/obrazok.webp">
</head>
<body>
  <article>
    <h1>Názov článku</h1>
    <p>Popis článku...</p>
    <img src="https://www.popri.cz/blog-images/obrazok.webp" alt="..." width="1200" height="630">
    <a href="https://www.popri.cz/blog/slug">Přečíst celý článek</a>
  </article>
</body>
</html>
```

Články na vytvorenie/aktualizáciu:
- `operatori-meni-ceny-internetu-fakta-prava-zakazniku.html` (NOVÝ)
- `proc-internet-zpomaluje-vecer-reseni.html` (NOVÝ)
- `myty-opticky-internet-pravda-vs-fikce.html` (NOVÝ)
- `poda-internet-2026-budoucnost-pripojeni.html` (NOVÝ)
- `home-office-2025-jak-nastavit-domaci-kancelar-produktivita.html` (NOVÝ)
- `jak-ai-meni-svet-internetu-budoucnost-pripojeni.html` (NOVÝ)
- Existujúce 5 súborov - pridať OG tagy do hlavičky

### 2. Prepísať edge funkciu - servovať statické súbory namiesto dynamického generovania

V `netlify/edge-functions/ai-bot-detector.ts`:

- Pre sociálne crawlery: namiesto dynamického `generateOGMetaHTML()` fetchnúť statický HTML súbor z `/ai-static/blog/[slug].html`
- Pridať VŠETKY slugy do `AI_STATIC_BLOG_SLUGS`
- Ak statický súbor neexistuje, použiť dynamický fallback
- Pridať try/catch aby edge funkcia pri chybe nespadla a nevrátila index.html

```typescript
if (isSocialCrawler) {
  const blogMatch = url.pathname.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      // Najprv skúsiť statický súbor
      const staticUrl = new URL(`/ai-static/blog/${slug}.html`, url.origin);
      const staticResponse = await fetch(staticUrl.toString());
      if (staticResponse.ok) {
        return new Response(staticResponse.body, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Served-For': 'Social-Crawler-Static',
          }
        });
      }
      // Fallback na dynamické generovanie
      return new Response(generateOGMetaHTML(slug, baseUrl), { ... });
    } catch (e) {
      // Nikdy nespadnúť - vždy vrátiť aspoň dynamický OG HTML
      return new Response(generateOGMetaHTML(slug, baseUrl), { ... });
    }
  }
}
```

### 3. Aktualizácia existujúcich 5 statických súborov

Pridať OG meta tagy do existujúcich súborov:
- `gpon-technologie-jak-funguje-moderni-opticky-internet.html`
- `jak-zlepsit-wifi-signal-doma-10-overenych-triku-2025.html`
- `o2-nej-prevzatie-poda-alternativa-zakaznici.html`
- `pomaly-internet-8-sposobu-jak-vyresit-msk-2025.html`
- `ako-si-vybrat-internet-do-bytu-5-chyb-ktore-robi-80-percent-ludi.html`

## Zoznam súborov na úpravu

| Súbor | Akcia |
|-------|-------|
| `public/ai-static/blog/operatori-meni-ceny-internetu-fakta-prava-zakazniku.html` | Vytvoriť nový |
| `public/ai-static/blog/proc-internet-zpomaluje-vecer-reseni.html` | Vytvoriť nový |
| `public/ai-static/blog/myty-opticky-internet-pravda-vs-fikce.html` | Vytvoriť nový |
| `public/ai-static/blog/poda-internet-2026-budoucnost-pripojeni.html` | Vytvoriť nový |
| `public/ai-static/blog/home-office-2025-jak-nastavit-domaci-kancelar-produktivita.html` | Vytvoriť nový |
| `public/ai-static/blog/jak-ai-meni-svet-internetu-budoucnost-pripojeni.html` | Vytvoriť nový |
| 5 existujúcich HTML súborov | Pridať OG tagy |
| `netlify/edge-functions/ai-bot-detector.ts` | Prepísať logiku social crawlerov |

## Očakávaný výsledok

Po publikovaní na Netlify:
- Facebook crawler dostane statický HTML s korektnými OG tagmi
- Náhľad zdieľania zobrazí správny názov, popis a obrázok článku
- Funguje pre VŠETKY blogové články, nielen registrované
- Žiadna závislosť na dynamickom generovaní v edge funkcii
- Po zdieľaní treba použiť Facebook Sharing Debugger na vyčistenie cache

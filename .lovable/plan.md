
# Automatické OG tagy pre VŠETKY blogové články

## Problém

Aktuálna edge funkcia má **hardcoded zoznam len 10 článkov** v `BLOG_POSTS_OG_DATA`, ale blog obsahuje **25+ článkov**. Každý nový článok vyžaduje manuálnu aktualizáciu edge funkcie.

## Riešenie: Dynamický fallback s generickými OG tagmi

Implementujem systém, ktorý:
1. **Pre registrované články** → použije špecifické OG tagy
2. **Pre neregistrované články** → vygeneruje generické, ale funkčné OG tagy z URL slug

### Ako to bude fungovať pre NOVÉ články:

```text
URL: /blog/novy-clanok-o-internetu

Facebook dostane:
- og:title: "Nový článek | Blog Popri.cz"
- og:description: "Přečtěte si nejnovější článek na blogu Popri.cz o internetu a technologiích."
- og:image: https://www.popri.cz/og-image.png (generický obrázok blogu)
- og:url: https://www.popri.cz/blog/novy-clanok-o-internetu
```

Toto je **VŽDY lepšie** ako homepage OG tagy!

## Technické zmeny

### 1. Upraviť `generateOGMetaHTML` funkciu

```typescript
function generateOGMetaHTML(slug: string, userAgent: string): string {
  const postData = BLOG_POSTS_OG_DATA[slug];
  const canonicalUrl = `${BASE_URL}/blog/${slug}`;
  
  // Ak článok nie je v registri, použiť generické hodnoty
  const title = postData?.title || formatSlugToTitle(slug);
  const description = postData?.description || 
    'Přečtěte si nejnovější článek na blogu Popri.cz o internetu, IPTV a technologiích.';
  const imageUrl = postData?.image 
    ? toAbsoluteImageUrl(postData.image)
    : `${BASE_URL}/og-image.png`;
  
  // ... zvyšok generátora
}

// Pomocná funkcia pre formátovanie slug → title
function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    + ' | Blog Popri.cz';
}
```

### 2. VŽDY vrátiť OG HTML pre blog URLs

Aktuálne edge funkcia pre neregistrované slugy spadne do fallbacku. Zmením to tak, aby **VŽDY** vrátila OG HTML, nikdy nepokračovala do React SPA:

```typescript
// Pre social crawlery na /blog/* URL VŽDY vrátiť OG HTML
if (isSocialCrawler && blogMatch) {
  const slug = blogMatch[1];
  const ogHTML = generateOGMetaHTML(slug, userAgent);
  
  return new Response(ogHTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Fallback-Used': postData ? 'false' : 'true',
      // ...
    }
  });
}
```

## Výsledok

| Situácia | Predtým | Potom |
|----------|---------|-------|
| Registrovaný článok | ✅ Správne OG tagy | ✅ Správne OG tagy |
| Neregistrovaný článok | ❌ Homepage OG tagy | ✅ Generické blogové OG tagy |
| Nový článok | ❌ Manuálna aktualizácia | ✅ Automaticky funguje |

## Bonusové vylepšenie: Build script pre synchronizáciu

Vytvorím build script, ktorý automaticky synchronizuje `BLOG_POSTS_OG_DATA` s `blogPosts` z React dát. Toto zabezpečí, že po každom deployi budú všetky články mať špecifické OG tagy.

```javascript
// scripts/sync-og-data.js
// Načíta blogPosts a vygeneruje aktualizovaný BLOG_POSTS_OG_DATA
```

## Prečo toto funguje

1. **Edge funkcia beží PRED React SPA** - žiadne homepage OG tagy
2. **Fallback hodnoty** - aj neregistrované články majú funkčné OG tagy
3. **Generická og:image** - `og-image.png` je vždy dostupný
4. **Automatický titulok zo slug** - "gaming-ostrava-2025" → "Gaming Ostrava 2025 | Blog Popri.cz"

## Čo sa nezmení

- Stále odporúčam registrovať nové články pre najlepšie výsledky
- Špecifický obrázok článku je lepší ako generický
- Ale teraz aspoň zdieľanie NEBUDE ukazovať homepage!

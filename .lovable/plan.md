
# Oprava zdieľania článkov na sociálne siete

## Identifikované problémy

### Problém 1: Zdieľacie tlačidlá používajú preview URL
Komponent `BlogPostSocialActions` používa `window.location.href`, čo v Lovable preview vráti URL typu `id-preview--562...lovable.app`. Facebook a ďalšie siete túto URL blokujú (ERR_BLOCKED_BY_RESPONSE), pretože preview je chránené.

**Riešenie:** Vždy použiť produkčnú URL `https://www.popri.cz/blog/...` namiesto aktuálnej adresy z prehliadača.

### Problém 2: Nový článok chýba v Edge funkcii pre OG tagy
Netlify Edge funkcia `ai-bot-detector.ts` obsahuje zoznam `BLOG_POSTS_OG_DATA` s manuálne registrovanými článkami. Nový článok `operatori-meni-ceny-internetu-fakta-prava-zakazniku` tam chýba, takže Facebook crawler nedostane správne OG tagy (obrázok, popis, názov) - aj keby URL bola správna.

**Riešenie:** Pridať nový článok do registra v Edge funkcii.

### Problém 3: BlogPostHeader nepredáva produkčnú URL
Komponent `BlogPostHeader` nevolaí `BlogPostSocialActions` s prop `postUrl`, takže sa vždy použije fallback `window.location.href`.

**Riešenie:** Predať produkčnú URL ako prop.

## Technické zmeny

### 1. `src/components/blog/BlogPostSocialActions.tsx`
- Zmeniť fallback URL tak, aby vždy používal produkčnú doménu `https://www.popri.cz`
- Namiesto `window.location.href` zostaviť URL z `window.location.pathname`

```typescript
const PRODUCTION_BASE_URL = 'https://www.popri.cz';
const url = postUrl || `${PRODUCTION_BASE_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
```

### 2. `src/components/blog/BlogPostHeader.tsx`
- Predať produkčnú URL do `BlogPostSocialActions` cez prop `postUrl`

```typescript
const slug = post.slug || createSlug(post.title);
const productionUrl = `https://www.popri.cz/blog/${slug}`;

<BlogPostSocialActions 
  postTitle={post.title}
  postExcerpt={post.excerpt}
  postUrl={productionUrl}
/>
```

### 3. `netlify/edge-functions/ai-bot-detector.ts`
- Pridať nový článok do `BLOG_POSTS_OG_DATA`:

```typescript
'operatori-meni-ceny-internetu-fakta-prava-zakazniku': {
  title: 'Operátoři mění ceny internetu: co je pravda a jak se to týká domácností v Česku',
  description: 'Zdražují operátoři internet v Česku? Přinášíme ověřená fakta o změnách cen, vysvětlení práv zákazníků a tip, jak získat stabilní internet bez nepříjemných překvapení.',
  image: '/blog-images/operatori-ceny-internetu.webp'
}
```

## Súbory na úpravu

| Súbor | Popis |
|-------|-------|
| `src/components/blog/BlogPostSocialActions.tsx` | Vždy použiť produkčnú URL namiesto preview |
| `src/components/blog/BlogPostHeader.tsx` | Predať produkčnú URL ako prop |
| `netlify/edge-functions/ai-bot-detector.ts` | Pridať nový článok do OG registra |

## Očakávaný výsledok
- Zdieľacie tlačidlá budú vždy posielať produkčnú URL `www.popri.cz/blog/...`
- Facebook, Twitter a LinkedIn správne načítajú náhľad článku s obrázkom a popisom
- Funkcia "Kopírovat URL" skopíruje produkčnú URL

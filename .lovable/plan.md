

## Zhodnotenie SEO reportu — čo je pravda, čo nie, a čo stojí za opravu

### Čo je v reporte SPRÁVNE a už máš vyriešené ✅

Report správne chváli tieto veci, ktoré už fungujú:
- `<html lang="cs">`, title, description, OG tagy, robots meta, favicon, font preloading
- netlify.toml redirecty (www, HTTPS, trailing slash)
- SSR fallback s kompletným obsahom (H1, tarify, FAQ, kontakt, mestské linky)
- robots.txt so správnou sitemap, AI bot povoleniami
- Noscript fallback obsah

### Čo je v reporte NESPRÁVNE alebo nepodstatné ❌

| Tvrdenie z reportu | Skutočnosť |
|---|---|
| **🔴 .env je bezpečnostný problém** | **NIE.** Obsahuje len verejné `VITE_` kľúče (anon key). Tieto sú navrhnuté na verejné použitie. `SERVICE_ROLE_KEY` tam nie je. Rotácia kľúčov nie je potrebná. |
| **ai:* meta tagy nemajú efekt** | **PRAVDA**, ale neškodí ich tam mať. Nie je dôvod ich odstraňovať. |
| **Keywords meta tag je zbytočný** | **PRAVDA.** Google ho ignoruje od 2009. Ale neškodí. |
| **OG obrázok na externej URL** | **Minimálny problém.** Google Storage URL funguje spoľahlivo. Presun na vlastnú doménu je nice-to-have, nie priorita. |

### Čo je v reporte PRAVDA a stojí za opravu 🟠

#### 1. Chýba statický canonical tag v index.html (ODPORÚČAM)

Riadok 46 má len komentár: `<!-- Canonical is set dynamically by React Helmet for each page -->`. Ak Netlify prerendering zlyhá a React sa nenačíta, homepage nemá žiadny canonical. 

**Oprava:** Pridať `<link rel="canonical" href="https://www.popri.cz/" />` do `<head>`. React Helmet ho prepíše pre podstránky.

#### 2. Chýba statický JSON-LD v index.html (ODPORÚČAM)

Riadok 258 má len komentár: `<!-- JSON-LD schemas are generated dynamically by React Helmet -->`. Pre prípad, keď React sa nenačíta, Googlebot nevidí žiadnu štruktúrovanú dátu.

**Oprava:** Pridať statický `<script type="application/ld+json">` s `LocalBusiness` + `FAQPage` priamo do `<head>`. React Helmet pridá ďalšie schémy dynamicky.

#### 3. Entitný popis "Čo je Popri.cz" (NICE-TO-HAVE)

SSR fallback už obsahuje vysvetlenie ("Jsme popři vám..."), ale môže byť explicitnejší. Nie je kritické.

### Súhrn — čo implementovať

| Priorita | Akcia | Náročnosť |
|---|---|---|
| 🟠 Stredná | Pridať statický `<link rel="canonical">` do `index.html` | 1 riadok |
| 🟠 Stredná | Pridať statický JSON-LD (`LocalBusiness` + `FAQPage`) do `<head>` | ~40 riadkov |
| ❌ Nerobiť | Rotácia Supabase kľúčov | Zbytočné |
| ❌ Nerobiť | Odstraňovanie ai:* meta tagov | Neškodí |
| ❌ Nerobiť | Presun OG obrázku | Minimálny efekt |

### Technický plán

**Súbor: `index.html`**

1. Na riadok 47 (pred `<link rel="alternate">`) pridať:
```html
<link rel="canonical" href="https://www.popri.cz/" />
```

2. Na riadok 258 (namiesto komentára) pridať statický JSON-LD:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Popri.cz - PODA Internet",
  "url": "https://www.popri.cz",
  "telephone": "+420730431313",
  "email": "terc@obchod.poda.cz",
  "description": "Autorizovaný obchodní zástupce PODA a.s. ...",
  "areaServed": ["Ostrava", "Karviná", "Havířov", "Bohumín"],
  ...
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [4 existujúce FAQ zo SSR fallbacku]
}
</script>
```

### Súbory na úpravu
- `index.html` — pridať canonical tag + 2× JSON-LD schému


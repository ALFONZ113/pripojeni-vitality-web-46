
# Plán: Nový blogový článok o AI a kvalitnom internete

## Prehľad článku

Vytvorím nový blogový článok na tému **"Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ"** v štýle existujúcich článkov na webe (luxury noir + gold theme).

## Súbory na vytvorenie/úpravu

### 1. Nový súbor: `src/data/blog/ai-meni-svet-internet.ts`

Štruktúra podľa existujúcich článkov (napr. `pomaly-internet-vecer.ts`):

```text
BlogPost = {
  id: 302,
  slug: 'jak-ai-meni-svet-proc-kvalitni-internet-zaklad',
  title: 'Jak AI mění svět kolem nás: Proč je kvalitní internet naprostý základ',
  excerpt: 'Umělá inteligence mění práci, zábavu i domácnosti. Zjistěte, proč je rychlý a stabilní internet klíčem k jejímu využití v Česku.',
  content: [HTML obsah článku v štýle webu],
  category: 'Technologie',
  tags: ['AI', 'umělá inteligence', 'rychlý internet', 'chytrá domácnost', 'optický internet', 'práce z domova'],
  author: 'Popri.cz',
  date: '29. 01. 2026',
  image: '/blog-images/ai-internet-zaklad.webp',
  alt: 'Futuristická vizualizace umělé inteligence s optickým vláknem symbolizující rychlý internet'
}
```

### 2. Úprava: `src/data/blog/index.ts`

- Import nového článku
- Pridanie na prvé miesto v poli `blogPosts` (najnovší článok)
- Export článku

### 3. Nový obrázok: `public/blog-images/ai-internet-zaklad.webp`

Vygenerujem obrázok pomocou Gemini modelu s promptom v štýle webu:

```text
"Modern luxury editorial photo: Abstract visualization of AI and 
high-speed internet connection. Deep black background (#0A0A0A), 
golden fiber optic cables (#D4A517) forming neural network patterns, 
subtle brain silhouette made of light particles. Professional 
photography, cinematic lighting, 16:9 aspect ratio, ultra high 
resolution. NO text, NO faces, clean minimalist composition with 
rich gold accents on noir background."
```

## Formátovanie obsahu

Obsah bude formátovaný v HTML s CSS triedami konzistentnými s noir+gold témou:

- `<div class="blog-content">` - hlavný wrapper
- `<p class="lead">` - úvodný odsek
- `<h2>` - hlavné sekcie
- `<h3>` - podsekcie
- `<div class="bg-card border border-primary/20 rounded-xl p-6 my-6">` - zvýraznené boxy
- `<ul>` / `<li>` - zoznamy
- `<div class="space-y-4 my-6">` - FAQ sekcia s kartami
- CTA box s gradientom a tlačidlom na tarify

## Obsah článku (formátovaný pre web)

Článok bude obsahovať:

1. **Úvod** - AI ako realita, nie budúcnosť
2. **AI v práci a vzdelávaní** - praktické príklady
3. **AI v zábave a domácnosti** - streaming, asistenti, bezpečnosť
4. **Prečo AI potrebuje kvalitný internet** - dáta, latencia, upload
5. **AI a rodiny** - viac zariadení, vyššie nároky
6. **FAQ sekcia** - 6 otázok s odpoveďami v kartách
7. **CTA** - výzva na kontrolu tarifov s telefónnym číslom

## Poradie implementácie

1. Vygenerovať obrázok cez edge funkciu `ai-generate-image`
2. Uložiť obrázok do `public/blog-images/`
3. Vytvoriť súbor `ai-meni-svet-internet.ts` s kompletným obsahom
4. Aktualizovať `index.ts` s importom a exportom
5. Otestovať zobrazenie článku

## Technické detaily

### Meta tagy (podľa zadania)

- **Meta title**: Jak AI mění svět a proč bez rychlého internetu nefunguje
- **Meta description**: Umělá inteligence mění práci, zábavu i domácnosti. Zjistěte, proč je rychlý a stabilní internet klíčem k jejímu využití v Česku.

### SEO optimalizácia

- Slug optimalizovaný pre vyhľadávanie
- Interné odkazy na súvisiace články
- FAQ sekcia pre rich snippets
- Alt text pre obrázok

### Štýl písania

Konzistentný s existujúcimi článkami:
- Neformálny, priateľský tón
- Praktické príklady
- Jasná štruktúra
- CTA na konci s telefónnym číslom 730 431 313

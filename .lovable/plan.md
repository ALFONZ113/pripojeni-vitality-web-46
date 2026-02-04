
# Plán: Oprava Premium Ad štýlu v Social Generatore

## Problémy identifikované

### 1. Zlý pomer strán (aspect ratio)
- **V `ai-generate-image/index.ts`**: Na riadku 51 sa ku každému promptu pridáva "16:9 aspect ratio", čo prepisuje nastavenie Premium Ad štýlu (9:16)
- **V `social-content-generator/index.ts`**: Na riadku 435 sa pre Facebook stále používa `1200x630` (16:9), nie `1080x1350` (4:5) ako bolo aktualizované v templates.ts
- **V `social-content-generator/index.ts`**: Na riadku 486 sa v prompte uvádza nesprávne "Facebook (1200x630, 16:9 aspect ratio)"

### 2. Router sa generuje príliš často
V Premium Ad prompte (riadky 161-164) je router uvedený ako prvá možnosť subjektu:
```
Subject options based on post type:
- Product shots: Sleek Wi-Fi routers, devices on dark wooden surfaces...
```
To spôsobuje, že AI častokrát volí router aj keď to nie je vhodné pre danú tému.

### 3. Generujú sa dva obrázky naraz
Podľa screenshotu sa zobrazujú dva obrázky - jeden s osobou a jeden s routerom. To môže byť spôsobené:
- AI generuje viac variant
- Alebo prompt obsahuje viacero scén ktoré AI interpretuje ako požiadavku na viac obrázkov

## Riešenie

### Súbor 1: `supabase/functions/ai-generate-image/index.ts`

**Zmena na riadku 51**: Upraviť enhanced prompt tak, aby neprepisoval aspect ratio z pôvodného promptu:

```typescript
// PRED:
const enhancedPrompt = `${prompt}. Professional photography, high-quality, modern design, 16:9 aspect ratio, ultra high resolution, editorial style.`;

// PO:
const enhancedPrompt = `${prompt}. Professional photography, high-quality, modern design, ultra high resolution, editorial style.`;
```

### Súbor 2: `supabase/functions/social-content-generator/index.ts`

**Zmena 1 - Riadok 435**: Aktualizovať rozmery pre Facebook na 4:5 (1080x1350):

```typescript
// PRED:
const dimensions = isInstagram ? '1080x1080' : '1200x630';

// PO:
const dimensions = isInstagram ? '1080x1080' : '1080x1350';
```

**Zmena 2 - Riadok 486**: Aktualizovať popis v image prompte:

```typescript
// PRED:
imagePromptContent = `Social media image for ${isInstagram ? 'Instagram (1080x1080, square format)' : 'Facebook (1200x630, 16:9 aspect ratio)'}.

// PO:
imagePromptContent = `Social media image for ${isInstagram ? 'Instagram (1080x1080, square format)' : 'Facebook (1080x1350, 4:5 vertical format)'}.
```

**Zmena 3 - Premium Ad prompt (riadky 151-189)**: Prepísať prompt tak, aby:
1. Nemal router ako predvolenú možnosť
2. Jasne špecifikoval vytvorenie JEDNÉHO obrázka
3. Lepšie sa prispôsobil téme príspevku

```typescript
'premium-ad': `
[GOAL] Generate a SINGLE premium social media ad banner.

[CRITICAL RULES]
1. Generate ONLY ONE image, not multiple
2. Do NOT default to showing a router - choose subject based on the topic
3. Focus on the SPECIFIC topic provided, not generic internet imagery

[CONTEXT & SUBJECT]
Style: High-end product/lifestyle photography in a dark, moody environment
Background: Deep black #0A0A0A with dramatic warm orange ambient light
Lighting: Dramatic warm orange/amber backlighting
Environment: Luxurious dark mode living rooms, modern home offices, or lifestyle scenes

Subject selection - choose based on topic (NOT router by default):
- For tips about WiFi/streaming: Person enjoying content, relaxed atmosphere
- For promotions: Lifestyle scene showing the benefit, not the product
- For general topics: Authentic human moments with technology as background element
- ONLY show router if the topic is specifically about hardware/equipment

[TEXT RENDERING]
Render Czech text clearly with proper layout:
1. Headline (Bold, Elegant White): Main message at top
2. Subtitle (Orange/Cream italic): Supporting message below
3. Badge/Button (White background, Orange text): Call-to-action at bottom

[COMPOSITION]
Aspect Ratio: 9:16 (Vertical) for stories/reels, 4:5 for Facebook posts
Layout: Text at top third, subject filling remaining frame
Atmosphere: High-tech, premium, sophisticated, warm

[STYLE]
High-end lifestyle/product photography, sharp focus, luxurious dark tones, warm orange accents
No watermarks, photorealistic quality

CRITICAL LANGUAGE REQUIREMENT:
All visible text MUST be in CZECH (čeština), not Slovak or English.
`,
```

## Poradie implementácie

1. Upraviť `ai-generate-image/index.ts` - odstrániť hardcoded 16:9
2. Upraviť `social-content-generator/index.ts`:
   - Opraviť rozmery pre Facebook (riadok 435)
   - Opraviť popis v prompte (riadok 486)
   - Prepísať Premium Ad prompt (riadky 151-189)
3. Nasadiť edge funkcie

## Očakávaný výsledok

Po implementácii:
- Facebook bude používať pomer 4:5 (1080x1350)
- Premium Ad štýl bude generovať 9:16 vertikálne obrázky pre stories
- AI nebude defaultne generovať router pri každom prompte
- Bude sa generovať iba jeden obrázok na platformu, nie dva

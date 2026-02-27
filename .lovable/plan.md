

# Optimalizace promptov pre Nano Banana 2 (Gemini 3.1 Flash Image)

## Co je Nano Banana 2 a co noveho prinasi

Nano Banana 2 (oficialne **Gemini 3.1 Flash Image Preview**), vydany 26.2.2026, kombinuje kvalitu Nano Banana Pro s rychlosti Gemini Flash. Klicova vylepseni:

1. **Presne nasledovani instrukci** - model lepe dodrzuje slozite pozadavky (osvetleni, uhly kamery, nalady)
2. **Konzistence subjektu** - udrzi az 5 postav a 14 objektu v jednom workflow
3. **Presne vykreslovani textu** - marketingove mockupy, pohlednice, diagramy s citelnym textem
4. **Podpora vice pomeru stran** - od 512px do 4K, ruzne aspect ratio
5. **Vyssi vizualni vernost** - zive osvetleni, bohatsie textury, ostrejsi detaily
6. **Pokrocile znalosti sveta** - vyuziva Gemini knowledge base pro presne vykreslovani specifickych subjektu

## Analyza soucasnych promptov vs. doporuceni Google

### Problem 1: Stylove prompty jsou seznamy klicovych slov
Google v oficialnim blogu ukazuje, ze nejlepsi prompty jsou **naratívni, popisne odstavce** s detaily o osvetleni, kamere a atmosfere (viz prikladove prompty z blogu s 5+ vetami).

**Soucasny format:**
```
Style: Luxury noir and gold editorial design. Background: Deep black #0A0A0A. Accent: Rich gold #D4A517...
```

**Doporuceny format (inspirovany oficialnimi prompty):**
```
A luxurious social media visual with a deep noir background (#0A0A0A). Warm golden ambient light creates soft reflections and rich gold (#D4A517) accents. Typography uses elegant serif style for headlines in cream white (#F5F0E8). Shot with professional studio lighting, shallow depth of field on the main subject.
```

### Problem 2: Chybi fotograficke instrukce
Google prompty pouzivaji terminy jako "35mm soft blur", "high-angle aerial view", "soft, diffused light", "shallow depth of field". Nase prompty to nemaji.

### Problem 3: `generateSceneDescription` je prilis strucna
Aktualne: "Output ONLY 2-3 sentence scene description". Oficialní prompty Google maji 5-15 vet s detaily o kamere, osvetleni, barvach a atmosfere. Zvysime na 4-6 vet.

### Problem 4: Aspect ratio neni v tele promptu
Model lepe dodrzuje pomer stran kdyz je popsany slovne ("Vertical portrait orientation, 4:5 aspect ratio") misto jen technicky ("Dimensions: 1080x1350").

### Problem 5: Text rendering instrukce
Nano Banana 2 ma vylepsene vykreslovani textu. Muzeme toho vyuzit lepsimi instrukcemi - presne specifikovat text v uvozovkach, font styl a umisteni.

---

## Plan zmien

### 1. Prepis `stylePrompts` na narativni format
**Soubor:** `supabase/functions/social-content-generator/index.ts` (radky 65-74)

Vsech 8 stylu se prepise z formatu "key: value" na suvisly popisny odstavec, vcetne:
- Popis atmosfery a nalady
- Typ osvetleni a kamery (napr. "35mm lens, soft natural light")
- Barevna paleta v kontextu (ne jen hex kody)
- Typografie jako soucast sceny

### 2. Vylepseni `generateSceneDescription`
**Soubor:** `supabase/functions/social-content-generator/index.ts` (radky 198-213)

System prompt upraven na:
- 4-6 vet misto 2-3
- Povinny popis typu osvetleni a kamery/objektivu
- Popis kompozice a negativniho prostoru pro text overlay
- Popis dominantnich barev a textury

### 3. Pomer stran slovne v promptu
**Soubor:** `supabase/functions/social-content-generator/index.ts` (radky 349-362)

Nahradit `Dimensions: 1080x1350` za narativni popis:
- Facebook: "Vertical portrait composition in 4:5 aspect ratio (1080x1350px)"
- Instagram: "Square composition in 1:1 aspect ratio (1080x1080px)"

### 4. Vylepseni text rendering instrukci
**Soubor:** `supabase/functions/social-content-generator/index.ts` (radek 362)

Nahradit genericke `CRITICAL: All visible text must be in Czech` za:
```
Any visible text in the image must be rendered in Czech language (cestina) with proper diacritics. Use clean, bold sans-serif font for headlines. Place main text in the upper third with sufficient contrast against the background. Put exact text in quotation marks when specifying what should appear.
```

### 5. Vylepseni fallback promptu v `ai-generate-image`
**Soubor:** `supabase/functions/ai-generate-image/index.ts` (radek ~263)

Nahradit:
```
Professional photography, high-quality, modern design, ultra high resolution, editorial style.
```
Za kontextovy narativni doplnek:
```
Photographed with a professional camera using natural depth of field. Sharp focus on the main subject with a complementary, uncluttered background. The composition leaves appropriate negative space for text overlays. Single cohesive image.
```

### 6. Aktualizace `personRenderPrompts` na narativni format
**Soubor:** `supabase/functions/social-content-generator/index.ts` (radky 58-63)

Kratke keyword popisy nahradit naratívnimi vetami pro lepsi vysledky s Nano Banana 2.

---

## Dotknute soubory

| Soubor | Zmena |
|--------|-------|
| `supabase/functions/social-content-generator/index.ts` | Prepis stylePrompts, personRenderPrompts, generateSceneDescription, image prompt assembly, text rendering instrukce |
| `supabase/functions/ai-generate-image/index.ts` | Vylepseni fallback promptu |

## Ocekavany vysledok

- Koherentnejsi a profesionalnejsi obrazky diky narativnim promptum
- Lepsie dodrzovani pomeru stran
- Presnejsi vykreslovani ceskeho textu v obrazcich
- Plne vyuziti novych schopnosti Nano Banana 2 (instruction following, text rendering, visual fidelity)


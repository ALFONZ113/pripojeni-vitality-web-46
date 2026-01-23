

# Plán: Pridanie nového štýlu "Foto realistický" do Social Media Generátora

## Cieľ

Pridať nový vizuálny štýl **"Foto realistický"** vedľa existujúcich štýlov, ktorý:
- Generuje **kompletný image prompt s popisom fotografie** (ľudia, domáca atmosféra)
- Používa **menej zlatej farby** - prirodzené, teplé tóny
- Zachováva **český text** v obrázkoch
- Prompt si potom skopírujete do Google AI Studio

## Zmeny v súboroch

### 1. Aktualizovať StyleSelector komponent

**Súbor:** `src/components/social/StyleSelector.tsx`

```text
Aktuálne štýly: luxury-gold, modern-noir, minimalist
Nový štýl: photo-realistic

Pridať:
- Import ikony Camera z lucide-react
- Nový typ: 'photo-realistic'
- Nová karta v UI:
  - Label: "Foto realistický"
  - Popis: "Realistické fotky s lidmi, domácí atmosféra"
  - Ikona: Camera
```

### 2. Aktualizovať typy a štýlové prompty

**Súbor:** `src/data/social/templates.ts`

```text
Zmeny:
- Rozšíriť VisualStyle o 'photo-realistic'
- Pridať nový stylePrompts['photo-realistic']:
  
  - Realistické fotografie s ľuďmi
  - Scény: rodina u TV, žena v home office, streamer pri PC
  - Prirodzené osvetlenie, teplé farby
  - Minimálna zlatá - len jemné akcenty ak vôbec
  - Český text overlay
```

### 3. Aktualizovať edge function

**Súbor:** `supabase/functions/social-content-generator/index.ts`

```text
Zmeny:
- Pridať 'photo-realistic' do InputSchema validácie
- Pridať nový stylePrompts['photo-realistic']
- Pre tento štýl generovať image prompt s konkrétnou scénou:

  Príklad výstupu pre typ "promo":
  "Realistic lifestyle photograph of happy Czech family
   watching TV in cozy living room. Natural warm lighting,
   comfortable sofa, children excited. Subtle WiFi router
   visible. Czech text overlay: 'Gigabit internet pro celou
   rodinu'. Magazine editorial photography quality..."

  Príklad pre typ "tip":
  "Young woman working from home on laptop, comfortable
   home office setup, natural daylight from window.
   Relaxed productive mood. Czech text: 'Stabilní WiFi
   pro práci z domova'. Natural photography style..."
```

---

## Nový "photo-realistic" prompt

```text
Style: Realistic lifestyle photography with natural lighting and authentic scenes
Background: Real interior environments - cozy living rooms, modern home offices, family spaces

Photo subjects - include ONE of these realistic scenes based on post type:
- Happy family watching TV together on comfortable sofa (for promo)
- Woman working from home on laptop, relaxed and productive (for tips)
- Young professional streaming or gaming with fast internet (for custom)
- Parents with children enjoying online content together (for news)
- Modern person using tablet/smartphone with stable connection (for blog)

Lighting: Warm natural light from windows, soft indoor ambient lighting
Colors: Warm neutrals (beige, cream, soft brown), natural wood tones, soft whites
Minimal gold accents - only if absolutely necessary, prefer natural warm colors
Mood: Authentic, relatable, comfortable, trustworthy, aspirational but realistic
Photography style: Editorial lifestyle magazine quality, candid feel, Czech family aesthetic

Text overlay: Small, elegant Czech headline in corner or bottom third
Typography: Clean sans-serif (Inter style), subtle shadow for readability
No heavy graphics, no over-designed elements, focus on the authentic photo

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Examples: "Rychlý internet pro celou rodinu", "Práce z domova bez výpadků"
```

---

## Príklad vygenerovaného image promptu

Keď zadáte tému "WiFi optimalizácia" so štýlom "Foto realistický":

```text
Create a realistic lifestyle photograph for Facebook social media post.

SCENE: Young woman sitting comfortably on modern sofa with laptop,
checking wifi signal strength on smartphone. Bright, airy living room
with large windows, natural daylight streaming in. Modern WiFi router
with subtle LED lights visible on shelf nearby. Relaxed, productive
home atmosphere. Plants and cozy decor.

Style: Editorial lifestyle photography, warm natural tones, soft shadows
Lighting: Natural window light mixed with warm interior lamps
Colors: Soft whites, warm wood tones, beige and cream, touches of green plants
NO gold accents - keep colors natural and warm

Text overlay placement: Bottom third of image
Czech headline text: "Stabilní WiFi v každém koutě bytu"
Czech subtext: "Tipy pro lepší signál"
Typography: Clean Inter font, white text with subtle shadow

Dimensions: 1200x630 (Facebook 16:9)
No watermarks, photorealistic quality, magazine editorial style

IMPORTANT: All visible text MUST be in Czech language (čeština).
Slovak "Ako" = Czech "Jak", Slovak "signál" = Czech "signál"
```

---

## Výsledný workflow

1. Vyberiete typ príspevku (promo, tip, blog...)
2. Vyberiete platformu (Facebook, Instagram)
3. **Vyberiete štýl:**
   - 🌟 Luxury Gold (zlaté akcenty, luxusný)
   - 📷 **Foto realistický** ← NOVÝ (fotky s ľuďmi, prirodzené)
   - 🌙 Modern Noir (tmavý, profesionálny)
   - ⚡ Minimalistický (čistý, jednoduchý)
4. Zadáte tému
5. Kliknete "Generovať obsah"
6. Dostanete:
   - Český text príspevku
   - Hashtagy
   - **Kompletný image prompt** s popisom fotky a českým textom
7. Skopírujete prompt do Google AI Studio

---

## Technické detaily

| Súbor | Zmeny |
|-------|-------|
| `src/components/social/StyleSelector.tsx` | Pridať 'photo-realistic' s Camera ikonou |
| `src/data/social/templates.ts` | Rozšíriť VisualStyle, pridať stylePrompts |
| `supabase/functions/social-content-generator/index.ts` | Pridať do validácie, nový stylePrompt, logika pre scény podľa typu |

Všetky ostatné funkcie zostanú nezmenené - automatické generovanie obrázkov, ukladanie do histórie, atď.


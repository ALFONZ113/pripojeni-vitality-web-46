
# Plán: Vylepšenie promptu pre zachovanie identity osoby

## Aktuálny stav

Súčasný prompt v `ai-generate-image/index.ts` je príliš všeobecný a neobsahuje dostatočné inštrukcie pre zachovanie identity. Aktuálne inštrukcie:

```
1. Keep the person's face recognizable but apply the ${renderStyle} style transformation
```

Toto je nedostatočné pre Gemini model, ktorý potrebuje explicitnejšie a detailnejšie inštrukcie.

## Navrhované zmeny

### 1. Kompletne prepísané styleDescriptions

Každý štýl bude mať oveľa silnejšie inštrukcie na zachovanie identity:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ REALISTIC                                                                │
├─────────────────────────────────────────────────────────────────────────┤
│ • Zachovať presnú štruktúru tváre (oči, nos, ústa, brada)               │
│ • Zachovať vlasy - farba, dĺžka, účes                                   │
│ • Zachovať proporcie tela a postavu                                     │
│ • Oblečenie môže byť zmenené podľa scény                                │
│ • Fotorealistické osvetlenie a tieňe                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ CARICATURE                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│ • Preháňať charakteristické črty tváre (veľký nos, úsmev, oči)          │
│ • Zachovať rozpoznateľnosť osoby aj v štylizovanej forme                │
│ • Zachovať vlasy a celkovú postavu                                      │
│ • Oblečenie môže byť štylizované alebo zmenené                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2. Nový rozšírený prompt template

Namiesto jednoduchých 5 bodov pridáme komplexný prompt s jasnou hierarchiou priorít:

```
## CRITICAL IDENTITY PRESERVATION RULES (MUST FOLLOW):

### FACE - HIGHEST PRIORITY:
- EXACT eye shape, eye color, eye spacing
- EXACT nose shape and size  
- EXACT mouth shape and lip fullness
- EXACT face shape (oval, round, square, etc.)
- EXACT chin and jawline structure
- Preserve all distinctive facial features (moles, freckles, dimples)
- Maintain the same facial expression style/character

### HAIR - HIGH PRIORITY:
- SAME hair color (exact shade)
- SAME hair length and style
- SAME hair texture (straight, curly, wavy)

### BODY - MEDIUM PRIORITY:
- SAME body proportions and build
- SAME height impression
- SAME skin tone

### ALLOWED TO CHANGE:
- Clothing (adapt to scene context)
- Accessories (jewelry, glasses if not distinctive)
- Background and environment
- Lighting conditions
- Pose (while maintaining body proportions)
```

### 3. Pridanie negatívnych inštrukcií

Explicitne zakázať AI čo NEMÁ robiť:

```
## DO NOT:
- Generate a different person
- Change the face structure
- Alter eye color or shape
- Modify nose or mouth shape
- Change hair color or length
- Create an idealized or "beautified" version
- Make the person look younger or older
- Add or remove facial hair unless specified
```

## Technické zmeny v súbore

### supabase/functions/ai-generate-image/index.ts

**Zmena 1: Nové styleDescriptions (riadky 18-24)**

```typescript
const styleDescriptions: Record<string, string> = {
  'realistic': `PHOTO-REALISTIC TRANSFORMATION with STRICT IDENTITY PRESERVATION.
    
This is the EXACT same person from the reference photo. You MUST preserve:
- EXACT facial structure: eye shape, nose, mouth, chin, jawline
- EXACT hair: color, length, texture, style  
- EXACT skin tone and any distinctive marks (moles, freckles)
- EXACT body proportions and build

Create a professional photograph with natural lighting. 
Clothing CAN be changed to fit the scene context.`,

  'caricature': `CARICATURE STYLE with RECOGNIZABLE IDENTITY.

Exaggerate the DISTINCTIVE features of THIS SPECIFIC person:
- Emphasize their unique nose shape, smile, or eye characteristics
- Keep them CLEARLY RECOGNIZABLE as the same person
- Preserve their exact hair color and general style
- Maintain their body type and proportions

Use bold, warm colors. Make it fun and playful.
Clothing can be stylized or changed.`,

  'illustration': `DIGITAL ILLUSTRATION with PRESERVED IDENTITY.

Create a modern vector-style illustration of THIS EXACT person:
- Simplify but preserve their unique facial features
- Keep exact hair color and style
- Maintain recognizable face shape and proportions
- Use clean lines and flat design elements

Professional artistic quality. Clothing can adapt to style.`,

  'cartoon': `PIXAR/DISNEY 3D STYLE with SAME PERSON.

Transform into animated character while keeping IDENTITY:
- Same face shape, eye placement, nose and mouth style
- Same hair color and general hairstyle
- Same skin tone
- Friendly, approachable look with vibrant colors

The character must be recognizable as the reference person.
Clothing can be cartoon-styled.`,
};
```

**Zmena 2: Rozšírený hlavný prompt (riadky 71-96)**

```typescript
messages = [
  {
    role: 'user',
    content: [
      {
        type: 'text',
        text: `${styleDescription}

## SCENE CONTEXT:
${prompt}

## CRITICAL IDENTITY PRESERVATION RULES:

### FACE (HIGHEST PRIORITY - MUST MATCH EXACTLY):
- Preserve EXACT eye shape, color, and spacing
- Preserve EXACT nose shape and size
- Preserve EXACT mouth shape and lip fullness
- Preserve EXACT face shape and jawline
- Keep all distinctive features (moles, freckles, dimples, scars)
- Maintain similar facial expression character

### HAIR (HIGH PRIORITY):
- Keep EXACT hair color (same shade)
- Keep EXACT hair length and style
- Keep hair texture (straight/curly/wavy)

### BODY (MEDIUM PRIORITY):  
- Maintain same body proportions and build
- Keep same skin tone throughout

### ALLOWED CHANGES:
- Clothing can be changed to fit the scene
- Accessories can be added/removed
- Pose can be adjusted
- Background is completely new

## DO NOT:
- Generate a different person's face
- Change eye color or face shape
- Alter hair color or length significantly
- Create an "idealized" or different-looking version
- Make the person look younger/older than reference

## TECHNICAL REQUIREMENTS:
- Single cohesive image (not multiple images)
- Professional quality for social media marketing
- Any text in image MUST be in Czech language
- Seamless integration of person into scene

The generated image MUST show the SAME PERSON from the reference photo, just in a new scene with potentially different clothing.`
      },
      {
        type: 'image_url',
        image_url: {
          url: referenceImage
        }
      }
    ]
  }
];
```

## Súbory na úpravu

| Súbor | Akcia | Popis |
|-------|-------|-------|
| `supabase/functions/ai-generate-image/index.ts` | Upraviť | Prepísať styleDescriptions a rozšíriť hlavný prompt |

## Očakávaný výsledok

Po implementácii:
- AI bude mať jasné, hierarchické inštrukcie čo zachovať
- Tvár a vlasy budú mať najvyššiu prioritu
- Oblečenie bude explicitne označené ako "môže sa zmeniť"
- Negatívne inštrukcie zabránia bežným chybám
- Lepšia konzistencia výsledkov naprieč rôznymi štýlmi

## Poznámka

Aj s vylepšeným promptom má Gemini Flash obmedzenia v zachovávaní identity. Pre produkčné použitie s vysokými nárokmi na presnosť by bolo vhodné zvážiť:
- Použitie Gemini Pro modelu (`google/gemini-3-pro-image-preview`)
- Viacnásobné generovanie a výber najlepšieho výsledku

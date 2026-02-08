

# Plán: Nová funkcia "Vložiť osobu" do Social Media Generatora

## Prehľad funkcie

Rozšírenie Social Media Generatora o možnosť nahrať vlastnú fotografiu osoby. AI následne vygeneruje obrázok, kde táto osoba bude zobrazená v kontexte príspevku. Používateľ si bude môcť vybrať štýl zobrazenia:

- **Realistický** - fotorealistická úprava osoby v scéne
- **Karikatúra** - humorná, preexponovaná karikatúra (ako na ukážke)
- **Ilustrácia** - moderná digitálna ilustrácia
- **Kreslený (Cartoon)** - štýl animovaných filmov

## Architektúra zmien

```text
┌─────────────────────────────────────────────────────────────────┐
│                    SocialGenerator.tsx                          │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  PersonToggle (existujúci)                                  ││
│  │  ┌─────────┐  ┌─────────────┐  ┌──────────────────────────┐ ││
│  │  │S osobou │  │ Bez osob   │  │ NOVÉ: Vložiť osobu     │ ││
│  │  └─────────┘  └─────────────┘  └──────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  NOVÉ: PersonUploader (zobrazí sa keď "Vložiť osobu")       ││
│  │  ┌───────────────────┐  ┌─────────────────────────────────┐ ││
│  │  │ [Nahrať foto]     │  │ Štýl zobrazenia:                │ ││
│  │  │                   │  │ ○ Realistický                   │ ││
│  │  │  [Náhľad foto]    │  │ ○ Karikatúra                    │ ││
│  │  │                   │  │ ○ Ilustrácia                    │ ││
│  │  └───────────────────┘  │ ○ Kreslený (Cartoon)            │ ││
│  │                         └─────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Technické detaily

### 1. Nový komponent: PersonUploader

**Súbor:** `src/components/social/PersonUploader.tsx`

**Funkcie:**
- Upload fotografie cez `<input type="file">` (JPG, PNG, WebP)
- Náhľad nahranej fotografie
- Výber štýlu zobrazenia (RadioGroup)
- Konverzia obrázka na base64 pre odoslanie do AI

**Štýly zobrazenia:**
| Štýl | Popis | AI prompt kľúče |
|------|-------|-----------------|
| `realistic` | Fotorealistická úprava | "professional photo, realistic lighting, seamless integration" |
| `caricature` | Karikatúra | "exaggerated caricature style, humorous, bold features" |
| `illustration` | Digitálna ilustrácia | "modern digital illustration, clean lines, artistic" |
| `cartoon` | Kreslený štýl | "Pixar/Disney style cartoon, 3D animated character look" |

### 2. Rozšírenie PersonToggle

**Súbor:** `src/components/social/PersonToggle.tsx`

**Zmeny:**
- Pridanie tretej možnosti: `'custom-person'`
- Nový typ: `export type IncludePerson = 'with-person' | 'without-person' | 'custom-person';`

### 3. Rozšírenie SocialGenerator.tsx

**Nový stav:**
```typescript
const [customPersonImage, setCustomPersonImage] = useState<string | null>(null);
const [personRenderStyle, setPersonRenderStyle] = useState<'realistic' | 'caricature' | 'illustration' | 'cartoon'>('realistic');
```

**Podmienené zobrazenie:**
```tsx
{includePerson === 'custom-person' && (
  <PersonUploader
    image={customPersonImage}
    onImageChange={setCustomPersonImage}
    renderStyle={personRenderStyle}
    onRenderStyleChange={setPersonRenderStyle}
  />
)}
```

**Rozšírenie volania edge funkcie:**
```typescript
const { data, error } = await supabase.functions.invoke('social-content-generator', {
  body: {
    type: postType,
    platform,
    visualStyle,
    includePerson,
    customTopic: customTopic || null,
    // NOVÉ:
    customPersonImage: includePerson === 'custom-person' ? customPersonImage : null,
    personRenderStyle: includePerson === 'custom-person' ? personRenderStyle : null,
  },
});
```

### 4. Úprava Edge Funkcie social-content-generator

**Súbor:** `supabase/functions/social-content-generator/index.ts`

**Zmeny:**
1. Rozšírenie InputSchema:
```typescript
customPersonImage: z.string().optional().nullable(),
personRenderStyle: z.enum(['realistic', 'caricature', 'illustration', 'cartoon']).optional().nullable(),
```

2. Nové štýlové prompty pre každý render štýl:
```typescript
const personRenderPrompts = {
  realistic: 'Photo-realistic person integration, natural lighting, seamless blend with environment',
  caricature: 'Exaggerated caricature style with bold features, humorous, artistic interpretation, warm colors',
  illustration: 'Modern digital illustration style, clean vector-like lines, artistic and professional',
  cartoon: 'Pixar/Disney 3D cartoon style, friendly and approachable, vibrant colors',
};
```

3. Modifikácia generovania obrázka pre zahrnutie vlastnej osoby v image prompte

### 5. Úprava Edge Funkcie ai-generate-image

**Súbor:** `supabase/functions/ai-generate-image/index.ts`

**Zmeny:**
- Pridanie podpory pre image editing (Gemini API podporuje vstupný obrázok)
- Ak je poskytnutý `referenceImage`, použije sa ako vstup pre úpravu

```typescript
const InputSchema = z.object({
  prompt: z.string().trim().min(5).max(500),
  slug: z.string().optional().nullable(),
  // NOVÉ:
  referenceImage: z.string().optional().nullable(), // base64 obrázok osoby
  renderStyle: z.enum(['realistic', 'caricature', 'illustration', 'cartoon']).optional().nullable(),
});
```

**Rozšírený prompt pre Gemini:**
```typescript
if (referenceImage && renderStyle) {
  // Použijeme image editing mode
  messages = [
    {
      role: 'user',
      content: [
        { type: 'text', text: `Transform the person in this photo into ${styleDescription}. ${prompt}` },
        { type: 'image_url', image_url: { url: referenceImage } }
      ]
    }
  ];
}
```

### 6. Databázové zmeny (voliteľné pre históriu)

**Nové stĺpce v `social_posts`:**
- `custom_person_image_url` (TEXT, nullable) - URL uloženej referenčnej fotografie
- `person_render_style` (TEXT, nullable) - použitý štýl renderovania

## Súbory na vytvorenie/úpravu

| Súbor | Akcia | Popis |
|-------|-------|-------|
| `src/components/social/PersonUploader.tsx` | **NOVÝ** | Komponent pre upload a výber štýlu |
| `src/components/social/PersonToggle.tsx` | Upraviť | Pridať tretiu možnosť |
| `src/pages/SocialGenerator.tsx` | Upraviť | Integrovať nové komponenty a stav |
| `supabase/functions/social-content-generator/index.ts` | Upraviť | Spracovať custom osobu v prompte |
| `supabase/functions/ai-generate-image/index.ts` | Upraviť | Podpora image editing |

## Workflow používateľa

1. Používateľ otvorí Social Media Generator
2. V sekcii "Lidé na obrázku" vyberie **"Vložiť osobu"**
3. Zobrazí sa nová sekcia:
   - **Upload foto** - drag & drop alebo kliknutím
   - **Výber štýlu** - Realistický / Karikatúra / Ilustrácia / Kreslený
4. Používateľ nahrá svoju fotografiu a vyberie štýl (napr. Karikatúra)
5. Vyplní ostatné nastavenia (typ postu, téma, atď.)
6. Klikne "Generovať obsah"
7. AI vygeneruje text + image prompt, ktorý zahŕňa inštrukcie pre štýl osoby
8. Pri kliknutí na "Generovat obrázok" sa použije referenčná fotografia a vygeneruje sa karikatúra/ilustrácia osoby v kontexte témy

## Obmedzenia a poznámky

- **Veľkosť obrázka**: Max 4MB pre upload (Gemini limit)
- **Formáty**: JPG, PNG, WebP
- **Kvalita karikatúry**: Závisí od kvality vstupnej fotografie (ideálne portrét s jasnou tvárou)
- **GDPR**: Upozornenie používateľa, že nahraná fotografia sa spracováva cez AI (nezostáva uložená trvalo)

## Očakávaný výsledok

Po implementácii bude používateľ môcť:
- Nahrať vlastnú fotografiu do Social Media Generatora
- Vybrať si štýl zobrazenia (karikatúra ako na ukážke, alebo iný)
- Vygenerovať príspevok, kde bude osoba z fotografie zobrazená v zvolenom štýle a kontexte témy


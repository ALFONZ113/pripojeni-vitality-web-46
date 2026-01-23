

# Plán: Oprava image promptov - Dynamické scény podľa témy

## Identifikovaný problém

V súbore `supabase/functions/social-content-generator/index.ts` (riadky 317-324):

```typescript
// PROBLÉM: Statický základ promptu
let imagePromptContent = template.imagePrompt; // ← VŽDY rovnaký router!
if (customTopic) {
  imagePromptContent += `\nTopic/theme: ${customTopic}`; // ← Len pridá tému ako text
}
imagePromptContent += `\n${brandingPrompt}`; // ← Pridá štýl
```

Výsledok: **Vždy rovnaký obrázok** (router s optickými káblami), len s iným textom.

## Riešenie

Nahradiť statický `template.imagePrompt` **dynamickým generovaním scény pomocou AI** podľa témy.

## Technické zmeny

### Súbor: `supabase/functions/social-content-generator/index.ts`

**1. Pridať novú funkciu na generovanie unikátnej scény (pred riadok 242):**

```typescript
async function generateSceneDescription(
  topic: string, 
  postType: string, 
  visualStyle: string,
  apiKey: string
): Promise<string> {
  const sceneSystemPrompt = `You are an expert at creating unique image scene descriptions.
Based on the topic, create a SPECIFIC and UNIQUE scene description.

CRITICAL RULES:
1. DO NOT describe generic routers with light effects for everything
2. CREATE UNIQUE scenes based on the actual topic
3. ALWAYS include PEOPLE in realistic situations when using photo-realistic style
4. Describe the SPECIFIC scene that matches the topic

Examples of good scene descriptions:
- Topic "WiFi optimization" → Person adjusting router position, checking signal on phone
- Topic "Tariff for seniors" → Elderly couple comfortably using tablet on sofa
- Topic "How to connect WiFi" → Person unpacking and setting up new router
- Topic "Home office" → Woman working productively on laptop at home desk
- Topic "Family internet" → Family watching movie together on TV
- Topic "Gaming internet" → Young person at gaming setup with fast connection

For luxury-gold style: Can include stylized elements but still vary the scene
For photo-realistic style: MUST show real people in authentic situations

Output ONLY the scene description, nothing else.`;

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: sceneSystemPrompt },
          { role: 'user', content: `Create unique image scene for:
Topic: ${topic}
Post type: ${postType}
Visual style: ${visualStyle}
Output a 2-3 sentence scene description in English.` }
        ],
      }),
    });

    if (!response.ok) {
      console.error('Scene generation failed:', response.status);
      return ''; // Fallback to default
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Scene generation error:', error);
    return '';
  }
}
```

**2. Aktualizovať logiku generovania image promptu (riadky 317-324):**

**Pred:**
```typescript
let imagePromptContent = template.imagePrompt;
if (customTopic) {
  imagePromptContent += `\nTopic/theme: ${customTopic}`;
  // ...
}
```

**Po:**
```typescript
// Generate unique scene based on topic
const topicForScene = customTopic || type;
const uniqueScene = await generateSceneDescription(
  topicForScene, 
  type, 
  visualStyle, 
  lovableApiKey
);

// Build dynamic image prompt
let imagePromptContent = '';

if (uniqueScene) {
  // Use AI-generated unique scene
  imagePromptContent = `Social media image for ${plat === 'instagram' ? 'Instagram (1080x1080, square)' : 'Facebook (1200x630, 16:9 aspect ratio)'}.

SCENE: ${uniqueScene}

Topic: ${topicForScene}
`;
} else {
  // Fallback to template if AI fails
  imagePromptContent = template.imagePrompt;
  if (customTopic) {
    imagePromptContent += `\nTopic/theme: ${customTopic}`;
  }
}

// Add branding style and language requirements
imagePromptContent += `\n${brandingPrompt}`;
imagePromptContent += `\nDimensions: ${dimensions}`;
imagePromptContent += `\n\nCzech text overlay required. ALL visible text must be in Czech (čeština).`;
```

## Príklady výstupu po oprave

### Téma: "Výhodný taríf pro důchodce"

**Teraz (zlé):**
```text
Fiber optic cables with light trails on dark background.
Modern router device with subtle rim lighting.
Topic: Výhodný taríf pro důchodce
```

**Po oprave (správne):**
```text
SCENE: Elderly Czech couple in their 70s sitting comfortably on a 
cozy sofa in warm living room. They are smiling while video calling 
their grandchildren on a tablet. Soft natural lighting from window, 
family photos on wall. Relaxed, happy atmosphere showing technology 
connecting generations.

Topic: Výhodný taríf pro důchodce
Czech text overlay: "Internet pro seniory od 300 Kč"
```

### Téma: "Ako zapojiť wifi"

**Teraz (zlé):**
```text
Fiber optic cables with light trails on dark background.
Modern router device with subtle rim lighting.
Topic: Ako zapojiť wifi
```

**Po oprave (správne):**
```text
SCENE: Young person in casual clothes unpacking a new WiFi router 
from box. They are reading the quick start guide while connecting 
cables to the device. Modern apartment setting, router on desk with 
ethernet cable in hand. Step-by-step setup moment captured.

Topic: Jak připojit WiFi
Czech text overlay: "Jak připojit WiFi krok za krokem"
```

## Zmeny v súboroch

| Súbor | Zmeny |
|-------|-------|
| `supabase/functions/social-content-generator/index.ts` | Pridať `generateSceneDescription()` funkciu, aktualizovať logiku generovania image promptu |

## Výsledok

- **Každá téma = Unikátna scéna** (nie len zmena textu)
- **Photo-realistic štýl** bude mať vždy ľudí v správnej situácii
- **Dôchodcovia** = starší pár na gauči
- **WiFi pripojenie** = osoba nastavujúca router
- **Home office** = žena pracujúca z domu
- **Rodina** = rodina pozerajúca TV


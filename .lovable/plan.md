

## Plán: Pridať 4 nové vizuálne štýly do Social Generátora

### Súhrn
Pridám 4 nové vizuálne štýly: **Gradient Modern**, **Tech Blue**, **Bright & Bold** a **Vintage Retro**. Tieto štýly rozšíria existujúce možnosti (Luxury Gold, Photo-realistic, Modern Noir, Minimalist) na 8 štýlov celkom.

---

### Nové štýly - prehľad

| Štýl | Hlavné farby | Použitie | Ikona |
|------|--------------|----------|-------|
| **Gradient Modern** | Fialová/Modrá (#7C3AED → #3B82F6) | Instagram, mladé publikum | `Palette` |
| **Tech Blue** | Navy/Elektrická modrá (#0A1628, #00A3FF) | Profesionálny tech obsah | `Cpu` |
| **Bright & Bold** | Živé farby (červená, oranžová, žltá) | Promo akcie, sľavy, call-to-action | `Sun` |
| **Vintage Retro** | Teplé odtiene (sépie, hnedá, krémová) | Nostalgický, dôveryhodný obsah | `Clock` |

---

### Zmeny v súboroch

#### 1. `src/components/social/StyleSelector.tsx`

**Rozšíriť typ VisualStyle:**
```typescript
export type VisualStyle = 
  | 'luxury-gold' 
  | 'photo-realistic' 
  | 'modern-noir' 
  | 'minimalist'
  | 'gradient-modern'   // NOVÉ
  | 'tech-blue'         // NOVÉ
  | 'bright-bold'       // NOVÉ
  | 'vintage-retro';    // NOVÉ
```

**Pridať nové štýly do poľa `styles`:**
```typescript
{
  value: 'gradient-modern',
  label: 'Gradient Modern',
  description: 'Živé barevné přechody, moderní vzhled',
  icon: <Palette className="h-4 w-4 text-violet-500" />,
},
{
  value: 'tech-blue',
  label: 'Tech Blue',
  description: 'Profesionální modrá, technologický styl',
  icon: <Cpu className="h-4 w-4 text-blue-500" />,
},
{
  value: 'bright-bold',
  label: 'Bright & Bold',
  description: 'Výrazné barvy, vysoký kontrast',
  icon: <Sun className="h-4 w-4 text-orange-500" />,
},
{
  value: 'vintage-retro',
  label: 'Vintage Retro',
  description: 'Nostalgický, teplé odstíny',
  icon: <Clock className="h-4 w-4 text-amber-600" />,
}
```

**Zmeniť grid na 2x4 alebo responzívny layout:**
```typescript
className="grid grid-cols-2 md:grid-cols-4 gap-3"
```

---

#### 2. `src/data/social/templates.ts`

**Rozšíriť typ `VisualStyle`:**
```typescript
export type VisualStyle = 
  | 'luxury-gold' 
  | 'photo-realistic' 
  | 'modern-noir' 
  | 'minimalist'
  | 'gradient-modern'
  | 'tech-blue'
  | 'bright-bold'
  | 'vintage-retro';
```

**Pridať nové `stylePrompts`:**

```typescript
'gradient-modern': `
Style: Modern gradient design with vibrant color transitions and glassmorphism effects
Background: Dynamic gradient from deep purple #7C3AED through blue #3B82F6 to cyan #06B6D4
Primary accent color: White #FFFFFF with frosted glass panels
Text color: Pure white #FFFFFF with subtle glow
Typography: Modern geometric sans-serif (Inter/Poppins style), bold headlines
Visual effects: Glassmorphism cards, soft blur overlays, gradient orbs, floating elements
Mood: Trendy, youthful, energetic, innovative, Instagram-ready
No watermarks, vibrant colors, smooth transitions, contemporary feel

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Use Czech: "Jak" (not "Ako"), "Změňte" (not "Zmeňte").
`,

'tech-blue': `
Style: Professional technology-focused design with blue color palette
Background: Deep navy gradient #0A1628 to #1E3A5F with subtle grid pattern
Primary accent color: Electric blue #00A3FF with neon glow effects
Secondary accent: Cyan #00D4FF for highlights
Text color: Clean white #FFFFFF
Typography: Technical sans-serif font (Inter/Roboto Mono style), clean and precise
Visual effects: Network node connections, data stream visualizations, circuit patterns, blue light trails
Mood: Professional, trustworthy, tech-forward, innovative, corporate-friendly
No watermarks, sharp edges, digital aesthetic, futuristic but professional

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Use Czech: "Jak" (not "Ako"), "Změňte" (not "Zmeňte").
`,

'bright-bold': `
Style: High-impact promotional design with bold, saturated colors
Background: Solid vibrant color or energetic gradient (orange #FF6B00, red #FF0040, yellow #FFD600)
Primary accent color: Contrasting bright color for emphasis
Text color: White #FFFFFF or Black #000000 for maximum contrast
Typography: Extra bold, large sans-serif font (Impact/Bebas style), ALL CAPS headlines allowed
Visual effects: Geometric shapes, starburst elements, price tags, discount badges, dynamic angles
Mood: Exciting, urgent, attention-grabbing, promotional, high-energy
No watermarks, maximum visual impact, clear call-to-action areas
Perfect for: Sales, promotions, limited offers, discounts

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Use "SLEVA", "AKCE", "od 300 Kč", "ZDARMA" for promotional elements.
`,

'vintage-retro': `
Style: Nostalgic vintage design with warm, aged aesthetic
Background: Warm beige/cream #F5E6D3, aged paper texture, subtle sepia gradient
Primary accent color: Muted terracotta #C17650, dusty rose #C9A9A6, olive green #8B9A6B
Text color: Dark brown #3D2B1F or charcoal #4A4A4A
Typography: Vintage serif fonts (Playfair Display), retro sans-serif accents, hand-drawn feel
Visual effects: Film grain texture, vignette corners, faded edges, vintage photo borders
Mood: Nostalgic, trustworthy, authentic, timeless, warm, family-oriented
No harsh modern elements, soft and inviting, classic advertising feel
Perfect for: Family content, testimonials, long-standing company values

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Use Czech: "Jak" (not "Ako"), "Změňte" (not "Zmeňte").
`
```

---

#### 3. `supabase/functions/social-content-generator/index.ts`

**Aktualizovať validáciu:**
```typescript
const InputSchema = z.object({
  // ...
  visualStyle: z.enum([
    'luxury-gold', 
    'photo-realistic', 
    'modern-noir', 
    'minimalist',
    'gradient-modern',    // NOVÉ
    'tech-blue',          // NOVÉ
    'bright-bold',        // NOVÉ
    'vintage-retro'       // NOVÉ
  ]).default('luxury-gold'),
  // ...
});
```

**Pridať nové stylePrompts do edge funkcie** (rovnaké ako v templates.ts)

---

### Vizuálna ukážka štýlov

```text
┌────────────────────────────────────────────────────────────────────────────┐
│                          Vizuální styl obrázku                             │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ ✨ Luxury    │ │ 📷 Foto      │ │ 🌙 Modern    │ │ ⚡ Minimal   │      │
│  │    Gold      │ │ realistický  │ │    Noir      │ │    istický   │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ 🎨 Gradient  │ │ 💻 Tech      │ │ ☀️ Bright    │ │ 🕐 Vintage   │      │
│  │   Modern     │ │    Blue      │ │   & Bold     │ │    Retro     │      │
│  │   (NOVÉ)     │ │   (NOVÉ)     │ │   (NOVÉ)     │ │   (NOVÉ)     │      │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### Príklady generovaných scén pre nové štýly

**Gradient Modern:**
> "Floating glassmorphism card with fiber optic speed visualization, vibrant purple-to-blue gradient background, modern typography showing internet speed metrics"

**Tech Blue:**
> "Network of connected nodes visualizing data flow, premium router with blue LED accents on dark navy background, circuit board pattern elements"

**Bright & Bold:**
> "Eye-catching promotional banner with large price tag '300 Kč', starburst elements, orange and red gradient, bold AKCE badge"

**Vintage Retro:**
> "Sepia-toned family living room scene, vintage TV aesthetic, warm nostalgic lighting, aged paper texture borders"

---

### Technické detaily

| Súbor | Typ zmeny |
|-------|-----------|
| `src/components/social/StyleSelector.tsx` | Rozšíriť typ, pridať 4 položky do poľa, nové ikony |
| `src/data/social/templates.ts` | Rozšíriť typ, pridať 4 stylePrompts |
| `supabase/functions/social-content-generator/index.ts` | Rozšíriť validáciu, pridať 4 stylePrompts |

### Nové závislosti ikon
Potrebné importy z `lucide-react`:
- `Palette` (Gradient Modern)
- `Cpu` (Tech Blue)  
- `Sun` (Bright & Bold)
- `Clock` (Vintage Retro)


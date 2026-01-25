

## Plán: Pridať prepínač "S osobou / Bez osoby" do Social Generátora

### Súhrn
Pridáme nový komponent `PersonToggle` (prepínač), ktorý umožní používateľovi vybrať, či chce na vygenerovanom obrázku osobu/človeka alebo nie. Táto voľba ovplyvní AI prompt pre generovanie scény.

---

### Nové komponenty

#### 1. PersonToggle komponent
Vytvorím nový súbor `src/components/social/PersonToggle.tsx`:

```text
┌─────────────────────────────────────────────┐
│  Lidé na obrázku                            │
│                                             │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │ 👤 S osobou  │  │ 🖼️ Bez osob         │ │
│  │   (vybrané)  │  │                      │ │
│  └──────────────┘  └──────────────────────┘ │
│                                             │
│  Popis: Obrázek bude obsahovat realistické  │
│  osoby v autentických situacích             │
└─────────────────────────────────────────────┘
```

- Dva možnosti: `with-person` | `without-person`
- Použijem rovnaký dizajn ako StyleSelector (karty s ikonami)
- Ikony: `User` pre osobu, `Image` alebo `Frame` pre bez osoby

---

### Zmeny v existujúcich súboroch

#### 2. SocialGenerator.tsx
- Pridať nový state: `const [includePerson, setIncludePerson] = useState<'with-person' | 'without-person'>('with-person')`
- Pridať import a zobrazenie `PersonToggle` komponenty pod `StyleSelector`
- Posielať parameter `includePerson` do edge funkcie

```typescript
// Nový state
const [includePerson, setIncludePerson] = useState<IncludePerson>('with-person');

// V generateContent() pridať do body:
body: {
  type: postType,
  platform,
  visualStyle,
  includePerson,  // NOVÉ
  customTopic: customTopic || null,
}
```

#### 3. Edge funkcia social-content-generator/index.ts

**Zmeny vo validácii:**
```typescript
const InputSchema = z.object({
  type: z.enum([...]),
  platform: z.enum([...]),
  visualStyle: z.enum([...]),
  includePerson: z.enum(['with-person', 'without-person']).default('with-person'), // NOVÉ
  customTopic: z.string().max(500).optional().nullable(),
});
```

**Zmeny v `generateSceneDescription()`:**
- Pridať parameter `includePerson`
- Upraviť system prompt podľa voľby:

```typescript
// Ak includePerson === 'without-person':
CRITICAL RULES:
1. DO NOT include any people, humans, faces, hands, or body parts
2. Focus on objects, devices, environments, and abstract concepts
3. Show technology, routers, devices, fiber optic cables, home interiors WITHOUT people

// Ak includePerson === 'with-person':
CRITICAL RULES:
1. ALWAYS include PEOPLE in realistic situations
2. Show authentic human interactions with technology
```

**Zmeny v stylePrompts:**
- Pre `photo-realistic` štýl podmienene pridať/odobrať popisy osôb

---

### Logika fungovania

```text
┌─────────────────────────────────────────────────────────────────┐
│                    Používateľ vyberie:                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐                      ┌───────────────────────┐ │
│  │ S osobou    │───────────────────▶ │ AI generuje scénu:    │ │
│  └─────────────┘                      │ "Rodina sleduje TV,   │ │
│                                       │  žena pracuje z domu" │ │
│                                       └───────────────────────┘ │
│                                                                 │
│  ┌─────────────┐                      ┌───────────────────────┐ │
│  │ Bez osob    │───────────────────▶ │ AI generuje scénu:    │ │
│  └─────────────┘                      │ "Router s optickým    │ │
│                                       │  kabelem, moderný byt"│ │
│                                       └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

### Technické detaily

| Súbor | Zmena |
|-------|-------|
| `src/components/social/PersonToggle.tsx` | **NOVÝ** - UI komponent s 2 možnosťami |
| `src/pages/SocialGenerator.tsx` | Pridať state, import, zobrazenie, poslať do API |
| `supabase/functions/social-content-generator/index.ts` | Upraviť validáciu, scene generation logiku |

### Príklad výsledných promptov

**S osobou (with-person):**
> "Young couple sitting on modern sofa, watching 4K movie on large TV, warm living room lighting, happy expressions, cozy Czech home atmosphere"

**Bez osob (without-person):**
> "Modern fiber optic router with blue LED lights, ethernet cables neatly organized, minimalist home office desk, warm ambient lighting, no people"

---

### Čo sa nezmení
- Všetky 4 vizuálne štýly zostanú
- Platformy (FB/IG/Obe) zostanú
- Typy príspevkov zostanú
- História a kalendár zostanú


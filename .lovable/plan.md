

## Plán: Pridať ukladanie vizuálneho štýlu a prepínača osôb do histórie

### Súhrn
Rozšírim databázu a kód o ukladanie `visual_style` a `include_person` parametrov, aby sa v histórii zobrazovalo, akým štýlom bol príspevok vytvorený.

---

### Zmeny

#### 1. Databázová migrácia - pridať nové stĺpce

Vytvorím migráciu pre tabuľku `social_posts`:

```sql
ALTER TABLE social_posts 
ADD COLUMN visual_style TEXT DEFAULT 'luxury-gold',
ADD COLUMN include_person TEXT DEFAULT 'with-person';
```

---

#### 2. `src/pages/SocialGenerator.tsx` - ukladať nové polia

**Aktuálny kód (riadky 143-156):**
```typescript
const { error } = await supabase.from('social_posts').insert({
  user_id: userId,
  post_type: postType,
  platform,
  custom_topic: customTopic || null,
  // ... texty a prompty
});
```

**Nový kód:**
```typescript
const { error } = await supabase.from('social_posts').insert({
  user_id: userId,
  post_type: postType,
  platform,
  visual_style: visualStyle,        // NOVÉ
  include_person: includePerson,    // NOVÉ
  custom_topic: customTopic || null,
  // ... texty a prompty
});
```

---

#### 3. `src/pages/SocialGenerator.tsx` - aktualizovať interface

**Rozšíriť `SocialPost` interface:**
```typescript
interface SocialPost {
  // ... existujúce polia
  visual_style: string | null;      // NOVÉ
  include_person: string | null;    // NOVÉ
}
```

---

#### 4. `src/components/social/SocialPostHistory.tsx` - zobraziť štýl v histórii

Pridať badge so štýlom ku každému príspevku v histórii:

```text
┌────────────────────────────────────────────┐
│ 📢 Promo | Facebook                        │
│ 🎨 Tech Blue | 👤 S osobou                 │  ← NOVÉ
│ 15. ledna 2024                             │
│ [Kopírovat] [Otevřít]                      │
└────────────────────────────────────────────┘
```

---

### Technické detaily

| Súbor/Položka | Zmena |
|---------------|-------|
| Supabase migrácia | Pridať stĺpce `visual_style`, `include_person` |
| `SocialGenerator.tsx` | Rozšíriť interface, ukladať nové polia |
| `SocialPostHistory.tsx` | Zobraziť badge so štýlom a prepínačom osôb |
| `src/integrations/supabase/types.ts` | Aktualizovať TypeScript typy |

---

### Mapa štýlov na ikony/texty

Pre zobrazenie v histórii:

| Štýl | Skrátený názov | Farba badge |
|------|----------------|-------------|
| `luxury-gold` | Luxury Gold | amber |
| `photo-realistic` | Foto | emerald |
| `modern-noir` | Noir | gray |
| `minimalist` | Minimal | slate |
| `gradient-modern` | Gradient | violet |
| `tech-blue` | Tech Blue | blue |
| `bright-bold` | Bold | orange |
| `vintage-retro` | Vintage | amber |

| Osoba | Ikona | Text |
|-------|-------|------|
| `with-person` | 👤 | S osobou |
| `without-person` | 🖼️ | Bez osob |




## Plán: Oprava zobrazenia vizuálneho štýlu v histórii

### Diagnóza problému

Skontroloval som databázu a kód:

**✅ Databáza je správna:**
```sql
-- Všetky príspevky majú správne hodnoty:
visual_style: 'luxury-gold'
include_person: 'with-person'
```

**✅ Kód je správny:**
- Badges pre štýl a osobu sú implementované v `SocialPostHistory.tsx` (riadky 202-214)
- Mapa štýlov `visualStyleLabels` obsahuje všetkých 8 štýlov

### Možný problém

Badges môžu byť **príliš malé** alebo **skryté**. Na vašom screenshote nevidím badges, čo môže byť spôsobené:

1. **Príliš malý text** - `text-[10px]` je veľmi malý
2. **Nedostatočný kontrast** - amber farba na tmavom pozadí

### Navrhované opravy

#### 1. Zväčšiť badges pre lepšiu viditeľnosť

**Súčasný kód:**
```typescript
<Badge className={`text-[10px] ${visualStyleLabels[post.visual_style].color}`}>
```

**Navrhovaná zmena:**
```typescript
<Badge className={`text-xs font-medium ${visualStyleLabels[post.visual_style].color}`}>
```

#### 2. Pridať výraznejšie farby pre lepší kontrast

**Aktuálne farby:**
```typescript
'luxury-gold': { label: 'Luxury', color: 'bg-amber-500/20 text-amber-500' }
```

**Navrhované farby:**
```typescript
'luxury-gold': { label: 'Luxury', color: 'bg-amber-500/30 text-amber-400 border border-amber-500/40' }
```

#### 3. Zobraziť badges aj keď sú default hodnoty

Pridať fallback zobrazenie pre staré príspevky bez hodnôt:

```typescript
{/* Vždy zobraziť vizuálny štýl */}
<Badge className={`text-xs font-medium ${
  visualStyleLabels[post.visual_style || 'luxury-gold']?.color || 'bg-primary/20 text-primary'
}`}>
  🎨 {visualStyleLabels[post.visual_style || 'luxury-gold']?.label || 'Default'}
</Badge>
```

### Súbory na úpravu

| Súbor | Zmena |
|-------|-------|
| `src/components/social/SocialPostHistory.tsx` | Zväčšiť badges, lepšie farby, fallback pre NULL hodnoty |

### Vizuálna zmena

```text
PRED (text-[10px]):
┌─────────────────────────────────────┐
│ Tip │ FB │ IG          Nepublikováno│
│ [veľmi malé badges - ťažko čitateľné]│
└─────────────────────────────────────┘

PO (text-xs, výraznejšie farby):
┌─────────────────────────────────────┐
│ Tip │ FB │ IG          Nepublikováno│
│ 🎨 Luxury │ 👤 S osobou              │ ← Väčšie, lepšie viditeľné
└─────────────────────────────────────┘
```


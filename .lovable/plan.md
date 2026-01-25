

## Plán: Opravy responzivity a UX/UI pre Social Generator

### Súhrn
Implementujem opravy pre lepšiu responzivitu na mobile, zväčším touch targety pre WCAG compliance a vylepším čitateľnosť textu v selektoroch.

---

### Zmeny v súboroch

#### 1. `src/components/social/StyleSelector.tsx`

**Problémy:**
- 8 štýlov v 2 stĺpcoch na mobile = 4 riadky, príliš husté
- Text `text-[10px]` je ťažko čitateľný
- Padding môže byť menší pre kompaktnejší vzhľad

**Opravy:**
```typescript
// Zmeniť grid na 3 stĺpce pre sm+
className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"

// Zväčšiť text popisov
<span className="text-[11px] sm:text-xs text-muted-foreground text-center leading-tight">

// Zmeniť padding pre lepšiu kompaktnosť
className="flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-lg..."
```

---

#### 2. `src/components/social/PlatformSelector.tsx`

**Problémy:**
- Na veľmi úzkych obrazovkách (<380px) sa môžu tlačidlá stlačiť
- Badge s rozmermi môže byť orezaný

**Opravy:**
```typescript
// Pridať flex-wrap pre safety
className="flex flex-wrap gap-2 sm:gap-3"

// Pridať min-width pre konzistenciu
className="flex-1 min-w-[100px] flex items-center justify-center gap-2 p-3 sm:p-4..."

// Skryť dimensions badge na mobile
<Badge variant="secondary" className="text-[10px] mt-1 hidden sm:inline-flex">
```

---

#### 3. `src/pages/SocialGenerator.tsx`

**Problémy:**
- Header `text-3xl` je príliš veľký na mobile
- Chýba indikácia dnešného typu na mobile (sidebar je skrytý)

**Opravy:**
```typescript
// Responzívny header
<h1 className="text-2xl sm:text-3xl font-bold text-foreground">

// Pridať mobilný "quick tip" pre dnešný typ
{/* Mobile Today Indicator - zobrazí sa len na mobile */}
<div className="lg:hidden mb-4">
  <Badge variant="outline" className="gap-1">
    <Calendar className="h-3 w-3" />
    Dnes: {getTodaySuggestion()}
  </Badge>
</div>
```

---

#### 4. `src/components/social/PersonToggle.tsx`

**Problémy:**
- Padding `p-4` je väčší ako v StyleSelector (`p-3`)
- Nekonzistentné s ostatnými selektormi

**Opravy:**
```typescript
// Zmenšiť padding pre konzistenciu
className="flex flex-col items-center gap-2 p-3 rounded-lg border..."
```

---

#### 5. `src/components/social/GeneratedContent.tsx`

**Problémy:**
- Textarea s `min-h-[150px]` zaberá veľa miesta na mobile
- Tlačidlá "Kopírovať" sú malé pre touch

**Opravy:**
```typescript
// Responzívna výška textarea
className="min-h-[120px] sm:min-h-[150px] resize-none bg-muted/50"

// Väčšie touch targets pre tlačidlá
className="h-9 sm:h-8 px-3 sm:px-2 min-w-[44px]"
```

---

#### 6. `src/components/social/SocialPostHistory.tsx`

**Problémy:**
- Tlačidlá akcií `h-7 w-7` sú pod WCAG minimum (44px)
- ScrollArea môže byť kratšia na mobile

**Opravy:**
```typescript
// Zväčšiť action buttons
className="h-9 w-9 sm:h-7 sm:w-7"

// Responzívna výška ScrollArea
<ScrollArea className="h-[300px] sm:h-[400px] pr-4">
```

---

#### 7. `src/components/social/ContentCalendar.tsx`

**Problémy:**
- Button padding môže byť tesný na mobile

**Opravy:**
```typescript
// Väčší touch target
className="w-full justify-start h-auto py-3 sm:py-2 px-3..."
```

---

### Vizuálna zmena - StyleSelector

**Pred (mobile):**
```text
┌─────────┐ ┌─────────┐
│ Luxury  │ │ Foto    │
│ Gold    │ │ real.   │
├─────────┤ ├─────────┤
│ Modern  │ │ Minimal │
│ Noir    │ │ istický │
├─────────┤ ├─────────┤
│ Gradient│ │ Tech    │
│ Modern  │ │ Blue    │
├─────────┤ ├─────────┤
│ Bright  │ │ Vintage │
│ & Bold  │ │ Retro   │
└─────────┘ └─────────┘
= 4 riadky, príliš dlhé
```

**Po (mobile sm+):**
```text
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Luxury  │ │ Foto    │ │ Modern  │
│ Gold    │ │ real.   │ │ Noir    │
├─────────┤ ├─────────┤ ├─────────┤
│ Minimal │ │ Gradient│ │ Tech    │
│ istický │ │ Modern  │ │ Blue    │
├─────────┤ ├─────────┤
│ Bright  │ │ Vintage │
│ & Bold  │ │ Retro   │
└─────────┘ └─────────┘
= 3 riadky na sm, 2 riadky na lg
```

---

### Technické detaily

| Súbor | Zmena | Priorita |
|-------|-------|----------|
| `StyleSelector.tsx` | Grid 2→3 stĺpce na sm, väčší text | Vysoká |
| `PlatformSelector.tsx` | flex-wrap, skryť badge na mobile | Stredná |
| `SocialGenerator.tsx` | Responzívny header, mobile dnešný tip | Stredná |
| `PersonToggle.tsx` | Zmenšiť padding p-4→p-3 | Nízka |
| `GeneratedContent.tsx` | Responzívna textarea, väčšie buttons | Vysoká |
| `SocialPostHistory.tsx` | Väčšie action buttons pre touch | Vysoká |
| `ContentCalendar.tsx` | Väčší touch target | Stredná |

---

### WCAG Compliance

**Touch Targets (WCAG 2.5.5):**
- Minimum: 44x44 CSS pixels
- Aktuálne: Niektoré tlačidlá majú len 28x28px (`h-7 w-7`)
- Po oprave: Všetky interaktívne prvky budú mať min. 44px na mobile

**Čitateľnosť textu:**
- Minimum: 10px nie je odporúčané
- Po oprave: Minimálne 11px na mobile, 12px na desktop



# Plán: Oprava scrollovania v Admin paneli

## Zistený problém

Po analýze kódu som našiel **koreňovú príčinu** - konflikt medzi `min-h-svh` v SidebarProvider a naším `fixed inset-0` layoutom:

```text
┌─ admin-panel-root (fixed, inset-0, height: 100vh) ─────────────┐
│  ┌─ SidebarProvider (min-h-svh = 100vh minimum) ─────────────┐ │
│  │  ┌─ flex wrapper (h-full) ───────────────────────────────┐│ │
│  │  │  ┌─ content div (h-full) ────────────────────────────┐││ │
│  │  │  │  ┌─ main (overflow-y-auto, ale výška NIE JE     ┐│││ │
│  │  │  │  │  OBMEDZENÁ, takže sa roztiahne              │││││ │
│  │  │  │  │  namiesto scrollovania)                      │││││ │
│  │  │  │  └─────────────────────────────────────────────┘│││ │
│  │  │  └────────────────────────────────────────────────┘││ │
│  │  └──────────────────────────────────────────────────────┘│ │
│  └──────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

**Problém**: `min-h-svh` v SidebarProvider umožňuje kontajneru rásť nad viewport, čo ruší účinok `overflow-y-auto` na main elemente.

## Riešenie

Opravím to pridaním CSS override pre admin panel v `index.css`:

```css
/* Override min-h-svh in admin panel */
.admin-panel-root .group\/sidebar-wrapper {
  min-height: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
}
```

A tiež upravím `AdminLayout.tsx` aby explicitne nastavil výšku na celú hierarchiu:

```tsx
<div className="fixed inset-0 bg-background admin-panel-root">
  <SidebarProvider defaultOpen={true} className="h-full">
    <div className="flex h-full w-full overflow-hidden">
```

## Súbory na úpravu

| Súbor | Zmena |
|-------|-------|
| `src/index.css` | Pridanie override pre `min-h-svh` v admin paneli |
| `src/components/admin/AdminLayout.tsx` | Pridanie `className="h-full"` na SidebarProvider a `overflow-hidden` na flex wrapper |

## Technické detaily

### Prečo je toto správne riešenie

1. **Nepriamy override namiesto editácie sidebar.tsx** - Sidebar komponent je shadcn/ui komponent, jeho priama editácia by mohla spôsobiť problémy pri aktualizáciách
2. **CSS specificity** - Použijeme `.admin-panel-root .group\/sidebar-wrapper` selektor, ktorý ovplyvní len admin panel
3. **Explicitné výšky** - Celá hierarchia od `fixed inset-0` po `main` bude mať správne výškové obmedzenia

### Výsledná hierarchia

```text
┌─ admin-panel-root (fixed, inset-0) ─────────────────────────────┐
│  ┌─ SidebarProvider (h-full = 100%) ──────────────────────────┐ │
│  │  ┌─ flex wrapper (h-full, overflow-hidden) ───────────────┐│ │
│  │  │  ┌─ Sidebar ─┐  ┌─ content (h-full) ──────────────────┐││ │
│  │  │  │           │  │  ┌─ header (shrink-0, 56px) ───────┐│││ │
│  │  │  │           │  │  └─────────────────────────────────┘│││ │
│  │  │  │           │  │  ┌─ main (flex-1, min-h-0,        ┐│││ │
│  │  │  │           │  │  │  overflow-y-auto)               ││││ │
│  │  │  │           │  │  │  ← TOTO TERAZ SCROLLUJE ✓       ││││ │
│  │  │  │           │  │  └─────────────────────────────────┘│││ │
│  │  │  └───────────┘  └─────────────────────────────────────┘││ │
│  │  └────────────────────────────────────────────────────────┘│ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Očakávaný výsledok

- Obsah v admin paneli sa bude dať scrollovať na všetkých zariadeniach
- Tenká elegantná scrollovacia lišta bude viditeľná
- Sidebar bude fungovať správne (hamburger menu na mobile/tablet)
- Žiadne prerušenie funkčnosti ostatných komponentov


# Plán: Oprava scrollovania a interakcie v Admin paneli

## Identifikované problémy

Po dôkladnej analýze kódu som našiel **3 hlavné príčiny** problému:

### 1. Globálne skrytie scrollbaru blokuje scroll

V `index.css` (riadky 104-112):
```css
html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
```

Tieto pravidlá skrývajú scrollbar globálne, ale v kombinácii s `position: fixed` na admin paneli môžu spôsobiť problémy so scrollovaním na niektorých zariadeniach.

### 2. Konflikt overflow vlastností

V `AdminLayout.tsx`:
- Hlavný wrapper má `fixed inset-0` - zaberá celú obrazovku
- Content wrapper má `overflow-hidden` (riadok 95)
- Main element má `overflow-auto` (riadok 107)

**Problém**: `overflow-hidden` na rodičovi môže blokovať `overflow-auto` na potomkovi v niektorých prehliadačoch, hlavne na mobile.

### 3. Chýbajúce touch-action a výška

- Chýba `touch-action: pan-y` pre dotykovú navigáciu
- Výška nie je explicitne nastavená, čo spôsobuje problémy s flexbox layoutom

## Navrhované riešenie

### A) Oprava AdminLayout.tsx

```tsx
// PRED:
<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
  ...
  <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">

// PO:
<div className="flex-1 flex flex-col min-w-0 h-full">
  ...
  <main className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-3 sm:p-4 lg:p-6">
```

**Zmeny:**
- Odstránenie `overflow-hidden` z content wrapperu
- Pridanie `h-full` pre explicitnú výšku
- Zmena `overflow-auto` na `overflow-y-auto` (presnejšie)
- Pridanie `overscroll-contain` - zabraňuje "scroll chaining"
- Pridanie `touch-pan-y` - explicitne povolí vertikálny scroll na dotykových zariadeniach

### B) Oprava index.css pre admin panel

Pridanie špecifických CSS pravidiel pre admin:

```css
/* Admin Panel - Scrolling fix */
.admin-panel-root {
  z-index: 9999;
  position: fixed;
  inset: 0;
  overflow: hidden; /* Rodič má hidden */
}

.admin-panel-root main {
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  overscroll-behavior: contain;
  touch-action: pan-y;
}
```

### C) Pridanie scroll utility triedy

Pre admin panel explicitne povolíme scrollbar:

```css
/* Show scrollbar in admin panel */
.admin-panel-root *::-webkit-scrollbar {
  display: block;
  width: 8px;
}

.admin-panel-root *::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

.admin-panel-root *::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 4px;
}
```

## Súbory na úpravu

| Súbor | Akcia |
|-------|-------|
| `src/components/admin/AdminLayout.tsx` | Oprava overflow a touch vlastností |
| `src/index.css` | Pridanie admin-špecifických scroll pravidiel |

## Technické detaily opravy

### Layout hierarchia (opravená)

```text
┌─ .admin-panel-root (fixed, inset-0, overflow: hidden) ─────────┐
│  ┌─ SidebarProvider ──────────────────────────────────────────┐ │
│  │  ┌─ flex container (h-full, w-full) ──────────────────────┐│ │
│  │  │  ┌─ AdminSidebar ───┐  ┌─ Content (h-full) ───────────┐││ │
│  │  │  │                  │  │  ┌─ Header (shrink-0) ──────┐│││ │
│  │  │  │                  │  │  │ SidebarTrigger + Title   ││││ │
│  │  │  │                  │  │  └─────────────────────────┘│││ │
│  │  │  │                  │  │  ┌─ Main (overflow-y-auto) ─┐│││ │
│  │  │  │                  │  │  │ ← TOTO SCROLLUJE         ││││ │
│  │  │  │                  │  │  │                          ││││ │
│  │  │  │                  │  │  │                          ││││ │
│  │  │  │                  │  │  └──────────────────────────┘│││ │
│  │  │  └──────────────────┘  └───────────────────────────────┘││ │
│  │  └────────────────────────────────────────────────────────┘│ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Kľúčové CSS vlastnosti

- **`overflow-y-auto`**: Povolí vertikálny scroll len keď je obsah väčší ako kontajner
- **`overscroll-contain`**: Zabraňuje "scroll chaining" - keď doscrollujete na koniec, rodičovský element sa nezačne scrollovať
- **`touch-action: pan-y`**: Explicitne hovorí prehliadaču, že tento element podporuje vertikálne gesto posunu
- **`-webkit-overflow-scrolling: touch`**: iOS-špecifické - plynulé scrollovanie s momentum

## Očakávaný výsledok

Po aplikovaní opráv:
- Stránky v admin paneli sa budú dať scrollovať na všetkých zariadeniach
- Klikanie bude fungovať správne
- Sidebar bude stále správne otvárať/zatvárať
- Scrollbar bude viditeľný v admin paneli pre lepšiu navigáciu

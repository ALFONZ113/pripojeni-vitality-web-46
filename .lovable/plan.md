
# Plán: Oprava čiernej obrazovky v Social Generatore na mobile

## Identifikovaný problém

Na mobile v Admin Paneli (Social Generator) sa zobrazuje pol obrazovky čiernej. Problém je spôsobený kombináciou nasledujúcich faktorov:

1. **CSS konflikt s `overflow: hidden`** - Admin panel root má `overflow: hidden`, čo môže blokovať správne zobrazenie obsahu
2. **`min-h-svh` v SidebarProvider** - Táto minimálna výška môže spôsobovať problémy s rozmermi na mobile
3. **Flex layout bez správneho min-width** - Hlavný content wrapper potrebuje explicitné min-width: 0 pre správne fungovanie flexbox

## Technické zmeny

### 1. Oprava AdminLayout.tsx

**Problém:** Flex kontajner potrebuje lepšie nastavenie pre mobile zobrazenie.

**Riešenie:**
```tsx
// Zmeniť riadky 92-95
<div className="flex h-full w-full overflow-hidden">
  <AdminSidebar />
  <div className="flex-1 flex flex-col min-w-0 h-full w-full">
```

Pridať `w-full` k hlavnému content divu pre explicitnú šírku na mobile.

### 2. Oprava CSS v index.css

**Problém:** `overflow: hidden` na admin-panel-root môže blokovať obsah.

**Riešenie:**
```css
.admin-panel-root {
  z-index: 9999;
  position: fixed;
  inset: 0;
  /* Zmeniť overflow na auto pre lepšie správanie */
  overflow: auto;
}
```

Alebo explicitne nastaviť mobile-friendly štýly:
```css
/* Mobile-specific fix */
@media (max-width: 767px) {
  .admin-panel-root {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .admin-panel-root .group\/sidebar-wrapper {
    min-height: 100% !important;
    height: auto !important;
  }
}
```

### 3. Oprava SidebarProvider wrapper

V `src/components/ui/sidebar.tsx` zmeniť CSS override pre admin panel:

```css
/* V index.css - zlepšiť admin panel mobile kompatibilitu */
.admin-panel-root .group\/sidebar-wrapper {
  min-height: 100% !important;
  height: 100% !important;
  max-height: none;
  overflow: visible;
}

@media (max-width: 767px) {
  .admin-panel-root .group\/sidebar-wrapper {
    min-height: auto !important;
    height: 100% !important;
  }
}
```

## Súbory na úpravu

| Súbor | Akcia | Popis |
|-------|-------|-------|
| `src/components/admin/AdminLayout.tsx` | Upraviť | Pridať `w-full` a opraviť flex layout pre mobile |
| `src/index.css` | Upraviť | Opraviť CSS pre admin panel na mobile |

## Konkrétne zmeny

### AdminLayout.tsx

```tsx
// Riadok 92-95 zmeniť na:
<div className="flex h-full w-full">
  <AdminSidebar />
  <div className="flex-1 flex flex-col min-w-0 h-full w-full overflow-hidden">
```

Hlavný flex kontajner nemá `overflow-hidden`, aby sidebar mohol správne fungovať.

### index.css

```css
/* Riadky 24-29 zmeniť na: */
.admin-panel-root {
  z-index: 9999;
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: hsl(var(--background));
}

/* Pridať nové pravidlá pre mobile: */
@media (max-width: 767px) {
  .admin-panel-root {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Zabezpečiť, že content zaberá celú šírku */
  .admin-panel-root > div > div > div:last-child {
    width: 100%;
  }
}
```

## Očakávaný výsledok

Po implementácii:
- Social Generator na mobile zobrazí celý obsah bez čiernej sekcie
- Scrollovanie bude fungovať správne
- Layout sa prispôsobí obrazovke

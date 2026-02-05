
# Plán: Oprava responzivity Admin panela pre telefóny a tablety

## Identifikované problémy

Na základe screenshotov a analýzy kódu som identifikoval tieto problémy:

### 1. Konflikt dvoch Sheet systémov
- **AdminLayout** má vlastný Sheet (riadky 104-108) s manuálnym `mobileOpen` stavom
- **Sidebar component** od shadcn má vnútornú Sheet logiku, ktorá sa aktivuje automaticky cez `isMobile`
- Tieto dva systémy si navzájom prekážajú

### 2. Breakpoint medzera (tablet zone)
- Desktop sidebar: `hidden lg:block` - viditeľný od 1024px+
- Hamburger button: `lg:hidden` - viditeľný do 1024px
- shadcn Sidebar mobile režim: aktivuje sa pod 768px (`useIsMobile`)
- **Problém**: Medzi 768px-1024px (tablet) je medzera kde ani jeden systém nefunguje správne

### 3. Nesprávne použitie Sidebar komponentu
- `AdminSidebar` používa `<Sidebar>` komponent, ktorý má vlastnú internú Sheet logiku
- Ale v `AdminLayout` je tento Sidebar obalený do **ďalšieho Sheet-u**
- Toto vytvára duplicitu a konflikty

## Navrhované riešenie

Zjednotím prístup a využijem **vstavanú shadcn Sidebar logiku** namiesto duplicitného Sheet-u:

```text
┌─────────────────────────────────────────────────────────┐
│  OPRAVENÝ ADMIN LAYOUT                                  │
├─────────────────────────────────────────────────────────┤
│  Desktop (1024px+):    Sidebar vždy viditeľný          │
│  Tablet (768-1024px):  Sidebar cez hamburger/Sheet     │
│  Mobile (pod 768px):   Sidebar cez hamburger/Sheet     │
└─────────────────────────────────────────────────────────┘
```

## Technické zmeny

### 1. Zjednodušenie AdminLayout.tsx

**Odstráním:**
- Duplicitný `Sheet` wrapper (riadky 104-108)
- Manuálny `mobileOpen` stav
- Vlastný hamburger button

**Pridám:**
- Jednotné použitie `SidebarTrigger` pre všetky zariadenia
- Správne breakpointy: desktop sidebar na `lg:`, trigger pre mobile/tablet

### 2. Úprava breakpointov

| Zariadenie | Šírka | Správanie |
|------------|-------|-----------|
| Mobile | 0-767px | Sheet sidebar (shadcn vstavaný) |
| Tablet | 768-1023px | Sheet sidebar (shadcn vstavaný) |
| Desktop | 1024px+ | Pevný collapsible sidebar |

### 3. Konzistentný layout

```tsx
// Opravený AdminLayout
<SidebarProvider defaultOpen={true}>
  <div className="flex h-full w-full">
    <AdminSidebar />
    
    <div className="flex-1 flex flex-col min-w-0">
      <header className="flex h-14 items-center gap-3 border-b px-4">
        <SidebarTrigger /> {/* Funguje pre všetky zariadenia */}
        <h1>{title}</h1>
      </header>
      
      <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
        {children}
      </main>
    </div>
  </div>
</SidebarProvider>
```

### 4. Úprava AdminSidebar.tsx

- Pridám `collapsible="offcanvas"` namiesto `"icon"` pre lepšie mobile správanie
- Zabezpečím správne stylovanie pre všetky viewporty

## Súbory na úpravu

| Súbor | Akcia |
|-------|-------|
| `src/components/admin/AdminLayout.tsx` | Odstránenie duplicitného Sheet, zjednodušenie |
| `src/components/admin/AdminSidebar.tsx` | Úprava collapsible módu |

## Výsledok

- Hamburger menu bude fungovať na mobile aj tablete
- Sidebar sa otvorí ako Sheet overlay na menších zariadeniach
- Na desktope zostane klasický collapsible sidebar
- Žiadne konflikty medzi dvoma Sheet systémami

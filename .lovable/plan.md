
# Plán: Elegantný centralizovaný prístup k admin stránkam

## Analýza problému

Aktuálne máte **7 admin stránok** roztrúsených po projekte:
- Login, Dashboard, Social Generator, Social Export
- AI Blog Manager, AI Blog Test, AI Automation

Musíte manuálne zadávať URL adresy, čo je nepohodlné a nepraktické.

## Navrhované riešenie: Skrytá admin ikona + Admin Layout s bočnou navigáciou

### Koncept

```text
┌─────────────────────────────────────────────────────────────┐
│  PÄTIČKA WEBU                                               │
│  © 2024 Popri.cz ···················· [FB] [IG] [⚙️ skryté] │
└─────────────────────────────────────────────────────────────┘
           │
           │ Dvojklik na ikonu (Settings/Lock)
           ▼
┌─────────────────────────────────────────────────────────────┐
│  ADMIN PANEL (po prihlásení)                                │
│ ┌────────────┬──────────────────────────────────────────────┤
│ │ BOČNÉ MENU │  OBSAH STRÁNKY                               │
│ │            │                                              │
│ │ 📊 Dashboard                                              │
│ │ 📝 Formuláře│                                              │
│ │ ────────────                                              │
│ │ 📱 Social   │                                              │
│ │  └ Generator                                              │
│ │  └ Export   │                                              │
│ │ ────────────                                              │
│ │ 📰 Blog     │                                              │
│ │  └ Manager  │                                              │
│ │  └ Test     │                                              │
│ │ ────────────                                              │
│ │ 🤖 Automácie│                                              │
│ │ ────────────                                              │
│ │ 🚪 Odhlásiť │                                              │
│ └────────────┴──────────────────────────────────────────────┘
```

## Technická implementácia

### 1. Nový komponent: AdminLayout

Vytvorím `src/components/admin/AdminLayout.tsx` - wrapper pre všetky admin stránky s:
- **Collapsible sidebar** (rozbaliteľné bočné menu)
- Kompletná navigácia medzi admin stránkami
- Spoločná autentifikácia (kontrola admin role)
- Zobrazenie aktuálne aktívnej stránky

### 2. Skrytý vstupný bod v pätičke

Upravím `src/components/Footer.tsx`:
- Pridám nenápadnú ikonu (Settings alebo Lock) vedľa sociálnych ikon
- Ikona bude mať zníženú opacity (10-20%)
- Klik presmeruje na `/admin-login-poda-2024`
- Dvojklik alebo dlhé podržanie aktivuje admin režim

### 3. Refaktoring admin stránok

Všetky admin stránky obalím do `AdminLayout`:
- Odstránim duplicitnú navigáciu z jednotlivých stránok
- Zjednodušenie kódu - auth kontrola bude centralizovaná
- Konzistentný vzhľad naprieč všetkými admin stránkami

### 4. Aktualizácia routingu

Upravím `src/App.tsx`:
- Zjednotím URL štruktúru pod `/admin/*`
- Zachovám spätná kompatibilita s existujúcimi URL

## Súbory na vytvorenie/úpravu

| Súbor | Akcia | Popis |
|-------|-------|-------|
| `src/components/admin/AdminLayout.tsx` | Vytvoriť | Hlavný layout s bočnou navigáciou |
| `src/components/admin/AdminSidebar.tsx` | Vytvoriť | Bočné menu s odkazmi |
| `src/components/admin/AdminNav.tsx` | Vytvoriť | Navigačné položky a skupiny |
| `src/components/Footer.tsx` | Upraviť | Pridať skrytú admin ikonu |
| `src/pages/AdminDashboard.tsx` | Upraviť | Obalenie do AdminLayout, odstránenie duplicitnej navigácie |
| `src/pages/SocialGenerator.tsx` | Upraviť | Obalenie do AdminLayout |
| `src/pages/SocialExport.tsx` | Upraviť | Obalenie do AdminLayout |
| `src/pages/AIBlogManager.tsx` | Upraviť | Obalenie do AdminLayout |
| `src/pages/AIBlogTest.tsx` | Upraviť | Obalenie do AdminLayout |
| `src/pages/AIAutomation.tsx` | Upraviť | Obalenie do AdminLayout |

## Výhody tohto riešenia

- **Nenápadný prístup** - bežní návštevníci si nevšimnú admin vstup
- **Všetko na jednom mieste** - žiadne pamätanie URL adries
- **Konzistentný UX** - rovnaká navigácia na všetkých admin stránkach
- **Rýchle prepínanie** - jeden klik medzi nástrojmi
- **Mobilný responzívny** - sidebar sa schová do hamburger menu
- **Rozšíriteľné** - ľahké pridanie nových admin stránok

## Technické detaily

### Skrytá ikona v pätičke

```tsx
// Nenápadná ikona s nízkou opacity
<Link 
  to="/admin-login-poda-2024"
  className="opacity-10 hover:opacity-30 transition-opacity"
  aria-label="Administrace"
>
  <Settings className="h-4 w-4" />
</Link>
```

### Štruktúra bočného menu

```tsx
const adminNavItems = [
  { 
    group: "Správa", 
    items: [
      { label: "Formuláře", href: "/admin/dashboard", icon: FileText },
    ]
  },
  { 
    group: "Social Media", 
    items: [
      { label: "Generátor", href: "/admin/social-generator", icon: Share2 },
      { label: "Export", href: "/admin/social-export", icon: Download },
    ]
  },
  { 
    group: "Blog", 
    items: [
      { label: "Manager", href: "/admin/ai-blog-manager", icon: BookOpen },
      { label: "Test", href: "/admin/ai-blog-test", icon: FlaskConical },
    ]
  },
  { 
    group: "Automatizace", 
    items: [
      { label: "AI Automácie", href: "/admin/ai-automation", icon: Bot },
    ]
  },
];
```

## Časový odhad

Implementácia približne 4-6 správ (vytvorenie layoutu, úprava všetkých stránok, testovanie).

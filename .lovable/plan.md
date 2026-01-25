

## Plán: Pridať rýchlu navigáciu do Admin Dashboardu

### Súhrn
Pridám navigačné tlačidlá do headeru Admin Dashboardu pre rýchly prístup k Social Generatoru a ďalším admin nástrojom bez potreby písania URL.

---

### Riešenie

Pridám panel s rýchlymi odkazmi do headeru Admin Dashboardu:

```text
┌─────────────────────────────────────────────────────────────┐
│ Administrace PODA                                           │
│ Správa formulářových žádostí                                │
│                                                             │
│ [📱 Social Generator] [📝 AI Blog] [🤖 Automácie] [Odhlásit]│
└─────────────────────────────────────────────────────────────┘
```

---

### Zmeny v súboroch

#### `src/pages/AdminDashboard.tsx`

**1. Pridať import ikony:**
```typescript
import { 
  // ... existujúce ikony
  Share2,  // pre Social Generator
  BookOpen, // pre AI Blog
  Bot,     // pre Automácie
} from "lucide-react";
```

**2. Upraviť header (riadky 293-303):**

Súčasný kód:
```typescript
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
  <div>
    <h1 className="text-3xl font-bold">Administrace PODA</h1>
    <p className="text-muted-foreground">Správa formulářových žádostí</p>
  </div>
  <Button variant="outline" onClick={handleLogout}>
    <LogOut className="h-4 w-4 mr-2" />
    Odhlásit se
  </Button>
</div>
```

Nový kód:
```typescript
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
  <div>
    <h1 className="text-3xl font-bold">Administrace PODA</h1>
    <p className="text-muted-foreground">Správa formulářových žádostí</p>
  </div>
  
  {/* Rýchla navigácia */}
  <div className="flex flex-wrap items-center gap-2">
    <Button 
      variant="default" 
      onClick={() => navigate('/admin/social-generator')}
      className="gap-2"
    >
      <Share2 className="h-4 w-4" />
      <span className="hidden sm:inline">Social Generator</span>
      <span className="sm:hidden">Social</span>
    </Button>
    
    <Button 
      variant="outline" 
      onClick={() => navigate('/admin/ai-blog-manager')}
      className="gap-2"
    >
      <BookOpen className="h-4 w-4" />
      <span className="hidden sm:inline">AI Blog</span>
    </Button>
    
    <Button 
      variant="outline" 
      onClick={() => navigate('/admin/ai-automation')}
      className="gap-2"
    >
      <Bot className="h-4 w-4" />
      <span className="hidden sm:inline">Automácie</span>
    </Button>
    
    <Button variant="ghost" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline ml-2">Odhlásit se</span>
    </Button>
  </div>
</div>
```

---

### Vizuálna zmena

**Desktop:**
```text
┌──────────────────────────────────────────────────────────────────┐
│ Administrace PODA                                                │
│ Správa formulářových žádostí                                     │
│                                                                  │
│         [📱 Social Generator] [📝 AI Blog] [🤖 Automácie] [↪ Odhlásit]
└──────────────────────────────────────────────────────────────────┘
```

**Mobile:**
```text
┌────────────────────────────────┐
│ Administrace PODA             │
│ Správa formulářových žádostí  │
│                               │
│ [📱 Social] [📝] [🤖] [↪]     │
└────────────────────────────────┘
```

---

### Technické detaily

| Zmena | Popis |
|-------|-------|
| Import ikon | `Share2`, `BookOpen`, `Bot` |
| Social Generator tlačidlo | Primárny variant (výrazný) |
| AI Blog, Automácie | Outline variant |
| Odhlásit | Ghost variant (menej výrazný) |
| Responzivita | Skryté texty na mobile, len ikony |

---

### Alternatíva: Dropdown menu

Ak by bolo príliš veľa tlačidiel, môžem použiť dropdown:

```text
[☰ Nástroje ▼] [Odhlásit]
    ├── 📱 Social Generator
    ├── 📝 AI Blog Manager  
    └── 🤖 AI Automácie
```

Ale pre 3-4 nástroje sú priame tlačidlá rýchlejšie a prehľadnejšie.


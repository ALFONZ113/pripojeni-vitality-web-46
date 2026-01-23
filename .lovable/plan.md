

# Plán: Pridanie image promptov do histórie príspevkov

## Problém

Image prompty sa **už ukladajú** do databázy (`facebook_image_prompt`, `instagram_image_prompt`), ale:
1. V komponente `SocialPostHistory.tsx` **chýbajú** tieto polia v interface
2. V detaile príspevku sa **nezobrazujú** prompty na skopírovanie

## Riešenie

### 1. Aktualizovať interface SocialPost

**Súbor:** `src/components/social/SocialPostHistory.tsx`

Pridať chýbajúce polia do interface:

```typescript
interface SocialPost {
  id: string;
  post_type: string;
  platform: string;
  custom_topic: string | null;
  facebook_text: string | null;
  facebook_hashtags: string | null;
  facebook_image_prompt: string | null;  // ← PRIDAŤ
  facebook_image_url: string | null;
  instagram_text: string | null;
  instagram_hashtags: string | null;
  instagram_image_prompt: string | null;  // ← PRIDAŤ
  instagram_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}
```

### 2. Pridať zobrazenie image promptov v detaile

**Súbor:** `src/components/social/SocialPostHistory.tsx`

Pre Facebook sekciu (za riadok 312):
```tsx
{selectedPost.facebook_image_prompt && (
  <div className="mt-3 p-3 rounded bg-background border border-border">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-muted-foreground">
        🖼️ Image Prompt
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2"
        onClick={() => {
          navigator.clipboard.writeText(selectedPost.facebook_image_prompt!);
          toast.success('Prompt skopírovaný!');
        }}
      >
        <Copy className="h-3 w-3 mr-1" />
        Kopírovať
      </Button>
    </div>
    <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
      {selectedPost.facebook_image_prompt}
    </p>
  </div>
)}
```

Podobne pre Instagram sekciu (za riadok 332).

### 3. Pridať import ikony Copy

```typescript
import { Copy } from 'lucide-react';
```

### 4. Aktualizovať interface v SocialGenerator.tsx

**Súbor:** `src/pages/SocialGenerator.tsx`

Pridať rovnaké polia do interface:
```typescript
interface SocialPost {
  // ... existujúce polia
  facebook_image_prompt: string | null;  // ← PRIDAŤ
  instagram_image_prompt: string | null;  // ← PRIDAŤ
}
```

---

## Výsledok

Po otvorení detailu príspevku v histórii uvidíte:

```text
┌─────────────────────────────────────────┐
│ 📘 Facebook text                        │
│ [text príspevku...]                     │
│ #hashtagy                               │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🖼️ Image Prompt      [Kopírovať]  │ │
│ │ Social media image for Facebook... │ │
│ │ SCENE: Elderly couple sitting...   │ │
│ │ Topic: Tarif pro důchodce          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

- Prompt na obrázok bude zobrazený v čitateľnom formáte
- Tlačidlo **Kopírovať** pre rýchle skopírovanie do schránky
- Rovnako pre Facebook aj Instagram sekciu

## Technické zmeny

| Súbor | Zmeny |
|-------|-------|
| `src/components/social/SocialPostHistory.tsx` | Rozšíriť interface, pridať zobrazenie promptov s kopírovaním |
| `src/pages/SocialGenerator.tsx` | Rozšíriť interface o image_prompt polia |


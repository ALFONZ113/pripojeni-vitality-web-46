

# Plán: Upozornenie o spotrebe kreditov v Social Generatore

## Prehľad

Pridať informatívny panel do Social Generátora, ktorý upozorní používateľa na spotrebu AI kreditov pri generovaní obsahu.

## Čo pridáme

### 1. Nový komponent: CreditUsageInfo

**Súbor:** `src/components/social/CreditUsageInfo.tsx`

Informatívny panel zobrazujúci:
- Koľko AI požiadaviek spotrebuje každá akcia
- Tip na šetrenie kreditov
- Odkaz na správu workspace kreditov

```tsx
import { AlertCircle, Zap, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CreditUsageInfoProps {
  platform: 'facebook' | 'instagram' | 'both';
}

export function CreditUsageInfo({ platform }: CreditUsageInfoProps) {
  // Calculate estimated requests based on platform
  const textRequests = platform === 'both' ? 2 : 1; // Text generation
  const sceneRequests = platform === 'both' ? 2 : 1; // Scene generation
  const totalRequests = textRequests + sceneRequests;
  
  return (
    <Alert className="border-amber-500/50 bg-amber-500/10">
      <Zap className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-600 dark:text-amber-400">
        Spotreba AI kreditov
      </AlertTitle>
      <AlertDescription className="text-sm space-y-2">
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-between text-muted-foreground">
            <span>Generovanie textu:</span>
            <span className="font-medium">{textRequests} požiadaviek</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Generovanie scény:</span>
            <span className="font-medium">{sceneRequests} požiadaviek</span>
          </div>
          <div className="flex justify-between font-medium text-foreground border-t pt-1 mt-1">
            <span>Celkom na príspevok:</span>
            <span className="text-amber-600">{totalRequests} AI požiadaviek</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          💡 Tip: Generuj len pre jednu platformu naraz, aby si ušetril kredity.
        </p>
        
        <a 
          href="https://lovable.dev/settings" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
        >
          <ExternalLink className="h-3 w-3" />
          Skontrolovať využitie kreditov
        </a>
      </AlertDescription>
    </Alert>
  );
}
```

### 2. Pridať komponent do SocialGenerator.tsx

**Súbor:** `src/pages/SocialGenerator.tsx`

Pridať import a komponent pred tlačidlo "Generovať obsah":

```tsx
// Import
import { CreditUsageInfo } from '@/components/social/CreditUsageInfo';

// V CardContent, pred Button
<CreditUsageInfo platform={platform} />

<Button
  onClick={generateContent}
  disabled={isGenerating}
  className="w-full"
  size="lg"
>
  ...
</Button>
```

### 3. Pridať upozornenie o generovaní obrázkov

Ak používateľ generuje obrázok, pridať info že to tiež spotrebuje kredity:

```tsx
// V GeneratedContent komponente alebo priamo v SocialGenerator
<p className="text-xs text-muted-foreground">
  ⚡ Generovanie obrázka = +1 AI požiadavka
</p>
```

## Vizuálny náhľad

```text
┌─────────────────────────────────────────────────┐
│ ⚡ Spotreba AI kreditov                          │
├─────────────────────────────────────────────────┤
│ Generovanie textu:        2 požiadaviek         │
│ Generovanie scény:        2 požiadaviek         │
│ ───────────────────────────────────────────     │
│ Celkom na príspevok:      4 AI požiadaviek      │
│                                                 │
│ 💡 Tip: Generuj len pre jednu platformu         │
│    naraz, aby si ušetril kredity.               │
│                                                 │
│ 🔗 Skontrolovať využitie kreditov →             │
└─────────────────────────────────────────────────┘
```

## Zmeny v súboroch

| Súbor | Zmeny |
|-------|-------|
| `src/components/social/CreditUsageInfo.tsx` | **Nový súbor** - informatívny panel o spotrebe kreditov |
| `src/pages/SocialGenerator.tsx` | Import a zobrazenie CreditUsageInfo pred tlačidlom generovania |

## Dynamické počítanie

Panel automaticky počíta požiadavky podľa zvolenej platformy:
- **Obe platformy**: 4 AI požiadavky (2× text + 2× scéna)
- **Jedna platforma**: 2 AI požiadavky (1× text + 1× scéna)
- **+ Generovanie obrázka**: +1 požiadavka za každý obrázok

## Výhody

- Používateľ vie, koľko kreditov spotrebuje pred generovaním
- Jasný tip na šetrenie kreditov
- Priamy odkaz na kontrolu využitia v Lovable dashboard
- Dynamické zobrazenie podľa zvolenej platformy


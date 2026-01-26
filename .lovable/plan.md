

## Plán: Pridať tlačidlá na zdieľanie blogových článkov na sociálne siete

### Čo urobím

Pridám viditeľné tlačidlá na zdieľanie článkov na sociálne siete (Facebook, X/Twitter, LinkedIn, kopírovanie URL) priamo na stránku blogového článku. Pri zdieľaní na Facebook sa automaticky načíta obrázok článku vďaka už existujúcim Open Graph meta tagom.

---

### Riešenie

```text
┌─────────────────────────────────────────────────────────────┐
│  📅 25. 01. 2026  |  👤 Autor                               │
│                                                             │
│  Proč internet doma zpomaluje večer?                        │
│                                                             │
│  [📘 Facebook] [🐦 Twitter] [💼 LinkedIn] [📋 Kopírovat URL] │
└─────────────────────────────────────────────────────────────┘
```

---

### Zmeny v súboroch

#### 1. `src/components/blog/BlogPostSocialActions.tsx` - Kompletná prepracovanie

Nahradím generické "Sdílet" tlačidlo špecifickými tlačidlami pre sociálne siete:

```typescript
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '../ui/button';

interface BlogPostSocialActionsProps {
  postTitle: string;
  postExcerpt?: string;
  postUrl?: string;
}

const BlogPostSocialActions = ({ postTitle, postExcerpt, postUrl }: BlogPostSocialActionsProps) => {
  const [copied, setCopied] = useState(false);
  const url = postUrl || window.location.href;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(postTitle);
  const encodedExcerpt = encodeURIComponent(postExcerpt || '');

  // Facebook share - automaticky načíta og:image z URL
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      'facebook-share',
      'width=600,height=400'
    );
  };

  // Twitter/X share
  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      'twitter-share',
      'width=600,height=400'
    );
  };

  // LinkedIn share
  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      'linkedin-share',
      'width=600,height=400'
    );
  };

  // Kopírovanie URL
  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('URL zkopírována do schránky');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Sdílet:</span>
      
      <Button variant="outline" size="sm" onClick={shareToFacebook}>
        <Facebook className="h-4 w-4 mr-1" />
        Facebook
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareToTwitter}>
        <Twitter className="h-4 w-4 mr-1" />
        Twitter
      </Button>
      
      <Button variant="outline" size="sm" onClick={shareToLinkedIn}>
        <Linkedin className="h-4 w-4 mr-1" />
        LinkedIn
      </Button>
      
      <Button variant="outline" size="sm" onClick={copyUrl}>
        {copied ? <Check className="h-4 w-4 mr-1" /> : <Link2 className="h-4 w-4 mr-1" />}
        {copied ? 'Zkopírováno' : 'Kopírovat URL'}
      </Button>
    </div>
  );
};

export default BlogPostSocialActions;
```

#### 2. `src/components/blog/BlogPostHeader.tsx` - Pridať social actions

Pridám import a zobrazenie tlačidiel pod nadpisom:

```typescript
import BlogPostSocialActions from './BlogPostSocialActions';

// V komponente po <p> s excerpt:
<div className="mt-6 pt-6 border-t border-border">
  <BlogPostSocialActions 
    postTitle={post.title}
    postExcerpt={post.excerpt}
  />
</div>
```

---

### Ako funguje zdieľanie s obrázkom na Facebook

Facebook automaticky načíta obrázok z `og:image` meta tagu, ktorý už máš správne nastavený v `BlogPostSEO.tsx`:

```html
<meta property="og:image" content="https://popri.cz/blog-images/article-image.jpg" />
```

Keď používateľ klikne na "Facebook", Facebook crawler:
1. Navštívi URL článku
2. Prečíta `og:image`, `og:title`, `og:description`
3. Zobrazí náhľad s obrázkom v zdieľacom dialógu

---

### Vizuálna podoba

**Desktop:**
```text
┌─────────────────────────────────────────────────────────────────┐
│  Tipy a rady  |  📅 25. 01. 2026  |  👤 Autor                   │
│                                                                 │
│  Proč internet doma zpomaluje večer? (A jak to vyřešit)        │
│                                                                 │
│  Sedíš večer na pohovce, chceš si pustit seriál...             │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  Sdílet: [📘 Facebook] [🐦 Twitter] [💼 LinkedIn] [📋 Kopírovat]│
└─────────────────────────────────────────────────────────────────┘
```

**Mobile:**
```text
┌───────────────────────────────┐
│  Sdílet:                      │
│  [📘 FB] [🐦 TW] [💼 LI] [📋] │
└───────────────────────────────┘
```

---

### Súbory na úpravu

| Súbor | Zmena |
|-------|-------|
| `src/components/blog/BlogPostSocialActions.tsx` | Nové tlačidlá pre FB, Twitter, LinkedIn, Copy |
| `src/components/blog/BlogPostHeader.tsx` | Import a zobrazenie social actions |

---

### Technické poznámky

- **Facebook obrázok**: Automaticky z `og:image` - už funguje správne
- **Popup okná**: Otvárajú sa v malom okne (600x400) pre lepší UX
- **Responzívny dizajn**: Na mobile sa zobrazia len ikony bez textu
- **Feedback**: Po skopírovaní URL sa zobrazí toast notifikácia


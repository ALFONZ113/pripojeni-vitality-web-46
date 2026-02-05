import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
 import { Download, Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
 import { AdminLayout } from '@/components/admin/AdminLayout';
interface BrandingConfig {
  companyName: string;
  website: string;
  phone: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headlineFont: string;
  bodyFont: string;
  mainService: string;
  priceFrom: string;
  benefits: string;
  language: 'cs' | 'sk' | 'en';
}

const defaultConfig: BrandingConfig = {
  companyName: '',
  website: '',
  phone: '',
  tagline: '',
  primaryColor: '#D4A517',
  secondaryColor: '#1A1A2E',
  backgroundColor: '#0A0A0A',
  textColor: '#F5F0E8',
  headlineFont: 'Playfair Display',
  bodyFont: 'Inter',
  mainService: '',
  priceFrom: '',
  benefits: '',
  language: 'cs',
};

const generateReplicationPrompt = (config: BrandingConfig): string => {
  const benefitsArray = config.benefits.split('\n').filter(b => b.trim());
  
  return `# Social Media Generator - Replikačný Prompt pre ${config.companyName || '[NÁZOV FIRMY]'}

---

## 0. AUTOMATICKÁ ANALÝZA WEBU

**⚠️ PRED IMPLEMENTÁCIOU VYKONAJ TIETO KROKY:**

### Krok 1: Prečítaj existujúci kód projektu
\`\`\`
1. Otvor a prečítaj tailwind.config.ts - extrahuj farby (primary, secondary, background)
2. Otvor a prečítaj src/index.css - identifikuj CSS premenné (--background, --foreground, --primary)
3. Otvor a prečítaj src/pages/Index.tsx - identifikuj hlavnú službu, ceny, výhody
4. Otvor a prečítaj src/components/Navbar.tsx - extrahuj názov firmy z loga
5. Otvor a prečítaj src/components/Footer.tsx - extrahuj kontaktné údaje (telefón, email, adresa)
\`\`\`

### Krok 2: Extrahuj branding z kódu
Z prečítaného kódu vyplň nasledujúce hodnoty:
- **Názov firmy**: Z loga v Navbar alebo <title> tagu v index.html
- **Primárna farba**: Z tailwind.config.ts -> theme.extend.colors.primary alebo CSS --primary
- **Sekundárna farba**: Z tailwind.config.ts -> theme.extend.colors.secondary
- **Fonty**: Z tailwind.config.ts -> theme.extend.fontFamily (headline + body)
- **Služby/Produkty**: Z Hero sekcie, TariffSection alebo hlavného obsahu Index.tsx
- **Kontakt (telefón, email)**: Z Footer alebo ContactSection

### Krok 3: Doplň chýbajúce hodnoty
Ak niektoré hodnoty nie sú v kóde, použi hodnoty z konfigurácie nižšie (SEKCIA 1).
Ak ani tam nie sú, použi placeholder \`[DOPLŇ]\` a upozorni používateľa.

### Krok 4: Pokračuj s implementáciou
S extrahovaným brandingom vytvor Social Generator podľa sekcií 1-12 nižšie.
**Dôležité:** Hodnoty z kódu majú prednosť pred hodnotami z konfigurácie!

---

## 🎯 ÚLOHA

Vytvor kompletný Social Media Generator pre **${config.companyName || '[NÁZOV FIRMY]'}** s nasledujúcou konfiguráciou.

---

## 1. BRANDING KIT

\`\`\`typescript
export const brandingConfig = {
  colors: {
    primary: '${config.primaryColor}',
    secondary: '${config.secondaryColor}',
    background: '${config.backgroundColor}',
    text: '${config.textColor}',
  },
  typography: {
    headline: '${config.headlineFont}',
    body: '${config.bodyFont}',
  },
  company: {
    name: '${config.companyName}',
    website: '${config.website}',
    phone: '${config.phone}',
    tagline: '${config.tagline}',
  },
  services: {
    main: '${config.mainService}',
    priceFrom: '${config.priceFrom}',
    benefits: [
${benefitsArray.map(b => `      '${b.trim()}'`).join(',\n') || "      '[VÝHODA 1]',\n      '[VÝHODA 2]',\n      '[VÝHODA 3]'"}
    ],
  },
  language: '${config.language}',
};
\`\`\`

---

## 2. ARCHITEKTÚRA SYSTÉMU

\`\`\`
src/
├── pages/
│   └── SocialGenerator.tsx          # Hlavná stránka
├── components/social/
│   ├── PostTypeSelector.tsx         # Voľba typu príspevku (6 typov)
│   ├── PlatformSelector.tsx         # Facebook/Instagram/Both
│   ├── StyleSelector.tsx            # 8 vizuálnych štýlov
│   ├── PersonToggle.tsx             # S osobou/bez osoby
│   ├── GeneratedContent.tsx         # Výstup s editáciou
│   ├── ContentCalendar.tsx          # Týždenný plán
│   ├── SocialPostHistory.tsx        # História príspevkov
│   └── CreditUsageInfo.tsx          # Info o kreditoch
└── data/social/
    └── templates.ts                 # Konfigurácia štýlov a promptov

supabase/functions/
├── social-content-generator/        # Dvojstupňová AI generácia textu
└── ai-generate-image/               # Gemini Flash Image generátor
\`\`\`

---

## 3. TYPY PRÍSPEVKOV

\`\`\`typescript
export type PostType = 'promo' | 'blog' | 'review' | 'tip' | 'news' | 'custom';

export const postTypes = [
  { id: 'promo', name: 'Promo/Akce', icon: 'Tag', description: 'Propagácia cien a akciových ponúk' },
  { id: 'blog', name: 'Blog článok', icon: 'FileText', description: 'Zdieľanie blogových článkov' },
  { id: 'review', name: 'Recenzia', icon: 'Star', description: 'Zákaznícke recenzie a testimonials' },
  { id: 'tip', name: 'Tip/Rada', icon: 'Lightbulb', description: 'Užitočné tipy a rady' },
  { id: 'news', name: 'Novinka', icon: 'Newspaper', description: 'Novinky a aktualizácie' },
  { id: 'custom', name: 'Vlastný', icon: 'Pencil', description: 'Vlastná téma' },
];
\`\`\`

---

## 4. VIZUÁLNE ŠTÝLY (8 možností)

\`\`\`typescript
export type VisualStyle = 
  | 'luxury-gold'      // Zlaté akcenty, prémiový vzhľad
  | 'photo-realistic'  // Realistické fotky, domácí atmosféra
  | 'modern-noir'      // Tmavý, profesionálny
  | 'minimalist'       // Čistý, svetlý dizajn
  | 'gradient-modern'  // Živé gradienty
  | 'tech-blue'        // Tech/korporátny modrý
  | 'bright-bold'      // Výrazné promo farby
  | 'premium-ad';      // Temné pozadie + oranžové svetlo (9:16)
\`\`\`

---

## 5. PLATFORMOVÉ ŠPECIFIKÁCIE

\`\`\`typescript
export const platformSpecs = {
  facebook: { 
    dimensions: '1080x1350',  // 4:5 vertical
    maxTextLength: 2000, 
    hashtagLimit: 10 
  },
  instagram: { 
    dimensions: '1080x1080',  // 1:1 square
    maxTextLength: 2200, 
    hashtagLimit: 30 
  },
  stories: {
    dimensions: '1080x1920',  // 9:16 vertical
  }
};
\`\`\`

---

## 6. ŠTÝL PROMPTY

Každý vizuálny štýl má vlastný prompt. Príklad pre luxury-gold:

\`\`\`typescript
'luxury-gold': \`
Style: Luxury noir and gold editorial design
Background: Deep black gradient starting from ${config.backgroundColor}
Primary accent: ${config.primaryColor} with subtle glow
Text: ${config.textColor}
Typography: ${config.headlineFont} for headlines, ${config.bodyFont} for body
Mood: Premium, modern, trustworthy, sophisticated

Company: ${config.companyName}
Service: ${config.mainService}

CRITICAL LANGUAGE REQUIREMENT:
All visible text MUST be in ${config.language === 'cs' ? 'Czech (čeština)' : config.language === 'sk' ? 'Slovak (slovenčina)' : 'English'}.
No watermarks, photorealistic quality.
\`,
\`\`\`

---

## 7. EDGE FUNCTION: social-content-generator

Dvojstupňová AI generácia:

1. **Generuj text príspevku** (v cieľovom jazyku)
2. **Generuj unikátny popis scény** (anglicky pre lepšie výsledky)

\`\`\`typescript
// Používa Lovable AI Gateway
const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${LOVABLE_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemini-3-flash-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
  }),
});
\`\`\`

---

## 8. EDGE FUNCTION: ai-generate-image

\`\`\`typescript
// Generovanie obrázkov cez Gemini Flash Image
const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${LOVABLE_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash-image-preview',
    messages: [{ role: 'user', content: enhancedPrompt }],
    modalities: ['image', 'text'],
  }),
});

// Uloženie do Supabase Storage
const { data, error } = await supabase.storage
  .from('ai-blog-images')
  .upload(fileName, imageBuffer, { contentType: 'image/png' });
\`\`\`

---

## 9. DATABÁZOVÁ SCHÉMA

\`\`\`sql
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  post_type TEXT NOT NULL,
  platform TEXT NOT NULL,
  visual_style TEXT,
  include_person TEXT,
  custom_topic TEXT,
  facebook_text TEXT,
  facebook_hashtags TEXT,
  facebook_image_prompt TEXT,
  facebook_image_url TEXT,
  instagram_text TEXT,
  instagram_hashtags TEXT,
  instagram_image_prompt TEXT,
  instagram_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own posts" ON social_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts" ON social_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON social_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON social_posts
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

---

## 10. IMPLEMENTAČNÝ POSTUP

1. ✅ Vytvor databázovú schému (social_posts + RLS)
2. ✅ Vytvor Storage bucket (ai-blog-images)
3. ✅ Vytvor frontend komponenty podľa štruktúry
4. ✅ Adaptuj templates.ts s brandingom vyššie
5. ✅ Vytvor edge functions (social-content-generator + ai-generate-image)
6. ✅ Pridaj route do App.tsx
7. ✅ Otestuj end-to-end

---

## 11. KRITICKÉ PRAVIDLÁ

| Pravidlo | Hodnota |
|----------|---------|
| **Jazyk v obrázkoch** | ${config.language === 'cs' ? 'Čeština' : config.language === 'sk' ? 'Slovenčina' : 'Angličtina'} |
| **Facebook aspect ratio** | 4:5 (1080x1350) |
| **Instagram aspect ratio** | 1:1 (1080x1080) |
| **Stories aspect ratio** | 9:16 (1080x1920) |
| **PersonToggle** | Striktne dodržiavať s/bez osoby |
| **Počet obrázkov** | Vždy LEN jeden na platformu |

---

## 12. KONTAKT & BRANDING

- **Firma**: ${config.companyName || '[NÁZOV]'}
- **Web**: ${config.website || '[WEB]'}
- **Telefón**: ${config.phone || '[TELEFÓN]'}
- **Slogan**: ${config.tagline || '[SLOGAN]'}
- **Hlavná služba**: ${config.mainService || '[SLUŽBA]'}
- **Cena od**: ${config.priceFrom || '[CENA]'}

---

*Vygenerované pomocou Social Generator Export Tool*
*Dátum: ${new Date().toLocaleDateString('cs-CZ')}*
`;
};

export default function SocialExport() {
  const [config, setConfig] = useState<BrandingConfig>(defaultConfig);
  const [copied, setCopied] = useState(false);

  const updateConfig = (field: keyof BrandingConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = () => {
    const prompt = generateReplicationPrompt(config);
    const blob = new Blob([prompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `social-generator-${config.companyName?.toLowerCase().replace(/\s+/g, '-') || 'replication'}-prompt.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Prompt úspěšně stažen!');
  };

  const handleCopy = async () => {
    const prompt = generateReplicationPrompt(config);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success('Prompt zkopírován do schránky!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Export Social Generator | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

       <AdminLayout title="Export Social Generator" description="Vytvořte replikační prompt pro jiný web">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Firemní údaje */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Firemní údaje</CardTitle>
                <CardDescription>Základní informace o firmě</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Název firmy</Label>
                  <Input
                    id="companyName"
                    value={config.companyName}
                    onChange={(e) => updateConfig('companyName', e.target.value)}
                    placeholder="např. MojeInternetová"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Web</Label>
                  <Input
                    id="website"
                    value={config.website}
                    onChange={(e) => updateConfig('website', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={config.phone}
                    onChange={(e) => updateConfig('phone', e.target.value)}
                    placeholder="+420 123 456 789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Slogan</Label>
                  <Input
                    id="tagline"
                    value={config.tagline}
                    onChange={(e) => updateConfig('tagline', e.target.value)}
                    placeholder="Váš spolehlivý partner"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Jazyk</Label>
                  <Select value={config.language} onValueChange={(v) => updateConfig('language', v as 'cs' | 'sk' | 'en')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Čeština</SelectItem>
                      <SelectItem value="sk">Slovenčina</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Služby */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Služby</CardTitle>
                <CardDescription>Hlavní nabídka a výhody</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mainService">Hlavní služba</Label>
                  <Input
                    id="mainService"
                    value={config.mainService}
                    onChange={(e) => updateConfig('mainService', e.target.value)}
                    placeholder="např. Optický internet"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceFrom">Cena od</Label>
                  <Input
                    id="priceFrom"
                    value={config.priceFrom}
                    onChange={(e) => updateConfig('priceFrom', e.target.value)}
                    placeholder="např. 399 Kč/měsíc"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Výhody (každá na novém řádku)</Label>
                  <Textarea
                    id="benefits"
                    value={config.benefits}
                    onChange={(e) => updateConfig('benefits', e.target.value)}
                    placeholder="Rychlost až 1 Gbps&#10;Bez datového limitu&#10;Technická podpora 24/7"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Barvy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Barvy</CardTitle>
                <CardDescription>Firemní barevná paleta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primární</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="primaryColor"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig('primaryColor', e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.primaryColor}
                        onChange={(e) => updateConfig('primaryColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Sekundární</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="secondaryColor"
                        value={config.secondaryColor}
                        onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.secondaryColor}
                        onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Pozadí</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="backgroundColor"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="textColor"
                        value={config.textColor}
                        onChange={(e) => updateConfig('textColor', e.target.value)}
                        className="w-12 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={config.textColor}
                        onChange={(e) => updateConfig('textColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typografia */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Typografie</CardTitle>
                <CardDescription>Fonty pro nadpisy a texty</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headlineFont">Font nadpisů</Label>
                  <Input
                    id="headlineFont"
                    value={config.headlineFont}
                    onChange={(e) => updateConfig('headlineFont', e.target.value)}
                    placeholder="např. Playfair Display"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFont">Font textu</Label>
                  <Input
                    id="bodyFont"
                    value={config.bodyFont}
                    onChange={(e) => updateConfig('bodyFont', e.target.value)}
                    placeholder="např. Inter"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Alert */}
          <Alert className="mt-6 border-primary/30 bg-primary/5">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              <strong>Automatická analýza:</strong> Nemusíte vyplnit všechna pole. 
              AI v cílovém projektu automaticky extrahuje chybějící hodnoty z existujícího kódu 
              (barvy z Tailwindu, kontakty z Footeru, služby z hlavní stránky).
            </AlertDescription>
          </Alert>

          {/* Export tlačidla */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleDownload} className="flex-1" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Stáhnout .md soubor
                </Button>
                <Button onClick={handleCopy} variant="outline" className="flex-1" size="lg">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      Zkopírováno!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      Kopírovat do schránky
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Stažený prompt vložte do Lovable chatu v cílovém projektu. AI automaticky analyzuje web a vytvoří přizpůsobený Social Generator.
              </p>
            </CardContent>
          </Card>
        </div>
       </AdminLayout>
    </>
  );
}

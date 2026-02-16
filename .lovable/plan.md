
# Oprava mobilného zobrazenia + Aktuálne info z webu

## Problem 1: Mobilné zobrazenie

Na screenshote je vidieť, že po vygenerovaní obsahu sa zobrazuje iba hlavička karty "Facebook 1080x1350", ale obsah (texty, hashtagy, image prompt) nie je viditeľný - zobrazuje sa len čierna plocha.

**Príčina**: Komponenta `GeneratedContent` používa tmavé pozadie (`bg-muted/50`) na textáreách, a v kombinácii s dark theme adminu sa text stáva neviditeľný alebo karty majú nedostatočný kontrast. Taktiež na mobile zaberajú karty veľa priestoru a navigačné tlačidlá "Regenerovat vše" / "Uložit" môžu byť odrezané.

**Riešenie**:
- Pridať explicitné `text-foreground` na všetky textáreá v `GeneratedContent`
- Na mobile zobraziť content karty vertikálne s lepším paddingom
- Tlačidlá "Regenerovat vše" a "Uložit" na mobile zobraziť pod sebou (`flex-col sm:flex-row`)
- Zmenšiť min-height textáreí na mobile

## Problem 2: Aktuálne informácie z webu

Keď používateľ zadá tému typu "novinky vo svete AI", generátor momentálne nemá prístup k aktuálnym informáciám - AI vymýšľa obsah z tréningových dát.

**Riešenie**: Integrovať Perplexity API (kľúč `PERPLEXITY_API_KEY` je už nakonfigurovaný) do edge funkcie `social-content-generator`. Pred generovaním textu sa najprv vyhľadajú aktuálne informácie cez Perplexity, a tie sa pridajú do promptu ako kontext.

## Technické zmeny

### 1. `src/components/social/GeneratedContent.tsx`
- Pridať `text-foreground` triedy na všetky textáreá a labely
- Tlačidlá wrap na mobile: `flex flex-col sm:flex-row`
- Zmenšiť `min-h` textáreí na mobile (`min-h-[100px] sm:min-h-[120px]`)

### 2. `src/pages/SocialGenerator.tsx`
- Tlačidlá "Regenerovat vše" / "Uložit" na mobile pod sebou
- Navigačné tlačidlá lepší spacing na mobile
- Content grid `gap-4` namiesto `gap-6` na mobile

### 3. `src/components/social/StepProgress.tsx`
- Na mobile zmenšiť padding krokov (`px-2 py-1 sm:px-3 sm:py-1.5`)
- Scrollovateľné s `-webkit-overflow-scrolling: touch`

### 4. `supabase/functions/social-content-generator/index.ts`
- Pridať novú funkciu `searchCurrentInfo(topic, apiKey)` ktorá volá Perplexity API (`sonar` model) a získa aktuálne informácie k téme
- Pred generovaním textu sa zavolá Perplexity search s témou
- Výsledky (max 200 slov) sa pridajú do system promptu ako `AKTUÁLNÍ KONTEXT Z WEBU: ...`
- Perplexity sa volá iba ak je zadaná customTopic (vlastná téma) - pre generické typy nie
- Citácie z Perplexity sa pridajú do výstupu ako `sources[]`

Príklad upraveného promptu:
```
Jsi expert na sociální sítě pro popri.cz...

AKTUÁLNÍ KONTEXT Z WEBU (ověřené informace):
- OpenAI právě vydalo GPT-5 s novými schopnostmi...
- Google oznámil Gemini 2.0 Ultra...
[Zdroje: techcrunch.com, theverge.com]

Napiš Facebook příspěvek o: novinky ve světě AI
```

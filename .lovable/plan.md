

# Vylepšenie Social Generátora - funkcie z Junkert AI Studio

## Čo pridáme

Z projektu [Junkert AI Studio](/projects/da30a0f2-c78b-4a25-bf4c-d9ae5b04b484) prenesieme tieto vylepšenia do aktuálneho Social Generátora:

### 1. Nové typy príspevkov (4 nové)
- **Úspěch zákazníka** - príbehy spokojených zákazníkov (nahradí "Recenzia" za rozšírenú verziu)
- **Produkt** - prezentácia konkrétneho tarifu alebo služby
- **Realistická foto** - fotorealistický vizuál s autentickou atmosférou
- **Meme / Humor** - vtipný formát pre virálny dosah
- **Edukace** - naučte publikum niečo nové o internete
- **Facebook Ads** - reklamná kampaň pre Facebook Ads Manager

### 2. Wizard UI so Step Progress
Namiesto jedného dlhého formulára - prehľadný krokový wizard:
Typ -> Platforma -> Styl -> Osoba -> Téma -> Obsah

Každý krok sa zobrazí až po dokončení predchádzajúceho.

### 3. CTA Toggle
Nový prepínač: S CTA tlačidlom / Bez CTA na obrázku. Edge funkcia dostane parameter `withCTA` a podľa neho upraví image prompt.

### 4. AI návrh témy
Tlačidlo "Nechat AI navrhnout téma" - edge funkcia dostane nový action `suggest-topic` a vygeneruje originálne téma podľa typu príspevku.

### 5. Regenerácia jednotlivých častí
Možnosť pregenerovať zvlášť text, hashtagy alebo image prompt bez regenerovania celého obsahu.

### 6. Facebook Ads pole
Pre typ "Facebook Ads" - extra polia: Headline (max 40 znakov), Popis odkazu (max 30 znakov), CTA tlačidlo.

### 7. Počítadlo znakov
Zobrazenie aktuálneho počtu znakov s farebným indikátorom (zelená = optimum, žltá = varovanie, červená = príliš dlhý).

### 8. Platform mockup preview
Náhľad príspevku ako by vyzeral na Facebooku/Instagrame - s avatárom, menom a správnym aspect ratio.

### 9. Stiahnutie obrázka
Tlačidlo na stiahnutie vygenerovaného obrázka ako PNG.

### 10. Použiť ako šablonu
V histórií tlačidlo na načítanie starého príspevku ako šablóny pre nový.

### 11. Tabs UI
Záložky "Generátor" a "Historie" namiesto sidebar layoutu.

## Technické zmeny

### Súbory na úpravu

| Súbor | Akcia |
|---|---|
| `src/data/social/templates.ts` | Pridať 4 nové PostType (product, photo, meme, education, fb-ad, success), pridať WizardState interface, pridať Facebook Ads platform |
| `src/pages/SocialGenerator.tsx` | Prepísať na wizard UI s Tabs (Generátor/Historie), StepProgress, krokovou logikou |
| `src/components/social/PostTypeSelector.tsx` | Aktualizovať na 10 typov s emoji ikonami namiesto Lucide ikon |
| `src/components/social/PlatformSelector.tsx` | Pridať "Facebook Ad" platformu |
| `src/components/social/GeneratedContent.tsx` | Pridať regeneráciu častí, CharCounter, platform mockup, download, FB Ads polia |
| `src/components/social/SocialPostHistory.tsx` | Pridať "Použiť ako šablonu" a mazanie |
| `supabase/functions/social-content-generator/index.ts` | Pridať action "suggest-topic", regenerateOnly logiku, withCTA parameter, fb-ad/meme/education/photo špeciálne inštrukcie |

### Nové súbory

| Súbor | Popis |
|---|---|
| `src/components/social/StepProgress.tsx` | Krokový indikátor wizardu (Typ -> Platforma -> Styl -> Osoba -> Téma -> Obsah) |
| `src/components/social/CTAToggle.tsx` | Prepínač CTA tlačidla na obrázku |
| `src/components/social/TopicInput.tsx` | Textové pole s AI návrhom témy |

### Komponenty na zmazanie (nahradené)

| Súbor | Dôvod |
|---|---|
| `src/components/social/ContentCalendar.tsx` | Nahradená inline badge v SocialGenerator |
| `src/components/social/CreditUsageInfo.tsx` | Integrácia priamo do GeneratedContent |

### Databáza
Existujúca tabuľka `social_posts` bude potrebovať nové stĺpce:
- `with_cta` (boolean)
- `ad_headline` (text, nullable)
- `ad_description` (text, nullable)  
- `ad_cta` (text, nullable)
- `status` (text, default 'draft')

### Edge funkcia - kľúčové zmeny
- Nový action `suggest-topic` s rotáciou kategórií a vylúčením predtým navrhnutých tém
- `regenerateOnly` parameter pre čiastočnú regeneráciu (text/hashtags/imagePrompt)
- `withCTA` parameter ovplyvňujúci image prompt
- Špeciálne inštrukcie pre nové typy (meme humor, edukačná infografika, realistická foto, Facebook Ads s extra poľami)
- Branding zachovaný pre popri.cz (nie overdostupnost.cz)

## Čo zostane rovnaké
- Autentifikácia cez AdminLayout (nie AuthGate)
- Vizuálne štýly (luxury-gold, photo-realistic atď.) - zostanú pôvodné 8 štýlov z tohto projektu
- Custom person / PersonUploader funkcionalita
- Branding pre popri.cz


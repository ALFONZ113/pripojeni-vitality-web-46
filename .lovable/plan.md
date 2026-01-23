
# Plán: Úprava Social Media Generátora - Dva typy promptov

## Čo chcete

1. **Odstrániť** checkbox "Generovať obrázky automaticky"
2. **Zachovať** 4 vizuálne štýly ako voľbu **typu promptu**:
   - 🌟 **Luxury Gold** - zlaté akcenty, luxusný dizajn
   - 📷 **Foto realistický** - fotografie s ľuďmi, domáca atmosféra
   - 🌙 **Modern Noir** - tmavý, profesionálny
   - ⚡ **Minimalistický** - čistý, jednoduchý
3. Výstup = text + hashtags + **kompletný image prompt na skopírovanie** do Google AI Studio

## Zmeny v súboroch

### 1. Odstrániť checkbox pre automatické generovanie

**Súbor:** `src/pages/SocialGenerator.tsx`

```text
ODSTRÁNIŤ (riadky 333-349):
- Celú sekciu s Checkbox "Generovať obrázky automaticky"
- State premennú generateImages a setGenerateImages
- Parameter generateImages z volania edge function
```

**Pred:**
```tsx
{/* Generate Images Checkbox */}
<div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30 border border-border">
  <Checkbox ... />
  ...
</div>
```

**Po:**
```tsx
(Táto sekcia bude úplne odstránená)
```

### 2. Aktualizovať edge function

**Súbor:** `supabase/functions/social-content-generator/index.ts`

```text
ODSTRÁNIŤ:
- generateImages parameter z InputSchema
- generateImages logiku (riadky 327-331)
- Funkciu generateImage (voliteľne, ak sa nebude používať)

PONECHAŤ:
- Generovanie textu
- Generovanie kompletného imagePrompt podľa zvoleného štýlu
- Všetky 4 štýly s ich špecifickými promptami
```

### 3. Zachovať StyleSelector bez zmien

**Súbor:** `src/components/social/StyleSelector.tsx`

Tento súbor zostáva bez zmien - 4 štýly sú správne definované:
- `luxury-gold` - Luxury Gold
- `photo-realistic` - Foto realistický  
- `modern-noir` - Moderní Noir
- `minimalist` - Minimalistický

---

## Workflow po zmene

1. Vyberiete **typ príspevku** (promo, tip, blog...)
2. Vyberiete **platformu** (Facebook, Instagram, oboje)
3. Vyberiete **štýl/typ promptu**:
   - 🌟 Luxury Gold → image prompt s zlatými akcentmi
   - 📷 Foto realistický → image prompt s fotkou ľudí, rodiny
4. Zadáte **tému** (voliteľné)
5. Kliknete **"Generovať obsah"**
6. Dostanete:
   - ✅ Český text príspevku
   - ✅ Hashtagy
   - ✅ **Kompletný image prompt** (na skopírovanie do Google AI Studio)
7. **Žiadne automatické generovanie obrázkov**

---

## Technické zmeny

| Súbor | Akcia |
|-------|-------|
| `src/pages/SocialGenerator.tsx` | Odstrániť checkbox a `generateImages` state |
| `supabase/functions/social-content-generator/index.ts` | Odstrániť `generateImages` parameter a logiku |

---

## Výsledok

- **Jednoduchšie UI** - bez checkboxu pre automatické generovanie
- **4 typy promptov** na výber podľa štýlu
- **Kompletný image prompt** vždy v odpovedi (bez generovania obrázkov)
- Používateľ si prompt **skopíruje** a vloží do Google AI Studio manuálne

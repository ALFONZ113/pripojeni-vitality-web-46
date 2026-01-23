
# Plán: Oprava jazyka v generovaných obrázkoch

## Problém

Používateľ zadá tému v slovenčine (napr. "Ako optimalizovať WiFi signál v byte"), ale obrázok obsahuje slovenský text namiesto českého. Na screenshote vidíme:
- "Ako optimalizovať signál WiFi v byte" (slovensky)
- "Umiestnite router správne" (slovensky)
- "Zmeňte WiFi kanál" (slovensky)

Malo by byť:
- "Jak optimalizovat signál WiFi v bytě" (česky)
- "Umístěte router správně" (česky)
- "Změňte WiFi kanál" (česky)

## Príčina

V edge function `social-content-generator/index.ts` sa customTopic pridáva priamo do image promptu bez prekladu alebo jazykovej inštrukcie:

```javascript
if (customTopic) {
  imagePromptContent += `\nTopic/theme: ${customTopic}`;
}
```

Tiež chýba explicitná inštrukcia v `brandingPrompt`, že text v obrázkoch musí byť česky.

---

## Riešenie

### 1. Aktualizovať `brandingPrompt` v edge function

**Súbor:** `supabase/functions/social-content-generator/index.ts`

Pridať explicitnú inštrukciu o českom jazyku:

```javascript
const brandingPrompt = `
Style: Luxury noir and gold editorial design with professional photography quality
Background: Deep black gradient starting from #0A0A0A
Primary accent color: Rich gold/amber #D4A517 with subtle glow effects
Text color: Warm cream white #F5F0E8
Typography: Elegant serif font (Playfair Display style) for headlines, clean sans-serif for body text
Visual effects: Subtle glassmorphism panels, golden fiber optic light trails, soft ambient lighting
Mood: Premium, modern, trustworthy, sophisticated
No watermarks, no text artifacts, photorealistic quality

CRITICAL LANGUAGE REQUIREMENT:
All text, headlines, labels, and any written content visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language for visible text.
Use proper Czech diacritics: ě, š, č, ř, ž, ý, á, í, é, ů, ú, ď, ť, ň.
Examples: "Jak" (not "Ako"), "Umístěte" (not "Umiestnite"), "Změňte" (not "Zmeňte"), "Použijte" (not "Použite").
`;
```

### 2. Aktualizovať spracovanie customTopic

**Súbor:** `supabase/functions/social-content-generator/index.ts`

Zmeniť spôsob, akým sa téma pridáva do image promptu - pridať inštrukciu na preklad:

```javascript
// Aktuálne (riadky 204-210):
let imagePromptContent = template.imagePrompt;
if (customTopic) {
  imagePromptContent += `\nTopic/theme: ${customTopic}`;
}

// Nové:
let imagePromptContent = template.imagePrompt;
if (customTopic) {
  imagePromptContent += `\nTopic/theme (translate to Czech if needed): ${customTopic}`;
  imagePromptContent += `\nIMPORTANT: If the topic above is in Slovak or any other language, translate ALL text in the image to Czech.`;
}
```

### 3. Aktualizovať `brandingConfig` v templates.ts

**Súbor:** `src/data/social/templates.ts`

Pre konzistentnosť pridať rovnakú jazykovú inštrukciu aj do `imagePromptBase`:

```javascript
export const brandingConfig = {
  // ... existujúce farby a typografia ...
  imagePromptBase: `
Style: Luxury noir and gold editorial design with professional photography quality
...
CRITICAL: All visible text in the image MUST be in Czech language (čeština).
`.trim(),
};
```

### 4. Aktualizovať jednotlivé template imagePrompts

**Súbor:** `supabase/functions/social-content-generator/index.ts`

Pridať do každého `imagePrompt` v `postTemplates` poznámku o českom jazyku, napríklad:

```javascript
tip: {
  // ...
  imagePrompt: `Educational tip social media infographic.
Lightbulb icon with golden glow effect on noir background.
Clean numbered list or bullet point layout space.
Tech/internet theme icons (router, WiFi signal, speed meter) in gold.
Easy to read, informative modern design.
ALL TEXT MUST BE IN CZECH: Use "Jak", "Tipy", "Zlepšete" etc.`,
  // ...
}
```

---

## Súbory na úpravu

| Súbor | Zmeny |
|-------|-------|
| `supabase/functions/social-content-generator/index.ts` | Aktualizovať `brandingPrompt`, spracovanie `customTopic`, a všetky `imagePrompt` šablóny |
| `src/data/social/templates.ts` | Aktualizovať `brandingConfig.imagePromptBase` a všetky `imagePromptBase` v šablónach |

---

## Výsledok po implementácii

Keď používateľ zadá tému v slovenčine (napr. "Ako optimalizovať WiFi signál v byte"):

1. Text príspevku bude v češtine ✅ (už funguje)
2. Image prompt bude obsahovať explicitnú inštrukciu:
   - "ALL TEXT MUST BE IN CZECH"
   - Príklady správnych českých slov
3. Vygenerovaný obrázok bude mať text v češtine:
   - "Jak optimalizovat signál WiFi v bytě"
   - "Umístěte router správně"
   - "Změňte WiFi kanál"

---

## Technické poznámky

- Gemini image model (google/gemini-2.5-flash-image-preview) rešpektuje jazykové inštrukcie v prompte
- Explicitná zmienka o rozdiele medzi slovenčinou a češtinou pomáha AI rozlíšiť tieto podobné jazyky
- Pridanie príkladov správnych českých slov zlepšuje presnosť


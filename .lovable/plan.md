

# Plán: Oprava image promptov - Dynamické scény podľa témy

## Problém

Image prompt pre každý typ príspevku je **statický** - vždy opisuje router so svetelnými efektmi:

```text
"Fiber optic cables with light trails on dark background.
Modern router device with subtle rim lighting."
```

Aj keď zadáte inú tému (napr. "WiFi optimalizace", "Home office"), prompt stále vytvorí router s efektmi a len zmení text.

## Riešenie

Upraviť edge function tak, aby AI **dynamicky generovala scénu podľa témy** namiesto použitia statického opisu.

## Technické zmeny

### 1. Aktualizovať edge function

**Súbor:** `supabase/functions/social-content-generator/index.ts`

Pridať **druhú AI požiadavku**, ktorá vygeneruje špecifický image prompt podľa témy:

```typescript
// Najprv AI vygeneruje kreatívny popis scény podľa témy
const sceneResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
  // ...
  body: JSON.stringify({
    model: 'google/gemini-3-flash-preview',
    messages: [
      {
        role: 'system',
        content: `You are an expert at creating detailed image prompts for AI image generators.
Based on the topic, create a UNIQUE scene description.
DO NOT just use a router with light effects for everything.

For different topics, create different scenes:
- WiFi tips → person adjusting router position, checking signal on phone
- Home office → woman/man working comfortably from home with laptop
- Family internet → family together on sofa watching TV
- Gaming/streaming → young person at gaming setup
- Speed/performance → creative visualization of speed (not just cables)
- Price promotion → focus on value, happy customer

ALWAYS describe PEOPLE and REAL SCENES, not just abstract routers with effects.`
      },
      {
        role: 'user',
        content: `Create unique image scene for topic: ${customTopic || type}
Style: ${visualStyle}
Platform: ${plat}`
      }
    ],
  }),
});
```

### 2. Nová logika generovania image promptu

**Pred (aktuálne):**
```text
1. Vezmi statický imagePrompt z template (vždy router)
2. Pridaj tému na koniec
3. Pridaj branding štýl
→ Výsledok: Vždy podobný obrázok
```

**Po (nové):**
```text
1. AI vygeneruje unikátnu scénu podľa témy
2. Kombinuj s branding štýlom (luxury-gold / photo-realistic)
3. Pridaj technické požiadavky (rozmery, jazyk)
→ Výsledok: Rôzne obrázky pre rôzne témy
```

### 3. Príklady vygenerovaných scén

**Téma: "WiFi optimalizace"**
```text
SCENE: Young woman in modern apartment checking WiFi signal strength 
on her smartphone. She's standing near a window, adjusting the 
position of a small router on a shelf. Natural daylight, modern 
minimalist interior with plants.
Czech headline: "Tipy pro lepší WiFi signál"
```

**Téma: "Home office internet"**
```text
SCENE: Professional woman in her 30s working from home office. 
Comfortable desk setup with laptop, coffee mug. Large window 
with natural light. She looks relaxed and productive, video 
call visible on screen.
Czech headline: "Stabilní internet pro práci z domova"
```

**Téma: "Rodinný internet"**
```text
SCENE: Happy Czech family of four sitting together on comfortable 
sofa. Parents with two children watching movie on large TV. 
Cozy living room, evening lighting. Everyone smiling, relaxed 
family atmosphere.
Czech headline: "Gigabit internet pro celou rodinu"
```

## Aktualizované súbory

| Súbor | Zmeny |
|-------|-------|
| `supabase/functions/social-content-generator/index.ts` | Pridať AI generovanie scény, aktualizovať system prompt pre dynamické scény |

## Výsledok

- **Rôzne témy = Rôzne obrázky** (nie len zmena textu)
- **Ľudia a reálne scény** namiesto abstraktných routerov
- **Photo-realistic štýl** bude mať vždy ľudí v reálnych situáciách
- **Luxury-gold štýl** môže mať aj ľudí, ale s luxusnými efektmi

## Príklad porovnania

| Téma | Teraz (rovnaký obrázok) | Po úprave (unikátny) |
|------|------------------------|---------------------|
| WiFi tipy | Router + svetelné efekty | Osoba nastavujúca router |
| Home office | Router + svetelné efekty | Žena pracujúca z domu |
| Rodina | Router + svetelné efekty | Rodina na gauči u TV |
| Gaming | Router + svetelné efekty | Gamer pri počítači |


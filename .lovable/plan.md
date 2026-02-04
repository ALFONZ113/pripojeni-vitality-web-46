

# Plán: Vylepšenie Social Export promptu

## Problém

Aktuálny prompt v `SocialExport.tsx` obsahuje iba statické hodnoty z formulára. **Chýba mu sekcia 0 - AUTOMATICKÁ ANALÝZA**, ktorá by inštruovala AI v Lovable, aby:

1. Prečítala existujúci kód projektu
2. Extrahovala farby z `tailwind.config.ts` alebo CSS
3. Identifikovala služby/produkty z obsahu stránok
4. Automaticky doplnila chýbajúce hodnoty

## Riešenie

Pridám na začiatok generovaného promptu novú sekciu **"SEKCIA 0: AUTOMATICKÁ ANALÝZA"** s detailnými inštrukciami.

## Zmeny v súbore `src/pages/SocialExport.tsx`

### Nová sekcia na začiatku promptu (za riadkom 52):

```markdown
## 0. AUTOMATICKÁ ANALÝZA WEBU

**PRED IMPLEMENTÁCIOU VYKONAJ TIETO KROKY:**

### Krok 1: Prečítaj existujúci kód
\`\`\`
1. Otvor a prečítaj tailwind.config.ts - extrahuj farby (primary, secondary, background)
2. Otvor a prečítaj index.css - identifikuj CSS premenné (--background, --foreground, --primary)
3. Otvor a prečítaj src/pages/Index.tsx - identifikuj hlavnú službu, ceny, výhody
4. Otvor a prečítaj src/components/Navbar.tsx - extrahuj názov firmy z loga
5. Otvor a prečítaj src/components/Footer.tsx - extrahuj kontaktné údaje
\`\`\`

### Krok 2: Extrahuj branding
Z prečítaného kódu vyplň nasledujúce hodnoty:
- **Názov firmy**: Z loga alebo <title> tagu
- **Primárna farba**: Z tailwind.config.ts -> theme.extend.colors.primary
- **Fonty**: Z tailwind.config.ts -> theme.extend.fontFamily
- **Služby/Produkty**: Z Hero sekcie alebo TariffSection
- **Kontakt**: Z Footer alebo ContactSection

### Krok 3: Doplň chýbajúce hodnoty
Ak niektoré hodnoty nie sú v kóde, použi placeholder [DOPLŇ] a upozorni používateľa.

### Krok 4: Pokračuj s implementáciou
S extrahovaným brandingom vytvor Social Generator podľa sekcií 1-12 nižšie.

---
```

### Prečo je to dôležité

Keď používateľ vloží tento prompt do **nového Lovable projektu**, AI:

1. **Automaticky prečíta existujúci kód** (tailwind, komponenty)
2. **Extrahuje farby, fonty, služby** bez manuálneho zadávania
3. **Vytvorí Social Generator presne pre daný web**

## Dodatočné vylepšenia

### Pridať poznámku do formulára

Pod formulár pridám info box vysvetľujúci, že AI automaticky doplní chýbajúce hodnoty:

```tsx
<Alert>
  <AlertDescription>
    Nemusíte vyplniť všetko. AI automaticky extrahuje chýbajúce hodnoty 
    z existujúceho kódu v cieľovom projekte (farby, fonty, služby).
  </AlertDescription>
</Alert>
```

## Implementačný postup

1. Upraviť `generateReplicationPrompt()` - pridať SEKCIA 0 na začiatok
2. Pridať inštrukcie pre AI na čítanie súborov
3. Pridať info Alert do UI formulára
4. Otestovať export a overiť, že prompt obsahuje správne inštrukcie


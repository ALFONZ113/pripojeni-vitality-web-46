
# Plán: Skrytie bočného scrollbaru

## Problém
Na pravej strane obrazovky je viditeľný bočný scrollbar (posuvník), ktorý narúša plnú šírku stránky. Používateľ chce, aby stránka bola na celú plochu bez viditeľného scrollbaru, ale stále so zachovanou možnosťou scrollovania.

## Riešenie
Pridám CSS pravidlá do `src/index.css`, ktoré skryjú scrollbar na všetkých prehliadačoch, ale zachovajú funkcionalitu scrollovania.

## Technické detaily

### Súbor na úpravu: `src/index.css`

Pridám tieto CSS pravidlá do sekcie `@layer base`:

```css
/* Hide scrollbar but keep functionality */
html {
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

html::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}
```

### Ako to funguje:
1. **`scrollbar-width: none`** - Skryje scrollbar v Firefox
2. **`-ms-overflow-style: none`** - Skryje scrollbar v IE a Edge
3. **`::-webkit-scrollbar { display: none }`** - Skryje scrollbar v Chrome, Safari a Opera
4. **`-webkit-overflow-scrolling: touch`** - Zachová plynulé scrollovanie na iOS zariadeniach

### Výhody:
- Stránka bude na celú šírku obrazovky
- Scrollovanie ostane plne funkčné
- Kompatibilné so všetkými modernými prehliadačmi
- Lepší vizuálny dojem na mobile aj desktope

## Poradie implementácie
1. Upraviť `html` pravidlo v `@layer base` sekcii
2. Pridať `::-webkit-scrollbar` pseudo-element
3. Overiť funkcionalitu na mobile a desktope



## Oprava blogu O2/Nej.cz — 2 problémy

### Problém 1: Tlačidlo bez viditeľného textu (fotka 2)

**Príčina:** V `index.css` riadok 746-748 je pravidlo `.blog-content a { @apply text-primary; }` ktoré prepíše `text-white` na všetkých odkazoch. Navyše riadky 851-861 — wildcard selektor `div[class*="bg-green"] *` pridáva `!text-foreground` na VŠETKY deti farebných boxov. Výsledok: tlačidlo `bg-primary` (zlaté) má zlatý/foreground text = neviditeľný.

**Riešenie:** Pridať CSS výnimku pre CTA tlačidlá (odkazy so štýlom tlačidla) v `.blog-content`:

```css
/* CTA buttons in blog content - preserve their colors */
.blog-content a[class*="bg-primary"],
.blog-content a[class*="bg-orange"],
.blog-content a[class*="bg-green"],
.blog-content a[class*="bg-white"] {
  @apply !text-white font-medium;
}
.blog-content a[class*="bg-white"] {
  @apply !text-primary;
}
```

### Problém 2: Obrázok článku (fotka 1)

Obrázok `/o2-nej-vs-poda-comparison.jpg` existuje v `public/` priečinku a zobrazuje sa. Ak chceš iný/lepší obrázok, budem potrebovať nový súbor. Ak je problém v zobrazení, opravím CSS.

### Súbory na úpravu
- `src/index.css` — pridať CSS pravidlá pre CTA tlačidlá v blog-content (za riadok 920)


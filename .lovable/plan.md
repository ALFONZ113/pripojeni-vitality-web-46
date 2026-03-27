

## Prečo Facebook neukazuje náhľadový obrázok pri zdieľaní blogu

### Príčina

Keď zdieľaš blogový článok na Facebooku, stane sa toto:

```text
Facebook otvorí odkaz www.popri.cz/blog/ostrava-gigabitovy-internet...
  → Edge funkcia ho rozpozná ako "facebookexternalhit" (social crawler)
  → Hľadá statický súbor /ai-static/blog/ostrava-gigabitovy-internet...html
  → NEEXISTUJE
  → Hľadá v BLOG_POSTS_OG_DATA mape
  → NEEXISTUJE (tento článok tam nie je pridaný)
  → Vygeneruje generický HTML s titulkom z URL slugu
  → Obrázok: /og-image.png (generický, nie článkový)
  → Facebook zobrazí len text bez správneho obrázku
```

**Problém č. 1**: Nové články (napr. `ostrava-gigabitovy-internet-exkluzivni-nabidka-poda-2026`) nie sú pridané do mapy `BLOG_POSTS_OG_DATA` v edge funkcii.

**Problém č. 2**: Neexistuje statický HTML súbor pre nové články v `/ai-static/blog/`.

**Problém č. 3**: Aj keby bol obrázok nastavený, cesta `/blog-images/ostrava-gigabit-promo.webp` musí byť plná URL (`https://www.popri.cz/blog-images/...`) — to edge funkcia robí správne, ale len keď článok existuje v mape.

### Riešenie

#### 1. Pridať chýbajúce články do `BLOG_POSTS_OG_DATA`

V `netlify/edge-functions/ai-bot-detector.ts` pridať do mapy `BLOG_POSTS_OG_DATA` všetky nové články, ktoré chýbajú. Momentálne chýba minimálne:

```typescript
'ostrava-gigabitovy-internet-exkluzivni-nabidka-poda-2026': {
  title: 'Ostrava a gigabitový internet: Exkluzivní nabídka PODA, která se neodmítá',
  description: 'Optický internet PODA s rychlostí 1000/1000 Mbps, 85+ TV programů a aktivací zdarma — to vše od 300 Kč měsíčně.',
  image: '/blog-images/ostrava-gigabit-promo.webp'
},
```

Prejdem všetky články v `src/data/blog/index.ts` a porovnám s mapou — doplním všetky chýbajúce.

#### 2. Vytvoriť statické HTML súbory pre chýbajúce články

Pre každý chýbajúci článok vytvoriť `/ai-static/blog/{slug}.html` so správnymi OG tagmi (rovnaký formát ako existujúce súbory).

#### 3. Overiť obrázky

Skontrolovať, že všetky referované obrázky v OG tagoch reálne existujú na serveri (`/blog-images/`, `/lovable-uploads/`). Facebook vyžaduje:
- Obrázok musí byť prístupný cez HTTPS
- Minimálna veľkosť 200x200 px (ideálne 1200x630)
- Formát JPG, PNG alebo WebP

#### 4. Po deploy-i

Po nasadení zmien použiť **Facebook Sharing Debugger** (`https://developers.facebook.com/tools/debug/`) na každý článok — tým sa vyčistí Facebook cache a načítajú sa nové OG tagy.

### Súbory na úpravu
- `netlify/edge-functions/ai-bot-detector.ts` — doplniť chýbajúce články do `BLOG_POSTS_OG_DATA`
- `public/ai-static/blog/` — vytvoriť nové statické HTML súbory pre chýbajúce články
- Skontrolovať existenciu referovaných obrázkov




# Oprava og:image pre Facebook zdieľanie blogov

## Problém

Keď zdieľate blog na Facebooku, zobrazuje sa hlavné logo popri.cz namiesto obrázka konkrétneho článku.

**Príčina:**
Niektoré blogové články používajú obrázky importované cez ES6 moduly zo `src/assets/`:

```typescript
import homeOfficeImage from '@/assets/home-office-2025.jpg';
image: homeOfficeImage,  // Výsledok: /assets/home-office-2025-abc123.jpg
```

Tento hash sa mení pri každom builde a Facebook crawler nemôže spoľahlivo načítať obrázok.

---

## Riešenie

Presunieme všetky blogové obrázky do `public/blog-images/` s fixnými názvami a aktualizujeme všetky blogové príspevky.

---

## Čo sa zmení

### 1. Nový priečinok pre blog obrázky

Vytvoríme `public/blog-images/` a prekopírujeme tam všetky obrázky zo `src/assets/` ktoré sa používajú v blogoch:

| Súbor v src/assets/ | Nová cesta v public/ |
|---------------------|----------------------|
| home-office-2025.jpg | /blog-images/home-office-2025.jpg |
| poda-internet-2026-hero.webp | /blog-images/poda-internet-2026-hero.webp |
| slow-internet-guide-image.jpg | /blog-images/slow-internet-fix.jpg |
| myty-opticky-internet-hero.jpg | /blog-images/myty-opticky-internet.jpg |
| polanka-60ghz-antenna.jpg | /blog-images/polanka-60ghz.jpg |
| giga-internet-hero.jpg | /blog-images/giga-internet.jpg |
| (ďalšie podľa potreby) | ... |

### 2. Aktualizácia blogových súborov

Zmena z:
```typescript
import homeOfficeImage from '@/assets/home-office-2025.jpg';
// ...
image: homeOfficeImage,
```

Na:
```typescript
// žiadny import
image: '/blog-images/home-office-2025.jpg',
```

**Súbory na úpravu:**
- `src/data/blog/home-office-2025.ts`
- `src/data/blog/poda-internet-2026.ts`
- `src/data/blog/slow-internet-fix.ts`
- `src/data/blog/myty-opticky-internet.ts`
- `src/data/blog/polanka-60ghz.ts`
- `src/data/blog/giga-internet.ts`
- Ďalšie súbory ktoré importujú obrázky z `src/assets/`

### 3. Overenie og:image generovania

V `src/utils/blogSeo.ts` je kód správny:
```typescript
ogImage: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
```

Toto vytvorí absolútnu URL ako:
- `https://www.popri.cz/blog-images/home-office-2025.jpg`

---

## Výhody riešenia

| Pred | Po |
|------|-----|
| Dynamické Vite hash cesty | Statické fixné URL |
| Facebook cache problém | Facebook vždy načíta správny obrázok |
| Obrázok sa môže meniť | Stabilná URL pre všetky platformy |

---

## Kroky implementácie

1. Vytvorenie priečinka `public/blog-images/`
2. Kopírovanie obrázkov zo `src/assets/` do `public/blog-images/`
3. Aktualizácia všetkých blogových súborov - odstránenie importov a použitie priamych ciest
4. Test zdieľania na Facebook Sharing Debugger

---

## Po implementácii

1. Navštívte [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Zadajte URL blogu: `https://www.popri.cz/blog/home-office-2025-jak-nastavit-domaci-kancelar-produktivita`
3. Kliknite **"Scrape Again"**
4. Skontrolujte, či sa zobrazuje správny náhľadový obrázok článku

---

## Technické poznámky

- Obrázky v `public/` sú dostupné na fixných URL bez hashovania
- Facebook vyžaduje minimálne 200x200px, ideálne 1200x630px pre náhľad
- Obrázky sú cacheované Facebookom - po zmene je potrebné použiť Debugger


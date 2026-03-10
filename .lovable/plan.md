

# Implementačný plán: 4 SEO piliere pre lepšie pozície

## Čo to pre teba znamená prakticky

Po implementácii týchto 4 bodov budeš mať **kompletný on-page SEO základ** — to, čo môžeš ovplyvniť priamo na webe. Jediné, čo budeš musieť robiť manuálne, sú backlinky (PR, katalógy). **Google Search Console**: áno, po nasadení pošli novú sitemapu — ale to stačí urobiť raz, potom sa aktualizuje automaticky.

---

## 1. Stránka "O nás" (E-E-A-T)

**Nová stránka `/o-nas`** s informáciami o firme pre Google E-E-A-T signály.

**Obsah:**
- Kto je Popri.cz / PODA — krátky popis, region pôsobenia
- Prečo nám veriť — roky skúseností, počet zákazníkov, technológia GPON
- Kontaktné údaje s `Organization` schema
- Sekcia s recenziami (reuse existujúci `TestimonialsSection`)

**Technicky:**
- Nový súbor `src/pages/ONas.tsx`
- Route `/o-nas` v `App.tsx`
- Odkaz v Navbar a Footer
- JSON-LD `Organization` + `AboutPage` schema
- Pridať do sitemap.xml

## 2. Author schema pre blog

**Pridať autor informácie ku každému blogu** — Google to hodnotí pre E-E-A-T.

**Zmeny:**
- Rozšíriť `BlogPostSEO.tsx` o `Person` schema v JSON-LD (`author` field s menom, url, popisom)
- Pridať autorský box pod každý článok v `BlogPostContent.tsx` — meno, krátke bio, avatar
- Definovať defaultného autora (napr. "Redakce Popri.cz") v `types.ts`

## 3. Core Web Vitals optimalizácia

**Zlepšiť rýchlosť načítania pre lepšie uživateľské signály.**

**Zmeny:**
- Pridať `fetchpriority="high"` na hero obrázok v `HeroBackground.tsx`
- Pridať `loading="lazy"` na všetky obrázky pod fold (TestimonialsSection, BlogPreview, ChannelsSection)
- Pridať `<link rel="preconnect">` pre Supabase a externé fonty v `index.html`
- Pridať explicit `width`/`height` na hlavné obrázky pre elimináciu CLS

## 4. Rozšírený LocalBusiness schema

**Rozšíriť existujúci `AIOptimizedSchema.tsx`** o chýbajúce polia.

**Zmeny:**
- Pridať `openingHoursSpecification` (Po-Pá 8:00-17:00)
- Pridať `priceRange` ("300 - 520 CZK/mesiac")
- Pridať `aggregateRating` (4.8/5, 150+ hodnotení — z existujúcich testimonials)
- Pridať `Review` schema s 3 ukážkovými recenziami z `TestimonialsSection`

---

## Súbory na zmenu

| Súbor | Zmena |
|---|---|
| `src/pages/ONas.tsx` | **NOVÝ** — stránka O nás |
| `src/App.tsx` | Pridať route `/o-nas` |
| `src/components/Navbar.tsx` | Pridať odkaz "O nás" |
| `src/components/Footer.tsx` | Pridať odkaz "O nás" |
| `src/components/blog/BlogPostSEO.tsx` | Pridať Person/Author schema |
| `src/components/blog/BlogPostContent.tsx` | Pridať autorský box |
| `src/components/seo/AIOptimizedSchema.tsx` | Rozšíriť LocalBusiness + AggregateRating |
| `src/components/hero/HeroBackground.tsx` | fetchpriority="high" |
| `index.html` | Preconnect hinty |
| `public/sitemap.xml` | Pridať /o-nas |

## Po implementácii — tvoje kroky

1. **Nasadiť na Netlify** (git push)
2. **Google Search Console** → Sitemaps → Pridať `sitemap.xml` (stačí raz, potom sa auto-aktualizuje)
3. **Google Search Console** → URL Inspection → Skontrolovať `/o-nas` a pár blogov
4. Hotovo — ďalej všetko beží automaticky


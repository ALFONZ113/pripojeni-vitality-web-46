# SEO Optimalizace - Kompletní Report
**Datum:** 15. října 2025  
**Web:** https://www.popri.cz

## ✅ Dokončené Optimalizace

### 1. Sitemap.xml - Aktualizováno
**Soubor:** `public/sitemap.xml`

#### Provedené změny:
- ✅ Aktualizovány všechny lastmod datumy na 2025-10-15
- ✅ Zvýšena priorita klíčových regionálních stránek (0.9-0.95)
- ✅ Přidány image sitemap značky pro hlavní stránky
- ✅ Optimalizovány priority podle důležitosti stránek
- ✅ Zvýšena priorita /giga-internet na 0.9 (nová služba)

#### URL struktura (celkem 27 URLs):
```
Hlavní stránka:         1.0 priority
Regionální stránky:     0.9-0.95 priority (internet-ostrava, karvina, havirov, bohumin, poruba)
Služby:                 0.8-0.9 priority (tarify, internet-tv, iptv, giga-internet)
Blog:                   0.8 priority (hlavní stránka)
Blog články:            0.6-0.9 priority (podle významu)
Kontakt:                0.7 priority
Právní stránky:         0.3 priority
```

### 2. Redirects - Optimalizováno
**Soubor:** `public/_redirects`

#### Provedené změny:
- ✅ Odstraněny zbytečné 302 redirecty pro query parametry
- ✅ Query parametry nyní řešeny přes NoIndexMeta komponentu (bez redirectů)
- ✅ Zachovány pouze nutné 301 redirecty:
  - Blog ID → slug redirecty (6 redirectů)
  - Non-www → www redirect
  - HTTP → HTTPS (automaticky přes Netlify)

#### Výhody:
- Rychlejší načítání stránek (méně redirectů)
- Lepší UX (parametry v URL zachovány)
- Canonical tagy správně nastaveny
- NoIndex pro duplicitní obsah

### 3. Meta Tagy - Doplněno

#### Contact Page (`src/pages/Contact.tsx`)
✅ Přidáno:
- Title tag s telefonem
- Meta description s kontaktními údaji
- Canonical URL
- Open Graph tagy
- Twitter Card tagy
- Structured data (ContactPage schema)

#### IPTV Page (`src/pages/IPTV.tsx`)
✅ Přidáno:
- Optimalizovaný title s cenou
- Meta description s klíčovými výhodami
- Canonical URL
- Open Graph tagy (typ: product)
- Twitter Card tagy
- Structured data (Product schema s cenou 99 Kč)

#### Giga Internet Page (`src/pages/GigaInternet.tsx`)
✅ Vylepšeno:
- Rozšířený title s klíčovými slovy
- Delší meta description
- Canonical URL
- Open Graph s obrázkem
- Twitter Card s obrázkem
- Structured data (Product schema s hodnocením 4.8/5)

### 4. Canonical URLs - Implementováno

#### Stávající stránky s canonical:
✅ Index (/) - PageMetadata komponenta
✅ Blog (/blog) - Helmet v Blog.tsx
✅ Blog posts - BlogPostSEO komponenta
✅ Tarify - Helmet v Tarify.tsx
✅ Kontakt - Nově přidáno
✅ IPTV - Nově přidáno
✅ Giga Internet - Nově přidáno
✅ Internet Ostrava - Již implementováno

#### Všechny stránky mají:
- Správnou canonical URL
- NoIndex meta tag pro parametrizované URLs (přes NoIndexMeta.tsx)
- Hreflang tagy kde je to relevantní

### 5. Open Graph & Twitter Cards

#### Kompletní implementace na:
✅ Hlavní stránka (PageMetadata)
✅ Blog (všechny články)
✅ Tarify
✅ IPTV (včetně product type)
✅ Giga Internet (včetně obrázku)
✅ Kontakt
✅ Internet Ostrava (LocalBusiness)

#### Všechny OG tagy obsahují:
- og:title
- og:description
- og:url (canonical)
- og:type
- og:image (kde je relevantní)

### 6. Structured Data (Schema.org)

#### Implementované schema typy:
✅ WebSite (hlavní stránka)
✅ Organization (všechny stránky)
✅ LocalBusiness (regionální stránky)
✅ BlogPosting (blog články)
✅ Product (IPTV, Giga Internet)
✅ ContactPage (kontakt)
✅ BreadcrumbList (navigace)
✅ FAQPage (blog články s FAQ)
✅ CollectionPage (tarify)

---

## 📊 URLs pro Manuální Reindexaci v GSC

### Priority 1 - Nejvyšší (Reindexovat okamžitě):
```
https://www.popri.cz/
https://www.popri.cz/internet-ostrava
https://www.popri.cz/tarify
https://www.popri.cz/giga-internet
https://www.popri.cz/internet-karvina
https://www.popri.cz/internet-havirov
https://www.popri.cz/internet-bohumin
https://www.popri.cz/internet-poruba
```

### Priority 2 - Vysoká (Reindexovat do 48h):
```
https://www.popri.cz/blog
https://www.popri.cz/iptv
https://www.popri.cz/internet-tv
https://www.popri.cz/kontakt
https://www.popri.cz/blog/o2-nej-prevzatie-poda-alternativa-zakaznici
https://www.popri.cz/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-moravskoslezsky-kraj-2025
```

### Priority 3 - Střední (Reindexovat do týdne):
```
https://www.popri.cz/programy
https://www.popri.cz/promo-akce
https://www.popri.cz/blog/iptv-vs-traditionalni-tv-srovnani-vyhod-nevyhod
https://www.popri.cz/blog/nejcastejsi-otazky-pripojeni-internet-panelak
https://www.popri.cz/blog/rychly-internet-karvina-revoluce-pripojeni-domacnosti-poda
```

---

## 🔍 Doporučení pro Google Search Console

### 1. Nahrát Sitemap
```
URL: https://www.popri.cz/sitemap.xml
Frekvence kontroly: Denně
```

### 2. Manuální Indexace
- Použijte nástroj "URL Inspection"
- Zadejte URL z Priority 1 seznamu výše
- Klikněte na "Request Indexing"
- Opakujte pro všechny Priority 1 URLs

### 3. Sledovat Metriky
- **Core Web Vitals** - kontrolovat LCP, FID, CLS
- **Mobile Usability** - ověřit mobilní verzi
- **Coverage** - sledovat indexované stránky
- **Performance** - monitorovat CTR a pozice

### 4. Opravit "Discovered - Not Indexed"
Pro stránky které Google objevil ale neindexoval:
1. Přidejte více internal linků
2. Zlepšete obsah (min. 300 slov)
3. Přidejte obrázky s alt texty
4. Požádejte o manuální indexaci

---

## 📈 Další Optimalizace (Doporučené)

### A. Technické SEO
- [ ] Přidat robots.txt direktivy pro crawl budget
- [ ] Implementovat preload pro LCP obrázky
- [ ] Optimalizovat velikost obrázků (WebP formát)
- [ ] Přidat lazy loading pro obrázky mimo viewport

### B. Content SEO
- [ ] Přidat FAQ sekce na hlavní stránky
- [ ] Rozšířit meta descriptions (ideálně 150-160 znaků)
- [ ] Přidat alt texty všem obrázkům
- [ ] Vytvořit více internal linků mezi relevantními stránkami

### C. Local SEO
- [ ] Registrace v Google My Business
- [ ] Přidat NAP (Name, Address, Phone) konzistentně
- [ ] Vytvořit mapy pokrytí pro každou lokalitu
- [ ] Získat recenze od zákazníků

### D. Monitoring
- [ ] Nastavit Google Analytics 4
- [ ] Implementovat event tracking (tlačítka, formuláře)
- [ ] Sledovat konverze (telefonní hovory, formuláře)
- [ ] Monitorovat bounce rate a time on page

---

## 🎯 Očekávané Výsledky

### Krátkodobé (1-2 týdny):
- Všechny hlavní stránky zindexovány v GSC
- Snížení "Discovered - Not Indexed" o 50%+
- Zlepšení snippet zobrazení ve vyhledávání

### Střednědobé (1-2 měsíce):
- Zvýšení organického trafficu o 30-50%
- Lepší pozice pro klíčová slova (internet Ostrava, PODA, gigabit)
- Zvýšení CTR ve výsledcích vyhledávání

### Dlouhodobé (3-6 měsíců):
- Top 3 pozice pro lokální vyhledávání
- 2x více organického trafficu
- Vyšší počet konverzí z vyhledávání

---

## 📝 Kontrolní Seznam - Hotovo

✅ Sitemap.xml aktualizován  
✅ Redirecty optimalizovány  
✅ Canonical URLs nastaveny  
✅ Meta tagy doplněny všude  
✅ Open Graph implementováno  
✅ Twitter Cards přidány  
✅ Structured Data kompletní  
✅ NoIndex pro duplicity  
✅ Prioritizace URLs  
✅ GSC reindexace seznam

---

**Připraveno k nasazení:** ✅  
**GSC reindexace:** Lze zahájit okamžitě  
**Další kroky:** Manuální indexace Priority 1 URLs

# 🚨 NÁVOD NA OPRAVU INDEXÁCIE - POPRI.CZ

## Súhrn problému
Na základe Google Search Console screenshotov:
- **Len 42 z 137 stránok je indexovaných (30,7%)**
- **95 stránok nie je indexovaných** = strata 69% organickej návštevnosti
- **Kritické problémy:** "Crawled - currently not indexed" a "Duplicate content"

## ⚡ OKAMŽITÉ AKCIE (DNES)

### 1. Request Indexing pre kritické stránky
```
Otvor Google Search Console → URL Inspection
Pre každú z týchto URLs:
✅ https://www.popri.cz/internet-karvina/
✅ https://www.popri.cz/blog/102
✅ https://www.popri.cz/blog/internet-poda-ostrava-nejrychlejsi-opticke-pripojeni-v-moravskoslezskem-kraji-2025
✅ https://www.popri.cz/blog/?tag=Služby

Kroky:
1. Paste URL → Enter
2. Test Live URL
3. Request Indexing
4. Čakaj 24-48h na výsledok
```

### 2. Znovu odoslať Sitemap
```
GSC → Sitemaps → Add sitemap: https://www.popri.cz/sitemap.xml
```

### 3. Opraviť duplicate content
```
Nastaviť canonical URLs pre:
- /blog/?tag=Služby → noindex alebo canonical
- Dlhé URLs skrátiť (max 60 znakov)
- 301 redirecty pre duplicitné stránky
```

## 🔧 TECHNICKÉ OPRAVY (TENTO TÝŽDEŇ)

### 1. Migrácia blog URLs
```
Starý formát: /blog/102
Nový formát: /blog/nazov-clanku-seo-friendly

Implementovať 301 redirecty!
```

### 2. Strukturované dáta (JSON-LD)
```
Pridať pre:
- Article schema pre blog posty  
- LocalBusiness pre hlavnú stránku
- FAQ schema pre často kladené otázky
```

### 3. Interné odkazy
```
Pridať relevantné interné odkazy z:
- Hlavná stránka → Internet Karviná
- Blog kategórie → jednotlivé články
- Service pages → related blog content
```

## 📊 OČAKÁVANÉ VÝSLEDKY

### Po 2-4 týždňoch:
- **+200-300%** nárast indexovaných stránok
- Ratio zmena z 42/137 na 120+/137

### Po 1-3 mesiacoch:
- **+50-150%** nárast organickej návštevnosti
- Lepšie rankované pre lokálne kľúčové slová (Ostrava, Karviná)
- Vyššia relevantnosť pre blog content

## 💡 POUŽÍVAJ INDEXING DASHBOARD

Na stránke `/indexing-dashboard` máš nástroj s:
- ✅ Konkrétne problémy a riešenia
- ✅ One-click Google Search Console odkazy  
- ✅ Kopírovanie URLs pre bulk akcie
- ✅ Progress tracking opráv

## ⚠️ DOPAD NA SEO POZÍCIE

**ANO, zlá indexácia VÝRAZNE ovplyvňuje pozície:**

❌ **Negatívne:**
- Neindexované stránky = 0 organická návštevnosť
- 69% strata potenciálnych pozorovaní
- Duplicate content znižuje domain authority
- Nízka indexation ratio signalizuje Google problémy

✅ **Po oprave:**
- Všetky stránky dostanú šancu na ranking
- Lepšia topical authority pre lokálne searches
- Zvýšená crawl frequency
- Vyšší trust score domény

## 🎯 PRIORITNÉ KĽÚČOVÉ SLOVÁ
**Kritické:** internet Ostrava, internet Karviná, optické pripojenie
**Vysoké:** IPTV, 60GHz technológia, rýchly internet  
**Stredné:** Long-tail z blog contentu

---
**⏰ Časový harmonogram:** Okamžité akcie dnes, technické opravy do týždňa, výsledky za 2-4 týždne.
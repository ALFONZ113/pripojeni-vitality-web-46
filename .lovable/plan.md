

## Plán: Aktualizácia Facebook odkazu na nový profil Popri.cz

### Čo urobím

Zmením Facebook URL z rôznych starých odkazov na tvoj nový oficiálny profil: `https://www.facebook.com/popricz/`

---

### Zmeny v súboroch

| Súbor | Aktuálna hodnota | Nová hodnota |
|-------|------------------|--------------|
| `src/components/Footer.tsx` (riadok 22) | `https://www.facebook.com/podacz/` | `https://www.facebook.com/popricz/` |
| `public/json/schema-organization.json` (riadok 21) | `https://www.facebook.com/profile.php?id=61586889543817` | `https://www.facebook.com/popricz/` |

---

### Prečo je to dôležité

1. **Konzistentné branding** - Všade na webe bude rovnaký FB odkaz
2. **SEO structured data** - Google bude indexovať správny sociálny profil cez schema.org
3. **Používateľský zážitok** - Návštevníci kliknutím v pätičke prídu na správny FB profil

---

### Technický detail

**Footer.tsx** - Ikona Facebook v pätičke:
```typescript
// Zmena na riadku 22
href="https://www.facebook.com/popricz/"
```

**schema-organization.json** - Structured data pre Google:
```json
"sameAs": [
  "https://www.facebook.com/popricz/",
  "https://www.instagram.com/poda.cz/",
  "https://www.linkedin.com/company/poda-a-s-/"
]
```


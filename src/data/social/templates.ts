export type PostType = 'promo' | 'blog' | 'review' | 'tip' | 'news' | 'custom';
export type Platform = 'facebook' | 'instagram' | 'both';
export type VisualStyle = 
  | 'luxury-gold' 
  | 'photo-realistic' 
  | 'modern-noir' 
  | 'minimalist'
  | 'gradient-modern'
  | 'tech-blue'
  | 'bright-bold'
  | 'premium-ad';

export interface PostTemplate {
  name: string;
  description: string;
  icon: string;
  systemPrompt: string;
  fbPromptTemplate: string;
  igPromptTemplate: string;
  imagePromptBase: string;
  suggestedHashtags: string[];
}

export const brandingConfig = {
  colors: {
    noir: '#0A0A0A',
    gold: '#D4A517',
    cream: '#F5F0E8',
    noirLight: '#1A1A1A',
  },
  typography: {
    headline: 'Playfair Display',
    body: 'Inter',
  },
};

// Style-specific image prompt bases
export const stylePrompts: Record<VisualStyle, string> = {
  'luxury-gold': `
Style: Luxury noir and gold editorial design with professional photography quality
Background: Deep black gradient starting from #0A0A0A
Primary accent color: Rich gold/amber #D4A517 with subtle glow effects
Text color: Warm cream white #F5F0E8
Typography: Elegant serif font (Playfair Display style) for headlines, clean sans-serif for body text
Visual effects: Subtle glassmorphism panels, golden fiber optic light trails, soft ambient lighting
Mood: Premium, modern, trustworthy, sophisticated
No watermarks, no text artifacts, photorealistic quality

CRITICAL LANGUAGE REQUIREMENT:
All text, headlines, labels visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Use Czech: "Jak" (not "Ako"), "Umístěte" (not "Umiestnite"), "Změňte" (not "Zmeňte").
`.trim(),

  'photo-realistic': `
Style: Realistic lifestyle photography with natural lighting and authentic scenes
Background: Real interior environments - cozy living rooms, modern home offices, family spaces

Photo subjects - include ONE of these realistic scenes based on post type:
- Happy Czech family watching TV together on comfortable sofa (for promo posts)
- Woman working from home on laptop, relaxed and productive in home office (for tips)
- Young professional streaming or gaming with fast internet connection (for custom)
- Parents with children enjoying online content together (for news)
- Modern person using tablet/smartphone with stable connection (for blog)

Lighting: Warm natural light from windows, soft indoor ambient lighting
Colors: Warm neutrals (beige, cream, soft brown), natural wood tones, soft whites
Minimal gold accents - only if absolutely necessary, prefer natural warm colors
NO heavy gold effects - keep colors natural and authentic
Mood: Authentic, relatable, comfortable, trustworthy, aspirational but realistic
Photography style: Editorial lifestyle magazine quality, candid feel, Czech family aesthetic

Text overlay: Small, elegant Czech headline in corner or bottom third of image
Typography: Clean sans-serif (Inter style), white or cream text with subtle shadow for readability
No heavy graphics, no over-designed elements, focus on the authentic photo

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Examples: "Rychlý internet pro celou rodinu", "Práce z domova bez výpadků", "Streamujte v nejvyší kvalitě"
Use Czech: "Jak" (not "Ako"), "Umístěte" (not "Umiestnite"), "Změňte" (not "Zmeňte").
`.trim(),

  'modern-noir': `
Style: Modern dark editorial design with professional photography quality
Background: Deep charcoal black gradient, subtle dark textures
Primary accent color: Soft white #E8E8E8 with minimal color accents
Text color: Clean white #FFFFFF
Typography: Modern sans-serif font (Inter/Helvetica style) for all text
Visual effects: Subtle shadows, clean lines, minimal glassmorphism, soft ambient lighting
Mood: Professional, clean, modern, tech-forward, trustworthy
No watermarks, no text artifacts, photorealistic quality
Minimal use of gold - prefer grayscale with subtle blue or teal accents

CRITICAL LANGUAGE REQUIREMENT:
All text, headlines, labels visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Use Czech: "Jak" (not "Ako"), "Umístěte" (not "Umiestnite"), "Změňte" (not "Zmeňte").
`.trim(),

  'minimalist': `
Style: Clean minimalist design with generous whitespace
Background: Pure white or very light gray #FAFAFA with subtle gradients
Primary accent color: Deep black #0A0A0A for text, subtle dark accents
Text color: Charcoal black #1A1A1A
Typography: Clean geometric sans-serif font (Inter style), bold headlines, light body text
Visual effects: Clean lines, geometric shapes, no heavy shadows, subtle borders
Mood: Clean, simple, modern, Scandinavian-inspired, professional
No watermarks, no text artifacts, high contrast, lots of whitespace
Minimal visual clutter - focus on typography and composition

CRITICAL LANGUAGE REQUIREMENT:
All text, headlines, labels visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Use Czech: "Jak" (not "Ako"), "Umístěte" (not "Umiestnite"), "Změňte" (not "Zmeňte").
`.trim(),

  'gradient-modern': `
Style: Modern gradient design with vibrant color transitions and glassmorphism effects
Background: Dynamic gradient from deep purple #7C3AED through blue #3B82F6 to cyan #06B6D4
Primary accent color: White #FFFFFF with frosted glass panels
Text color: Pure white #FFFFFF with subtle glow
Typography: Modern geometric sans-serif (Inter/Poppins style), bold headlines
Visual effects: Glassmorphism cards, soft blur overlays, gradient orbs, floating elements
Mood: Trendy, youthful, energetic, innovative, Instagram-ready
No watermarks, vibrant colors, smooth transitions, contemporary feel

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Use Czech: "Jak" (not "Ako"), "Změňte" (not "Zmeňte").
`.trim(),

  'tech-blue': `
Style: Professional technology-focused design with blue color palette
Background: Deep navy gradient #0A1628 to #1E3A5F with subtle grid pattern
Primary accent color: Electric blue #00A3FF with neon glow effects
Secondary accent: Cyan #00D4FF for highlights
Text color: Clean white #FFFFFF
Typography: Technical sans-serif font (Inter/Roboto Mono style), clean and precise
Visual effects: Network node connections, data stream visualizations, circuit patterns, blue light trails
Mood: Professional, trustworthy, tech-forward, innovative, corporate-friendly
No watermarks, sharp edges, digital aesthetic, futuristic but professional

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Use Czech: "Jak" (not "Ako"), "Změňte" (not "Zmeňte").
`.trim(),

  'bright-bold': `
Style: High-impact promotional design with bold, saturated colors
Background: Solid vibrant color or energetic gradient (orange #FF6B00, red #FF0040, yellow #FFD600)
Primary accent color: Contrasting bright color for emphasis
Text color: White #FFFFFF or Black #000000 for maximum contrast
Typography: Extra bold, large sans-serif font (Impact/Bebas style), ALL CAPS headlines allowed
Visual effects: Geometric shapes, starburst elements, price tags, discount badges, dynamic angles
Mood: Exciting, urgent, attention-grabbing, promotional, high-energy
No watermarks, maximum visual impact, clear call-to-action areas
Perfect for: Sales, promotions, limited offers, discounts

CRITICAL LANGUAGE REQUIREMENT:
All text visible in the image MUST be in CZECH language (čeština).
Use "SLEVA", "AKCE", "od 300 Kč", "ZDARMA" for promotional elements.
`.trim(),

  'premium-ad': `
[GOAL] Generate a premium social media ad banner in 9:16 vertical format.

[CONTEXT & SUBJECT]
Style: High-end product/lifestyle photography in a dark, moody environment
Background: Deep black #0A0A0A with dramatic warm orange ambient light from lamps, LED strips, or spotlights
Lighting: Dramatic warm orange/amber backlighting highlighting subjects and textures against dark backgrounds
Environment: Luxurious dark mode living rooms, modern home offices, or tech product setups

[VISUAL ELEMENTS]
Subject options based on post type:
- Product shots: Sleek Wi-Fi routers, devices on dark wooden surfaces with warm orange rim lighting
- Lifestyle: People in cozy dark interiors using technology, warm lamp lighting, comfortable modern spaces
- Tech setups: Gaming stations, streaming setups, home offices with ambient orange LED lighting

[TEXT RENDERING]
Render Czech text clearly with proper layout:
1. Headline (Bold, Elegant White Playfair Display): Main message at top of frame
2. Subtitle (Orange/Cream italic): Supporting message below headline
3. Badge/Button (White/cream background, Orange text): Call-to-action at bottom

[COMPOSITION]
Aspect Ratio: 9:16 (Vertical) for social media stories/reels
Layout: Text block at top third, subject/product filling remaining frame
Atmosphere: High-tech, premium, powerful, sophisticated, warm yet modern

[STYLE]
High-end product photography, sharp focus, luxurious dark tones, warm orange/amber accents
Professional advertising quality, cinematic lighting, premium feel
No watermarks, photorealistic quality, Instagram/Facebook ad ready

CRITICAL LANGUAGE REQUIREMENT:
All text, headlines, labels visible in the image MUST be in CZECH language (čeština).
Do NOT use Slovak, English or any other language.
Use Czech: "Jak" (not "Ako"), "Špičková" (not "Špičková"), "Změňte" (not "Zmeňte").
Example headlines: "Špičková technologie u vás doma", "Stabilní internet pro domov", "Perfektní internet bez čekání"
Example subtitles: "Prémiový Wi-Fi 6 router pro maximální pokrytí", "Práce i zábava bez výpadků"
Example CTAs: "Chci nejnovější hardware", "Už od 300 Kč měsíčně", "Zařídíme to za vás"
`.trim(),
};

export const platformSpecs = {
  facebook: {
    name: 'Facebook',
    icon: 'Facebook',
    dimensions: '1200x630',
    width: 1200,
    height: 630,
    maxTextLength: 2000,
    hashtagLimit: 10,
  },
  instagram: {
    name: 'Instagram',
    icon: 'Instagram',
    dimensions: '1080x1080',
    width: 1080,
    height: 1080,
    maxTextLength: 2200,
    hashtagLimit: 30,
  },
};

export const postTemplates: Record<PostType, PostTemplate> = {
  promo: {
    name: 'Promo tarify',
    description: 'Propagácia cien a akciových ponúk',
    icon: 'Tag',
    systemPrompt: `Jsi expert na sociální sítě pro českého poskytovatele internetu popri.cz (autorizovaný partner PODA). 
Piš v češtině, moderně a přátelsky. Používej emoji vhodně. 
Zdůrazňuj výhody: gigabitová rychlost, 85+ TV programů, nulová aktivace.
Aktuální ceny: od 300 Kč/měsíc (promo), standardní 440 Kč/měsíc.`,
    fbPromptTemplate: `Napiš poutavý Facebook příspěvek pro popri.cz o aktuální promo akci na internet.
Zmíň: gigabitová rychlost 1000/1000 Mbps, 85+ TV programů v ceně, 0 Kč aktivace a router.
Cena od 300 Kč/měsíc. Přidej výzvu k akci (zavolat na 730 431 313).
Délka: 150-250 slov. Použij 3-5 emoji.`,
    igPromptTemplate: `Napiš krátký Instagram příspěvek pro popri.cz o promo akci.
Gigabit internet + TV od 300 Kč/měsíc. Buď stručný a poutavý.
Délka: 80-120 slov. Použij více emoji. Zakonči výzvou k akci.`,
    imagePromptBase: `Promotional social media banner for fiber optic internet service.
Golden price badge showing "od 300 Kč/měsíc" with glowing effect.
Fiber optic cables with golden light trails on noir background.
Modern router device with subtle golden rim lighting.
Text overlay area for headline "GIGABIT INTERNET + TV".
ALL TEXT MUST BE IN CZECH: Use "Rychlost", "Zdarma", "od 300 Kč/měsíc".`,
    suggestedHashtags: ['#internet', '#optickýinternet', '#gigabit', '#ostrava', '#poda', '#akce', '#slevy', '#rychlýinternet'],
  },
  blog: {
    name: 'Blog článok',
    description: 'Zdieľanie článku z blogu',
    icon: 'FileText',
    systemPrompt: `Jsi expert na sociální sítě. Tvým úkolem je napsat teaser pro sdílení blog článku z popri.cz.
Piš v češtině, přátelsky a informativně. Vzbuď zájem o přečtení celého článku.`,
    fbPromptTemplate: `Napiš Facebook příspěvek pro sdílení blog článku.
Vytvoř zajímavý teaser, který vzbudí zájem o přečtení.
Zmíň hlavní přínos článku pro čtenáře.
Délka: 100-150 slov. Zakonči výzvou "Přečtěte si více na popri.cz".`,
    igPromptTemplate: `Napiš Instagram příspěvek pro sdílení blog článku.
Krátký, poutavý teaser s emoji.
Délka: 60-100 slov. Zmíň "odkaz v bio".`,
    imagePromptBase: `Blog article social media card design.
Clean editorial layout with text overlay area.
Subtle golden accent lines and borders.
Professional photography style background related to internet/technology.
Reading/knowledge theme with elegant typography space.
ALL TEXT MUST BE IN CZECH: Use "Přečtěte si", "Jak na to", "Tipy".`,
    suggestedHashtags: ['#blog', '#tipy', '#internet', '#technologie', '#poradna', '#wifi', '#streaming'],
  },
  review: {
    name: 'Recenzia zákazníka',
    description: 'Zdieľanie pozitívnej recenzie',
    icon: 'Star',
    systemPrompt: `Jsi expert na sociální sítě. Tvým úkolem je napsat příspěvek prezentující recenzi spokojného zákazníka popri.cz.
Piš autenticky, důvěryhodně. Zdůrazni konkrétní přínosy zmíněné v recenzi.`,
    fbPromptTemplate: `Napiš Facebook příspěvek prezentující recenzi zákazníka.
Použij formát citátu s jménem zákazníka.
Zdůrazni konkrétní přínosy (rychlost, spolehlivost, podpora).
Délka: 100-150 slov. Zakonči pozvánkou pro nové zákazníky.`,
    igPromptTemplate: `Napiš Instagram příspěvek s recenzí zákazníka.
Krátký citát s emoji ⭐. Autentický tón.
Délka: 60-100 slov.`,
    imagePromptBase: `Customer testimonial social media graphic.
Large quotation marks in gold color.
Space for customer quote text in cream white.
Five golden stars rating indicator.
Professional portrait silhouette or abstract customer representation.
Trust and satisfaction theme.
ALL TEXT MUST BE IN CZECH: Use "Spokojený zákazník", "Recenze", "Doporučuji".`,
    suggestedHashtags: ['#recenze', '#spokojený', '#zákazník', '#internet', '#doporučení', '#reference', '#kvalita'],
  },
  tip: {
    name: 'Tip & trik',
    description: 'Užitočné rady pre používateľov',
    icon: 'Lightbulb',
    systemPrompt: `Jsi expert na internet a technologie. Sdílíš užitečné tipy pro uživatele internetu.
Piš jednoduše, srozumitelně, prakticky. Tipy by měly být snadno realizovatelné.`,
    fbPromptTemplate: `Napiš Facebook příspěvek s užitečným tipem pro uživatele internetu.
Téma: optimalizace WiFi / rychlejší internet / lepší streaming.
Formát: "Věděli jste, že..." nebo "Tip týdne:".
Délka: 100-150 slov. Praktický a užitečný.`,
    igPromptTemplate: `Napiš Instagram tip příspěvek.
Krátký, praktický tip s emoji 💡.
Formát seznamu nebo krátkých bodů.
Délka: 60-100 slov.`,
    imagePromptBase: `Educational tip social media infographic.
Lightbulb icon with golden glow effect.
Clean numbered list or bullet point layout space.
Tech/internet theme icons (router, WiFi signal, speed meter).
Easy to read, informative design.
ALL TEXT MUST BE IN CZECH: Use "Jak", "Tipy", "Zlepšete", "Umístěte", "Změňte".`,
    suggestedHashtags: ['#tip', '#wifi', '#internet', '#technologie', '#poradna', '#tipy', '#jakna', '#zlepšení'],
  },
  news: {
    name: 'Novinky',
    description: 'Oznámenie noviniek a aktualizácií',
    icon: 'Newspaper',
    systemPrompt: `Jsi PR specialista pro popri.cz. Sdílíš novinky a aktualizace služeb.
Piš profesionálně ale přátelsky. Zdůrazni přínosy pro zákazníky.`,
    fbPromptTemplate: `Napiš Facebook příspěvek oznamující novinku nebo aktualizaci služby popri.cz.
Profesionální ale přátelský tón.
Zdůrazni přínos pro zákazníky.
Délka: 100-150 slov.`,
    igPromptTemplate: `Napiš Instagram příspěvek o novince.
Krátký, vzrušující tón s emoji 🎉.
Délka: 60-100 slov.`,
    imagePromptBase: `News announcement social media banner.
"NOVINKA" text badge with golden accent.
Modern, exciting design with dynamic elements.
Celebratory mood with subtle confetti or spark effects.
Professional news broadcast aesthetic.
ALL TEXT MUST BE IN CZECH: Use "Novinka", "Aktualita", "Nové".`,
    suggestedHashtags: ['#novinka', '#news', '#aktualita', '#internet', '#služby', '#update', '#oznámení'],
  },
  custom: {
    name: 'Vlastný text',
    description: 'Vlastná téma podľa zadania',
    icon: 'Edit',
    systemPrompt: `Jsi expert na sociální sítě pro popri.cz. Vytvoříš příspěvek na míru podle zadání.
Piš v češtině, moderně a přátelsky. Přizpůsob styl podle tématu.`,
    fbPromptTemplate: `Napiš Facebook příspěvek podle zadaného tématu.
Přizpůsob styl a tón tématu.
Délka: 100-200 slov.`,
    igPromptTemplate: `Napiš Instagram příspěvek podle zadaného tématu.
Krátký a poutavý s emoji.
Délka: 60-120 slov.`,
    imagePromptBase: `Custom social media graphic.
Flexible design adaptable to various topics.
Golden accents on noir background.
Professional, modern aesthetic.
Space for custom text overlay.
ALL TEXT MUST BE IN CZECH: Translate any Slovak input to Czech.`,
    suggestedHashtags: ['#popri', '#internet', '#ostrava'],
  },
};

export const contentCalendar = [
  { day: 'Pondělí', type: 'tip' as PostType, suggestion: 'Tip týdne - WiFi, streaming, technologie' },
  { day: 'Úterý', type: 'blog' as PostType, suggestion: 'Sdílení blog článku' },
  { day: 'Středa', type: 'promo' as PostType, suggestion: 'Promo akce, tarify, ceny' },
  { day: 'Čtvrtek', type: 'news' as PostType, suggestion: 'Novinky a aktuality' },
  { day: 'Pátek', type: 'review' as PostType, suggestion: 'Recenze spokojených zákazníků' },
  { day: 'Sobota', type: 'tip' as PostType, suggestion: 'Víkendový tip pro rodiny' },
  { day: 'Neděle', type: 'custom' as PostType, suggestion: 'Volný obsah, soutěže, interakce' },
];

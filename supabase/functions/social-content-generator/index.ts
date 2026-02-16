import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Perplexity web search for current info
async function searchCurrentInfo(topic: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: 'Poskytni 2-3 odstavce aktuálních ověřených informací k danému tématu. Piš v češtině, stručně a věcně. Zaměř se na nejnovější fakta a novinky.' },
          { role: 'user', content: topic },
        ],
      }),
    });
    if (!response.ok) {
      console.error('Perplexity error:', response.status);
      return '';
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || '';
    const citations = data.citations || [];
    const sourcesStr = citations.length > 0 ? `\n[Zdroje: ${citations.slice(0, 3).join(', ')}]` : '';
    return content ? `${content}${sourcesStr}` : '';
  } catch (e) {
    console.error('Perplexity search error:', e);
    return '';
  }
}

const InputSchema = z.object({
  action: z.enum(['generate', 'suggest-topic']).default('generate'),
  type: z.enum(['promo', 'blog', 'review', 'tip', 'news', 'custom', 'product', 'photo', 'meme', 'education', 'fb-ad', 'success']),
  platform: z.enum(['facebook', 'instagram', 'both']).optional().default('both'),
  visualStyle: z.enum([
    'luxury-gold', 'photo-realistic', 'modern-noir', 'minimalist',
    'gradient-modern', 'tech-blue', 'bright-bold', 'premium-ad'
  ]).default('luxury-gold'),
  includePerson: z.enum(['with-person', 'without-person', 'custom-person']).default('with-person'),
  customTopic: z.string().max(500).optional().nullable(),
  blogTitle: z.string().max(200).optional().nullable(),
  customPersonImage: z.string().optional().nullable(),
  personRenderStyle: z.enum(['realistic', 'caricature', 'illustration', 'cartoon']).optional().nullable(),
  withCTA: z.boolean().optional().default(true),
  regenerateOnly: z.enum(['text', 'hashtags', 'imagePrompt']).optional().nullable(),
});

const personRenderPrompts: Record<string, string> = {
  'realistic': 'Photo-realistic person integration, natural lighting, seamless blend with environment, professional photography quality',
  'caricature': 'Exaggerated caricature style with bold features, humorous artistic interpretation, warm colors, fun and playful aesthetic',
  'illustration': 'Modern digital illustration style, clean vector-like lines, artistic and professional, flat design elements',
  'cartoon': 'Pixar/Disney 3D cartoon style, friendly and approachable, vibrant colors, animated character look',
};

const stylePrompts: Record<string, string> = {
  'luxury-gold': `Style: Luxury noir and gold editorial design. Background: Deep black #0A0A0A. Accent: Rich gold #D4A517. Text: Cream #F5F0E8. Typography: Elegant serif headlines. Effects: Glassmorphism, golden fiber optic trails. Mood: Premium, sophisticated. CRITICAL: All text MUST be in CZECH.`,
  'photo-realistic': `Style: Realistic lifestyle photography. Background: Real interiors. Lighting: Warm natural light. Colors: Warm neutrals. Mood: Authentic, relatable. Photography: Editorial lifestyle quality. CRITICAL: All text MUST be in CZECH.`,
  'modern-noir': `Style: Modern dark editorial. Background: Deep charcoal. Accent: White #E8E8E8. Typography: Modern sans-serif. Mood: Professional, tech-forward. CRITICAL: All text MUST be in CZECH.`,
  'minimalist': `Style: Clean minimalist. Background: White #FAFAFA. Text: Black #1A1A1A. Typography: Geometric sans-serif. Mood: Clean, Scandinavian. CRITICAL: All text MUST be in CZECH.`,
  'gradient-modern': `Style: Vibrant gradients. Background: Purple to cyan gradient. Text: White. Effects: Glassmorphism, gradient orbs. Mood: Trendy, energetic. CRITICAL: All text MUST be in CZECH.`,
  'tech-blue': `Style: Technology design. Background: Navy #0A1628. Accent: Electric blue #00A3FF. Effects: Network nodes, data streams. Mood: Professional, innovative. CRITICAL: All text MUST be in CZECH.`,
  'bright-bold': `Style: High-impact promo. Background: Vibrant orange/red/yellow. Typography: Extra bold, large. Effects: Geometric shapes, badges. Mood: Exciting, urgent. CRITICAL: All text MUST be in CZECH. Use "SLEVA", "AKCE".`,
  'premium-ad': `Style: Premium ad banner 9:16. Background: Black #0A0A0A with warm orange light. Lighting: Dramatic orange backlighting. Text: White headline, orange subtitle, CTA badge. Mood: High-tech, premium. CRITICAL: All text MUST be in CZECH.`,
};

const postTemplates: Record<string, { systemPrompt: string; fbPrompt: string; igPrompt: string; imagePrompt: string; hashtags: string[] }> = {
  promo: {
    systemPrompt: `Jsi expert na sociální sítě pro českého poskytovatele internetu popri.cz (autorizovaný partner PODA). Piš v češtině, moderně a přátelsky. Zdůrazňuj: gigabitová rychlost, 85+ TV programů, nulová aktivace. Ceny: od 300 Kč/měsíc.`,
    fbPrompt: `Napiš poutavý Facebook příspěvek pro popri.cz o promo akci. Zmíň: 1000/1000 Mbps, 85+ TV, 0 Kč aktivace, od 300 Kč/měsíc. CTA: 730 431 313. Délka: 150-250 slov.`,
    igPrompt: `Napiš krátký Instagram příspěvek pro popri.cz o promo akci. Gigabit + TV od 300 Kč/měsíc. Délka: 80-120 slov.`,
    imagePrompt: `Promotional banner for fiber optic internet. Price badge "od 300 Kč/měsíc". Fiber optic light trails. ALL TEXT IN CZECH.`,
    hashtags: ['#internet', '#optickýinternet', '#gigabit', '#ostrava', '#poda', '#akce', '#rychlýinternet'],
  },
  blog: {
    systemPrompt: `Jsi expert na sociální sítě. Napiš teaser pro blog článek z popri.cz. Piš v češtině, přátelsky.`,
    fbPrompt: `Napiš Facebook teaser pro blog článek. Vzbuď zájem. Délka: 100-150 slov. Zakonči "Přečtěte si více na popri.cz".`,
    igPrompt: `Napiš Instagram teaser pro blog. Krátký s emoji. Délka: 60-100 slov. Zmíň "odkaz v bio".`,
    imagePrompt: `Blog article social card. Editorial layout. Technology theme. ALL TEXT IN CZECH.`,
    hashtags: ['#blog', '#tipy', '#internet', '#technologie', '#poradna', '#wifi'],
  },
  review: {
    systemPrompt: `Jsi expert na sociální sítě. Napiš příspěvek s recenzí zákazníka popri.cz. Autentický tón.`,
    fbPrompt: `Napiš Facebook příspěvek s recenzí zákazníka. Formát citátu. Délka: 100-150 slov.`,
    igPrompt: `Napiš Instagram příspěvek s recenzí. Krátký citát s ⭐. Délka: 60-100 slov.`,
    imagePrompt: `Customer testimonial graphic. Quotation marks. Five stars. ALL TEXT IN CZECH.`,
    hashtags: ['#recenze', '#spokojený', '#zákazník', '#internet', '#doporučení'],
  },
  tip: {
    systemPrompt: `Jsi expert na internet. Sdílíš užitečné tipy. Piš jednoduše, prakticky.`,
    fbPrompt: `Napiš Facebook tip o WiFi/internet optimalizaci. Formát "Věděli jste..." Délka: 100-150 slov.`,
    igPrompt: `Napiš Instagram tip s 💡. Seznam bodů. Délka: 60-100 slov.`,
    imagePrompt: `Educational tip infographic. Lightbulb icon. Tech icons. ALL TEXT IN CZECH.`,
    hashtags: ['#tip', '#wifi', '#internet', '#technologie', '#poradna', '#tipy'],
  },
  news: {
    systemPrompt: `Jsi PR specialista pro popri.cz. Sdílíš novinky. Profesionální ale přátelský tón.`,
    fbPrompt: `Napiš Facebook příspěvek o novince popri.cz. Zdůrazni přínos. Délka: 100-150 slov.`,
    igPrompt: `Napiš Instagram příspěvek o novince s 🎉. Délka: 60-100 slov.`,
    imagePrompt: `News announcement banner. "NOVINKA" badge. Dynamic design. ALL TEXT IN CZECH.`,
    hashtags: ['#novinka', '#aktualita', '#internet', '#služby', '#update'],
  },
  custom: {
    systemPrompt: `Jsi expert na sociální sítě pro popri.cz. Příspěvek na míru. Piš v češtině.`,
    fbPrompt: `Napiš Facebook příspěvek podle zadaného tématu. Délka: 100-200 slov.`,
    igPrompt: `Napiš Instagram příspěvek podle tématu. Krátký s emoji. Délka: 60-120 slov.`,
    imagePrompt: `Custom social media graphic. Flexible design. ALL TEXT IN CZECH.`,
    hashtags: ['#popri', '#internet', '#ostrava'],
  },
  success: {
    systemPrompt: `Jsi expert na sociální sítě pro popri.cz. Vytváříš příběhy úspěšných zákazníků. Piš autenticky, emotivně. Zdůrazni transformaci "před/po".`,
    fbPrompt: `Napiš Facebook příspěvek s příběhem úspěšného zákazníka popri.cz. Formát: konkrétní příběh s detaily. "Před popri.cz" vs "Po popri.cz". Délka: 150-250 slov.`,
    igPrompt: `Napiš Instagram příspěvek s příběhem zákazníka. Krátký emotivní příběh. Před/Po formát. Délka: 80-120 slov.`,
    imagePrompt: `Customer success story graphic. Split-screen before/after concept. Happy customer. Trust indicators. ALL TEXT IN CZECH.`,
    hashtags: ['#zákazník', '#příběh', '#spokojenost', '#internet', '#popri'],
  },
  product: {
    systemPrompt: `Jsi expert na sociální sítě pro popri.cz. Prezentuj konkrétní tarif nebo službu. Jasně a přesvědčivě.`,
    fbPrompt: `Napiš Facebook příspěvek prezentující tarif/službu popri.cz. Konkrétní parametry: rychlost, cena, TV, bonus. Délka: 120-180 slov.`,
    igPrompt: `Napiš Instagram příspěvek o produktu/tarifu. Klíčová čísla. Délka: 60-100 slov.`,
    imagePrompt: `Product showcase graphic. Product card layout. Price badge, speed indicators. ALL TEXT IN CZECH.`,
    hashtags: ['#tarif', '#internet', '#nabídka', '#gigabit', '#popri'],
  },
  photo: {
    systemPrompt: `Jsi expert na sociální sítě pro popri.cz. Příspěvky s fotorealistickými vizuály. Autenticky a přirozeně.`,
    fbPrompt: `Napiš Facebook příspěvek doprovázený realistickou fotografií. Přirozený tón. Délka: 100-150 slov.`,
    igPrompt: `Napiš Instagram příspěvek s autentickým lifestyle tónem. Jako u reálné fotky. Délka: 60-100 slov.`,
    imagePrompt: `Photorealistic lifestyle photography. Authentic Czech household scene. Natural lighting, candid feel. ALL TEXT IN CZECH.`,
    hashtags: ['#lifestyle', '#domov', '#internet', '#rodina', '#popri'],
  },
  meme: {
    systemPrompt: `Jsi expert na virální obsah a memy pro popri.cz. Vtipné příspěvky o internetu a WiFi. Český humor, relatable situace. Vtipný ale ne urážlivý.`,
    fbPrompt: `Napiš vtipný Facebook meme text pro popri.cz. Téma: pomalý internet, WiFi výpadky. Formát "Když..." meme styl. Délka: 50-100 slov. MAXIMÁLNĚ VTIPNÝ.`,
    igPrompt: `Napiš vtipný Instagram meme. Ultra krátký virální humor o internetu. Délka: 30-60 slov.`,
    imagePrompt: `Humorous meme-style image. Funny relatable internet/WiFi situation. Bold text overlay. Bright colors. Cartoon or exaggerated style. ALL TEXT IN CZECH.`,
    hashtags: ['#meme', '#humor', '#internet', '#wifi', '#relatable', '#vtip'],
  },
  education: {
    systemPrompt: `Jsi expert na vzdělávací obsah o internetu pro popri.cz. Vysvětluj složité koncepty jednoduše. Piš v češtině.`,
    fbPrompt: `Napiš vzdělávací Facebook příspěvek. Formát "Věděli jste?" s čísly a fakty. Vysvětli: GPON, WiFi 6, optika vs měď. Délka: 120-180 slov.`,
    igPrompt: `Napiš vzdělávací Instagram příspěvek. Přehledný formát s emoji a čísly. Carousel-style body. Délka: 60-100 slov.`,
    imagePrompt: `Educational infographic design. Data visualization, icons, numbered steps. Charts or comparison tables. ALL TEXT IN CZECH: "Věděli jste?", "Jak funguje".`,
    hashtags: ['#edukace', '#vzdělávání', '#technologie', '#internet', '#fakta', '#optika'],
  },
  'fb-ad': {
    systemPrompt: `Jsi expert na Facebook Ads pro popri.cz. Vysoce konverzní reklamní texty. Stručně a přesvědčivě. Primární text max 125 znaků.`,
    fbPrompt: `Napiš Facebook Ads příspěvek pro popri.cz.
Formát:
1. Primární text (max 125 znaků) - hlavní sdělení s emoji
2. Headline (max 40 znaků) - úderný nadpis
3. Popis odkazu (max 30 znaků)
4. Doporuč CTA: Více informací / Zaregistrovat se / Kontaktujte nás
Zdůrazni: gigabit, od 300 Kč/měs, 0 Kč aktivace.`,
    igPrompt: `Napiš krátký reklamní text pro Instagram Ads. Max 125 znaků. Stručný a přesvědčivý.`,
    imagePrompt: `Facebook Ads banner. Clean, high-converting. Clear headline, benefit visual, CTA button space. Minimal text (20% rule). ALL TEXT IN CZECH.`,
    hashtags: [],
  },
};

// Topic suggestions per post type
const topicSuggestions: Record<string, string[]> = {
  promo: ['Letní akce na gigabit internet', 'Rodinný balíček internet + TV', 'Speciální nabídka pro nové zákazníky', 'Black Friday sleva na internet', 'Studentská akce - internet za polovic'],
  blog: ['5 tipů jak zrychlit WiFi doma', 'GPON technologie - jak funguje optika', 'Porovnání: optika vs. měděný kabel', 'Jak vybrat správný router', 'Home office - rychlý internet jako základ'],
  review: ['Spokojený zákazník z Ostravy-Poruby', 'Recenze od rodiny s dětmi', 'Gamer hodnotí gigabit internet', 'Senior oceňuje spolehlivost služby', 'Home office profesionál doporučuje'],
  tip: ['Jak umístit router pro nejlepší signál', 'Zabezpečení domácí WiFi sítě', 'Jak otestovat rychlost internetu', 'Mesh systém vs extender', 'Optimalizace WiFi kanálů'],
  news: ['Rozšíření pokrytí do nové lokality', 'Upgrade sítě na WiFi 7', 'Nové TV programy v balíčku', 'Vylepšená zákaznická podpora', 'Nový tarif pro domácnosti'],
  custom: ['Den internetu - zábavný obsah', 'Soutěž o rok internetu zdarma', 'Za kulisami - jak funguje optická síť', 'Vánoční přání od popri.cz', 'Komunitní event v Ostravě'],
  success: ['Rodina z Havířova přešla na optiku', 'Gamer z Ostravy - konec lagů', 'Podnikatel ušetřil přechodem na popri.cz', 'Senior se naučil streamovat díky stabilnímu internetu'],
  product: ['Tarif Gigabit 1000/1000 Mbps', 'Balíček Internet + 85 TV programů', 'Premium router v ceně', 'Optický internet pro rodinné domy'],
  photo: ['Rodina sleduje Netflix na velké TV', 'Home office s výhledem na Ostravu', 'Dětský pokoj s tabletem a rychlým WiFi', 'Gaming setup s gigabit připojením'],
  meme: ['Když WiFi vypadne uprostřed online schůzky', 'Pomalý internet vs optika - rozdíl', 'Router v koupelně humor', 'Když říkáš že nepotřebuješ rychlý internet'],
  education: ['Jak funguje GPON technologie', 'WiFi 6 vs WiFi 5 - rozdíly', 'Co je to ping a proč je důležitý', 'Optické vlákno - jak přenáší data světlem'],
  'fb-ad': ['Akční nabídka gigabit internet', 'Přejděte na optiku - 0 Kč aktivace', 'Internet + TV balíček promo', 'Nejrychlejší internet v Ostravě'],
};

async function generateSceneDescription(
  topic: string, postType: string, visualStyle: string,
  includePerson: string, personRenderStyle: string | null, apiKey: string
): Promise<string> {
  let personRules = '';
  if (includePerson === 'custom-person' && personRenderStyle) {
    personRules = `CUSTOM PERSON: ${personRenderPrompts[personRenderStyle] || personRenderPrompts['realistic']}. Person is main focus.`;
  } else if (includePerson === 'without-person') {
    personRules = `NO PEOPLE. Only objects, devices, environments, technology. NO human presence.`;
  } else {
    personRules = `Include PEOPLE in realistic situations with technology.`;
  }

  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: `Create unique image scene descriptions for social media. ${personRules} Output ONLY 2-3 sentence scene description in English.` },
          { role: 'user', content: `Topic: ${topic}\nPost type: ${postType}\nVisual style: ${visualStyle}` }
        ],
      }),
    });
    if (!response.ok) return '';
    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
  } catch { return ''; }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const requestBody = await req.json();
    const validationResult = InputSchema.safeParse(requestBody);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ success: false, error: "Neplatná vstupní data", details: validationResult.error.issues.map(i => i.message) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, type, platform, visualStyle, includePerson, customTopic, blogTitle, customPersonImage, personRenderStyle, withCTA, regenerateOnly } = validationResult.data;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');

    // Handle suggest-topic action
    if (action === 'suggest-topic') {
      const suggestions = topicSuggestions[type] || topicSuggestions['custom'];
      const randomTopic = suggestions[Math.floor(Math.random() * suggestions.length)];
      
      // Use AI to make it more creative
      try {
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${lovableApiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'google/gemini-3-flash-preview',
            messages: [
              { role: 'system', content: 'Jsi kreativní expert na sociální sítě pro popri.cz (český ISP). Navrhni jedno originální téma pro sociální příspěvek. Odpověz POUZE tématem, max 10 slov, v češtině.' },
              { role: 'user', content: `Typ příspěvku: ${type}\nInspiruj se tímto základem, ale buď originální: "${randomTopic}"` }
            ],
          }),
        });
        if (response.ok) {
          const data = await response.json();
          const topic = data.choices?.[0]?.message?.content?.trim();
          if (topic) {
            return new Response(JSON.stringify({ success: true, topic }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
          }
        }
      } catch { /* fallback below */ }
      
      return new Response(JSON.stringify({ success: true, topic: randomTopic }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Generate content
    const template = postTemplates[type] || postTemplates['custom'];
    const brandingPrompt = stylePrompts[visualStyle];
    const platforms = platform === 'both' ? ['facebook', 'instagram'] : [platform!];
    const result: Record<string, unknown> = {};

    for (const plat of platforms) {
      const isInstagram = plat === 'instagram';
      const dimensions = isInstagram ? '1080x1080' : '1080x1350';
      
      // Handle partial regeneration
      if (regenerateOnly) {
        if (regenerateOnly === 'text') {
          let finalPrompt = isInstagram ? template.igPrompt : template.fbPrompt;
          if (customTopic) finalPrompt += `\n\nTéma: ${customTopic}`;
          const textResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${lovableApiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'google/gemini-3-flash-preview', messages: [{ role: 'system', content: template.systemPrompt }, { role: 'user', content: finalPrompt }] }),
          });
          if (!textResponse.ok) throw new Error(`Failed to regenerate text for ${plat}`);
          const textData = await textResponse.json();
          result[plat] = { text: textData.choices?.[0]?.message?.content?.trim() || '' };
        } else if (regenerateOnly === 'hashtags') {
          const hashtagResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${lovableApiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'google/gemini-3-flash-preview', messages: [
              { role: 'system', content: 'Jsi expert na hashtagy pro sociální sítě. Generuj relevantní české hashtagy.' },
              { role: 'user', content: `Vygeneruj 5-15 relevantních hashtagů pro ${isInstagram ? 'Instagram' : 'Facebook'} příspěvek o: ${customTopic || type}. Pouze hashtagy, oddělené mezerami.` }
            ] }),
          });
          if (!hashtagResponse.ok) throw new Error(`Failed to regenerate hashtags`);
          const hashData = await hashtagResponse.json();
          result[plat] = { hashtags: hashData.choices?.[0]?.message?.content?.trim() || template.hashtags.join(' ') };
        } else if (regenerateOnly === 'imagePrompt') {
          const topicForScene = customTopic || type;
          const uniqueScene = await generateSceneDescription(topicForScene, type, visualStyle, includePerson, personRenderStyle || null, lovableApiKey);
          let imagePromptContent = uniqueScene
            ? `Social media image for ${isInstagram ? 'Instagram (1080x1080)' : 'Facebook (1080x1350)'}.\n\nSCENE: ${uniqueScene}\nTopic: ${topicForScene}\n`
            : template.imagePrompt;
          imagePromptContent += `\n${brandingPrompt}\nDimensions: ${dimensions}`;
          if (withCTA) imagePromptContent += `\nInclude a clear CTA button/badge element in the image.`;
          result[plat] = { imagePrompt: imagePromptContent.trim() };
        }
        continue;
      }

      // Full generation
      let finalPrompt = isInstagram ? template.igPrompt : template.fbPrompt;
      if (customTopic) finalPrompt += `\n\nTéma: ${customTopic}`;
      if (blogTitle) finalPrompt += `\n\nNázev článku: ${blogTitle}`;

      // Fetch current web info for custom topics via Perplexity
      if (customTopic) {
        const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY');
        if (perplexityKey) {
          const webContext = await searchCurrentInfo(customTopic, perplexityKey);
          if (webContext) {
            finalPrompt += `\n\nAKTUÁLNÍ KONTEXT Z WEBU (ověřené informace - použij je v příspěvku):\n${webContext}`;
          }
        }
      }

      // Special instructions for new types
      if (type === 'meme') {
        finalPrompt += `\n\nDŮLEŽITÉ: Buď OPRAVDU vtipný. Používej český internetový humor, relatable situace. Formát "Když..." meme.`;
      } else if (type === 'education') {
        finalPrompt += `\n\nDŮLEŽITÉ: Buď informativní a srozumitelný. Používej čísla, fakta, srovnání.`;
      } else if (type === 'fb-ad') {
        finalPrompt += `\n\nFORMÁT ODPOVĚDI:\nPrimární text: [max 125 znaků]\nHeadline: [max 40 znaků]\nPopis: [max 30 znaků]\nCTA: [doporučené tlačítko]`;
      }

      const textResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${lovableApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'google/gemini-3-flash-preview', messages: [{ role: 'system', content: template.systemPrompt }, { role: 'user', content: finalPrompt }] }),
      });
      if (!textResponse.ok) throw new Error(`Failed to generate text for ${plat}`);
      const textData = await textResponse.json();
      const generatedText = textData.choices?.[0]?.message?.content || '';

      // Generate unique scene
      const topicForScene = customTopic || type;
      const uniqueScene = await generateSceneDescription(topicForScene, type, visualStyle, includePerson, personRenderStyle || null, lovableApiKey);

      let imagePromptContent = '';
      if (uniqueScene) {
        imagePromptContent = `Social media image for ${isInstagram ? 'Instagram (1080x1080, square)' : 'Facebook (1080x1350, 4:5 vertical)'}.\n\nSCENE: ${uniqueScene}\nTopic: ${topicForScene}\n`;
        if (includePerson === 'custom-person' && personRenderStyle) {
          imagePromptContent += `\nPERSON STYLE: ${personRenderPrompts[personRenderStyle] || personRenderPrompts['realistic']}`;
        }
      } else {
        imagePromptContent = template.imagePrompt;
        if (customTopic) imagePromptContent += `\nTopic: ${customTopic}`;
      }

      imagePromptContent += `\n${brandingPrompt}\nDimensions: ${dimensions}`;
      if (withCTA) imagePromptContent += `\nInclude a clear CTA button/badge element in Czech.`;
      imagePromptContent += `\n\nCRITICAL: All visible text must be in Czech (čeština).`;

      result[plat] = {
        text: generatedText.trim(),
        hashtags: template.hashtags.join(' '),
        imagePrompt: imagePromptContent.trim(),
        imageDimensions: dimensions,
      };
    }

    return new Response(JSON.stringify({ success: true, ...result }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error:', error);
    if (error.message?.includes('rate limit') || error.status === 429) {
      return new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded.' }), { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ success: false, error: error.message || 'Unknown error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const InputSchema = z.object({
  type: z.enum(['promo', 'blog', 'review', 'tip', 'news', 'custom']),
  platform: z.enum(['facebook', 'instagram', 'both']),
  visualStyle: z.enum(['luxury-gold', 'photo-realistic', 'modern-noir', 'minimalist']).default('luxury-gold'),
  includePerson: z.enum(['with-person', 'without-person']).default('with-person'),
  customTopic: z.string().max(500).optional().nullable(),
  blogTitle: z.string().max(200).optional().nullable(),
});

// Style-specific branding prompts
const stylePrompts: Record<string, string> = {
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
`,
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
`,
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
`,
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
`,
};

const postTemplates = {
  promo: {
    systemPrompt: `Jsi expert na sociální sítě pro českého poskytovatele internetu popri.cz (autorizovaný partner PODA). 
Piš v češtině, moderně a přátelsky. Používej emoji vhodně. 
Zdůrazňuj výhody: gigabitová rychlost, 85+ TV programů, nulová aktivace.
Aktuální ceny: od 300 Kč/měsíc (promo), standardní 440 Kč/měsíc.`,
    fbPrompt: `Napiš poutavý Facebook příspěvek pro popri.cz o aktuální promo akci na internet.
Zmíň: gigabitová rychlost 1000/1000 Mbps, 85+ TV programů v ceně, 0 Kč aktivace a router.
Cena od 300 Kč/měsíc. Přidej výzvu k akci (zavolat na 730 431 313).
Délka: 150-250 slov. Použij 3-5 emoji.`,
    igPrompt: `Napiš krátký Instagram příspěvek pro popri.cz o promo akci.
Gigabit internet + TV od 300 Kč/měsíc. Buď stručný a poutavý.
Délka: 80-120 slov. Použij více emoji. Zakonči výzvou k akci.`,
    imagePrompt: `Promotional social media banner for fiber optic internet service.
Price badge showing "od 300 Kč/měsíc" with accent effect.
Fiber optic cables with light trails on dark background.
Modern router device with subtle rim lighting.
16:9 aspect ratio for Facebook, professional marketing style.
ALL TEXT MUST BE IN CZECH: Use "Gigabit internet", "od 300 Kč/měsíc", "Rychlost", "Zdarma".`,
    hashtags: ['#internet', '#optickýinternet', '#gigabit', '#ostrava', '#poda', '#akce', '#rychlýinternet'],
  },
  blog: {
    systemPrompt: `Jsi expert na sociální sítě. Tvým úkolem je napsat teaser pro sdílení blog článku z popri.cz.
Piš v češtině, přátelsky a informativně. Vzbuď zájem o přečtení celého článku.`,
    fbPrompt: `Napiš Facebook příspěvek pro sdílení blog článku.
Vytvoř zajímavý teaser, který vzbudí zájem o přečtení.
Zmíň hlavní přínos článku pro čtenáře.
Délka: 100-150 slov. Zakonči výzvou "Přečtěte si více na popri.cz".`,
    igPrompt: `Napiš Instagram příspěvek pro sdílení blog článku.
Krátký, poutavý teaser s emoji.
Délka: 60-100 slov. Zmíň "odkaz v bio".`,
    imagePrompt: `Blog article social media card design.
Clean editorial layout with elegant text overlay area.
Professional photography style, technology/internet theme.
Reading/knowledge visual elements, modern typography space.
ALL TEXT MUST BE IN CZECH: Use "Přečtěte si", "Jak na to", "Tipy", "Poradna".`,
    hashtags: ['#blog', '#tipy', '#internet', '#technologie', '#poradna', '#wifi', '#streaming'],
  },
  review: {
    systemPrompt: `Jsi expert na sociální sítě. Tvým úkolem je napsat příspěvek prezentující recenzi spokojného zákazníka popri.cz.
Piš autenticky, důvěryhodně. Zdůrazni konkrétní přínosy zmíněné v recenzi.`,
    fbPrompt: `Napiš Facebook příspěvek prezentující recenzi zákazníka.
Použij formát citátu. Zdůrazni konkrétní přínosy (rychlost, spolehlivost, podpora).
Délka: 100-150 slov. Zakonči pozvánkou pro nové zákazníky.`,
    igPrompt: `Napiš Instagram příspěvek s recenzí zákazníka.
Krátký citát s emoji ⭐. Autentický tón.
Délka: 60-100 slov.`,
    imagePrompt: `Customer testimonial social media graphic.
Large elegant quotation marks accent color on dark background.
Space for customer quote text.
Five stars rating indicator with subtle glow.
Trust and satisfaction theme, professional design.
ALL TEXT MUST BE IN CZECH: Use "Spokojený zákazník", "Recenze", "Doporučuji".`,
    hashtags: ['#recenze', '#spokojený', '#zákazník', '#internet', '#doporučení', '#reference'],
  },
  tip: {
    systemPrompt: `Jsi expert na internet a technologie. Sdílíš užitečné tipy pro uživatele internetu.
Piš jednoduše, srozumitelně, prakticky. Tipy by měly být snadno realizovatelné.`,
    fbPrompt: `Napiš Facebook příspěvek s užitečným tipem pro uživatele internetu.
Téma: optimalizace WiFi / rychlejší internet / lepší streaming.
Formát: "Věděli jste, že..." nebo "Tip týdne:".
Délka: 100-150 slov. Praktický a užitečný.`,
    igPrompt: `Napiš Instagram tip příspěvek.
Krátký, praktický tip s emoji 💡.
Formát seznamu nebo krátkých bodů.
Délka: 60-100 slov.`,
    imagePrompt: `Educational tip social media infographic.
Lightbulb icon with glow effect on dark background.
Clean numbered list or bullet point layout space.
Tech/internet theme icons (router, WiFi signal, speed meter).
Easy to read, informative modern design.
ALL TEXT MUST BE IN CZECH: Use "Jak", "Tipy", "Zlepšete", "Umístěte", "Změňte".`,
    hashtags: ['#tip', '#wifi', '#internet', '#technologie', '#poradna', '#tipy', '#jakna'],
  },
  news: {
    systemPrompt: `Jsi PR specialista pro popri.cz. Sdílíš novinky a aktualizace služeb.
Piš profesionálně ale přátelsky. Zdůrazni přínosy pro zákazníky.`,
    fbPrompt: `Napiš Facebook příspěvek oznamující novinku nebo aktualizaci služby popri.cz.
Profesionální ale přátelský tón. Zdůrazni přínos pro zákazníky.
Délka: 100-150 slov.`,
    igPrompt: `Napiš Instagram příspěvek o novince.
Krátký, vzrušující tón s emoji 🎉.
Délka: 60-100 slov.`,
    imagePrompt: `News announcement social media banner.
"NOVINKA" text badge with accent and glow on dark background.
Modern, exciting design with dynamic light elements.
Celebratory mood with subtle confetti or spark effects.
Professional news broadcast aesthetic.
ALL TEXT MUST BE IN CZECH: Use "Novinka", "Aktualita", "Nové", "Právě spuštěno".`,
    hashtags: ['#novinka', '#news', '#aktualita', '#internet', '#služby', '#update'],
  },
  custom: {
    systemPrompt: `Jsi expert na sociální sítě pro popri.cz. Vytvoříš příspěvek na míru podle zadání.
Piš v češtině, moderně a přátelsky. Přizpůsob styl podle tématu.`,
    fbPrompt: `Napiš Facebook příspěvek podle zadaného tématu.
Přizpůsob styl a tón tématu. Délka: 100-200 slov.`,
    igPrompt: `Napiš Instagram příspěvek podle zadaného tématu.
Krátký a poutavý s emoji. Délka: 60-120 slov.`,
    imagePrompt: `Custom social media graphic.
Flexible design adaptable to various topics.
Accent colors on dark background with text area.
Professional, modern aesthetic.
ALL TEXT MUST BE IN CZECH: Translate any Slovak text to Czech language.`,
    hashtags: ['#popri', '#internet', '#ostrava'],
  },
};

// Generate unique scene description based on topic using AI
async function generateSceneDescription(
  topic: string, 
  postType: string, 
  visualStyle: string,
  includePerson: string,
  apiKey: string
): Promise<string> {
  // Build person-specific rules based on toggle
  const personRules = includePerson === 'without-person' 
    ? `CRITICAL RULES FOR NO PEOPLE:
1. DO NOT include any people, humans, faces, hands, or body parts in the scene
2. Focus ONLY on objects, devices, environments, technology, and abstract concepts
3. Show technology, routers, devices, fiber optic cables, home interiors WITHOUT any people
4. Describe scenes with objects only: devices on desks, routers with light effects, cable setups, empty rooms with technology
5. NO human presence whatsoever - not even silhouettes, shadows, or partial body parts`
    : `CRITICAL RULES FOR PEOPLE:
1. ALWAYS include PEOPLE in realistic situations
2. Show authentic human interactions with technology
3. Include real people: families, individuals, couples in everyday situations
4. Describe people's activities, expressions, and their environment`;

  const sceneSystemPrompt = `You are an expert at creating unique image scene descriptions for social media marketing.
Based on the topic, create a SPECIFIC and UNIQUE scene description.

${personRules}

ADDITIONAL RULES:
1. DO NOT describe generic routers with light effects for everything
2. CREATE UNIQUE scenes based on the actual topic
3. Describe the SPECIFIC scene that matches the topic
4. Scene must be visually interesting and suitable for social media

Examples of good scene descriptions ${includePerson === 'with-person' ? '(WITH PEOPLE)' : '(WITHOUT PEOPLE)'}:
${includePerson === 'with-person' ? `
- Topic "WiFi optimization" → Person adjusting router position, checking signal strength on smartphone
- Topic "Tariff for seniors" → Elderly couple comfortably using tablet on sofa, video calling grandchildren
- Topic "How to connect WiFi" → Person unpacking and setting up new router, reading quick start guide
- Topic "Home office" → Woman working productively on laptop at home desk with coffee
- Topic "Family internet" → Family of four watching movie together on TV in cozy living room
- Topic "Gaming internet" → Young person at gaming setup with monitors and headphones
- Topic "Fast streaming" → Couple enjoying movie night with popcorn, 4K TV visible
- Topic "Price promotion" → Happy customer smiling while looking at phone showing good deal` : `
- Topic "WiFi optimization" → Modern router on wooden desk with WiFi signal waves visualization, smartphone showing signal meter app
- Topic "Fiber internet" → Sleek fiber optic cables with blue light trails connecting to premium router, dark background
- Topic "How to connect WiFi" → New router in box with quick start guide, ethernet cables neatly arranged on clean desk
- Topic "Home office setup" → Clean home office desk with laptop, monitor, coffee cup - no people, warm ambient lighting
- Topic "High-speed internet" → Speed meter display showing 1000 Mbps, fiber optic strands with light effects
- Topic "Gaming setup" → Gaming monitors, RGB keyboard, high-end router - empty gaming station
- Topic "Smart home" → Smart home devices arranged elegantly: router, smart speaker, connected devices with subtle glow
- Topic "Internet technology" → Abstract visualization of data transfer, fiber optic light trails on dark background`}

For luxury-gold style: Include stylized elegant elements, premium atmosphere
For photo-realistic style: ${includePerson === 'with-person' ? 'MUST show real people in authentic everyday situations' : 'Show realistic environments and objects without any people'}
For modern-noir style: Professional, clean, tech-forward atmosphere
For minimalist style: Clean, simple, lots of whitespace

Output ONLY the scene description in 2-3 sentences, nothing else.`;

  try {
    console.log(`Generating unique scene for topic: ${topic}, style: ${visualStyle}`);
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: sceneSystemPrompt },
          { role: 'user', content: `Create unique image scene for:
Topic: ${topic}
Post type: ${postType}
Visual style: ${visualStyle}

Output a 2-3 sentence scene description in English that is SPECIFIC to this topic.` }
        ],
      }),
    });

    if (!response.ok) {
      console.error('Scene generation failed:', response.status);
      return '';
    }

    const data = await response.json();
    const scene = data.choices?.[0]?.message?.content?.trim() || '';
    console.log(`Generated scene: ${scene}`);
    return scene;
  } catch (error) {
    console.error('Scene generation error:', error);
    return '';
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    
    // Validate input
    const validationResult = InputSchema.safeParse(requestBody);
    if (!validationResult.success) {
      console.error("❌ Validation error:", validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Neplatná vstupní data",
          details: validationResult.error.issues.map(i => i.message)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { type, platform, visualStyle, includePerson, customTopic, blogTitle } = validationResult.data;
    const template = postTemplates[type];
    const brandingPrompt = stylePrompts[visualStyle];
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log(`Generating social content: type=${type}, platform=${platform}, style=${visualStyle}, includePerson=${includePerson}`);

    const result: Record<string, unknown> = {};
    const platforms = platform === 'both' ? ['facebook', 'instagram'] : [platform];

    for (const plat of platforms) {
      const isInstagram = plat === 'instagram';
      const userPrompt = isInstagram ? template.igPrompt : template.fbPrompt;
      const dimensions = isInstagram ? '1080x1080' : '1200x630';
      
      // Add custom topic if provided
      let finalPrompt = userPrompt;
      if (customTopic) {
        finalPrompt += `\n\nTéma: ${customTopic}`;
      }
      if (blogTitle) {
        finalPrompt += `\n\nNázev článku: ${blogTitle}`;
      }

      // Generate text content
      const textResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-3-flash-preview',
          messages: [
            { role: 'system', content: template.systemPrompt },
            { role: 'user', content: finalPrompt }
          ],
        }),
      });

      if (!textResponse.ok) {
        const errorText = await textResponse.text();
        console.error(`Text generation error for ${plat}:`, textResponse.status, errorText);
        throw new Error(`Failed to generate text for ${plat}`);
      }

      const textData = await textResponse.json();
      const generatedText = textData.choices?.[0]?.message?.content || '';

      // Generate UNIQUE scene based on topic using AI
      const topicForScene = customTopic || type;
      const uniqueScene = await generateSceneDescription(
        topicForScene, 
        type, 
        visualStyle,
        includePerson,
        lovableApiKey
      );

      // Build dynamic image prompt with unique scene
      let imagePromptContent = '';

      if (uniqueScene) {
        // Use AI-generated unique scene
        imagePromptContent = `Social media image for ${isInstagram ? 'Instagram (1080x1080, square format)' : 'Facebook (1200x630, 16:9 aspect ratio)'}.

SCENE: ${uniqueScene}

Topic: ${topicForScene}
`;
      } else {
        // Fallback to template if AI scene generation fails
        console.log('Using fallback template for image prompt');
        imagePromptContent = template.imagePrompt;
        if (customTopic) {
          imagePromptContent += `\nTopic/theme: ${customTopic}`;
        }
      }

      // Add branding style and language requirements
      imagePromptContent += `\n${brandingPrompt}`;
      imagePromptContent += `\nDimensions: ${dimensions}`;
      imagePromptContent += `\n\nCRITICAL: Czech text overlay required. ALL visible text must be in Czech (čeština), not Slovak or English.`;
      if (customTopic) {
        imagePromptContent += `\nIf topic "${customTopic}" is in Slovak, translate to Czech for any visible text.`;
      }

      result[plat] = {
        text: generatedText.trim(),
        hashtags: template.hashtags.join(' '),
        imagePrompt: imagePromptContent.trim(),
        imageDimensions: dimensions,
      };
    }

    console.log('Social content generated successfully');

    return new Response(
      JSON.stringify({ success: true, ...result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in social-content-generator:', error);
    
    if (error.message?.includes('rate limit') || error.status === 429) {
      return new Response(
        JSON.stringify({ success: false, error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

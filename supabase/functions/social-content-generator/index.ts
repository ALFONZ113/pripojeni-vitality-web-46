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
  customTopic: z.string().max(500).optional().nullable(),
  blogTitle: z.string().max(200).optional().nullable(),
});

const brandingPrompt = `
Style: Luxury noir and gold editorial design with professional photography quality
Background: Deep black gradient starting from #0A0A0A
Primary accent color: Rich gold/amber #D4A517 with subtle glow effects
Text color: Warm cream white #F5F0E8
Typography: Elegant serif font (Playfair Display style) for headlines, clean sans-serif for body text
Visual effects: Subtle glassmorphism panels, golden fiber optic light trails, soft ambient lighting
Mood: Premium, modern, trustworthy, sophisticated
No watermarks, no text artifacts, photorealistic quality
`;

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
Golden price badge showing "od 300 Kč/měsíc" with glowing effect.
Fiber optic cables with golden light trails on noir background.
Modern router device with subtle golden rim lighting.
16:9 aspect ratio for Facebook, professional marketing style.`,
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
Subtle golden accent lines and borders on noir background.
Professional photography style, technology/internet theme.
Reading/knowledge visual elements, modern typography space.`,
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
Large elegant quotation marks in gold color on noir background.
Space for customer quote text in cream white.
Five golden stars rating indicator with subtle glow.
Trust and satisfaction theme, professional design.`,
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
Lightbulb icon with golden glow effect on noir background.
Clean numbered list or bullet point layout space.
Tech/internet theme icons (router, WiFi signal, speed meter) in gold.
Easy to read, informative modern design.`,
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
"NOVINKA" text badge with golden accent and glow on noir background.
Modern, exciting design with dynamic golden light elements.
Celebratory mood with subtle confetti or spark effects.
Professional news broadcast aesthetic.`,
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
Golden accents on noir background with cream text area.
Professional, modern aesthetic.`,
    hashtags: ['#popri', '#internet', '#ostrava'],
  },
};

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

    const { type, platform, customTopic, blogTitle } = validationResult.data;
    const template = postTemplates[type];
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log(`Generating social content: type=${type}, platform=${platform}`);

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

      // Generate image prompt
      let imagePromptContent = template.imagePrompt;
      if (customTopic) {
        imagePromptContent += `\nTopic/theme: ${customTopic}`;
      }
      imagePromptContent += `\n${brandingPrompt}`;
      imagePromptContent += `\nDimensions: ${dimensions}`;

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

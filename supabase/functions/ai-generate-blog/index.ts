import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, keywords, research_data, category, tone = 'professional' } = await req.json();
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating blog post for:', title);

    // Pripravíme výskumné dáta do kontextu
    const researchContext = research_data ? JSON.stringify(research_data, null, 2) : 'Žiadne výskumné dáta';

    const generatePrompt = `Napíš kompletný, SEO optimalizovaný blog článok na tému: "${title}"

Kategória: ${category}
Tón: ${tone}
Kľúčové slová: ${keywords?.join(', ') || 'žiadne'}

Výskumné dáta na použitie:
${researchContext}

POŽIADAVKY:
1. Článok musí byť dlhý aspoň 1500 slov
2. Použij HTML tagy (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>)
3. Zahrň kľúčové slová prirodzene v texte
4. Vytvor zrozumiteľnú štruktúru s podnadpismi
5. Pridaj praktické príklady a tipy
6. Zameraj sa na České a Slovenské prostredie
7. Buď konkrétny a technicky presný
8. Optimalizuj pre vyhľadávače (použij kľúčové slová v nadpisoch)

ŠTRUKTÚRA:
- Úvodný odsek (150-200 slov) vysvetľujúci tému
- 3-5 hlavných sekcií s <h2> nadpismi
- Každá sekcia s 2-4 podsekciami s <h3> nadpismi
- Záverečný odsek so zhrnutím a výzvou k akcii

Nepoužívaj <h1> tag. Generuj iba obsah článku v HTML formáte bez obaľujúcich tagov.`;

    const startTime = Date.now();

    // Volanie Lovable AI (Gemini)
    const response = await fetch('https://lovable.app/api/ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-2.0-flash-exp',
        messages: [
          {
            role: 'system',
            content: 'Si skúsený SEO copywriter špecializujúci sa na telekomunikácie a internet. Píšeš dlhé, podrobné články optimalizované pre vyhľadávače.'
          },
          {
            role: 'user',
            content: generatePrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Lovable AI API error:', errorData);
      throw new Error(`Lovable AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    const generationTime = Date.now() - startTime;
    
    console.log('Blog post generated successfully in', generationTime, 'ms');

    // Generujeme meta description z prvých 150 znakov obsahu
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const metaDescription = plainText.substring(0, 155) + '...';

    // Generujeme excerpt z prvých 200 znakov
    const excerpt = plainText.substring(0, 200) + '...';

    return new Response(
      JSON.stringify({
        success: true,
        content,
        excerpt,
        meta_description: metaDescription,
        generation_time_ms: generationTime,
        word_count: plainText.split(/\s+/).length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-generate-blog function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

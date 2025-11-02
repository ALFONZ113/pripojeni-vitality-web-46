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

POŽIADAVKY NA SEO A OBSAH:
1. Článok musí byť dlhý aspoň 1800-2500 slov pre lepšie SEO
2. Použij HTML tagy (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <blockquote>)
3. Zahrň hlavné kľúčové slovo v prvých 100 slovách
4. Kľúčové slová použi prirodzene s hustotou 1-2% (nie keyword stuffing)
5. Vytvor zrozumiteľnú hierarchiu nadpisov (H2 → H3)
6. Každý H2 nadpis by mal obsahovať variáciu kľúčového slova
7. Pridaj praktické príklady, tipy, čísla a konkrétne dáta
8. Zameraj sa na České a Slovenské prostredie (Ostrava, Karviná, Havířov, Poruba)
9. Buď konkrétny a technicky presný
10. Optimalizuj pre featured snippets (krátke, jasné odpovede)

LOKÁLNE SEO:
- Spomeň lokality: Ostrava, Karviná, Havířov, Poruba, Bohumín
- Pridaj lokálny kontext (panelák, rodinný dům, adresa)
- Použij české výrazy a frázovanie

INTERNÉ LINKY (spomeň ak je relevantné):
- "Gigabitový internet v Ostravě"
- "IPTV služby"
- "60GHz technologie v Porube"
- "Internet do paneláku"
- "PODA tarify"

FAQ SEKCIA (POVINNÁ):
Vytvor sekciu s 3-5 najčastejšími otázkami a odpoveďami v tomto formáte:
<h2>Často kladené otázky</h2>
<h3>Otázka 1?</h3>
<p>Jasná, stručná odpoveď (2-3 vety).</p>

ŠTRUKTÚRA ČLÁNKU:
1. Úvodný odsek (200-250 slov):
   - Jasne vysvetli problém/tému
   - Uveď prečo je dôležité
   - Naznač čo čitateľ získa z článku

2. Hlavné sekcie (3-5 sekcií):
   - Každá sekcia s H2 nadpisom obsahujúcim keyword varianty
   - Podsekcie s H3 nadpismi pre detaily
   - Bullet listy pre prehľadnosť
   - Príklady a konkrétne čísla

3. FAQ sekcia (povinná)

4. Záverečný odsek (150 slov):
   - Zhrnutie hlavných bodov
   - Výzva k akcii (kontaktujte PODA, overíme dostupnosť)

TAGY A ATRIBUTY:
- Použi <strong> pre dôležité termíny
- <em> pre zvýraznenie
- <ul> a <li> pre zoznamy
- <blockquote> pre citáty alebo dôležité fakty

JAZYK: Píš v češtine, profesionálnym ale zrozumiteľným štýlom.

Nepoužívaj <h1> tag. Generuj iba obsah článku v HTML formáte bez obaľujúcich <html>, <body> alebo <article> tagov.`;

    const startTime = Date.now();

    // Volanie Lovable AI Gateway (Gemini)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
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

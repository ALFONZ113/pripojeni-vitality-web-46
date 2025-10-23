import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, keywords } = await req.json();
    
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY');
    if (!perplexityApiKey) {
      throw new Error('PERPLEXITY_API_KEY not configured');
    }

    console.log('Starting research for topic:', topic);

    // Vytvoríme výskumný prompt
    const keywordsText = Array.isArray(keywords) 
      ? keywords.join(', ') 
      : (typeof keywords === 'string' ? keywords : 'žiadne');
    
    const researchPrompt = `Vykonaj podrobný výskum na túto tému: "${topic}"

Kľúčové slová na zameranie: ${keywordsText}

Prosím poskytni:
1. Aktuálne trendy a novinky v tejto oblasti
2. Hlavné fakty a štatistiky
3. Najbežnejšie otázky používateľov
4. Technické detaily a špecifikácie (ak relevantné)
5. Porovnania s konkurenciou alebo alternatívami
6. Praktické tipy a odporúčania

Zameraj sa na trh v Česku a na Slovensku. Výsledok formátuj ako JSON s kľúčmi: trends, facts, questions, technical_details, comparisons, tips`;

    // Volanie Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Si výskumný asistent špecializujúci sa na telekomunikácie a internet v ČR a SR. Poskytuj presné, aktuálne informácie a formátuj ich ako JSON.'
          },
          {
            role: 'user',
            content: researchPrompt
          }
        ],
        temperature: 0.2,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Perplexity API error:', errorData);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const researchContent = data.choices[0].message.content;
    
    console.log('Research completed successfully');

    // Pokúsime sa extrahovať JSON z odpovede
    let researchData;
    try {
      // Pokúsime sa nájsť JSON v odpovedi
      const jsonMatch = researchContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        researchData = JSON.parse(jsonMatch[0]);
      } else {
        // Ak nenájdeme JSON, použijeme celú odpoveď ako text
        researchData = {
          raw_content: researchContent,
          trends: [],
          facts: [],
          questions: [],
          technical_details: [],
          comparisons: [],
          tips: []
        };
      }
    } catch (e) {
      console.log('Failed to parse JSON, using raw content');
      researchData = {
        raw_content: researchContent,
        trends: [],
        facts: [],
        questions: [],
        technical_details: [],
        comparisons: [],
        tips: []
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        research_data: researchData,
        research_date: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-research function:', error);
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

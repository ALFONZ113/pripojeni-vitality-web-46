import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TopicSuggestion {
  topic: string;
  keywords: string[];
  category: string;
  reasoning: string;
  priority: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔍 Analyzing GSC data for topic suggestions...');

    // Fallback topics pro případ, že nejsou GSC data
    const fallbackTopics = [
      {
        category: 'Internet',
        keywords: ['rychlý internet Ostrava', 'gigabitové připojení', 'optický internet', 'fiber internet Česko'],
        baseClicks: 150,
        priority: 1
      },
      {
        category: 'IPTV',
        keywords: ['IPTV Česko', 'internetová televize', 'smart TV aplikace', 'TV přes internet'],
        baseClicks: 120,
        priority: 2
      },
      {
        category: 'Lokální SEO',
        keywords: ['internet Poruba', 'připojení Havířov', 'internet Karviná', 'PODA Bohumín'],
        baseClicks: 100,
        priority: 3
      },
      {
        category: 'Technologie',
        keywords: ['60GHz technologie', 'wireless internet', '5G vs fiber', 'rychlost internetu'],
        baseClicks: 90,
        priority: 4
      },
      {
        category: 'Průvodce',
        keywords: ['jak vybrat internet', 'porovnání tarifů', 'levný internet', 'nejlepší připojení 2025'],
        baseClicks: 110,
        priority: 5
      }
    ];

    // Get top performing keywords from last 30 days
    const { data: topKeywords, error: keywordsError } = await supabase
      .rpc('get_top_keywords', { limit_count: 20 });

    if (keywordsError) {
      console.warn('⚠️ Error fetching GSC keywords:', keywordsError);
      console.log('📦 Using fallback topics instead');
    }

    const keywords = topKeywords && topKeywords.length > 0 ? topKeywords : [];
    console.log(`📊 Found ${keywords.length} keywords from GSC`);

    // Get existing AI blog posts to avoid duplicates
    const { data: existingPosts, error: postsError } = await supabase
      .from('ai_blog_posts')
      .select('title, target_keywords, category')
      .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());

    if (postsError) {
      console.error('Error fetching existing posts:', postsError);
    }

    // Analyze and suggest topics
    const suggestions: TopicSuggestion[] = [];
    const existingTopics = new Set(existingPosts?.map(p => p.title.toLowerCase()) || []);
    const existingKeywords = new Set(
      existingPosts?.flatMap(p => p.target_keywords || []).map(k => k.toLowerCase()) || []
    );

    // Pokud nejsou GSC data, použij fallback témata
    if (keywords.length === 0) {
      console.log('🎯 Generating suggestions from fallback topics...');
      
      for (const fallback of fallbackTopics) {
        // Zkontroluj, zda už v této kategorii máme články
        const recentInCategory = existingPosts?.filter(p => 
          p.category === fallback.category
        ).length || 0;

        if (recentInCategory >= 3) {
          console.log(`⏭️ Skipping ${fallback.category} - již má ${recentInCategory} článků`);
          continue;
        }

        // Vyber primární klíčové slovo, které nebylo použito
        const unusedKeyword = fallback.keywords.find(k => 
          !existingKeywords.has(k.toLowerCase())
        );

        if (unusedKeyword) {
          suggestions.push({
            topic: `${unusedKeyword} - Kompletní průvodce 2025`,
            category: fallback.category,
            keywords: fallback.keywords,
            reasoning: `Důležité téma pro ${fallback.category}. Měsíční potenciál: ${fallback.baseClicks} kliknutí. Kategorie má ${recentInCategory} článků.`,
            priority: fallback.priority
          });
        }
      }
    } else {
      // Použij GSC data
      // Group keywords by theme
      const internetKeywords = keywords.filter(k => 
        k.keyword.toLowerCase().includes('internet') || 
        k.keyword.toLowerCase().includes('připojení')
      );

      const locationKeywords = keywords.filter(k =>
        k.keyword.toLowerCase().includes('ostrava') ||
        k.keyword.toLowerCase().includes('poruba') ||
        k.keyword.toLowerCase().includes('havířov') ||
        k.keyword.toLowerCase().includes('karviná')
      );

      const tvKeywords = keywords.filter(k =>
        k.keyword.toLowerCase().includes('iptv') ||
        k.keyword.toLowerCase().includes('televize') ||
        k.keyword.toLowerCase().includes('tv')
      );

      // Generate suggestions based on high-performing keywords
      if (internetKeywords.length > 0) {
        const topInternet = internetKeywords[0];
        if (!existingKeywords.has(topInternet.keyword.toLowerCase())) {
          suggestions.push({
            topic: `Jak vybrat nejlepší ${topInternet.keyword} v roce 2025`,
            keywords: internetKeywords.slice(0, 5).map(k => k.keyword),
            category: 'Průvodce',
            reasoning: `Klíčové slovo "${topInternet.keyword}" má ${topInternet.total_clicks} kliknutí a průměrnou pozici ${Number(topInternet.avg_position).toFixed(1)}`,
            priority: 1
          });
        }
      }

      if (locationKeywords.length > 0) {
        const topLocation = locationKeywords[0];
        if (!existingKeywords.has(topLocation.keyword.toLowerCase())) {
          suggestions.push({
            topic: `Rychlý internet v lokalitě: ${topLocation.keyword}`,
            keywords: locationKeywords.slice(0, 5).map(k => k.keyword),
            category: 'Lokální SEO',
            reasoning: `Lokální klíčové slovo "${topLocation.keyword}" má ${topLocation.total_impressions} zobrazení`,
            priority: 2
          });
        }
      }

      if (tvKeywords.length > 0) {
        const topTv = tvKeywords[0];
        if (!existingKeywords.has(topTv.keyword.toLowerCase())) {
          suggestions.push({
            topic: `IPTV vs tradiční televize: Kompletní srovnání 2025`,
            keywords: tvKeywords.slice(0, 5).map(k => k.keyword),
            category: 'Technologie',
            reasoning: `TV téma "${topTv.keyword}" má potenciál s ${topTv.total_clicks} kliknutími`,
            priority: 3
          });
        }
      }

      // Add trending topics based on click-through rate
      const highCtrKeywords = keywords
        .filter(k => Number(k.avg_position) <= 10 && k.total_clicks > 5)
        .slice(0, 3);

      highCtrKeywords.forEach((keyword, idx) => {
        if (!existingKeywords.has(keyword.keyword.toLowerCase())) {
          suggestions.push({
            topic: `${keyword.keyword}: Kompletní průvodce a tipy`,
            keywords: [keyword.keyword],
            category: 'Tipy a triky',
            reasoning: `Vysoký CTR klíčového slova s pozicí ${Number(keyword.avg_position).toFixed(1)}`,
            priority: 4 + idx
          });
        }
      });
    }

    console.log('✅ Generated suggestions:', suggestions.length);

    // Seřaď podle priority
    suggestions.sort((a, b) => a.priority - b.priority);

    return new Response(
      JSON.stringify({
        success: true,
        suggestions: suggestions.slice(0, 5), // Return top 5 suggestions
        analysis: {
          total_keywords_analyzed: keywords.length,
          existing_posts_count: existingPosts?.length || 0,
          new_suggestions_count: suggestions.length,
          using_fallback: keywords.length === 0
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('❌ Error in ai-analyze-topics:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

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
        keywords: [
          'rychlý internet Ostrava', 'gigabitové připojení', 'optický internet', 'fiber internet Česko',
          'optika vs metalický internet', 'nejrýchlejší internet Ostrava 2025', 'domácí internet bez FUP',
          'symetrické připojení', 'internet pro firmy Ostrava', 'co je GPON technologie',
          'fiber optika výhody', 'internet pro streamování', 'stabilní připojení domů',
          'internet bez agregace', 'jak funguje optický kabel', 'výhody optického internetu',
          'gigabit internet cena', 'nejlevnější optický internet', 'internet 1000 Mbps',
          'rychlý upload internet'
        ],
        baseClicks: 150,
        priority: 1
      },
      {
        category: 'IPTV',
        keywords: [
          'IPTV Česko', 'internetová televize', 'smart TV aplikace', 'TV přes internet',
          'IPTV vs Netflix', 'nejlepší IPTV aplikace', 'IPTV na Smart TV', 'živá televize internet',
          'IPTV set-top box', 'televize bez satelitu', 'IPTV kanály ČR', 'jak nastavit IPTV',
          'IPTV vs kabelová televize', 'archiv pořadů IPTV', 'IPTV na telefonu',
          'IPTV bez smlouvy', 'IPTV HD kvalita', 'IPTV timeshift funkce',
          'české IPTV služby', 'IPTV kontrola rodičů'
        ],
        baseClicks: 120,
        priority: 2
      },
      {
        category: 'Lokální SEO',
        keywords: [
          'internet Poruba', 'připojení Havířov', 'internet Karviná', 'PODA Bohumín',
          'internet Ostrava Zábřeh', 'připojení Ostrava Jih', 'internet Ostrava Vítkovice',
          'rychlý internet Polanka', 'internet Petřvald', 'připojení Orlová',
          'internet Ostrava Mariánské Hory', 'internet Ostrava Slezská Ostrava', 'připojení Vratimov',
          'internet Paskov', 'internet Rychvald', 'připojení Doubrava',
          'internet Ostrava Hrabová', 'internet Ostrava Muglinov', 'připojení Šenov',
          'internet Ostrava centrum'
        ],
        baseClicks: 100,
        priority: 3
      },
      {
        category: 'Technologie',
        keywords: [
          '60GHz technologie', 'wireless internet', '5G vs fiber', 'rychlost internetu',
          'co je FTTH', 'GPON vs EPON', 'jak funguje 60GHz', 'bezdrátové optické připojení',
          'latence internetu', 'ping pro gaming', 'jitter co to je', 'packet loss problém',
          'IPv6 vs IPv4', 'dual stack internet', 'wifi 6 technologie', 'mesh síť doma',
          'Router pro optiku', 'ONT zařízení', 'jak měřit rychlost internetu',
          'QoS nastavení'
        ],
        baseClicks: 90,
        priority: 4
      },
      {
        category: 'Průvodce',
        keywords: [
          'jak vybrat internet', 'porovnání tarifů', 'levný internet', 'nejlepší připojení 2025',
          'co potřebuji pro rychlý internet', 'jak změnit poskytovatele', 'výpovědní lhůta internet',
          'smlouva na dobu určitou vs neurčitou', 'povinné poplatky internet', 'skryté náklady internet',
          'jak zjistit pokrytí', 'jaký internet pro domácnost', 'internet pro gaming',
          'internet pro práci z domova', 'kolik stojí instalace', 'jak dlouho trvá připojení',
          'co je agregace internetu', 'jak poznat dobrého poskytovatele', 'recenze poskytovatelů',
          'co dělat při pomalém internetu'
        ],
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

    // Get existing AI blog posts to avoid duplicates (last 180 days for rotation)
    const { data: existingPosts, error: postsError } = await supabase
      .from('ai_blog_posts')
      .select('title, target_keywords, category, created_at')
      .gte('created_at', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString());

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
        // Zkontroluj články v kategorii za posledních 180 dní
        const cutoffDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
        const recentInCategory = existingPosts?.filter(p => 
          p.category === fallback.category && 
          p.created_at >= cutoffDate
        ).length || 0;

        if (recentInCategory >= 10) {
          console.log(`⏭️ Skipping ${fallback.category} - již má ${recentInCategory} článků za posledních 180 dní`);
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

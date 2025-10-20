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

    // Get top performing keywords from last 30 days
    const { data: topKeywords, error: keywordsError } = await supabase
      .rpc('get_top_keywords', { limit_count: 20 });

    if (keywordsError) {
      console.error('Error fetching keywords:', keywordsError);
      throw keywordsError;
    }

    console.log('📊 Found top keywords:', topKeywords?.length || 0);

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

    // Group keywords by theme
    const internetKeywords = topKeywords?.filter(k => 
      k.keyword.toLowerCase().includes('internet') || 
      k.keyword.toLowerCase().includes('připojení')
    ) || [];

    const locationKeywords = topKeywords?.filter(k =>
      k.keyword.toLowerCase().includes('ostrava') ||
      k.keyword.toLowerCase().includes('poruba') ||
      k.keyword.toLowerCase().includes('havířov') ||
      k.keyword.toLowerCase().includes('karviná')
    ) || [];

    const tvKeywords = topKeywords?.filter(k =>
      k.keyword.toLowerCase().includes('iptv') ||
      k.keyword.toLowerCase().includes('televize') ||
      k.keyword.toLowerCase().includes('tv')
    ) || [];

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
    const highCtrKeywords = topKeywords
      ?.filter(k => Number(k.avg_position) <= 10 && k.total_clicks > 5)
      .slice(0, 3) || [];

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

    console.log('✅ Generated suggestions:', suggestions.length);

    return new Response(
      JSON.stringify({
        success: true,
        suggestions: suggestions.slice(0, 5), // Return top 5 suggestions
        analysis: {
          total_keywords_analyzed: topKeywords?.length || 0,
          existing_posts_count: existingPosts?.length || 0,
          new_suggestions_count: suggestions.length
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

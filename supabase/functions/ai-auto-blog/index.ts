import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🤖 Starting automated blog generation workflow...');

    // Step 1: Analyze topics
    console.log('📊 Step 1: Analyzing GSC data for topics...');
    const { data: topicsData, error: topicsError } = await supabase.functions.invoke(
      'ai-analyze-topics',
      { body: {} }
    );

    if (topicsError || !topicsData?.success) {
      throw new Error(`Topic analysis failed: ${topicsError?.message || 'Unknown error'}`);
    }

    const suggestions = topicsData.suggestions || [];
    console.log(`✅ Found ${suggestions.length} topic suggestions`);

    if (suggestions.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No new topics to generate',
          suggestions_analyzed: 0
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Step 2: Generate blog post for top suggestion
    const topSuggestion = suggestions[0];
    console.log(`📝 Step 2: Generating blog post for: "${topSuggestion.topic}"`);

    const { data: workflowData, error: workflowError } = await supabase.functions.invoke(
      'ai-workflow',
      {
        body: {
          topic: topSuggestion.topic,
          keywords: topSuggestion.keywords.join(', '),
          category: topSuggestion.category,
          mode: 'manual'
        }
      }
    );

    if (workflowError || !workflowData?.success) {
      throw new Error(`Workflow failed: ${workflowError?.message || workflowData?.error}`);
    }

    console.log('✅ Blog post generated successfully:', workflowData.post_slug);

    // Log the automation
    await supabase.from('automation_logs').insert({
      task_type: 'auto_blog_generation',
      status: 'completed',
      details: {
        topic: topSuggestion.topic,
        category: topSuggestion.category,
        keywords: topSuggestion.keywords,
        post_id: workflowData.post_id,
        post_slug: workflowData.post_slug,
        reasoning: topSuggestion.reasoning
      },
      related_post_id: workflowData.post_id,
      tokens_used: workflowData.tokens_used || 0
    });

    return new Response(
      JSON.stringify({
        success: true,
        post_created: true,
        post_id: workflowData.post_id,
        post_slug: workflowData.post_slug,
        post_url: workflowData.post_url,
        topic: topSuggestion.topic,
        category: topSuggestion.category,
        remaining_suggestions: suggestions.length - 1
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('❌ Error in ai-auto-blog:', error);

    // Log the error
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('automation_logs').insert({
      task_type: 'auto_blog_generation',
      status: 'failed',
      error_message: error.message,
      details: { error: error.toString() }
    });

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

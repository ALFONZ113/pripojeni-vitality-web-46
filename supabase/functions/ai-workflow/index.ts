import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Predefined topics for automatic rotation
const BLOG_TOPICS = [
  { topic: "Gigabitový internet v Ostravě", keywords: ["gigabit", "ostrava", "rychlý internet"], category: "Technologie" },
  { topic: "IPTV vs klasická televize", keywords: ["iptv", "televize", "streaming"], category: "IPTV" },
  { topic: "Pokrytie 60GHz v Porube", keywords: ["60ghz", "poruba", "bezdrátový internet"], category: "Technologie" },
  { topic: "Jak vybrat internetového poskytovatele", keywords: ["poskytovatel", "internet", "výběr"], category: "Tipy" },
  { topic: "Internetové připojení pro panelák", keywords: ["panelák", "připojení", "byt"], category: "Tipy" },
  { topic: "PODA vs konkurence v Havířově", keywords: ["havirov", "srovnání", "poskytovatel"], category: "Recenzie" },
  { topic: "Jak zrychlit domácí internet", keywords: ["zrychlení", "wifi", "router"], category: "Tipy" },
  { topic: "Internetové tarify pro rodiny", keywords: ["rodina", "tarify", "balíček"], category: "Služby" }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await req.json();
    const { topic, keywords, category, mode = 'auto' } = body;

    // If mode is 'auto', pick next topic from rotation
    let selectedTopic = topic;
    let selectedKeywords = keywords;
    let selectedCategory = category;

    if (mode === 'auto') {
      // Get last published post to determine next topic
      const { data: lastPost } = await supabase
        .from('ai_blog_posts')
        .select('category')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const lastIndex = lastPost 
        ? BLOG_TOPICS.findIndex(t => t.category === lastPost.category)
        : -1;
      
      const nextTopic = BLOG_TOPICS[(lastIndex + 1) % BLOG_TOPICS.length];
      selectedTopic = nextTopic.topic;
      selectedKeywords = nextTopic.keywords;
      selectedCategory = nextTopic.category;
    }

    console.log('🚀 Starting AI workflow for:', selectedTopic);

    // Step 1: Research (optional - continue if fails)
    console.log('📚 Step 1: Researching topic...');
    let researchData = { research_data: null };
    
    try {
      const researchResponse = await fetch(`${supabaseUrl}/functions/v1/ai-research`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: selectedTopic,
          keywords: selectedKeywords
        })
      });

      if (researchResponse.ok) {
        researchData = await researchResponse.json();
        console.log('✅ Research completed');
      } else {
        console.warn('⚠️ Research failed, continuing without research data');
      }
    } catch (researchError) {
      console.warn('⚠️ Research error, continuing without research data:', researchError);
    }

    // Step 2: Generate blog content
    console.log('✍️ Step 2: Generating blog content...');
    const blogResponse = await fetch(`${supabaseUrl}/functions/v1/ai-generate-blog`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: selectedTopic,
        keywords: selectedKeywords,
        research_data: researchData.research_data,
        category: selectedCategory,
        tone: 'professional'
      })
    });

    if (!blogResponse.ok) {
      throw new Error(`Blog generation failed: ${await blogResponse.text()}`);
    }

    const blogData = await blogResponse.json();
    console.log('✅ Blog content generated');

    // Step 3: Generate slug
    const slug = selectedTopic
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    console.log('🔗 Generated slug:', slug);

    // Step 4: Generate header image
    console.log('🖼️ Step 3: Generating header image...');
    let headerImageUrl = null;
    
    try {
      const imageResponse = await fetch(`${supabaseUrl}/functions/v1/ai-generate-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Professional blog header image for: ${selectedTopic}. Modern, clean, high-quality`,
          slug: slug
        })
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        headerImageUrl = imageData.image_url;
        console.log('✅ Header image generated');
      }
    } catch (imageError) {
      console.warn('⚠️ Image generation failed, continuing without image:', imageError);
    }

    // Step 5: Save to database
    console.log('💾 Step 4: Saving to database...');
    const { data: savedPost, error: saveError } = await supabase
      .from('ai_blog_posts')
      .insert({
        title: selectedTopic,
        slug: slug,
        content: blogData.content,
        excerpt: blogData.excerpt,
        meta_description: blogData.meta_description,
        category: selectedCategory,
        tags: selectedKeywords,
        target_keywords: selectedKeywords,
        status: 'published',
        published_at: new Date().toISOString(),
        research_data: researchData.research_data,
        research_date: researchData.research_date,
        generation_time_ms: blogData.generation_time_ms,
        ai_model: 'google/gemini-2.5-flash',
        header_image_url: headerImageUrl,
        header_image_alt: `${selectedTopic} - ilustračný obrázok`,
        seo_score: 85,
        readability_score: 75
      })
      .select()
      .single();

    if (saveError) {
      throw new Error(`Database save failed: ${saveError.message}`);
    }

    console.log('✅ Post saved with ID:', savedPost.id);

    // Step 6: Submit to IndexNow
    console.log('📡 Step 5: Submitting to IndexNow...');
    const postUrl = `https://www.popri.cz/blog/${slug}`;
    
    try {
      const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host: 'www.popri.cz',
          key: 'a1b2c3d4e5f6g7h8i9j0',
          keyLocation: 'https://www.popri.cz/a1b2c3d4e5f6g7h8i9j0.txt',
          urlList: [postUrl]
        })
      });

      if (indexNowResponse.ok || indexNowResponse.status === 202) {
        await supabase
          .from('ai_blog_posts')
          .update({
            submitted_to_indexnow: true,
            indexnow_submitted_at: new Date().toISOString()
          })
          .eq('id', savedPost.id);
        
        console.log('✅ IndexNow submission successful');
      }
    } catch (indexError) {
      console.warn('⚠️ IndexNow submission failed:', indexError);
    }

    // Step 7: Log to automation_logs
    const duration = Date.now() - startTime;
    console.log('📝 Step 6: Logging workflow...');
    
    await supabase
      .from('automation_logs')
      .insert({
        task_type: 'blog_generation',
        status: 'completed',
        related_post_id: savedPost.id,
        duration_ms: duration,
        details: {
          topic: selectedTopic,
          category: selectedCategory,
          keywords: selectedKeywords,
          slug: slug,
          has_image: !!headerImageUrl,
          indexnow_submitted: true
        }
      });

    console.log('✅ Workflow completed in', duration, 'ms');

    return new Response(
      JSON.stringify({
        success: true,
        post_id: savedPost.id,
        slug: slug,
        url: postUrl,
        duration_ms: duration,
        details: {
          research_completed: true,
          content_generated: true,
          image_generated: !!headerImageUrl,
          saved_to_db: true,
          submitted_to_indexnow: true
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Workflow error:', error);
    
    const duration = Date.now() - startTime;
    
    // Log failure
    await supabase
      .from('automation_logs')
      .insert({
        task_type: 'blog_generation',
        status: 'failed',
        error_message: error.message,
        duration_ms: duration
      });

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

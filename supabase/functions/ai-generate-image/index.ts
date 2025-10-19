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
    const { prompt, slug } = await req.json();
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating image for prompt:', prompt);

    // Vylepšíme prompt pre lepšie výsledky
    const enhancedPrompt = `${prompt}. Professional, high-quality, modern design. 16:9 aspect ratio. Ultra high resolution. Hero image style.`;

    // Volanie Lovable Image API (Flux)
    const response = await fetch('https://lovable.app/api/ai/image/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'flux.dev',
        prompt: enhancedPrompt,
        width: 1920,
        height: 1080,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Image generation API error:', errorData);
      throw new Error(`Image generation API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.url;
    
    console.log('Image generated successfully:', imageUrl);

    // Uložíme obrázok do Supabase Storage
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase credentials not found, returning URL only');
      return new Response(
        JSON.stringify({
          success: true,
          image_url: imageUrl,
          stored: false
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Stihneme obrázok
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    // Vytvoríme bucket ak neexistuje
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === 'ai-blog-images');
    
    if (!bucketExists) {
      await supabase.storage.createBucket('ai-blog-images', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
    }

    // Uložíme obrázok
    const fileName = `${slug || Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ai-blog-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return new Response(
        JSON.stringify({
          success: true,
          image_url: imageUrl,
          stored: false,
          error: uploadError.message
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from('ai-blog-images')
      .getPublicUrl(fileName);

    console.log('Image stored successfully:', publicUrlData.publicUrl);

    return new Response(
      JSON.stringify({
        success: true,
        image_url: publicUrlData.publicUrl,
        original_url: imageUrl,
        stored: true,
        file_name: fileName
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-generate-image function:', error);
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

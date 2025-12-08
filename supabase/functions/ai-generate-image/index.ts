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

    console.log('Generating image with Gemini model for prompt:', prompt);

    // Vylepšíme prompt pre lepšie výsledky
    const enhancedPrompt = `${prompt}. Professional photography, high-quality, modern design, 16:9 aspect ratio, ultra high resolution, editorial style.`;

    // Volanie Lovable AI Gateway s Gemini modelom (Nano banana)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Gemini response received');
    
    // Získame base64 obrázok z odpovede
    const imageBase64 = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageBase64) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image generated in response');
    }

    console.log('Image generated successfully with Gemini model');

    // Uložíme obrázok do Supabase Storage
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase credentials not found, returning base64 only');
      return new Response(
        JSON.stringify({
          success: true,
          image_url: imageBase64,
          stored: false,
          model: 'google/gemini-2.5-flash-image-preview'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Konvertujeme base64 na buffer
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

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
    const fileName = `${slug || Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ai-blog-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return new Response(
        JSON.stringify({
          success: true,
          image_url: imageBase64,
          stored: false,
          error: uploadError.message,
          model: 'google/gemini-2.5-flash-image-preview'
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
        original_base64: imageBase64,
        stored: true,
        file_name: fileName,
        model: 'google/gemini-2.5-flash-image-preview'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-generate-image function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        model: 'google/gemini-2.5-flash-image-preview'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

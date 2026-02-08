import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const ImageInputSchema = z.object({
  prompt: z.string().trim().min(5, "Prompt musí mít alespoň 5 znaků").max(500, "Prompt je příliš dlouhý"),
  slug: z.string().trim().regex(/^[a-z0-9-]*$/, "Slug může obsahovat pouze malá písmena, čísla a pomlčky").max(100, "Slug je příliš dlouhý").optional().nullable(),
  referenceImage: z.string().optional().nullable(),
  renderStyle: z.enum(['realistic', 'caricature', 'illustration', 'cartoon']).optional().nullable(),
});

// Style descriptions for image editing
const styleDescriptions: Record<string, string> = {
  'realistic': 'Transform this person into a photo-realistic scene. Keep the person recognizable with natural lighting and seamless environment integration.',
  'caricature': 'Transform this person into an exaggerated caricature style. Emphasize distinctive facial features humorously while keeping them recognizable. Use bold, warm colors and artistic interpretation. Make it fun and playful.',
  'illustration': 'Transform this person into a modern digital illustration. Use clean vector-like lines, flat design elements, and professional artistic style while keeping the person recognizable.',
  'cartoon': 'Transform this person into a Pixar/Disney 3D cartoon style character. Make them friendly and approachable with vibrant colors and an animated character look while keeping recognizable features.',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    
    // Validate input
    const validationResult = ImageInputSchema.safeParse(requestBody);
    if (!validationResult.success) {
      console.error("❌ Validation error:", validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Neplatná vstupní data",
          details: validationResult.error.issues.map(i => i.message)
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { prompt, slug, referenceImage, renderStyle } = validationResult.data;
    
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Generating image with Gemini model for prompt:', prompt);
    console.log('Reference image provided:', !!referenceImage);
    console.log('Render style:', renderStyle);

    // Build the request based on whether we have a reference image
    let messages: any[];
    
    if (referenceImage && renderStyle) {
      // Image editing mode - transform the person in the reference image
      const styleDescription = styleDescriptions[renderStyle] || styleDescriptions['realistic'];
      
      console.log('Using image editing mode with style:', renderStyle);
      
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `${styleDescription}

Scene context: ${prompt}

IMPORTANT: 
1. Keep the person's face recognizable but apply the ${renderStyle} style transformation
2. Integrate the person naturally into the scene described
3. Any text in the image MUST be in Czech language
4. Create a single cohesive image, not multiple images
5. Professional quality, suitable for social media marketing`
            },
            {
              type: 'image_url',
              image_url: {
                url: referenceImage
              }
            }
          ]
        }
      ];
    } else {
      // Standard text-to-image generation
      const enhancedPrompt = `${prompt}. Professional photography, high-quality, modern design, ultra high resolution, editorial style.`;
      
      messages = [
        {
          role: 'user',
          content: enhancedPrompt
        }
      ];
    }

    // Volanie Lovable AI Gateway s Gemini modelom (Nano banana)
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages,
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

    // Sanitize slug for filename
    const safeSlug = slug ? slug.replace(/[^a-z0-9-]/g, '') : '';
    const fileName = `${safeSlug || Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    
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

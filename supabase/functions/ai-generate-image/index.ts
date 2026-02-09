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

// Style descriptions for image editing - with STRICT identity preservation
const styleDescriptions: Record<string, string> = {
  'realistic': `PHOTO-REALISTIC TRANSFORMATION with STRICT IDENTITY PRESERVATION.
    
This is the EXACT same person from the reference photo. You MUST preserve:
- EXACT facial structure: eye shape, nose, mouth, chin, jawline
- EXACT hair: color, length, texture, style  
- EXACT skin tone and any distinctive marks (moles, freckles)
- EXACT body proportions and build

Create a professional photograph with natural lighting. 
Clothing CAN be changed to fit the scene context.`,

  'caricature': `CARICATURE STYLE with RECOGNIZABLE IDENTITY.

Exaggerate the DISTINCTIVE features of THIS SPECIFIC person:
- Emphasize their unique nose shape, smile, or eye characteristics
- Keep them CLEARLY RECOGNIZABLE as the same person
- Preserve their exact hair color and general style
- Maintain their body type and proportions

Use bold, warm colors. Make it fun and playful.
Clothing can be stylized or changed.`,

  'illustration': `DIGITAL ILLUSTRATION with PRESERVED IDENTITY.

Create a modern vector-style illustration of THIS EXACT person:
- Simplify but preserve their unique facial features
- Keep exact hair color and style
- Maintain recognizable face shape and proportions
- Use clean lines and flat design elements

Professional artistic quality. Clothing can adapt to style.`,

  'cartoon': `PIXAR/DISNEY 3D STYLE with SAME PERSON.

Transform into animated character while keeping IDENTITY:
- Same face shape, eye placement, nose and mouth style
- Same hair color and general hairstyle
- Same skin tone
- Friendly, approachable look with vibrant colors

The character must be recognizable as the reference person.
Clothing can be cartoon-styled.`,
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

## SCENE CONTEXT:
${prompt}

## CRITICAL IDENTITY PRESERVATION RULES:

### FACE (HIGHEST PRIORITY - MUST MATCH EXACTLY):
- Preserve EXACT eye shape, color, and spacing
- Preserve EXACT nose shape and size
- Preserve EXACT mouth shape and lip fullness
- Preserve EXACT face shape and jawline
- Keep all distinctive features (moles, freckles, dimples, scars)
- Maintain similar facial expression character

### HAIR (HIGH PRIORITY):
- Keep EXACT hair color (same shade)
- Keep EXACT hair length and style
- Keep hair texture (straight/curly/wavy)

### BODY (MEDIUM PRIORITY):  
- Maintain same body proportions and build
- Keep same skin tone throughout

### ALLOWED CHANGES:
- Clothing can be changed to fit the scene
- Accessories can be added/removed
- Pose can be adjusted
- Background is completely new

## DO NOT:
- Generate a different person's face
- Change eye color or face shape
- Alter hair color or length significantly
- Create an "idealized" or different-looking version
- Make the person look younger/older than reference

## TECHNICAL REQUIREMENTS:
- Single cohesive image (not multiple images)
- Professional quality for social media marketing
- Any text in image MUST be in Czech language
- Seamless integration of person into scene

The generated image MUST show the SAME PERSON from the reference photo, just in a new scene with potentially different clothing.`
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

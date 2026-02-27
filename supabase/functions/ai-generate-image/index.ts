import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Input validation schema
const ImageInputSchema = z.object({
  prompt: z.string().trim().min(5, "Prompt musí mít alespoň 5 znaků").max(8000, "Prompt je příliš dlouhý"),
  slug: z.string().trim().regex(/^[a-z0-9-]*$/, "Slug může obsahovat pouze malá písmena, čísla a pomlčky").max(100, "Slug je příliš dlouhý").optional().nullable(),
  referenceImage: z.string().optional().nullable(),
  renderStyle: z.enum(['realistic', 'caricature', 'illustration', 'cartoon']).optional().nullable(),
});

// Style descriptions for image editing
const styleDescriptions: Record<string, string> = {
  'realistic': `PHOTO-REALISTIC TRANSFORMATION with STRICT IDENTITY PRESERVATION.
This is the EXACT same person from the reference photo. You MUST preserve:
- EXACT facial structure: eye shape, nose, mouth, chin, jawline
- EXACT hair: color, length, texture, style  
- EXACT skin tone and any distinctive marks
- EXACT body proportions and build
Create a professional photograph with natural lighting. Clothing CAN be changed.`,

  'caricature': `CARICATURE STYLE with RECOGNIZABLE IDENTITY.
Exaggerate the DISTINCTIVE features of THIS SPECIFIC person:
- Emphasize their unique nose shape, smile, or eye characteristics
- Keep them CLEARLY RECOGNIZABLE as the same person
- Preserve their exact hair color and general style
Use bold, warm colors. Make it fun and playful.`,

  'illustration': `DIGITAL ILLUSTRATION with PRESERVED IDENTITY.
Create a modern vector-style illustration of THIS EXACT person:
- Simplify but preserve their unique facial features
- Keep exact hair color and style
- Use clean lines and flat design elements
Professional artistic quality.`,

  'cartoon': `PIXAR/DISNEY 3D STYLE with SAME PERSON.
Transform into animated character while keeping IDENTITY:
- Same face shape, eye placement, nose and mouth style
- Same hair color and general hairstyle
- Friendly, approachable look with vibrant colors
The character must be recognizable as the reference person.`,
};

/**
 * Build the identity preservation prompt for reference image editing
 */
function buildIdentityPrompt(styleDescription: string, scenePrompt: string): string {
  return `${styleDescription}

## SCENE CONTEXT:
${scenePrompt}

## CRITICAL IDENTITY PRESERVATION RULES:
### FACE (HIGHEST PRIORITY - MUST MATCH EXACTLY):
- Preserve EXACT eye shape, color, and spacing
- Preserve EXACT nose shape and size
- Preserve EXACT mouth shape and lip fullness
- Preserve EXACT face shape and jawline
- Keep all distinctive features (moles, freckles, dimples, scars)

### HAIR (HIGH PRIORITY):
- Keep EXACT hair color (same shade)
- Keep EXACT hair length and style

### ALLOWED CHANGES:
- Clothing can be changed to fit the scene
- Accessories can be added/removed
- Pose can be adjusted
- Background is completely new

## TECHNICAL REQUIREMENTS:
- Single cohesive image (not multiple images)
- Professional quality for social media marketing
- Any text in image MUST be in Czech language
- Seamless integration of person into scene`;
}

/**
 * Call Google Gemini API directly for image generation
 */
async function callGeminiImageAPI(
  apiKey: string,
  prompt: string,
  referenceImage?: string | null
): Promise<string> {
  const model = 'gemini-3.1-flash-image-preview'; // Nano Banana 2
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Build parts array
  const parts: any[] = [];

  if (referenceImage) {
    // Extract base64 data and mime type from data URL
    const match = referenceImage.match(/^data:(image\/\w+);base64,(.+)$/);
    if (match) {
      parts.push({
        inlineData: {
          mimeType: match[1],
          data: match[2]
        }
      });
    } else if (referenceImage.startsWith('http')) {
      // For URL-based images, fetch and convert
      try {
        const imgResponse = await fetch(referenceImage);
        const imgBuffer = await imgResponse.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(imgBuffer)));
        const contentType = imgResponse.headers.get('content-type') || 'image/jpeg';
        parts.push({
          inlineData: {
            mimeType: contentType,
            data: base64
          }
        });
      } catch (e) {
        console.error('Failed to fetch reference image:', e);
      }
    }
  }

  parts.push({ text: prompt });

  const requestBody = {
    contents: [
      {
        parts
      }
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    }
  };

  console.log('Calling Google Gemini API directly with model:', model);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', response.status, errorText);
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  // Extract image from response - Gemini returns inline data
  const candidates = data.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error('No candidates in Gemini response');
  }

  const responseParts = candidates[0].content?.parts || [];
  
  for (const part of responseParts) {
    if (part.inlineData) {
      const mimeType = part.inlineData.mimeType || 'image/png';
      return `data:${mimeType};base64,${part.inlineData.data}`;
    }
  }

  console.error('No image in response parts:', JSON.stringify(responseParts.map((p: any) => Object.keys(p))));
  throw new Error('No image generated in Gemini response');
}

/**
 * Upload image to Supabase Storage
 */
async function uploadToStorage(
  imageBase64: string,
  slug: string | null | undefined
): Promise<{ publicUrl: string; fileName: string } | null> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('Supabase credentials not found, skipping storage');
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some(b => b.name === 'ai-blog-images')) {
    await supabase.storage.createBucket('ai-blog-images', {
      public: true,
      fileSizeLimit: 10485760,
    });
  }

  // Convert base64 to buffer
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

  const safeSlug = slug ? slug.replace(/[^a-z0-9-]/g, '') : '';
  const fileName = `${safeSlug || Date.now()}-${Math.random().toString(36).substring(7)}.png`;

  const { error: uploadError } = await supabase.storage
    .from('ai-blog-images')
    .upload(fileName, imageBuffer, { contentType: 'image/png', upsert: false });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('ai-blog-images')
    .getPublicUrl(fileName);

  return { publicUrl: publicUrlData.publicUrl, fileName };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    
    const validationResult = ImageInputSchema.safeParse(requestBody);
    if (!validationResult.success) {
      console.error("❌ Validation error:", validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Neplatná vstupní data",
          details: validationResult.error.issues.map(i => i.message)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { prompt, slug, referenceImage, renderStyle } = validationResult.data;
    
    const geminiApiKey = Deno.env.get('GOOGLE_GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GOOGLE_GEMINI_API_KEY not configured');
    }

    console.log('🎨 Generating image with Google Nano Banana 2');
    console.log('Reference image:', !!referenceImage);
    console.log('Render style:', renderStyle);

    // Build prompt
    let finalPrompt: string;
    
    if (referenceImage && renderStyle) {
      const styleDescription = styleDescriptions[renderStyle] || styleDescriptions['realistic'];
      finalPrompt = buildIdentityPrompt(styleDescription, prompt);
    } else {
      finalPrompt = `${prompt}\n\nPhotographed with a professional camera using natural depth of field. Sharp focus on the main subject with a complementary, uncluttered background. The composition leaves appropriate negative space for text overlays. Soft, directional lighting creates gentle shadows and dimension. Single cohesive image output.`;
    }

    // Call Gemini API directly
    const imageBase64 = await callGeminiImageAPI(geminiApiKey, finalPrompt, referenceImage);
    
    console.log('✅ Image generated successfully with Nano Banana 2');

    // Try to upload to storage
    const stored = await uploadToStorage(imageBase64, slug);
    const MODEL_NAME = 'google/nano-banana-2 (gemini-2.0-flash-exp)';

    if (stored) {
      console.log('📦 Image stored:', stored.publicUrl);
      return new Response(
        JSON.stringify({
          success: true,
          image_url: stored.publicUrl,
          original_base64: imageBase64,
          stored: true,
          file_name: stored.fileName,
          model: MODEL_NAME
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        image_url: imageBase64,
        stored: false,
        model: MODEL_NAME
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-generate-image:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        model: 'google/nano-banana-2'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

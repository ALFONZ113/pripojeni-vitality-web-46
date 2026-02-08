-- Add columns for custom person feature to social_posts table
ALTER TABLE public.social_posts 
ADD COLUMN IF NOT EXISTS person_render_style text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS custom_person_image_url text DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.social_posts.person_render_style IS 'Render style for custom person: realistic, caricature, illustration, cartoon';
COMMENT ON COLUMN public.social_posts.custom_person_image_url IS 'Base64 or URL of the uploaded reference photo for custom person feature';
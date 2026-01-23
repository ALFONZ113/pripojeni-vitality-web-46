-- Create table for social media post history
CREATE TABLE public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  post_type TEXT NOT NULL,
  platform TEXT NOT NULL,
  custom_topic TEXT,
  facebook_text TEXT,
  facebook_hashtags TEXT,
  facebook_image_prompt TEXT,
  facebook_image_url TEXT,
  instagram_text TEXT,
  instagram_hashtags TEXT,
  instagram_image_prompt TEXT,
  instagram_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own posts
CREATE POLICY "Users can view their own social posts"
ON public.social_posts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can insert their own posts
CREATE POLICY "Users can insert their own social posts"
ON public.social_posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own posts
CREATE POLICY "Users can update their own social posts"
ON public.social_posts
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Users can delete their own posts
CREATE POLICY "Users can delete their own social posts"
ON public.social_posts
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_social_posts_updated_at
BEFORE UPDATE ON public.social_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_form_submission_updated_at();

-- Add new columns to social_posts table
ALTER TABLE public.social_posts 
ADD COLUMN IF NOT EXISTS with_cta boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS ad_headline text,
ADD COLUMN IF NOT EXISTS ad_description text,
ADD COLUMN IF NOT EXISTS ad_cta text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'draft';

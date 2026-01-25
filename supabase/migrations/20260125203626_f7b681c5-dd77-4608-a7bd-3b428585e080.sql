-- Pridať stĺpce pre vizuálny štýl a prepínač osôb do social_posts
ALTER TABLE public.social_posts 
ADD COLUMN IF NOT EXISTS visual_style TEXT DEFAULT 'luxury-gold',
ADD COLUMN IF NOT EXISTS include_person TEXT DEFAULT 'with-person';
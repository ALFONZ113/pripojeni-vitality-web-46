-- Add public read access for published AI blog posts
-- This allows visitors to view published AI-generated articles on the blog

CREATE POLICY "Anyone can view published AI blog posts"
ON public.ai_blog_posts
FOR SELECT
USING (status = 'published');
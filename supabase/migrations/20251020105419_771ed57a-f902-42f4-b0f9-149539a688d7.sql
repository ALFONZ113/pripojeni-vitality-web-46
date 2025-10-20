-- Create daily cron job for automated blog generation
-- This will run every day at 3 AM UTC to analyze GSC data and generate a new blog post
SELECT cron.schedule(
  'daily-auto-blog-generation',
  '0 3 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://yjzzhfvwbnzhecffuelt.supabase.co/functions/v1/ai-auto-blog',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqenpoZnZ3Ym56aGVjZmZ1ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDEzMDgsImV4cCI6MjA2MTAxNzMwOH0.Buhkufn2M3P0sGnWoQrbvZ3iHv7gMT2kDLJzQ5rNGTE"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

COMMENT ON EXTENSION pg_cron IS 'Daily auto blog generation at 3 AM UTC';

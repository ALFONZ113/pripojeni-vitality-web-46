-- Create daily cron job to fetch GSC data
-- This will run every day at 2 AM UTC
SELECT cron.schedule(
  'daily-gsc-data-fetch',
  '0 2 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://yjzzhfvwbnzhecffuelt.supabase.co/functions/v1/ai-fetch-gsc-data',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqenpoZnZ3Ym56aGVjZmZ1ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDEzMDgsImV4cCI6MjA2MTAxNzMwOH0.Buhkufn2M3P0sGnWoQrbvZ3iHv7gMT2kDLJzQ5rNGTE"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

COMMENT ON EXTENSION pg_cron IS 'Daily GSC data fetch scheduled at 2 AM UTC';
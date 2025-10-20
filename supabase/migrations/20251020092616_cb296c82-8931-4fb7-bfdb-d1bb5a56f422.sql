-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule weekly blog generation every Sunday at 20:00 (8 PM)
SELECT cron.schedule(
  'weekly-blog-generation',
  '0 20 * * 0', -- Every Sunday at 20:00
  $$
  SELECT
    net.http_post(
      url := 'https://yjzzhfvwbnzhecffuelt.supabase.co/functions/v1/ai-workflow',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqenpoZnZ3Ym56aGVjZmZ1ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDEzMDgsImV4cCI6MjA2MTAxNzMwOH0.Buhkufn2M3P0sGnWoQrbvZ3iHv7gMT2kDLJzQ5rNGTE"}'::jsonb,
      body := '{"mode": "auto"}'::jsonb
    ) as request_id;
  $$
);

-- Create a view to check cron job status
CREATE OR REPLACE VIEW cron_job_status AS
SELECT 
  jobid,
  schedule,
  command,
  nodename,
  nodeport,
  database,
  username,
  active,
  jobname
FROM cron.job
WHERE jobname = 'weekly-blog-generation';

COMMENT ON VIEW cron_job_status IS 'Shows status of the weekly blog generation cron job';
-- Fix security definer view by recreating without SECURITY DEFINER
DROP VIEW IF EXISTS cron_job_status;

CREATE OR REPLACE VIEW cron_job_status 
WITH (security_invoker = true) AS
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
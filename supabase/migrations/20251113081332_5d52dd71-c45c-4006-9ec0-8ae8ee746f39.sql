-- Clean up duplicate form submissions
-- Keep only the oldest record for each duplicate group
WITH duplicates AS (
  SELECT id, 
    ROW_NUMBER() OVER (
      PARTITION BY email, phone, DATE(created_at) 
      ORDER BY created_at ASC
    ) as rn
  FROM form_submissions
)
DELETE FROM form_submissions
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);
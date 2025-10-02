-- Add DELETE policy for form_submissions
CREATE POLICY "Authenticated users can delete submissions"
ON public.form_submissions
FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Add comment explaining the status values
COMMENT ON COLUMN public.form_submissions.status IS 'Status values: new, processing, contacted, contract_sent, contract_signed, completed, cancelled, rejected';
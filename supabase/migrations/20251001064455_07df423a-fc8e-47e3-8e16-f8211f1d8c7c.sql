-- Create table for storing form submissions
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  zip TEXT,
  property_type TEXT,
  current_provider TEXT,
  current_price TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for admin users
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for form_submissions (only authenticated users can view)
CREATE POLICY "Authenticated users can view submissions" 
ON public.form_submissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update submissions" 
ON public.form_submissions 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can insert submissions" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policies for admin_users (only the user themselves can view their data)
CREATE POLICY "Users can view their own admin data" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid()::text = id::text);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_form_submission_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_form_submission_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_status ON public.form_submissions(status);
CREATE INDEX idx_admin_users_email ON public.admin_users(email);
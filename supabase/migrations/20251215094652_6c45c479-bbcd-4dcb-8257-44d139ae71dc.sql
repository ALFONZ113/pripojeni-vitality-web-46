-- Security fixes for Supabase functions

-- Fix search_path for update_form_submission_updated_at function
CREATE OR REPLACE FUNCTION public.update_form_submission_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix search_path for update_ai_blog_posts_updated_at function
CREATE OR REPLACE FUNCTION public.update_ai_blog_posts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix search_path for calculate_word_count function
CREATE OR REPLACE FUNCTION public.calculate_word_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.word_count = array_length(regexp_split_to_array(trim(NEW.content), '\s+'), 1);
  RETURN NEW;
END;
$function$;
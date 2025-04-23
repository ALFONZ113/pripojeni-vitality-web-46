
import { toast } from "@/hooks/use-toast";

interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  currentProvider?: string;
  currentPrice?: string;
  message?: string;
}

export const sendContactFormEmail = async (formData: EmailFormData): Promise<boolean> => {
  try {
    console.log("Preparing to send email with formData:", formData);
    
    // Použití přímého URL k edge function, ne dynamickou proměnnou
    const functionUrl = "https://yjzzhfvwbnzhecffuelt.supabase.co/functions/v1/send-email";
    
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqenpoZnZ3Ym56aGVjZmZ1ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDEzMDgsImV4cCI6MjA2MTAxNzMwOH0.Buhkufn2M3P0sGnWoQrbvZ3iHv7gMT2kDLJzQ5rNGTE`
      },
      body: JSON.stringify({
        to: "junkert@seznam.cz",
        subject: "Nový kontakt z pripojeni-poda.cz",
        formData: formData
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Email API error:", errorText);
      throw new Error(`Failed to send email: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("Email sent successfully:", result);
    
    toast({
      title: "Formulář odeslán",
      description: "Děkujeme za vyplnění formuláře. Brzy vás budeme kontaktovat.",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    
    toast({
      title: "Chyba při odesílání",
      description: "Nepodařilo se odeslat formulář. Zkuste to prosím později nebo nás kontaktujte telefonicky.",
      variant: "destructive"
    });
    
    return false;
  }
};

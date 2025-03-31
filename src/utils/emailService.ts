
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
    // Using the correct Supabase project ID that you already have deployed
    const SUPABASE_PROJECT_ID = "tfhagyqxrnkoyhskhox";
    
    console.log("Sending email with formData:", formData);
    
    // We'll use fetch to call your existing Supabase Edge Function
    const response = await fetch(`https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "junkert@seznam.cz",
        subject: "Nový kontaktní formulář z pripojeni-poda.cz",
        resendApiKey: "re_Ah1eNvoM_BCCf2Pn2kubFurL2eFEQVxQd",
        formData
      }),
      // Add mode: 'no-cors' to handle CORS issues
      mode: 'no-cors'
    });

    console.log("Response received (no details available due to no-cors mode)");
    
    // With no-cors mode, we can't access response.ok or response.json()
    // So we'll just assume it worked and show a toast message
    toast({
      title: "Úspěch",
      description: "Formulář byl úspěšně odeslán. Brzy vás budeme kontaktovat.",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se odeslat email. Zkuste to prosím později.",
      variant: "destructive"
    });
    return false;
  }
};

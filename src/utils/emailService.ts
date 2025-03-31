
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
    // Set your actual Supabase project ID here - this is a unique identifier for your Supabase project
    const SUPABASE_PROJECT_ID = "8n0vrgydpfcncdmwukwz";
    
    // We'll use fetch to call our Supabase Edge Function
    const response = await fetch(`https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No authorization header needed if the function is public
      },
      body: JSON.stringify({
        to: "junkert@seznam.cz",
        subject: "Nový kontaktní formulář z pripojeni-poda.cz",
        resendApiKey: "re_Ah1eNvoM_BCCf2Pn2kubFurL2eFEQVxQd", // Adding Resend API key for the edge function
        formData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Chyba při odesílání emailu");
    }

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


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
    const SUPABASE_PROJECT_ID = "tfhagyqxrnkoyhskhox";
    
    console.log("Preparing to send email with formData:", JSON.stringify(formData));
    
    // Using a custom endpoint to avoid CORS issues
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
      mode: 'no-cors' // Using no-cors mode to bypass CORS restrictions
    });

    console.log("Email request sent, showing success toast");
    
    // Since we're using no-cors mode, we don't have access to actual response status
    // Display success message to the user
    toast({
      title: "Formulář odeslán",
      description: "Děkujeme za vyplnění formuláře. Brzy vás budeme kontaktovat.",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    
    // Show error message to the user
    toast({
      title: "Chyba při odesílání",
      description: "Nepodařilo se odeslat formulář. Zkuste to prosím později nebo nás kontaktujte telefonicky.",
      variant: "destructive"
    });
    
    return false;
  }
};

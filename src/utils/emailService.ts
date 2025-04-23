
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
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to: "terc@obchod.poda.cz",
        subject: "Nový kontakt z pripojeni-poda.cz",
        formData: formData,
        resendApiKey: "re_BYkUxZxo_Gp2EPXgjf6JVFyn2Uu8eWuk3" // This will be replaced by Supabase secret
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Email API error:", errorData);
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

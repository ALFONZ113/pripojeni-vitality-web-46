
import { toast } from "@/hooks/use-toast";

interface EmailFormData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  propertyType?: string;
  currentProvider?: string;
  currentPrice?: string;
  message?: string;
}

export const sendContactFormEmail = async (formData: EmailFormData): Promise<boolean> => {
  try {
    // Use direct URL to edge function
    const functionUrl = "https://yjzzhfvwbnzhecffuelt.supabase.co/functions/v1/send-email";
    
    // Send admin email
    const adminResponse = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "junkert@seznam.cz",
        subject: formData.name.includes("Žádost o zpětné volání") 
          ? "Žádost o zpětné volání - popri.cz" 
          : "Nový kontakt z pripojeni-poda.cz",
        formData: formData,
        emailType: "admin"
      })
    });
    
    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      console.error("Admin email API error:", errorText);
      throw new Error(`Failed to send admin email: ${adminResponse.status} - ${errorText}`);
    }
    
    // Send customer email
    const customerResponse = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: formData.email,
        subject: "Děkujeme za váš zájem o PODA služby - Popri.cz",
        formData: formData,
        emailType: "customer"
      })
    });
    
    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error("Customer email API error:", errorText);
      // Don't throw error for customer email, admin email is more important
      console.warn("Customer email failed but continuing...");
    }
    
    const adminResult = await adminResponse.json();
    
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

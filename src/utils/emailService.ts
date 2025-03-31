
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
    // We'll use fetch to call our Supabase Edge Function
    const response = await fetch("/api/send-contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "junkert@seznam.cz",
        subject: "Nový kontaktní formulář z připojeni-poda.cz",
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

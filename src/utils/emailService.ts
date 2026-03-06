import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    // Send admin email using Supabase client
    const { error: adminError } = await supabase.functions.invoke('send-email', {
      body: {
        to: "junkert@seznam.cz",
        subject: formData.name.includes("Žádost o zpětné volání") 
          ? "Žádost o zpětné volání - popri.cz" 
          : "Nový kontakt z popri.cz",
        formData: formData,
        emailType: "admin"
      }
    });
    
    if (adminError) {
      console.error("Admin email API error:", adminError);
      throw new Error(`Failed to send admin email: ${adminError.message}`);
    }
    
    // Send customer email only if email is provided
    if (formData.email && formData.email.trim() !== "") {
      const { error: customerError } = await supabase.functions.invoke('send-email', {
        body: {
          to: formData.email,
          subject: "Děkujeme za váš zájem o PODA služby - Popri.cz",
          formData: formData,
          emailType: "customer"
        }
      });
      
      if (customerError) {
        console.error("Customer email API error:", customerError);
        // Don't throw error for customer email, admin email is more important
        console.warn("Customer email failed but continuing...");
      }
    }
    
    toast.success('Formulář odeslán', {
      description: "Děkujeme za vyplnění formuláře. Brzy vás budeme kontaktovat.",
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    
    toast.error('Chyba při odesílání', {
      description: "Nepodařilo se odeslat formulář. Zkuste to prosím později nebo nás kontaktujte telefonicky.",
    });
    
    return false;
  }
};

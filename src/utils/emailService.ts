
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
    console.log("Preparing to send email with formData:", JSON.stringify(formData));
    
    // Create email HTML content with improved formatting
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nový kontakt z formuláře</h2>
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Jméno:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${formData.email}</p>
          <p style="margin: 10px 0;"><strong>Telefon:</strong> ${formData.phone}</p>
          ${formData.address ? `<p style="margin: 10px 0;"><strong>Adresa:</strong> ${formData.address}</p>` : ''}
          ${formData.city ? `<p style="margin: 10px 0;"><strong>Město:</strong> ${formData.city}</p>` : ''}
          ${formData.zip ? `<p style="margin: 10px 0;"><strong>PSČ:</strong> ${formData.zip}</p>` : ''}
          ${formData.currentProvider ? `<p style="margin: 10px 0;"><strong>Současný poskytovatel:</strong> ${formData.currentProvider}</p>` : ''}
          ${formData.currentPrice ? `<p style="margin: 10px 0;"><strong>Aktuální cena:</strong> ${formData.currentPrice}</p>` : ''}
        </div>
        ${formData.message ? `
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #333;">Zpráva od zákazníka:</h3>
            <p style="white-space: pre-line;">${formData.message}</p>
          </div>
        ` : ''}
        <div style="margin-top: 30px; font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
          Odesláno z kontaktního formuláře na pripojeni-poda.cz
        </div>
      </div>
    `;

    // Using Resend API directly
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer re_Ah1eNvoM_BCCf2Pn2kubFurL2eFEQVxQd"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "junkert@seznam.cz",
        subject: "Nový kontaktní formulář z pripojeni-poda.cz",
        html: htmlContent,
        reply_to: formData.email
      })
    });

    const responseData = await response.json();
    console.log("Email API response:", responseData);

    if (!response.ok) {
      console.error("Failed to send email:", responseData);
      throw new Error("Chyba při odesílání emailu");
    }

    console.log("Email sent successfully");
    
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
